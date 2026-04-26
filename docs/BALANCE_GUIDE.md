# Red Rising: The Institute — Game Balance Guide

> A living document that guides all balance decisions for Red Rising: The Institute.
> Grounded in principles from *Building Blocks of Tabletop Game Design* (Engelstein & Shalev),
> established game design theory, and lessons from comparable published games.
> This guide will be revised as playtesting data and design conversations evolve.

---

## Table of Contents

1. [Core Balance Philosophy](#1-core-balance-philosophy)
2. [Asymmetric Faction Balance](#2-asymmetric-faction-balance)
3. [Action Economy](#3-action-economy)
4. [Resource Economy](#4-resource-economy)
5. [Combat Balance](#5-combat-balance)
6. [Hidden Information & the Reserve Track](#6-hidden-information--the-reserve-track)
7. [Map & Spatial Balance](#7-map--spatial-balance)
8. [Victory Condition Balance](#8-victory-condition-balance)
9. [Catch-Up Mechanics & Runaway Leader Prevention](#9-catch-up-mechanics--runaway-leader-prevention)
10. [Event & Discovery Token Balance](#10-event--discovery-token-balance)
11. [Balance Anti-Patterns to Avoid](#11-balance-anti-patterns-to-avoid)
12. [Mathematical Frameworks & Tools](#12-mathematical-frameworks--tools)
13. [Playtesting Methodology](#13-playtesting-methodology)
14. [Balance Red Flags Checklist](#14-balance-red-flags-checklist)
15. [References & Comparable Games](#15-references--comparable-games)

---

## 1. Core Balance Philosophy

### What "Balanced" Means for This Game

Balance in Red Rising does **not** mean symmetry. It means:

- **Equitable opportunity**: Every House should have a viable path to victory, even if those paths are radically different.
- **Meaningful choices**: No action, strategy, or House should be strictly dominant. Players should face genuine trade-offs.
- **Satisfying arcs**: Games should feel contested throughout. Neither guaranteed victory nor hopeless positions should emerge before the midgame.
- **Asymmetric parity**: Houses should win at roughly equal rates (~25% each in a 4-player game) across many games, while feeling dramatically different to play.

### The Three Pillars of Balance

Drawing from Engelstein & Shalev's framework and established design practice:

1. **Transitive Balance** — Can every strategy be countered? No single approach should dominate all others. The game should reward adaptation.
2. **Intransitive Balance** — Do rock-paper-scissors dynamics exist between Houses/strategies? Healthy intransitivity creates matchup variety without creating auto-wins.
3. **Frustrability** — Can players meaningfully disrupt each other's plans? A strategy that cannot be interacted with is a strategy that cannot be balanced.

### The Golden Rule

> **If a mechanic consistently produces the same outcome regardless of player decisions, it is a balance problem.**

Randomness, asymmetry, and hidden information should amplify decision-making, not replace it.

---

## 2. Asymmetric Faction Balance

### Design Principles

From Engelstein & Shalev (ACT-12, Variable Player Powers): Variable player powers improve replayability and thematic immersion, but *"increase complexity and cognitive load."* The most successful asymmetric games are built on **simple frameworks** that allow powers to diverge. Cosmic Encounter's simple combat resolution lets its wild powers shine; Root's shared action vocabulary (move, battle, craft) anchors its wildly different factions.

**Key principles for Red Rising's 4 base Houses (Ceres/Jupiter = expansion):**

#### 2.1 Faction Power Budget

Every House ability must be expressible in terms of a **common currency**. For Red Rising, that currency is **effective actions per round** (tempo).

| Power Type | Approximate Value |
|---|---|
| Enhanced scouting (e.g., Minerva's Owl's Wisdom) | ~0.5-1.0 actions |
| +1 combat strength (conditional) | ~0.5 actions |
| Resource generation bonus | ~0.3-0.7 actions (depends on scarcity) |
| Terrain penalty immunity (Diana's Phantom Stride) | ~0.5-1.0 actions (movement efficiency) |
| Free rally after combat (Mars/Apollo) | ~0.5 actions per combat |
| Extended movement range (Apollo) | ~0.5-1.0 actions (positional advantage) |

Each House passive should be worth roughly **0.5-1.0 effective actions per round**. If a passive is worth significantly more, it will dominate; significantly less, and the House will underperform.

#### 2.2 Matchup Matrix Target

In a well-balanced asymmetric game:

- No House should have a winrate above **55%** against any single other House in a 2-player matchup.
- No House should have a winrate below **40%** against any single other House.
- The **spread** (highest winrate minus lowest) for any House across all matchups should be < 15 percentage points.
- In 4-player games, balance is moderated by table politics — but no House should consistently finish last.

**Comparable targets from published games:**
- Root (Leder Games): Aims for 25% winrate per faction in 4-player (±5%). The Marquise consistently underperformed until expansion rebalancing.
- Dune (2019 reprint): Accepts wider variance (~15-35% per faction) because negotiation corrects imbalances.
- Spirit Island: Uses difficulty ratings per spirit to communicate power differences rather than forcing parity.

#### 2.3 The Compensation Principle

Strong passive abilities should come with **offsetting constraints**:

| House | Strong In | Should Be Weak In |
|---|---|---|
| Mars | Combat, comeback momentum | Information, scouting, early game |
| Minerva | Information, prediction | Raw combat, unit count |
| Apollo | Mobility, disruption | Holding territory, sustained defense |
| Diana | Stealth, ambush, mobility | Open-field combat, isolated starting position |
| Ceres | Economy, attrition | Early tempo, combat strength |
| Jupiter | Defense, fortress holding | Mobility, offensive reach |

**Watch for:** A House that is strong in its intended area AND not weak in its intended weakness. This indicates a power budget overrun.

#### 2.4 Once-Per-Game Abilities

From Engelstein & Shalev (ACT-13): *"Because they can only be performed once, the designer has great latitude to make them very powerful."* The threat of using the ability adds a timing dimension not present in always-on powers.

**Balance rule for once-per-game powers:**
- They should be worth approximately **3-5 normal actions** in impact.
- They should have a clear **optimal window** (not always best on turn 1 or turn 12).
- Their power should be **telegraphed** — opponents should be able to anticipate and partially counter them.
- Using them should represent a meaningful **opportunity cost** (e.g., spending the power now vs. holding the threat of it).

---

## 3. Action Economy

### Unit Orders System Balance

*(Updated: The game uses a no-action-limit unit orders system, not a fixed 3-action system. Each unit gets 1 free move + 1 order per turn. Army size IS the action budget.)*

From Engelstein & Shalev (ACT-01): Action systems give players flexibility while allowing designers to control pacing. In Red Rising, action count scales with army size — more units = more orders, but also more Food. The economic constraint replaces a fixed action cap.

#### 3.1 Order Efficiency Spectrum

All orders should fall within a **bounded efficiency range**:

| Efficiency Tier | Orders | Design Intent |
|---|---|---|
| **High efficiency** (clear immediate value) | Move Again, Attack, Gather | Core gameplay loop; should always feel worthwhile |
| **Medium efficiency** (situational value) | Rally, Deploy, Hold | Powerful in context; wasted if mistimed |
| **Low efficiency** (investment orders) | Withdraw, Build Fortification, Recruit | Pay now, benefit later; should compound over time |
| **Variable efficiency** (skill-dependent) | Search Discovery Site | Reward mastery and timing |

**Balance rule:** No order should be **strictly dominated** by another. If "Gather" is always better than "Hold," then Hold needs additional benefit. If "Attack" always beats "Rally," Rally's recovery value should increase.

#### 3.2 Tempo Balance

- **Tempo advantage** = having more effective units than your opponent doing useful things each turn.
- The army-as-action-budget system means tempo advantage comes from having more ACTIVE units, not from a fixed action pool. Losing units to starvation or combat directly reduces your actions per turn.
- House passives that grant free actions (Minerva's Tactician scouting 2 hexes for free) create tempo advantages. These must be **bounded** — worth ~1 order per turn at most.
- **Tempo traps**: Orders that feel productive but don't advance any victory condition. Playtesting should identify if any order is consistently given but doesn't correlate with winning.

#### 3.3 Analysis Paralysis Prevention

With each unit getting 1 order, the decision per unit is simple (which order?). The cognitive load comes from coordinating many units:
- Ensure player aids clearly categorize orders (movement, combat, economy, information).
- Most turns should sound like: "These 3 keep gathering, these 2 hold, this one moves." Quick declarations for unchanged units.
- The **cognitive load** per turn should stay under ~60 seconds for experienced players with 10 units.

---

## 4. Resource Economy

### Single-Resource (Food) Economy

From Engelstein & Shalev (ECO-05, ECO-06): Income systems should foster *"a sense of growth and forward progress."* The timing and amount of income are critical design levers.

The game uses a **single resource: Food**. Tech and Intel have been removed entirely. This simplification sharpens the core tension — every unit of Food spent on fortifications or recruitment is Food not spent on keeping your army alive. There is no resource conversion, no espionage economy, and no multi-resource optimization puzzle. The strategic depth comes from *where* you gather, not *what* you gather.

#### 4.1 Hex Economy: Fertile vs. Barren

Every hex on the map is either **Fertile** (produces 1 Food when gathered) or **Barren** (produces nothing). Castles produce 1 Food when gathered.

| Hex Type | Count | Food Output | Strategic Role |
|---|---|---|---|
| **Fertile** | 54 | 1 Food per gather | Core economy; territorial objectives |
| **Barren** | 26 | 0 | Transit corridors, defensive terrain, strategic positioning |
| **Castle** | 10 | 1 Food per gather | High-value objectives (VP + economy) |

**Why this works:** With 54 Fertile hexes across 4 players, the theoretical maximum per player (~13-14 Fertile hexes) produces enough Food to sustain a mid-sized army but not enough to fund unlimited recruitment AND fortification. Players must choose between growing their army and fortifying their positions.

#### 4.2 Per-Hex Income (Anti-Snowball Design)

The decision to generate Food **per hex, not per unit** is a critical anti-snowball mechanism.

**Mathematical justification:** In per-unit systems, doubling your army doubles your income, creating exponential growth (n → 2n → 4n). In per-hex systems, income growth is bounded by map control, which requires spatial commitment and is vulnerable to attack.

**Balance checks:**
- Maximum possible hex control by one player should yield income that doesn't allow that player to outspend all opponents combined by more than 2:1.
- A player controlling 20 hexes should generate roughly 50-75% more Food than a player controlling 10 hexes — significant but not insurmountable.
- With only 54 Fertile hexes (plus 10 castles), a player holding 20 hexes likely controls ~12-14 Fertile hexes. That's roughly 12-14 Food per round of gathering — enough to sustain ~12 units through starvation, with little left for recruitment or fortification.

#### 4.3 Food Spending Balance

Food serves multiple competing purposes, creating natural tension:

| Expenditure | Cost | Frequency | Design Intent |
|---|---|---|---|
| **Starvation** | 1 per unit per round (Act I), scaling | Every round | Baseline drain; army size = burn rate |
| **Recruitment** | Food per recruit | As needed | Growth competes with sustenance |
| **Build Fortification** | 4 Food | Situational | Expensive investment; must control enough Fertile hexes to afford |
| **No conversion** | N/A | N/A | No way to convert Food into other advantages — spend it or lose it to starvation |

**Balance implications:**
- The economy is deliberately **tight**. Players should feel perpetual Food pressure, not abundance.
- **Build Fortification at 4 Food** is a major commitment — equivalent to sustaining 4 units for a round. This makes fortification a strategic investment, not a routine action.
- Equipment is obtained **only** through Discovery Sites and castle captures, not crafted. This removes an economic sink and makes exploration and aggression the path to equipment.

#### 4.4 Food Stockpile Limits

**Decision: No cap.** Natural economic drains prevent hoarding without an artificial cap:
- **Starvation** (1 Food per unit per round in Act I, scaling in Acts II-III) creates constant Food drain.
- **Recruitment** costs Food. Growing your army burns your reserves.
- **Build Fortification** (4 Food) is expensive enough to drain reserves when used.

Track during playtesting: average Food stockpile at rounds 4, 8, 12. If Food routinely exceeds 10, the economy is too generous — consider increasing starvation costs or reducing Fertile hex density.

---

## 5. Combat Balance

### Deterministic Combat System (v3.0)

Combat is fully deterministic. No dice. Count Alert units (+1 each), At Ease units (+0 each), add modifiers, compare totals. Higher wins, ties to defender. Margin determines subdues.

The design moved away from Risk-style dice because dice put drama in the resolution rather than the decisions. Deterministic combat means drama comes from positioning, readiness management, Reserve Track deployment, and the Tactics Card bluff.

#### 5.1 Strength Counting Balance

| Unit State | Strength | Notes |
|---|---|---|
| Alert unit | +1 | Core combat value |
| At Ease unit | +0 | Present but not fighting effectively |
| At Ease in Forest | +1 | Forest combat bonus (natural cover) |
| Special units | Varies | Howler = 2 Alert, Legionnaire = +1 to all defenders, etc. |

**Margin of victory table:**

| Margin | Result |
|---|---|
| 0 (tie) | Defender wins, no subdues |
| 1-2 | 1 unit subdued |
| 3-4 | 2 units subdued |
| 5-6 | 3 units subdued |
| 7+ | 4 units subdued |

**Balance targets:**
- **Defender advantage (ties) should matter.** In roughly equal combats, the tie-to-defender rule gives defenders a ~5% edge in close fights. This is correct — attacking should be a deliberate choice, not a coin flip.
- **Tactics Cards are the uncertainty.** Without cards, combat is completely predictable. With one card per side (simultaneous reveal), a +2 swing is common. This means a margin of 1-2 can flip to a loss. The uncertainty range is bounded and skill-driven (earning and choosing cards).
- **Conversions should be rare.** 2:1 conversion ratio (2 subdues = 1 convert opportunity). With typical margins of 1-3, conversions require decisive victories or Tactics Card combos.

#### 5.2 Combat Decision Quality

Good combat should reward:
1. **Choosing when to fight** (most important) — attacking At Ease defenders
2. **Choosing where to fight** — forest bonus, castle fortification, terrain modifiers
3. **Readiness management** — keeping units Alert costs gathering, but At Ease units contribute nothing to combat
4. **Tactics Card timing** — when to play your card, which card to use, whether to hold cards for later

**The drama is in the setup, not the resolution.** When combat resolves, players should think "I positioned perfectly" or "I should have scouted first" — not "the cards screwed me."

#### 5.3 Snowball Prevention in Combat

The conversion mechanic is inherently snowball-prone. Mitigating factors:

- **2:1 conversion ratio**: Even a margin of 7 only subdues 4 and converts 2. Routs aren't catastrophic.
- **Subdued units remain in hex**: Creates rally opportunities and counter-attack incentives.
- **Deterministic rally (1 order = 1 unit)**: Recovery is reliable, encouraging counter-attacks.
- **Mars' Red Rage**: +1 when outnumbered. Being beaten makes Mars stronger in subsequent fights.
- **Blood Rally**: Mars wins → free rally anywhere. Subduing Mars without converting creates a hydra.
- **Monitor**: If the winner of the first combat wins the overall game more than 60% of the time, snowballing is a problem.

---

## 5B. Readiness System Balance

### Alert / At Ease Tuning

The Readiness System (see `mechanics/READINESS_SYSTEM.md`) creates the game's core tactical tradeoff: economy vs. defense. Key balance targets:

#### Tuning Levers

| Lever | Current Value | Adjustment Direction |
|---|---|---|
| At Ease combat strength | +0 (vs Alert +1) | If ambushes feel too weak, make At Ease actively negative (-1). If too punishing, give At Ease +0.5 (round down). |
| Forest combat bonus | At Ease in Forest = +1 | If forests are too defensive, remove this bonus. If too weak, extend to +2. |
| Deployment Strike threshold | All defenders At Ease | If too hard to trigger, change to "majority At Ease." If too easy, require numerical superiority too. |
| All Houses deploy Alert from Reserve Track | Yes (universal) | If Reserve Track is too strong, deploy as At Ease. If too weak, add +1 bonus on deployment turn. |
| Passive scouting range | 1 hex (7-hex awareness zone) | If scouting is too strong, reduce to same-hex only. If too weak, extend to 2 hexes. |
| Minerva's Prepared Positions | At Ease fight as Alert when defending | If Minerva is unkillable, limit to 1 combat per round. If too weak, extend to attacking. |

#### Balance Red Flags — Readiness

- [ ] Players never go Alert (At Ease penalty is too mild, or Alert's opportunity cost is too high)
- [ ] Players are always Alert (ambush threat is overtuned, economy suffers)
- [ ] Deployment Strikes happen in > 60% of Reserve Track deployments (defenders can't stay Alert everywhere)
- [ ] Deployment Strikes happen in < 20% of deployments (At Ease is too rare)
- [ ] Diana wins > 30% of 4-player games (The Hunt + Phantom Stride combo too strong)
- [ ] Minerva never loses a defensive combat (Prepared Positions makes ambushing impossible)
- [ ] Passive scouting blocks > 60% of Reserve Track deployments (scouting too strong, Reserve Track feels useless)

#### Target Feel

The ideal game should have roughly:
- **40-50%** of combats involve at least one side At Ease (ambush is common but not universal)
- **2-3 Deployment Strikes per game** (dramatic moments, not routine)
- Players spending **~25-30%** of their actions on Alert (meaningful cost, not dominant strategy)

---

## 6. Hidden Information & the Reserve Track

### Information Asymmetry Balance

From Engelstein & Shalev (UNC-07, UNC-08, MOV-24): Hidden information *"creates uncertainty during any given play"* and *"variety in repeated plays."* Hidden movement specifically requires *"actions taken without knowledge of the other players"* and *"rules relating to this activity should be as simple as possible."*

The Reserve Track is an **Anchor/Distance system** similar to War of the Ring's Fellowship track — the book explicitly identifies this as a pattern that *"does not require paper tracking"* and is *"far less susceptible to human error."*

#### 6.1 The Information Spectrum

The game must maintain a **healthy balance** between known and unknown:

| Information Type | Example in Red Rising | Balance Role |
|---|---|---|
| **Fully known** | Map layout, terrain, Fertile/Barren hexes, unit counts on board | Strategic planning baseline |
| **Partially known** | Reserve Track (know count, space, origin — not destination) | Creates prediction/deduction gameplay |
| **Constrainable** | Passive scouting blocks Reserve Track deployment within 1 hex of Alert units | Rewards positional commitment |
| **Fully hidden** | Tactics Cards in hand, exact Reserve Track deployment target, castle garrison strength | Creates surprise and bluffing |

**The golden ratio of hidden information:** Players should feel they have **enough information to make informed decisions** but **not enough to guarantee outcomes**. In practice, this means ~60-70% of game-relevant information should be known or discoverable, and ~30-40% should be hidden.

#### 6.2 Reserve Track Deployment Range Balance

| Track Space | Turns Hidden | Deployment Range | Risk/Reward |
|---|---|---|---|
| Space 1 | 1 turn | 3 hexes | Low surprise, low risk, fast |
| Space 2 | 2 turns | 6 hexes | Moderate surprise, moderate risk |
| Space 3 | 3 turns | 9 hexes | High surprise, high risk, slow |

**Balance concerns:**
- **Space 3 (9 hexes)** covers a huge portion of the 90-hex map. Passive scouting (Alert units blocking deployment within 1 hex) is the primary constraint — players must spread Alert units to block deployment zones.
- **Playtesting metric**: Track how often Space 3 deployments are blocked by passive scouting vs. landing uncontested. Target: blocked ~30-40% of the time.
- **The economic cost of scouting** is keeping units Alert (they can't gather). This creates the core economy-vs-defense tension. No Intel cost, no order cost — just the opportunity cost of not gathering.

#### 6.3 Diana's Information Advantages

Diana's Shadow unit (moves through enemy hexes without triggering combat) and Lunar Eclipse (all scouting fails globally for 1 round) give Diana strong information-asymmetry tools. These must be **balanced by other weaknesses**:

- Diana has an **isolated starting position with no defensive bonuses** — forces early expansion or risks being contained.
- Diana is weak in **open terrain combat** (no defensive abilities, no combat bonuses).
- Diana's The Hunt (post-combat advance) rewards aggression but requires winning fights first.
- **Monitor**: If Diana's winrate exceeds 30% in 4-player games, Lunar Eclipse may be too strong. First tuning lever: reduce Lunar Eclipse duration or limit its scope.

---

## 7. Map & Spatial Balance

### 90-Hex Map Balance

From Engelstein & Shalev (ARC-01, ARC-05, ARC-06): Areas in control games need **parameters** that drive strategic decisions — resources, defensive value, connectivity, and special abilities. Force projection (how far units threaten) shapes the entire spatial game.

#### 7.1 Starting Position Equity

Each House's starting zone must provide **equivalent strategic opportunity**, not identical resources:

**Evaluation criteria for each starting zone:**
1. **Resource access** (within 3 hexes): How many Fertile hexes can the House reach in 2-3 rounds?
2. **Defensibility**: How many borders must be defended? Are there natural chokepoints?
3. **Expansion options**: How many uncontested hexes are available before meeting another House?
4. **Strategic target proximity**: Distance to Castles, Watchtowers, Cavern entrances, Discovery Sites.
5. **Thematic fit**: Does the starting position match the House's intended playstyle?

**Balance metric**: Count the **total Fertile hexes** accessible within 1, 2, and 3 rounds for each House. These should be within **20%** of each other at the 2-round mark.

#### 7.2 Map Control & Domination Victory

Domination victory requires 34+ hexes (~38% of 90-hex map). This threshold must be:
- **Achievable** by any House, but requiring significant military and territorial investment.
- **Interruptible** — opponents must have time to recognize and respond to a domination push.
- **Not the default ending** — most games should end by VP or flag capture, not domination. Domination should be the "I'm clearly winning" finisher.

**Check**: In playtesting, domination victories should occur in < 25% of games. If higher, the map may be too easy to sweep; if 0%, the threshold may be unreachable.

#### 7.3 Terrain Value Assessment

| Terrain | Movement Cost | Combat Modifier | Resource | Strategic Value |
|---|---|---|---|---|
| Plains | 1 | None | Varies | Mobility corridors |
| Mountains | Full turn to enter, arrive At Ease | Difficult terrain (natural defense through movement cost) | Barren (mostly) | Defensive strongpoints; Jupiter ignores penalty |
| Forest | 1 | At Ease units fight at +1 (forest combat bonus) | Fertile (mostly) | Diana's advantage; ambush terrain |
| River | 1 (between connected river hexes) | +1 defenders (river crossing penalty) | Varies | Fast transit between connected hexes |
| Castle | 1 | +2 fortification (garrison fights as Alert) | 1 Food | Highest value; contested objectives |

**Balance concern**: Mountains' whole-turn-to-enter cost is already severe. Jupiter's ability to ignore it is their defining advantage — monitor whether it makes their home territory impregnable. Forest combat bonus (+1 for At Ease in forests) applies to ALL Houses, not just Diana. Mountains are mostly Barren, making them strategically valuable for defense but economically dead — holding Mountain hexes costs Food (starvation) without producing any.

#### 7.4 Chokepoint & Connectivity Analysis

- Every starting zone should have **at least 2 distinct expansion routes** to prevent a single opponent from bottling up a House.
- **Subterranean Caverns** (hexes 12, 31, 47) provide secret movement shortcuts. Their placement must not disproportionately benefit one House's starting position.
- The **Argos River** as a central highway should be equidistant from multiple starting zones.

---

## 8. Victory Condition Balance

### Multiple Victory Paths

From Engelstein & Shalev (VIC-01, VIC-03, VIC-15): Multiple victory conditions create strategic diversity and prevent deterministic play. Circuit Breaker/Sudden Death conditions (flag capture, domination) *"help end a game once one player is far in front"* and *"open different strategic options."*

The game has three victory conditions:
1. **Flag Capture** — Subdue and hold all enemy flag-bearers (Sudden Death / Circuit Breaker)
2. **Domination** — Control 34+ hexes (Sudden Death / Circuit Breaker)
3. **Victory Points** — Highest VP after 12 rounds (Fixed Rounds fallback)

#### 8.1 Victory Condition Pacing

Each condition should become **achievable at different game stages**:

| Condition | Earliest Achievable | Typical Window | Design Intent |
|---|---|---|---|
| Flag Capture | Round 4-5 | Round 6-10 | Aggressive, targeted, can end games early |
| Domination | Round 7-8 | Round 9-12 | Requires sustained military success |
| VP Track | Round 12 (fixed) | Round 12 | Safety net; rewards balanced play |

**Balance rules:**
- If Flag Capture is achievable before Round 4, flags are too vulnerable.
- If no game ever ends before Round 12, the Sudden Death conditions are too hard to trigger.
- Target: ~30% of games end by Flag Capture, ~15% by Domination, ~55% by VP Track. Adjust flag/domination difficulty if ratios are far off.

#### 8.2 Temporary vs. Permanent VP

From Engelstein & Shalev (VIC-03): *"Having a mix of temporary and permanent points... both drives the game towards a conclusion and offers opportunities for players to make a sudden grab for victory."*

- **Castle control (3 VP each)**: Temporary — can be taken. Creates contestable territory.
- **Objective cards**: Permanent once scored. Drives the game toward conclusion.
- **Valor tokens**: Semi-temporary (rotate each round). Creates round-by-round tactical goals.

**Balance rule**: At least 40% of VP should come from **temporary sources** to maintain contestability. If VP is mostly permanent, early leaders will coast; if VP is mostly temporary, late-game players will steal wins without earning them.

---

## 9. Catch-Up Mechanics & Runaway Leader Prevention

### The Comeback Balance

From Engelstein & Shalev (VIC-18, Catch the Leader): *"If [Catch the Leader] is too strong, it can be advantageous for players to sandbag... this may or may not be desirable."* The opposite — snowballing — is equally dangerous: *"where the game mechanisms make it easier for players in the lead to get further ahead."*

#### 9.1 Built-In Catch-Up Mechanisms

Red Rising has several anti-snowball features. Each must be calibrated:

| Mechanism | Anti-Snowball Effect | Risk If Too Strong |
|---|---|---|
| Per-hex Food generation | Income grows linearly, not exponentially | — (core design; no risk) |
| 2:1 conversion ratio | Combat victories don't fully absorb enemy forces | Battles feel pointless if conversion rarely occurs |
| Subdued units can rally (1 order = 1 unit) | Losses are temporary, not permanent | Never-ending attrition; battles don't resolve |
| Mars' Red Rage (+1 when outnumbered) | Being outnumbered makes Mars stronger | Mars actively avoids reinforcement |
| Proctor card distribution (5 catch-up / 19 neutral / 6 pressure) | Trailing players get help, leader faces obstacles | Leader feels unfairly targeted |
| Deterministic combat (strength counting) | Large armies add strength linearly, not exponentially | Large army advantage is clear but bounded |
| Tactics Cards (one per side, simultaneous) | Underdog can swing combat with the right card | Cards feel "unfair" if they consistently override positioning |

#### 9.2 Proctor Card Balance (Catch-Up vs. Frustration)

The Proctor Card distribution (5 catch-up / 19 neutral / 6 pressure across 30 cards):

**Calibration guidelines:**
- Catch-up Proctor cards should give **resources or tempo** to trailing players, not directly punish the leader.
- Pressure Proctor cards should create **vulnerability windows**, not remove hard-earned advantages.
- "Feel test": After a pressure event, the leading player should think *"I need to adapt"* not *"I got screwed."*
- If playtesting reveals that the player in 1st going into the last round wins > 70% of the time, increase catch-up card count. If < 40%, reduce it.
- Proctor cards are drawn 1 per round (30 cards, 12 rounds, ~40% of deck used) — distribution must work even in small samples.

#### 9.3 The Sandbagging Test

**Critical check**: Is it ever optimal to deliberately play poorly to avoid triggering catch-up mechanics? If so, the catch-up system is too aggressive.

In Red Rising: because events affect all players and are drawn from a shared deck (not targeted at the leader), sandbagging should not be viable. Verify during playtesting.

---

## 10. Proctor Cards & Discovery Token Balance

### Proctor Cards (30 cards, 10 per Act)

From Engelstein & Shalev (ACT-17): Events *"can add variety and theme"* but *"if too random and negative, can feel punishing."* Delayed or visible events (like Terra Mystica's scoring tiles) allow planning; surprise events create drama.

**Balance framework for Proctor cards:**
- **Impact magnitude**: No single Proctor card should swing more than ~2 VP worth of advantage. Cards that swing 4+ VP will feel game-deciding rather than game-enhancing.
- **Symmetry of impact**: Cards that affect "all players" are inherently fairer than cards that target one player. Prefer global effects with differential impact (e.g., "all players gain 1 Food" benefits starving players more).
- **Act-appropriate escalation**: Act I cards (Bronze) should introduce minor modifiers. Act II (Silver) should create strategic pivots. Act III (Gold) should accelerate endgame tension.
- **System interaction**: Proctor cards interact with Tactics Cards, Reserve Track, and passive scouting. Cards that grant Tactics Cards or disable scouting have outsized impact — monitor carefully.

### Discovery Tokens (20 tokens)

Discovery Tokens are found at Discovery Sites (6 on the map) and provide varied rewards:
- Some grant Tactics Cards (high value — essentially earning a combat modifier through exploration)
- Some grant resources or equipment
- Some trigger negative events
- **Critical check**: Are negative tokens so bad that players avoid Discovery Sites entirely? If so, reduce severity or increase beneficial token quality.
- **Tactics Card economy check**: If Discovery Tokens are the most reliable source of Tactics Cards, exploration-focused Houses gain disproportionate combat advantage.

---

## 11. Balance Anti-Patterns to Avoid

### Known Game Design Pitfalls

| Anti-Pattern | Description | How Red Rising Addresses It | What to Watch For |
|---|---|---|---|
| **Exponential growth** | Resources/power compound multiplicatively | Per-hex income; deterministic strength counting (linear, not exponential) | Any mechanic where doubling inputs more-than-doubles outputs |
| **Rich get richer** | Leading player's advantage self-reinforces | 2:1 conversion ratio caps gains; Proctor cards pressure leaders | Winner of first combat winning > 60% of games |
| **Kingmaking** | Eliminated or trailing player decides winner | No elimination; all players stay competitive via multiple VP paths | Last-place player's final actions determining 1st place |
| **Analysis paralysis** | Too many options freeze decision-making | 1 order per unit + bounded order menu; most units repeat orders | Average turn time > 3 minutes per player in 4-player games |
| **First-player advantage** | Going first provides compounding benefits | Rotating first player each round | First player winning > 30% in 4-player games |
| **Dominant strategy** | One path is always optimal regardless of context | Asymmetric powers + multiple victory conditions + Tactics Card variety | Same order sequence appearing in >50% of winning games |
| **Dead turns** | Turns where nothing meaningful happens | Each unit acts every round; Proctor cards each round | Players giving Hold orders to >50% of units consistently |
| **Death spiral** | Losing makes you weaker, leading to more losing | Deterministic rally (1 order = 1 unit); no elimination; conversion caps | Players mathematically eliminated before Round 8 |
| **Quarterbacking** | One player directs others (less relevant in competitive) | N/A (competitive game) | N/A |
| **Rules ambiguity** | Edge cases cause disputes | Clear rulebook; playtesting FAQ; player aid cards | Any rule that requires >1 minute of discussion to resolve |

---

## 12. Mathematical Frameworks & Tools

### Expected Value Analysis

For each House, calculate the **expected Food income**, **combat efficiency**, and **VP accumulation rate** across game stages:

#### 12.1 Food Income Model

```
Expected_Food_Income(House, Round) = Σ (controlled_fertile_hexes × 1) + castle_food + passive_bonus
```

Track this for each House across a typical game arc. All Houses should converge to **within 25%** of each other by Round 6 (after initial expansion).

#### 12.2 Combat Expected Value

For any given battle (A attackers vs. D defenders):
```
E[Subdue] = f(A, D, terrain_modifier, house_bonus)
E[Convert] = E[Subdue] / 2 (rounded down)
E[Net_Unit_Swing] = E[Subdue_enemy] + E[Convert_enemy] - E[Subdue_own]
```

The attacker should have **positive expected net unit swing** only when attacking at ≥ 1.5:1 odds or with terrain advantage. At even odds, expected net swing should be **near zero or slightly negative** (defender advantage).

#### 12.3 Tempo Valuation

Assign a **tempo value** to every game element:

| Element | Tempo Value (in actions) |
|---|---|
| 1 Food | ~0.3 actions (1 action to gather on a Fertile hex) |
| 1 Unit recruited | ~1.5 actions (gather Food + recruit action) |
| 1 Hex controlled | ~0.5-1.0 actions (move + possible combat) |
| 1 Fertile hex controlled | ~0.8-1.2 actions (hex value + Food income) |
| 1 VP | ~1.5-2.0 actions (varies by source) |

Use these to compare House abilities, card effects, and equipment on a **common scale**.

#### 12.4 Nash Equilibrium Considerations

In a well-balanced game, no House should have a **dominant strategy** — a strategy that's optimal regardless of what opponents do.

**Test**: For each House, identify the 2-3 most common strategies. If one strategy beats all others regardless of opponent composition, it's dominant and needs nerfing. If each strategy is countered by at least one other, the game has healthy strategic diversity.

---

## 13. Playtesting Methodology

### Structured Testing Phases

#### Phase 1: Core Mechanics Validation (2-Player, Mars vs. Diana)
- **Goal**: Does the game function? Do turns flow? Does deterministic combat resolve cleanly?
- **Duration**: 6-round shortened variant (Acts I + half of II)
- **Metrics**: Turn length, order frequency distribution, Tactics Cards played, rules questions per game
- **Sample size**: 5-8 games minimum
- **Pass criteria**: Average turn < 3 minutes; no unresolvable rules disputes; at least 1 Deployment Strike attempted

#### Phase 2: Asymmetry Testing (2-Player, All Matchups)
- **Goal**: Are all House matchups playable?
- **Duration**: Full 12-round games
- **Matchups**: All 6 unique base House pairs (minimum 3 games each = 18 games)
- **Metrics**: Winrates per matchup, VP differentials, game-ending condition frequency, Tactics Card acquisition rates
- **Red flags**: Any matchup with > 70% winrate for one side after 5+ games

#### Phase 3: Multiplayer Balance (4-Player)
- **Goal**: Do politics and multiple opponents create balanced play?
- **Duration**: Full 12-round games
- **Metrics**: Finishing position distribution per House, passive scouting block rate, lead changes per game
- **Sample size**: 15-20 games
- **Red flags**: Any House consistently finishing 1st or last; lead never changing after Round 6

#### Phase 4: Variant Testing (2-Player and 3-Player)
- **Goal**: Does the game work at lower player counts?
- **Duration**: Full games
- **Metrics**: Total game time, map control distribution, victory condition frequency
- **Red flags**: Game exceeding 120 minutes; map feeling empty at 2-player; flag capture too easy/hard at 3-player

### What to Track Per Game

Record for every playtest:
1. **Player/House assignments**
2. **Turn-by-turn order choices** (at minimum, track order type frequencies)
3. **Food stockpile at end of each round** (Rounds 1, 4, 8, 12)
4. **Combat results** (attacker, defender, units involved, Tactics Cards played, margin, outcome)
5. **Reserve Track usage** (withdrawals, deployment ranges, passive scouting blocks)
6. **Tactics Cards earned** (track source: combat wins, castles, Discovery Sites, Proctor cards)
7. **VP sources at game end** (breakdown by category)
8. **Victory condition that ended the game**
9. **Subjective notes**: What felt unfair? What felt exciting? What was confusing?

### Statistical Significance

- For 2-player matchups: **30+ games** per matchup to detect a 60/40 imbalance with 80% confidence. With 6 base matchups, this means ~180 games total for statistical rigor.
- For 4-player: **20+ games** to see faction trends emerge. All 4 base Houses play every game.
- Early playtesting (< 10 games) should focus on **feel and flow**, not winrates.

---

## 14. Balance Red Flags Checklist

Use this checklist during and after each playtest session:

### Immediate Red Flags (Fix Before Next Playtest)
- [ ] A game ended before Round 4 (too-fast victory condition)
- [ ] A player was unable to take meaningful actions for 2+ consecutive turns
- [ ] A rule was unresolvable from the rulebook
- [ ] A combat resulted in total elimination of one side's forces (snowball)
- [ ] A player felt they had zero chance of winning before Round 6

### Concerning Patterns (Track Over Multiple Games)
- [ ] One House wins > 40% of games in a given player count
- [ ] One order is chosen > 40% of the time by all players (dominant order)
- [ ] One order is never chosen by any player (dead order)
- [ ] Food stockpiles regularly exceed 10 (economy too generous, starvation pressure insufficient)
- [ ] Players routinely afford Build Fortification without meaningful sacrifice (4 Food too cheap)
- [ ] Tactics Cards concentrated in one player's hand (> 3 cards, acquisition imbalance)
- [ ] Reserve Track Space 3 is used in > 70% of deployments (Space 1-2 obsolete)
- [ ] Reserve Track Space 3 is used in < 10% of deployments (Space 3 too risky)
- [ ] Passive scouting blocks > 60% of Reserve Track deployments (Reserve Track feels useless)
- [ ] Games routinely go to Round 12 (sudden death conditions too hard)
- [ ] Games routinely end before Round 8 (sudden death conditions too easy)
- [ ] First player wins more than expected (> 30% in 4-player)

### House-Specific Watch Items
- [ ] **Mars**: Red Rage bonus makes Mars deliberately avoid reinforcing (perverse incentive to stay outnumbered)
- [ ] **Minerva**: Owl's Wisdom + Tactician = too much free information (passive scouting on steroids)
- [ ] **Apollo**: 2-hex free move makes Apollo unchallengeable at range (can't be cornered)
- [ ] **Diana**: Isolated starting position + no defensive bonuses leaves Diana uncompetitive (too weak early game)
- [ ] **Ceres** (expansion): Economic advantage doesn't translate to victory (too slow to win)
- [ ] **Jupiter** (expansion): Castle defense + Mountain Kings makes Jupiter impossible to dislodge (turtle wins)

---

## 15. References & Comparable Games

### Primary Reference
- Engelstein, G. & Shalev, I. (2020). *Building Blocks of Tabletop Game Design: An Encyclopedia of Mechanisms.* CRC Press. — Key sections: ACT-01, ACT-12, ACT-13, ACT-17, RES-01, RES-04, RES-14, VIC-01, VIC-03, VIC-09, VIC-15, VIC-18, UNC-07, UNC-08, UNC-09, MOV-24, ARC-01 through ARC-07, ECO-05, ECO-06, ECO-17.

### Comparable Games (Design Lessons)

| Game | Relevant Mechanism | Lesson for Red Rising |
|---|---|---|
| **Root** | Asymmetric factions, area control | Simple shared framework + radical faction differences; ongoing balance patches |
| **War of the Ring** | Anchor/Distance hidden movement | Reserve Track validation — proven mechanic, no paper tracking |
| **Dune (2019)** | Asymmetric powers, force commitment | Wild asymmetry works when negotiation/politics moderate balance |
| **Kemet** | Temporary/permanent VP, battle-for-VP | Mix VP types for dynamic endgame; reward attacking |
| **Scythe** | Multi-resource economy, area control | Resource pacing — early scarcity, mid-game engine, late-game deployment |
| **Risk** | Territory control, combat snowball | Territory snowball problems; why deterministic combat avoids dice-driven frustration |
| **Voidfall** | Deterministic combat, no dice | Inspiration for strength-counting system; drama through positioning not randomness |
| **Twilight Imperium** | 6-faction balance, multiple victory paths | Accept wider balance variance in return for thematic asymmetry |
| **Spirit Island** | Asymmetric difficulty, cooperative balance | Difficulty ratings communicate power differences honestly |
| **Cosmic Encounter** | Variable player powers, simple framework | Simple core + wild powers = replayable chaos |
| **Scotland Yard / Fury of Dracula** | Hidden movement, deduction | Reveal mechanics (surfacing, breadcrumbs) are essential |
| **El Grande** | Area majority, scheduled scoring | Scoring timing creates tension and edge effects |
| **Power Grid** | Catch the Leader (turn order) | Subtle anti-snowball beats heavy-handed rubber-banding |

---

*Last updated: 2026-03-15 — v3.3 systems (Food-only economy, deterministic combat, Tactics Cards, Player Boards, passive scouting)*
*This is a living document. Update after each major playtest session or design conversation.*
