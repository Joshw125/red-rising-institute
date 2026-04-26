import clsx from 'clsx';
import { useGameStore } from '@/store/gameStore';
import { HOUSES } from '@shared/data/houses';

export function PlayerBar() {
  const players = useGameStore((s) => s.players);
  const round = useGameStore((s) => s.round);
  const act = useGameStore((s) => s.act);
  const phase = useGameStore((s) => s.phase);
  const currentPlayerIdx = useGameStore((s) => s.currentPlayerIdx);
  const endTurn = useGameStore((s) => s.endTurn);

  if (players.length === 0) return null;

  const currentHouse = players[currentPlayerIdx]?.house;

  return (
    <div className="flex items-center gap-4 p-3 bg-stone-950/80 border-b border-stone-700">
      <div className="font-display text-parchment whitespace-nowrap">
        <span className="text-xs text-stone-500 mr-2">ROUND</span>
        <span className="text-xl">{round}</span>
        <span className="text-xs text-stone-500 mx-2">ACT</span>
        <span className="text-xl">{['I', 'II', 'III'][act - 1]}</span>
      </div>
      <div className="flex-1 flex gap-3 flex-wrap">
        {players.map((p, i) => (
          <div
            key={p.house}
            className={clsx(
              'px-3 py-1.5 rounded border transition',
              i === currentPlayerIdx ? 'border-amber-400 ring-2 ring-amber-400/40' : 'border-stone-700'
            )}
            style={{ background: `${HOUSES[p.house].color}22` }}
          >
            <div
              className="font-display text-sm"
              style={{ color: HOUSES[p.house].color }}
            >
              {p.house}
            </div>
            <div className="text-xs text-stone-300 flex gap-2">
              <span title="Food">🌾 {p.food}</span>
              <span title="Victory Points">★ {p.vp}</span>
              <span title="Combats won">⚔ {p.combatsWon}</span>
              <span title="Tactics cards in hand">🂠 {p.tacticsCards.length}</span>
            </div>
          </div>
        ))}
      </div>
      <button
        disabled={phase !== 'turn'}
        onClick={endTurn}
        className="font-display tracking-wider px-4 py-2 rounded bg-amber-700 hover:bg-amber-600 disabled:bg-stone-800 disabled:text-stone-600 text-stone-100 border border-amber-500 disabled:border-stone-700 transition"
      >
        End {currentHouse ?? ''} Turn
      </button>
    </div>
  );
}
