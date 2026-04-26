// Pure-ish order resolution. Each function takes (draft, ...args) and mutates
// the draft in place — meant to be called inside an Immer producer.

import type { GameState, Unit, HouseId } from '../types';
import { HEX_BY_ID } from '../data/hexes';
import { NEIGHBORS } from './adjacency';

export type OrderKind = 'move' | 'gather' | 'hold' | 'recruit' | 'rally' | 'fortify' | 'explore';

// Free move is NOT an order — it's an optional 1-hex repositioning before the
// unit's order. Apollo's Sun's Reach extends this to 2 hexes.
export function applyFreeMove(
  draft: GameState,
  unitId: string,
  targetHexId: number
): boolean {
  const unit = draft.units[unitId];
  if (!unit) return false;
  if (unit.actedThisTurn) {
    draft.log.push(`! free-move denied: ${unitId} has already acted.`);
    return false;
  }
  if (unit.freeMoveUsed) {
    draft.log.push(`! free-move denied: ${unitId} already used its free move.`);
    return false;
  }
  if (unit.hexId == null) {
    draft.log.push(`! free-move denied: ${unitId} is on Reserve Track.`);
    return false;
  }
  // Range check is left to the UI (which knows about house abilities).
  unit.hexId = targetHexId;
  unit.freeMoveUsed = true;
  unit.readiness = 'alert';
  return true;
}

export function canIssueOrder(
  state: GameState,
  unit: Unit,
  order: OrderKind,
  targetHexId?: number
): { ok: boolean; reason?: string } {
  if (state.phase !== 'turn') return { ok: false, reason: 'Not in turn phase' };
  const player = state.players[state.currentPlayerIdx];
  if (!player || unit.house !== player.house)
    return { ok: false, reason: 'Not your unit' };
  if (unit.readiness === 'subdued' || unit.readiness === 'weakened')
    return { ok: false, reason: `Unit is ${unit.readiness}` };
  if (unit.actedThisTurn) return { ok: false, reason: 'Already acted this turn' };
  if (unit.hexId == null) return { ok: false, reason: 'Unit is on Reserve Track' };

  if (order === 'move') {
    if (targetHexId == null) return { ok: false, reason: 'No target hex' };
    if (!NEIGHBORS[unit.hexId]?.includes(targetHexId))
      return { ok: false, reason: 'Target not adjacent' };
  }

  if (order === 'gather') {
    const hex = HEX_BY_ID[unit.hexId];
    if (!hex) return { ok: false, reason: 'Invalid hex' };
    const isCastle = hex.special?.kind === 'Castle';
    if (!hex.fertile && !isCastle)
      return { ok: false, reason: 'Hex produces no Food' };
    // Max 1 gatherer per hex
    const existingGatherer = Object.values(state.units).some(
      (u) => u.id !== unit.id && u.hexId === unit.hexId && u.readiness === 'at-ease'
    );
    if (existingGatherer)
      return { ok: false, reason: 'Already a gatherer in this hex' };
  }

  if (order === 'recruit') {
    const cost = 3;
    if (player.food < cost) return { ok: false, reason: `Need ${cost} Food` };
    if (player.unitsInSupply <= 0) return { ok: false, reason: 'No units in supply' };
  }

  if (order === 'rally') {
    if (unit.hexId == null) return { ok: false, reason: 'Unit on Reserve Track' };
    // Rally now restores Weakened (starvation casualties) only; subdued no longer
    // persists in-hex under v6.1 combat aftermath.
    const weakenedHere = Object.values(state.units).some(
      (u) => u.hexId === unit.hexId && u.house === unit.house && u.readiness === 'weakened'
    );
    if (!weakenedHere) return { ok: false, reason: 'No Weakened unit here to rally' };
  }

  if (order === 'fortify') {
    if (player.food < 4) return { ok: false, reason: 'Need 4 Food' };
    if (state.fortifications.includes(unit.hexId!))
      return { ok: false, reason: 'Already fortified' };
  }

  if (order === 'explore') {
    if (unit.hexId == null) return { ok: false, reason: 'Unit on Reserve Track' };
    const hex = HEX_BY_ID[unit.hexId];
    if (hex?.special?.kind !== 'Discovery Site')
      return { ok: false, reason: 'Not a Discovery Site' };
    if (state.exploredSites?.includes(unit.hexId))
      return { ok: false, reason: 'Already explored' };
  }

  return { ok: true };
}

