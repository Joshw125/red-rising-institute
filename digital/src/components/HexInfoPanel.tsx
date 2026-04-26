import clsx from 'clsx';
import { useGameStore } from '@/store/gameStore';
import { HEX_BY_ID, CASTLE_BY_HEX } from '@shared/data/hexes';
import { HOUSES } from '@shared/data/houses';
import { canIssueOrder, currentPlayerHouse } from '@shared/engine/orders';
import type { HouseId, Unit } from '@shared/types';

function readinessLabel(r: Unit['readiness']) {
  switch (r) {
    case 'alert': return { label: 'Alert', color: 'text-green-400' };
    case 'at-ease': return { label: 'At Ease', color: 'text-amber-400' };
    case 'subdued': return { label: 'Subdued', color: 'text-red-400' };
    case 'weakened': return { label: 'Weakened', color: 'text-orange-400' };
  }
}

export function HexInfoPanel() {
  const state = useGameStore();
  const { selectedHexId, selectedUnitId, units } = state;

  if (selectedHexId == null) {
    return (
      <div className="p-4 text-stone-400">
        <p className="font-serif italic">Select a hex to inspect.</p>
      </div>
    );
  }

  const hex = HEX_BY_ID[selectedHexId];
  if (!hex) return null;
  const castle = CASTLE_BY_HEX[selectedHexId];
  const myHouse = currentPlayerHouse(state);

  const occupants = Object.values(units).filter((u) => u.hexId === selectedHexId);
  const occupantsByHouse: Record<HouseId, Unit[]> = { Mars: [], Minerva: [], Apollo: [], Diana: [] };
  for (const u of occupants) occupantsByHouse[u.house].push(u);

  const selectedUnit = selectedUnitId ? units[selectedUnitId] : null;

  return (
    <div className="p-4 space-y-3 text-parchment font-serif">
      <div className="border-b border-stone-700 pb-2">
        <h2 className="font-display text-2xl tracking-wider">Hex #{hex.id}</h2>
        <p className="text-sm text-stone-400">{hex.region}</p>
      </div>

      <div className="space-y-1 text-sm">
        <div>
          <span className="text-stone-400">Terrain:</span>{' '}
          <span className={hex.fertile ? 'text-green-400' : 'text-stone-500'}>
            {hex.fertile ? 'Fertile (1 Food)' : 'Barren'}
          </span>
        </div>
        {hex.special && (
          <div>
            <span className="text-stone-400">Feature:</span>{' '}
            <span className="text-amber-300">
              {hex.special.kind}
              {hex.special.name ? ` — ${hex.special.name}` : ''}
            </span>
          </div>
        )}
        {castle && castle.type === 'neutral' && state.garrisons[castle.hexId] != null && (
          <div className="text-xs text-red-400 mt-1">
            Garrison: {state.garrisons[castle.hexId]} (hidden in real game)
          </div>
        )}
      </div>

      <div className="border-t border-stone-700 pt-2">
        <div className="text-sm text-stone-400 mb-2">
          Occupants ({occupants.length})
        </div>
        {occupants.length === 0 ? (
          <p className="text-xs text-stone-600 italic">Empty</p>
        ) : (
          <div className="space-y-2">
            {(Object.entries(occupantsByHouse) as [HouseId, Unit[]][])
              .filter(([, list]) => list.length > 0)
              .map(([house, list]) => (
                <div key={house}>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="inline-block w-3 h-3 rounded-full"
                      style={{ background: HOUSES[house].color }} />
                    <span className="font-bold">{house}</span>
                    <span className="text-stone-400">({list.length})</span>
                  </div>
                  <ul className="ml-5 mt-1 space-y-1">
                    {list.map((u) => {
                      const r = readinessLabel(u.readiness);
                      const isMine = house === myHouse;
                      const isSelected = u.id === selectedUnitId;
                      const canSelect = isMine && !u.actedThisTurn && u.readiness !== 'subdued' && u.readiness !== 'weakened';
                      return (
                        <li
                          key={u.id}
                          className={clsx(
                            'flex items-center justify-between text-xs px-2 py-1 rounded',
                            isSelected && 'bg-amber-900/50 border border-amber-500',
                            !isSelected && canSelect && 'hover:bg-stone-800 cursor-pointer',
                            !canSelect && 'opacity-50'
                          )}
                          onClick={() => canSelect && state.selectUnit(u.id)}
                        >
                          <span>
                            <span className="text-stone-300">{u.kind}</span>
                            {u.actedThisTurn && <span className="text-stone-500"> (acted)</span>}
                          </span>
                          <span className={r.color}>{r.label}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
          </div>
        )}
      </div>

      {selectedUnit && selectedUnit.house === myHouse && (
        <div className="border-t border-stone-700 pt-3 space-y-2">
          <div className="text-sm font-bold">
            Order for {selectedUnit.kind}
            {selectedUnit.freeMoveUsed && (
              <span className="ml-2 text-xs font-normal text-amber-400">
                free move used
              </span>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <OrderButton
              label="Hold"
              hint="Stay, become Alert"
              onClick={() => state.issueOrder(selectedUnit.id, 'hold')}
              ok={canIssueOrder(state, selectedUnit, 'hold').ok}
              reason={canIssueOrder(state, selectedUnit, 'hold').reason}
            />
            <OrderButton
              label="Gather"
              hint="Collect 1 Food, At Ease"
              onClick={() => state.issueOrder(selectedUnit.id, 'gather')}
              ok={canIssueOrder(state, selectedUnit, 'gather').ok}
              reason={canIssueOrder(state, selectedUnit, 'gather').reason}
            />
            <OrderButton
              label="Rally"
              hint="Restore 1 Weakened unit"
              onClick={() => state.issueOrder(selectedUnit.id, 'rally')}
              ok={canIssueOrder(state, selectedUnit, 'rally').ok}
              reason={canIssueOrder(state, selectedUnit, 'rally').reason}
            />
            <OrderButton
              label="Recruit (3F)"
              hint="Add 1 unit from supply"
              onClick={() => state.issueOrder(selectedUnit.id, 'recruit')}
              ok={canIssueOrder(state, selectedUnit, 'recruit').ok}
              reason={canIssueOrder(state, selectedUnit, 'recruit').reason}
            />
            <OrderButton
              label="Fortify (4F)"
              hint="+2 def for defender here"
              onClick={() => state.issueOrder(selectedUnit.id, 'fortify')}
              ok={canIssueOrder(state, selectedUnit, 'fortify').ok}
              reason={canIssueOrder(state, selectedUnit, 'fortify').reason}
            />
            <OrderButton
              label="Explore"
              hint="Draw a Tactics Card"
              onClick={() => state.issueOrder(selectedUnit.id, 'explore')}
              ok={canIssueOrder(state, selectedUnit, 'explore').ok}
              reason={canIssueOrder(state, selectedUnit, 'explore').reason}
            />
          </div>
          <p className="text-xs text-stone-400 italic">
            {selectedUnit.freeMoveUsed
              ? 'Free move spent. Pick an order, or click red hex to attack.'
              : 'Click green to free-move (1 hex). Click red to attack.'}
            {selectedUnit.house === 'Apollo' && !selectedUnit.freeMoveUsed && (
              <> — Apollo: 2-hex range (Sun's Reach).</>
            )}
          </p>
        </div>
      )}

      {/* Withdraw — visible whenever current player has any non-acted units in this hex */}
      {(() => {
        const myActiveHere = occupants.filter(
          (u) =>
            u.house === myHouse &&
            !u.actedThisTurn &&
            u.readiness !== 'subdued' &&
            u.readiness !== 'weakened'
        );
        if (myActiveHere.length === 0) return null;
        return (
          <div className="border-t border-stone-700 pt-3">
            <button
              onClick={() => state.withdrawHex(selectedHexId)}
              className="w-full text-xs px-3 py-2 rounded border border-purple-700 bg-purple-900/30 hover:bg-purple-900/60 text-parchment"
              title="Pull all of your active units off this hex onto Reserve Track Space 1."
            >
              <div className="font-bold">Withdraw {myActiveHere.length} unit(s)</div>
              <div className="text-stone-400">→ Reserve Track Space 1</div>
            </button>
          </div>
        );
      })()}
    </div>
  );
}

function OrderButton({
  label, hint, onClick, ok, reason,
}: {
  label: string;
  hint: string;
  onClick: () => void;
  ok: boolean;
  reason?: string;
}) {
  return (
    <button
      disabled={!ok}
      onClick={onClick}
      title={ok ? hint : reason}
      className={clsx(
        'px-3 py-2 rounded text-xs text-left border transition',
        ok
          ? 'border-amber-700 bg-amber-900/30 hover:bg-amber-900/60 text-parchment'
          : 'border-stone-700 bg-stone-900/30 text-stone-600 cursor-not-allowed'
      )}
    >
      <div className="font-bold">{label}</div>
      <div className="text-stone-400">{ok ? hint : reason}</div>
    </button>
  );
}
