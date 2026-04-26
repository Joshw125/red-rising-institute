// Hex data for the v5.0 77-hex map. Extracted from map/composite_board.html.
import type { HexDef, CastleDef } from '../types';

interface RawHex {
  id: number;
  c: number;
  r: number;
  rg: string;
  rs: 'Food' | null;
  sp: string | null;
}

const RAW: RawHex[] = [
  // Row 0 — 6 hexes
  { id: 1,  c: 0, r: 0, rg: 'Mountains',        rs: null,   sp: null },
  { id: 2,  c: 1, r: 0, rg: 'Mountains',        rs: null,   sp: null },
  { id: 3,  c: 2, r: 0, rg: 'North Woods',      rs: 'Food', sp: null },
  { id: 4,  c: 3, r: 0, rg: 'North Woods',      rs: 'Food', sp: null },
  { id: 5,  c: 4, r: 0, rg: 'Highlands',        rs: null,   sp: null },
  { id: 6,  c: 5, r: 0, rg: 'Highlands',        rs: null,   sp: 'Minerva Castle' },
  // Row 1 — 8 hexes
  { id: 7,  c: 0, r: 1, rg: 'Mountains',        rs: null,   sp: null },
  { id: 8,  c: 1, r: 1, rg: 'Mountains',        rs: null,   sp: 'Jupiter Castle' },
  { id: 9,  c: 2, r: 1, rg: 'North Woods',      rs: 'Food', sp: null },
  { id: 10, c: 3, r: 1, rg: 'North Woods',      rs: 'Food', sp: 'Discovery Site' },
  { id: 11, c: 4, r: 1, rg: 'Highlands',        rs: 'Food', sp: null },
  { id: 12, c: 5, r: 1, rg: 'Highlands',        rs: null,   sp: null },
  { id: 13, c: 6, r: 1, rg: 'Highlands',        rs: null,   sp: null },
  { id: 14, c: 7, r: 1, rg: 'Postern Hills',    rs: null,   sp: null },
  // Row 2 — 9 hexes
  { id: 15, c: 0, r: 2, rg: 'Mountains',        rs: null,   sp: null },
  { id: 16, c: 1, r: 2, rg: 'Mountains',        rs: null,   sp: 'Watchtower' },
  { id: 17, c: 2, r: 2, rg: 'North Woods',      rs: 'Food', sp: null },
  { id: 18, c: 3, r: 2, rg: 'North Woods',      rs: null,   sp: 'Ceres Castle' },
  { id: 19, c: 4, r: 2, rg: 'North Woods',      rs: 'Food', sp: null },
  { id: 20, c: 5, r: 2, rg: 'Highlands',        rs: 'Food', sp: null },
  { id: 21, c: 6, r: 2, rg: 'Highlands',        rs: 'Food', sp: 'Discovery Site' },
  { id: 22, c: 7, r: 2, rg: 'Highlands',        rs: null,   sp: null },
  { id: 23, c: 8, r: 2, rg: 'Postern Hills',    rs: null,   sp: null },
  // Row 3 — 10 hexes
  { id: 24, c: 0, r: 3, rg: 'Mountains',        rs: null,   sp: null },
  { id: 25, c: 1, r: 3, rg: 'Mountains',        rs: 'Food', sp: 'Discovery Site' },
  { id: 26, c: 2, r: 3, rg: 'North Woods',      rs: 'Food', sp: null },
  { id: 27, c: 3, r: 3, rg: 'North Woods',      rs: 'Food', sp: 'Discovery Site' },
  { id: 28, c: 4, r: 3, rg: 'Argos River',      rs: 'Food', sp: null },
  { id: 29, c: 5, r: 3, rg: 'Argos River',      rs: 'Food', sp: null },
  { id: 30, c: 6, r: 3, rg: 'Highlands',        rs: null,   sp: null },
  { id: 31, c: 7, r: 3, rg: 'Postern Hills',    rs: 'Food', sp: null },
  { id: 32, c: 8, r: 3, rg: 'Postern Hills',    rs: null,   sp: 'Juno Castle' },
  { id: 33, c: 9, r: 3, rg: 'Postern Hills',    rs: 'Food', sp: null },
  // Row 4 — 10 hexes
  { id: 34, c: 0, r: 4, rg: 'Mountains',        rs: 'Food', sp: null },
  { id: 35, c: 1, r: 4, rg: 'Southern Reaches', rs: 'Food', sp: null },
  { id: 36, c: 2, r: 4, rg: 'North Woods',      rs: 'Food', sp: null },
  { id: 37, c: 3, r: 4, rg: 'Southern Reaches', rs: 'Food', sp: 'Discovery Site' },
  { id: 38, c: 4, r: 4, rg: 'Argos River',      rs: null,   sp: 'Mercury Castle' },
  { id: 39, c: 5, r: 4, rg: 'Greatwoods',       rs: null,   sp: null },
  { id: 40, c: 6, r: 4, rg: 'Greatwoods',       rs: 'Food', sp: null },
  { id: 41, c: 7, r: 4, rg: 'Greatwoods',       rs: 'Food', sp: null },
  { id: 42, c: 8, r: 4, rg: 'Greatwoods',       rs: 'Food', sp: null },
  { id: 43, c: 9, r: 4, rg: 'Greatwoods',       rs: 'Food', sp: null },
  // Row 5 — 11 hexes (widest)
  { id: 44, c: 0,  r: 5, rg: 'Mountains',        rs: null,   sp: null },
  { id: 45, c: 1,  r: 5, rg: 'Southern Reaches', rs: null,   sp: 'Mars Castle' },
  { id: 46, c: 2,  r: 5, rg: 'Southern Reaches', rs: null,   sp: null },
  { id: 47, c: 3,  r: 5, rg: 'Argos River',      rs: 'Food', sp: null },
  { id: 48, c: 4,  r: 5, rg: 'Argos River',      rs: 'Food', sp: 'Watchtower' },
  { id: 49, c: 5,  r: 5, rg: 'Argos River',      rs: 'Food', sp: null },
  { id: 50, c: 6,  r: 5, rg: 'Greatwoods',       rs: 'Food', sp: null },
  { id: 51, c: 7,  r: 5, rg: 'Greatwoods',       rs: 'Food', sp: null },
  { id: 52, c: 8,  r: 5, rg: 'Greatwoods',       rs: null,   sp: 'Diana Castle' },
  { id: 53, c: 9,  r: 5, rg: 'Greatwoods',       rs: 'Food', sp: null },
  { id: 54, c: 10, r: 5, rg: 'Greatwoods',       rs: null,   sp: null },
  // Row 6 — 10 hexes
  { id: 55, c: 0, r: 6, rg: 'Southern Reaches', rs: null,   sp: null },
  { id: 56, c: 1, r: 6, rg: 'Southern Reaches', rs: 'Food', sp: null },
  { id: 57, c: 2, r: 6, rg: 'Southern Reaches', rs: 'Food', sp: null },
  { id: 58, c: 3, r: 6, rg: 'Argos River',      rs: 'Food', sp: null },
  { id: 59, c: 4, r: 6, rg: 'Argos River',      rs: 'Food', sp: null },
  { id: 60, c: 5, r: 6, rg: 'South Sea Coast',  rs: 'Food', sp: null },
  { id: 61, c: 6, r: 6, rg: 'Greatwoods',       rs: null,   sp: null },
  { id: 62, c: 7, r: 6, rg: 'Greatwoods',       rs: 'Food', sp: null },
  { id: 63, c: 8, r: 6, rg: 'Greatwoods',       rs: 'Food', sp: 'Discovery Site' },
  { id: 64, c: 9, r: 6, rg: 'Greatwoods',       rs: 'Food', sp: 'Cavern Entrance' },
  // Row 7 — 8 hexes
  { id: 65, c: 0, r: 7, rg: 'Southern Reaches', rs: null,   sp: 'Pluto Castle' },
  { id: 66, c: 1, r: 7, rg: 'Southern Reaches', rs: 'Food', sp: 'Cavern Entrance' },
  { id: 67, c: 2, r: 7, rg: 'Argos River',      rs: null,   sp: null },
  { id: 68, c: 3, r: 7, rg: 'South Sea Coast',  rs: 'Food', sp: null },
  { id: 69, c: 4, r: 7, rg: 'South Sea Coast',  rs: 'Food', sp: null },
  { id: 70, c: 5, r: 7, rg: 'South Sea Coast',  rs: null,   sp: 'Neptune Castle' },
  { id: 71, c: 6, r: 7, rg: 'South Sea Coast',  rs: 'Food', sp: null },
  { id: 72, c: 7, r: 7, rg: 'Greatwoods',       rs: 'Food', sp: null },
  // Row 8 — 5 hexes
  { id: 73, c: 0, r: 8, rg: 'Southern Reaches', rs: 'Food', sp: 'Discovery Site' },
  { id: 74, c: 1, r: 8, rg: 'South Sea Coast',  rs: 'Food', sp: null },
  { id: 75, c: 2, r: 8, rg: 'South Sea Coast',  rs: null,   sp: 'Apollo Castle' },
  { id: 76, c: 3, r: 8, rg: 'South Sea Coast',  rs: 'Food', sp: null },
  { id: 77, c: 4, r: 8, rg: 'South Sea Coast',  rs: 'Food', sp: 'Watchtower' },
];