export function applyOrder(
  draft: GameState,
  unitId: string,
  order: OrderKind,
  targetHexId?: number
): void {
  const unit = draft.units[unitId];
  if (!unit) return;
  const check = canIssueOrder(draft, unit, order, targetHexId);
  if (!check.ok) {
    draft.log.push(`! ${unit.id}: ${check.reason}`);
    return;
  }

  const player = draft.players[draft.currentPlayerIdx];

  switch (order) {
    case 'move':
      unit.hexId = targetHexId!;
      unit.readiness = 'alert';
      draft.log.push(`${unit.house} moved ${unit.id} to hex ${targetHexId}.`);
      break;
    case 'gather':
      unit.readiness = 'at-ease';
      draft.log.push(`${unit.house} gathering at hex ${unit.hexId}.`);
      break;
    case 'hold':
      unit.readiness = 'alert';
      draft.log.push(`${unit.house} holds at hex ${unit.hexId}.`);
      break;
    case 'recruit': {
      const cost = 3;
      player.food -= cost;
      player.unitsInSupply -= 1;
      const idx = Object.keys(draft.units).filter((k) => k.startsWith(`${unit.house}-recruit-`)).length;
      const id = `${unit.house}-recruit-${idx}-${Date.now()}`;
      draft.units[id] = {
        id,
        house: unit.house,
        kind: 'regular',
        readiness: 'at-ease',
        hexId: unit.hexId!,
        actedThisTurn: true,
      };
      unit.readiness = 'at-ease';
      draft.log.push(`${unit.house} recruited a unit at hex ${unit.hexId} (−${cost} Food).`);
      break;
    }
    case 'rally': {
      // Restore 1 Weakened friendly unit in this hex to Alert.
      const weakened = Object.values(draft.units).find(
        (u) => u.hexId === unit.hexId && u.house === unit.house && u.readiness === 'weakened'
      );
      if (weakened) {
        weakened.readiness = 'alert';
        draft.log.push(`${unit.house} rallied ${weakened.id} at hex ${unit.hexId}.`);
      }
      unit.readiness = 'alert';
      break;
    }
    case 'fortify':
      player.food -= 4;
      draft.fortifications.push(unit.hexId!);
      unit.readiness = 'at-ease';
      draft.log.push(`${unit.house} fortified hex ${unit.hexId} (−4 Food).`);
      break;
    case 'explore': {
      const hexId = unit.hexId!;
      if (!draft.exploredSites) draft.exploredSites = [];
      draft.exploredSites.push(hexId);
      // Reward: draw 1 Tactics Card (we skip the Equipment-vs-Tactics choice for now)
      if (draft.tacticsDeck.length > 0) {
        const card = draft.tacticsDeck.shift()!;
        player.tacticsCards.push(card);
        draft.log.push(`${unit.house} explored Discovery Site @${hexId} → drew a Tactics Card.`);
      } else {
        // Fallback: +2 Food
        player.food += 2;
        draft.log.push(`${unit.house} explored Discovery Site @${hexId} → +2 Food (deck empty).`);
      }
      unit.readiness = 'at-ease';
      break;
    }
  }
  unit.actedThisTurn = true;
}

export function endTurn(draft: GameState): void {
  if (draft.phase !== 'turn') return;
  const nextIdx = (draft.currentPlayerIdx + 1) % draft.players.length;
  if (nextIdx === draft.firstPlayerIdx) {
    // All players acted — end of round
    endRound(draft);
  } else {
    draft.currentPlayerIdx = nextIdx;
    draft.log.push(`— ${draft.players[nextIdx].house} turn —`);
  }
}

