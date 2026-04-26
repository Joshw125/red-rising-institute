# Food Math Validation

> Does the economy survive 12 rounds at current starvation rates?
> **Short answer: Yes — but it's deliberately tight, and each House faces different pressure.**

---

## Setup Assumptions (v6.0 — anti-turtle rebalance)

| Parameter | Value | Source |
|-----------|-------|--------|
| Starting units | 10 per House (8 Regular, 1 Flag-bearer, 1 Special) | House files |
| Starting resources | **7 Food** (was 5) | RULEBOOK.md |
| Max units | 15 per House (board + Reserve Track) | COMBAT.md |
| Gatherer limit | 1 per hex | RESOURCE_ECONOMY.md |
| Fertile hex production | 1 Food per Gatherer | RULEBOOK.md |
| **Captured castle production** | **2 Food per Gatherer** | RULEBOOK.md (v6.0) |
| **Minerva Highland production** | **2 Food per Gatherer** | HOUSE_MINERVA (v6.0 enforced) |
| Resource collection timing | **After** starvation upkeep | TURN_STRUCTURE.md |
| Reserve Track units | Do NOT require Food | ACT_STRUCTURE.md |
| Resource cap | No cap (natural drains prevent hoarding) | Design decision |
| Recruitment cost | **3 Food (all Acts)** | RULEBOOK.md (v6.0 — was 4F in Act I) |

---

## 1. Break-Even Analysis

### Starvation Cost Per Round (v6.0 — gentler in Acts I–II)

| Active Units | Act I (÷5) | Act II (÷5) | Act III (÷3) |
|-------------|-----------|------------|-------------|
| 6 | 2 Food | 2 Food | 2 Food |
| 8 | 2 Food | 2 Food | 3 Food |
| **10** | **2 Food** | **2 Food** | **4 Food** |
| 12 | 3 Food | 3 Food | 4 Food |
| 15 | 3 Food | 3 Food | 5 Food |

### Food Gatherers Needed to Break Even (Fertile = 1 Food, captured castles = 2)

To sustain an army of size N at Act I–II rates, you need only ~2-3 fertile gatherers OR 1-2 captured-castle gatherers.

| Active Units | Act I (1 Food/hex) | Act II (1 Food/hex) | Act III (1 Food/hex) |
|-------------|--------------------|---------------------|---------------------|
| 6 | 2 | 2 | 2 |
| 8 | 2 | 2 | 3 |
| **10** | **2** | **2** | **4** |
| 12 | 3 | 3 | 4 |
| 15 | 3 | 3 | 5 |

A captured castle (2 Food/round) replaces 2 fertile gatherers, freeing units for combat or recruit. This is the strategic payoff for capturing — every castle held is essentially 2 free unit-actions per round.

### Units Free for Military / Other Orders

After assigning enough Gatherers to break even on Food:

| Active Units | Act I (free / %) | Act II (free / %) | Act III (free / %) |
|-------------|-----------------|------------------|-------------------|
| 6 | 4 / 67% | 4 / 67% | 3 / 50% |
| 8 | 6 / 75% | 5 / 63% | 4 / 50% |
| **10** | **7 / 70%** | **6 / 60%** | **5 / 50%** |
| 12 | 9 / 75% | 8 / 67% | 6 / 50% |
| 15 | 11 / 73% | 10 / 67% | 7 / 47% |

**Key insight:** In Act III, exactly **50% of your army** must be dedicated to food production. This naturally halves available military force — elegant escalation that matches the narrative arc.

---

## 2. Per-House Food Economy

### Food Sources Within 2 Hexes of Home Castle

| House | Food Hexes | Castle | Total Direct Food/Round | Act I Need | Surplus/Deficit |
|-------|-----------|--------|------------------------|-----------|----------------|
| **Mars** | 3 | +1 | 4 | 3 | **+1 surplus** |
| **Minerva** | 1 | +1 | 2 | 3 | **−1 deficit** |
| **Apollo** | 3 | +1 | 4 | 3 | **+1 surplus** |
| **Diana** | 5 | +1 | 6 | 3 | **+3 surplus** |

