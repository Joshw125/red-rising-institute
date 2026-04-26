// Final VP scoring + tiebreaker logic.
import type { GameState, HouseId } from '../types';
import { CASTLES, CASTLE_BY_HEX } from '../data/hexes';
import { OBJECTIVE_BY_ID } from '../data/objectives';

void OBJECTIVE_BY_ID; // re-exported below for callers; computeVP uses it indirectly via player.objectiveId
void CASTLE_BY_HEX;

export interface VPBreakdown {
  combatsWon: number;
  conversions: number;
  neutralCastles: number; // hex IDs held
  enemyHomeCastles: number;
  total: number;
  details: { label: string; value: number }[];
}

// A hex is "held" by a player if they have at least one active (non-subdued,
// non-weakened) unit on the hex AND no enemy active units there.
export function hexHolder(state: GameState, hexId: number): HouseId | null {
  const occupants = Object.values(state.units).filter(
    (u) =>
      u.hexId === hexId &&
      u.readiness !== 'subdued' &&
      u.readiness !== 'weakened'
  );
  if (occupants.length === 0) return null;
  const houses = new Set(occupants.map((u) => u.house));
  if (houses.size > 1) return null;
  return [...houses][0];
}

// Count how many hexes (any kind) a house controls.
export function hexControlCount(state: GameState, house: HouseId): number {
  let n = 0;
  // Iterate all 77 hexes. Use the unit map to get unique held hexes.
  const held = new Set<number>();
  for (const u of Object.values(state.units)) {
    if (u.house !== house || u.hexId == null) continue;
    if (u.readiness === 'subdued' || u.readiness === 'weakened') continue;
    held.add(u.hexId);
  }
  for (const hexId of held) {
    if (hexHolder(state, hexId) === house) n++;
  }
  return n;
}

// Check if any player has reached the 34-hex (50%+) domination threshold.
export function checkDomination(state: GameState): HouseId | null {
  for (const p of state.players) {
    if (hexControlCount(state, p.house) >= 34) return p.house;
  }
  return null;
}

export function castleHolder(state: GameState, hexId: number): HouseId | null {
  const occupants = Object.values(state.units).filter(
    (u) =>
      u.hexId === hexId &&
      u.readiness !== 'subdued' &&
      u.readiness !== 'weakened'
  );
  if (occupants.length === 0) return null;
  const houses = new Set(occupants.map((u) => u.house));
  if (houses.size > 1) return null; // contested
  return [...houses][0];
}

export function computeVP(state: GameState, house: HouseId): VPBreakdown {
  const player = state.players.find((p) => p.house === house);
  if (!player) {
    return { combatsWon: 0, conversions: 0, neutralCastles: 0, enemyHomeCastles: 0, total: 0, details: [] };
  }

  let neutralCastles = 0;
  let enemyHomeCastles = 0;
  for (const c of CASTLES) {
    const holder = castleHolder(state, c.hexId);
    if (holder !== house) continue;
    if (c.type === 'neutral') neutralCastles += 1;
    else if (c.house !== house) enemyHomeCastles += 1;
  }

  const combatsWon = player.combatsWon;
  const conversions = player.conversions;
  // Castle-held VP rebalanced down to discourage turtling — captures pay big up-front
  // (5 VP added to player.vp on the capture event), holding pays only a small bonus.
  const heldNeutral = neutralCastles * 1;
  const heldEnemy = enemyHomeCastles * 2;
  const conversionsVP = conversions * 2;
  const captureVP = player.vp; // one-time captures and other events accumulate here
  const total = heldNeutral + heldEnemy + combatsWon + conversionsVP + captureVP;

  return {
    combatsWon,
    conversions,
    neutralCastles,
    enemyHomeCastles,
    total,
    details: [
      { label: `Captures + bonuses (running)`, value: captureVP },
      { label: `Combats won (${combatsWon} × 1)`, value: combatsWon },
      { label: `Conversions (${conversions} × 2)`, value: conversionsVP },
      { label: `Neutral castles held (${neutralCastles} × 1)`, value: heldNeutral },
      { label: `Enemy home castles held (${enemyHomeCastles} × 2)`, value: heldEnemy },
    ],
  };
}

export function determineWinner(state: GameState): { winner: HouseId; vp: Record<HouseId, number> } {
  const vp = {} as Record<HouseId, number>;
  for (const p of state.players) vp[p.house] = computeVP(state, p.house).total;

  // Sort by VP desc, then tiebreakers:
  // 1. Most castles held
  // 2. Most combats won
  // 3. Most Food
  // 4. Most conversions
  const sorted = [...state.players].sort((a, b) => {
    const av = vp[a.house];
    const bv = vp[b.house];
    if (av !== bv) return bv - av;
    const aCastles = countCastles(state, a.house);
    const bCastles = countCastles(state, b.house);
    if (aCastles !== bCastles) return bCastles - aCastles;
    if (a.combatsWon !== b.combatsWon) return b.combatsWon - a.combatsWon;
    if (a.food !== b.food) return b.food - a.food;
    return b.conversions - a.conversions;
  });

  return { winner: sorted[0].house, vp };
}

function countCastles(state: GameState, house: HouseId): number {
  let n = 0;
  for (const c of CASTLES) {
    if (castleHolder(state, c.hexId) === house) n += 1;
  }
  return n;
}

// Re-export for convenience.
export { CASTLE_BY_HEX };
