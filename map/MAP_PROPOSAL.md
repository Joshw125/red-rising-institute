# Map Layout Proposal — The Institute (HISTORICAL)

> **NOTE:** This is the original map proposal from v1.0-v2.0. The map has been significantly redesigned since this document was written. For the current 90-hex map with Food-only economy, see [MAP_OVERVIEW.md](MAP_OVERVIEW.md) and [HEX_ASSIGNMENTS.md](HEX_ASSIGNMENTS.md). This document is preserved for historical reference only.

## Design Goals

1. **Asymmetric starting positions** — each House has different terrain, different strengths, different weaknesses
2. **Resource scarcity drives expansion** — no starting zone has everything you need
3. **Castles pull players toward each other** — neutral castles are between starting zones, not in corners
4. **No viable turtle strategy** — staying home means falling behind on VP and eventually starving
5. **Room for maneuver** — big enough for feints, ambushes, and Reserve Track marches, but tight enough for early contact
6. **Honors the books** — terrain, House placement, and castle names match Red Rising lore

---

## The Map At A Glance

67 hexes. The Argos River runs roughly north-south through the center, dividing the map into a western half (mountains, foothills) and an eastern half (forests, highlands). The South Sea borders the bottom edge.

```
              NORTH
    ┌─────────────────────────┐
    │  MOUNTAINS   │ N.WOODS  │
    │  (Tech)      │ (Food)   │
    │  ♜Jupiter    │ ♜Ceres   │
    │              │    ♜MINERVA
    │              │ HIGHLANDS│
    │   ♜MARS    RIVER (Intel)│
    │  foothills   │         │
    │         ♜Mercury       │
    │  ♜Pluto      │GREATWOODS
    │  caverns     │ (Food)  │
    │              │  ♜DIANA  │
    │   ♜APOLLO    │         │
    │  S.SEA coast │         │
    └─────────────────────────┘
              SOUTH
```

**♜ = Castle.** CAPS = Home castle (player starts here). Lowercase = Neutral (garrison token).

---

## Terrain Regions

### Mountains (Northwestern) — 12 hexes
- **Resource:** Tech
- **Movement:** Entering a mountain hex costs a unit's entire turn. Arrives At Ease.
- **Combat:** +1 defense for defender (high ground)
- **Contains:** Jupiter Castle (neutral), 1 Watchtower, 1 Cavern entrance
- **Character:** Barrier terrain. Slow to cross, brutal to attack into. Tech-rich but food-poor. Anyone who controls the mountains has fortification materials but needs to import food.

### North Woods (Northern) — 8 hexes
- **Resource:** Food
- **Movement:** Normal (1 free move). Stealth bonus in combat.
- **Combat:** Attacker loses first-strike advantage (forest ambush)
- **Contains:** Ceres Castle (neutral)
- **Character:** Fertile, defensible, but sandwiched between Mountains and Highlands. The breadbasket of the map. Everyone wants these food hexes.

### Highlands (Northeastern) — 10 hexes
- **Resource:** Intel
- **Movement:** Normal (1 free move)
- **Combat:** No special modifier
- **Contains:** Minerva Castle (home), 1 Watchtower
- **Character:** Elevated terrain with long sight lines. Intel-rich, which means Minerva can scout and investigate cheaply. But Intel doesn't feed your army — Minerva must expand toward food.

### Argos River (Central Corridor) — 8 hexes
- **Resource:** Mixed (2 Food, 2 Tech, 2 Intel, 2 mixed/none)
- **Movement:** Fast travel between any two connected river hexes as the free move
- **Combat:** No special modifier
- **Contains:** Mercury Castle (neutral), 1 Watchtower
- **Character:** The map's highway. Controls north-south movement. River hexes are exposed (no terrain bonus) but strategically vital. Mercury Castle sits at the central crossing — the most contested hex on the board.

### Greatwoods (Eastern) — 14 hexes
- **Resource:** Food
- **Movement:** Normal. Stealth bonus in combat.
- **Combat:** Attacker loses first-strike advantage (same as North Woods)
- **Contains:** Diana Castle (home), 1 Cavern entrance
- **Character:** The largest forest. Deep cover, rich food, but isolated from Tech and Intel. Diana thrives here but must venture out to compete for castles and VP.

