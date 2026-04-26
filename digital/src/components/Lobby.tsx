import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useMultiplayerStore } from '@/store/multiplayer';
import { HOUSES } from '@shared/data/houses';
import type { HouseId } from '@shared/types';

const HOUSE_ORDER: HouseId[] = ['Mars', 'Diana', 'Apollo', 'Minerva'];

export function Lobby() {
  const mp = useMultiplayerStore();
  const [name, setName] = useState(() => localStorage.getItem('rri-name') || '');
  const [joinCode, setJoinCode] = useState('');
  const [maxPlayers, setMaxPlayers] = useState<2 | 3 | 4>(2);

  useEffect(() => {
    if (mp.status === 'disconnected') mp.connect();
  }, []);

  useEffect(() => {
    if (name) localStorage.setItem('rri-name', name);
  }, [name]);

  // Pre-game: not in a room yet
  if (!mp.room) {
    return (
      <div className="min-h-screen bg-stone-900 text-parchment flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-stone-950/60 border border-stone-700 rounded p-6 space-y-4">
          <header>
            <h1 className="font-display text-3xl tracking-[0.2em] text-parchment text-center">
              RED RISING <span className="text-stone-500">·</span> THE INSTITUTE
            </h1>
            <p className="text-xs text-stone-500 text-center mt-1">
              Multiplayer lobby — {mp.status === 'connecting' ? 'connecting…' : mp.status === 'connected' ? 'connected' : mp.status === 'error' ? 'connection failed' : 'disconnected'}
            </p>
          </header>

          {mp.errorMessage && (
            <div className="text-sm text-red-400 border border-red-800 bg-red-950/30 rounded p-2">
              {mp.errorMessage}
            </div>
          )}

          <div>
            <label className="text-xs text-stone-400 block mb-1">Your name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              className="w-full bg-stone-900 border border-stone-700 rounded px-3 py-2 text-sm font-serif"
              maxLength={20}
            />
          </div>

          <div className="border-t border-stone-700 pt-4 space-y-3">
            <div className="text-sm font-display tracking-wider text-stone-400">CREATE ROOM</div>
            <div className="flex gap-2 items-center">
              <span className="text-xs text-stone-400">Players:</span>
              {[2, 3, 4].map((n) => (
                <button
                  key={n}
                  onClick={() => setMaxPlayers(n as 2 | 3 | 4)}
                  className={clsx(
                    'px-3 py-1 rounded border text-sm',
                    maxPlayers === n
                      ? 'border-amber-400 bg-amber-900/40 text-parchment'
                      : 'border-stone-600 bg-stone-800 text-stone-300'
                  )}
                >
                  {n}
                </button>
              ))}
            </div>
            <button
              disabled={!name || mp.status !== 'connected'}
              onClick={() => mp.createRoom(name, maxPlayers)}
              className="w-full font-display tracking-wider px-4 py-2 rounded bg-amber-700 hover:bg-amber-600 disabled:bg-stone-800 disabled:text-stone-600 text-stone-100 border border-amber-500 disabled:border-stone-700"
            >
              Create Room
            </button>
          </div>

          <div className="border-t border-stone-700 pt-4 space-y-3">
            <div className="text-sm font-display tracking-wider text-stone-400">JOIN ROOM</div>
            <input
              type="text"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
              placeholder="4-letter code (e.g. AB23)"
              className="w-full bg-stone-900 border border-stone-700 rounded px-3 py-2 text-sm font-mono uppercase tracking-widest"
              maxLength={4}
            />
            <button
              disabled={!name || joinCode.length !== 4 || mp.status !== 'connected'}
              onClick={() => mp.joinRoom(joinCode, name)}
              className="w-full font-display tracking-wider px-4 py-2 rounded bg-stone-700 hover:bg-stone-600 disabled:bg-stone-800 disabled:text-stone-600 text-stone-100 border border-stone-500 disabled:border-stone-700"
            >
              Join Room
            </button>
          </div>

          <div className="border-t border-stone-700 pt-3 text-center">
            <button
              onClick={() => {
                // Switch to local hot-seat fallback
                window.location.search = '?local=1';
              }}
              className="text-xs text-stone-500 hover:text-stone-300 underline"
            >
              Or play hot-seat (single browser)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // In a room (lobby phase)
  const me = mp.room.players.find((p) => p.id === mp.playerId);
  const isHost = !!me?.isHost;
  const allHaveHouse = mp.room.players.every((p) => p.house !== null);
  const allReady = mp.room.players.every((p) => p.isReady);
  const canStart = isHost && mp.room.players.length >= 2 && allHaveHouse && allReady;

  return (
    <div className="min-h-screen bg-stone-900 text-parchment flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-stone-950/60 border border-stone-700 rounded p-6 space-y-4">
        <header className="flex items-baseline justify-between">
          <div>
            <h1 className="font-display text-2xl tracking-[0.2em] text-parchment">
              ROOM <span className="text-amber-400">{mp.room.code}</span>
            </h1>
            <p className="text-xs text-stone-500">
              Share this code with your friends • {mp.room.players.length} / {mp.room.maxPlayers} players
            </p>
          </div>
          <button
            onClick={() => mp.leaveRoom()}
            className="text-xs text-stone-400 hover:text-stone-200 underline"
          >
            Leave
          </button>
        </header>

        {mp.errorMessage && (
          <div className="text-sm text-red-400 border border-red-800 bg-red-950/30 rounded p-2">
            {mp.errorMessage}
          </div>
        )}

        <div className="space-y-2">
          {mp.room.players.map((p) => (
            <div
              key={p.id}
              className={clsx(
                'flex items-center gap-3 p-2 rounded border',
                p.id === mp.playerId ? 'border-amber-400 bg-amber-950/20' : 'border-stone-700 bg-stone-900/50'
              )}
            >
              <div className="flex-1">
                <div className="text-sm font-bold">
                  {p.name}
                  {p.isHost && <span className="ml-2 text-xs text-amber-400">HOST</span>}
                  {!p.isConnected && <span className="ml-2 text-xs text-red-400">disconnected</span>}
                </div>
                <div className="text-xs text-stone-400">
                  {p.house ? (
                    <span style={{ color: HOUSES[p.house].color }}>{HOUSES[p.house].nickname}</span>
                  ) : (
                    <span className="italic">picking House…</span>
                  )}
                </div>
              </div>
              <div>
                {p.isReady ? (
                  <span className="text-xs text-green-400">✓ ready</span>
                ) : (
                  <span className="text-xs text-stone-500">not ready</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* House picker — only for current player */}
        <div className="border-t border-stone-700 pt-3">
          <div className="text-xs font-display tracking-wider text-stone-400 mb-2">
            PICK YOUR HOUSE
          </div>
          <div className="grid grid-cols-2 gap-2">
            {HOUSE_ORDER.map((house) => {
              const taken = mp.room!.players.find((p) => p.house === house && p.id !== mp.playerId);
              const isMine = me?.house === house;
              return (
                <button
                  key={house}
                  disabled={!!taken}
                  onClick={() => mp.selectHouse(house)}
                  className={clsx(
                    'px-3 py-2 rounded border text-sm transition',
                    isMine && 'border-amber-400 bg-amber-900/40',
                    !isMine && !taken && 'border-stone-600 bg-stone-900 hover:bg-stone-800',
                    taken && 'border-stone-800 bg-stone-950 text-stone-600 cursor-not-allowed'
                  )}
                  style={{ color: !taken && !isMine ? HOUSES[house].color : undefined }}
                >
                  <div className="font-display">{house}</div>
                  <div className="text-xs text-stone-500">{HOUSES[house].nickname}</div>
                  {taken && <div className="text-[10px] text-stone-600 mt-0.5">taken by {taken.name}</div>}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={() => mp.toggleReady()}
            disabled={!me?.house}
            className={clsx(
              'flex-1 font-display tracking-wider px-4 py-2 rounded border',
              me?.isReady
                ? 'bg-green-800 border-green-500 text-stone-100 hover:bg-green-700'
                : 'bg-stone-700 border-stone-500 text-stone-100 hover:bg-stone-600',
              !me?.house && 'disabled:bg-stone-900 disabled:text-stone-600 disabled:border-stone-800'
            )}
          >
            {me?.isReady ? '✓ READY' : 'Mark Ready'}
          </button>
          {isHost && (
            <button
              onClick={() => mp.startGame()}
              disabled={!canStart}
              className="flex-1 font-display tracking-wider px-4 py-2 rounded bg-red-700 hover:bg-red-600 disabled:bg-stone-800 disabled:text-stone-600 text-stone-100 border border-red-500 disabled:border-stone-700"
            >
              START GAME
            </button>
          )}
        </div>

        {!isHost && (
          <p className="text-xs text-stone-500 text-center">
            Waiting for the host to start the game…
          </p>
        )}
      </div>
    </div>
  );
}
