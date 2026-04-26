# Proctor Cards

> 30 cards total — 10 per Act. One card is revealed at the start of each round.
> Effects last for that round only unless stated otherwise.
> Unused Act I cards shuffle into Act II deck at transition; unused Act II cards shuffle into Act III deck.

> **v6.0 NOTE (2026-04-26):** The cards in this document are the original design v3.0/v4.0 catalog. The digital prototype's implementation (in `digital/shared/data/proctors.ts`) differs: 8 honor-system cards from this doc were converted to mechanically-enforced effects (Skirmish Bounty, Eager Recruits, Famine Warning, Forced Cease-fire, Food Drought, Demands Blood, Crimson Hour, Final Supply). For the canonical v6.0 implementation, see the engine. This document remains the design reference for tone and intent.

---

## Design Principles

1. **Tone escalation:** Act I is environmental/exploratory. Act II is political/confrontational. Act III is desperate/climactic.
2. **Impact range:** No single Proctor card should swing more than ~2 VP of advantage.
3. **Symmetry preference:** Cards affecting "all players" are inherently fairer. Most cards should be global with differential impact.
4. **Catch-up integration:** ~30% of cards help trailing players. ~40% are neutral. ~30% apply pressure or create drama.
5. **System interaction:** Cards should interact with the game's core systems: Tactics Cards, passive scouting, Reserve Track, readiness, deterministic combat, and the Food economy.
6. **Memorable moments:** Each card should create a story beat.

---

## Act I: Survival (Rounds 1–4)

*Environmental and exploratory. The Institute reveals its terrain, food sources shift, and the first sparks of conflict ignite.*

### I-1: Supply Drop
*"The Proctors have left provisions. First come, first served."*

Place **3 Food tokens** on a random empty hex (no units present). First player to move a unit there collects all 3 Food.

**Design intent:** Creates a race. Drives early movement and first contact.

---

### I-2: Mountain Storm
*"Thunder echoes through the peaks. Even the bravest take shelter."*

All units in **Mountain hexes** immediately go **At Ease**. Units cannot enter Mountain hexes this round.

**Design intent:** Punishes early Mountain expansion. Creates a vulnerability window for mountain-dwelling players.

---

### I-3: Bold Reconnaissance
*"The Proctors reward those who dare to look."*

Each player with **at least 1 Alert unit adjacent to an opponent's hex** draws **1 Tactics Card**. Player with the most Alert units on the board draws **2 instead**.

**Design intent:** Rewards maintaining Alert perimeters early (when most players want to go all-in on gathering). First taste of Tactics Cards for aggressive players.

---

### I-4: Fertile Valley
*"Rain comes to the lowlands. The earth gives freely."*

All **Fertile hexes** produce **double** this round. Gatherers on Fertile hexes collect 2 Food instead of 1.

**Design intent:** Eases the early food crunch. Benefits players who spread gatherers across more Fertile hexes.

---

### I-5: Tremors
*"The ground shakes. Something stirs beneath."*

All **Cavern entrances** become **impassable** this round. Units at cavern entrances must move to an adjacent hex or stay put. Additionally, reveal 2 random Discovery Tokens (show what's there, but don't trigger them).

**Design intent:** Disrupts cavern flanking + creates informed decisions about which tokens to pursue.

---

### I-6: First Blood
*"The Proctors grow impatient. They want to see blood."*

The **first player** to win a combat this round gains **2 VP** and draws **1 Tactics Card**. If no combat occurs, no one collects.

**Design intent:** Provokes aggression when players might otherwise turtle. Tactics Card reward makes it even more tempting.

---

### I-7: Watchtower Flares
*"Fires burn on the watchtowers. The land is illuminated."*

All **Watchtower hexes** grant **3-hex scouting** this round (enhanced from the normal 2-hex vision). Players controlling a Watchtower can see exact unit counts and readiness states within **3 hexes** (like Minerva's Owl's Wisdom but at range).

**Design intent:** Makes Watchtower control valuable early. Creates an information advantage race.

---

### I-8: Proctor's Gift
*"A crate appears at each House's doorstep. The Proctors are generous... for now."*

The player with the **least Food** gains **3 Food**. All other players gain **1 Food**. (Tied for least: all tied players gain 3.)

**Design intent:** Pure catch-up card. Smooths early-game food imbalances.

---

### I-9: Discovery Surge
*"The Institute reveals its secrets to those bold enough to seek them."*

