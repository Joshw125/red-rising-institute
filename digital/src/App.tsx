import { useEffect } from 'react';
import { HexMap } from './components/HexMap';
import { HexInfoPanel } from './components/HexInfoPanel';
import { PlayerBar } from './components/PlayerBar';
import { CombatModal } from './components/CombatModal';
import { ReserveTrackPanel } from './components/ReserveTrackPanel';
import { HuntPrompt } from './components/HuntPrompt';
import { WinScreen } from './components/WinScreen';
import { ProctorBanner } from './components/ProctorBanner';
import { GameLogPanel } from './components/GameLogPanel';
import { ObjectivePanel } from './components/ObjectivePanel';
import { Lobby } from './components/Lobby';
import { useGameStore } from './store/gameStore';
import { useMultiplayerStore, onMultiplayerStateUpdate } from './store/multiplayer';

// Set up the bridge from multiplayer store → game store. Whenever the server
// pushes new game state, replace the local game store's state.
onMultiplayerStateUpdate((newState) => {
  useGameStore.setState(newState as any);
});

// Decide which mode the app is in based on URL.
//   ?local=1  → hot-seat single browser (uses initDemoGame)
//   default   → multiplayer (Lobby + WebSocket)
function isLocalMode(): boolean {
  if (typeof window === 'undefined') return false;
  const params = new URLSearchParams(window.location.search);
  return params.get('local') === '1';
}

export default function App() {
  const phase = useGameStore((s) => s.phase);
  const initDemoGame = useGameStore((s) => s.initDemoGame);
  const localMode = isLocalMode();
  const room = useMultiplayerStore((s) => s.room);
  const roomStatus = room?.status;

  useEffect(() => {
    if (localMode && phase === 'setup') {
      initDemoGame(['Mars', 'Diana']);
    }
  }, [phase, initDemoGame, localMode]);

  // In multiplayer mode: show Lobby until the server has sent a GAME_STARTED.
  if (!localMode && (!room || roomStatus !== 'playing')) {
    return <Lobby />;
  }

  return (
    <div className="min-h-screen bg-stone-900 text-parchment">
      <header className="px-4 py-3 border-b border-stone-700 bg-stone-950">
        <h1 className="font-display text-2xl tracking-[0.3em] text-parchment">
          RED RISING <span className="text-stone-500">·</span> THE INSTITUTE
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Digital prototype v0.1 — click a hex to inspect.
        </p>
      </header>

      <PlayerBar />
      <ProctorBanner />

      <div className="flex flex-col lg:flex-row gap-4 p-4">
        <main className="flex-1 flex justify-center">
          <HexMap />
        </main>
        <aside className="w-full lg:w-80 space-y-3">
          <div className="bg-stone-950/60 border border-stone-700 rounded">
            <HexInfoPanel />
          </div>
          <ReserveTrackPanel />
          <ObjectivePanel />
          <GameLogPanel />
        </aside>
      </div>

      <CombatModal />
      <HuntPrompt />
      <WinScreen />
    </div>
  );
}
