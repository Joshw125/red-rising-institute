# Design History — Key Decisions

This document records *why* we made major design decisions, so future Claude Code sessions don't re-litigate settled questions.

---

## Decision Log

### 1. Tracking Sheets → Reserve Track
**Problem:** Traditional hidden movement tracking sheets (pencil/paper notation of unit positions) created bookkeeping nightmares — errors, time lost cross-referencing, potential for cheating, frustrating mid-game verification challenges.

**Solution:** The Reserve Track system. A physical board where units are placed face-down and advance through numbered spaces. Position on the track (which space, how long marching) is public information — the *destination* remains secret.

**Why it works:**
- No pen/paper
- Physical, tangible, visible tension
- Preserves strategic secrecy without bookkeeping
- Creates "Reserve Track threat radius" that opponents must respond to without knowing destination

**Status: Finalized. Do not revert to tracking sheets.**

---

### 2. Per-Unit → Per-Hex Resource Generation
**Problem:** Per-unit resource generation (each unit generates resources from its zone) caused:
- Unmanageable math (15 units × 3 resource types = tracking nightmare)
- Snowballing (leaders with more units generate more resources, pull further ahead)
- Incentivized stacking all units in one zone (resource optimization > strategic positioning)

**Solution:** Resources generate per controlled hex, not per unit. One unit in a zone = full resource production. Fifty units in a zone = same resource production.

**Why it works:**
- Flat economy, no snowballing
- Encourages territorial spread (more hexes = more resources)
- Simple to track

**Status: Finalized. Per-unit generation is permanently rejected.**

---

### 3. Deck-Building → Pure Action System → Player Boards
**Decision:** The game does not use deck-building or per-House card decks. Originally, Houses had fixed 15-card ability decks (draw 3 hand size). In v3.0, these were replaced entirely by Player Boards (see Decision 20).

**Why rejected:**
- Deck-building adds a layer of game-within-the-game complexity
- Competes with hidden movement for cognitive focus
- Can create random power spikes that undermine strategic play
- Not thematically grounded in the Institute competition
- Even fixed 15-card decks added too much component overhead and hand management

**Preserved possibility:** A deck-building variant was noted as interesting for future consideration. This is a possible future expansion mode, not base game.

**Status: Player Boards are the final system. See Decision 20.**

---

### 4. Investigation System Design → Passive Scouting
**Problem:** The Reserve Track needed counterplay that didn't just nullify the hidden movement advantage. Pure "reveal all positions" scouting was too binary.

**Iterations:**
- v1: Intel spending reveals zone location (too complete)
- v2: Intel forces direction declaration (too abstract)
- v3: Breadcrumb waypoint trail — Intel forces waypoint placement, chains narrow the cone
- v4 (current): **Passive scouting** — Alert units automatically block Reserve Track deployment within 1 hex. No orders, no Intel cost, no waypoints.

