# Playtesting Guide

> Updated for v3.0 — Deterministic combat, Tactics Cards, passive scouting, Player Boards, no dice.

---

## Testing Priorities

### Phase 1: 2-Player Core (Start Here)
**Setup:** Mars vs. Diana (most contrasting playstyles — aggression vs. stealth)
**Duration:** Shortened variant (6 rounds, Acts I + half of II)
**Board:** Full board, but focus on hexes both Houses naturally contest

**What to test:**
- Does hidden movement (Reserve Track) feel tense and interesting?
- Does deterministic combat feel satisfying? Enough surprise from Tactics Cards?
- Does the free-move + 1-order-per-unit system flow smoothly?
- Does the resource economy work? Is starvation pressure felt by Round 3-4?
- Does passive scouting create genuine tension around Reserve Track deployment?
- Does the forest combat bonus (+1 At Ease in forests) feel right for Diana's territory?

**Success criteria:**
- Both players engaged every turn (no "waiting for your turn" moments)
- Meaningful decisions every order
- No rules confusion requiring >30 second resolution
- At least 1 Deployment Strike attempted (testing the core offensive mechanic)

---

### Phase 2: 4-Player Balance
**Setup:** Mars, Minerva, Apollo, Diana (all four base Houses)
**Duration:** Full 12 rounds

