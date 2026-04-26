import clsx from 'clsx';
import { useGameStore } from '@/store/gameStore';
import { useMultiplayerStore } from '@/store/multiplayer';
import { HOUSES } from '@shared/data/houses';
import { currentPlayerHouse, localPlayerHouse } from '@shared/engine/orders';

export function ReserveTrackPanel() {
  const state = useGameStore();
  const mpHouse = useMultiplayerStore((s) => s.myHouse);
  const { reserveGroups, deployMode } = state;
  const myHouse = localPlayerHouse(state, mpHouse);
  const turnHouse = currentPlayerHouse(state);
  const isMyTurn = myHouse === turnHouse;

  const myGroups = Object.values(reserveGroups).filter((g) => g.house === myHouse);

  return (
    <div className="bg-stone-950/60 border border-stone-700 rounded p-3 text-parchment">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-display text-sm tracking-wider text-stone-400">
          Reserve Track {myHouse && <span style={{ color: HOUSES[myHouse].color }}>({myHouse})</span>}
        </h3>
        {deployMode && (
          <button
            onClick={state.cancelDeploy}
            className="text-xs px-2 py-0.5 rounded border border-stone-600 hover:bg-stone-800"
          >
            Cancel deploy
          </button>
        )}
      </div>

      {myGroups.length === 0 ? (
        <p className="text-xs text-stone-600 italic">No groups on Reserve Track.</p>
      ) : (
        <ul className="space-y-1.5">
          {myGroups.map((g) => {
            const isActiveDeploy = deployMode?.groupId === g.id;
            const range = g.space === 1 ? 3 : g.space === 2 ? 6 : 9;
            return (
              <li
                key={g.id}
                className={clsx(
                  'text-xs px-2 py-1.5 rounded border transition',
                  isActiveDeploy
                    ? 'border-cyan-500 bg-cyan-900/30'
                    : 'border-stone-700 bg-stone-900/40'
                )}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold">Space {g.space}</span>
                    <span className="text-stone-500"> · </span>
                    <span>{g.unitIds.length} unit{g.unitIds.length === 1 ? '' : 's'}</span>
                    <span className="text-stone-500"> · range {range}</span>
                  </div>
                  {!deployMode && isMyTurn && (
                    <button
                      onClick={() => state.startDeploy(g.id)}
                      className="text-xs px-2 py-0.5 rounded bg-cyan-700 hover:bg-cyan-600 border border-cyan-500 text-stone-100"
                    >
                      Deploy
                    </button>
                  )}
                </div>
                <div className="text-stone-500 mt-0.5">
                  Marker @ hex {g.removalHexId}
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {deployMode && (
        <p className="text-xs text-cyan-400 mt-2 italic">
          Click a cyan hex to deploy. Red border = Deployment Strike.
        </p>
      )}
    </div>
  );
}
