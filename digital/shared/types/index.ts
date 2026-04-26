// Red Rising: The Institute — core game types (v0.1 prototype)

export type HouseId = 'Mars' | 'Minerva' | 'Apollo' | 'Diana';

export type Region =
  | 'Mountains'
  | 'North Woods'
  | 'Highlands'
  | 'Postern Hills'
  | 'Argos River'
  | 'Greatwoods'
  | 'Southern Reaches'
  | 'South Sea Coast';

export type SpecialKind =
  | 'Castle'
  | 'Discovery Site'
  | 'Watchtower'
  | 'Cavern Entrance';

export interface HexDef {
  id: number;
  c: number;
  r: number;
  region: Region;
  fertile: boolean;
  special: { kind: SpecialKind; name?: string } | null;
}

export interface CastleDef {
  hexId: number;
  name: string;
  type: 'home' | 'neutral';
  house: HouseId | null;
}

export type Readiness = 'alert' | 'at-ease' | 'subdued' | 'weakened';

export type UnitKind = 'regular' | 'flag-bearer' | 'special';

export interface Unit {
  id: string;
  house: HouseId;
  kind: UnitKind;
  readiness: Readiness;
  hexId: number | null; // null if on Reserve Track
  reserveSpace?: 1 | 2 | 3;
  actedThisTurn?: boolean;
  freeMoveUsed?: boolean;
}

export type Phase =
  | 'setup'
  | 'proctor'
  | 'turn'
  | 'combat'
  | 'end-of-round'
  | 'game-over';

export type Act = 1 | 2 | 3;

export interface PlayerState {
  house: HouseId;
  food: number;
  tacticsCards: string[]; // card ids
  vp: number;
  combatsWon: number;
  conversions: number;
  oncePerGameUsed: boolean;
  removalMarkerHexId: number | null;
  unitsInSupply: number; // units available for Recruit
  objectiveId: string | null; // secret objective card chosen at setup
}

export interface ReserveGroup {
  id: string;
  house: HouseId;
  removalHexId: number;
  unitIds: string[];
  space: 1 | 2 | 3;
  createdRound: number;
}

export type PendingCombatKind = 'attack' | 'deployment-strike';

// Combat resolution is a 2-phase reveal:
//  1. attacker-card — attacker picks (or skips) Tactics Card
//  2. defender-card — defender picks (or skips), both revealed
//  3. resolved — confirm closes modal and applies
export type CombatPhase = 'attacker-card' | 'defender-card' | 'resolved';

export interface PendingCombat {
  kind: PendingCombatKind;
  phase: CombatPhase;
  attackerUnitIds: string[];
  targetHexId: number;
  groupId?: string;
  attackerCardId?: string | null;
  defenderCardId?: string | null;
}

export interface GameState {
  round: number; // 1..12
  act: Act;
  phase: Phase;
  currentPlayerIdx: number;
  firstPlayerIdx: number;
  players: PlayerState[];
  units: Record<string, Unit>;
  fortifications: number[]; // hex ids that are fortified
  garrisons: Record<number, number>; // neutral castle hex id → strength (2-4)
  selectedHexId: number | null;
  selectedUnitId: string | null;
  reserveGroups: Record<string, ReserveGroup>;
  deployMode: { groupId: string } | null;
  pendingCombat: PendingCombat | null;
  pendingHunt: { attackerUnitIds: string[]; fromHexId: number } | null;
  gameOver: { winner: HouseId; reason: string; vp?: Record<HouseId, number> } | null;
  exploredSites: number[];
  tacticsDeck: string[]; // remaining card instance IDs
  tacticsDiscard: string[]; // played + spent
  pendingCardId: string | null; // attacker's chosen card during pendingCombat (legacy)
  proctorDecks: { 1: string[]; 2: string[]; 3: string[] };
  proctorDiscard: string[];
  currentProctorId: string | null;
  log: string[];
}