### House-by-House Analysis

#### Mars (Comfortable)

Mars has 3 nearby Food hexes plus the castle. With 4 Food Gatherers producing 4 Food/round against 3 Food starvation in Act I, Mars runs a +1 Food surplus from Round 1. This surplus accumulates for recruitment.

- **Act I:** 4 income vs. 3 cost = +1/round. Can recruit by Round 2 (with 5 starting Food).
- **Act II:** 4 income vs. 4 cost = break even. Needs expansion for recruitment fuel.
- **Act III:** 4 income vs. 5 cost = −1/round. **Must expand to 5+ food sources or shrink army.**
- **Verdict:** Healthy economy. Natural pressure to expand in Act III.

#### Minerva (Tight — By Design)

Minerva has only 1 Food hex and the castle nearby, producing 2 Food/round against a 3 Food/round starvation cost. **Deficit of 1 Food/round from direct gathering.**

However, Minerva's Gatherers in Highland hexes produce **2 Food instead of 1** (Owl's Wisdom bonus). Minerva has ~6 Fertile hexes within 2 hexes of the home castle, but most are Highland hexes rather than standard Food hexes.

| Minerva Setup | Food Gatherers | Highland Gatherers (2F each) | Direct Food | Total Food | Surplus vs. Act I |
|--------------|---------------|------------------------------|-------------|-----------|-------------------|
| Minimum viable | 2 (1 hex + castle) | 1 | 2 | 4 | +1 surplus |
| Recommended | 2 | 2 | 2 | 6 | +3 surplus |
| Defensive (all nearby) | 2 | 3 | 2 | 8 | +5 surplus |

- **Act I:** With 2 base Food + 1-2 Highland Gatherers, Minerva can break even or build a small surplus. 6-7 free units.
- **Act II:** Needs 4-5 Gatherers to sustain 10 units. Highland bonus keeps Minerva viable without heavy expansion.
- **Act III:** Must expand toward North Woods or River food sources. Highland bonus alone cannot sustain a large army.
- **Verdict:** Survivable but constrained. Minerva is food-lean and must expand early toward food-rich territory (Ceres Castle / North Woods conflict). The Highland 2-Food bonus prevents immediate starvation but does not remove expansion pressure.

#### Apollo (Comfortable)

Apollo mirrors Mars — 3 Food hexes + castle = 4 Food/round. Additionally, Apollo's river access provides fast travel toward additional food sources in Acts II–III.

- **Act I:** +1 surplus. Comfortable.
- **Act II:** Break even at 4 income vs. 4 cost. River mobility helps reach new food.
- **Act III:** −1/round. Must expand. River fast travel makes this easier than for most Houses.
- **Verdict:** Solid economy with better expansion mobility than Mars.

#### Diana (Abundant — Offsetting Isolation)

Diana has the strongest food economy by far: 5 Food hexes + castle = 6 Food/round. Against Act I starvation of 3 Food, Diana runs a **+3 surplus** — enough to recruit a new unit every 1-2 rounds.

- **Act I:** +3 surplus. Can recruit aggressively (4 Food cost).
- **Act II:** +2 surplus. Can still recruit (3 Food cost) while sustaining.
- **Act III:** +1 surplus. Breaks even at 10 units with Food to spare. Even at 12 units (6 starvation), Diana has the hexes to support it.
- **Tradeoff:** Diana has **no defensive bonuses** and is geographically isolated in the Greatwoods. Expanding beyond the forest means leaving the terrain Diana knows best.
- **Verdict:** Food-rich but geographically isolated. Diana can build the biggest army but must venture out of the Greatwoods to contest castles and objectives. This is the intended balance lever.

---

## 3. Diana Forest Starvation Exemption

**Resolved rule:** Up to 2 of Diana's units in Forest hexes are exempt from starvation upkeep each round. This replaces all earlier versions (free upkeep for all forest units, Intel-for-Food swap, half upkeep, etc.).

