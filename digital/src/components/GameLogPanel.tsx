import { useEffect, useRef } from 'react';
import { useGameStore } from '@/store/gameStore';

// Maps log line patterns to a visual tone class.
function classify(line: string): string {
  if (line.startsWith('***')) return 'text-amber-300 font-bold';
  if (line.startsWith('— ')) return 'text-stone-500 italic';
  if (line.startsWith('!')) return 'text-red-400';
  if (line.startsWith('Combat')) return 'text-red-300';
  if (line.match(/^Mars|^Diana|^Apollo|^Minerva/)) return 'text-stone-300';
  if (line.match(/^[A-Z][^:]*:/)) return 'text-amber-200'; // Proctor effects
  return 'text-stone-400';
}

export function GameLogPanel() {
  const log = useGameStore((s) => s.log);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [log.length]);

  return (
    <div className="bg-stone-950/60 border border-stone-700 rounded">
      <div className="px-3 py-2 border-b border-stone-700">
        <h3 className="font-display text-sm tracking-wider text-stone-400">Game Log</h3>
      </div>
      <div ref={scrollRef} className="px-3 py-2 max-h-64 overflow-y-auto text-xs space-y-0.5 font-mono">
        {log.length === 0 ? (
          <p className="text-stone-600 italic">No events yet.</p>
        ) : (
          log.slice(-200).map((entry, i) => (
            <div key={i} className={classify(entry)}>
              {entry}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
