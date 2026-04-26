// Reserve Track mechanics: withdraw, auto-advance, deploy.
// Passive scouting + Deployment Strike checks live here.

import type { GameState, HouseId, ReserveGroup } from '../types';
import { NEIGHBORS, hexDistance } from './adjacency';
import { HEX_BY_ID } from '../data/hexes';

const RANGE_BY_SPACE: Record<1 | 2 | 3, number> = { 1: 3, 2: 6, 3: 9 };

let groupCounter = 0;
function newGroupId(house: HouseId): string {
  groupCounter += 1;
  return `${house}-rg-${Date.now()}-${groupCounter}`;
}

const MAX_RESERVE_UNITS = 8;

function reserveUnitCount(draft: GameState, house: HouseId): number {
  return Object.values(draft.reserveGroups)
    .filter((g) => g.house === house)
    .reduce((sum, g) => sum + g.unitIds.length, 0);
}

// Withdraw all of `house`'s active units from `hexId` (or a specific subset).
// Creates a new ReserveGroup at Space 1 with a removal marker on the origin hex.
export function withdrawUnits(
  draft: GameState,
  house: HouseId,
  hexId: number,
  unitIds?: string[]
): ReserveGroup | null {
  const candidates = Object.values(draft.units).filter(
    (u) =>
      u.house === house &&
      u.hexId === hexId &&
      u.readiness !== 'subdued' &&
      u.readiness !== 'weakened' &&
      !u.actedThisTurn
  );
  const chosen = unitIds
    ? candidates.filter((u) => unitIds.includes(u.id))
    : candidates;
  if (chosen.length === 0) return null;

  // Enforce max-8 units on the Reserve Track per house.
  const currentReserveCount = reserveUnitCount(draft, house);
  const slotsLeft = MAX_RESERVE_UNITS - currentReserveCount;
  if (slotsLeft <= 0) {
    draft.log.push(`! Withdraw blocked — Reserve Track at max (8 units).`);
    return null;
  }
  const accepted = chosen.slice(0, slotsLeft);
  if (accepted.length < chosen.length) {
    draft.log.push(`! Reserve Track room for only ${accepted.length} of ${chosen.length} units; rest left in place.`);
  }

  const group: ReserveGroup = {
    id: newGroupId(house),
    house,
    removalHexId: hexId,
    unitIds: accepted.map((u) => u.id),
    space: 1,
    createdRound: draft.round,
  };
  draft.reserveGroups[group.id] = group;

  for (const u of accepted) {
    const draftU = draft.units[u.id];
    if (!draftU) continue;
    draftU.hexId = null;
    draftU.reserveSpace = 1;
    draftU.actedThisTurn = true; // withdrawal consumes this turn's action
  }

  draft.log.push(
    `${house} withdrew ${accepted.length} unit(s) from hex ${hexId} to Reserve Track Space 1.`
  );
  return group;
}

// Advance all of `house`'s reserve groups by 1 space (capped at 3, or 2 in Act I).
// Called at the start of that house's turn.
export function advanceReserves(draft: GameState, house: HouseId): void {
  // Space 3 is locked until Act II per rulebook.
  const cap = draft.act === 1 ? 2 : 3;
  for (const g of Object.values(draft.reserveGroups)) {
    if (g.house !== house) continue;
    if (g.space < cap) {
      g.space = (g.space + 1) as 1 | 2 | 3;
      for (const uid of g.unitIds) {
        const u = draft.units[uid];
        if (u) u.reserveSpace = g.space;
      }
    }
  }
}

// Hexes within `range` steps of `originId`, including the origin.
function hexesWithinRange(originId: number, range: number): Set<number> {
  const out = new Set<number>([originId]);
  let frontier: number[] = [originId];
  for (let d = 0; d < range; d++) {
    const next: number[] = [];
    for (const id of frontier) {
      for (const n of NEIGHBORS[id] ?? []) {
        if (!out.has(n)) {
          out.add(n);
          next.push(n);
        }
      }
    }
    frontier = next;
  }
  return out;
}

// Hexes blocked by passive scouting — within 1 hex of any ENEMY Alert unit.
// Forest hexes (Greatwoods / North Woods) are EXEMPT — forest cover hides arrivals.
function scoutedHexes(state: GameState, ownHouse: HouseId): Set<number> {
  const blocked = new Set<number>();
  for (const u of Object.values(state.units)) {
    if (u.house === ownHouse) continue;
    if (u.readiness !== 'alert' || u.hexId == null) continue;
    blocked.add(u.hexId);
    for (const n of NEIGHBORS[u.hexId] ?? []) blocked.add(n);
  }
  // Strip forest hexes from the blocked set — they always allow deployments.
  for (const id of [...blocked]) {
    const h = HEX_BY_ID[id];
    if (h && (h.region === 'Greatwoods' || h.region === 'North Woods')) {
      blocked.delete(id);
    }
  }
  return blocked;
}

