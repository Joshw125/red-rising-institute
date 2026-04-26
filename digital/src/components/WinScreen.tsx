import { useGameStore } from '@/store/gameStore';
import { HOUSES } from '@shared/data/houses';
import { computeVP } from '@shared/engine/scoring';

export function WinScreen() {
  const state = useGameStore();
  const { gameOver } = state;
  if (!gameOver) return null;

  const winnerColor = HOUSES[gameOver.winner].color;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-stone-900 border-2 rounded-lg max-w-2xl w-full p-6 shadow-2xl"
        style={{ borderColor: winnerColor }}>
        <div className="text-center mb-4">
          <div
            className="font-display text-4xl tracking-widest"
            style={{ color: winnerColor }}
          >
            {gameOver.winner.toUpperCase()} WINS
          </div>
          <p className="text-sm text-stone-400 mt-2 italic">{gameOver.reason}</p>
        </div>

        <div className="border-t border-stone-700 pt-3 mt-2">
          <h3 className="font-display text-sm tracking-wider text-stone-400 mb-2">Final Scoring</h3>
          <div className="grid grid-cols-2 gap-3">
            {state.players.map((p) => {
              const vp = computeVP(state, p.house);
              const isWinner = p.house === gameOver.winner;
              return (
                <div
                  key={p.house}
                  className={`p-3 rounded border ${isWinner ? 'border-amber-400 bg-amber-900/20' : 'border-stone-700 bg-stone-950/40'}`}
                >
                  <div
                    className="font-display text-base"
                    style={{ color: HOUSES[p.house].color }}
                  >
                    {p.house}
                  </div>
                  <div className="text-2xl font-bold text-parchment">{vp.total} VP</div>
                  <ul className="text-xs text-stone-400 mt-1 space-y-0.5">
                    {vp.details.map((d, i) => (
                      <li key={i} className="flex justify-between">
                        <span>{d.label}</span>
                        <span className="text-stone-300">{d.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