**Why capped at 2:** Diana already has the strongest food economy (+3 surplus in Act I). Unlimited free upkeep in forests would make Diana's economy dominant. Capping at 2 units gives Diana a meaningful but bounded advantage — equivalent to saving 1 Food per round in Act I (2 units exempt reduces starvation from ceil(10/4)=3 to ceil(8/4)=2), scaling to 1 Food saved in Act III (ceil(8/2)=4 vs. ceil(10/2)=5).

**Impact on food math:**

| Act | Normal Starvation (10 units) | With 2-Unit Exemption (8 counted) | Food Saved |
|-----|------------------------------|-----------------------------------|-----------|
| I | 3 Food | 2 Food | 1 Food |
| II | 4 Food | 3 Food | 1 Food |
| III | 5 Food | 4 Food | 1 Food |

**This is a modest advantage** — roughly 1 extra Food per round, equivalent to having 1 additional Gatherer. It rewards Diana for keeping units in the forest (thematic) without breaking the economy. Diana still faces the same Act III pressure as other Houses if fielding a large army.

---

## 4. Key Scenarios

### Scenario A: Round 1 Survival (All Houses)

All Houses start with 5 Food. Starvation is paid **before** collection.

| Step | Detail |
|------|--------|
| **During turn** | Deploy Gatherers to food hexes + castle |
| **Starvation** | 10 active units → ceil(10/4) = 3 Food. Pay 3F → 2F stockpile |
| **Collection** | Gatherers produce Food |

| House | Gatherers by R1 | Food Collected | End R1 Stockpile | Status |
|-------|-----------------|---------------|-----------------|--------|
| Mars | 3 Food + 1 Castle | 4 Food | **6 Food** | ✅ Healthy |
| Minerva | 1 Food + 1 Castle + 1 Highland (2F) | 4 Food | **6 Food** | ✅ Healthy (with Highland bonus) |
| Apollo | 3 Food + 1 Castle | 4 Food | **6 Food** | ✅ Healthy |
| Diana | 4 Food + 1 Castle | 5 Food | **7 Food** | ✅ Surplus |

**Minerva's early game:** With 5 starting Food and the Highland 2-Food Gatherer bonus, Minerva no longer faces a Round 2 starvation crisis. However, Minerva has fewer total Food hexes nearby and must expand sooner than Mars/Apollo to sustain growth in Acts II-III.

**Minerva expansion pressure:** Minerva's Highland Gatherers (2 Food each) keep the home economy viable, but the limited number of Fertile hexes near the home castle means Minerva must push toward the North Woods or Argos River for additional food sources. This is the intended "expand or stagnate" pressure.

### Scenario B: Aggressive Play (Pull Gatherers to Fight)

What happens if you stop gathering to launch an attack?

| Round | Gatherers | Food Income | Starvation (10 units) | Net | Stockpile (cumulative) |
|-------|-----------|------------|----------------------|-----|----------------------|
| 1 | 4 | 4 | 3 | +1 | 4 |
| 2 | 4 | 4 | 3 | +1 | 5 |
| 3 | **0** (all march) | 0 | 3 | −3 | 2 |
| 4 | **0** | 0 | 3 | −3 | 0, then −1 → 1 Weakened |
| 5 | **0** | 0 | 3 (now 9 active) | −3 | 3 Weakened total |

**Conclusion:** You can sustain 2 rounds of zero gathering if you saved up 5+ Food (which the starting stockpile of 5 Food enables from Round 1). By Round 3 of no gathering, units start Weakening. **Aggression has a 2-round clock** before starvation kicks in — you need to win something (capture food hexes, subdue enemy units) or retreat to your economy.

This is excellent. Aggression is viable but time-limited. "Aggression has a clock on it" — confirmed mathematically.

### Scenario C: Recruitment Timing

Can you recruit a new unit, and when?

**Act I Recruitment (4 Food cost):**

| Round | Stockpile (start) | Recruit? | Post-Recruit | Units | Starvation | Income | End |
|-------|-------------------|----------|-------------|-------|-----------|--------|-----|
| 1 | 5 | No | 5 | 10 | 3 | 4 | 6 |
| 2 | 6 | **Yes** (−4F) | 2 | 11 | 3 | 4 | 3 |
| 3 | 3 | No | 3 | 11 | 3 | 4 | 4 |
| 4 | 4 | No | 4 | 11 | 3 | 4 | 5 |