function parseSpecial(sp: string | null): HexDef['special'] {
  if (!sp) return null;
  if (sp.endsWith('Castle')) return { kind: 'Castle', name: sp.replace(' Castle', '') };
  if (sp === 'Discovery Site') return { kind: 'Discovery Site' };
  if (sp === 'Watchtower') return { kind: 'Watchtower' };
  if (sp === 'Cavern Entrance') return { kind: 'Cavern Entrance' };
  return null;
}

export const HEXES: HexDef[] = RAW.map(h => ({
  id: h.id,
  c: h.c,
  r: h.r,
  region: h.rg as HexDef['region'],
  fertile: h.rs === 'Food',
  special: parseSpecial(h.sp),
}));

export const HEX_BY_ID: Record<number, HexDef> = Object.fromEntries(
  HEXES.map(h => [h.id, h])
);

export const CASTLES: CastleDef[] = [
  { hexId: 6,  name: 'Minerva',  type: 'home',    house: 'Minerva' },
  { hexId: 45, name: 'Mars',     type: 'home',    house: 'Mars' },
  { hexId: 52, name: 'Diana',    type: 'home',    house: 'Diana' },
  { hexId: 75, name: 'Apollo',   type: 'home',    house: 'Apollo' },
  { hexId: 8,  name: 'Jupiter',  type: 'neutral', house: null },
  { hexId: 18, name: 'Ceres',    type: 'neutral', house: null },
  { hexId: 32, name: 'Juno',     type: 'neutral', house: null },
  { hexId: 38, name: 'Mercury',  type: 'neutral', house: null },
  { hexId: 65, name: 'Pluto',    type: 'neutral', house: null },
  { hexId: 70, name: 'Neptune',  type: 'neutral', house: null },
];

