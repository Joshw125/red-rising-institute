// Per-player view filter for hidden information.
// The server runs this before broadcasting state, so each player sees only what
// they should: their own tactics cards (real IDs), their own objective, the
// public state of everything else.

import type { GameState, HouseId } from '../types';

const HIDDEN_CARD = '?';

export function filterStateForHouse(state: GameState, house: HouseId | null): GameState {
  return {
    ...state,
    players: state.players.map((p) => {
      if (p.house === house) return p;
      // Redact this player's secret info for the recipient
      return {
        ...p,
        tacticsCards: p.tacticsCards.map(() => HIDDEN_CARD),
        objectiveId: null,
      };
    }),
    // pendingCombat: hide the opponent's card during their pick phase
    pendingCombat: filterPendingCombat(state, house),
  };
}

function filterPendingCombat(state: GameState, house: HouseId | null): GameState['pendingCombat'] {
  const pc = state.pendingCombat;
  if (!pc) return null;
  if (pc.phase === 'resolved') return pc; // both cards revealed at this point

  // Determine which side this player is on
  const attackerHouse = state.units[pc.attackerUnitIds[0]]?.house ?? null;
  const isAttacker = house != null && attackerHouse === house;

  // During attacker-card phase: defender shouldn't see attacker's card pick
  // During defender-card phase: attacker shouldn't see defender's card pick
  if (pc.phase === 'attacker-card' && !isAttacker) {
    return { ...pc, attackerCardId: pc.attackerCardId ? HIDDEN_CARD : null };
  }
  if (pc.phase === 'defender-card' && isAttacker) {
    return { ...pc, defenderCardId: pc.defenderCardId ? HIDDEN_CARD : null };
  }
  return pc;
}
