# Turn Structure

## Round Overview

Each round:
1. **Reveal Proctor Card** — Flip top card of the current Act's Proctor Deck, apply effect
2. **Player Turns** — Players take turns in order, issuing orders to all their units
3. **End of Round** — Starvation upkeep, resource collection, Valor Token check, round tracker advance

See [ACT_STRUCTURE.md](ACT_STRUCTURE.md) for how rules change across Acts I, II, and III.

---

## Player Turn: Issue Orders

There is **no action limit.** On your turn, you issue orders to every unit you control. Each unit gets:

> **1 Free Move** (to an adjacent hex) + **1 Order**
>
> — OR —
>
> **Stay in place** + **1 Order**

That's it. Your army IS your action budget. More units = more things happening, but also more Food required to keep them alive.

### Physical Tracking

Units use a **standing/laying token system:**
- **Standing token** = Alert (combat-ready)
- **Laying token** = At Ease (gathering, vulnerable)

Board state is readable at a glance. No tracking sheets, no counters.

---

## Orders

After a unit's free move (or choosing to stay), it executes one order:

### Movement & Positioning

| Order | Effect | Resulting State |
|-------|--------|-----------------|
| **Move Again** | Move 1 additional hex | **Alert** (arrived with purpose) |
| **Hold** | Stay put, do nothing | **Alert** (standing watch) |

### Economy

| Order | Cost | Effect | Resulting State |
|-------|------|--------|-----------------|
| **Gather** | — | Collect 1 Food from this hex | **At Ease** (ends turn here) |
| **Recruit** | 3 Food | Add 1 new unit to this hex | **At Ease** |
| **Build Fortification** | 4 Food | Place fortification marker (+2 defense) | **At Ease** |

### Combat

| Order | Cost | Effect | Resulting State |
|-------|------|--------|-----------------|
| **Attack** | — | Initiate combat in this hex | Resolved in combat |

Combat is **fully deterministic.** Count Alert units (+1 each), At Ease units (+0 each), add terrain/equipment/House modifiers, compare totals. Higher wins; ties go to defender. Margin determines subdues. Both sides may play 1 Tactics Card simultaneously — the only source of uncertainty. See [COMBAT.md](COMBAT.md) for full resolution rules.

### Recovery

| Order | Cost | Effect | Resulting State |
|-------|------|--------|-----------------|
| **Rally** | — | Restore 1 subdued unit in this hex to Active (Alert) | **Alert** |

Rally is deterministic. One order, one unit restored. No die roll. Recovery is predictable but slow — every unit spent rallying is a unit not doing anything else.

### Reserve Track

| Order | Cost | Effect |
|-------|------|--------|
| **Withdraw** | — | Remove from board, enter Reserve Track Space 1 |
| **Advance** | — | Move 1 space forward on Reserve Track |
| **Deploy** | — | Place on board within range of current space — **units arrive Alert** |

Units deploy **Alert** from the Reserve Track. No destination cards, no commitment — the player chooses where to deploy at the moment of deployment, anywhere within range. Alert enemies block deployment within 1 hex (passive scouting). See [RESERVE_TRACK.md](RESERVE_TRACK.md) for deployment ranges and rules.

### Special

| Order | Cost | Effect |
|-------|------|--------|
| **Explore Discovery Site** | — | Draw 1 Equipment Card (first visit only, site is then depleted) |

---

## Readiness — The Core Tension

**Gathering always leaves you At Ease.** This is the fundamental tension of the game.

- You need Food to live → you must Gather
- Gathering makes you vulnerable → you're a target
- Defending yourself means going Alert → you're not Gathering
- Not Gathering means you're starving → you must Gather

Every unit assigned to Gather is a unit that can be ambushed. Every unit standing Alert is a unit not feeding your army. **The game lives in this tension.**

### State Summary

| What the unit did | Readiness |
|-------------------|-----------|
| Moved + Moved Again | **Alert** |
| Moved + Held | **Alert** |
| Stayed + Held | **Alert** |
| Moved + Attacked | Combat |
| Moved + Gathered | **At Ease** |
| Stayed + Gathered | **At Ease** |
| Stayed + Built Fortification | **At Ease** |
| Stayed + Recruited | **At Ease** |

**Rule of thumb:** Productive actions → At Ease. Military actions → Alert.

### Gathering Constraint

**Maximum 1 Gatherer per hex.** A hex produces 1 Food per round, collected by the Gatherer stationed there. Additional units in the hex can defend, but they don't produce extra Food. This encourages territorial spread — more hexes controlled = more Gatherers deployed = more income.

---

## Difficult Terrain

**Mountains/Highlands** are punishing:
- Moving INTO a mountain hex costs the unit's **entire turn** (free move consumed, no order available)
- A unit entering a mountain hex arrives **At Ease** — exhausted from the climb
- To cross mountains safely: move in one turn (arrive At Ease), go Alert next turn, then continue

