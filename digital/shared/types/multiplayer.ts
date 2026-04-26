// Multiplayer protocol types for Red Rising: The Institute.
// Modeled after Rust Bucket Rising's WebSocket pattern.

import type { HouseId } from './index';

export interface RoomPlayer {
  id: string;            // server-issued network id
  name: string;
  house: HouseId | null; // null until selected
  isHost: boolean;
  isConnected: boolean;
  isReady: boolean;
}

export interface Room {
  id: string;
  code: string;          // 4-char join code
  hostId: string;
  players: RoomPlayer[];
  maxPlayers: number;    // 2-4
  status: 'lobby' | 'playing' | 'finished';
  gameState: unknown | null; // GameState when playing
  lastActivity: number;
  createdAt: number;
}

// -----------------------------------------------------------------------------
// Client -> Server
// -----------------------------------------------------------------------------

export type ClientMessage =
  | { type: 'CREATE_ROOM'; playerName: string; maxPlayers: 2 | 3 | 4 }
  | { type: 'JOIN_ROOM'; roomCode: string; playerName: string }
  | { type: 'LEAVE_ROOM' }
  | { type: 'SELECT_HOUSE'; house: HouseId }
  | { type: 'TOGGLE_READY' }
  | { type: 'START_GAME' }
  | { type: 'GAME_ACTION'; action: GameAction }
  | { type: 'REQUEST_RESYNC' }
  | { type: 'CHAT'; message: string }
  | { type: 'PING' };

// All actions the client can request the server to perform on its behalf.
// The server validates (currentPlayer check, legal-move check) and dispatches.
export type GameAction =
  | { kind: 'selectHex'; hexId: number | null }
  | { kind: 'selectUnit'; unitId: string | null }
  | { kind: 'issueFreeMove'; unitId: string; targetHexId: number }
  | { kind: 'issueOrder'; unitId: string; order: 'move' | 'gather' | 'hold' | 'recruit' | 'rally' | 'fortify' | 'explore'; targetHexId?: number }
  | { kind: 'startAttack'; attackerUnitId: string; targetHexId: number }
  | { kind: 'toggleAttackerCompanion'; unitId: string }
  | { kind: 'setAttackerCard'; cardInstanceId: string | null }
  | { kind: 'setDefenderCard'; cardInstanceId: string | null }
  | { kind: 'advanceCombatPhase' }
  | { kind: 'confirmCombat' }
  | { kind: 'cancelCombat' }
  | { kind: 'confirmHunt'; targetHexId: number }
  | { kind: 'skipHunt' }
  | { kind: 'withdrawHex'; hexId: number }
  | { kind: 'startDeploy'; groupId: string }
  | { kind: 'cancelDeploy' }
  | { kind: 'confirmDeploy'; targetHexId: number }
  | { kind: 'endTurn' };

// -----------------------------------------------------------------------------
// Server -> Client
// -----------------------------------------------------------------------------

export type ServerMessage =
  | { type: 'CONNECTED'; playerId: string }
  | { type: 'ERROR'; message: string }
  | { type: 'ROOM_CREATED'; room: Room; playerId: string }
  | { type: 'ROOM_JOINED'; room: Room; playerId: string }
  | { type: 'ROOM_UPDATE'; room: Room }
  | { type: 'PLAYER_JOINED'; player: RoomPlayer }
  | { type: 'PLAYER_LEFT'; playerId: string; newHostId?: string }
  | { type: 'GAME_STARTED'; gameState: unknown; playerHouseMap: Record<string, HouseId> }
  | { type: 'GAME_STATE_UPDATE'; state: unknown; action: GameAction; fromPlayerId: string }
  | { type: 'STATE_SNAPSHOT'; snapshot: unknown }
  | { type: 'CHAT_MESSAGE'; playerId: string; playerName: string; message: string }
  | { type: 'PONG' };

export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';
