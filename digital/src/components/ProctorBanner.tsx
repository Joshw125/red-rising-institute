import { useGameStore } from '@/store/gameStore';
import { PROCTOR_BY_ID } from '@shared/data/proctors';

export function ProctorBanner() {
  const id = useGameStore((s) => s.currentProctorId);
  if (!id) return null;
  const card = PROCTOR_BY_ID[id];
  if (!card) return null;

  const tone =
    card.act === 1 ? 'border-amber-700 bg-amber-950/40'
    : card.act === 2 ? 'border-stone-400 bg-stone-800/40'
    : 'border-yellow-500 bg-yellow-950/40';

  return (
    <div className={`px-3 py-2 border-l-4 ${tone}`}>
      <div className="flex items-baseline gap-2">
        <span className="text-[10px] font-display tracking-widest text-stone-500">
          PROCTOR · ACT {['I','II','III'][card.act - 1]}
        </span>
        <span className="font-display text-base text-parchment">{card.name}</span>
      </div>
      <p className="text-xs text-stone-300 italic">{card.flavor}</p>
      <p className="text-xs text-stone-400">{card.description}</p>
    </div>
  );
}
