import { useGameStore } from '@/store/gameStore';
import { NEIGHBORS } from '@shared/engine/adjacency';
import { HEXES, CALIBRATION, hexCenter, hexPolygonPoints } from '@shared/data/hexes';

// Diana The Hunt — overlay on map highlighting 1-hex follow-up targets.
// Sits inside HexMap-equivalent rendering scope. Implemented as a separate
// fixed prompt that tells the user what to do.
export function HuntPrompt() {
  const pendingHunt = useGameStore((s) => s.pendingHunt);
  const skipHunt = useGameStore((s) => s.skipHunt);
  if (!pendingHunt) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-purple-900/90 border-2 border-purple-400 rounded-lg px-5 py-3 shadow-2xl">
      <div className="flex items-center gap-4">
        <div>
          <div className="font-display tracking-wider text-purple-200">
            Diana — The Hunt
          </div>
          <div className="text-xs text-purple-200/80">
            Click a green hex to advance {pendingHunt.attackerUnitIds.length} survivor(s) 1 hex, or skip.
          </div>
        </div>
        <button
          onClick={skipHunt}
          className="text-xs px-3 py-1 rounded border border-purple-400 hover:bg-purple-800"
        >
          Skip follow-up
        </button>
      </div>
    </div>
  );
}

// Helper exported for HexMap to know which hexes to highlight as hunt targets.
export function huntTargetIds(fromHexId: number): Set<number> {
  return new Set(NEIGHBORS[fromHexId] ?? []);
}

// Renders the green target overlay polygons inside HexMap's SVG.
export function HuntTargetOverlay() {
  const pendingHunt = useGameStore((s) => s.pendingHunt);
  if (!pendingHunt) return null;
  const targets = huntTargetIds(pendingHunt.fromHexId);
  return (
    <g pointerEvents="none">
      {[...targets].map((id) => {
        const hex = HEXES.find((h) => h.id === id);
        if (!hex) return null;
        const p = hexCenter(hex.c, hex.r);
        const rr = CALIBRATION.r * CALIBRATION.rs[hex.r] * 0.95;
        return (
          <polygon
            key={`hunt-${id}`}
            points={hexPolygonPoints(p.x, p.y, rr)}
            fill="rgba(192,132,252,0.25)"
            stroke="#c084fc"
            strokeWidth={3}
          />
        );
      })}
    </g>
  );
}
