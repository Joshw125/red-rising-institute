// Deterministic combat resolution for Red Rising: The Institute.
// Pure preview function + Immer-friendly applier.

import type { GameState, Unit, HouseId } from '../types';
import { HEX_BY_ID } from '../data/hexes';
import { defOf } from '../data/tactics';
import { retreatUnitsToRT, recallFromRT } from './reserve';
import { NEIGHBORS } from './adjacency';

export interface CombatModifier {
  name: string;
  value: number;
}

export interface CombatSide {
  house: HouseId;
  unitIds: string[];
  alertCount: number;
  atEaseCount: number;
  baseStrength: number;
  modifiers: CombatModifier[];
  total: number;
  isGarrison?: boolean;
  garrisonStrength?: number;
}

export interface CombatResult {
  attacker: CombatSide;
  defender: CombatSide;
  hexId: number;
  margin: number;
  winner: 'attacker' | 'defender';
  subdues: number;
  // Card effect flags per side
  attackerCardFlags?: CardEffectFlags;
  defenderCardFlags?: CardEffectFlags;
  // What actually happened — populated by applyAttack
  appliedSubdues?: { unitId: string; from: HouseId }[];
  appliedConversions?: { unitId: string; from: HouseId; to: HouseId }[];
  flagCaptured?: { unitId: string; from: HouseId; capturedBy: HouseId };
  dianaHunt?: { attackerUnitIds: string[]; fromHexId: number };
}

function isForestRegion(region: string) {
  return region === 'Greatwoods' || region === 'North Woods';
}

function strengthOfSide(
  state: GameState,
  units: Unit[],
  isAttacker: boolean,
  hexId: number,
  enemyCount: number
): CombatSide {
  if (units.length === 0) {
    return {
      house: 'Mars',
      unitIds: [],
      alertCount: 0,
      atEaseCount: 0,
      baseStrength: 0,
      modifiers: [],
      total: 0,
    };
  }
  const house = units[0].house;
  const hex = HEX_BY_ID[hexId];
  const isForest = hex ? isForestRegion(hex.region) : false;
  const isMountain = hex?.region === 'Mountains';
  const isFortified = state.fortifications.includes(hexId);

  // Attackers always count as Alert (they're moving in to fight)
  const alertCount = isAttacker
    ? units.length
    : units.filter((u) => u.readiness === 'alert').length;
  const atEaseCount = isAttacker
    ? 0
    : units.filter((u) => u.readiness === 'at-ease').length;

  const modifiers: CombatModifier[] = [];
  let base = alertCount;

  // Defender-only terrain bonuses (forest cover REMOVED — forest is now a
  // deployment-stealth zone, not a combat defense zone).
  if (!isAttacker) {
    if (isMountain) modifiers.push({ name: 'Mountain defense', value: 1 });
    if (isFortified) modifiers.push({ name: 'Fortification', value: 2 });
    if (house === 'Minerva' && atEaseCount > 0) {
      modifiers.push({
        name: 'Prepared Positions (At Ease as Alert)',
        value: atEaseCount,
      });
    }
  }
  // `isForest` retained for context but has no combat effect now.
  void isForest;

  // Mars Howler — special unit counts as 2 (so +1 extra) when contributing
  for (const u of units) {
    if (u.house !== 'Mars' || u.kind !== 'special') continue;
    const contributes = isAttacker || u.readiness === 'alert';
    if (contributes) modifiers.push({ name: 'Howler (counts as 2)', value: 1 });
  }

  // Apollo Archer — special unit in an ADJACENT hex (Alert) supports this combat with +1.
  // Archer doesn't enter the fight; just provides ranged support.
  if (units.length > 0) {
    const supportingArcher = Object.values(state.units).find((u) => {
      if (u.house !== house) return false;
      if (house !== 'Apollo') return false;
      if (u.kind !== 'special') return false;
      if (u.hexId == null) return false;
      if (u.readiness !== 'alert') return false;
      // The archer must NOT already be in the combat hex.
      if (u.hexId === hexId) return false;
      const neighbors = NEIGHBORS[hexId] ?? [];
      return neighbors.includes(u.hexId);
    });
    if (supportingArcher) {
      modifiers.push({ name: 'Archer (adjacent support)', value: 1 });
    }
  }

  // Mars Red Rage — outnumbered
  if (house === 'Mars' && units.length < enemyCount) {
    modifiers.push({ name: 'Red Rage (outnumbered)', value: 1 });
  }

  const total = base + modifiers.reduce((a, m) => a + m.value, 0);

  return {
    house,
    unitIds: units.map((u) => u.id),
    alertCount,
    atEaseCount,
    baseStrength: base,
    modifiers,
    total,
  };
}

