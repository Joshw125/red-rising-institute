import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { GameState, HouseId, Unit } from '@shared/types';
import { HOUSES } from '@shared/data/houses';
import {
  applyOrder,
  applyFreeMove,
  endTurn as engineEndTurn,
  type OrderKind,
} from '@shared/engine/orders';
import { applyAttack } from '@shared/engine/combat';
import { buildDeck } from '@shared/data/tactics';
import {
  withdrawUnits as engineWithdraw,
  advanceReserves,
  applyDeploy,
} from '@shared/engine/reserve';
import { determineWinner, checkDomination } from '@shared/engine/scoring';
import { NEIGHBORS } from '@shared/engine/adjacency';
import { PROCTORS_BY_ACT, PROCTOR_BY_ID } from '@shared/data/proctors';
import { OBJECTIVES } from '@shared/data/objectives';
import { useMultiplayerStore } from './multiplayer';
import type { GameAction } from '@shared/types/multiplayer';

// Forward an action to the server when in multiplayer mode. Returns true if
// dispatched (caller should NOT also apply locally). Returns false in local mode.
function maybeDispatchToServer(action: GameAction): boolean {
  const mp = useMultiplayerStore.getState();
  if (mp.room?.status === 'playing') {
    mp.sendAction(action);
    return true;
  }
  return false;
}

interface GameStore extends GameState {
  selectHex: (id: number | null) => void;
  selectUnit: (id: string | null) => void;
  issueFreeMove: (unitId: string, targetHexId: number) => void;
  issueOrder: (unitId: string, order: OrderKind, targetHexId?: number) => void;
  startAttack: (attackerUnitId: string, targetHexId: number) => void;
  toggleAttackerCompanion: (unitId: string) => void;
  setAttackerCard: (cardInstanceId: string | null) => void;
  setDefenderCard: (cardInstanceId: string | null) => void;
  advanceCombatPhase: () => void;
  withdrawHex: (hexId: number) => void;
  startDeploy: (groupId: string) => void;
  cancelDeploy: () => void;
  confirmDeploy: (targetHexId: number) => void;
  confirmCombat: () => void;
  cancelCombat: () => void;
  confirmHunt: (targetHexId: number) => void;
  skipHunt: () => void;
  endTurn: () => void;
  initDemoGame: (houses: HouseId[]) => void;
}

function makeUnit(house: HouseId, kind: Unit['kind'], hexId: number, idx: number): Unit {
  return {
    id: `${house}-${kind}-${idx}`,
    house,
    kind,
    readiness: 'alert',
    hexId,
    actedThisTurn: false,
  };
}

