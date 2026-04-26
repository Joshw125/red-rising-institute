import { useGameStore } from '@/store/gameStore';
import { OBJECTIVE_BY_ID } from '@shared/data/objectives';
import { HOUSES } from '@shared/data/houses';
import { currentPlayerHouse } from '@shared/engine/orders';

// Shows the CURRENT player's secret objective.
// In hot-seat play this is fine — only the active player should be looking at the screen.
export function ObjectivePanel() {
  const state = useGameStore();
  const myHouse = currentPlayerHouse(state);
  if (!myHouse) return null;
  const player = state.players.find((p) => p.house === myHouse);
  if (!player?.objectiveId) return null;
  const obj = OBJECTIVE_BY_ID[player.objectiveId];
  if (!obj) return null;

  const completed = obj.check(state, myHouse);

  return (
    <div className="bg-stone-950/60 border border-stone-700 rounded">
      <div className="px-3 py-2 border-b border-stone-700">
        <h3 className="font-display text-sm tracking-wider text-stone-400">
          Your Secret Objective
          <span className="ml-2 text-xs text-stone-500">({HOUSES[myHouse].nickname})</span>
        </h3>
      </div>
      <div className="px-3 py-2 space-y-1">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-base text-parchment">{obj.name}</span>
          <span className="text-xs font-bold text-amber-400">{obj.vp} VP</span>
          {completed && <span className="text-xs text-green-400 font-bold">✓ on track</span>}
        </div>
        <p className="text-xs italic text-stone-400">{obj.flavor}</p>
        <p className="text-xs text-stone-300">{obj.description}</p>
      </div>
    </div>
  );
}
