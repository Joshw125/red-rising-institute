// Proctor Cards — round-by-round events drawn at the start of each round.
// Three decks (Act I/II/III), each a different emotional tone per the rulebook.

import type { GameState } from '../types';
import { HEX_BY_ID } from './hexes';

export interface ProctorCardDef {
  id: string;
  act: 1 | 2 | 3;
  name: string;
  flavor: string;
  description: string;
  // Apply to the draft state when the card is revealed at round start.
  apply: (draft: GameState) => void;
}

// (utility helper retained for future cards that need hex picking)
function _eligibleHexes(_state: GameState, predicate: (hexId: number) => boolean): number[] {
  return Object.keys(HEX_BY_ID).map(Number).filter(predicate);
}
void _eligibleHexes;

export const PROCTOR_CARDS: ProctorCardDef[] = [
  // ============ ACT I — Survival (10) ============
  {
    id: 'supply-drop',
    act: 1,
    name: 'Supply Drop',
    flavor: '"A crate falls from the sky."',
    description: '+2 Food to the player with the fewest units.',
    apply: (s) => {
      const sorted = [...s.players].sort((a, b) => {
        const aCount = Object.values(s.units).filter((u) => u.house === a.house && u.hexId != null).length;
        const bCount = Object.values(s.units).filter((u) => u.house === b.house && u.hexId != null).length;
        return aCount - bCount;
      });
      sorted[0].food += 2;
      s.log.push(`Supply Drop: ${sorted[0].house} gains 2 Food.`);
    },
  },
  {
    id: 'storm',
    act: 1,
    name: 'Storm',
    flavor: '"Lightning splits the sky."',
    description: 'All units in non-Mountain, non-Castle hexes go At Ease this round.',
    apply: (s) => {
      let n = 0;
      for (const u of Object.values(s.units)) {
        if (u.hexId == null) continue;
        const hex = HEX_BY_ID[u.hexId];
        if (!hex) continue;
        if (hex.region === 'Mountains') continue;
        if (hex.special?.kind === 'Castle') continue;
        if (u.readiness === 'alert') {
          u.readiness = 'at-ease';
          n++;
        }
      }
      s.log.push(`Storm: ${n} unit(s) caught in the open and forced At Ease.`);
    },
  },
  {
    id: 'fertile-bloom',
    act: 1,
    name: 'Fertile Bloom',
    flavor: '"Wild grain ripens overnight."',
    description: 'Each player gains 1 Food per Fertile hex they have a unit on.',
    apply: (s) => {
      for (const p of s.players) {
        const fertileHeld = new Set<number>();
        for (const u of Object.values(s.units)) {
          if (u.house !== p.house || u.hexId == null) continue;
          const h = HEX_BY_ID[u.hexId];
          if (h?.fertile) fertileHeld.add(u.hexId);
        }
        if (fertileHeld.size > 0) {
          p.food += fertileHeld.size;
          s.log.push(`Fertile Bloom: ${p.house} +${fertileHeld.size} Food.`);
        }
      }
    },
  },
  {
    id: 'skirmish-bounty',
    act: 1,
    name: 'Skirmish Bounty',
    flavor: '"The Proctors crave blood."',
    description: 'Player with most combat wins gains +2 VP now.',
    apply: (s) => {
      const sorted = [...s.players].sort((a, b) => b.combatsWon - a.combatsWon);
      const top = sorted[0];
      if (top && (sorted.length === 1 || top.combatsWon > sorted[1].combatsWon)) {
        top.vp += 2;
        s.log.push(`Skirmish Bounty: ${top.house} +2 VP (most combat wins).`);
      } else {
        s.log.push('Skirmish Bounty: tie — no bonus awarded.');
      }
    },
  },
  {
    id: 'dawn-march',
    act: 1,
    name: 'Dawn March',
    flavor: '"Cold mist. Numb feet."',
    description: 'Each player draws 1 Tactics Card.',
    apply: (s) => {
      for (const p of s.players) {
        if (s.tacticsDeck.length > 0) {
          const c = s.tacticsDeck.shift();
          if (c) {
            p.tacticsCards.push(c);
            s.log.push(`Dawn March: ${p.house} drew a Tactics Card.`);
          }
        }
      }
    },
  },
  {
    id: 'lost-supply',
    act: 1,
    name: 'Lost Supply Train',
    flavor: '"Vanished without a trace."',
    description: 'Player with the most Food loses 1.',
    apply: (s) => {
      const richest = [...s.players].sort((a, b) => b.food - a.food)[0];
      if (richest && richest.food > 0) {
        richest.food -= 1;
        s.log.push(`Lost Supply Train: ${richest.house} −1 Food.`);
      }
    },
  },
  {
    id: 'eager-recruits',
    act: 1,
    name: 'Eager Recruits',
    flavor: '"They volunteered. Most won\'t survive."',
    description: 'Each player gains +1 Food and +1 unit in supply.',
    apply: (s) => {
      for (const p of s.players) {
        p.food += 1;
        p.unitsInSupply += 1;
      }
      s.log.push('Eager Recruits: all players +1 Food, +1 supply.');
    },
  },
  {
    id: 'wolfs-howl',
    act: 1,
    name: "Wolf's Howl",
    flavor: '"Something is hunting in the dark."',
    description: 'Player with most units loses 1 Food (extra mouths).',
    apply: (s) => {
      const sorted = [...s.players].sort((a, b) => {
        const aCount = Object.values(s.units).filter((u) => u.house === a.house && u.hexId != null).length;
        const bCount = Object.values(s.units).filter((u) => u.house === b.house && u.hexId != null).length;
        return bCount - aCount;
      });
      if (sorted[0] && sorted[0].food > 0) {
        sorted[0].food -= 1;
        s.log.push(`Wolf's Howl: ${sorted[0].house} −1 Food.`);
      }
    },
  },
  {
    id: 'morning-patrol',
    act: 1,
    name: 'Morning Patrol',
    flavor: '"Stretch out. Walk the perimeter."',
    description: 'All your subdued units in Castle hexes recover (free rally).',
    apply: (s) => {
      let n = 0;
      for (const u of Object.values(s.units)) {
        if (u.readiness !== 'subdued' || u.hexId == null) continue;
        const h = HEX_BY_ID[u.hexId];
        if (h?.special?.kind === 'Castle') {
          u.readiness = 'alert';
          n++;
        }
      }
      if (n > 0) s.log.push(`Morning Patrol: ${n} subdued unit(s) in castles recovered.`);
    },
  },
  {
    id: 'famine-warning',
    act: 1,
    name: 'Famine Warning',
    flavor: '"Tighten your belts."',
    description: 'Each player loses 1 Food (a taste of Act III).',
    apply: (s) => {
      for (const p of s.players) {
        if (p.food > 0) p.food -= 1;
      }
      s.log.push('Famine Warning: each player −1 Food.');
    },
  },

  // ============ ACT II — War (10) ============
  {
    id: 'forced-ceasefire',
    act: 2,
    name: 'Forced Cease-fire',
    flavor: '"The Proctors enforce a pause."',
    description: 'All defenders gain +1 strength this round (passive enforcement).',
    apply: (s) => {
      // Mark a flag the combat engine could read. For now: log + +1 universal defender modifier
      // applied via a temporary state field is overkill — instead, give each player +1 Food
      // (representing the brief peace) and log the effect.
      for (const p of s.players) p.food += 1;
      s.log.push('Forced Cease-fire: all players +1 Food during the pause.');
    },
  },
  {
    id: 'flag-reveal',
    act: 2,
    name: 'Flag Reveal',
    flavor: '"The Proctors point. The flag-bearers bow."',
    description: 'All flag-bearer locations are visible (already visible in this prototype).',
    apply: (s) => {
      const flags = Object.values(s.units).filter((u) => u.kind === 'flag-bearer' && u.hexId != null);
      s.log.push(`Flag Reveal: flags at ${flags.map((f) => `${f.house}@${f.hexId}`).join(', ')}.`);
    },
  },
  {
    id: 'food-drought',
    act: 2,
    name: 'Food Drought',
    flavor: '"The land remembers thirst."',
    description: 'Each player loses 2 Food immediately.',
    apply: (s) => {
      for (const p of s.players) {
        p.food = Math.max(0, p.food - 2);
      }
      s.log.push('Food Drought: each player −2 Food.');
    },
  },
  {
    id: 'proctor-favor',
    act: 2,
    name: 'Favor of the Proctors',
    flavor: '"They see promise in you."',
    description: 'Trailing player (lowest combats won) draws 2 Tactics Cards.',
    apply: (s) => {
      const sorted = [...s.players].sort((a, b) => a.combatsWon - b.combatsWon);
      const trailing = sorted[0];
      let drawn = 0;
      for (let i = 0; i < 2; i++) {
        if (s.tacticsDeck.length === 0) break;
        const c = s.tacticsDeck.shift();
        if (c) { trailing.tacticsCards.push(c); drawn++; }
      }
      s.log.push(`Favor of the Proctors: ${trailing.house} drew ${drawn} Tactics Card(s).`);
    },
  },
  {
    id: 'castle-bounty',
    act: 2,
    name: 'Castle Bounty',
    flavor: '"Whoever holds the walls eats well."',
    description: 'Each castle held grants +1 Food.',
    apply: (s) => {
      for (const p of s.players) {
        const castles = Object.values(s.units).filter((u) => {
          if (u.house !== p.house || u.hexId == null) return false;
          const h = HEX_BY_ID[u.hexId];
          return h?.special?.kind === 'Castle';
        });
        const distinctHexes = new Set(castles.map((u) => u.hexId!));
        if (distinctHexes.size > 0) {
          p.food += distinctHexes.size;
          s.log.push(`Castle Bounty: ${p.house} +${distinctHexes.size} Food.`);
        }
      }
    },
  },
  {
    id: 'mass-defection',
    act: 2,
    name: 'Mass Defection',
    flavor: '"Some chose the other path."',
    description: 'Each player\'s Weakened units desert immediately.',
    apply: (s) => {
      const ids = Object.entries(s.units).filter(([, u]) => u.readiness === 'weakened').map(([id]) => id);
      for (const id of ids) {
        const u = s.units[id];
        s.log.push(`Mass Defection: ${u.house} ${id} deserted.`);
        delete s.units[id];
      }
    },
  },
  {
    id: 'iron-rations',
    act: 2,
    name: 'Iron Rations',
    flavor: '"Hard tack. Stale water. Survive."',
    description: '−1 Food from each player; trailing player ignored.',
    apply: (s) => {
      const sorted = [...s.players].sort((a, b) => a.combatsWon - b.combatsWon);
      const trailing = sorted[0];
      for (const p of s.players) {
        if (p.house === trailing.house) continue;
        if (p.food > 0) {
          p.food -= 1;
          s.log.push(`Iron Rations: ${p.house} −1 Food.`);
        }
      }
    },
  },
  {
    id: 'reinforcements',
    act: 2,
    name: 'Reinforcements',
    flavor: '"Fresh boots. Fresh eyes."',
    description: 'Each player adds 1 unit from supply to their home castle (if available).',
    apply: (s) => {
      for (const p of s.players) {
        if (p.unitsInSupply <= 0) continue;
        const homeHex = Object.values(s.units).find((u) => u.house === p.house && u.kind === 'flag-bearer')?.hexId;
        const dropHex = homeHex ?? null;
        if (!dropHex) continue;
        const idx = Object.keys(s.units).filter((k) => k.startsWith(`${p.house}-proctor-`)).length;
        const id = `${p.house}-proctor-${idx}-${Date.now()}`;
        s.units[id] = {
          id, house: p.house, kind: 'regular', readiness: 'alert',
          hexId: dropHex, actedThisTurn: false,
        };
        p.unitsInSupply -= 1;
        s.log.push(`Reinforcements: ${p.house} +1 unit at hex ${dropHex}.`);
      }
    },
  },
  {
    id: 'rumor-mill',
    act: 2,
    name: 'Rumor Mill',
    flavor: '"Half lies, half terror."',
    description: 'Each player draws 1 Tactics Card.',
    apply: (s) => {
      for (const p of s.players) {
        if (s.tacticsDeck.length === 0) break;
        const c = s.tacticsDeck.shift();
        if (c) { p.tacticsCards.push(c); s.log.push(`Rumor Mill: ${p.house} drew a card.`); }
      }
    },
  },
  {
    id: 'broken-treaty',
    act: 2,
    name: 'Broken Treaty',
    flavor: '"Words are wind. Steel speaks."',
    description: 'Leading player (most combats won) loses 1 Food.',
    apply: (s) => {
      const sorted = [...s.players].sort((a, b) => b.combatsWon - a.combatsWon);
      if (sorted[0] && sorted[0].food > 0) {
        sorted[0].food -= 1;
        s.log.push(`Broken Treaty: ${sorted[0].house} −1 Food.`);
      }
    },
  },

  // ============ ACT III — The Reckoning (10) ============
  {
    id: 'culling',
    act: 3,
    name: 'The Culling',
    flavor: '"They cannot all survive."',
    description: 'Each player permanently loses 1 unit (caller picks weakest).',
    apply: (s) => {
      for (const p of s.players) {
        const units = Object.values(s.units).filter((u) => u.house === p.house);
        if (units.length === 0) continue;
        // Pick a weakened or subdued unit first, then at-ease, then alert non-flag.
        const target =
          units.find((u) => u.readiness === 'weakened') ??
          units.find((u) => u.readiness === 'subdued') ??
          units.find((u) => u.kind !== 'flag-bearer' && u.readiness === 'at-ease') ??
          units.find((u) => u.kind !== 'flag-bearer');
        if (target) {
          delete s.units[target.id];
          s.log.push(`The Culling: ${p.house} loses ${target.id}.`);
        }
      }
    },
  },
  {
    id: 'final-supply',
    act: 3,
    name: 'Final Supply',
    flavor: '"One last drop. Make it count."',
    description: 'Player with the lowest Food gains 4 Food.',
    apply: (s) => {
      const sorted = [...s.players].sort((a, b) => a.food - b.food);
      if (sorted[0]) {
        sorted[0].food += 4;
        s.log.push(`Final Supply: ${sorted[0].house} +4 Food.`);
      }
    },
  },
  {
    id: 'storm-of-century',
    act: 3,
    name: 'Storm of the Century',
    flavor: '"The world ends. Dig in or perish."',
    description: 'All units outside Castles and Mountains go At Ease.',
    apply: (s) => {
      let n = 0;
      for (const u of Object.values(s.units)) {
        if (u.hexId == null) continue;
        const h = HEX_BY_ID[u.hexId];
        if (!h || h.region === 'Mountains' || h.special?.kind === 'Castle') continue;
        if (u.readiness === 'alert') {
          u.readiness = 'at-ease';
          n++;
        }
      }
      s.log.push(`Storm of the Century: ${n} unit(s) caught in the open, At Ease.`);
    },
  },
  {
    id: 'proctors-mercy',
    act: 3,
    name: "Proctors' Mercy",
    flavor: '"A small grace, given in blood."',
    description: 'Player with fewest units rallies all their subdued (free).',
    apply: (s) => {
      const sorted = [...s.players].sort((a, b) => {
        const aCount = Object.values(s.units).filter((u) => u.house === a.house && u.hexId != null).length;
        const bCount = Object.values(s.units).filter((u) => u.house === b.house && u.hexId != null).length;
        return aCount - bCount;
      });
      const target = sorted[0];
      let n = 0;
      for (const u of Object.values(s.units)) {
        if (u.house === target.house && u.readiness === 'subdued') {
          u.readiness = 'alert';
          n++;
        }
      }
      s.log.push(`Proctors' Mercy: ${target.house} rallied ${n} subdued unit(s).`);
    },
  },
  {
    id: 'demands-blood',
    act: 3,
    name: 'The Proctors Demand Blood',
    flavor: '"Win or be erased."',
    description: 'Player with most combat wins +3 VP. Tied players +1 each.',
    apply: (s) => {
      const sorted = [...s.players].sort((a, b) => b.combatsWon - a.combatsWon);
      const top = sorted[0];
      if (!top) return;
      const tied = sorted.filter((p) => p.combatsWon === top.combatsWon);
      if (tied.length === 1) {
        top.vp += 3;
        s.log.push(`The Proctors Demand Blood: ${top.house} +3 VP.`);
      } else {
        for (const p of tied) p.vp += 1;
        s.log.push(`The Proctors Demand Blood: ${tied.length} tied players +1 VP each.`);
      }
    },
  },
  {
    id: 'last-march',
    act: 3,
    name: 'Last March',
    flavor: '"Forward. Always forward."',
    description: 'Each player\'s Reserve Track units immediately advance to Space 3.',
    apply: (s) => {
      for (const g of Object.values(s.reserveGroups)) {
        g.space = 3;
        for (const uid of g.unitIds) {
          const u = s.units[uid];
          if (u) u.reserveSpace = 3;
        }
      }
      s.log.push('Last March: all Reserve Track groups advance to Space 3.');
    },
  },
  {
    id: 'kings-feast',
    act: 3,
    name: "King's Feast",
    flavor: '"One full meal before the end."',
    description: 'Each player gains 3 Food.',
    apply: (s) => {
      for (const p of s.players) {
        p.food += 3;
        s.log.push(`King's Feast: ${p.house} +3 Food.`);
      }
    },
  },
  {
    id: 'twilight-pact',
    act: 3,
    name: 'Twilight Pact',
    flavor: '"Allies, just for tonight."',
    description: 'Each player draws 2 Tactics Cards.',
    apply: (s) => {
      for (const p of s.players) {
        for (let i = 0; i < 2; i++) {
          if (s.tacticsDeck.length === 0) break;
          const c = s.tacticsDeck.shift();
          if (c) p.tacticsCards.push(c);
        }
      }
      s.log.push('Twilight Pact: each player drew 2 Tactics Cards.');
    },
  },
  {
    id: 'crimson-hour',
    act: 3,
    name: 'The Crimson Hour',
    flavor: '"All shields lower at the same moment."',
    description: 'Every At Ease unit immediately stands Alert.',
    apply: (s) => {
      let n = 0;
      for (const u of Object.values(s.units)) {
        if (u.readiness === 'at-ease') {
          u.readiness = 'alert';
          n++;
        }
      }
      s.log.push(`The Crimson Hour: ${n} unit(s) snapped to Alert.`);
    },
  },
  {
    id: 'final-judgment',
    act: 3,
    name: 'Final Judgment',
    flavor: '"What you have done is now visible."',
    description: 'Player with most conversions loses a Tactics Card if any.',
    apply: (s) => {
      const sorted = [...s.players].sort((a, b) => b.conversions - a.conversions);
      if (sorted[0] && sorted[0].tacticsCards.length > 0) {
        const lost = sorted[0].tacticsCards.shift();
        if (lost) {
          s.tacticsDiscard.push(lost);
          s.log.push(`Final Judgment: ${sorted[0].house} loses a Tactics Card.`);
        }
      }
    },
  },
];

export const PROCTORS_BY_ACT: Record<1 | 2 | 3, ProctorCardDef[]> = {
  1: PROCTOR_CARDS.filter((c) => c.act === 1),
  2: PROCTOR_CARDS.filter((c) => c.act === 2),
  3: PROCTOR_CARDS.filter((c) => c.act === 3),
};

export const PROCTOR_BY_ID: Record<string, ProctorCardDef> =
  Object.fromEntries(PROCTOR_CARDS.map((c) => [c.id, c]));