// Per-side card effect flags. The combat aftermath logic reads these after
// determining winner: the loser's flags can fire feignedRetreat / lastWords,
// the winner's flags can fire breakTheirWill / noQuarter (1:1 conversion).
export interface CardEffectFlags {
  feignedRetreat?: boolean;
  noQuarter?: boolean;
  breakTheirWill?: boolean;
  lastWords?: boolean;
}

// Apply a Tactics Card's effect to a CombatSide. Mutates `side` (or `opp`).
// Some effects produce flags consumed by the resolution layer.
function applyTacticsCard(
  side: CombatSide,
  opp: CombatSide,
  cardInstanceId: string,
  hexRegion: string | undefined,
  flags: CardEffectFlags
): boolean {
  const def = defOf(cardInstanceId);
  if (!def) return false;
  const baseId = cardInstanceId.split('#')[0];

  switch (baseId) {
    case 'flanking':
      side.modifiers.push({ name: 'Flanking Maneuver', value: 2 });
      side.total += 2;
      return true;
    case 'high-ground': {
      const isHighland = hexRegion === 'Highlands' || hexRegion === 'Mountains';
      const v = isHighland ? 3 : 2;
      side.modifiers.push({ name: `High Ground${isHighland ? ' (high terrain)' : ''}`, value: v });
      side.total += v;
      return true;
    }
    case 'overwhelming':
      side.modifiers.push({ name: 'Overwhelming Force', value: 3 });
      side.total += 3;
      return true;
    case 'coordinated': {
      const v = side.alertCount;
      side.modifiers.push({ name: `Coordinated Assault (×${v} Alert)`, value: v });
      side.total += v;
      return true;
    }
    case 'desperate': {
      const oppCount = opp.unitIds.length || (opp.isGarrison ? (opp.garrisonStrength ?? 0) : 0);
      const myCount = side.unitIds.length;
      const diff = Math.max(0, oppCount - myCount);
      side.modifiers.push({ name: `Desperate Stand (+${diff})`, value: diff });
      side.total += diff;
      return true;
    }
    case 'snap-attention': {
      // At Ease units fight as Alert
      const v = side.atEaseCount;
      side.modifiers.push({ name: `Snap to Attention (At Ease as Alert +${v})`, value: v });
      side.total += v;
      return true;
    }
    case 'caught-off-guard': {
      // Opponent's Alert units count as At Ease (subtract their alert contribution)
      const v = opp.alertCount;
      opp.modifiers.push({ name: `Caught Off Guard (Alert as At Ease −${v})`, value: -v });
      opp.total -= v;
      return true;
    }
    case 'scorched-earth': {
      // Remove all terrain modifiers from opponent
      const terrainNames = ['Forest cover', 'Mountain', 'Fortification', 'Prepared Positions'];
      let neg = 0;
      opp.modifiers = opp.modifiers.filter((m) => {
        if (terrainNames.some((t) => m.name.startsWith(t))) {
          neg += m.value;
          return false;
        }
        return true;
      });
      opp.total -= neg;
      side.modifiers.push({ name: `Scorched Earth (negated terrain)`, value: 0 });
      return true;
    }
    case 'dig-in':
      side.modifiers.push({ name: 'Dig In (+2 fortification)', value: 2 });
      side.total += 2;
      return true;
    case 'reaper': {
      const hadHowler = side.modifiers.some((m) => m.name.includes('Howler'));
      const v = hadHowler ? 3 : 4;
      side.modifiers.push({ name: `The Reaper (Special as 4)`, value: v });
      side.total += v;
      return true;
    }
    case 'feigned-retreat':
      flags.feignedRetreat = true;
      side.modifiers.push({ name: 'Feigned Retreat (no subdues if you lose)', value: 0 });
      return true;
    case 'no-quarter':
      flags.noQuarter = true;
      side.modifiers.push({ name: 'No Quarter (1:1 conversion if you win)', value: 0 });
      return true;
    case 'break-will':
      flags.breakTheirWill = true;
      side.modifiers.push({ name: 'Break Their Will (1:1 conversion if you win)', value: 0 });
      return true;
    case 'last-words':
      flags.lastWords = true;
      side.modifiers.push({ name: 'Last Words (1 enemy retreats if you lose)', value: 0 });
      return true;
    case 'forced-march':
      side.modifiers.push({ name: 'Forced March (+2 adjacent units)', value: 2 });
      side.total += 2;
      return true;
    default:
      return false;
  }
}

