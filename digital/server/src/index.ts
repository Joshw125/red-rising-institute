// ═══════════════════════════════════════════════════════════════════════════════
// RED RISING: THE INSTITUTE — WebSocket Multiplayer Server
// Modeled after Rust Bucket Rising's pattern.
// ═══════════════════════════════════════════════════════════════════════════════

import { createServer, IncomingMessage } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { v4 as uuidv4 } from 'uuid';
import type { Room, RoomPlayer, ClientMessage, ServerMessage, GameAction } from '../../shared/types/multiplayer';
import type { HouseId } from '../../shared/types/index';

// ─────────────────────────────────────────────────────────────────────────────
// Config
// ─────────────────────────────────────────────────────────────────────────────

const PORT = parseInt(process.env.PORT || '3001', 10);
const ROOM_CODE_LENGTH = 4;
const ROOM_TIMEOUT = 4 * 60 * 60 * 1000; // 4 hours of inactivity
const ROOM_CLEANUP_INTERVAL = 60 * 1000; // 1 minute

// ─────────────────────────────────────────────────────────────────────────────
// In-memory state
// ─────────────────────────────────────────────────────────────────────────────

interface ConnectedPlayer {
  id: string;
  ws: WebSocket;
  name: string;
  roomCode: string | null;
}

const rooms = new Map<string, Room>();
const players = new Map<string, ConnectedPlayer>();

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function generateRoomCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // ambiguous chars removed
  let code = '';
  for (let attempt = 0; attempt < 100; attempt++) {
    code = '';
    for (let i = 0; i < ROOM_CODE_LENGTH; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    if (!rooms.has(code)) return code;
  }
  throw new Error('Could not generate unique room code');
}

function send(ws: WebSocket, msg: ServerMessage): void {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(msg));
  }
}

function sendError(ws: WebSocket, message: string): void {
  send(ws, { type: 'ERROR', message });
}

function broadcastToRoom(roomCode: string, msg: ServerMessage, excludeId?: string): void {
  const room = rooms.get(roomCode);
  if (!room) return;
  for (const p of room.players) {
    if (excludeId && p.id === excludeId) continue;
    if (!p.isConnected) continue;
    const conn = players.get(p.id);
    if (conn) send(conn.ws, msg);
  }
}

