import clsx from 'clsx';
import { useGameStore } from '@/store/gameStore';
import { previewCombatWithCards } from '@shared/engine/combat';
import { HOUSES } from '@shared/data/houses';
import { HEX_BY_ID } from '@shared/data/hexes';
import { defOf } from '@shared/data/tactics';

export function CombatModal() {
  const state = useGameStore();
  const {
    pendingCombat,
    confirmCombat,
    cancelCombat,
    advanceCombatPhase,
    setAttackerCard,
    setDefenderCard,
    toggleAttackerCompanion,
  } = state;
  if (!pendingCombat) return null;

  const phase = pendingCombat.phase;
  // During defender phase, hide attacker's chosen card (commit-then-reveal).
  // We still need it for engine display in 'resolved' phase.
  const aCard = pendingCombat.attackerCardId ?? null;
  const dCard = pendingCombat.defenderCardId ?? null;
  const showAttackerCard = phase !== 'defender-card';
  const showDefenderCard = phase === 'resolved';

  const preview = previewCombatWithCards(
    state,
    pendingCombat.attackerUnitIds,
    pendingCombat.targetHexId,
    showAttackerCard ? aCard : null,
    showDefenderCard ? dCard : null
  );
  if (!preview) return null;

  const hex = HEX_BY_ID[pendingCombat.targetHexId];
  const isGarrisonFight = preview.defender.isGarrison;
  const isStrike = pendingCombat.kind === 'deployment-strike';

  const attackerHouse = preview.attacker.house;
  const defenderHouse = preview.defender.house;
  const attackerHand =
    state.players.find((p) => p.house === attackerHouse)?.tacticsCards ?? [];
  const defenderHand = isGarrisonFight
    ? []
    : state.players.find((p) => p.house === defenderHouse)?.tacticsCards ?? [];

  // Companion options — non-acted same-house units in source hex (for regular attacks).
  const sourceHexId =
    pendingCombat.kind === 'attack'
      ? state.units[pendingCombat.attackerUnitIds[0]]?.hexId ?? null
      : null;
  const companions = sourceHexId == null
    ? []
    : Object.values(state.units).filter(
        (u) =>
          u.hexId === sourceHexId &&
          u.house === attackerHouse &&
          !u.actedThisTurn &&
          u.readiness !== 'subdued' &&
          u.readiness !== 'weakened'
      );

  const winnerLabel = isGarrisonFight && preview.winner === 'defender'
    ? 'Garrison'
    : preview.winner === 'attacker'
      ? attackerHouse
      : defenderHouse;
  const winnerColor = isGarrisonFight && preview.winner === 'defender'
    ? '#a89a73'
    : HOUSES[preview.winner === 'attacker' ? attackerHouse : defenderHouse].color;

  const phaseTitle =
    phase === 'attacker-card' ? `${attackerHouse} — choose card`
    : phase === 'defender-card' ? `${isGarrisonFight ? 'Garrison' : defenderHouse} — choose card`
    : 'Reveal & resolve';

  const continueLabel =
    phase === 'attacker-card' ? 'Continue → defender'
    : phase === 'defender-card' ? 'Reveal'
    : isStrike ? 'Confirm Strike'
    : isGarrisonFight ? 'Confirm Assault'
    : 'Confirm Attack';

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-stone-900 border-2 border-amber-700 rounded-lg max-w-2xl w-full p-6 my-8 shadow-2xl">
        <div className="border-b border-stone-700 pb-3 mb-4">
          <h2 className="font-display text-2xl tracking-wider text-parchment">
            {isGarrisonFight ? 'Castle Assault' : isStrike ? 'Deployment Strike' : 'Combat'}
          </h2>
          <p className="text-sm text-stone-400">
            Hex #{hex?.id} — {hex?.region}
            {hex?.special && ` · ${hex.special.kind}${hex.special.name ? ` (${hex.special.name})` : ''}`}
          </p>
          <p className="text-xs text-amber-400 mt-1 font-display tracking-wider">
            {phaseTitle}
          </p>
        </div>

        {/* Companion selection — only during attacker-card phase, regular attacks */}
        {phase === 'attacker-card' && pendingCombat.kind === 'attack' && companions.length > 1 && (
          <div className="mb-3 p-2 rounded border border-stone-700 bg-stone-950/40">
            <div className="text-xs text-stone-400 mb-1.5">
              Send additional units from this hex?
            </div>
            <div className="flex flex-wrap gap-1.5">
              {companions.map((u) => {
                const checked = pendingCombat.attackerUnitIds.includes(u.id);
                return (
                  <button
                    key={u.id}
                    onClick={() => toggleAttackerCompanion(u.id)}
                    className={clsx(
                      'text-xs px-2 py-1 rounded border',
                      checked
                        ? 'bg-amber-700 border-amber-400 text-stone-100'
                        : 'bg-stone-800 border-stone-600 text-stone-300 hover:bg-stone-700'
                    )}
                  >
                    {checked ? '✓ ' : ''}{u.kind}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 mb-4">
          <SidePanel label="Attacker" side={preview.attacker} />
          <SidePanel label="Defender" side={preview.defender} />
        </div>

        <div className="text-center py-3 border-y border-stone-700 mb-4">
          {phase === 'resolved' ? (
            <>
              <div className="font-display text-3xl tracking-widest" style={{ color: winnerColor }}>
                {preview.margin === 0
                  ? `${winnerLabel} holds (tie → defender)`
                  : `${winnerLabel} wins by ${preview.margin}`}
              </div>
              <div className="text-sm text-stone-400 mt-1">
                {preview.subdues === 0
                  ? 'Tie — defender holds, no subdues.'
                  : `${preview.subdues} subdued (auto-convert: 2 → 1)`}
              </div>
              {/* Show what each side played, post-reveal */}
              <div className="mt-3 flex justify-around text-xs text-stone-300">
                <div>
                  <span className="text-stone-500">Attacker played:</span>{' '}
                  {aCard ? defOf(aCard)?.name ?? 'Unknown' : <span className="text-stone-600">none</span>}
                </div>
                <div>
                  <span className="text-stone-500">Defender played:</span>{' '}
                  {dCard ? defOf(dCard)?.name ?? 'Unknown' : <span className="text-stone-600">none</span>}
                </div>
              </div>
            </>
          ) : (
            <div className="text-stone-500 italic text-sm">
              Outcome hidden until reveal.
            </div>
          )}
        </div>

        {/* Card hand for current phase */}
        {phase === 'attacker-card' && (
          <CardHandRow
            label={`${attackerHouse} hand — pick a card or skip`}
            hand={attackerHand}
            selected={aCard}
            onPick={setAttackerCard}
          />
        )}
        {phase === 'defender-card' && !isGarrisonFight && (
          <CardHandRow
            label={`${defenderHouse} hand — pick a card or skip (defender)`}
            hand={defenderHand}
            selected={dCard}
            onPick={setDefenderCard}
          />
        )}
        {phase === 'defender-card' && isGarrisonFight && (
          <div className="text-xs text-stone-500 italic mb-3">
            Garrisons do not play Tactics Cards.
          </div>
        )}

        <div className="flex justify-end gap-2">
          <button
            onClick={cancelCombat}
            className="px-4 py-2 rounded border border-stone-600 text-stone-300 hover:bg-stone-800"
          >
            Cancel
          </button>
          <button
            onClick={phase === 'resolved' ? confirmCombat : advanceCombatPhase}
            className="px-4 py-2 rounded bg-red-700 hover:bg-red-600 border border-red-500 text-stone-100 font-display tracking-wider"
          >
            {continueLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

function CardHandRow({
  label, hand, selected, onPick,
}: {
  label: string;
  hand: string[];
  selected: string | null;
  onPick: (id: string | null) => void;
}) {
  return (
    <div className="border-t border-stone-700 pt-3 mb-4">
      <div className="text-xs text-stone-400 mb-2 font-display tracking-wider">{label}</div>
      {hand.length === 0 ? (
        <p className="text-xs text-stone-600 italic">No cards in hand.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          <CardChip
            label="No card"
            isActive={!selected}
            onClick={() => onPick(null)}
          />
          {hand.map((id) => {
            const def = defOf(id);
            if (!def) return null;
            return (
              <CardChip
                key={id}
                label={def.name}
                flavor={def.description}
                unimplemented={def.unimplemented}
                isActive={selected === id}
                onClick={() => onPick(selected === id ? null : id)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

function CardChip({
  label, flavor, unimplemented, isActive, onClick,
}: {
  label: string;
  flavor?: string;
  unimplemented?: boolean;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      title={flavor ?? ''}
      className={clsx(
        'px-2.5 py-1.5 rounded text-xs border transition text-left',
        isActive
          ? 'bg-amber-700 border-amber-400 text-stone-100'
          : 'bg-stone-800 border-stone-600 text-stone-300 hover:bg-stone-700'
      )}
    >
      <div className="font-bold">{label}</div>
      {flavor && (
        <div className="text-[10px] text-stone-400 max-w-[180px] truncate">{flavor}</div>
      )}
      {unimplemented && (
        <div className="text-[9px] text-orange-400 mt-0.5">(WIP)</div>
      )}
    </button>
  );
}

function SidePanel({
  label, side,
}: {
  label: string;
  side: ReturnType<typeof previewCombatWithCards> extends infer R
    ? R extends { attacker: infer A } ? A : never
    : never;
}) {
  if (!side) return null;
  const isGarrison = side.isGarrison;
  return (
    <div className="bg-stone-950/60 border border-stone-700 rounded p-3">
      <div className="flex items-center gap-2 mb-2">
        <span
          className="inline-block w-3 h-3 rounded-full"
          style={{ background: isGarrison ? '#a89a73' : HOUSES[side.house].color }}
        />
        <span className="font-display text-sm text-stone-400">{label}</span>
        <span
          className="font-display text-base"
          style={{ color: isGarrison ? '#a89a73' : HOUSES[side.house].color }}
        >
          {isGarrison ? 'Garrison' : side.house}
        </span>
      </div>
      <div className="text-xs text-stone-300 space-y-0.5">
        <div>
          Alert: <span className="text-green-400">{side.alertCount}</span>
          {' · '}
          At Ease: <span className="text-amber-400">{side.atEaseCount}</span>
        </div>
        <div>
          Base: <span className="text-stone-100">{side.baseStrength}</span>
        </div>
        {side.modifiers.map((m, i) => (
          <div key={i} className="text-stone-400">
            {m.value !== 0 && (m.value > 0 ? '+ ' : '− ')}
            {m.value !== 0 && Math.abs(m.value)}
            {m.value !== 0 && ' '}
            <span className="text-stone-500">{m.name}</span>
          </div>
        ))}
      </div>
      <div className="mt-2 pt-2 border-t border-stone-700 font-display text-xl text-parchment">
        Total: {side.total}
      </div>
    </div>
  );
}
