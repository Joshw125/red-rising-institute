# Resource Economy

> **NOTE:** As of v4.0, the game uses a **Food-only economy**. Tech and Intel have been removed. This file has been rewritten to reflect the single-resource system. For historical context on the old 3-resource system, see [DESIGN_HISTORY.md](../docs/DESIGN_HISTORY.md).

## Food — The Only Resource

| Resource | Symbol | Uses |
|----------|--------|------|
| **Food** | 🌾 | Sustain forces, recruit units, build fortifications |

Food is tracked on each player's board (0–12 scale).

---

## CRITICAL DESIGN RULE: Per-Hex Generation

**Resources generate per controlled HEX, not per unit.**

This was a deliberate design decision after discovering that per-unit generation causes:
- Unmanageable economic scaling (15 units × resources = uncapped income)
- Snowballing leaders who already have more units
- Resource tracking becoming a full-time job

**Per-hex generation:** Each Fertile hex produces 1 Food per Gatherer per round. Maximum 1 Gatherer per hex.

---

## Hex Types

| Hex Type | Production | Count | Visual |
|----------|-----------|-------|--------|
| **Fertile** | 1 Food per Gatherer | 54 | Full color |
| **Barren** | Nothing | 26 | Faded color |
| **Castle** | 1 Food per Gatherer (+ strategic value) | 10 | Castle icon |

**Total:** 54 Fertile + 26 Barren + 10 Castles = 90 hexes

### Regional Food Density

| Region | Fertile | Barren | Density |
|--------|---------|--------|---------|
| North Woods | 9 | 0 | Very High |
| Greatwoods | 14 | 3 | High |
| Argos River | 8 | 1 | High |
| South Sea Coast | 7 | 1 | High |
| Southern Reaches | 8 | 2 | Moderate |
| Postern Hills | 3 | 2 | Moderate |
| Highlands | 3 | 6 | Low |
| Mountains | 2 | 11 | Very Low |

---

## Gathering Food (Order)

**Cost:** 1 order (the unit's order for this turn). Unit goes **At Ease**.
**Requirements:**
- Unit must be in a **Fertile hex or Castle**
- **Maximum 1 Gatherer per hex** — additional units can defend but don't produce extra
- Barren hexes produce nothing — you cannot Gather there

**Gain:** 1 Food

### Food Collection (End of Round)

At the end of each round, each Gatherer (At Ease unit assigned to gather) produces 1 Food from their hex. This is collected during the End of Round phase.

**Contested hexes** (multiple players with units) produce nothing — must resolve control first.

---

## Food Usage

| Action | Cost |
|--------|------|
| Recruit new unit | 3 Food |
| Build fortification (at Castle) | 4 Food |
| Starvation upkeep (per unit per round) | Varies by Act |

### Starvation

Each round, players must feed their army:
- **Act I (Rounds 1-4):** 1 Food per 3 units
- **Act II (Rounds 5-8):** 1 Food per 2 units
- **Act III (Rounds 9-12):** 1 Food per unit

Units that can't be fed are **Weakened** (subdued). Starvation is the game's clock — it forces action and punishes passive play.

---

## Recruiting New Units

**Cost:** 3 Food
**Location:** Any hex where you have units
**Result:** Add 1 Regular unit from your supply to that hex. Unit starts At Ease.
**Limit:** Cannot exceed 15 total units (board + Reserve Track combined)

Recruitment is the primary use of Food mid-to-late game. Early game, Food goes to sustaining forces; mid-game players pivot to recruitment or fortification.

---

## Economy Balance Targets

### Design Goals
- Players should have 2–3 meaningful Food decisions per turn
- No player should be Food-starved to the point of paralysis
- No player should have so much Food they stop caring about gathering
- Food pressure escalates through Acts (starvation costs increase)

### Target Food Ranges

| Food Stockpile | Situation |
|---------------|-----------|
| 0–1 | Desperate — starvation imminent, must gather or raid |
| 2–4 | Tight — making hard choices between feeding and building |
| 5–7 | Healthy — can sustain and invest |
| 8+ | Surplus — should be spending on recruitment or fortification |

### Why Food-Only?

The game previously used three resources (Food, Tech, Intel). This was simplified because:
- **Tech was thematically wrong** — the Institute is a primitive survival competition, not a technology race
- **Intel as a currency was artificial** — information should come from positioning (passive scouting), not stockpiling tokens
- **Single-resource games in this genre work better** — Kemet (Prayer Points), Blood Rage (Rage), and Inis all prove that aggressive territory control games thrive with 0–1 resources
- **Food creates the purest tension** — every Food spent on fortification is Food you can't eat. Every unit recruited is another mouth to feed.

---

## Map Design — Food Scarcity Creates Conflict

The map is designed so that:
- **Fertile hexes cluster in forests and river valleys** — creating high-value contested territory
- **Barren hexes dominate mountains and highlands** — creating defensive but economically poor strongpoints
- **No House has unlimited food access** — even food-rich Diana must defend a sprawling territory
- **Expansion is mandatory** — every House must push beyond their starting zone to sustain their army through Act III

This forces conflict. You can't turtle in a corner and out-gather your opponents — starvation pressure ensures you must fight for Fertile territory.

---

*Updated: 2026-03-15 — v4.0 Food-only economy. Tech and Intel removed.*