This makes mountains natural defensive barriers — attackers arrive tired and exposed. Defenders already in mountains who Hold are Alert and have high ground.

**Woods/Hills:**
- Normal movement cost (1 free move)
- Provide stealth bonus in combat

**Argos River:**
- Units can move between any two riverside hexes as their free move (fast travel)

---

## Deployment Strikes

When deploying from the Reserve Track into a hex where **all defenders are At Ease** (Gathering):

- Deploy (order) + the unit arrives Alert
- If the deploying player has another unit already in the hex (or deploys multiple units), they can Attack as the deployed units' order
- Alert attackers vs. At Ease defenders = devastating advantage

**This is the most dangerous move in the game.** It's why you can't just leave all your units Gathering. It's why passive scouting matters — Alert units block Reserve Track deployment within 1 hex, so keeping sentries on watch forces enemies to deploy farther away and march in, giving you time to react.

See [RESERVE_TRACK.md](RESERVE_TRACK.md) for deployment ranges and rules.

---

## Reserve Track Orders

Units on the Reserve Track are off the board and don't require Food (foraging as they march). Each turn, a Reserve Track unit can:

- **Advance** 1 space (Space 1 → 2 → 3)
- **Deploy** onto the board within range — **arriving Alert**

A unit that Withdraws from the board enters Space 1. It can Advance to Space 2 next turn, Space 3 the turn after that. A full secret march from withdrawal to maximum-range deployment takes 3-4 turns — long enough to be spotted via Alert perimeters, short enough to be threatening.

### Passive Scouting

Alert units create a **deployment exclusion zone.** You cannot deploy from the Reserve Track within 1 hex of any enemy Alert unit. Every Alert unit on the board blocks a 7-hex area (its hex + 6 adjacent hexes) from deployment.

This means:
- **At Ease defenders** offer no protection — you can deploy directly on top of them (Deployment Strike)
- **Alert defenders** force you to deploy at least 2 hexes away and march in
- The more Alert units spread across the board, the fewer deployment options exist
- But every Alert unit is a unit not gathering — passive scouting has an **economic cost**

---

## Tactics Cards

Tactics Cards are the **only source of uncertainty** in combat. Each side may play 1 Tactics Card per combat, revealed simultaneously. Neither side knows what the other will play — or whether they'll play anything at all.

### How to Earn Tactics Cards

| Source | Cards Earned |
|--------|-------------|
| Win a combat | Draw 1 Tactics Card |
| Capture a castle | Draw 1 Tactics Card |
| Explore a Discovery Site | Draw 1 Tactics Card |
| Collect a Discovery Token | Draw 1 Tactics Card |
| Proctor card reward | As specified on card |

Tactics Cards are a scarce, earned resource. You get them by being active and aggressive — sitting back and turtling earns you nothing. See [TACTICS_CARDS.md](TACTICS_CARDS.md) for the full card list.

---

## End of Round Phase

In order:
1. **Starvation Upkeep** — Pay Food to feed your army (rate depends on current Act). Unfed units become Weakened. See [ACT_STRUCTURE.md](ACT_STRUCTURE.md).
2. **Resource Collection** — Each At Ease Gatherer on a hex produces 1 Food for its owner
3. **Valor Token Check** — Players controlling Valor Token hexes gain 2 Food OR 2 VP (double VP in Act III)
4. **Valor Token Rotation** — Move all Valor Tokens to new random positions
5. **Proctor Card Cleanup** — Discard current Proctor card (some have lingering effects)
6. **Round Tracker** — Advance marker. If Round 4 or 8, perform Act Transition (see ACT_STRUCTURE.md). If Round 12 complete, proceed to final scoring.

---

## House Readiness Bonuses

Each House has a **player board** with passive abilities, a special unit, and a House rule that shapes how they interact with the Alert/At Ease system. No hand of cards — these are permanent, always-active identities.

### Mars — The Conquerors

| Ability | Type | Effect |
|---------|------|--------|
| **Red Rage** | Passive | +1 combat strength when outnumbered (fewer units than opponent in the hex) |
| **Howler** | Special Unit | Counts as 2 Alert units for combat strength |
| **Blood Rally** | House Rule | When Mars wins a combat, immediately rally 1 subdued Mars unit in any hex on the board (free, no order required) |

Mars rewards aggression against stronger forces. The Howler hits hard, and Blood Rally means every victory heals your army — momentum snowballs. Mars wants to be fighting constantly.

### Minerva — The Strategists

