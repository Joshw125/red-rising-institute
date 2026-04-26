# Combat System

## Core Philosophy

Combat is **deterministic and conversion-focused**. No dice. No units die. The Institute is a training ground — the goal is to subdue and convert enemy soldiers, not kill them. Mechanically, this means:
- You can count strength and **predict outcomes** before committing
- The only uncertainty is whether your opponent plays a **Tactics Card**
- Losing a battle doesn't end your game — subdued units can be rallied, and converted units can swing momentum
- Drama comes from **decisions before combat**, not randomness during it

---

## Combat Strength

Each side in combat totals their **Combat Strength:**

| Source | Strength Value |
|--------|---------------|
| Each **Alert** unit (standing) | **+1** |
| Each **At Ease** unit (laying down) | **+0** (not fighting) |
| House passive bonus (if applicable) | Varies |
| Special unit bonus (if applicable) | Varies |
| Terrain modifier | Varies |
| Equipment modifier | Varies |
| Tactics Card (if played) | Varies |

**At Ease units contribute nothing.** They're gathering, building, sleeping — they're not fighting. They're still in the hex and can be subdued/converted, but they don't add to your combat strength.

### Reading the Board

Because standing = Alert and laying = At Ease, you can visually assess any hex's combat strength at a glance:

> *Count the standing tokens. That's the strength. Add terrain. Compare.*

---

## Combat Resolution

### Step 1: Initiate Combat

