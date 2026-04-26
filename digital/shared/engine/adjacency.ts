// Hex adjacency helpers for the offset-coord layout used by the Institute board.
// Layout: even rows (0,2,4,6,8) are staggered RIGHT (flip=1, staggerRow = r%2===0),
// odd rows are aligned. Per-row hex counts are 6,8,9,10,10,11,10,8,5.

import { HEX_BY_ID, HEXES } from '../data/hexes';
import type { HexDef } from '../types';

const ROW_COUNTS = [6, 8, 9, 10, 10, 11, 10, 8, 5];

function hexAt(c: number, r: number): HexDef | null {
  if (r < 0 || r >= ROW_COUNTS.length) return null;
  if (c < 0 || c >= ROW_COUNTS[r]) return null;
  return HEXES.find((h) => h.c === c && h.r === r) ?? null;
}

export function getNeighborIds(hexId: number): number[] {
  const h = HEX_BY_ID[hexId];
  if (!h) return [];
  const { c, r } = h;
  const evenRow = r % 2 === 0; // even rows are shifted right
  const offsets = evenRow
    ? [
        [-1, 0],  // W
        [1, 0],   // E
        [0, -1],  // NW
        [1, -1],  // NE
        [0, 1],   // SW
        [1, 1],   // SE
      ]
    : [
        [-1, 0],  // W
        [1, 0],   // E
        [-1, -1], // NW
        [0, -1],  // NE
        [-1, 1],  // SW
        [0, 1],   // SE
      ];

  const ids: number[] = [];
  for (const [dc, dr] of offsets) {
    const n = hexAt(c + dc, r + dr);
    if (n) ids.push(n.id);
  }
  return ids;
}

// Pre-computed adjacency map for fast lookups.
export const NEIGHBORS: Record<number, number[]> = (() => {
  const m: Record<number, number[]> = {};
  for (const h of HEXES) m[h.id] = getNeighborIds(h.id);
  return m;
})();

// BFS-based distance between two hexes (in hex steps, ignoring terrain cost).
export function hexDistance(fromId: number, toId: number): number {
  if (fromId === toId) return 0;
  const visited = new Set<number>([fromId]);
  let frontier = [fromId];
  let dist = 0;
  while (frontier.length) {
    dist++;
    const next: number[] = [];
    for (const id of frontier) {
      for (const n of NEIGHBORS[id] ?? []) {
        if (n === toId) return dist;
        if (!visited.has(n)) {
          visited.add(n);
          next.push(n);
        }
      }
    }
    frontier = next;
  }
  return Infinity;
}