### Southern Reaches / Foothills (Southwestern) — 8 hexes
- **Resource:** Mixed (3 Food, 3 Tech, 2 mixed)
- **Movement:** Normal
- **Combat:** No special modifier
- **Contains:** Mars Castle (home), Pluto Castle (neutral, near cavern)
- **Character:** Rocky transitional terrain between mountains and coast. Mars starts here with decent resource mix but no abundance of anything. Must push north toward castles or east toward the river.

### South Sea Coast (Southern) — 7 hexes
- **Resource:** Mixed (3 Food, 2 Tech, 2 Intel)
- **Movement:** Normal
- **Combat:** No special modifier (open, exposed)
- **Contains:** Apollo Castle (home)
- **Character:** Open terrain, mobile but vulnerable. Apollo has the most balanced resource access nearby but the least defensible position. The coast is a springboard, not a fortress.

---

## Resource Distribution Summary

| Region | Hexes | Food | Tech | Intel | Castles |
|--------|-------|------|------|-------|---------|
| Mountains | 12 | 0 | 10 | 0 | Jupiter (neutral) |
| North Woods | 8 | 7 | 0 | 0 | Ceres (neutral) |
| Highlands | 10 | 1 | 0 | 8 | Minerva (home) |
| Argos River | 8 | 2 | 2 | 2 | Mercury (neutral) |
| Greatwoods | 14 | 12 | 0 | 0 | Diana (home) |
| Southern Reaches | 8 | 3 | 3 | 0 | Mars (home), Pluto (neutral) |
| South Sea Coast | 7 | 3 | 2 | 2 | Apollo (home) |
| **Totals** | **67** | **28** | **17** | **12** | **8** |
| | | + 8 from castles | + 8 from castles | + 8 from castles | |

**Effective totals including castle production:** 36 Food, 25 Tech, 20 Intel available on the map.

### Why This Distribution

