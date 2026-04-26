// Tactics Cards — 20-card universal deck. Earned through combat wins, castle
// captures, and discoveries. Each card is single-use, played simultaneously
// in combat (in v0.7 only the attacker plays — defender play is TODO).

export type TacticsCardCategory = 'strength' | 'tactical' | 'terrain' | 'special';

export interface TacticsCardDef {
  id: string;
  name: string;
  flavor: string;
  description: string;
  category: TacticsCardCategory;
  copies: number;
  // Set true if not yet implemented in the engine — UI shows a "WIP" badge.
  unimplemented?: boolean;
}

export const TACTICS_CARDS: TacticsCardDef[] = [
  // Strength (8)
  {
    id: 'flanking',
    name: 'Flanking Maneuver',
    flavor: '"They came from the side. We never repositioned."',
    description: '+2 combat strength.',
    category: 'strength',
    copies: 2,
  },
  {
    id: 'high-ground',
    name: 'High Ground',
    flavor: '"Elevation changes everything."',
    description: '+2 strength (+3 in Mountains/Highlands).',
    category: 'strength',
    copies: 2,
  },
  {
    id: 'overwhelming',
    name: 'Overwhelming Force',
    flavor: '"There were just too many of them."',
    description: '+3 combat strength.',
    category: 'strength',
    copies: 1,
  },
  {
    id: 'coordinated',
    name: 'Coordinated Assault',
    flavor: '"Every unit hit at once. Perfect timing."',
    description: '+1 strength per Alert unit you have in this combat.',
    category: 'strength',
    copies: 1,
  },
  {
    id: 'desperate',
    name: 'Desperate Stand',
    flavor: '"Nowhere to run. Might as well fight."',
    description: '+1 strength per unit fewer than opponent.',
    category: 'strength',
    copies: 2,
  },

  // Tactical (6)
  {
    id: 'shield-wall',
    name: 'Shield Wall',
    flavor: '"Lock shields. Hold the line."',
    description: 'Negate opponent\'s Tactics Card.',
    category: 'tactical',
    copies: 2,
    unimplemented: true,
  },
  {
    id: 'break-will',
    name: 'Break Their Will',
    flavor: '"They stopped fighting. Something just... died."',
    description: 'This combat: convert at 1:1 instead of 2:1.',
    category: 'tactical',
    copies: 1,
    unimplemented: true,
  },
  {
    id: 'feigned-retreat',
    name: 'Feigned Retreat',
    flavor: '"They thought we were running."',
    description: 'If you lose, retreat all survivors to an adjacent hex; no subdues.',
    category: 'tactical',
    copies: 1,
    unimplemented: true,
  },
  {
    id: 'snap-attention',
    name: 'Snap to Attention',
    flavor: '"On your feet. NOW."',
    description: 'Your At Ease units fight as Alert this combat.',
    category: 'tactical',
    copies: 1,
  },
  {
    id: 'caught-off-guard',
    name: 'Caught Off Guard',
    flavor: '"They looked ready. They weren\'t."',
    description: 'Opponent\'s Alert units fight as At Ease this combat.',
    category: 'tactical',
    copies: 1,
  },

  // Terrain (3)
  {
    id: 'scorched-earth',
    name: 'Scorched Earth',
    flavor: '"If we can\'t hold it, no one can."',
    description: 'Negate all terrain modifiers this combat.',
    category: 'terrain',
    copies: 1,
  },
  {
    id: 'dig-in',
    name: 'Dig In',
    flavor: '"They\'d built positions overnight."',
    description: 'Gain +2 fortification regardless of terrain.',
    category: 'terrain',
    copies: 1,
  },
  {
    id: 'forced-march',
    name: 'Forced March',
    flavor: '"We covered the ground in half the time."',
    description: 'Bring 2 adjacent units into this combat.',
    category: 'terrain',
    copies: 1,
    unimplemented: true,
  },

  // Special (3)
  {
    id: 'reaper',
    name: 'The Reaper',
    flavor: '"One warrior. One blade."',
    description: 'Your Special Unit (if present) counts as 4 Alert.',
    category: 'special',
    copies: 1,
  },
  {
    id: 'no-quarter',
    name: 'No Quarter',
    flavor: '"Surrender was not offered."',
    description: 'All subdues become conversions (still 15-unit cap).',
    category: 'special',
    copies: 1,
    unimplemented: true,
  },
  {
    id: 'last-words',
    name: 'Last Words',
    flavor: '"They fought to the end."',
    description: 'If you lose, subdue 1 enemy unit as you fall.',
    category: 'special',
    copies: 1,
    unimplemented: true,
  },
];

export const TACTICS_BY_ID: Record<string, TacticsCardDef> = Object.fromEntries(
  TACTICS_CARDS.map((c) => [c.id, c])
);

// Build a flat shuffleable deck — `copies` instances of each card id.
// Each instance has a unique key so duplicates can be tracked separately.
export function buildDeck(seed?: number): string[] {
  const out: string[] = [];
  for (const c of TACTICS_CARDS) {
    for (let i = 0; i < c.copies; i++) out.push(`${c.id}#${i}`);
  }
  // Fisher-Yates shuffle. Deterministic if seeded.
  let rngState = seed ?? Date.now();
  const rng = () => {
    rngState = (rngState * 1103515245 + 12345) & 0x7fffffff;
    return rngState / 0x7fffffff;
  };
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// Resolve "instance id" (e.g. "flanking#1") back to the card definition.
export function defOf(instanceId: string): TacticsCardDef | undefined {
  const baseId = instanceId.split('#')[0];
  return TACTICS_BY_ID[baseId];
}