export const useGameStore = create<GameStore>()(
  immer((set) => ({
    round: 1,
    act: 1,
    phase: 'setup',
    currentPlayerIdx: 0,
    firstPlayerIdx: 0,
    players: [],
    units: {},
    fortifications: [],
    garrisons: { 8: 3, 18: 3, 32: 2, 38: 4, 65: 3, 70: 3 },
    selectedHexId: null,
    selectedUnitId: null,
    reserveGroups: {},
    deployMode: null,
    pendingCombat: null,
    pendingHunt: null,
    gameOver: null,
    exploredSites: [],
    tacticsDeck: [],
    tacticsDiscard: [],
    pendingCardId: null,
    proctorDecks: { 1: [], 2: [], 3: [] },
    proctorDiscard: [],
    currentProctorId: null,
    log: ['Game initialized.'],

    selectHex: (id) => {
      // Selection state is local — never dispatch to server (would round-trip every click)
      set((s) => {
        s.selectedHexId = id;
        s.selectedUnitId = null;
      });
    },

    selectUnit: (id) => {
      set((s) => {
        s.selectedUnitId = id;
      });
    },

    issueFreeMove: (unitId, targetHexId) => {
      if (maybeDispatchToServer({ kind: 'issueFreeMove', unitId, targetHexId })) return;
      set((s) => {
        applyFreeMove(s, unitId, targetHexId);
        s.selectedHexId = targetHexId;
      });
    },

    issueOrder: (unitId, order, targetHexId) => {
      if (maybeDispatchToServer({ kind: 'issueOrder', unitId, order, targetHexId })) return;
      set((s) => {
        applyOrder(s, unitId, order, targetHexId);
        s.selectedUnitId = null;
        if (order === 'move' && targetHexId != null) s.selectedHexId = targetHexId;
      });
    },

    startAttack: (attackerUnitId, targetHexId) => {
      if (maybeDispatchToServer({ kind: 'startAttack', attackerUnitId, targetHexId })) return;
      set((s) => {
        s.pendingCombat = {
          kind: 'attack',
          phase: 'attacker-card',
          attackerUnitIds: [attackerUnitId],
          targetHexId,
          attackerCardId: null,
          defenderCardId: null,
        };
        s.pendingCardId = null;
      });
    },

    toggleAttackerCompanion: (unitId) => {
      if (maybeDispatchToServer({ kind: 'toggleAttackerCompanion', unitId })) return;
      set((s) => {
        if (!s.pendingCombat) return;
        const ids = s.pendingCombat.attackerUnitIds;
        const idx = ids.indexOf(unitId);
        if (idx >= 0) {
          if (ids.length > 1) ids.splice(idx, 1);
        } else {
          ids.push(unitId);
        }
      });
    },

    setAttackerCard: (cardInstanceId) => {
      if (maybeDispatchToServer({ kind: 'setAttackerCard', cardInstanceId })) return;
      set((s) => {
        if (s.pendingCombat) s.pendingCombat.attackerCardId = cardInstanceId;
      });
    },

    setDefenderCard: (cardInstanceId) => {
      if (maybeDispatchToServer({ kind: 'setDefenderCard', cardInstanceId })) return;
      set((s) => {
        if (s.pendingCombat) s.pendingCombat.defenderCardId = cardInstanceId;
      });
    },

    advanceCombatPhase: () => {
      if (maybeDispatchToServer({ kind: 'advanceCombatPhase' })) return;
      set((s) => {
        if (!s.pendingCombat) return;
        if (s.pendingCombat.phase === 'attacker-card') {
          s.pendingCombat.phase = 'defender-card';
        } else if (s.pendingCombat.phase === 'defender-card') {
          s.pendingCombat.phase = 'resolved';
        }
      });
    },

    // Legacy alias retained for compat — sets the attacker card.
    setPendingCard: (cardInstanceId: string | null) =>
      set((s) => {
        if (s.pendingCombat) s.pendingCombat.attackerCardId = cardInstanceId;
      }),

    withdrawHex: (hexId) => {
      if (maybeDispatchToServer({ kind: 'withdrawHex', hexId })) return;
      set((s) => {
        const player = s.players[s.currentPlayerIdx];
        if (!player) return;
        engineWithdraw(s, player.house, hexId);
        s.selectedUnitId = null;
      });
    },

    startDeploy: (groupId) => {
      if (maybeDispatchToServer({ kind: 'startDeploy', groupId })) return;
      set((s) => {
        s.deployMode = { groupId };
        s.selectedUnitId = null;
      });
    },

    cancelDeploy: () => {
      if (maybeDispatchToServer({ kind: 'cancelDeploy' })) return;
      set((s) => {
        s.deployMode = null;
      });
    },

    confirmDeploy: (targetHexId) => {
      if (maybeDispatchToServer({ kind: 'confirmDeploy', targetHexId })) return;
      set((s) => {
        if (!s.deployMode) return;
        const groupId = s.deployMode.groupId;
        const group = s.reserveGroups[groupId];
        if (!group) {
          s.deployMode = null;
          return;
        }
        // Check if this is a Deployment Strike — combat preview required.
        const enemies = Object.values(s.units).filter(
          (u) => u.hexId === targetHexId && u.house !== group.house && u.readiness !== 'subdued'
        );
        if (enemies.length > 0) {
          s.pendingCombat = {
            kind: 'deployment-strike',
            phase: 'attacker-card',
            attackerUnitIds: [...group.unitIds],
            targetHexId,
            groupId,
            attackerCardId: null,
            defenderCardId: null,
          };
          s.deployMode = null;
        } else {
          // Direct deploy.
          applyDeploy(s, groupId, targetHexId);
          s.deployMode = null;
          s.selectedHexId = targetHexId;
        }
      });
    },

    confirmCombat: () => {
      if (maybeDispatchToServer({ kind: 'confirmCombat' })) return;
      set((s) => {
        if (!s.pendingCombat) return;
        const pc = s.pendingCombat;
        const aCard = pc.attackerCardId ?? null;
        const dCard = pc.defenderCardId ?? null;
        const opts = {
          autoConvert: true,
          attackerCardId: aCard,
          defenderCardId: dCard,
        };
        let result;
        if (pc.kind === 'deployment-strike' && pc.groupId) {
          applyDeploy(s, pc.groupId, pc.targetHexId);
          result = applyAttack(s, pc.attackerUnitIds, pc.targetHexId, opts);
        } else {
          result = applyAttack(s, pc.attackerUnitIds, pc.targetHexId, opts);
        }
        s.pendingCombat = null;
        s.pendingCardId = null;
        s.selectedUnitId = null;
        s.selectedHexId = pc.targetHexId;

        if (!result) return;

        // Flag capture → instant win in 2-player.
        if (result.flagCaptured && s.players.length === 2) {
          s.gameOver = {
            winner: result.flagCaptured.capturedBy,
            reason: `Captured ${result.flagCaptured.from}'s Flag-bearer.`,
          };
          s.phase = 'game-over';
          return;
        }

        // Diana The Hunt — surviving attackers may follow up 1 hex.
        if (result.dianaHunt) {
          s.pendingHunt = {
            attackerUnitIds: result.dianaHunt.attackerUnitIds,
            fromHexId: result.dianaHunt.fromHexId,
          };
        }
      });
    },

    cancelCombat: () => {
      if (maybeDispatchToServer({ kind: 'cancelCombat' })) return;
      set((s) => {
        s.pendingCombat = null;
        s.pendingCardId = null;
      });
    },

    confirmHunt: (targetHexId) => {
      if (maybeDispatchToServer({ kind: 'confirmHunt', targetHexId })) return;
      set((s) => {
        if (!s.pendingHunt) return;
        const { attackerUnitIds, fromHexId } = s.pendingHunt;
        if (!NEIGHBORS[fromHexId]?.includes(targetHexId)) {
          s.pendingHunt = null;
          return;
        }
        for (const id of attackerUnitIds) {
          const u = s.units[id];
          if (!u) continue;
          u.hexId = targetHexId;
          u.readiness = 'alert';
        }
        s.log.push(`Diana — The Hunt: ${attackerUnitIds.length} unit(s) advanced to hex ${targetHexId}.`);
        s.pendingHunt = null;
        s.selectedHexId = targetHexId;
      });
    },

    skipHunt: () => {
      if (maybeDispatchToServer({ kind: 'skipHunt' })) return;
      set((s) => {
        s.pendingHunt = null;
      });
    },

    endTurn: () => {
      if (maybeDispatchToServer({ kind: 'endTurn' })) return;
      set((s) => {
        const roundBefore = s.round;
        engineEndTurn(s);
        s.deployMode = null;
        s.selectedUnitId = null;
        if (s.phase === 'game-over' && !s.gameOver) {
          const result = determineWinner(s);
          s.gameOver = {
            winner: result.winner,
            reason: 'Round 12 final scoring.',
            vp: result.vp,
          };
          s.log.push(`*** ${result.winner} wins! ***`);
          return;
        }
        // Check domination after every round end.
        if (s.round > roundBefore) {
          const dominator = checkDomination(s);
          if (dominator && !s.gameOver) {
            s.gameOver = { winner: dominator, reason: 'Domination — 34+ hexes held.' };
            s.phase = 'game-over';
            s.log.push(`*** ${dominator} achieves DOMINATION! ***`);
            return;
          }
        }
        // Auto-advance the new current player's reserve groups.
        const newCurrent = s.players[s.currentPlayerIdx];
        if (newCurrent) advanceReserves(s, newCurrent.house);
        // If we entered a new round, discard the prior proctor and draw a fresh one.
        if (s.round > roundBefore) {
          if (s.currentProctorId) {
            s.proctorDiscard.push(s.currentProctorId);
            s.currentProctorId = null;
          }
          const deck = s.proctorDecks[s.act];
          if (deck && deck.length > 0) {
            const id = deck.shift()!;
            s.currentProctorId = id;
            const card = PROCTOR_BY_ID[id];
            if (card) {
              s.log.push(`— Proctor: ${card.name} —`);
              card.apply(s);
            }
          }
        }
      });
    },

    initDemoGame: (houses) =>
      set((s) => {
        const shuffledObjectives = [...OBJECTIVES].sort(() => Math.random() - 0.5);
        s.players = houses.map((h, i) => ({
          house: h,
          food: 7,
          tacticsCards: [],
          vp: 0,
          combatsWon: 0,
          conversions: 0,
          oncePerGameUsed: false,
          removalMarkerHexId: null,
          unitsInSupply: 5,
          objectiveId: shuffledObjectives[i % shuffledObjectives.length].id,
        }));
        s.units = {};
        s.reserveGroups = {};
        s.exploredSites = [];
        s.tacticsDeck = buildDeck();
        s.tacticsDiscard = [];
        s.pendingCardId = null;
        // Shuffle Proctor decks per act using a Fisher-Yates with deterministic-ish seed.
        const shuffle = <T,>(arr: T[]): T[] => {
          const out = [...arr];
          let r = Date.now() & 0x7fffffff;
          for (let i = out.length - 1; i > 0; i--) {
            r = (r * 1103515245 + 12345) & 0x7fffffff;
            const j = r % (i + 1);
            [out[i], out[j]] = [out[j], out[i]];
          }
          return out;
        };
        s.proctorDecks = {
          1: shuffle(PROCTORS_BY_ACT[1].map((c) => c.id)),
          2: shuffle(PROCTORS_BY_ACT[2].map((c) => c.id)),
          3: shuffle(PROCTORS_BY_ACT[3].map((c) => c.id)),
        };
        s.proctorDiscard = [];
        s.currentProctorId = null;
        // Demo placement spreads units so each fertile gathering hex has its own
        // soldier (gathering is capped at 1/hex). Each house has: 1 castle defender,
        // 5-6 gatherers, 1-2 mobile/forward, 1 special (forward), 1 flag (castle).
        // Mars and Diana have forward units in Argos River (47 & 48 adjacent) so
        // combat can be tested without cross-map marches.
        // Index order: 8 regulars, then flag-bearer, then special.
        const placement: Record<HouseId, number[]> = {
          Mars: [
            45,         // r0: castle defender
            35, 37, 56, // r1-r3: 3 gatherers in Southern Reaches fertile
            57, 73,     // r4-r5: 2 more gatherers
            46, 55,     // r6-r7: forward defenders (barren)
            45,         // flag-bearer: castle
            47,         // special (Howler): forward Argos
          ],
          Diana: [
            52,         // r0: castle defender
            41, 43, 51, // r1-r3: 3 gatherers in Greatwoods fertile
            53, 62,     // r4-r5: 2 more gatherers
            63, 50,     // r6-r7: forward (Greatwoods)
            52,         // flag-bearer: castle
            48,         // special (Shadow): forward Argos
          ],
          Minerva: [6, 11, 20, 21, 13, 12, 5, 22, 6, 30],
          Apollo:  [75, 74, 76, 77, 68, 69, 71, 73, 75, 70],
        };
        houses.forEach((h) => {
          const hexes = placement[h];
          for (let i = 0; i < 8; i++) {
            const u = makeUnit(h, 'regular', hexes[i] ?? HOUSES[h].homeCastleHexId, i);
            s.units[u.id] = u;
          }
          const flag = makeUnit(h, 'flag-bearer', hexes[8] ?? HOUSES[h].homeCastleHexId, 0);
          s.units[flag.id] = flag;
          const sp = makeUnit(h, 'special', hexes[9] ?? HOUSES[h].homeCastleHexId, 0);
          s.units[sp.id] = sp;
        });
        s.phase = 'turn';
        s.log.push(`Demo game started: ${houses.join(' vs ')}.`);
        // Draw the first Proctor card AFTER placement so unit-aware effects fire.
        const firstId = s.proctorDecks[1].shift();
        if (firstId) {
          s.currentProctorId = firstId;
          const card = PROCTOR_BY_ID[firstId];
          if (card) {
            s.log.push(`— Proctor: ${card.name} —`);
            card.apply(s);
          }
        }
        s.log.push(`— ${houses[0]} turn —`);
      }),
  }))
);