export function previewCombatWithCards(
  state: GameState,
  attackerUnitIds: string[],
  defenderHexId: number,
  attackerCardId: string | null,
  defenderCardId: string | null
): CombatResult | null {
  const result = previewCombat(state, attackerUnitIds, defenderHexId);
  if (!result) return null;
  const hex = HEX_BY_ID[defenderHexId];
  const attackerFlags: CardEffectFlags = {};
  const defenderFlags: CardEffectFlags = {};

  const aIsShield = attackerCardId?.startsWith('shield-wall');
  const dIsShield = defenderCardId?.startsWith('shield-wall');
  if (aIsShield) {
    result.attacker.modifiers.push({ name: 'Shield Wall (negates opponent)', value: 0 });
  }
  if (dIsShield) {
    result.defender.modifiers.push({ name: 'Shield Wall (negates opponent)', value: 0 });
  }

  if (attackerCardId && !aIsShield && !dIsShield) {
    applyTacticsCard(result.attacker, result.defender, attackerCardId, hex?.region, attackerFlags);
  }
  if (defenderCardId && !dIsShield && !aIsShield) {
    applyTacticsCard(result.defender, result.attacker, defenderCardId, hex?.region, defenderFlags);
  }
  result.attackerCardFlags = attackerFlags;
  result.defenderCardFlags = defenderFlags;

  const winner: 'attacker' | 'defender' =
    result.attacker.total > result.defender.total ? 'attacker' : 'defender';
  const margin = Math.abs(result.attacker.total - result.defender.total);
  let subdues = 0;
  if (margin >= 7) subdues = 4;
  else if (margin >= 5) subdues = 3;
  else if (margin >= 3) subdues = 2;
  else if (margin >= 1) subdues = 1;
  return { ...result, winner, margin, subdues };
}

// Backwards-compat helper for any callers passing only the attacker card.
export function previewCombatWithCard(
  state: GameState,
  attackerUnitIds: string[],
  defenderHexId: number,
  attackerCardId: string | null
): CombatResult | null {
  return previewCombatWithCards(state, attackerUnitIds, defenderHexId, attackerCardId, null);
}

export function previewCombat(
  state: GameState,
  attackerUnitIds: string[],
  defenderHexId: number
): CombatResult | null {
  const attackerUnits = attackerUnitIds
    .map((id) => state.units[id])
    .filter(Boolean) as Unit[];
  if (attackerUnits.length === 0) return null;
  const attackerHouse = attackerUnits[0].house;
  const defenderUnits = Object.values(state.units).filter(
    (u) => u.hexId === defenderHexId && u.house !== attackerHouse
  );

  const garrisonStrength = state.garrisons[defenderHexId] ?? 0;
  if (defenderUnits.length === 0 && garrisonStrength > 0) {
    return previewGarrisonCombat(state, attackerUnits, defenderHexId, garrisonStrength);
  }

  if (defenderUnits.length === 0) return null;

  const attacker = strengthOfSide(
    state,
    attackerUnits,
    true,
    defenderHexId,
    defenderUnits.length
  );
  const defender = strengthOfSide(
    state,
    defenderUnits,
    false,
    defenderHexId,
    attackerUnits.length
  );

  // Higher wins, ties to defender — UNLESS Mars attacking outnumbered (Red Rage tie-break).
  const marsOutnumberedAttack =
    attacker.house === 'Mars' && attackerUnits.length < defenderUnits.length;
  const winner: 'attacker' | 'defender' =
    attacker.total > defender.total
      ? 'attacker'
      : attacker.total === defender.total && marsOutnumberedAttack
        ? 'attacker'
        : 'defender';
  const margin = Math.abs(attacker.total - defender.total);

  let subdues = 0;
  if (margin >= 7) subdues = 4;
  else if (margin >= 5) subdues = 3;
  else if (margin >= 3) subdues = 2;
  else if (margin >= 1) subdues = 1;
  else subdues = 0; // perfect tie — defender holds, no subdues

  return { attacker, defender, hexId: defenderHexId, margin, winner, subdues };
}

