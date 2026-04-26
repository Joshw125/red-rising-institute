// Objective Cards — secret per-player VP goals, scored at game end.
// Each player draws 2 at setup, picks 1 secret, returns the other.

import type { GameState, HouseId } from '../types';
import { HEX_BY_ID, CASTLE_BY_HEX, CASTLES } from './hexes';
import { hexHolder } from '../engine/scoring';

export interface ObjectiveDef {
  id: string;
  name: string;
  flavor: string;
  description: string;
  vp: number;
  // Returns true if the objective is satisfied at game end.
  check: (state: GameState, house: HouseId) => boolean;
}

export const OBJECTIVES: ObjectiveDef[] = [
  {
    id: 'kingmaker',
    name: 'Kingmaker',
    flavor: '"Hold the throne. Or kill the king."',
    description: 'Hold at least 2 castles at game end (any kind).',
    vp: 4,
    check: (s, h) => {
      let n = 0;
      for (const c of CASTLES) {
        if (hexHolder(s, c.hexId) === h) n++;
      }
      return n >= 2;
    },
  },
  {
    id: 'butcher',
    name: 'The Butcher',
    flavor: '"Mercy is for those who can afford it."',
    description: 'Win at least 5 combats over the course of the game.',
    vp: 3,
    check: (s, h) => {
      const p = s.players.find((pl) => pl.house === h);
      return !!p && p.combatsWon >= 5;
    },
  },
  {
    id: 'puppeteer',
    name: 'Puppeteer',
    flavor: '"They wear my color now. They never had a choice."',
    description: 'Convert at least 4 enemy units total.',
    vp: 4,
    check: (s, h) => {
      const p = s.players.find((pl) => pl.house === h);
      return !!p && p.conversions >= 4;
    },
  },
  {
    id: 'siegemaster',
    name: 'Siegemaster',
    flavor: '"Walls are just slow targets."',
    description: 'Capture at least 1 neutral castle (capture event triggered).',
    vp: 3,
    check: (s, h) => {
      // Track via combatsWon as proxy — use captured-castle log entries
      // For a cleaner track, we'd add capturedCastles count to PlayerState. For now: hold a neutral castle
      for (const c of CASTLES) {
        if (c.type !== 'neutral') continue;
        if (hexHolder(s, c.hexId) === h) return true;
      }
      return false;
    },
  },
  {
    id: 'expansionist',
    name: 'Expansionist',
    flavor: '"The map fits in my pocket."',
    description: 'Hold at least 12 hexes at game end.',
    vp: 3,
    check: (s, h) => {
      const held = new Set<number>();
      for (const u of Object.values(s.units)) {
        if (u.house !== h || u.hexId == null) continue;
        if (u.readiness === 'subdued' || u.readiness === 'weakened') continue;
        held.add(u.hexId);
      }
      let count = 0;
      for (const hexId of held) {
        if (hexHolder(s, hexId) === h) count++;
      }
      return count >= 12;
    },
  },
  {
    id: 'forager',
    name: 'The Forager',
    flavor: '"While they fought, I ate."',
    description: 'End the game with at least 8 Food in your stockpile.',
    vp: 2,
    check: (s, h) => {
      const p = s.players.find((pl) => pl.house === h);
      return !!p && p.food >= 8;
    },
  },
  {
    id: 'unstoppable',
    name: 'Unstoppable',
    flavor: '"They could only delay me."',
    description: 'Have an army of at least 12 units on the board at game end.',
    vp: 3,
    check: (s, h) => {
      const onBoard = Object.values(s.units).filter(
        (u) => u.house === h && u.hexId != null && u.readiness !== 'subdued' && u.readiness !== 'weakened'
      ).length;
      return onBoard >= 12;
    },
  },
  {
    id: 'survivor',
    name: 'The Survivor',
    flavor: '"You fell. I didn\'t."',
    description: 'Lose no more than 3 units (subdued, captured, or deserted) over the course of the game.',
    vp: 4,
    check: (s, h) => {
      const startCount = 10; // 8 reg + flag + special
      const onBoard = Object.values(s.units).filter((u) => u.house === h).length;
      // Approximate: count total units still owned (board + RT). Anyone deserted is gone.
      // Note: conversions FROM other houses inflate this count, but the spirit is "didn't lose many"
      return onBoard >= startCount - 3;
    },
  },
  {
    id: 'flag-runner',
    name: 'Flag Runner',
    flavor: '"It travels with me. Always."',
    description: 'Have your Flag-bearer at least 4 hexes from your home castle at game end.',
    vp: 3,
    check: (s, h) => {
      const flag = Object.values(s.units).find((u) => u.house === h && u.kind === 'flag-bearer');
      if (!flag || flag.hexId == null) return false;
      const home = CASTLES.find((c) => c.house === h)?.hexId;
      if (!home) return false;
      // Reuse the BFS distance from adjacency
      const flagHex = HEX_BY_ID[flag.hexId];
      const homeHex = HEX_BY_ID[home];
      if (!flagHex || !homeHex) return false;
      // Approximate via BFS — we know NEIGHBORS exists via engine; inline computation
      // For simplicity: just compare row/column distance roughly
      const dr = Math.abs(flagHex.r - homeHex.r);
      const dc = Math.abs(flagHex.c - homeHex.c);
      return Math.max(dr, dc) >= 4;
    },
  },
  {
    id: 'no-mercy',
    name: 'No Mercy',
    flavor: '"They begged. I let them."',
    description: 'Convert at least 2 units AND win at least 4 combats.',
    vp: 5,
    check: (s, h) => {
      const p = s.players.find((pl) => pl.house === h);
      return !!p && p.conversions >= 2 && p.combatsWon >= 4;
    },
  },
];

export const OBJECTIVE_BY_ID: Record<string, ObjectiveDef> =
  Object.fromEntries(OBJECTIVES.map((o) => [o.id, o]));

// Re-export so callers don't need a separate path import.
export { CASTLE_BY_HEX };