**Cost:** 1 order (the unit's order for this turn)
**Requirement:** You have at least one unit in the target hex

Combat triggers when:
- You move into an enemy-occupied hex (free move or Move Again order)
- You deploy from the Reserve Track into an enemy-occupied hex (Deployment Strike)

### Step 2: Count Combat Strength

Both sides total their strength:
- Count Alert units (+1 each)
- Add terrain modifiers
- Add equipment modifiers
- Add House passive/special unit bonuses

### Step 3: Tactics Cards (Simultaneous Reveal)

Both attacker and defender may play **1 Tactics Card** from their hand. Cards are revealed simultaneously — neither side knows what the other will play (or whether they'll play at all).

Tactics Cards are the **only source of uncertainty** in combat. See [TACTICS_CARDS.md](TACTICS_CARDS.md) for the full card list.

If neither side plays a card, combat resolves purely on strength comparison.

### Step 4: Compare Totals

**Higher total wins. Ties go to defender** (except Mars attacking while outnumbered — Mars wins ties via Red Rage tie-break, v6.0).

The **margin of victory** (winner's total minus loser's total) determines how many "blows" land on the loser:

| Margin | Blows |
|--------|-------|
| 1-2 | 1 |
| 3-4 | 2 |
| 5-6 | 3 |
| 7+ | 4 |

### Step 5: Aftermath (v6.1)

Blows hit the loser's units in priority order: **Alert non-flag → At Ease non-flag → special unit → flag-bearer last**.

For each blow, in priority order:
- **Conversion**: up to `floor(blows / 2)` non-flag-bearer units are converted to the winner's house. They stay in the hex, Alert, acted, and count toward the winner's 15-unit cap.
- **Flag-bearer hit**: a blow against the flag-bearer captures the flag (Subdued state, stays in hex). In 2-player, this is an instant win.
- **All other loser units retreat** to the loser's Reserve Track Space 1, with the combat hex as the new Removal Marker. They're normal RT units — they advance and deploy normally next turn(s).

The winner takes the hex cleanly. There is no persistent "subdued in hex" state in v6.1. Combat is decisive: win → take the hex, lose → regroup via the Reserve Track.

**Why this works:**
- No cascading combats. The loser's army isn't ground down round after round in the same hex.
- The loser's army isn't destroyed — it's hidden. RT preserves the threat (opponents see units on the track, know deployment radius, don't know destination).
- Forest deployment exemption (v6.0) gives losers a real counter-strike option through Greatwoods or North Woods.

**Example:** Mars 5 vs Diana 3 in hex 41. Margin 2 = 1 blow → 0 conversions (floor(1/2)=0). The hit Diana unit just retreats with the rest. ALL 3 Diana units now on Diana's RT Space 1, marker @ hex 41. Mars 5 holds hex 41 cleanly.

**Example with conversion:** Mars 6 vs Diana 3 in hex 41. Margin 3 = 2 blows → 1 conversion. Mars converts the highest-priority non-flag Diana unit (1 Alert regular). 2 remaining Diana units retreat to RT. Hex 41 has 6 Mars + 1 converted Mars (now on Mars's side) = 7 Mars Alert.

**Example with flag capture:** Mars attacks Diana's lone flag-bearer at hex 60 with 3 Alert. Mars 3 vs Diana 1 = margin 2 = 1 blow. Subdue priority: only 1 Diana unit, the flag-bearer. Flag captured → instant win in 2-player.

---

## Deployment Strike

When deploying from the Reserve Track into a hex where **all defenders are At Ease:**

- Deploying units arrive **Alert** (+1 each to combat strength)
- Defenders contribute **+0** (they're At Ease)
- This is devastating — 5 Alert attackers vs 6 At Ease defenders = 5 vs 0

When deploying near **Alert defenders** (passive scouting blocks direct deployment):
- Deploy outside the Alert unit's awareness zone (2+ hexes away)
- Free move 1 hex closer (now adjacent)
- Use order to enter defender's hex and initiate combat
- Both sides are Alert — fair fight

See [RESERVE_TRACK.md](RESERVE_TRACK.md) for deployment rules and passive scouting.

---

## Terrain Modifiers

| Terrain | Effect |
|---------|--------|
| Mountains | **+1 strength** for defender |
| Forest/Woods | **No combat bonus** (v6.0). Forest protects via concealment instead — Reserve Track deployments INTO forest hexes bypass passive scouting. |
| Highlands | No modifier (Minerva's home — balanced intentionally) |
| Castle (fortified) | **+2 strength** for defender with fortification built |
| Castle (neutral garrison) | Garrison fights as Alert at hidden strength (2-4) |
| River | No modifier, but river hexes allow fast travel |

### Forest Concealment (v6.0 — replaces forest combat cover)

Forest terrain no longer provides a combat defense bonus. Instead, forests are **stealth zones** for the Reserve Track:

- Reserve Track deployments INTO Greatwoods or North Woods hexes ignore passive scouting (Alert sentries within 1 hex do not block forest deployments)
- Diana additionally gets **Forest Hunters** — when she withdraws units from a forest hex, the Removal Marker is hidden for 1 round (opponents don't see units left)

This gives forests a distinct strategic role (stealth/redeployment) instead of letting them become turtling bunkers. Diana still benefits most because Greatwoods is huge, but any house can use forest hexes as a deployment shortcut.

**Why the change (Decision 28, v6.0):** Original forest cover (At Ease defenders +1 each) made gathering inside Greatwoods near-untouchable. Diana's optimal play became "sit and farm" — the exact opposite of design intent. Removing the combat bonus and replacing it with concealment preserves Diana's forest theme while breaking the turtle pattern.

---

## Special Combat Rules

### Flag-Bearers
- **Cannot be converted**, only subdued
- Subdued Flag-bearers can be captured (see Victory Conditions)
- Capturing a Flag-bearer is a major victory condition

### Converted Units
- Immediately join victor's forces
- Count toward victor's 15-unit maximum
- Use victor's color/allegiance from this point forward
- Retain no "loyalty" — they're fully converted

### Subdued Units (v6.1 — only captured flag-bearers)
The Subdued state was retired for in-hex units in v6.1. It now applies **only to captured flag-bearers**:
- A flag-bearer hit by a blow is captured, stays in the hex as Subdued (this triggers the flag-capture win condition)
- Captured flag-bearers cannot move, fight, or gather
- Captured flag-bearers cannot be rallied or "un-captured" (but may be rescued via Tactics Card or recapture by their original house in 4-player games — open design question for the expansion)

All other "would-be-subdued" loser units **retreat to Reserve Track** instead of staying in the hex.

### Maximum Units
- Hard cap: **15 units total per player** (across board + Reserve Track)
- If you would exceed 15 via conversion, you must choose which units to release

---

## Capturing Neutral Castles

Neutral castles have hidden garrison tokens (strength 2-4). Defeating the garrison lets you claim the castle — but only if your **Flag-bearer is present** in the hex.

### Requirements
- Your Flag-bearer must be in the hex (or move into it during combat)
- You must defeat the garrison in combat

### Garrison Combat
- The garrison fights as **Alert** at hidden strength (2, 3, or 4)
- The castle provides **+2 fortification** to the garrison
- Any Alert unit adjacent to a castle can observe the garrison (free, no cost) to peek at garrison strength before committing

### Capture Rewards (v6.0 — scaled up to match the assault cost)

When you defeat the garrison (reduce its strength to 0) and your Flag-bearer is present:

| Garrison Strength | Troops Joining You | Tactics Cards | Other |
|-------------------|--------------------|---------------|-------|
| Strength 2 | **2 units join** | **2 cards** | +5 VP capture event, castle pre-fortified, gather yields 2 Food |
| Strength 3 | **3 units join** | **2 cards** | +5 VP capture event, castle pre-fortified, gather yields 2 Food |
| Strength 4 | **4 units join** | **2 cards** | +5 VP capture event, castle pre-fortified, gather yields 2 Food |

- Surrendered units are Regular units added to your forces in the hex (Alert, count as acted this turn)
- **+5 VP** awarded immediately at the moment of claim (one-time event, irrevocable even if castle is later retaken)
- Castle becomes pre-fortified for new owner (+2 def stays as defender bonus)
- Captured castles produce **2 Food** when gathered (was 1)
- End-of-game holding bonus: 1 VP for neutral castles you still hold, 2 VP for enemy home castles you still hold
- A dedicated 6-unit assault on a strength-3 garrison (gar 3 + fort 2 = 5 def) needs ~7-8 attacker strength to crack — typically over half your starting force, plus Flag-bearer exposure for 1-2 rounds

### Flag-Bearer Risk
Requiring the Flag-bearer for castle capture is a deliberate tension: your Flag-bearer is the unit enemies want to capture for the flag victory condition. You can't safely hide it AND aggressively claim castles. Bold leaders who bring their Flag-bearer to the front lines get rewarded — but they're exposed.

### No Flag-Bearer, No Claim
If you defeat a garrison but your Flag-bearer isn't present, the garrison is destroyed but the castle remains neutral. Another player (or you, later) can claim it by entering with their Flag-bearer — no garrison to fight, just walk in.

---

## The Rally Action (v6.1 — narrowed to Weakened recovery)

Rally restores **Weakened** units (starvation casualties):

**Cost:** 1 order (the unit's order for this turn)
**Process:** Choose 1 Weakened friendly unit in the same hex — restored to Alert.

Rally is deterministic — no dice roll. (In v6.0 Rally also restored Subdued units, but Subdued no longer persists in-hex in v6.1, so Rally is now Weakened-only.)

House-specific recall abilities (NOT rally — they pull from RT):
- **Mars — Blood Rally:** When Mars wins a combat, recall 1 Mars unit from your Reserve Track to the combat hex (Alert, acted). Free.
- **Apollo — Healer's Art:** After any combat Apollo is in (win or lose), recall 1 Apollo unit from your Reserve Track to the combat hex (Alert, acted). Free.

Both abilities reach into the RT to pull a soldier back into the fight, fitting their themes — Mars never quits, Apollo brings reinforcements/healers in any combat.

---

## Combat Examples

### Example 1: Standard Fight
Mars attacks Minerva in a Highland hex.
- Mars: 4 Alert units = **4 strength**
- Minerva: 3 Alert units = **3 strength** (Highlands = no terrain modifier)
- Mars plays no Tactics Card. Minerva plays **Shield Wall** (+2 defense) = **5 strength**
- **Minerva wins by 1.** 1 Mars unit subdued.

### Example 2: Deployment Strike
Diana deploys 5 units from Reserve Track into Apollo's gathering hex. All Apollo units are At Ease.
- Diana: 5 Alert units = **5 strength**
- Apollo: 4 At Ease units = **0 strength**
- **Diana wins by 5.** 3 Apollo units subdued. Diana converts 1 (using 2 of the 3 subdues) and subdues 1.

### Example 3: Forest Attack (v6.0 — no forest cover)
Mars attacks Diana in a Greatwoods hex. Diana has 4 units, all At Ease (gathering).
- Mars: 3 Alert units = **3 strength**
- Diana: 4 At Ease units in forest = **0 strength** (no forest cover anymore)
- **Mars wins by 3.** 2 Diana units subdued.
- Diana's gatherers are now genuinely vulnerable. Forest still helps her via the **Reserve Track** (she can deploy back into Greatwoods even past Mars's Alert sentries) — but the gatherers themselves need real defenders.

### Example 4: Tactics Card Bluff
Apollo has 4 Alert units. Mars has 4 Alert units. Even fight — ties go to defender (Apollo, who holds the hex).
- Mars COULD play a Tactics Card to break the tie... but doesn't want to waste it on a marginal fight.
- Apollo has no Tactics Cards (hasn't earned any yet).
- Both pass. **Tie goes to defender. Apollo holds.** No subdues.
- Mars spent an order attacking and gained nothing. Apollo spent nothing. Tempo advantage: Apollo.

---

## Combat Modifiers Summary

| Situation | Modifier |
|-----------|---------|
| Alert unit | +1 strength |
| At Ease unit | +0 strength |
| At Ease in Forest/Woods | +1 strength (forest cover) |
| Defending in Mountains | +1 strength |
| Defending in fortified Castle | +2 strength |
| Castle garrison defense | Alert, hidden strength 2-4 |
| Mars Red Rage (passive) | +1 when outnumbered, AND wins ties when outnumbered |
| Mars Howler (special unit) | Counts as 2 Alert units |
| Minerva Prepared Positions (defending) | At Ease units fight as Alert |
| Apollo Archer (special unit) | +1 from adjacent hex |
| Diana The Hunt (attacking) | Win → all survivors advance 1 hex |
| Tactics Card | Varies (see TACTICS_CARDS.md) |

---

## Designer Notes

### Why Deterministic?
Dice-based combat (Risk-style) puts drama in the wrong place — in the resolution rather than the decisions. Deterministic combat means the drama is in positioning, readiness management, Reserve Track deployment, and the Tactics Card bluff. You can count strength and know the outcome... unless your opponent has a card you don't know about.

### Why 2:1 Conversion Ratio?
At 1:1, conversion would be too powerful — winning a battle would geometrically multiply your army. At 2:1, conversion is still exciting and impactful but requires genuine combat dominance.

### Why Ties Go to Defender?
Holding ground is easier than taking it. Prevents attacker-always-wins situations where numerically equal forces slug it out. Also creates value for Tactics Cards — breaking a tie is the most common use.

**Mars exception (v6.0):** When Mars attacks while outnumbered, Mars wins ties. This fixes a paradox where Mars's Red Rage +1 only kicked in exactly when Mars was going to lose anyway (since the +1 produced a tie that the defender won). Now Red Rage breaks both the math and the tie when Mars is the underdog.

### Why Do At Ease Units Contribute 0?
This is the core of the readiness system. If At Ease units still fought (even at reduced power), there'd be less incentive to maintain Alert defenders. At +0, At Ease units are truly vulnerable — you MUST keep standing guards or accept the risk.

### Why Forest Concealment Instead of Forest Combat Cover? (v6.0)
Original forest cover (At Ease defenders +1 each) made gathering inside Greatwoods near-untouchable. Diana's optimal play became "sit and farm." Forest concealment (Reserve Track deployments INTO forest bypass passive scouting) preserves Diana's forest theme while breaking the turtle pattern. See DESIGN_HISTORY Decision 28.

### Why Do Combat Losers Retreat to Reserve Track? (v6.1)
The previous rule (subdued units lying in the hex) created cascading combats — the winner attacked the same hex round after round, grinding the loser's stack down through repeated punishment. Forcing losers to retreat to the RT makes each combat a discrete event: you win and take the hex, or you lose and regroup elsewhere. The loser's army isn't destroyed, just temporarily off-board. See DESIGN_HISTORY Decision 29.