function previewGarrisonCombat(
  state: GameState,
  attackerUnits: Unit[],
  defenderHexId: number,
  garrisonStrength: number
): CombatResult {
  const attacker = strengthOfSide(state, attackerUnits, true, defenderHexId, garrisonStrength);

  // Garrison: fights as Alert at hidden strength, plus +2 fortification.
  const garrisonModifiers: CombatModifier[] = [
    { name: 'Fortification', value: 2 },
  ];
  const defender: CombatSide = {
    house: 'Mars', // placeholder; UI checks isGarrison flag
    unitIds: [],
    alertCount: garrisonStrength,
    atEaseCount: 0,
    baseStrength: garrisonStrength,
    modifiers: garrisonModifiers,
    total: garrisonStrength + 2,
    isGarrison: true,
    garrisonStrength,
  };

  const winner: 'attacker' | 'defender' =
    attacker.total > defender.total ? 'attacker' : 'defender';
  const margin = Math.abs(attacker.total - defender.total);
  let subdues = 0;
  if (margin >= 7) subdues = 4;
  else if (margin >= 5) subdues = 3;
  else if (margin >= 3) subdues = 2;
  else if (margin >= 1) subdues = 1;

  return {
    attacker,
    defender,
    hexId: defenderHexId,
    margin,
    winner,
    subdues,
  };
}

// Picks loser units to subdue, highest-priority first.
// Priority: Alert > At Ease, special > regular > flag-bearer (flag last so it's protected).
function pickSubdueOrder(units: Unit[]): Unit[] {
  return [...units].sort((a, b) => {
    // flag-bearer last
    if (a.kind === 'flag-bearer' && b.kind !== 'flag-bearer') return 1;
    if (b.kind === 'flag-bearer' && a.kind !== 'flag-bearer') return -1;
    // special first (more valuable to take down or convert)
    if (a.kind === 'special' && b.kind !== 'special') return -1;
    if (b.kind === 'special' && a.kind !== 'special') return 1;
    // alert before at-ease (Alert is the actual threat)
    const aRank = a.readiness === 'alert' ? 0 : a.readiness === 'at-ease' ? 1 : 2;
    const bRank = b.readiness === 'alert' ? 0 : b.readiness === 'at-ease' ? 1 : 2;
    return aRank - bRank;
  });
}