| Ability | Type | Effect |
|---------|------|--------|
| **Owl's Wisdom** | Passive | See exact unit counts and readiness states in all adjacent hexes (perfect local intelligence) |
| **Tactician** | Special Unit | Scouts within 2 hexes as a free ability (no order required) — reveals unit counts and readiness |
| **Prepared Positions** | House Rule | When defending, At Ease Minerva units fight as Alert (+1 each instead of +0) |

Minerva thrives on information and defense. Owl's Wisdom means you always know what's next door. The Tactician extends that awareness. Prepared Positions makes Deployment Strikes against Minerva far less effective — their Gatherers fight back.

### Apollo — The Mobile

| Ability | Type | Effect |
|---------|------|--------|
| **Sun's Reach** | Passive | Apollo units' free move covers 2 hexes instead of 1 |
| **Archer** | Special Unit | Contributes +1 combat strength to a combat in an adjacent hex (without entering) |
| **Healer's Art** | House Rule | After any combat Apollo participates in (win or lose), rally 1 subdued Apollo unit in that hex (free) |

Apollo is fast and resilient. Sun's Reach makes them the most mobile House — they can redeploy, reinforce, and strike from unexpected angles. The Archer provides ranged support. Healer's Art means Apollo never comes out of a fight empty-handed, even in defeat.

### Diana — The Hunters

| Ability | Type | Effect |
|---------|------|--------|
| **The Hunt** | Passive | When Diana wins combat she initiated, all surviving attackers may move 1 hex immediately |
| **Shadow** | Special Unit | Can move through hexes containing enemy units without triggering combat |
| **Phantom Stride** | House Rule | Diana's units ignore terrain movement penalties (Mountains cost normal movement) |

Diana is speed and pursuit. The Hunt means a successful attack immediately becomes a follow-up advance — chase down retreating enemies, seize the next hex, or reposition to safety. The Shadow slips through enemy lines for deep reconnaissance or rear attacks. Phantom Stride makes Diana the only House that can cross mountains without penalty, striking anywhere on the map.

---

## How A Turn Sounds

**Fast turn (stable board state):**
> "My three Gatherers keep gathering. My two units at the castle hold Alert. My Reserve Track group advances. Done."

**Aggressive turn:**
> "I deploy my Reserve Track group into Hex 14 — all defenders are At Ease. My deployed units Attack. I've got 5 Alert against their 4 At Ease — that's 5 to 0. I play no Tactics Card. They play Shield Wall for +2 — that makes it 5 to 2, I win by 3 — 2 subdued, or I convert 1. I'll take the conversion. Meanwhile, my Gatherer in Hex 7 keeps gathering."

**Reactive turn:**
> "I pull my Gatherer off Hex 9 — he moves to Hex 10 and goes Alert. My other units hold. I'm tightening my Alert perimeter because someone has units on the Reserve Track and I need to block their deployment options."

**Calculating a fight:**
> "I've got 3 Alert in the hex, they've got 2 Alert plus mountain defense — that's 3 vs. 3. Tie goes to defender, so I need a card to break it. I play Flanking Maneuver for +1 — that makes it 4 to 3, unless they have a card. We reveal: they played nothing. I win by 1, 1 unit subdued."

Most turns take 30-60 seconds. You're only announcing **changes** to your board state. Persistent unit positions mean the default is "everything stays the same unless I say otherwise."

---

## First Player

The first player rotates each round (clockwise).

**Going first:**
- Respond to the new Proctor Card first
- Claim contested hexes before opponents react
- Launch attacks before enemies can reposition

**Going last:**
- React to what everyone else has done
- Poach contested hexes after opponents commit elsewhere
- Go Alert in response to observed threats

---

## Strategic Principles

**The Aggression Economy:** Attacking means your units aren't Gathering. You can't sustain aggression forever — you need to WIN something (convert units, capture hexes, subdue enemy Gatherers) or you'll starve. Aggression has a clock on it.

**The Gatherer's Dilemma:** Every Gatherer is a target. Every hex you spread to is another position to defend. But without Gatherers, you starve. The right number of Gatherers is always "one fewer than you'd like."

**The Reserve Track Threat:** Units on the Reserve Track don't eat, don't produce, and can't defend — but they terrify everyone within deployment range. The mere presence of units on the Reserve Track forces opponents to go Alert, which means THEY'RE not Gathering either. You can win the economic war by threatening without ever attacking.

**Raid the Gatherers:** The most vicious play is deploying onto enemy Gatherers. You subdue their economy, capture their hex, and can immediately assign your own Gatherer. One successful raid can swing the Food balance for multiple rounds.

**Count Before You Commit:** Combat is deterministic — you can count strength and know the outcome before attacking. The only unknown is whether your opponent holds a Tactics Card. Calculate your margin, weigh the risk of a card flip, and strike when the math is in your favor. Reckless attacks waste tempo; precise strikes win games.
