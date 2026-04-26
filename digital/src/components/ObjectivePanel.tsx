import { useGameStore } from '@/store/gameStore';
import { useMultiplayerStore } from '@/store/multiplayer';
import { OBJECTIVE_BY_ID } from '@shared/data/objectives';
import { HOUSES } from '@shared/data/houses';
import { localPlayerHouse } from '@shared/engine/orders';

// Shows the LOCAL player's secret objective (their own card).
// In multiplayer mode each player only sees their own.
// In hot-seat mode it falls back to whoever's turn it is.
export function ObjectivePanel() {
  const state = useGameStore();
  const mpHouse = useMultiplayerStore((s) => s.myHouse);
  const myHouse = localPlayerHouse(state, mpHouse);
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