// Resolves combat. Mutates `draft` in place.
// `autoConvert`: if true, greedily uses 2-subdues→1-conversion on non-flag units.
// `attackerCardId`: optional Tactics Card instance to play for attacker.
export function applyAttack(
  draft: GameState,
  attackerUnitIds: string[],
  defenderHexId: number,
  options: {
    autoConvert: boolean;
    attackerCardId?: string | null;
    defenderCardId?: string | null;
  } = { autoConvert: true }
): CombatResult | null {
  const result = previewCombatWithCards(
    draft,
    attackerUnitIds,
    defenderHexId,
    options.attackerCardId ?? null,
    options.defenderCardId ?? null
  );
  if (!result) return null;

  // Move the played card(s) from the player's hand to the discard pile.
  const discard = (cardId: string | null | undefined, house: HouseId | undefined) => {
    if (!cardId || !house) return;
    const player = draft.players.find((p) => p.house === house);
    if (player) {
      const idx = player.tacticsCards.indexOf(cardId);
      if (idx >= 0) {
        player.tacticsCards.splice(idx, 1);
        draft.tacticsDiscard.push(cardId);
      }
    }
  };
  discard(options.attackerCardId, result.attacker.house);
  const defHouse = result.defender.isGarrison ? undefined : result.defender.house;
  discard(options.defenderCardId, defHouse);

  const { attacker, defender, winner, margin } = result;

  // Move attackers into the target hex; consume their action.
  for (const id of attackerUnitIds) {
    const u = draft.units[id];
    if (!u) continue;
    u.hexId = defenderHexId;
    u.readiness = 'alert';
    u.actedThisTurn = true;
  }

  // Garrison combat — special resolution path.
  if (defender.isGarrison) {
    return applyGarrisonAttack(draft, result, attackerUnitIds, defenderHexId);
  }

  // Track combats won. Tactics cards are NOT drawn from combat (anti-snowball).
  const winnerHouse = winner === 'attacker' ? attacker.house : defender.house;
  const loserHouse = winner === 'attacker' ? defender.house : attacker.house;
  const winnerPlayer = draft.players.find((p) => p.house === winnerHouse);
  if (winnerPlayer) {
    winnerPlayer.combatsWon += 1;
  }

  // ---------------- Combat aftermath (v6.1) ----------------
  // Resolution model:
  //   - "Blows" = result.subdues. floor(blows/2) are conversions; rest don't matter.
  //   - Hit-priority order: alert/special > at-ease > flag-bearer (last).
  //   - Flag-bearer hit by a blow → captured (kept in hex as 'subdued', triggers win check).
  //   - Otherwise: winner takes up to floor(blows/2) conversions. ALL remaining loser
  //     units retreat to the loser's Reserve Track Space 1 (marker on combat hex).
  //   - There is no persistent "subdued in hex" state anymore (except captured flags).
  const appliedSubdues: { unitId: string; from: HouseId }[] = []; // flag captures only
  const appliedConversions: { unitId: string; from: HouseId; to: HouseId }[] = [];

  const loserIds = winner === 'attacker' ? defender.unitIds : attacker.unitIds;
  const loserUnits = loserIds
    .map((id) => draft.units[id])
    .filter((u): u is Unit => !!u);

  if (loserUnits.length > 0) {
    // Card effect lookup: winner/loser flags
    const winnerCardFlags = winner === 'attacker' ? result.attackerCardFlags : result.defenderCardFlags;
    const loserCardFlags = winner === 'attacker' ? result.defenderCardFlags : result.attackerCardFlags;

    const ordered = pickSubdueOrder(loserUnits);
    // Feigned Retreat (loser's card): zero out blows — loser eats no subdues, just retreats clean
    let effectiveBlows = result.subdues;
    if (loserCardFlags?.feignedRetreat) {
      effectiveBlows = 0;
      draft.log.push(`Feigned Retreat: ${loserHouse} escapes without subdues.`);
    }
    const blows = Math.min(effectiveBlows, ordered.length);
    const hitUnits = ordered.slice(0, blows);

    // 15-unit cap on conversions
    const winnerUnitCount = Object.values(draft.units).filter(
      (u) => u.house === winnerHouse
    ).length;
    const conversionRoom = Math.max(0, 15 - winnerUnitCount);
    // Break Their Will / No Quarter (winner's cards): 1:1 conversions instead of 2:1
    const oneToOne = !!(winnerCardFlags?.breakTheirWill || winnerCardFlags?.noQuarter);
    let conversionBudget = options.autoConvert
      ? Math.min(oneToOne ? blows : Math.floor(blows / 2), conversionRoom)
      : 0;
    if (oneToOne && conversionBudget > 0) {
      draft.log.push(
        `${winnerHouse} converts 1:1 (${winnerCardFlags?.breakTheirWill ? 'Break Their Will' : 'No Quarter'}).`
      );
    }

    const convertedIds = new Set<string>();
    const capturedFlagIds = new Set<string>();

    for (const u of hitUnits) {
      if (u.kind === 'flag-bearer') {
        // Flag captured — keep it in the hex as subdued (existing flag-capture logic
        // depends on this state for the instant-win check).
        u.readiness = 'subdued';
        capturedFlagIds.add(u.id);
        appliedSubdues.push({ unitId: u.id, from: u.house });
      } else if (conversionBudget > 0) {
        const from = u.house;
        u.house = winnerHouse;
        u.readiness = 'alert';
        u.actedThisTurn = true;
        appliedConversions.push({ unitId: u.id, from, to: winnerHouse });
        if (winnerPlayer) winnerPlayer.conversions += 1;
        conversionBudget -= 1;
        convertedIds.add(u.id);
      }
      // else: this unit was hit but had no conversion budget — it just retreats with the rest
    }

    // Last Words (loser's card): 1 winner unit retreats to winner's RT — the loser's
    // final blow against the victors. Picked from highest-priority winner units.
    if (loserCardFlags?.lastWords) {
      const winnerUnits = (winner === 'attacker' ? attacker.unitIds : defender.unitIds)
        .map((id) => draft.units[id])
        .filter((u): u is Unit => !!u && u.hexId === defenderHexId && u.kind !== 'flag-bearer');
      const ranked = pickSubdueOrder(winnerUnits);
      const target = ranked[0];
      if (target) {
        retreatUnitsToRT(draft, [target.id], defenderHexId, winnerHouse);
        draft.log.push(`Last Words: ${winnerHouse} ${target.id} retreats — the loser's parting blow.`);
      }
    }

    // All non-converted, non-captured loser units retreat to RT
    const retreatingIds = loserUnits
      .filter((u) => !convertedIds.has(u.id) && !capturedFlagIds.has(u.id))
      .map((u) => u.id);
    if (retreatingIds.length > 0) {
      retreatUnitsToRT(draft, retreatingIds, defenderHexId, loserHouse);
      draft.log.push(
        `${loserHouse} retreats ${retreatingIds.length} unit(s) to Reserve Track (marker @${defenderHexId}).`
      );
    }
  }

  // Mars — Blood Rally: on combat win, recall 1 Mars unit from Reserve Track
  // directly to the combat hex (Alert, acted). Reinforces forward.
  if (winnerHouse === 'Mars') {
    const recalled = recallFromRT(draft, 'Mars', defenderHexId);
    if (recalled) {
      draft.log.push(`Mars — Blood Rally: recalled ${recalled} from Reserve Track to hex ${defenderHexId}.`);
    }
  }

  // Apollo — Healer's Art: after any combat Apollo is in, recall 1 Apollo unit
  // from Reserve Track to the combat hex. Fires on win or loss.
  const apolloIn = [...attacker.unitIds, ...defender.unitIds]
    .map((id) => draft.units[id])
    .some((u) => u?.house === 'Apollo');
  if (apolloIn) {
    const recalled = recallFromRT(draft, 'Apollo', defenderHexId);
    if (recalled) {
      draft.log.push(`Apollo — Healer's Art: recalled ${recalled} from Reserve Track to hex ${defenderHexId}.`);
    }
  }

  // Diana — The Hunt: winning attacker gets free 1-hex follow-up move.
  // Caller (store) detects this via the `dianaHunt` field on the result and
  // opens the post-attack hunt UI.
  // (Marked here in the result; nothing else to do in the engine.)

  // Flag capture: any subdued flag-bearer in this combat is "captured" by the winner.
  let flagCaptured: CombatResult['flagCaptured'];
  for (const sub of appliedSubdues) {
    const u = draft.units[sub.unitId];
    if (u && u.kind === 'flag-bearer') {
      flagCaptured = { unitId: u.id, from: sub.from, capturedBy: winnerHouse };
      draft.log.push(`*** ${winnerHouse} CAPTURED ${sub.from}'s Flag-bearer ***`);
      break;
    }
  }

  // Diana — The Hunt: triggers on ANY combat win (attacker or defender).
  // Surviving Diana units in the combat hex may move 1 hex after winning.
  // (Hunt move targets non-enemy hexes only — chasing routed enemies is fine,
  // but hunt cannot trigger another combat in the same turn.)
  let dianaHunt: CombatResult['dianaHunt'];
  const dianaWon =
    (winner === 'attacker' && attacker.house === 'Diana') ||
    (winner === 'defender' && defender.house === 'Diana');
  if (dianaWon) {
    const survivors = Object.values(draft.units)
      .filter(
        (u) =>
          u.house === 'Diana' &&
          u.hexId === defenderHexId &&
          u.readiness === 'alert'
      )
      .map((u) => u.id);
    if (survivors.length > 0) {
      dianaHunt = { attackerUnitIds: survivors, fromHexId: defenderHexId };
      draft.log.push(`Diana — The Hunt: ${survivors.length} unit(s) may follow up 1 hex.`);
    }
  }

  draft.log.push(
    `Combat @${defenderHexId}: ${attacker.house} ${attacker.total} vs ${defender.house} ${defender.total}` +
      ` — ${winnerHouse} wins by ${margin}.` +
      (appliedSubdues.length ? ` ${appliedSubdues.length} subdued.` : '') +
      (appliedConversions.length ? ` ${appliedConversions.length} converted.` : '') +
      (result.subdues === 0 ? ' Tie — defender holds.' : '')
  );

  return { ...result, appliedSubdues, appliedConversions, flagCaptured, dianaHunt };
}