All unclaimed **Discovery Sites**: reveal the top token face-up (everyone sees what's there). Players can still claim by moving units there. Additionally, each player who claims a Discovery Site this round draws **1 bonus Tactics Card**.

**Design intent:** Creates informed races toward valuable tokens. Bonus Tactics Card means more rewards for explorers.

---

### I-10: The Proving
*"The Proctors evaluate. The weak are given a chance. The strong are tested."*

The player with the **fewest controlled hexes** gains **4 Food and 1 Tactics Card**. The player with the **most controlled hexes** must choose: **sacrifice 1 unit** (returned to supply) or **all their Alert units go At Ease** (vulnerability window).

**Design intent:** Explicit catch-up. Forces the leader into a meaningful sacrifice.

---

## Act II: War (Rounds 5–8)

*Political and confrontational. Tactics Cards are in play, Reserve Track threats are real, and the Proctors demand action.*

### II-1: Proctor's Challenge
*"The Proctors designate a prize. Fight for it."*

Randomly select a **neutral castle** (if unclaimed) or a **contested border hex**. Place a **Challenge marker**. The player controlling that hex at end of round gains **3 VP**. If no one controls it, no one scores.

**Design intent:** Focuses aggression on a specific point. Creates a predictable battle with high stakes.

---

### II-2: Forced Ceasefire
*"The Proctors decree: no blood shall be shed this round."*

**No combat** may be initiated this round. Deployment Strikes prohibited. Units may still move, gather, and reposition.

**Design intent:** Builds tension. Players reposition without release. The round AFTER a ceasefire often explodes. Gatherers feel safe — which creates At Ease vulnerabilities when the ceasefire lifts.

---

### II-3: Arms Race
*"The Proctors want to see your arsenals."*

Each player must **reveal how many Tactics Cards** they hold (not which cards — just the count). The player with the **most Tactics Cards** must either **play 1 immediately** (discard, no effect) or **give 1 to the player with the fewest**.

**Design intent:** Information forcing + redistribution. Punishes hoarding. Creates a catch-up mechanism for the Tactics Card economy.

---

### II-4: Blighted Harvest
*"The wells run dry. The earth turns barren."*

**No Fertile hexes produce Food this round.** Castles still produce their 1 Food normally. Gatherers on Fertile hexes produce nothing.

**Design intent:** Economic disruption. A round without Fertile hex production forces players to rely on castle production and stored Food. Creates starvation pressure and desperate aggression.

---

### II-5: Proctor's Arsenal
*"The Proctors arm the underdog."*

The player in **last place by VP** draws **2 Tactics Cards** and may **recruit 1 unit for free** (placed in any hex they control, goes At Ease). All other players draw **1 Tactics Card**.

**Design intent:** Direct catch-up. Everyone gets something, but the trailing player gets significantly more. Tactics Cards for all keeps everyone engaged.

---

### II-6: Proctor's Ultimatum
*"Choose: bleed or starve."*

Each player must choose one:
- **Sacrifice 1 unit** (return to supply), OR
- **Discard all stored Food** (stockpile goes to 0)

**Design intent:** Forced loss with meaningful choice. Economy-strong players lose food. Army-strong players lose a unit.

---

### II-7: Forced March
*"The Proctors accelerate the war. No more hiding."*

All units currently on the Reserve Track **must advance 1 space** this round (automatic, in addition to normal advancement). Units on Space 3 **must deploy immediately** — they cannot hold.

**Design intent:** Disrupts Reserve Track timing. Forces premature deployments. Creates chaos for players planning careful marches.

---

### II-8: The Hunt
*"The Proctors loose the hounds. Flag-bearers are the quarry."*

All players must **reveal which hex their Flag-bearer is in** (not the unit itself — just the location). Lasts this round only.

**Design intent:** Major information reveal. Intense flag-bearer vulnerability. Guard it or use the knowledge to attack others'.

---

### II-9: Contested Ground
*"Every border becomes a battlefield."*

Any hex that is **adjacent to units from 2+ different players** becomes **contested**. Contested hexes produce no Food this round. Players who **win a combat** in a contested hex this round gain **+1 VP** (in addition to the standard combat win VP).

**Design intent:** Punishes passive border-sitting. Rewards fighting over contested territory with bonus VP.

---

### II-10: Fog of War
*"Darkness falls across the Institute. The Proctors dim the lights."*

All passive scouting is **suspended** this round. Alert units do NOT block Reserve Track deployment. Deployment can happen **anywhere within range**, regardless of Alert enemies. Minerva's Owl's Wisdom and the Tactician's extended scouting are also suppressed.

**Design intent:** One round of absolute vulnerability. Every hex is a valid deployment target. Reserve Track players can strike anywhere. Creates the most paranoid round of the game.

---

## Act III: The Reckoning (Rounds 9–12)

*Desperate and climactic. Stakes at their highest, losses are permanent, and the Proctors demand resolution.*

### III-1: The Culling
*"The Proctors thin the herd. Only the strongest survive."*

Each player must **permanently sacrifice 1 unit** (returned to supply — gone). Cannot sacrifice Flag-bearer. Additionally, all subdued units that have been subdued for **2+ rounds** are removed from the game permanently.

**Design intent:** Army thinning. The subdued-unit removal punishes players who haven't been rallying — use it or lose it.

---

### III-2: Final Supply
*"One last gift from the Proctors. One."*

Place **5 Food** on a random central hex. First player to control the hex collects all 5 Food. Additionally, place **1 Tactics Card face-up** on an adjacent hex — first player there claims it.

**Design intent:** Desperate race. 5 Food is 2-3 rounds of survival. The Tactics Card sweetens the nearby hex.

---

### III-3: Storm of the Century
*"The skies open. Mars itself tries to kill you."*

All units in **non-castle, non-forest hexes** immediately go **At Ease**. Forest and castle units are unaffected.

**Design intent:** Massive vulnerability window. Everyone outside shelter is exposed. Deployment Strikes and attacks become devastating. Rewards castle holders and forest dwellers (Diana thrives).

---

### III-4: The Proctors Demand Blood
*"Enough posturing. Fight."*

Each player who wins **at least 1 combat this round** gains **2 VP**. Players who do not initiate or win any combat this round **lose 1 VP** (minimum 0).

**Design intent:** Forces endgame aggression. Turtling costs VP. Even a small calculated strike earns the bonus.

---

### III-5: Proctor's Mercy
*"Even the Proctors have limits. Today they show restraint."*

The player with the **fewest active units** may immediately **rally ALL subdued units for free** (no order required) and draws **2 Tactics Cards**. All their Weakened units also recover.

**Design intent:** Powerful catch-up for a devastated player. Full rally + Tactics Cards can enable a dramatic final push.

---

### III-6: Scorched Skies
*"The air itself turns hostile. Movement becomes agony."*

All movement costs are **doubled** this round. Free move covers only half a hex (effectively: units need Move Again to cover 1 hex total). Mountain hexes are completely impassable. Apollo's Sun's Reach is reduced to 1 hex.

**Design intent:** Locks the board. Armies fight where they stand. No last-minute repositioning.

---

### III-7: Valor Surge
*"The final tokens are placed. Every last point matters."*

Place **3 additional Valor Tokens** on random hexes. All Valor Tokens are worth **6 VP** this round (overrides normal Act III value of 4 VP).

**Design intent:** Massive VP swing. Multiple high-value tokens create an explosive scramble.

---

### III-8: Open Warfare
*"The Proctors demand transparency. No more tricks."*

All combat this round: Tactics Cards must be played **face-up** (revealed before combat resolves, not simultaneously). Attacker reveals first, then defender decides whether to play theirs.

**Design intent:** Removes the simultaneous-reveal bluff. Defender gets perfect information. Dramatically changes combat calculus — attackers must commit first.

---

### III-9: The Passage
*"The Proctors offer a choice: sacrifice or exposure."*

Each player must choose:
- **Sacrifice 1 unit** (returned to supply, cannot be Flag-bearer), OR
- **Reveal their Flag-bearer's exact location** to all players for the rest of the game

**Design intent:** Brutal endgame choice when Flag capture is realistic. Losing a unit hurts. Revealing your flag is terrifying.

---

### III-10: The Reckoning
*"This is the end. The Proctors sit forward in their seats. Make it worth watching."*

**All combat this round:** +2 combat strength for both sides (higher baseline = higher margins = more subdues). All conversion ratios drop to **1:1** (each subdue can become a conversion). Flag-bearers can be captured from **2 hexes away**.

**Design intent:** The finale card. Combat is explosive — +2 strength and 1:1 conversion means battles are decisive. Flag capture extension creates last-round drama. Designed for the final round.

---

## Proctor Card Summary Table

| # | Name | Act | Type | Catch-Up? |
|---|------|-----|------|-----------|
| I-1 | Supply Drop | I | Food race | Neutral |
| I-2 | Mountain Storm | I | Environmental | Mild (punishes expander) |
| I-3 | Bold Reconnaissance | I | Tactics Cards | Neutral (rewards Alert posture) |
| I-4 | Fertile Valley | I | Food boost | Mild (helps everyone) |
| I-5 | Tremors | I | Environmental + Info | Neutral |
| I-6 | First Blood | I | Combat incentive | Neutral (rewards aggression) |
| I-7 | Watchtower Flares | I | Information | Neutral (rewards Watchtower control) |
| I-8 | Proctor's Gift | I | Food catch-up | **Yes** (helps lowest Food) |
| I-9 | Discovery Surge | I | Exploration | Neutral |
| I-10 | The Proving | I | Catch-up | **Yes** (explicit) |
| II-1 | Proctor's Challenge | II | Combat incentive | Neutral |
| II-2 | Forced Ceasefire | II | Restriction | Mild (helps defender) |
| II-3 | Arms Race | II | Tactics Cards + Info | **Yes** (redistributes cards) |
| II-4 | Blighted Harvest | II | Disruption | Neutral |
| II-5 | Proctor's Arsenal | II | Catch-up | **Yes** (explicit, Tactics Cards) |
| II-6 | Proctor's Ultimatum | II | Forced loss | Neutral |
| II-7 | Forced March | II | Reserve Track disruption | Neutral (punishes hidden armies) |
| II-8 | The Hunt | II | Information reveal | Neutral |
| II-9 | Contested Ground | II | Combat incentive | Neutral |
| II-10 | Fog of War | II | Scouting suppression | Neutral (helps Reserve Track users) |
| III-1 | The Culling | III | Forced loss | Neutral |
| III-2 | Final Supply | III | Food + Tactics race | Mild (helps starving) |
| III-3 | Storm of the Century | III | Environmental | Neutral (helps castle/forest holders) |
| III-4 | Proctors Demand Blood | III | Combat incentive | Neutral |
| III-5 | Proctor's Mercy | III | Catch-up | **Yes** (explicit) |
| III-6 | Scorched Skies | III | Restriction | Neutral |
| III-7 | Valor Surge | III | VP scramble | Neutral |
| III-8 | Open Warfare | III | Combat modifier | Neutral (favors defenders) |
| III-9 | The Passage | III | Forced choice | Neutral |
| III-10 | The Reckoning | III | Finale | Neutral |

### System Interactions

| System | Cards That Interact |
|--------|-------------------|
| **Food Economy** | I-1 Supply Drop, I-4 Fertile Valley, I-8 Proctor's Gift, I-10 The Proving, II-4 Blighted Harvest, II-6 Proctor's Ultimatum, II-9 Contested Ground, III-2 Final Supply |
| **Tactics Cards** | I-3 Bold Reconnaissance, I-6 First Blood, I-9 Discovery Surge, II-3 Arms Race, II-5 Proctor's Arsenal, III-2 Final Supply, III-5 Proctor's Mercy |
| **Passive Scouting** | I-7 Watchtower Flares, II-10 Fog of War, III-3 Storm of the Century |
| **Reserve Track** | II-7 Forced March, II-10 Fog of War |
| **Readiness** | I-2 Mountain Storm, I-10 The Proving, III-3 Storm of the Century |
| **Deterministic Combat** | II-9 Contested Ground, III-4 Proctors Demand Blood, III-8 Open Warfare, III-10 The Reckoning |

### Catch-Up Distribution

| Act | Catch-up | Neutral | Pressure/Drama |
|-----|----------|---------|----------------|
| I | 2 (I-8, I-10) | 6 | 2 (I-3, I-6) |
| II | 2 (II-3, II-5) | 6 | 2 (II-7, II-10) |
| III | 1 (III-5) | 7 | 2 (III-4, III-10) |
| **Total** | **5 (17%)** | **19 (63%)** | **6 (20%)** |

---

## Physical Component Notes

- 30 cards total, divided into 3 decks of 10
- Card backs color-coded by Act: **Bronze (I), Silver (II), Gold (III)**
- At Act transitions, remaining cards from previous Act shuffle into next deck
- Each card should have a thematic quote and concise rules box

---

*Redesigned: 2026-03-14 — Aligned with deterministic combat, Tactics Cards, passive scouting, player boards.*
*Updated: 2026-03-15 — Aligned with Food-only economy. Tech and Intel references removed. Watchtowers grant scouting vision, not resources.*