export interface DeployTarget {
  hexId: number;
  isStrike: boolean; // true if deploying into all-At-Ease enemy hex
  blocked: false;
}

export function getDeployTargets(state: GameState, groupId: string): DeployTarget[] {
  const group = state.reserveGroups[groupId];
  if (!group) return [];
  const range = RANGE_BY_SPACE[group.space];
  const reachable = hexesWithinRange(group.removalHexId, range);
  const blocked = scoutedHexes(state, group.house);

  const result: DeployTarget[] = [];
  for (const hexId of reachable) {
    if (blocked.has(hexId)) continue; // passive scouting blocks this hex
    const occupants = Object.values(state.units).filter((u) => u.hexId === hexId);
    const enemies = occupants.filter((u) => u.house !== group.house && u.readiness !== 'subdued');
    if (enemies.length === 0) {
      result.push({ hexId, isStrike: false, blocked: false });
      continue;
    }
    // Enemy present — only allowed if ALL defenders are At Ease (Deployment Strike).
    // Subdued units don't count as defenders.
    const allAtEase = enemies.every((u) => u.readiness === 'at-ease');
    if (allAtEase) {
      result.push({ hexId, isStrike: true, blocked: false });
    }
    // else: alert defender means scouting would have blocked it anyway, skip
  }
  return result;
}

// Place all units of a group onto the board at `targetHexId`, Alert.
// Caller is responsible for triggering combat if target is a Deployment Strike.
export function applyDeploy(
  draft: GameState,
  groupId: string,
  targetHexId: number
): { unitIds: string[]; isStrike: boolean } | null {
  const group = draft.reserveGroups[groupId];
  if (!group) return null;
  const targets = getDeployTargets(draft, groupId);
  const target = targets.find((t) => t.hexId === targetHexId);
  if (!target) return null;

  for (const uid of group.unitIds) {
    const u = draft.units[uid];
    if (!u) continue;
    u.hexId = targetHexId;
    u.reserveSpace = undefined;
    u.readiness = 'alert';
    u.actedThisTurn = true; // deployed units have used their action this turn
  }

  draft.log.push(
    `${group.house} deployed ${group.unitIds.length} unit(s) to hex ${targetHexId}` +
      (target.isStrike ? ' — DEPLOYMENT STRIKE!' : '.')
  );

  const unitIds = [...group.unitIds];
  const isStrike = target.isStrike;
  delete draft.reserveGroups[groupId];
  return { unitIds, isStrike };
}

export { hexDistance };

// Forced retreat — used by combat resolution to send loser units to the RT.
// Bypasses the voluntary-withdrawal max cap (combat retreats can't be blocked).
export function retreatUnitsToRT(
  draft: GameState,
  unitIds: string[],
  removalHexId: number,
  house: HouseId
): string | null {
  if (unitIds.length === 0) return null;
  const groupId = `${house}-retreat-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  draft.reserveGroups[groupId] = {
    id: groupId,
    house,
    removalHexId,
    unitIds: [...unitIds],
    space: 1,
    createdRound: draft.round,
  };
  for (const id of unitIds) {
    const u = draft.units[id];
    if (!u) continue;
    u.hexId = null;
    u.reserveSpace = 1;
    u.readiness = 'alert';
    u.actedThisTurn = true;
  }
  return groupId;
}

// Recall — used by Mars Blood Rally and Apollo Healer's Art to pull a unit
// from the RT directly back into a hex (Alert, acted). Returns the recalled
// unit id, or null if no RT units exist.
export function recallFromRT(
  draft: GameState,
  house: HouseId,
  atHexId: number
): string | null {
  for (const g of Object.values(draft.reserveGroups)) {
    if (g.house !== house) continue;
    if (g.unitIds.length === 0) continue;
    const unitId = g.unitIds[0];
    g.unitIds = g.unitIds.slice(1);
    if (g.unitIds.length === 0) delete draft.reserveGroups[g.id];
    const u = draft.units[unitId];
    if (u) {
      u.hexId = atHexId;
      u.reserveSpace = undefined;
      u.readiness = 'alert';
      u.actedThisTurn = true;
    }
    return unitId;
  }
  return null;
}
