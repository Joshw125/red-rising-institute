import { useMemo } from 'react';
import { HEXES, CALIBRATION, hexCenter, hexPolygonPoints, CASTLE_BY_HEX } from '@shared/data/hexes';
import { HOUSES } from '@shared/data/houses';
import { NEIGHBORS } from '@shared/engine/adjacency';
import { getDeployTargets } from '@shared/engine/reserve';
import { HuntTargetOverlay } from './HuntPrompt';
import { useGameStore } from '@/store/gameStore';
import type { HouseId, Readiness, Unit } from '@shared/types';

// Match base_art.png natural dimensions (recent_map.png — 1554x1168, includes
// reserve-track region at the bottom).
const BOARD_W = 1554;
const BOARD_H = 1168;

const REGION_FILLS: Record<string, string> = {
  'Mountains': 'rgba(120,110,100,0.10)',
  'North Woods': 'rgba(40,90,50,0.12)',
  'Highlands': 'rgba(180,160,100,0.10)',
  'Postern Hills': 'rgba(150,120,80,0.10)',
  'Argos River': 'rgba(60,130,180,0.18)',
  'Greatwoods': 'rgba(30,80,40,0.18)',
  'Southern Reaches': 'rgba(180,100,70,0.10)',
  'South Sea Coast': 'rgba(90,160,180,0.10)',
};

interface HexUnitInfo {
  byHouseAndReadiness: Record<HouseId, Record<Readiness, number>>;
}

function unitsByHex(units: Record<string, Unit>): Record<number, HexUnitInfo> {
  const map: Record<number, HexUnitInfo> = {};
  for (const u of Object.values(units)) {
    if (u.hexId == null) continue;
    if (!map[u.hexId]) {
      map[u.hexId] = {
        byHouseAndReadiness: {
          Mars: { alert: 0, 'at-ease': 0, subdued: 0, weakened: 0 },
          Minerva: { alert: 0, 'at-ease': 0, subdued: 0, weakened: 0 },
          Apollo: { alert: 0, 'at-ease': 0, subdued: 0, weakened: 0 },
          Diana: { alert: 0, 'at-ease': 0, subdued: 0, weakened: 0 },
        },
      };
    }
    map[u.hexId].byHouseAndReadiness[u.house][u.readiness]++;
  }
  return map;
}

// Hexes within `range` steps of `originId`, EXCLUDING the origin itself.
function hexesWithin(originId: number, range: number): Set<number> {
  const out = new Set<number>();
  let frontier: number[] = [originId];
  const visited = new Set<number>([originId]);
  for (let d = 0; d < range; d++) {
    const next: number[] = [];
    for (const id of frontier) {
      for (const n of NEIGHBORS[id] ?? []) {
        if (!visited.has(n)) {
          visited.add(n);
          out.add(n);
          next.push(n);
        }
      }
    }
    frontier = next;
  }
  return out;
}

