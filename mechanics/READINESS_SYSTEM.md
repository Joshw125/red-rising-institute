# Readiness System — Alert & At Ease

## Overview

Units on the main board exist in one of two **readiness states** that determine their combat effectiveness, economic utility, and scouting capability. This is the game's core tension: **productivity makes you vulnerable.**

---

## The Two States

### Alert (Token Standing)

Units are **watching, patrolling, ready for combat.**

- Contribute **+1 combat strength** each
- Ties in combat go to **defender** (if defender is Alert)
- **Passively scout** adjacent hexes (block Reserve Track deployment within 1 hex)
- **Cannot** gather resources, build fortifications, or use hex abilities

**Visual:** Token stands upright. Readable at a glance across the board.

### At Ease (Token Laying Down)

Units are **gathering, building, or otherwise occupied.**

- Contribute **+0 combat strength** (not fighting)
- **Do not scout** — provide no awareness zone, do not block Reserve Track deployment
- **Can** gather resources, build fortifications, use hex abilities, recruit
- Vulnerable to Deployment Strikes

**Visual:** Token is laid on its side.

---

## How Units Change State

Under the Unit Orders system, a unit's readiness is determined by **what it did this turn:**

| Activity | Resulting State |
|----------|-----------------|
| Moved + Moved Again | **Alert** |
| Moved + Held | **Alert** |
| Stayed + Held | **Alert** |
| Moved + Attacked | **Alert** (combat) |
| Moved + Gathered | **At Ease** |
| Stayed + Gathered | **At Ease** |
| Stayed + Built | **At Ease** |
| Stayed + Recruited | **At Ease** |

**Rule of thumb:** Productive actions = At Ease. Military actions = Alert.

States are **persistent** — a unit stays in its current state until it receives a new order that changes it. A Gatherer keeps gathering (and stays At Ease) every turn until you order it to do something else.

---

## Reserve Track Deployment & Readiness

### All Units Deploy Alert

Units deployed from the Reserve Track arrive **Alert** (standing). They're marching reinforcements arriving ready to fight. This is universal — all Houses deploy Alert.

After deployment, units receive their normal **free move + order** for that turn. They can immediately march toward a target and attack.

### The Deployment Strike

When you deploy from the Reserve Track into a hex where **all defenders are At Ease:**

- Deploying units arrive **Alert** (+1 strength each)
- Defenders are At Ease (+0 strength each)
- Combat triggers immediately
- This is the game's most devastating offensive move

**Passive Scouting Constraint:** You cannot deploy from the Reserve Track within 1 hex of any enemy Alert unit. Alert units are watching — they'd see you coming. This means:

- **At Ease targets:** Deploy directly on top of them (Deployment Strike)
- **Alert targets:** Deploy 2+ hexes away, free move closer, attack with order

---

## Combat Interactions (Deterministic)

| Attacker State | Defender State | Effect |
|---|---|---|
| Alert | Alert | Standard combat. Both contribute +1 each. Ties go to defender. |
| Alert | At Ease | Attacker: +1 each. Defender: +0 each. Ties go to attacker. |
| At Ease | Alert | Attacker: +0 each. Defender: +1 each. Ties go to defender. |
| At Ease | At Ease | Both: +0 each. Ties go to defender. (Rare — both sides asleep.) |

**Exception — Forest Terrain:** At Ease units in Forest/Woods hexes fight at +1 each (natural cover).

---

## Passive Scouting

Alert units don't just fight — they **watch.** Every Alert unit creates a 7-hex awareness zone (their hex + 6 adjacent) where:

- Reserve Track deployment is **blocked**
- The Alert player can see that enemies are present in adjacent hexes

This means Alert units serve a dual purpose:
1. **Combat strength** — they fight at +1 each
2. **Perimeter defense** — they block surprise deployments nearby

At Ease units provide neither. A hex full of At Ease gatherers is blind AND defenseless.

See [RESERVE_TRACK.md](RESERVE_TRACK.md) for full passive scouting rules.

---

## House Interactions

### Mars — Red Rage
- **+1 combat strength** when Mars has fewer Alert units than the opponent in combat
- Mars's Howler counts as **2 Alert units** for combat strength
- Blood Rally: Win a combat → rally 1 subdued Mars unit anywhere (free)

### Minerva — Prepared Positions
- When **defending**, Minerva's At Ease units fight as Alert (+1 each instead of +0)
- Owl's Wisdom: Minerva's Alert units see **exact counts and readiness states** in adjacent hexes
- Tactician scouts within **2 hexes** as a free ability

### Apollo — Sun's Reach
- Free move range is **2 hexes** instead of 1 (all Apollo units)
- Archer contributes +1 to allied combat in an **adjacent hex** (without being in the fight)
- Healer's Art: Rally 1 subdued Apollo unit after any combat (win or lose)

### Diana — Ambush Predator
- When Diana **initiates combat in a Forest hex**, At Ease Diana units fight as Alert
- Moonlight Veil: Diana units in Forest hexes **cannot be scouted**
- Shadow can move through enemy hexes without triggering combat

### Jupiter (Expansion) — Mountain Kings
- Units in Castle hexes are **always Alert** regardless of activity
- Legionnaire grants +1 defense to all units in same hex, auto-rallies next round if subdued
- Mountain movement costs 1 free move (not entire turn) for Jupiter

### Ceres (Expansion) — Bountiful Harvest
- No Readiness bonus — **most vulnerable to ambush**
- Cultivator generates 1 Food passively in any hex
- Units in Food-producing hexes immune to Deployment Strike subdues

---

## The Core Tension

**Gathering always leaves you At Ease.** This one rule creates the game's central dilemma:

- You need Food to live → you must Gather
- Gathering makes you At Ease → contributes +0 in combat, no scouting
- Defending yourself means going Alert → you're not Gathering
- Not Gathering means you're starving → you must Gather

Every Gatherer is a target. Every Alert unit is unproductive. The game lives in this tension.

### The Aggression Economy

Attacking means your units are Alert — not Gathering. Aggression has a **clock on it** — you need to WIN something (convert units, capture hexes, subdue enemy Gatherers) or you'll starve.

The most vicious play: **raid the Gatherers.** Deploy onto their At Ease economy, subdue their workers, capture their hexes, assign your own Gatherers. One successful raid swings the Food balance for multiple rounds.

### The Reserve Track Threat

Units on the Reserve Track don't eat, don't produce, and can't defend — but they terrify everyone within deployment range. The mere presence of units on the Reserve Track forces opponents to go Alert (reducing THEIR production and giving THEM scouting coverage — but at economic cost). You can win the economic war by threatening without ever attacking.