- **Food is most common (28 hexes + 8 castles = 36):** Everyone needs it for starvation upkeep. It should be available but contested. With 4 players each needing 3-5 Food per round, and 1 Gatherer per hex, players need to spread across many food hexes.
- **Tech is medium (17 + 8 = 25):** Used for fortifications and special actions. Concentrated in Mountains and scattered elsewhere. Forces mountain-adjacent players to expand for food, and food-rich players to expand for Tech.
- **Intel is scarce (12 + 8 = 20):** Intentionally rare. Located primarily in Highlands (Minerva's advantage) and sprinkled along the river. Scouting and investigation should feel like they cost something. Players who ignore Intel are blind to Reserve Track threats.

### Starting Resource Access (within 2 hexes of home castle)

| House | Food nearby | Tech nearby | Intel nearby | Total | Weakness |
|-------|------------|-------------|--------------|-------|----------|
| Mars | 3 | 3 | 0 | 6 | No Intel — blind to threats |
| Minerva | 1 | 0 | 5 | 6 | Almost no food — starves fast |
| Apollo | 3 | 2 | 2 | 7 | Most balanced but most exposed |
| Diana | 5 | 0 | 0 | 5 | No Tech, no Intel — rich but ignorant |

**Every House must expand or die.** Mars can't scout. Minerva can't eat. Diana can't build. Apollo has a bit of everything but no walls. This forces movement toward the center — toward the neutral castles, toward each other.

---

## Castle Placement

### Home Castles (4)

| Castle | Location | Terrain | Starting Advantage |
|--------|----------|---------|-------------------|
| **Mars** | SW foothills, edge of mountains | Rocky, elevated | Tech access, defensible, 2 castles reachable |
| **Minerva** | NE highlands | Elevated, open | Intel advantage, good scouting, sees threats early |
| **Apollo** | S coast, near river mouth | Open, flat | Balanced resources, river access, mobile |
| **Diana** | E Greatwoods, deep forest | Dense forest | Food abundance, stealth defense, hidden |

- **Home castles are pre-fortified** (+2 defense)
- **Home castles are worth 0 VP** — you don't score for what you started with
- **Captured enemy home castles are worth 4 VP**
- Home castle produces 1 of each resource (like all castles)

### Neutral Castles (4)

| Castle | Location | Terrain | Garrison | Nearest Players |
|--------|----------|---------|----------|-----------------|
| **Ceres** | North Woods, north-center | Forest | 2-4 (hidden) | Mars, Minerva (both ~3-4 hexes) |
| **Jupiter** | Mountains, northwest | Mountain | 2-4 (hidden) | Mars (~3 hexes), others far |
| **Mercury** | River corridor, dead center | Riverside | 2-4 (hidden) | Everyone (~4-5 hexes) |
| **Pluto** | SW, near cavern network | Underground/rocky | 2-4 (hidden) | Mars (~2 hexes), Apollo (~3 hexes) |

### Castle Strategic Analysis

**Ceres Castle (North Woods):** The first major flashpoint. Mars and Minerva are roughly equidistant. Mars wants it for food (they're food-poor). Minerva wants it for food (they're VERY food-poor). First contact between these two Houses likely happens here around Round 2-3.

**Jupiter Castle (Mountains):** The hardest to reach and hold. Mountain terrain makes approaching difficult (arrive At Ease). But it's Tech-rich and extremely defensible once held (+1 mountain defense + castle fortification). Mars is closest but anyone approaching through the mountains is slowed. A long-term investment, not a quick grab.

**Mercury Castle (Center):** THE prize. Central position on the river means fast travel access to everywhere. Every player can reach it but no one is close enough to grab it uncontested. Expect this castle to change hands multiple times. Whoever holds Mercury at game end has a huge VP lead, but holding it means defending against everyone.

**Pluto Castle (SW, Caverns):** Mars is closest and will likely take it early — but it's near the cavern network, meaning Diana (who has another cavern entrance in the Greatwoods) can pop out nearby for a surprise attack. Pluto is the "trap castle" — easy to take, hard to hold if Diana is lurking in the tunnels.

### Castle VP Math

With 4 neutral castles at 4 VP each + enemy home castles at 4 VP each:
- **Holding 2 neutral castles at game end** = 8 VP (likely minimum to compete)
- **Holding 2 neutral + 1 enemy home** = 12 VP (dominant position)
- **Maximum possible castle VP** = 28 VP (all 4 neutral + all 3 enemy homes — virtually impossible)

A player who holds 0 castles at game end is almost certainly losing. You MUST take and hold at least 1-2 neutral castles.

---

## Special Hexes

### Watchtowers (3)

| Watchtower | Location | Scouting Range |
|------------|----------|---------------|
| **Mountain Watch** | NW mountains, high peak | Overlooks North Woods, mountain passes |
| **River Watch** | Central river, elevated bank | Overlooks river corridor, approaches to Mercury Castle |
| **Highland Watch** | NE highlands, ridgeline | Overlooks Greatwoods edge, approaches from east |

**Effect:** Controller can Scout all adjacent hexes for free (no Intel cost, no roll) at the start of their turn. +1 Intel per round.

Watchtowers are tools, not VP objectives. They give information advantage — knowing where enemies are heading, whether to go Alert, whether a Reserve Track deployment is likely aimed at you.

### Cavern Network (3 entrances)

| Cavern | Location | Connected To |
|--------|----------|-------------|
| **Mountain Cavern** | NW mountains (near Jupiter Castle) | → Pluto Cavern, Deep Cavern |
| **Pluto Cavern** | SW (near Pluto Castle) | → Mountain Cavern, Deep Cavern |
| **Greatwoods Cavern** | E Greatwoods (Diana's territory) | → Deep Cavern, Mountain Cavern |

**Effect:** A unit at a cavern entrance can move to any other cavern entrance as its free move (instead of moving to an adjacent hex). Units in caverns are hidden from scouting.

The cavern network is the **shortcut system**. It lets Diana reach Pluto Castle (and Mars's flank) without crossing the open map. It lets Mars reach Jupiter Castle quickly through the mountain interior. It creates surprise routes that reward players who control the entrances.

### Discovery Sites (6)

Scattered across the map in specific hexes. Each contains a face-down Discovery Token (equipment, bonus resources, or event). To claim: have a revealed unit there (Gatherer counts). First player to claim gets the token.

Placed in locations that reward early exploration:
- 1 in Mountains (near Jupiter Castle approach)
- 1 in North Woods (between Ceres Castle and Minerva's territory)
- 1 in Highlands (Minerva's backyard — they should find this first)
- 1 in Greatwoods (Diana's territory — deep in the forest)
- 1 on the River (central, contested)
- 1 in Southern Reaches (near Apollo/Mars border)

---

## Strategic Flow — How Games Should Play Out

### Act I (Rounds 1-4): The Scramble

**Round 1-2:** Everyone is placing Gatherers on nearby food hexes. Mars pushes north toward Ceres Castle or south toward Pluto Castle. Minerva scouts from the highlands, trying to figure out where Mars and Diana are heading. Apollo uses the river for mobility, racing to claim Discovery Sites. Diana quietly spreads Gatherers through the Greatwoods, building a food surplus.

**Round 3-4:** First contact. Mars and Minerva clash near Ceres Castle — or one of them takes it unopposed while the other went for a different target. Someone scouts Mercury Castle's garrison. Reserve Track groups start appearing, creating tension about where the first Deployment Strike will land. Discovery Sites are being claimed, equipment is being found.

### Act II (Rounds 5-8): The War

Neutral castles are held (or contested). Players start eyeing each other's territory. The Reserve Track becomes terrifying with Space 3 range — a force withdrawn in the Greatwoods could emerge at Mercury Castle, or at Mars's home. Passive scouting perimeters become critical — Alert units spread across the board to block deployment options. Desperate Gambits unlock — someone might Scorched Earth a contested food hex, or use Martyrdom to rally from a devastating ambush. Starvation tightens, forcing players to keep Gatherers out even when they know attacks are coming.

### Act III (Rounds 9-12): The Reckoning

Starvation is brutal. Armies thin. Every castle matters for VP. Players with 2 neutral castles are leading. Players with 0 are desperate — making Gambits, launching all-in Reserve Track strikes at enemy home castles (4 VP each). The cavern network becomes a critical surprise route. Final-round plays for Mercury Castle or a home castle raid decide the game.

---

## Anti-Turtle Analysis

A turtling player (stays home, gathers, defends) gets:
- 0 VP from neutral castles (didn't take any)
- 0 VP from combat victories (didn't fight)
- 0 VP from conversions (didn't convert)
- Maybe 2-5 VP from objective card
- Maybe some Valor Token VP if tokens land nearby
- **Total: ~5-10 VP**

An aggressive player who takes 2 neutral castles and wins 4 combats:
- 8 VP from castles
- 4 VP from combat victories
- 2-3 VP from conversions
- 3-5 VP from objective card
- Valor Token VP from chasing tokens
- **Total: ~20-25 VP**

The aggressive player wins by a mile. The turtle can't even keep up with Valor Token VP because tokens rotate randomly and a player locked in one area will miss most of them.

---

## What Needs To Happen Next

1. **Assign specific hex numbers** to each region, castle, and special hex on the physical map
2. **Design garrison tokens** — how many at each strength level (suggest: 1×strength-2, 2×strength-3, 1×strength-4 for 4 neutral castles)
3. **Validate Food math** — run starvation scenarios across 12 rounds with this resource distribution
4. **Update MAP_OVERVIEW.md** with finalized layout
5. **Remove Olympus, Resource Conversion Centers, and Ancient Ruins** from all docs
6. **Assign Discovery Site hex numbers**

---

## Open Questions

- **Should the 2:1 resource conversion (trading) still exist?** With Resource Conversion Centers removed, the base 2:1 trade is the only conversion. Is that enough flexibility?
- **River fast travel** — should it cost anything to use, or is it free? Currently it replaces your free move. This makes the river a huge strategic advantage for Apollo.
- **Cavern movement** — same question. A free move through caverns is very powerful. Should it cost Intel (you need knowledge of the tunnels)?
- **Garrison token distribution** — should players know the total distribution (e.g., "there are two 3s and two 2s") or should it be completely unknown?