Mars/Apollo can recruit by **Round 2** with 4 Food Gatherers and 5 starting Food. After recruiting, starvation jumps to ceil(11/4) = 3, same as before. Stockpile dips but recovers.

**Act II Recruitment (3 Food cost):** Easier. With a 5F stockpile and 4 Gatherers, you can recruit every 3 rounds sustainably.

**Act III Recruitment:** Nearly impossible. At 5 Food starvation per round with 10 units, there's no surplus for the 3F recruitment cost unless you're running 6+ Food Gatherers. **By design, Act III armies shrink, not grow.** Recruitment in Act III is a luxury only Diana can afford.

### Scenario D: Losing Food Hexes Mid-Game

What if an enemy raids your food production?

**Losing 2 Food Gatherers in Act II (from 4 income to 2):**

| Round | Income | Starvation (10 units) | Net | Impact |
|-------|--------|----------------------|-----|--------|
| Normal | 4 | 4 | 0 | Stable |
| After raid | 2 | 4 | −2 | 2 Weakened/round |
| 2 rounds later | 2 | 3 (8 active) | −1 | Still declining |

**Conclusion:** Losing 2 Food Gatherers creates a death spiral unless you recapture food hexes within 2-3 rounds or pull units back to gather. **Raiding enemy food production is devastating** — confirmed by the math. One successful Deployment Strike on enemy Gatherers can swing the food economy for multiple rounds.

---

## 5. Growth & Decline Curves

### Maximum Sustainable Army by Act

Assuming a player controls enough food hexes:

| Act | Max Sustainable (10 food hexes) | Max Sustainable (6 food hexes) | Max Sustainable (4 food hexes) |
|-----|-------------------------------|-------------------------------|-------------------------------|
| I | 40 (capped at 15) | 24 (capped at 15) | 15 (capped at 15) |
| II | 30 (capped at 15) | 18 (capped at 15) | 12 |
| III | 20 (capped at 15) | 12 | **8** |

The 15-unit hard cap means food doesn't constrain army size in Acts I-II unless your food economy is very weak. In **Act III**, even 6 food hexes can only support 12 units. The starvation curve does its job: armies naturally thin in Act III.

### Natural Army Decline in Act III

A player who enters Act III with 12 units and 4 Food Gatherers:

| Round | Active | Starvation | Income | Net | Weakened |
|-------|--------|-----------|--------|-----|----------|
| 9 | 12 | 6 | 4 | −2 | 2 |
| 10 | 10 | 5 | 4 | −1 | 1 more (3 total) |
| 11 | 9 | 5 | 4 | −1 | 1 more (desert previous unless rallied) |
| 12 | 7-8 | 4 | 4 | 0 | Stabilizes around 8 |

**An army of 12 stabilizes at ~8 units with 4 Food Gatherers in Act III.** This leaves 4 units for military action. Armies trim themselves to fighting shape. This is the intended design.

---

## 6. Findings & Recommendations

### ✅ What Works

1. **The starvation curve creates excellent natural escalation.** Act I is a scramble; Act II is manageable; Act III is brutal. The percentage of army dedicated to farming rises from 30% → 40% → 50%.

2. **Aggression has a clear clock.** You can fight for 2 rounds without gathering before units start Weakening. Must win territory to sustain a campaign.

3. **Raiding is devastating.** Destroying 2 of an enemy's 4 Food Gatherers creates a starvation spiral. The design goal of "Raid the Gatherers" being the most vicious play is confirmed.

4. **Recruitment is meaningful.** In Act I it costs an entire turn of surplus (4F is a big investment). In Act III it's nearly impossible. Army growth through conversion is the late-game path.

5. **Asymmetric food pressure drives expansion.** Diana is food-rich but geographically isolated. Minerva is food-lean and relies on Highland bonuses. Mars and Apollo are balanced. Each House must expand differently.

