# Scouting System — Passive Awareness

> **NOTE:** This file replaces the former Investigation System (breadcrumb waypoints, Intel-based investigation, waypoint erasure). That system has been removed in favor of passive scouting integrated into the Readiness System. See [RESERVE_TRACK.md](RESERVE_TRACK.md) for full details.

## Overview

Scouting is **passive, not active.** There is no "investigate" order, no Intel cost for scouting, and no waypoint markers. Instead, Alert units on the board automatically create awareness zones that constrain Reserve Track deployment.

---

## How Scouting Works

### Passive Scouting (All Houses)
- Every Alert unit (standing token) can observe its own hex and all 6 adjacent hexes
- **Reserve Track deployment is blocked within 1 hex of any enemy Alert unit**
- No order required, no resource cost — Alert units are simply watching
- This creates a natural defensive perimeter around any concentration of Alert units

### What You Can See
By default, all Houses can see:
- That enemies occupy an adjacent hex (you can see tokens are there)
- Approximate count (how many tokens)
- But NOT exact readiness states (can't tell standing vs laying from a distance)

### Minerva Enhanced Scouting (Owl's Wisdom)
- Minerva's Alert units can see **exact unit counts and readiness states** in adjacent hexes
- Minerva's Tactician can scout within **2 hexes** (not just adjacent) as a **free ability** (doesn't consume order)
- This makes Minerva the premier information House — they always know more than anyone else

### Diana Scouting Immunity (Moonlight Veil)
- Diana's units in **Forest hexes** cannot be scouted at all
- Adjacent Alert units see nothing — Diana is invisible in the woods
- The only way to know what Diana has in a forest is to enter the hex

---

## Interaction with Reserve Track

The former Investigation System provided active counterplay to the Reserve Track through Intel-based waypoint placement. The new system uses passive scouting instead:

| Old System | New System |
|-----------|-----------|
| Spend 2 Intel to investigate | No cost — Alert units scout passively |
| Place waypoint markers to constrain deployment | Alert units block deployment within 1 hex |
| Waypoint erasure via Intel spending | No waypoints to erase |
| Chain investigations to narrow deployment cone | Spread Alert units to cover more area |
| Minerva: free first investigation per turn | Minerva: enhanced scouting range and detail |
| Diana: immune to investigation | Diana: invisible in forests |

### Why the Change?
Active investigation created an information arms race that favored Intel-rich Houses and added significant rules overhead (waypoint placement, erasure costs, chain mechanics, destination cards). Passive scouting is simpler, costs no resources, integrates directly with the readiness system, and creates organic counterplay: you protect yourself by being vigilant, not by spending currency.

The tradeoff is real: Alert units watching for threats are units not gathering. The Reserve Track forces this choice on everyone.

---

## Physical Components (Updated)

**Removed:**
- ~~Waypoint Discs (36 total)~~ — No longer needed
- ~~Destination Cards~~ — No longer needed

**Retained:**
- Removal Markers (1 per Reserve Track group) — placed where units entered the track
- Scouted Markers — not needed as separate components; Alert units on the board serve this function through their physical presence

---

## See Also
- [RESERVE_TRACK.md](RESERVE_TRACK.md) — Full Reserve Track mechanics including passive scouting rules
- [READINESS_SYSTEM.md](READINESS_SYSTEM.md) — Alert/At Ease system
- [COMBAT.md](COMBAT.md) — Deterministic combat resolution