function getRoomForPlayer(playerId: string): Room | null {
  const conn = players.get(playerId);
  if (!conn?.roomCode) return null;
  return rooms.get(conn.roomCode) ?? null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Game state dispatch — the server runs the same engine as the client.
// On GAME_ACTION, server applies the action, mutates room.gameState,
// and broadcasts the new state.
// ─────────────────────────────────────────────────────────────────────────────

import { produce, enableMapSet } from 'immer';
import { applyOrder, applyFreeMove, endTurn as engineEndTurn } from '../../shared/engine/orders';
import { applyAttack } from '../../shared/engine/combat';
import { withdrawUnits as engineWithdraw, advanceReserves, applyDeploy } from '../../shared/engine/reserve';
import { determineWinner, checkDomination } from '../../shared/engine/scoring';
import { NEIGHBORS } from '../../shared/engine/adjacency';
import { PROCTORS_BY_ACT, PROCTOR_BY_ID } from '../../shared/data/proctors';
import { OBJECTIVES } from '../../shared/data/objectives';
import { HOUSES } from '../../shared/data/houses';
import { buildDeck } from '../../shared/data/tactics';
import type { GameState, Unit } from '../../shared/types/index';

enableMapSet();

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

function buildInitialGameState(houseOrder: HouseId[]): GameState {
  // Mirror initDemoGame from src/store/gameStore.ts but parameterized by N players.
  const placement: Record<HouseId, number[]> = {
    Mars: [45, 35, 37, 56, 57, 73, 46, 55, 45, 47],
    Diana: [52, 41, 43, 51, 53, 62, 63, 50, 52, 48],
    Minerva: [6, 11, 20, 21, 13, 12, 5, 22, 6, 30],
    Apollo: [75, 74, 76, 77, 68, 69, 71, 73, 75, 70],
  };

  const shuffledObjectives = [...OBJECTIVES].sort(() => Math.random() - 0.5);
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

  const state: GameState = {
    round: 1,
    act: 1,
    phase: 'turn',
    currentPlayerIdx: 0,
    firstPlayerIdx: 0,
    players: houseOrder.map((h, i) => ({
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
    })),
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
    tacticsDeck: buildDeck(),
    tacticsDiscard: [],
    pendingCardId: null,
    proctorDecks: {
      1: shuffle(PROCTORS_BY_ACT[1].map((c) => c.id)),
      2: shuffle(PROCTORS_BY_ACT[2].map((c) => c.id)),
      3: shuffle(PROCTORS_BY_ACT[3].map((c) => c.id)),
    },
    proctorDiscard: [],
    currentProctorId: null,
    log: [`Multiplayer game started: ${houseOrder.join(' vs ')}.`],
  };

  // Place units per house
  for (const h of houseOrder) {
    const hexes = placement[h];
    for (let i = 0; i < 8; i++) {
      const u = makeUnit(h, 'regular', hexes[i] ?? HOUSES[h].homeCastleHexId, i);
      state.units[u.id] = u;
    }
    const flag = makeUnit(h, 'flag-bearer', hexes[8] ?? HOUSES[h].homeCastleHexId, 0);
    state.units[flag.id] = flag;
    const sp = makeUnit(h, 'special', hexes[9] ?? HOUSES[h].homeCastleHexId, 0);
    state.units[sp.id] = sp;
  }

  // Draw the first Proctor card
  const firstId = state.proctorDecks[1].shift();
  if (firstId) {
    state.currentProctorId = firstId;
    const card = PROCTOR_BY_ID[firstId];
    if (card) {
      state.log.push(`— Proctor: ${card.name} —`);
      card.apply(state);
    }
  }
  state.log.push(`— ${houseOrder[0]} turn —`);
  return state;
}

// Apply a GameAction to a draft GameState. Server-authoritative.
function dispatchAction(state: GameState, action: GameAction, actingHouse: HouseId | null): GameState {
  return produce(state, (s) => {
    // Most actions only affect the current player's turn — validate.
    const currentHouse = s.players[s.currentPlayerIdx]?.house;
    const actionRequiresTurn =
      action.kind !== 'selectHex' && action.kind !== 'selectUnit';
    if (actionRequiresTurn && actingHouse !== currentHouse) {
      // Silently ignore — clients should only send their own turn actions
      return;
    }

    switch (action.kind) {
      case 'selectHex':
        s.selectedHexId = action.hexId;
        s.selectedUnitId = null;
        break;
      case 'selectUnit':
        s.selectedUnitId = action.unitId;
        break;
      case 'issueFreeMove':
        applyFreeMove(s, action.unitId, action.targetHexId);
        s.selectedHexId = action.targetHexId;
        break;
      case 'issueOrder':
        applyOrder(s, action.unitId, action.order, action.targetHexId);
        s.selectedUnitId = null;
        if (action.order === 'move' && action.targetHexId != null) s.selectedHexId = action.targetHexId;
        break;
      case 'startAttack':
        s.pendingCombat = {
          kind: 'attack',
          phase: 'attacker-card',
          attackerUnitIds: [action.attackerUnitId],
          targetHexId: action.targetHexId,
          attackerCardId: null,
          defenderCardId: null,
        };
        s.pendingCardId = null;
        break;
      case 'toggleAttackerCompanion': {
        if (!s.pendingCombat) break;
        const ids = s.pendingCombat.attackerUnitIds;
        const idx = ids.indexOf(action.unitId);
        if (idx >= 0) {
          if (ids.length > 1) ids.splice(idx, 1);
        } else {
          ids.push(action.unitId);
        }
        break;
      }
      case 'setAttackerCard':
        if (s.pendingCombat) s.pendingCombat.attackerCardId = action.cardInstanceId;
        break;
      case 'setDefenderCard':
        if (s.pendingCombat) s.pendingCombat.defenderCardId = action.cardInstanceId;
        break;
      case 'advanceCombatPhase':
        if (s.pendingCombat) {
          if (s.pendingCombat.phase === 'attacker-card') s.pendingCombat.phase = 'defender-card';
          else if (s.pendingCombat.phase === 'defender-card') s.pendingCombat.phase = 'resolved';
        }
        break;
      case 'confirmCombat': {
        if (!s.pendingCombat) break;
        const pc = s.pendingCombat;
        const opts = {
          autoConvert: true,
          attackerCardId: pc.attackerCardId ?? null,
          defenderCardId: pc.defenderCardId ?? null,
        };
        let result;
        if (pc.kind === 'deployment-strike' && pc.groupId) {
          applyDeploy(s, pc.groupId, pc.targetHexId);
          result = applyAttack(s, pc.attackerUnitIds, pc.targetHexId, opts);
        } else {
          result = applyAttack(s, pc.attackerUnitIds, pc.targetHexId, opts);
        }
        s.pendingCombat = null;
        s.selectedUnitId = null;
        s.selectedHexId = pc.targetHexId;
        if (!result) break;
        if (result.flagCaptured && s.players.length === 2) {
          s.gameOver = {
            winner: result.flagCaptured.capturedBy,
            reason: `Captured ${result.flagCaptured.from}'s Flag-bearer.`,
          };
          s.phase = 'game-over';
        } else if (result.dianaHunt) {
          s.pendingHunt = { ...result.dianaHunt };
        }
        break;
      }
      case 'cancelCombat':
        s.pendingCombat = null;
        break;
      case 'confirmHunt':
        if (s.pendingHunt) {
          const { attackerUnitIds, fromHexId } = s.pendingHunt;
          if (NEIGHBORS[fromHexId]?.includes(action.targetHexId)) {
            for (const id of attackerUnitIds) {
              const u = s.units[id];
              if (!u) continue;
              u.hexId = action.targetHexId;
              u.readiness = 'alert';
            }
            s.selectedHexId = action.targetHexId;
          }
          s.pendingHunt = null;
        }
        break;
      case 'skipHunt':
        s.pendingHunt = null;
        break;
      case 'withdrawHex': {
        const player = s.players[s.currentPlayerIdx];
        if (player) {
          engineWithdraw(s, player.house, action.hexId);
          s.selectedUnitId = null;
        }
        break;
      }
      case 'startDeploy':
        s.deployMode = { groupId: action.groupId };
        s.selectedUnitId = null;
        break;
      case 'cancelDeploy':
        s.deployMode = null;
        break;
      case 'confirmDeploy': {
        if (!s.deployMode) break;
        const groupId = s.deployMode.groupId;
        const group = s.reserveGroups[groupId];
        if (!group) {
          s.deployMode = null;
          break;
        }
        const enemies = Object.values(s.units).filter(
          (u) => u.hexId === action.targetHexId && u.house !== group.house && u.readiness !== 'subdued'
        );
        if (enemies.length > 0) {
          s.pendingCombat = {
            kind: 'deployment-strike',
            phase: 'attacker-card',
            attackerUnitIds: [...group.unitIds],
            targetHexId: action.targetHexId,
            groupId,
            attackerCardId: null,
            defenderCardId: null,
          };
          s.deployMode = null;
        } else {
          applyDeploy(s, groupId, action.targetHexId);
          s.deployMode = null;
          s.selectedHexId = action.targetHexId;
        }
        break;
      }
      case 'endTurn': {
        const roundBefore = s.round;
        engineEndTurn(s);
        s.deployMode = null;
        s.selectedUnitId = null;
        if (s.phase === 'game-over' && !s.gameOver) {
          const result = determineWinner(s);
          s.gameOver = { winner: result.winner, reason: 'Round 12 final scoring.', vp: result.vp };
          s.log.push(`*** ${result.winner} wins! ***`);
          break;
        }
        if (s.round > roundBefore) {
          const dom = checkDomination(s);
          if (dom && !s.gameOver) {
            s.gameOver = { winner: dom, reason: 'Domination — 34+ hexes held.' };
            s.phase = 'game-over';
            s.log.push(`*** ${dom} achieves DOMINATION! ***`);
            break;
          }
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
        const newCurrent = s.players[s.currentPlayerIdx];
        if (newCurrent) advanceReserves(s, newCurrent.house);
        break;
      }
    }
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// HTTP + WebSocket setup
// ─────────────────────────────────────────────────────────────────────────────

const httpServer = createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', rooms: rooms.size, players: players.size }));
    return;
  }
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Red Rising: The Institute — Multiplayer Server');
});

const wss = new WebSocketServer({ server: httpServer });

wss.on('connection', (ws: WebSocket, req: IncomingMessage) => {
  const playerId = uuidv4();
  const conn: ConnectedPlayer = { id: playerId, ws, name: '', roomCode: null };
  players.set(playerId, conn);
  console.log(`[connect] ${playerId} from ${req.socket.remoteAddress}`);
  send(ws, { type: 'CONNECTED', playerId });

  ws.on('message', (raw) => {
    let msg: ClientMessage;
    try {
      msg = JSON.parse(raw.toString());
    } catch {
      sendError(ws, 'Invalid JSON');
      return;
    }
    handleMessage(conn, msg);
  });

  ws.on('close', () => {
    handleDisconnect(conn);
  });
});

function handleMessage(conn: ConnectedPlayer, msg: ClientMessage): void {
  const room = conn.roomCode ? rooms.get(conn.roomCode) : null;
  if (room) room.lastActivity = Date.now();

  switch (msg.type) {
    case 'PING':
      send(conn.ws, { type: 'PONG' });
      break;
    case 'CREATE_ROOM': {
      const code = generateRoomCode();
      const player: RoomPlayer = {
        id: conn.id,
        name: msg.playerName,
        house: null,
        isHost: true,
        isConnected: true,
        isReady: false,
      };
      const room: Room = {
        id: uuidv4(),
        code,
        hostId: conn.id,
        players: [player],
        maxPlayers: msg.maxPlayers,
        status: 'lobby',
        gameState: null,
        lastActivity: Date.now(),
        createdAt: Date.now(),
      };
      rooms.set(code, room);
      conn.name = msg.playerName;
      conn.roomCode = code;
      send(conn.ws, { type: 'ROOM_CREATED', room, playerId: conn.id });
      console.log(`[room ${code}] created by ${msg.playerName}`);
      break;
    }
    case 'JOIN_ROOM': {
      const targetRoom = rooms.get(msg.roomCode.toUpperCase());
      if (!targetRoom) {
        sendError(conn.ws, 'Room not found');
        break;
      }
      if (targetRoom.status !== 'lobby') {
        sendError(conn.ws, 'Game already in progress');
        break;
      }
      if (targetRoom.players.length >= targetRoom.maxPlayers) {
        sendError(conn.ws, 'Room full');
        break;
      }
      // Reconnection support: if a player with this name already exists and is disconnected, take their slot
      const existing = targetRoom.players.find((p) => p.name === msg.playerName);
      if (existing) {
        if (existing.isConnected) {
          sendError(conn.ws, 'Name already taken in this room');
          break;
        }
        existing.id = conn.id;
        existing.isConnected = true;
      } else {
        targetRoom.players.push({
          id: conn.id,
          name: msg.playerName,
          house: null,
          isHost: false,
          isConnected: true,
          isReady: false,
        });
      }
      conn.name = msg.playerName;
      conn.roomCode = targetRoom.code;
      send(conn.ws, { type: 'ROOM_JOINED', room: targetRoom, playerId: conn.id });
      broadcastToRoom(targetRoom.code, { type: 'ROOM_UPDATE', room: targetRoom }, conn.id);
      console.log(`[room ${targetRoom.code}] ${msg.playerName} joined`);
      break;
    }
    case 'LEAVE_ROOM': {
      handleDisconnect(conn, true);
      break;
    }
    case 'SELECT_HOUSE': {
      if (!room) break;
      // Make sure no other player has that house
      const taken = room.players.find((p) => p.id !== conn.id && p.house === msg.house);
      if (taken) {
        sendError(conn.ws, `${msg.house} is taken`);
        break;
      }
      const me = room.players.find((p) => p.id === conn.id);
      if (me) me.house = msg.house;
      broadcastToRoom(room.code, { type: 'ROOM_UPDATE', room });
      break;
    }
    case 'TOGGLE_READY': {
      if (!room) break;
      const me = room.players.find((p) => p.id === conn.id);
      if (me) me.isReady = !me.isReady;
      broadcastToRoom(room.code, { type: 'ROOM_UPDATE', room });
      break;
    }
    case 'START_GAME': {
      if (!room) break;
      if (conn.id !== room.hostId) {
        sendError(conn.ws, 'Only the host can start the game');
        break;
      }
      const houseOrder = room.players
        .filter((p) => p.house != null)
        .map((p) => p.house!);
      if (houseOrder.length !== room.players.length) {
        sendError(conn.ws, 'All players must select a House');
        break;
      }
      if (houseOrder.length < 2) {
        sendError(conn.ws, 'Need at least 2 players');
        break;
      }
      const gameState = buildInitialGameState(houseOrder);
      room.gameState = gameState;
      room.status = 'playing';
      const playerHouseMap: Record<string, HouseId> = {};
      for (const p of room.players) {
        if (p.house) playerHouseMap[p.id] = p.house;
      }
      broadcastToRoom(room.code, { type: 'GAME_STARTED', gameState, playerHouseMap });
      console.log(`[room ${room.code}] game started: ${houseOrder.join(' vs ')}`);
      break;
    }
    case 'GAME_ACTION': {
      if (!room || room.status !== 'playing') break;
      const me = room.players.find((p) => p.id === conn.id);
      const newState = dispatchAction(
        room.gameState as GameState,
        msg.action,
        me?.house ?? null
      );
      room.gameState = newState;
      broadcastToRoom(room.code, {
        type: 'GAME_STATE_UPDATE',
        state: newState,
        action: msg.action,
        fromPlayerId: conn.id,
      });
      break;
    }
    case 'REQUEST_RESYNC': {
      if (!room?.gameState) break;
      send(conn.ws, { type: 'STATE_SNAPSHOT', snapshot: room.gameState });
      break;
    }
    case 'CHAT': {
      if (!room) break;
      broadcastToRoom(room.code, {
        type: 'CHAT_MESSAGE',
        playerId: conn.id,
        playerName: conn.name,
        message: msg.message,
      });
      break;
    }
  }
}

function handleDisconnect(conn: ConnectedPlayer, explicit = false): void {
  const room = conn.roomCode ? rooms.get(conn.roomCode) : null;
  if (room) {
    const me = room.players.find((p) => p.id === conn.id);
    if (me) {
      me.isConnected = false;
      if (explicit) {
        // Remove from room entirely on explicit leave
        room.players = room.players.filter((p) => p.id !== conn.id);
        if (room.players.length === 0) {
          rooms.delete(room.code);
          console.log(`[room ${room.code}] deleted (empty)`);
        } else {
          // Reassign host if the host left
          if (room.hostId === conn.id) {
            const newHost = room.players[0];
            room.hostId = newHost.id;
            newHost.isHost = true;
          }
          broadcastToRoom(room.code, { type: 'ROOM_UPDATE', room });
        }
      } else {
        // Soft disconnect — keep slot for rejoin
        broadcastToRoom(room.code, { type: 'ROOM_UPDATE', room });
      }
    }
  }
  players.delete(conn.id);
  console.log(`[disconnect] ${conn.id} (${conn.name})`);
}

// ─────────────────────────────────────────────────────────────────────────────
// Cleanup
// ─────────────────────────────────────────────────────────────────────────────

setInterval(() => {
  const now = Date.now();
  for (const [code, room] of rooms) {
    if (now - room.lastActivity > ROOM_TIMEOUT) {
      console.log(`[cleanup] removing inactive room ${code}`);
      rooms.delete(code);
    }
  }
}, ROOM_CLEANUP_INTERVAL);

// ─────────────────────────────────────────────────────────────────────────────
// Boot
// ─────────────────────────────────────────────────────────────────────────────

httpServer.listen(PORT, () => {
  console.log(`Red Rising: The Institute server listening on ${PORT}`);
});