6. **Act III armies naturally thin to ~8 units** with standard food production, creating decisive combats with fewer, more valuable units. Matches the design vision.

### ⚠️ Issues to Resolve

1. **Minerva's Highland 2-Food bonus balance.** Minerva's Gatherers in Highland hexes produce 2 Food instead of 1. This keeps Minerva viable in the early game but is it enough? If Minerva consistently struggles in playtesting, the bonus could be extended to more hex types or increased to 3 Food. Conversely, if Minerva is too comfortable at home, the bonus could be restricted to fewer Highland hexes. **Monitor in playtesting.**

2. **Diana's 2-unit forest exemption balance.** Up to 2 of Diana's units in Forest hexes are exempt from starvation upkeep each round. This saves ~1 Food/round across all Acts. Is this enough to matter? Is it too generous? If Diana snowballs too hard, reduce to 1 unit exempt. If Diana still struggles with isolation costs, increase to 3. **Monitor in playtesting.**

3. **Starvation-before-collection timing.** The "pay first, collect after" order is harsh, especially Round 1 where your 5F starting stock is immediately reduced. With 5 starting Food (up from the original 3), this is less punishing but still dramatic. **Recommendation: Make this VERY clear in the rulebook and player aid.**

4. **Earlier recruitment with 5 starting Food.** With 5 starting Food instead of 3, Mars/Apollo can recruit as early as Round 2. Monitor whether this makes Act I expansion too fast. If so, consider raising Act I recruitment cost from 4 to 5 Food. **Monitor in playtesting.**

### 📊 Summary Numbers

| Metric | Value | Assessment |
|--------|-------|-----------|
| % of army farming (Act I) | 30% | ✅ Plenty of military headroom |
| % of army farming (Act II) | 40% | ✅ Meaningful pressure |
| % of army farming (Act III) | 50% | ✅ Brutal, as intended |
| Rounds of zero-gathering before crisis | 2 | ✅ Aggression has a clock |
| Earliest recruitment (Mars/Apollo) | Round 2 | ✅ Viable with 5 starting Food |
| Earliest recruitment (Minerva) | Round 3-4 | ⚠️ Slightly later, fits "expand to grow" identity |
| Earliest recruitment (Diana) | Round 1-2 | ⚠️ Very early — monitor for snowball |
| Act III stable army (4 food hexes) | ~8 units | ✅ Natural thinning works |

---

## 7. Re-Validation for Deterministic Systems (2026-03-14)

Three major changes since the original validation affect food math:

### 7.1 Deterministic Rally (100% success vs. old 50%)

The biggest impact. Previously rally was a d6 roll (4+ = success, ~50%). Now it's automatic: 1 order = 1 unit restored.

**Impact: armies recover faster, sustaining higher active unit counts.**

| Scenario | Old System (50% rally) | New System (100% rally) |
|----------|----------------------|------------------------|
| 3 subdued units, rally all | ~6 orders (3 turns) | 3 orders (1-2 turns) |
| Active units during recovery | 7 for ~2 rounds | 7 for 1 round, then 10 |
| Extra food cost during recovery | +0 (lower active count offsets) | +1-2 Food (faster bounce-back) |

**Net effect:** Armies bounce back ~1 round faster after combat. This means:
- Higher sustained active unit count = slightly more food pressure (+1 Food per 2-3 rounds of combat)
- The "aggression clock" is slightly more forgiving: fight, lose some units, rally them next turn, resume gathering sooner
- Effective aggression window extends from 2 rounds to 2.5-3 rounds before starvation bites
- **Verdict: Minor impact. Does NOT change fundamental starvation curve conclusions.**

### 7.2 Diana's Forest Starvation Exemption

**Current rule:** Up to 2 of Diana's units in Forest hexes are exempt from starvation upkeep each round.

This is a **bounded passive bonus.** Diana does not need to spend any resources or take any actions — 2 forest units simply do not count toward the starvation calculation each round.

**Impact on food math:** Effectively reduces Diana's "active units for starvation" count by 2. With 10 units on the board, Diana calculates starvation as if fielding 8. This saves exactly 1 Food per round across all three Acts (see Section 3 for the full breakdown).