export function HexMap() {
  const selectedHexId = useGameStore((s) => s.selectedHexId);
  const selectedUnitId = useGameStore((s) => s.selectedUnitId);
  const selectHex = useGameStore((s) => s.selectHex);
  const issueFreeMove = useGameStore((s) => s.issueFreeMove);
  const units = useGameStore((s) => s.units);

  const startAttack = useGameStore((s) => s.startAttack);
  const deployMode = useGameStore((s) => s.deployMode);
  const confirmDeploy = useGameStore((s) => s.confirmDeploy);
  const reserveGroups = useGameStore((s) => s.reserveGroups);
  const pendingHunt = useGameStore((s) => s.pendingHunt);
  const confirmHunt = useGameStore((s) => s.confirmHunt);
  const fullState = useGameStore();

  const positions = useMemo(
    () => Object.fromEntries(HEXES.map((h) => [h.id, hexCenter(h.c, h.r)])),
    []
  );

  const unitMap = useMemo(() => unitsByHex(units), [units]);

  const selectedUnit = selectedUnitId ? units[selectedUnitId] : null;

  // Free-move range depends on Apollo Sun's Reach (2-hex). After the free move
  // is used, no more move targets — but attack targets remain (adjacent only).
  const freeMoveRange = selectedUnit?.house === 'Apollo' ? 2 : 1;

  const garrisons = useGameStore((s) => s.garrisons);

  // Diana Shadow — special unit moves through enemy hexes without combat.
  const isShadow = selectedUnit?.house === 'Diana' && selectedUnit?.kind === 'special';

  const { moveTargets, attackTargets } = useMemo(() => {
    const move = new Set<number>();
    const atk = new Set<number>();
    if (selectedUnit && selectedUnit.hexId != null && !selectedUnit.actedThisTurn) {
      for (const n of NEIGHBORS[selectedUnit.hexId] ?? []) {
        const enemyHere = Object.values(units).some(
          (u) => u.hexId === n && u.house !== selectedUnit.house
        );
        const garrisonHere = (garrisons[n] ?? 0) > 0 &&
          !Object.values(units).some((u) => u.hexId === n && u.house === selectedUnit.house);
        // Diana Shadow can MOVE into enemy hexes (bypass combat) instead of attacking.
        if (isShadow && (enemyHere || garrisonHere)) {
          move.add(n);
          continue;
        }
        if (enemyHere || garrisonHere) atk.add(n);
      }
      if (!selectedUnit.freeMoveUsed) {
        const reach = hexesWithin(selectedUnit.hexId, freeMoveRange);
        for (const n of reach) {
          if (atk.has(n)) continue;
          if (move.has(n)) continue;
          const enemyHere = Object.values(units).some(
            (u) => u.hexId === n && u.house !== selectedUnit.house
          );
          const garrisonHere = (garrisons[n] ?? 0) > 0;
          if (!enemyHere && !garrisonHere) move.add(n);
          else if (isShadow) move.add(n); // Shadow can pass through anywhere within range
        }
      }
    }
    return { moveTargets: move, attackTargets: atk };
  }, [selectedUnit, units, freeMoveRange, garrisons, isShadow]);

  const deployTargets = useMemo(() => {
    if (!deployMode) return [];
    return getDeployTargets(fullState, deployMode.groupId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deployMode, units, reserveGroups]);
  const deployStrikeIds = new Set(deployTargets.filter((t) => t.isStrike).map((t) => t.hexId));
  const deploySafeIds = new Set(deployTargets.filter((t) => !t.isStrike).map((t) => t.hexId));

  const removalHexIds = useMemo(
    () => new Set(Object.values(reserveGroups).map((g) => g.removalHexId)),
    [reserveGroups]
  );

  const handleHexClick = (hexId: number) => {
    if (pendingHunt) {
      if (NEIGHBORS[pendingHunt.fromHexId]?.includes(hexId)) confirmHunt(hexId);
      return;
    }
    if (deployMode) {
      if (deploySafeIds.has(hexId) || deployStrikeIds.has(hexId)) {
        confirmDeploy(hexId);
      }
      return;
    }
    if (selectedUnit && moveTargets.has(hexId)) {
      issueFreeMove(selectedUnit.id, hexId);
    } else if (selectedUnit && attackTargets.has(hexId)) {
      startAttack(selectedUnit.id, hexId);
    } else {
      selectHex(hexId);
    }
  };

  return (
    <div className="relative inline-block border-2 border-stone-700 bg-stone-900">
      <img
        src="/base_art.png"
        alt="Institute board"
        className="block w-full h-auto"
        style={{ maxWidth: BOARD_W }}
      />
      <svg
        viewBox={`0 0 ${BOARD_W} ${BOARD_H}`}
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: 'auto' }}
      >
        {/* Region tints — disabled because the recent_map.png has region
            shading and labels baked in. Keeping the data here in case we
            swap back to the plain Nano-Banana art later. */}

        {/* Deploy target highlights */}
        {deployMode && (
          <g pointerEvents="none">
            {[...deploySafeIds].map((id) => {
              const p = positions[id];
              const hex = HEXES.find((h) => h.id === id);
              if (!hex) return null;
              const rr = CALIBRATION.r * CALIBRATION.rs[hex.r] * 0.95;
              return (
                <polygon
                  key={`dep-${id}`}
                  points={hexPolygonPoints(p.x, p.y, rr)}
                  fill="rgba(56,189,248,0.20)"
                  stroke="#38bdf8"
                  strokeWidth={3}
                />
              );
            })}
            {[...deployStrikeIds].map((id) => {
              const p = positions[id];
              const hex = HEXES.find((h) => h.id === id);
              if (!hex) return null;
              const rr = CALIBRATION.r * CALIBRATION.rs[hex.r] * 0.95;
              return (
                <polygon
                  key={`strike-${id}`}
                  points={hexPolygonPoints(p.x, p.y, rr)}
                  fill="rgba(229,62,62,0.25)"
                  stroke="#e53e3e"
                  strokeWidth={3}
                  strokeDasharray="6,3"
                />
              );
            })}
          </g>
        )}

        {/* Diana Hunt target overlay */}
        <HuntTargetOverlay />

        {/* Move + attack target highlights */}
        {selectedUnit && (
          <g pointerEvents="none">
            {[...moveTargets].map((id) => {
              const p = positions[id];
              const hex = HEXES.find((h) => h.id === id);
              if (!hex) return null;
              const rr = CALIBRATION.r * CALIBRATION.rs[hex.r] * 0.95;
              return (
                <polygon
                  key={`tgt-${id}`}
                  points={hexPolygonPoints(p.x, p.y, rr)}
                  fill="rgba(72,187,120,0.25)"
                  stroke="#48bb78"
                  strokeWidth={3}
                />
              );
            })}
            {[...attackTargets].map((id) => {
              const p = positions[id];
              const hex = HEXES.find((h) => h.id === id);
              if (!hex) return null;
              const rr = CALIBRATION.r * CALIBRATION.rs[hex.r] * 0.95;
              return (
                <polygon
                  key={`atk-${id}`}
                  points={hexPolygonPoints(p.x, p.y, rr)}
                  fill="rgba(229,62,62,0.30)"
                  stroke="#e53e3e"
                  strokeWidth={3}
                />
              );
            })}
          </g>
        )}

        {/* Interactive hexes */}
        <g>
          {HEXES.map((h) => {
            const p = positions[h.id];
            const rr = CALIBRATION.r * CALIBRATION.rs[h.r] * 0.97;
            const isSelected = selectedHexId === h.id;
            return (
              <polygon
                key={`hex-${h.id}`}
                points={hexPolygonPoints(p.x, p.y, rr)}
                fill="transparent"
                stroke={isSelected ? '#f1c40f' : 'rgba(255,255,255,0.18)'}
                strokeWidth={isSelected ? 3 : 1}
                style={{ cursor: 'pointer' }}
                onClick={() => handleHexClick(h.id)}
              />
            );
          })}
        </g>

        {/* Hex numbers — disabled (recent_map.png has them baked in). */}

        {/* Removal markers */}
        <g pointerEvents="none">
          {[...removalHexIds].map((hexId) => {
            const p = positions[hexId];
            const hex = HEXES.find((h) => h.id === hexId);
            if (!hex) return null;
            const rr = CALIBRATION.r * CALIBRATION.rs[hex.r];
            return (
              <g key={`rm-${hexId}`}>
                <rect
                  x={p.x + rr * 0.35}
                  y={p.y - rr * 0.55}
                  width={rr * 0.4}
                  height={rr * 0.4}
                  fill="#1a1a1a"
                  stroke="#fff"
                  strokeWidth={1.5}
                />
                <text
                  x={p.x + rr * 0.55}
                  y={p.y - rr * 0.22}
                  fontFamily="Cinzel, serif"
                  fontSize={rr * 0.32}
                  fontWeight={900}
                  fill="#fff"
                  textAnchor="middle"
                >
                  ×
                </text>
              </g>
            );
          })}
        </g>

        {/* Castle ownership markers — small colored dot in the corner of castle
            hexes to show who controls them. The board art has the castle icons
            baked in (gray crenellated walls), so we use a small dot to convey
            ownership without obscuring the art. */}
        <g pointerEvents="none">
          {HEXES.filter((h) => h.special?.kind === 'Castle').map((h) => {
            const p = positions[h.id];
            const rr = CALIBRATION.r * CALIBRATION.rs[h.r];
            const castle = CASTLE_BY_HEX[h.id];
            const playingHouses = new Set(useGameStore.getState().players.map((p) => p.house));
            const isPlayingHome =
              castle?.type === 'home' && castle.house && playingHouses.has(castle.house);
            const fill = isPlayingHome ? HOUSES[castle!.house!].color : '#a89a73';
            return (
              <g key={`castle-${h.id}`}>
                {/* Small ownership dot in the upper-right corner of the hex */}
                <circle
                  cx={p.x + rr * 0.45}
                  cy={p.y - rr * 0.45}
                  r={rr * 0.14}
                  fill={fill}
                  stroke="#1a1a1a"
                  strokeWidth={1.5}
                />
              </g>
            );
          })}
        </g>

        {/* Unit pips — split by readiness state.
            Standing rect = Alert. Lying rect = At Ease. Faded with × = Subdued. */}
        <g pointerEvents="none">
          {Object.entries(unitMap).flatMap(([hexIdStr, info]) => {
            const hexId = Number(hexIdStr);
            const p = positions[hexId];
            const hex = HEXES.find((h) => h.id === hexId);
            if (!hex) return [];
            const rr = CALIBRATION.r * CALIBRATION.rs[hex.r];

            const pips: { house: HouseId; readiness: Readiness; count: number }[] = [];
            for (const house of ['Mars', 'Minerva', 'Apollo', 'Diana'] as HouseId[]) {
              const counts = info.byHouseAndReadiness[house];
              for (const r of ['alert', 'at-ease', 'subdued', 'weakened'] as Readiness[]) {
                if (counts[r] > 0) pips.push({ house, readiness: r, count: counts[r] });
              }
            }

            return pips.map((pip, i) => {
              const slot = i;
              const cx = p.x + slot * rr * 0.42 - rr * 0.4;
              const cy = p.y + rr * 0.62;
              const houseColor = HOUSES[pip.house].color;

              if (pip.readiness === 'alert') {
                // Tall standing pip
                return (
                  <g key={`u-${hexId}-${pip.house}-${pip.readiness}`}>
                    <rect
                      x={cx - rr * 0.13}
                      y={cy - rr * 0.22}
                      width={rr * 0.26}
                      height={rr * 0.44}
                      rx={rr * 0.06}
                      fill={houseColor}
                      stroke="#fff"
                      strokeWidth={1.5}
                    />
                    <text
                      x={cx}
                      y={cy + rr * 0.06}
                      fontFamily="Cinzel, serif"
                      fontSize={rr * 0.22}
                      fontWeight={900}
                      fill="#fff"
                      textAnchor="middle"
                    >
                      {pip.count}
                    </text>
                  </g>
                );
              }
              if (pip.readiness === 'at-ease') {
                // Wide lying pip
                return (
                  <g key={`u-${hexId}-${pip.house}-${pip.readiness}`}>
                    <rect
                      x={cx - rr * 0.22}
                      y={cy - rr * 0.13}
                      width={rr * 0.44}
                      height={rr * 0.26}
                      rx={rr * 0.06}
                      fill={houseColor}
                      stroke="#fbbf24"
                      strokeWidth={1.5}
                      opacity={0.85}
                    />
                    <text
                      x={cx}
                      y={cy + rr * 0.05}
                      fontFamily="Cinzel, serif"
                      fontSize={rr * 0.2}
                      fontWeight={900}
                      fill="#1a1a1a"
                      textAnchor="middle"
                    >
                      {pip.count}
                    </text>
                  </g>
                );
              }
              if (pip.readiness === 'subdued') {
                return (
                  <g key={`u-${hexId}-${pip.house}-${pip.readiness}`} opacity={0.55}>
                    <rect
                      x={cx - rr * 0.13}
                      y={cy - rr * 0.22}
                      width={rr * 0.26}
                      height={rr * 0.44}
                      rx={rr * 0.06}
                      fill={houseColor}
                      stroke="#666"
                      strokeWidth={1.5}
                    />
                    <line
                      x1={cx - rr * 0.18}
                      y1={cy - rr * 0.27}
                      x2={cx + rr * 0.18}
                      y2={cy + rr * 0.27}
                      stroke="#fff"
                      strokeWidth={2.5}
                    />
                    <text
                      x={cx + rr * 0.16}
                      y={cy + rr * 0.34}
                      fontFamily="Cinzel, serif"
                      fontSize={rr * 0.18}
                      fontWeight={900}
                      fill="#fff"
                      textAnchor="middle"
                    >
                      {pip.count}
                    </text>
                  </g>
                );
              }
              // weakened
              return (
                <g key={`u-${hexId}-${pip.house}-${pip.readiness}`}>
                  <rect
                    x={cx - rr * 0.13}
                    y={cy - rr * 0.22}
                    width={rr * 0.26}
                    height={rr * 0.44}
                    rx={rr * 0.06}
                    fill={houseColor}
                    stroke="#f97316"
                    strokeWidth={2}
                    strokeDasharray="3,2"
                    opacity={0.7}
                  />
                  <text
                    x={cx}
                    y={cy + rr * 0.06}
                    fontFamily="Cinzel, serif"
                    fontSize={rr * 0.22}
                    fontWeight={900}
                    fill="#f97316"
                    textAnchor="middle"
                  >
                    {pip.count}
                  </text>
                </g>
              );
            });
          })}
        </g>
      </svg>
    </div>
  );
}