export const CASTLE_BY_HEX: Record<number, CastleDef> = Object.fromEntries(
  CASTLES.map(c => [c.hexId, c])
);

// Calibration values from composite_board.html (DEFAULTS)
// These align the SVG hex grid with the base art image (base_art.png).
export const CALIBRATION = {
  ox: 282.5, oy: 113.5, r: 59.5, sx: 0.994, sy: 0.73, flip: 1,
  // Per-row offsets (rotation/shift)
  ro: [0.2, 0.2, 0.3, 0.2, -1.7, -1.7, -1.7, 0.2, 2.3],
  // Per-row scale
  rs: [1, 0.99, 1, 0.99, 0.99, 0.99, 0.99, 1, 0.99],
  // Per-row spacing multiplier
  rp: [1, 1.01, 0.99, 1, 1, 1, 1, 1, 1],
} as const;

export function hexCenter(c: number, r: number): { x: number; y: number } {
  const rr = CALIBRATION.r * CALIBRATION.rs[r];
  const spacingMul = CALIBRATION.rp[r];
  const W = Math.sqrt(3) * rr * CALIBRATION.sx * spacingMul;
  const H = 2 * CALIBRATION.r * CALIBRATION.sy;
  const staggerRow = CALIBRATION.flip ? r % 2 === 0 : r % 2 === 1;
  const stagger = staggerRow ? W / 2 : 0;
  const rowShift = CALIBRATION.ro[r] * Math.sqrt(3) * CALIBRATION.r * CALIBRATION.sx / 2;
  return {
    x: CALIBRATION.ox + c * W + stagger + rowShift,
    y: CALIBRATION.oy + r * H,
  };
}

export function hexPolygonPoints(cx: number, cy: number, r: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 6; i++) {
    const ang = (Math.PI / 180) * (60 * i - 30);
    pts.push(`${(cx + r * Math.cos(ang)).toFixed(2)},${(cy + r * Math.sin(ang)).toFixed(2)}`);
  }
  return pts.join(' ');
}