**Baseline food math is slightly improved.** Diana's food surplus increases from +3 to +4 in Act I (6 income minus 2 starvation instead of 3). This makes Diana's early recruitment even faster — potentially recruiting Round 1 with the 5 starting Food.

**Balance consideration:** The exemption is deliberately small (2 units, not "all forest units"). Diana's food advantage comes primarily from having 5+ Food hexes nearby, not from the exemption. The exemption is thematic flavor — Diana's Shadows live off the land — rather than an economy-warping mechanic. If Diana snowballs in playtesting, this is a tuning lever: reduce to 1 unit exempt, or remove entirely.

### 7.3 Forest Combat Bonus (+1 At Ease in forests)

**Zero impact on food math.** This is a combat modifier, not an economic mechanic. At Ease units in forests fight at +1 instead of +0, making forests harder to attack into. This doesn't change how many Gatherers you need or how much Food you spend.

### 7.4 Medical Kit Equipment Card (revised)

Previously: "All rallies auto-succeed (no die roll)" — redundant with deterministic rally.
Now: "Rally 2 units per order instead of 1."

**Impact:** A player with the Medical Kit can rally twice as fast. After losing 4 units, they recover in 2 orders instead of 4. This makes the Medical Kit a powerful economy card — faster rally → back to gathering sooner → less food waste.

**Not a systemic food math issue.** Only 1 Medical Kit exists per game. Monitor in playtesting: does the Medical Kit holder consistently out-recover opponents?

### 7.5 Updated Summary Numbers

| Metric | Original (v2) | Updated (v3) | Change |
|--------|--------------|-------------|--------|
| % of army farming (Act I) | 30% | 30% | — |
| % of army farming (Act II) | 40% | 40% | — |
| % of army farming (Act III) | 50% | 50% | — |
| Rounds of zero-gathering before crisis | 2 | 2-3 | +0.5 (faster rally recovery) |
| Earliest recruitment (Mars/Apollo) | Round 3 | Round 2 | -1 round (5 starting Food) |
| Earliest recruitment (Minerva) | Round 5-6 | Round 3-4 | -2 rounds (Highland bonus + 5 starting Food) |
| Earliest recruitment (Diana) | Round 2 | Round 1-2 | -0.5 (forest exemption + 5 starting Food) |
| Act III stable army (4 food hexes) | ~8 units | ~8-9 units | +0.5 (faster rally) |
| Post-combat recovery time | 2-3 rounds | 1-2 rounds | -1 round (deterministic rally) |

### 7.6 Re-Validation Verdict

**The original food math holds.** Deterministic rally makes recovery slightly faster (good — more fighting, less downtime), but the starvation curve's fundamental shape is unchanged. The key conclusions remain:

1. Aggression has a 2-3 round clock (slightly extended from 2)
2. Raiding Gatherers is still devastating
3. Act III armies still thin to ~8-9 units
4. Minerva is food-lean but viable with Highland bonus, Diana still has food surplus
5. Recruitment in Act III is still nearly impossible

**No rule changes needed.** Flag for playtesting: watch if deterministic rally makes Act II armies larger than expected (12+ units sustained). If so, the Act II starvation rate (1 per 3) might need tightening to 1 per 2.5 (round up) — but this is a playtesting tuning lever, not a design flaw.

### Issues Resolved Since Original Validation

| Issue | Status |
|-------|--------|
| Diana starvation inconsistency | ✅ Resolved — 2 units in Forest exempt from upkeep each round |
| Resource stockpile cap | ✅ Resolved — No cap. Natural drains prevent hoarding. |
| Minerva Round 2 starvation spike | ✅ Resolved — Highland 2-Food bonus + 5 starting Food eliminates early crisis |
| Starvation-before-collection timing | ℹ️ Less harsh with 5 starting Food. Rulebook + player aid should still emphasize. |

---

*Original validation: 2026-03-13*
*Re-validated for deterministic systems: 2026-03-14*
*Updated for Food-only economy: 2026-03-15*