**Why v4 replaced v3:**
- Waypoints added significant bookkeeping (24 waypoint discs, placement rules, erasure tracking)
- Intel-based investigation created a complex mini-game that distracted from the core military strategy
- Passive scouting is *free* in terms of actions/resources but *expensive* in opportunity cost (Alert units can't gather)
- The economy-vs-defense tension (Alert = safe but unproductive, At Ease = productive but vulnerable) IS the scouting system

**Status: ~~Finalized.~~ SUPERSEDED by Decision 21 (Passive Scouting). See Decision 21 for full rationale.**

---

### 5. Thematic Constraint: No Killing
**Decision:** Units cannot be eliminated from the game. Only subduing (temporarily incapacitated) and conversion (joining your forces) are valid combat outcomes.

**Rationale:** The Institute's purpose is to train soldiers, not slaughter them. Canonically, Houses subdue and take slaves/converts. Elimination mechanics would undermine the comeback potential central to the "beautiful chaos" vision.

**Mechanical benefit:** Eliminated players are not fun. Conversion means your worst defeat might become your enemy's problem next turn.

**Status: Non-negotiable. No elimination mechanics ever.**

---

### 6. Diana's Stealth Identity (Moonlight Veil)
**Decision:** House Diana's Moonlight Veil passive makes units in Forest hexes invisible to all scouting. With the shift to passive scouting (v3.0), this means Alert units adjacent to Diana's forests cannot see Diana's unit counts or readiness — Diana's forests are information black holes.

**Rationale:** Diana is the stealth House. Scouting immunity is their defining asymmetric advantage. Without it, Diana is just "Mars but in the woods." Combined with Ambush Predator (At Ease units fight as Alert when Diana initiates in forests), this creates the game's deadliest trap.

**Balance check:** Diana pays for this with an isolated starting position and no defensive combat bonuses. Diana must expand out of forests to secure enough territory — and outside forests, Diana's advantages don't apply.

**Status: SUPERSEDED. Moonlight Veil and Ambush Predator were replaced in v3.2 by The Hunt (post-combat advance) and Phantom Stride (ignore terrain movement penalties). See Decision 26 for Diana's v3.2 rework.**

---

### 7. Olympus Removed
**Decision:** Olympus was initially kept as Hex 33 (central castle), reserved for expansion. Later fully removed (see Decision 14). No single super-hex exists. Castles spread across the map are the VP objectives.

**Status: Fully removed. See Decision 14.**

---

### 8. Equipment Discovery Risk/Reward
**Decision:** To acquire equipment from a Discovery Site, you must reveal units there (making them vulnerable to ambush).

**Design goal:** Equipment is powerful enough to be worth seeking. The ambush risk creates:
- "Should I search now or wait for protection?" decisions
- Ambush scenarios where patience is rewarded
- Tension even when no combat occurs (the *threat* of ambush affects timing)

**Narrative example:** Mars reaches the Watchtower, finds GravBoots. But they're now exposed on a mountain peak. Diana has units on the Reserve Track from nearby... this is the stuff of great board game stories.

**Status: Finalized.**

---

## Rejected Ideas (Do Not Resurrect Without Strong Justification)

| Idea | Why Rejected |
|------|-------------|
| Tracking sheets for hidden movement | Bookkeeping nightmare, cheating potential |
| Per-unit resource generation | Snowballing, unmanageable math |
| Elimination mechanics | Unfun for eliminated player, anti-thematic |
| Deck-building as core mechanic | Complexity overload, competes with hidden movement |
| Non-canonical technology | Strict thematic constraint — Institute only |
| Killing units | See elimination mechanics |
| Olympus in base game (expanded) | Scope creep, saved for expansion |

---

### 9. Readiness System (Alert / At Ease)

**Problem:** The Reserve Track creates the *setup* for ambush (hidden movement, surprise deployment), but combat resolution didn't differentiate between ambushing an unprepared enemy vs. attacking a fortified position. All combats felt the same regardless of context.

**Solution:** The Readiness System. Units on the map are either **Alert** (combat-ready, unproductive) or **At Ease** (productive, vulnerable). In deterministic combat (v3.0), Alert units contribute +1 strength each; At Ease units contribute +0. At Ease units in Forest hexes get +1 (forest combat bonus).

**Key mechanic — Deployment Strike:** Deploying from the Reserve Track into a hex where all defenders are At Ease. Deployer arrives Alert (+1 each) vs. defenders at +0 each. This is the game's most devastating offensive move.

**Why it works:**
- Creates a genuine economy vs. defense tradeoff (you can't gather AND be ready for a fight)
- Makes the Reserve Track terrifying (you MUST stay Alert if enemies are marching)
- Passive scouting (v3.0): Alert units automatically block Reserve Track deployment within 1 hex — staying Alert IS your scouting
- Diana's Moonlight Veil makes forests impervious to scouting — can't see Diana's readiness state
- Each House interacts with Readiness differently, reinforcing asymmetric identity

**House interactions (v3.0 Player Boards):**
- Mars: Howler counts as 2 Alert units for strength. Blood Rally = free rally on combat win.
- Minerva: Prepared Positions = At Ease units fight as Alert when defending. Owl's Wisdom sees adjacent readiness.
- Apollo: Healer's Art = rally 1 after any combat. Archer supports adjacent fights.
- Diana: Ambush Predator = At Ease fights as Alert when initiating in forests. Shadow moves through enemies.
- Jupiter (expansion): Legionnaire = +1 to all defenders in hex. Auto-rallies.
- Ceres (expansion): No Readiness bonus (most vulnerable to ambush, offsetting economic power).

**Status: Core system. Updated for v3.0 (deterministic combat, passive scouting, Player Boards).**

---

### 10. 4-Player Maximum (Base Game)

**Problem:** 6-player games create excessive downtime (15+ actions between your turns), game length pushes toward 3+ hours, and balance across 6 asymmetric factions is exponentially harder to achieve.

**Solution:** Base game supports **2-4 players**. The core four Houses are Mars, Minerva, Apollo, and Diana. Ceres and Jupiter are designed as expansion Houses.

**Why it works:**
- With unit-order system (1 order per unit), 4 players creates manageable downtime
- Target game length: 90-120 minutes (Root-level weight)
- 4 Houses with 6 possible 2-House matchups — testable
- Ceres and Jupiter can be added via expansion with confidence that the core is solid

**Status: Finalized. Core-4 balance is priority. Ceres/Jupiter expansion is future scope.**

---

### 11. Flag Capture Scaling

**Problem:** "Capture ALL enemy flag-bearers" is nearly impossible at 4 players (capturing 3 flags across a 67-hex map).

**Solution:** Scale flag capture requirement by player count:
- 2-player: Capture the enemy's flag-bearer
- 3-player: Capture 2 of 2 enemy flags
- 4-player: Capture 2 of 3 enemy flags

**Target:** Flag capture should end ~20-30% of games. It's a viable aggressive path, not just a theoretical possibility.

**Status: Proposed. Needs playtesting to validate thresholds.**

---

### 12. Diplomacy — Pure Free-Form

**Decision:** No formal alliance, truce, or negotiation mechanics. Diplomacy is entirely emergent from player interaction and board state.

**Rationale:** Mechanical alliance systems feel "too gamey" for the Institute's atmosphere. In the books, alliances are whispered, fragile, and based on mutual interest — not enforced by rules. The game's hidden information systems (Reserve Track, Readiness states) create natural trust/distrust dynamics without mechanical support.

**Status: Finalized for base game. No alliance tokens, intent cards, or binding deal mechanics.**

---

### 13. Unit Orders System (No Action Limit)

**Problem:** Fixed "3 actions per turn" felt artificial and didn't scale with army size. A player with 15 units and a player with 5 units had the same action count.

**Solution:** No action limit. Each unit gets 1 free move + 1 order per turn. Your army IS your action budget. Constraints come from resources and movement, not arbitrary caps.

**Key rules:**
- Gathering → At Ease (vulnerable). Military orders → Alert.
- 1 Gatherer max per hex (prevents economy stacking)
- Standing token = Alert, laying token = At Ease (instant board readability)
- Persistent states — units stay in their state until given new orders

**Status: Finalized. Replaces old 3-action system.**

---

### 14. Olympus Removed

**Decision:** Olympus Command Center (Hex 33) removed as a special hex. No single super-hex with magic combat bonuses.

**Rationale:** Olympus risked turning every game into "fight over the center hex." The book treated it as one year's specific prize, not a universal objective. Castles spread across the map create multiple fronts and more varied games.

**Status: Removed. Castles are the VP objectives.**

---

### 15. Castle System (Home + Neutral)

**Decision:** 8 castles total — 4 home castles (player starting positions, 0 VP) and 4 neutral castles (hidden garrison tokens, 4 VP each). Neutral castles correspond to non-player Houses from the books.

**Key rules:**
- Home castles are pre-fortified, worth 0 VP, but enemy home castles worth 4 VP if captured
- Neutral castles have hidden garrison tokens (strength 2-4), revealed by scouting
- Castles produce 1 of each resource type
- In different player counts, different castles become neutral vs. home

**Status: Finalized. Hex assignments complete (see HEX_ASSIGNMENTS.md).**

---

### 16. Resource Conversion Centers & Ancient Ruins Removed

**Decision:** Resource Conversion Centers (special hexes with better trade rates) and Ancient Ruins (roll-to-draw-equipment hexes) removed as special hex types.

**Rationale:** Conversion Centers added complexity without enough strategic depth. Ancient Ruins didn't fit thematically and the roll-each-round mechanic was fiddly. Discovery Sites serve the exploration role better.

**Status: Removed.**

---

### 17. VP System Revised (Anti-Turtle)

**Decision:** Removed "1 VP per controlled hex at game end." Added "1 VP per combat won." Castle VP is the primary scoring mechanism.

**Rationale:** Per-hex VP rewarded passive territorial spread (turtling). The new system rewards aggression: you score by taking castles, winning fights, and converting units. A player who avoids combat cannot keep up on VP.

**Status: Finalized. Anti-turtle VP confirmed.**

---

### 18. Deterministic Combat (No Dice)

**Problem:** Risk-style dice combat (roll pools, compare highest) put drama in the *resolution* instead of the *decisions*. Players agonized over dice results rather than positioning. Skilled play couldn't reliably overcome randomness.

**Solution:** Fully deterministic combat. Count Alert units (+1 each), At Ease units (+0 each), add modifiers (terrain, House abilities, Tactics Cards). Compare totals. Higher wins, ties to defender. Margin determines subdues (1-2=1, 3-4=2, 5-6=3, 7+=4).

**Why it works:**
- Drama comes from positioning, readiness management, and Tactics Card bluffing — not dice
- Players can calculate odds before committing, making attack decisions meaningful
- Tactics Cards (one per side, simultaneous reveal) provide bounded uncertainty without randomness
- Inspired by Voidfall's deterministic combat system

**What was removed:**
- 10 six-sided dice
- All "roll X dice" references
- Dice probability analysis in balance guide

**Status: Finalized. Core combat system for v3.0.**

---

### 19. Tactics Cards

**Problem:** Fully deterministic combat with no uncertainty is solvable and dry. Players need a source of surprise that rewards earning resources through gameplay.

**Solution:** 20-card universal Tactics Card deck. One per side per combat, simultaneous reveal. Cards are earned (not starting resources) through combat wins, castle captures, Discovery Sites, Discovery Tokens, and Proctor cards. Four types: 8 Strength, 6 Tactical, 3 Terrain, 3 Special.

**Why it works:**
- Bounded uncertainty: swing range of ~±4 from card play. Enough to flip close fights, not enough to override massive advantages
- Earned through gameplay: creating a "rich get richer in cards" dynamic that rewards aggression
- Simultaneous reveal: no information advantage in card play itself — pure reading of opponent
- Universal deck: all Houses draw from same pool, no faction-specific card imbalance

**Status: Finalized. See `mechanics/TACTICS_CARDS.md` for full card list.**

---

### 20. Player Boards Replace House Ability Decks

**Problem:** 15-card House Ability decks (60 cards total for 4 Houses) created excessive component overhead, hand management complexity, and random power spikes from card draws. Players spent too much time reading cards instead of watching the board.

**Solution:** Each House gets a Player Board (like Root faction boards) with exactly 4 abilities:
1. **Passive** — always-on power (e.g., Mars: Red Rage +1 when outnumbered)
2. **Special Unit** — unique unit with distinct ability (e.g., Howler counts as 2 Alert)
3. **House Rule** — ongoing tactical benefit (e.g., Blood Rally: win → free rally anywhere)
4. **Once Per Game** — powerful one-shot (e.g., Rage of Ares: double strength for 1 battle)

**Why it works:**
- Four abilities per House = simple to learn, deep to master
- No hand management, no card draws, no deck shuffling
- Player Board is always visible — opponents can anticipate your capabilities
- Once-per-game power creates "has she used it yet?" tension throughout the entire game
- Reduced from 60 House Ability Cards to 4 Player Boards

**Status: Finalized. See individual House files for complete ability details.**

---

### 21. Passive Scouting Replaces Investigation System

**Problem:** The Investigation System (waypoint discs, Intel-based investigation orders, deception/erasure mechanics) was a complex mini-game that distracted from the core military strategy. It required 24 waypoint discs, destination cards, and multiple Intel-based order types.

**Solution:** Passive scouting. Alert units automatically block Reserve Track deployment within 1 hex (creating a 7-hex awareness zone per Alert unit). No orders needed, no Intel cost. The cost of scouting is keeping units Alert — they can't gather.

**Why it works:**
- Zero additional actions or resources — scouting is built into the readiness decision
- Creates the same economy-vs-defense tension as the old system, but without additional rules
- Reduces component count (removed 24 waypoint discs, destination cards)
- Scales naturally: more Alert units = wider scouting perimeter = less resource income
- Minerva's Owl's Wisdom and Tactician provide enhanced scouting without adding system complexity
- Diana's Moonlight Veil interacts cleanly (forests block scouting, not a specific card or order)

**What was removed:**
- 24 Waypoint Discs (6 per House)
- Destination Cards
- Scout and Investigate orders
- Deception/Erasure mechanics (2 Intel to erase waypoint)
- `mechanics/INVESTIGATION_SYSTEM.md` (now deprecated redirect)

**Status: Finalized. See `mechanics/RESERVE_TRACK.md` for passive scouting rules.**

---

### 22. Reserve Track — No Commitment

**Problem:** Early Reserve Track designs required committing to a destination (notepad, sealed envelope, face-down card) when units entered the track. This added bookkeeping and removed the strategic flexibility that makes hidden movement exciting.

**Solution:** No commitment. Units enter the Reserve Track, advance through 3 spaces (gaining range: 3/6/9 hexes from Removal Marker), and the player chooses the deployment destination at the moment of deployment. The destination is truly unknown — even to the marching player, until they decide.

**Why it works:**
- Maximum strategic flexibility for the marching player
- Opponents must defend against ALL possible deployment hexes within range, not just a committed one
- No bookkeeping, no notepads, no sealed envelopes
- Arrival Marker placed at origin hex gives opponents range information without destination
- Passive scouting (Alert units) constrains options without requiring commitment

**Status: Finalized.**

---

### 23. Deterministic Rally

**Problem:** In earlier versions, rallying subdued units required a die roll (50% success chance). This made recovery unreliable and created feel-bad moments where a player couldn't recover even with correct decisions.

**Solution:** 1 order = 1 subdued unit restored. No die roll, no randomness. Rally is as reliable as attacking.

**Why it works:**
- Players can plan around recovery timing with certainty
- Armies recover ~1 round faster than with dice (validated in food math)
- Removes a random element from a system that's now fully deterministic
- Medical Kit equipment still has value: rally 2 units per order instead of 1

**Status: Finalized.**

---

### 24. Objective Cards

**Problem:** The VP system needed a hidden, personal scoring element to create asymmetric goals beyond the shared castle/combat/flag objectives. Without secret objectives, optimal play converges to the same strategy every game.

**Solution:** 16 Objective Cards across 4 categories (Territory, Combat, Tactical, Strategic). Draw 2 at game start, keep 1 (secret). VP range: 2-5. Each card has a specific condition (e.g., "Control 3+ Forest hexes at game end" or "Win 5+ combats").

**Why it works:**
- Hidden personal goals create uncertainty about opponent priorities
- "Draw 2 keep 1" gives agency without overwhelming choice
- 4 categories ensure diverse playstyles are rewarded
- Some objectives have House affinity (forest objectives favor Diana, combat objectives favor Mars) without being House-exclusive
- VP range (2-5) is significant enough to matter but not game-deciding alone

**Status: Finalized. See `mechanics/OBJECTIVE_CARDS.md` for full card list and House affinity matrix.**

---

### 25. Desperate Gambit Rename (Blood Rally → Martyrdom)

**Problem:** The Desperate Gambit "Blood Rally" shared a name with Mars' House Rule "Blood Rally" (win combat → rally 1 subdued anywhere). This created confusion in rules reference and discussion.

**Solution:** Renamed the Desperate Gambit to "Martyrdom." The thematic fit is stronger — sacrificing a unit to inspire your army is martyrdom, not a blood rally.

**Additional fixes in the same pass:**
- All "+X to combat rolls" language → "+X combat strength" (no more dice references)
- All "1 action" language → "1 order" (unit orders system, not action system)
- Scorpion's Tail reworked: retreat + hidden Trap marker (+3 combat strength if enemy enters within 2 rounds, expires after)
- False Flag updated for passive scouting system (no investigation-based reveal)

**Status: Finalized. See `mechanics/DESPERATE_GAMBITS.md`.**

---

### 26. Food-Only Economy (v4.0)

**Problem:** The game had three resources (Food, Tech, Intel), but two of them created design problems:
- **Tech was thematically wrong** — the Institute is a primitive survival competition, not a technology race. Gold children fighting with swords and cunning shouldn't be stockpiling "Tech tokens."
- **Intel as a currency was artificial** — information should come from positioning (passive scouting with Alert units), not from spending tokens. Intel-based espionage actions (Sabotage, False Intel, Infiltration, Assassination) created a complex mini-game that distracted from core combat and movement.
- **Resource diversity created busywork** — converting 2 Intel → 1 Food, tracking three separate stockpiles, and balancing per-House resource access across three types added complexity without proportional strategic depth.

**Research:** Comparable aggressive territory control games thrive with 0–1 resources: Kemet (Prayer Points), Blood Rage (Rage), Inis (no resources), Small World (no resources). The genre favors simplicity in economy and depth in combat/positioning.

**Solution:** Food is the only resource. All hexes are either **Fertile** (produce 1 Food) or **Barren** (produce nothing). 54 Fertile + 26 Barren + 10 Castles = 90 hexes.

**Systems removed:**
- Tech and Intel as resources (tokens, tracks, all costs)
- Craft Equipment order (equipment now only from Discovery Sites + castle captures)
- All Espionage actions (Sabotage, False Intel, Infiltration, Assassination)
- Resource conversion (2:1 trading between types)

**Systems changed:**
- Build Fortification: 4 Food (was 3 Tech)
- Starting resources: 5 Food (was 3 Food + 3 Tech + 3 Intel)
- Castle scouting: free from adjacent hex (was 1 Intel)
- Castle capture rewards: troops + 1 Tactics Card (was +1 Tech)
- Watchtowers: 2-hex scouting range (was +1 Intel/round)
- Diana starvation: 2 units in Forest exempt from upkeep (was "use Intel instead of Food")

**Why it works:**
- Food creates the purest tension: every Food spent on fortification is Food you can't eat
- Starvation pressure (escalating across Acts) is the game's clock — it doesn't need help from other resources
- Removing Tech/Intel reduces component count, teach time, and per-turn bookkeeping
- Scouting and information come from board positioning (passive scouting), not from currency spending
- The map's Fertile/Barren distribution creates the same expansion pressure that three resource types did, but more elegantly

**Status: Finalized. All game files updated to v4.0 Food-only economy.**

---

### 27. Diana Ability Rework (v3.2)

**Problem:** Diana's original abilities (Moonlight Veil, Ambush Predator) were forest-specific defensive abilities that encouraged turtling in the Greatwoods. This conflicted with the design value that aggression should be rewarded.

**Solution:** New Diana abilities focus on **movement and aggression**:
- **The Hunt** (passive): Win an attack → all surviving attackers may move 1 hex immediately. Enables chain attacks.
- **Phantom Stride** (house rule): Ignore terrain movement penalties. Mountains cost normal movement.
- **Shadow** (special unit): Moves through enemy hexes without triggering combat. A scout, not a fighter.
- **Lunar Eclipse** (once per game): All scouting fails globally for 1 round. Information denial.

**Why it works:** Diana is now the speed/pursuit House — hitting, advancing, striking again. Chain attacks across the map reward bold play. Phantom Stride makes Diana unpredictable from any direction (not just forests). This is a more interesting identity than "hide in forests."

**Status: Finalized. See `houses/HOUSE_DIANA_CERES_JUPITER.md`.**

---

### 28. Anti-Turtle Pass (v6.0)

**Problem:** Implementing the v3.0–v5.0 rules in a digital prototype surfaced several balance traps that made defensive play optimal — exactly the opposite of design intent. The headline issues:

1. **Forest cover** (At Ease defenders +1 each in Greatwoods/North Woods) made Diana's gatherers nearly unkillable. Diana's optimal strategy became "sit in Greatwoods and farm." Deployment Strikes lost to forest cover. The whole Alert/At Ease tension was undermined for one whole region.
2. **Castle capture** was mathematically punishing (need ~10 strength to crack a 3-strength garrison + 2 fort) for a small payoff (1-2 troops, 4 VP). Most playtests would never see a castle change hands, leaving 24 of ~50 VP behind dead content.
3. **Economy could only shrink.** Max 1 gatherer per hex × 5 reachable fertile hexes ≈ 5 Food/round. Starvation ate that. Recruit cost 4F. So a unit lost in combat was effectively unreplaceable. The game punished combat losses so hard that turtling became safest.
4. **Tactics Cards snowballed** — whoever won the first combat got the first card, used it to win the next combat, etc. The bluff layer was one-sided.
5. **VP system rewarded turtling** — castles held at game end paid 4 VP each, more than combat actions could ever generate. Sit on castles → win.
6. **Mars Red Rage paradox** — Mars gets +1 outnumbered, but ties go to defender, so Red Rage only kicks in when Mars is going to lose anyway.

**Solution:** A redesign pass touching combat, economy, VP, cards, and house abilities. Rules below are the v6.0 baseline.

**Combat changes:**
- **Forest combat bonus REMOVED.** Forest cover no longer affects combat math.
- **Forest = deployment-stealth zone.** Reserve Track deployments INTO Greatwoods or North Woods bypass passive scouting. Universal rule. Diana benefits most because Greatwoods is huge.
- **Mars Red Rage** now also wins ties when outnumbered (paradox fixed).
- **Diana The Hunt** triggers on ANY combat win (defense too, not just attacks).
- **Castle capture rewards** scaled up: garrison-strength troops join you (was 1-2), 2 Tactics Cards (was 1), castle pre-fortified for new owner, captured castles produce 2 Food/round, and a one-time 5 VP capture event.

**Economy changes:**
- **Starting Food: 7** (was 5).
- **Starvation: 1 per 5 units in Acts I-II, 1 per 3 in Act III only** (was 1/4 → 1/3 → 1/2). Acts I & II have breathing room; Act III is still the squeeze.
- **Recruit: 3 Food flat** (was 4F Act I, 3F after — drop the Act I tax).
- **Captured castles produce 2 Food** when gathered.
- **Minerva Highland Gatherers produce 2 Food** (resource bonus now mechanical).

**VP rebalance** (anti-turtle):
| Source | Old VP | New VP |
|---|---|---|
| Combat won | 1 | 1 |
| Conversion | 1 | **2** |
| Castle CAPTURE event | n/a | **5 one-time** |
| Neutral castle held at end | 4 | **1** |
| Enemy home castle held at end | 4 | **2** |

Sitting on castles no longer wins. Capturing them does. Turtle vs. aggressor end-state math now strongly favors aggression.

**Tactics Cards — anti-snowball:**
- Combat-win draw REMOVED.
- New sources: castle capture (2), Discovery Sites (1 first explore), Discovery Tokens (1-2), Proctor effects.
- Cards are scarcer overall but no longer concentrate in whoever struck first.

**Once Per Game powers — REMOVED.** Rage of Ares, Strategic Genius, Solar Supremacy, Lunar Eclipse all dropped. Reasoning: their power levels were wildly uneven (Rage of Ares = +5-10 strength; Lunar Eclipse = often situationally useless). Easier to add back individually if a House feels weak in playtesting.

**House ability adjustments:**
- **Mars** loses "Win in fertile hex = +1 Food" (redundant with Blood Rally as a winning-rewards-momentum mechanic).
- **Diana** Phantom Stride dropped (terrain movement penalties aren't enforced anyway). Replaced with **Forest Hunters** — Diana's Reserve Track withdraws from forest hexes hide the Removal Marker for 1 round.
- **Apollo** unchanged (Sun's Reach 2-hex move + Archer + Healer's Art).
- **Minerva** unchanged abilities, but Highland Gatherer +1 Food bonus is now enforced.

**Honor-system Proctor Cards converted to enforced effects** — Skirmish Bounty, Eager Recruits, Famine Warning, Forced Cease-fire, Food Drought, Demands Blood, Crimson Hour, Final Supply all now have automatic mechanical effects instead of "manual scoring" notes.

**Why it works:**
- Forest swap: Diana keeps forest as her thematic zone, but its identity flips from "bunker" to "stealth tunnel" — fits the Shadow theme and breaks the turtling pattern.
- Castle rewards now justify the assault. A 6-unit dedicated assault that costs Flag-bearer exposure for 2 rounds pays back ~3 troops + 2 cards + 5 VP + 2 Food/round + a fortified base. Real risk-reward.
- Economy net: armies can grow again. 10-unit army eats 2 Food/round in Acts I-II, leaves 3+ for Recruit. Lost units are recoverable in 2-3 rounds.
- VP punishes turtling: a 6-combat-win + 3-conversion + 1-capture aggressor scores ~17 VP; a 3-castle turtle scores ~4. Aggression is now mathematically the better path.

**Status: Finalized as v6.0 baseline. Playtesting will validate.**

---

### 29. Combat Aftermath — Losers Retreat to Reserve Track (v6.1)

**Problem:** v6.0 left subdued units lying in the combat hex. This created a death spiral: winning a combat let your Alert units stay in the hex with the loser's now-Subdued units, who couldn't fight back. Next round you'd attack again — same hex, same enemies, but the loser had fewer Alert units to defend with. After 2-3 rounds the loser's whole stack got ground to subdued/converted in a single hex, and the winner had effectively grown an army for free.

The contested-hex state also added complexity: hexes with mixed houses produced no Food, didn't count for VP, and could loop combats indefinitely.

**Solution:** When combat resolves, the loser's units retreat to their Reserve Track. The winner takes the hex cleanly.

**The new resolution:**
1. Combat resolves; margin determines a number of "blows"
2. Winner converts up to `floor(blows / 2)` enemy non-flag units (their pick, in winner's hex, defected, Alert, acted)
3. **Flag-bearer captured**: if a blow would hit the flag-bearer (highest-priority subdue order means flag is hit only after every other defender), the flag-bearer stays in the hex as Subdued. Triggers the flag-capture win condition (instant win in 2-player).
4. **All other loser units retreat** to a new Reserve Track group at Space 1, with the combat hex as the Removal Marker. They are normal RT units (no special "wounded" state).
5. Hex is uncontested — winner controls.

**Knock-on changes:**
- **Subdued state retired** for in-hex units. The state still exists on captured flag-bearers (since they don't retreat — they're captured). Persistent "subdued unit lying in a hex waiting to be rallied" gameplay is gone.
- **Rally order narrowed**: now restores Weakened units (starvation casualties) only. No subdued targets exist in-hex except captured flags, which can't be rallied.
- **Mars Blood Rally rewritten**: was "rally 1 subdued Mars unit anywhere on board." Now: "Win combat → recall 1 Mars unit from your Reserve Track to the combat hex (Alert, acted)." Mars wins → a previously-retreated soldier marches back into the fight at the front. Better thematic flavor (Mars never quits) and the same recovery-on-victory feel.
- **Apollo Healer's Art rewritten**: was "After any combat, rally 1 subdued Apollo unit in that hex." Now: "After any combat Apollo is in (win or lose), recall 1 Apollo unit from your Reserve Track to the combat hex." Apollo even leaves a healer behind in defeat.
- **Diana's The Hunt unchanged**: still triggers on any Diana combat win, surviving Diana units in the hex may move 1 hex.

**Why it works:**
- The cascade combat trap is permanently broken. Each combat is a discrete event, not the start of a multi-round grind.
- The loser's army isn't destroyed — it's hidden. The Reserve Track keeps the threat alive: opponents see units on the track, know the deployment radius, but don't know where they'll reappear.
- The forest-deployment-stealth rule (v6.0) gives losers a real counter-strike option — withdrawn units can re-enter via forest hexes even past Alert sentries.
- Cleaner state model: hexes are uncontested, units are either on a hex (active) or on the RT (in transit). No "subdued in hex" intermediate state.
- Mars and Apollo abilities feel more thematic — they reach into the rear column to pull a soldier back into the fight, instead of "rallying" off the same hex.

**Flag capture math is unchanged.** Flag-bearer is still last in subdue priority, so a defender with 2+ escorts requires margin 5+ to capture. The flag capture mechanic still works because the flag-bearer doesn't retreat with the rest — it stays in hex as Subdued (the last vestige of the subdued state).

**Status: Finalized as v6.1. The combat-aftermath problem is solved without breaking the rest of the system.**

---

## Rejected Ideas (Do Not Resurrect Without Strong Justification)

| Idea | Why Rejected | Decision # |
|------|-------------|------------|
| Tracking sheets for hidden movement | Bookkeeping nightmare, cheating potential | 1 |
| Per-unit resource generation | Snowballing, unmanageable math | 2 |
| Elimination mechanics | Unfun for eliminated player, anti-thematic | 5 |
| Deck-building as core mechanic | Complexity overload, competes with hidden movement | 3 |
| Non-canonical technology | Strict thematic constraint — Institute only | — |
| Killing units | See elimination mechanics | 5 |
| Olympus as central super-hex | Turns every game into "fight over center" | 14 |
| House Ability card decks (15 per House) | Too many components, hand management complexity, random power spikes | 20 |
| Dice-based combat (Risk-style) | Drama in resolution not decisions, skilled play unreliable | 18 |
| Investigation system (waypoints, Intel-based) | Complex mini-game, too much bookkeeping, distracted from core strategy | 21 |
| Reserve Track destination commitment | Bookkeeping, reduced strategic flexibility | 22 |
| Dice-based rally (50% success) | Unreliable recovery, feel-bad randomness | 23 |
| Resource Conversion Centers (special hexes) | Added complexity without strategic depth | 16 |
| Three-resource economy (Food/Tech/Intel) | Busywork, thematically wrong (Tech), artificial (Intel as currency) | 26 |
| Espionage actions (Sabotage, Infiltration, etc.) | Complex mini-game that distracted from core strategy | 26 |
| Craft Equipment order | Removed with Tech; equipment from Discovery Sites + castles only | 26 |
| Diana forest-specific abilities (Moonlight Veil, Ambush Predator) | Encouraged turtling, conflicted with aggression-rewarding design | 27 |
| Ancient Ruins (roll-to-draw equipment) | Thematically weak, fiddly mechanics | 16 |
| Per-hex VP at game end | Rewarded passive territorial spread (turtling) | 17 |
| 6-player base game | Excessive downtime, balance nightmare | 10 |
| Forest combat cover (At Ease defenders +1 each in forest) | Made forest a turtling bunker; broke Alert/At Ease tension | 28 |
| Once Per Game house powers (Rage of Ares, Strategic Genius, Solar Supremacy, Lunar Eclipse) | Wildly uneven power levels; can re-add individually if needed | 28 |
| Tactics Card draw on combat win | Snowballed bluff layer to whoever fought first | 28 |
| Castle held at game end = 4 VP | Made turtling on castles a winning strategy | 28 |
| Subdued units lying in the hex (persistent state) | Created cascading combat death spiral; losers got ground down repeatedly | 29 |

---

## Open Questions / Future Decisions

1. ~~**Food math validation**~~ — ✅ Validated. See `docs/FOOD_MATH_VALIDATION.md`. Original math holds with v3.0 systems.
2. ~~**Proctor card design**~~ — ✅ All 30 cards designed. See `mechanics/PROCTOR_CARDS.md`.
3. ~~**Combat card play**~~ — ✅ Resolved by Tactics Cards (universal deck, not House-specific). See Decision 19.
4. ~~**Hex-by-hex resource assignments**~~ — ✅ Complete. See `map/HEX_ASSIGNMENTS.md`.
5. **Digital prototype** — Tabletop Simulator implementation pending.
6. **Ceres & Jupiter expansion** — Need balancing when added as playable Houses. Designed but not playtested.
7. **Garrison token distribution** — Should players know the distribution (e.g., "two 3s and two 2s")?
8. ~~**Act structure**~~ — ✅ Three-act structure finalized. See `mechanics/ACT_STRUCTURE.md`.
9. ~~**Rulebook rewrite**~~ — ✅ v3.0 rulebook complete. See `docs/RULEBOOK.md`.
10. **Food stockpile cap** — Decision: No cap. Natural drains (starvation, recruitment, fortification) prevent hoarding.
11. **Playtesting** — Print-and-play prototype needed. First playtest: Mars vs. Diana, 2-player, 6-round shortened variant.
12. ~~**Food-only economy**~~ — ✅ Implemented. Tech and Intel removed. See Decision 26.
13. ~~**Diana ability rework**~~ — ✅ Implemented. See Decision 27.

---

*Last updated: 2026-04-26 — v6.1 combat aftermath rewrite (Decision 29). v6.0 anti-turtle pass (Decision 28).*
*This document records settled decisions. Do not re-litigate without strong justification.*
