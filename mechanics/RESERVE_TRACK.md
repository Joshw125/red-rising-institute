# Reserve Track System — Hidden March

## Overview

The Reserve Track is the game's signature movement system. Units are pulled off the map into a hidden march — everyone can see *that* you're marching and *how far* you could reach, but not *where you're going*. The destination remains a mystery until you choose to deploy.

**Core Concept:** Remove units from the board → place them on your track → each turn they advance, expanding deployment range → deploy anywhere within range, arriving Alert and ready to fight.

The Reserve Track creates a cloud of threat. Opponents must respect the entire deployment radius or risk a devastating strike.

---

## Physical Components

- **Reserve Track Board** (one per player): A small board with 3 numbered spaces
- **Unit Tokens**: Your units placed on the track (count is public, but destination is unknown)
- **Removal Marker**: A disc placed on the main map where units entered the Reserve Track (visible to all)
- **Scouted Markers**: Discs placed by opponents to mark "no deploy" zones (see Passive Scouting)

---

## Mechanics

### Withdrawing to the Reserve Track

**Cost:** 1 order (the unit's order for this turn)

**Process:**
1. Remove any number of your units from a single hex on the main board
2. Place a **Removal Marker** on that hex (visible to all — everyone knows where they left)
3. Place the units on **Space 1** of your Reserve Track

Units on the Reserve Track are **off the map**. They cannot be attacked or interacted with while marching. They also don't require Food (foraging as they march).

---

### Advancing on the Reserve Track

Each turn, Reserve Track units may **advance 1 space** (no order required — advancement is automatic at the start of your turn if you choose).

Units advance: Space 1 → Space 2 → Space 3

You may also choose to **hold** at any space and deploy from there.

---

### Deployment Range

The longer units march, the farther they can deploy from their Removal Marker:

| Reserve Track Space | Deployment Range | Approximate Hex Count |
|--------------------|-----------------|----------------------|
| Space 1 | Within **3 hexes** of Removal Marker | ~19 hexes |
| Space 2 | Within **6 hexes** of Removal Marker | ~60 hexes |
| Space 3 | Within **9 hexes** of Removal Marker | ~120 hexes (most of the map) |

---

### Deploying

**Cost:** This is the unit's action for the turn. Deployed units then receive their normal **free move + order** for that turn.

**Process:**
1. Choose any valid hex within deployment range (not blocked by scouted markers — see below)
2. Place units on the board — they arrive **Alert** (standing)
3. Units may then use their free move (1 hex) and order (Move Again, Attack, Hold, etc.)

**Arriving Alert** is universal — all Houses deploy Alert from the Reserve Track. These are marching reinforcements arriving ready to fight.

### Deployment Strike

If you deploy into a hex where **all defenders are At Ease**, this is a **Deployment Strike**:
- Your units arrive Alert (+1 strength each)
- Defenders contribute +0 (At Ease)
- Combat triggers immediately
- This is the game's most devastating offensive move

If the target hex contains **any Alert defenders**, you cannot deploy directly into it (see Passive Scouting below). You must deploy outside their awareness zone and march in.

---

## Passive Scouting — The Deployment Constraint

### The Rule

**You cannot deploy from the Reserve Track within 1 hex of any enemy Alert unit — unless the destination is a forest hex.**

Alert units (standing tokens) are watching. They see incoming deployments. You cannot appear on their doorstep — except in forests, where the canopy hides arrivals.

This means every Alert enemy unit on the board creates a **7-hex awareness zone** (their hex + 6 adjacent hexes) where Reserve Track deployment is blocked. Forest hexes within that zone are still valid deployment targets.

### What This Means in Practice

- **At Ease defenders** offer no protection — you can deploy directly on top of them (Deployment Strike)
- **Alert defenders** force you to deploy at least 2 hexes away and march in (or use forests, see below)
- **Forest hexes (Greatwoods / North Woods)** always allow deployment, even adjacent to Alert sentries — forest concealment hides arrivals
- The more Alert units spread across the board, the fewer deployment options exist in OPEN terrain
- But every Alert unit is a unit not gathering — passive scouting has an **economic cost**

### Forest Concealment (v6.0)

Forest hexes are the great loophole in passive scouting. They turn Greatwoods and North Woods into strategic redeployment zones — particularly important for Diana, whose Forest Hunters house rule additionally hides her Removal Marker for 1 round when she withdraws from a forest hex.

This replaces the old "forest combat cover" rule (where At Ease defenders in forest got +1 strength). The defensive value of forests has shifted from "fight harder there" to "appear there freely."

### The Tripwire Effect

Isolated Alert units serve as **tripwires**, not walls:
- The hidden army deploys 2 hexes from the tripwire (outside awareness)
- Attacker uses free move to close 1 hex (now adjacent to the tripwire)
- Attacker uses order to move into the tripwire's hex — combat triggers
- The tripwire fights Alert (it was standing) but is likely outnumbered
- **The tripwire's value isn't surviving — it's dying loudly.** The defender now sees the enemy on the board and gets a turn to react before the main force is hit.

### Scouted Markers

When a hidden army deploys and is spotted by Alert units, no markers are needed — they're on the board now. "Scouted Markers" are placed when a player deliberately dedicates units to watching an area (the Alert units themselves serve as the markers through their physical board presence).

---

## The Hidden March — No Commitment Required

**There is no secret notepad.** Units on the Reserve Track have no committed destination. The player can change their mind freely until the moment of deployment.

This means:
- The hidden force exists in a **cloud of possibility** — they could deploy anywhere in their range
- Opponents cannot narrow this down except by:
  - Placing Alert units to block deployment zones (passive scouting)
  - Watching the track and reacting to the growing threat radius
- The hidden player maintains maximum flexibility until deployment

### Why No Commitment?

Commitment mechanics (destination cards, secret notepads) add bookkeeping and create opportunities for disputes. The current system is cleaner: you're not tracking a position, you're maintaining **options**. The entire deployment radius is live until the moment you choose.

---

## Visible Information (What Opponents Can See)

| Information | Visible? |
|------------|----------|
| Units on the Reserve Track | **Yes** — everyone sees the count |
| Which Track Space they're on | **Yes** — Space 1, 2, or 3 is public |
| The Removal Marker (origin hex) | **Yes** — placed on the map |
| Deployment range | **Yes** — calculable from Space + origin |
| Where they're going | **No** — this is the mystery |
| When they'll deploy | **No** — player's choice |

The tension: everyone can see the growing threat radius on the board. A force on Space 2 from Hex 22 threatens a huge swath of the map. The question isn't *if* they're coming — it's *where* and *when*.

---

## Key Rules

### Maximum Reserve Track Capacity
- Maximum of **8 units** on the Reserve Track at once
- Units in the same withdrawal group stay together on the track

### Multiple Groups
- You can have **multiple groups** on the Reserve Track simultaneously
- Each group has its own Removal Marker and track position
- Groups can be on different spaces (e.g., Group A on Space 1, Group B on Space 3)

### Forced Deployment
- Units on Space 3 **must** deploy this turn or next turn
- If not deployed by end of their second turn on Space 3, units return to the Removal Marker hex, revealed and At Ease

### Combat and Reserve Track Units
- Units on the Reserve Track **cannot participate in combat** until deployed
- A player who has no units on the main board AND units on the Reserve Track is not eliminated — wait for deployment

### No Food Cost
- Reserve Track units don't require Food upkeep (foraging during march)
- This makes the Reserve Track a temporary escape from starvation pressure — but you lose all economic production from those units

---

## Strategic Considerations

### When to Withdraw
- To threaten multiple targets simultaneously (opponent must guess which)
- To escape starvation pressure temporarily (units don't eat on the track)
- To set up a Deployment Strike against At Ease gatherers
- To force opponents to go Alert (reducing THEIR production) — the threat-in-being
- To reposition across the map without telegraphing your route

### When NOT to Withdraw
- When you need units on the board immediately
- When you're already winning the economic war (why hide your advantage?)
- When your origin hex will be attacked while your units are marching
- When opponents have strong Alert perimeters (your deployment options are limited)

### The Threat-in-Being
Even without deploying, units on the Reserve Track exert pressure. Opponents see the growing threat radius and must decide: go Alert (lose economy) or gamble that the hit isn't coming their way. You can win the economic war by threatening without ever attacking.

### Deployment Sequencing
Deployed units get their full turn (free move + order). This means:
- Deploy 2 hexes from target → free move 1 hex → Attack order = same-turn assault
- Deploy near an objective → free move onto it → Gather order = immediate resource capture
- Deploy behind enemy lines → Hold → create a new threat axis for next turn

### Two-Phase Attack
The most devastating combo:
1. **Conventional force** marches toward enemy position (visible, draws attention)
2. **Reserve Track force** deploys behind enemy lines while they focus on the visible threat
3. Enemy is now caught between two forces — neither is safe to ignore

---

## Interaction with House Abilities

### Mars — Blood Rally
When Mars wins a combat, immediately rally 1 subdued Mars unit in any hex. Reserve Track deployments into combat can trigger this — win the fight, rally a friend elsewhere.

### Minerva — Prepared Positions
When Minerva is the defender, At Ease units fight as Alert. This makes Deployment Strikes against Minerva less effective — their gatherers fight back.

### Apollo — Sun's Reach
Apollo's free move range is 2 hexes instead of 1. After deploying from the Reserve Track, Apollo can free-move 2 hexes before using their order — effectively extending their deployment strike range by 1 hex.

### Diana — Ambush Predator
When Diana initiates combat in a Forest hex, At Ease units count as Alert. Combined with the Reserve Track, Diana can deploy near a forest hex, move in, and fight with full strength even if some units are At Ease from deployment fatigue.

---

## Designer Notes

### Why Arrive Alert?
Previous design had units arrive At Ease ("tired from marching"). This created a problem: deploying into Alert defenders was suicidal (you arrive At Ease, they're Alert, you get crushed). Arriving Alert makes the Reserve Track a genuine offensive weapon. The constraint is passive scouting — you can't deploy adjacent to Alert enemies — not arrival readiness.

### Why No Destination Cards?
Destination cards created three problems: (1) bookkeeping disputes, (2) deception costs that made the system feel "gamey," and (3) commitment removed the player's ability to adapt. The current system — no commitment, deploy-anywhere-in-range — is cleaner and creates better gameplay. The mystery comes from the deployment cloud, not from a hidden notepad.

### Why Passive Scouting Instead of Active Investigation?
Active investigation (spend Intel to force waypoints) created an information arms race that favored Intel-rich Houses and added significant rules overhead. Passive scouting (Alert units block deployment) is simpler, costs no resources, integrates directly with the readiness system, and creates organic counterplay: you protect yourself by being vigilant, not by spending currency.
