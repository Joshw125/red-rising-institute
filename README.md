# Red Rising: The Institute — Game Design Project

A strategic board game for 2–4 players based on Pierce Brown's *Red Rising* series. Players control asymmetric Houses competing in the Institute competition on Mars through hidden movement, deterministic combat, Food economy, and conversion of enemy forces.

---

## Project Structure

```
red-rising-institute/
├── README.md                          ← You are here
├── docs/
│   ├── DESIGN_PHILOSOPHY.md           ← Core vision and principles
│   ├── RULEBOOK.md                    ← Complete rules reference (v3.0)
│   ├── DESIGN_HISTORY.md              ← Key decisions and why
│   ├── VP_SYSTEM.md                   ← Victory point reference
│   ├── FOOD_MATH_VALIDATION.md        ← Starvation math validation
│   └── BALANCE_GUIDE.md               ← Living balance reference
├── mechanics/
│   ├── COMBAT.md                      ← Deterministic combat system
│   ├── TACTICS_CARDS.md               ← 20-card universal Tactics deck
│   ├── READINESS_SYSTEM.md            ← Alert/At Ease + passive scouting
│   ├── RESERVE_TRACK.md               ← Hidden movement system
│   ├── TURN_STRUCTURE.md              ← Unit orders and flow
│   ├── RESOURCE_ECONOMY.md            ← Food-only economy
│   ├── ACT_STRUCTURE.md               ← Three-act escalation
│   ├── PROCTOR_CARDS.md               ← 30 Proctor event cards
│   ├── OBJECTIVE_CARDS.md             ← 16 secret objective cards
│   ├── EQUIPMENT_CARDS.md             ← 12 discoverable equipment cards
│   ├── DISCOVERY_TOKENS.md            ← 20 exploration tokens
│   └── DESPERATE_GAMBITS.md           ← High-risk comeback actions
├── houses/
│   ├── HOUSE_OVERVIEW.md              ← All Houses at a glance
│   ├── HOUSE_MARS.md                  ← Mars — The Wolves
│   ├── HOUSE_MINERVA.md               ← Minerva — The Owls
│   ├── HOUSE_APOLLO.md                ← Apollo — The Suns
│   └── HOUSE_DIANA_CERES_JUPITER.md   ← Diana, Ceres, Jupiter
├── map/
│   ├── MAP_OVERVIEW.md                ← 90-hex map overview
│   ├── HEX_ASSIGNMENTS.md             ← All 90 hexes with data
│   └── institute_map.html             ← Interactive SVG map
├── reference/
│   ├── COMPONENT_LIST.md              ← Everything needed to build
│   └── PLAYTESTING_GUIDE.md           ← How to test and what to track
└── memory/
    └── MEMORY.md                      ← Project memory (Claude sessions)
```

---

## Current Status

| Phase | Status |
|-------|--------|
| Core mechanics design | ✅ Complete (v4.0) |
| House abilities (4 base + 2 expansion) | ✅ Complete |
| Deterministic combat + Tactics Cards | ✅ Complete |
| Proctor cards (30) | ✅ Complete |
| Objective cards (16) | ✅ Complete |
| Discovery tokens (20) | ✅ Complete |
| Equipment cards (12) | ✅ Complete |
| Hex map (90 hexes, 8 regions) | ✅ Complete |
| Rulebook (v3.0) | ✅ Complete |
| Physical prototype | ⬜ Not started |
| Digital prototype (TTS) | ⬜ Not started |
| 2-player playtesting | ⬜ Not started |
| Full 4-player playtesting | ⬜ Not started |

---

## Quick Design Summary

- **Players:** 2–4 (base game). Ceres & Jupiter are expansion Houses.
- **Duration:** 90–120 minutes
- **Core Loop:** Each unit gets 1 free move + 1 order per turn. Army size IS your action budget.
- **Economy:** Food-only. Hexes are Fertile (produce Food) or Barren (nothing). Starvation pressure escalates across 3 Acts.
- **Combat:** Deterministic (no dice). Count Alert units, add modifiers, compare. Tactics Cards are the only source of uncertainty.
- **Win Conditions:** Flag capture, castle control (VP), combat victories, secret objectives.
- **Key Innovation:** Reserve Track hidden movement + passive scouting (Alert units block deployment)

---

## Claude Code Usage Notes

When building on this project:
- Read `memory/MEMORY.md` first — it tracks all design decisions and file status
- All mechanics are in `/mechanics/` — start with COMBAT.md and TURN_STRUCTURE.md
- House asymmetry is critical — each House plays very differently (Player Board format)
- **Never introduce non-canonical Red Rising technology** (strict thematic constraint)
- Combat = conversion/subduing, never elimination
- Food generation is **per-hex**, never per-unit (prevents snowballing)
- The Reserve Track solves hidden movement without bookkeeping — preserve this system
- **Food is the only resource** — no Tech, no Intel. Hexes are Fertile or Barren.

---

*Updated: 2026-03-15 — v4.0 Food-only economy*