**What to test:**
- Does passive scouting hold up with multiple players maintaining Alert perimeters?
- Are combat outcomes changing the lead frequently?
- Do Player Board abilities interact in interesting ways?
- Does anyone get eliminated-feeling (can't do anything meaningful)?
- Are Tactics Cards earned and played at a good rate?
- Do Proctor Cards create interesting moments without feeling arbitrary?

**Success criteria:**
- Lead changes at least 3 times
- All players competitive entering Round 9
- Dramatic moments ("did you see what just happened?") at least once per round
- Each House feels mechanically distinct

---

### Phase 3: Extended Testing
**Setup:** Vary House matchups, try 2-player and 3-player configurations
**Duration:** Full games

**What to test:**
- Turn length (target: under 3 minutes per player per round)
- Does the map feel appropriately contested?
- Are free-form alliances forming and breaking?
- Is there a runaway leader problem?
- Do Desperate Gambits create memorable moments?
- Does the starvation curve in Act III produce the right amount of desperation?

---

## Metrics to Track Each Session

For every playtest, record:

| Metric | How to Track |
|--------|-------------|
| Turn length | Phone timer per player per round |
| Most used orders | Tally marks per order type (Gather, Attack, Move Again, Hold, Rally, etc.) |
| Tactics Cards played | Count per player per game |
| Tactics Cards earned (source) | Track: combat wins, castle captures, Discovery Sites, Proctor cards |
| Least used mechanics | Note anything that never comes up |
| Reserve Track utilization | How many withdrawals per player per game |
| Reserve Track deployment range | Count Space 1 vs. Space 2 vs. Space 3 deployments |
| Deployment Strikes | Count successful strikes (deployed onto At Ease defenders) |
| Passive scouting blocks | Count times an Alert unit blocked a Reserve Track deployment |
| Combat frequency | Combats per round |
| Average combat margin | Typical margin of victory (1-2? 3-4? 5+?) |
| Resource bottlenecks | Note if any player is stuck at 0 of a resource for 2+ rounds |
| Starvation events | Count Weakened units per round (especially Act III) |
| Objective completion rate | Did the drawn objective feel achievable? |

---

## Post-Game Questions (Ask Players)

1. **What was your most exciting moment?** (Identifies what's working)
2. **What was your most frustrating moment?** (Identifies pain points)
3. **Did you ever feel like you had no good options?** (Economy/order balance)
4. **Did the hidden movement feel like it mattered?** (Reserve Track evaluation)
5. **Did deterministic combat feel good? Too predictable?** (Combat satisfaction)
6. **Did Tactics Cards add enough surprise?** (Uncertainty evaluation)
7. **Did passive scouting feel meaningful?** (Information warfare check)
8. **Would you use a different House next time?** (Asymmetry appeal)
9. **What rule confused you the most?** (Rulebook clarity)
10. **Did the game feel like Red Rising?** (Thematic authenticity check)

---

## Red Flags (Stop and Fix These)

Stop the playtest and address immediately if:
- Any player is completely unable to affect the game state (unplayable position)
- A single combat takes more than 5 minutes to resolve (counting strength + cards + modifiers)
- Resource tracking requires excessive mental math
- Any single House ability wins the game solo (dominant strategy found)
- Players stop looking at the board and start staring at their phones
- A player is mathematically eliminated before Round 8

---

## Common Rule Misunderstandings to Watch For

1. **Reserve Track range** — "Within 6 hexes" means 6 steps on the hex grid from the Removal Marker's origin, not 6 in a straight line
2. **Passive scouting is passive** — Alert units block Reserve Track deployment within 1 hex automatically. No order needed, no resource cost.
3. **Conversion ratio** — 2:1 margin. Margin of 1-2 = 1 subdue. Need margin of 5-6 to convert (subdue 3, convert with 2 of those)
4. **Ties go to defender** — Easily forgotten. Equal strength = defender wins.
5. **Gathering = At Ease** — Every unit that gathers goes At Ease. Alert units can scout, but they can't produce.
6. **Deploy from Reserve Track = Alert** — ALL Houses deploy Alert. This is universal, not a House bonus.
7. **Forest combat bonus** — At Ease units in Forest/Woods hexes fight at +1 each. This applies to ALL Houses in forests, not just Diana.
8. **Tactics Cards are simultaneous** — Both sides reveal at the same time. No reacting to your opponent's card.
9. **1 Gatherer per hex** — You can have multiple units in a hex, but only 1 can gather.
10. **Starvation before collection** — Pay Food FIRST, then gather. Round 1 starting stock is immediately consumed.

---

## Iteration Process

After each playtest session:
1. List the top 3 problems
2. Hypothesize one rule change per problem
3. Test ONLY those changes in the next session (don't change multiple things at once)
4. Document what changed and why in DESIGN_HISTORY.md

**Resist the urge to overhaul everything at once.** Targeted iteration reveals which changes actually fixed which problems.

---

## Tabletop Simulator Setup Notes

For digital playtesting:
- Hex grid: Use the "Hex Grid" option in TTS board tools
- Hidden information: Use TTS hidden zones for Reserve Track boards and face-down tokens
- Card decks: Load Tactics Cards, Proctor Cards, Objective Cards as custom decks
- Unit colors: Use colored meeples or custom models (standing/laying for readiness)
- Player Boards: Import as custom tiles with scripted buttons for tracking
- Recommended: Start with 2-player digital testing (faster iteration, easier to coordinate)

---

## First Playtest Checklist

Before your first game, verify you have:
- [ ] Printed hex board with numbered hexes and terrain colors
- [ ] 4 sets of unit tokens (15 per House, with distinct Flag-bearers and Special units)
- [ ] 4 Player Boards (printed, ideally laminated for dry-erase tracking)
- [ ] 4 Player Aid cards (turn structure, combat resolution, starvation table)
- [ ] 20 Tactics Cards
- [ ] 10 Act I Proctor Cards (Acts II-III can wait)
- [ ] 16 Objective Cards
- [ ] Resource tokens (at least 30 of each type)
- [ ] Control markers (at least 15 per House)
- [ ] 4 Reserve Track boards + 4 Removal Markers
- [ ] 4 Castle Garrison tokens (face-down, numbered 2-4)
- [ ] Round tracker (paper track 1-12 with marker)
- [ ] Discovery Tokens (at least 6, face-down on Discovery Sites)
- [ ] Rulebook open for reference

---

*Updated: 2026-03-14 — v3.0 systems (deterministic combat, Tactics Cards, Player Boards, passive scouting)*
