// Multiplayer client store. Keeps WebSocket connection state and the local
// view of the room/lobby. The actual game state still lives in gameStore —
// this file only handles connection, room lifecycle, and action dispatch.

import { create } from 'zustand';
import type {
  ClientMessage,
  ServerMessage,
  Room,
  GameAction,
  ConnectionStatus,
} from '@shared/types/multiplayer';
import type { GameState, HouseId } from '@shared/types';

// Server URL: configured via env, defaults to local dev server.
// In production deploy, set VITE_SERVER_URL to the Render URL (wss://).
const SERVER_URL = (import.meta as any).env?.VITE_SERVER_URL || 'ws://localhost:3002';

interface MultiplayerState {
  status: ConnectionStatus;
  ws: WebSocket | null;
  playerId: string | null;
  room: Room | null;
  myHouse: HouseId | null;
  playerHouseMap: Record<string, HouseId>;
  errorMessage: string | null;
  chat: { id: string; playerId: string; playerName: string; message: string; timestamp: number }[];

  // Actions
  connect: () => void;
  disconnect: () => void;
  createRoom: (playerName: string, maxPlayers: 2 | 3 | 4) => void;
  joinRoom: (roomCode: string, playerName: string) => void;
  leaveRoom: () => void;
  selectHouse: (house: HouseId) => void;
  toggleReady: () => void;
  startGame: () => void;
  sendAction: (action: GameAction) => void;
  sendChat: (message: string) => void;

  // Internal — invoked by message handler
  _onServerMessage: (msg: ServerMessage) => void;
}

let _onGameStateUpdate: ((state: GameState, action: GameAction | null) => void) | null = null;
export function onMultiplayerStateUpdate(handler: (state: GameState, action: GameAction | null) => void) {
  _onGameStateUpdate = handler;
}

export const useMultiplayerStore = create<MultiplayerState>((set, get) => ({
  status: 'disconnected',
  ws: null,
  playerId: null,
  room: null,
  myHouse: null,
  playerHouseMap: {},
  errorMessage: null,
  chat: [],

  connect: () => {
    const existing = get().ws;
    if (existing && existing.readyState <= WebSocket.OPEN) return; // already connecting/connected
    set({ status: 'connecting', errorMessage: null });
    try {
      const ws = new WebSocket(SERVER_URL);
      ws.onopen = () => set({ status: 'connected', ws });
      ws.onmessage = (e) => {
        try {
          const msg: ServerMessage = JSON.parse(e.data);
          get()._onServerMessage(msg);
        } catch (err) {
          console.error('Bad server message', err);
        }
      };
      ws.onclose = () => set({ status: 'disconnected', ws: null });
      ws.onerror = () => set({ status: 'error', errorMessage: 'WebSocket error' });
      set({ ws });
    } catch (e) {
      set({ status: 'error', errorMessage: String(e) });
    }
  },

  disconnect: () => {
    const ws = get().ws;
    if (ws) ws.close();
    set({ status: 'disconnected', ws: null, room: null, myHouse: null, playerId: null });
  },

  createRoom: (playerName, maxPlayers) => {
    sendMessage(get().ws, { type: 'CREATE_ROOM', playerName, maxPlayers });
  },
  joinRoom: (roomCode, playerName) => {
    sendMessage(get().ws, { type: 'JOIN_ROOM', roomCode, playerName });
  },
  leaveRoom: () => {
    sendMessage(get().ws, { type: 'LEAVE_ROOM' });
    set({ room: null, myHouse: null, playerHouseMap: {} });
  },
  selectHouse: (house) => {
    sendMessage(get().ws, { type: 'SELECT_HOUSE', house });
  },
  toggleReady: () => {
    sendMessage(get().ws, { type: 'TOGGLE_READY' });
  },
  startGame: () => {
    sendMessage(get().ws, { type: 'START_GAME' });
  },
  sendAction: (action) => {
    sendMessage(get().ws, { type: 'GAME_ACTION', action });
  },
  sendChat: (message) => {
    sendMessage(get().ws, { type: 'CHAT', message });
  },

  _onServerMessage: (msg) => {
    switch (msg.type) {
      case 'CONNECTED':
        set({ playerId: msg.playerId });
        break;
      case 'ERROR':
        set({ errorMessage: msg.message });
        break;
      case 'ROOM_CREATED':
      case 'ROOM_JOINED':
        set({ room: msg.room, playerId: msg.playerId, errorMessage: null });
        break;
      case 'ROOM_UPDATE':
        set({ room: msg.room });
        break;
      case 'GAME_STARTED': {
        set({ playerHouseMap: msg.playerHouseMap });
        const myId = get().playerId;
        if (myId) set({ myHouse: msg.playerHouseMap[myId] ?? null });
        // Critical: flip room.status to 'playing' so App routing leaves the Lobby view.
        // The server has set room.status = 'playing' but doesn't send a ROOM_UPDATE
        // separately — the GAME_STARTED message implies the transition.
        set((s) => ({ room: s.room ? { ...s.room, status: 'playing' as const } : null }));
        if (_onGameStateUpdate) {
          _onGameStateUpdate(msg.gameState as GameState, null);
        }
        break;
      }
      case 'GAME_STATE_UPDATE':
        if (_onGameStateUpdate) {
          _onGameStateUpdate(msg.state as GameState, msg.action);
        }
        break;
      case 'STATE_SNAPSHOT':
        if (_onGameStateUpdate) {
          _onGameStateUpdate(msg.snapshot as GameState, null);
        }
        break;
      case 'CHAT_MESSAGE': {
        const entry = {
          id: `${msg.playerId}-${Date.now()}`,
          playerId: msg.playerId,
          playerName: msg.playerName,
          message: msg.message,
          timestamp: Date.now(),
        };
        set((s) => ({ chat: [...s.chat, entry].slice(-50) }));
        break;
      }
    }
  },
}));

function sendMessage(ws: WebSocket | null, msg: ClientMessage) {
  if (!ws || ws.readyState !== WebSocket.OPEN) {
    console.warn('Cannot send — socket not open');
    return;
  }
  ws.send(JSON.stringify(msg));
}