export function endRound(draft: GameState): void {
  // 1. Starvation — gentler curve. Acts I & II share 1/5. Act III ramps to 1/3.
  const upkeepRate = draft.act === 3 ? 3 : 5;
  for (const player of draft.players) {
    const activeCount = Object.values(draft.units).filter(
      (u) =>
        u.house === player.house &&
        u.hexId != null &&
        u.readiness !== 'subdued' &&
        u.readiness !== 'weakened'
    ).length;
    const upkeep = Math.ceil(activeCount / upkeepRate);
    const paid = Math.min(player.food, upkeep);
    player.food -= paid;
    if (paid < upkeep) {
      const shortfall = upkeep - paid;
      // Weaken `shortfall` units of this player's choice — for now, weaken the first N
      let toWeaken = shortfall;
      for (const u of Object.values(draft.units)) {
        if (toWeaken === 0) break;
        if (u.house === player.house && u.hexId != null && u.readiness === 'alert') {
          u.readiness = 'weakened';
          toWeaken--;
        }
      }
      draft.log.push(`${player.house} starved — ${shortfall} unit(s) weakened.`);
    } else {
      draft.log.push(`${player.house} paid ${upkeep} Food upkeep.`);
    }
  }

  // 2. Collection (Food per At Ease unit on fertile/castle hex)
  // Captured castles produce 2 Food; fertile hexes produce 1.
  // Minerva Highland Gatherers produce 2 Food (resource bonus).
  const gatheredHexes = new Set<number>();
  for (const u of Object.values(draft.units)) {
    if (u.readiness !== 'at-ease' || u.hexId == null) continue;
    if (gatheredHexes.has(u.hexId)) continue;
    const hex = HEX_BY_ID[u.hexId];
    if (!hex) continue;
    const isCastle = hex.special?.kind === 'Castle';
    const isCapturedCastle = isCastle && draft.fortifications.includes(u.hexId);
    if (!hex.fertile && !isCastle) continue;
    const player = draft.players.find((p) => p.house === u.house);
    if (!player) continue;
    let yieldAmount = 1;
    if (isCapturedCastle) yieldAmount = 2;
    if (u.house === 'Minerva' && hex.region === 'Highlands') yieldAmount = 2;
    player.food += yieldAmount;
    gatheredHexes.add(u.hexId);
  }

  // 2.5 Desertion — Weakened units that haven't been rallied this round desert.
  // (In a real game players can spend 1 Food per Weakened unit to rally before
  // this step. v0.8 auto-skips the rally and just deserts them.)
  const deserters: string[] = [];
  for (const u of Object.values(draft.units)) {
    if (u.readiness === 'weakened') deserters.push(u.id);
  }
  for (const id of deserters) {
    const u = draft.units[id];
    draft.log.push(`${u.house} unit ${id} deserted (Weakened, not rallied).`);
    delete draft.units[id];
  }

  // 3. Reset acted/free-move flags, advance round
  for (const u of Object.values(draft.units)) {
    u.actedThisTurn = false;
    u.freeMoveUsed = false;
  }

  draft.round += 1;
  if (draft.round === 5) draft.act = 2;
  if (draft.round === 9) draft.act = 3;
  if (draft.round > 12) {
    // Final scoring — winner is set by the store via determineWinner()
    draft.phase = 'game-over';
    draft.log.push('Round 12 complete — final scoring.');
    return;
  }

  // First player rotates
  draft.firstPlayerIdx = (draft.firstPlayerIdx + 1) % draft.players.length;
  draft.currentPlayerIdx = draft.firstPlayerIdx;
  draft.log.push(`— Round ${draft.round} (Act ${draft.act}) —`);
}

// Whose TURN it currently is in the game. Use this for "is it X's turn?" checks
// and turn indicators.
export function currentPlayerHouse(state: GameState): HouseId | null {
  return state.players[state.currentPlayerIdx]?.house ?? null;
}

// The LOCAL user's House — i.e., which player am I, regardless of whose turn it is.
// In multiplayer this comes from useMultiplayerStore.myHouse. In local hot-seat
// mode it falls back to currentPlayerHouse so the same UI works in both modes.
export function localPlayerHouse(
  state: GameState,
  multiplayerHouse: HouseId | null
): HouseId | null {
  return multiplayerHouse ?? currentPlayerHouse(state);
}