// Draw `n` Tactics Cards from the deck into `house`'s hand.
function drawTacticsCards(draft: GameState, house: HouseId, n: number): void {
  const player = draft.players.find((p) => p.house === house);
  if (!player) return;
  for (let i = 0; i < n; i++) {
    if (draft.tacticsDeck.length === 0) {
      draft.log.push(`Tactics deck exhausted — no card drawn.`);
      break;
    }
    const card = draft.tacticsDeck.shift();
    if (card) {
      player.tacticsCards.push(card);
      draft.log.push(`${house} drew a Tactics Card.`);
    }
  }
}

function applyGarrisonAttack(
  draft: GameState,
  result: CombatResult,
  attackerUnitIds: string[],
  defenderHexId: number
): CombatResult {
  const { attacker, winner, subdues } = result;
  const winnerIsAttacker = winner === 'attacker';

  if (winnerIsAttacker) {
    // Subdue the garrison count by the subdue amount.
    const before = draft.garrisons[defenderHexId] ?? 0;
    const newStrength = Math.max(0, before - subdues);
    if (newStrength === 0) {
      delete draft.garrisons[defenderHexId];
    } else {
      draft.garrisons[defenderHexId] = newStrength;
    }
    draft.log.push(
      `Garrison @${defenderHexId}: ${attacker.house} defeats ${subdues} of ${before} garrison units.`
    );

    // Award combats won and draw 1 Tactics Card.
    const player = draft.players.find((p) => p.house === attacker.house);
    if (player) {
      player.combatsWon += 1;
      drawTacticsCards(draft, attacker.house, 1);
    }

    if (newStrength === 0) {
      // Garrison fully defeated. If attacker has Flag-bearer present in hex, claim castle.
      const attackerUnits = attackerUnitIds
        .map((id) => draft.units[id])
        .filter(Boolean) as Unit[];
      const hasFlag = attackerUnits.some((u) => u.kind === 'flag-bearer');
      if (hasFlag) {
        draft.log.push(`*** ${attacker.house} CLAIMS castle @${defenderHexId}! ***`);
        // Reward: 5 VP capture event (banked permanently)
      const captor = draft.players.find((p) => p.house === attacker.house);
      if (captor) captor.vp += 5;
      draft.log.push(`*** ${attacker.house} CAPTURES the castle! +5 VP banked. ***`);
      // Reward: troops equal to garrison strength (2-4 join you).
        const reward = before;
        for (let i = 0; i < reward; i++) {
          const id = `${attacker.house}-captured-${Date.now()}-${i}`;
          draft.units[id] = {
            id,
            house: attacker.house,
            kind: 'regular',
            readiness: 'alert',
            hexId: defenderHexId,
            actedThisTurn: true,
          };
        }
        draft.log.push(`${reward} captured troops join ${attacker.house} forces.`);
        // 2 Tactics Cards on capture.
        drawTacticsCards(draft, attacker.house, 2);
        // Castle becomes pre-fortified for new owner.
        if (!draft.fortifications.includes(defenderHexId)) {
          draft.fortifications.push(defenderHexId);
          draft.log.push(`${attacker.house} gains pre-fortified castle (+2 def).`);
        }
        // 5 VP capture event (one-time).
        const player = draft.players.find((p) => p.house === attacker.house);
        if (player) {
          player.vp += 5;
          draft.log.push(`${attacker.house} earns 5 VP for the capture.`);
        }
      } else {
        draft.log.push(
          `Garrison defeated but no Flag-bearer present — castle remains neutral (no garrison).`
        );
      }
    }
  } else {
    // Attacker lost or tied — apply subdues to attackers
    const attackerUnits = attackerUnitIds
      .map((id) => draft.units[id])
      .filter(Boolean) as Unit[];
    let budget = Math.min(subdues, attackerUnits.length);
    const ordered = pickSubdueOrder(attackerUnits);
    for (const u of ordered) {
      if (budget <= 0) break;
      u.readiness = 'subdued';
      budget -= 1;
    }
    draft.log.push(
      `Garrison @${defenderHexId}: garrison holds. ${subdues} attacker(s) subdued.`
    );
    // Award combats won to "garrison" — track as no winner; skip player counter.
  }

  return { ...result };
}
