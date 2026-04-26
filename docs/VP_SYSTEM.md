# Victory Point System

> The single authoritative reference for all scoring in Red Rising: The Institute.
> Any VP values in other documents that conflict with this file are outdated.

---

## Victory Conditions (Game-Ending)

The game can end three ways. The first two are **instant wins** — VP is not compared.

### 1. Flag Capture (Instant Win)

Subdue enemy Flag-bearers and hold them in hexes you control.

| Player Count | Flags Needed | Details |
|-------------|-------------|---------|
| 2 players | 1 flag | Capture the enemy's Flag-bearer |
| 3 players | 2 flags | Capture 2 of 2 enemy flags |
| 4 players | 2 flags | Capture 2 of 3 enemy flags |

- Flag-bearers **cannot be converted**, only subdued (COMBAT.md)
- In Acts I–II, subdued Flag-bearers can only be captured from the **same hex**
- In Act III, subdued Flag-bearers can be captured from **adjacent hexes** (easier late-game)
- **Target:** ~20-30% of games should end this way

### 2. Domination (Instant Win)

Control **34+ hexes** (more than 50% of 77) at the end of any round.

- Requires sustained military and territorial investment
- Should be the "I'm clearly winning" finisher
- **Target:** ~15% of games end this way

### 3. Victory Points (After Round 12)

If neither instant win triggers by the end of Round 12, the player with the most VP wins.

- **Target:** ~55% of games end this way

---

## VP Scoring Table

### Castle Control (v6.0 — anti-turtle rebalance)

| Source | VP | Timing | Notes |
|--------|-----|--------|-------|
| **Castle CAPTURE event** | **5 VP** | At moment of claim (one-time, irrevocable) | Awarded when garrison defeated AND Flag-bearer present. Stays even if castle is later retaken. |
| Holding a **neutral castle** at game end | **1 VP** | End of game | Was 4 — reduced to discourage turtling on captured castles |
| Holding an **enemy home castle** at game end | **2 VP** | End of game | Was 4 — partial reduction (still rewards aggressive enemy-territory play) |
| Holding your **own home castle** | **0 VP** | — | You don't score for what you started with |

**Castle VP comes from the act of capture, not the act of holding.** A player who captures 2 neutral castles scores 10 VP at the moment of capture, plus 2 VP if they still hold them at game end = 12 VP. A turtle who never captures but defends 2 home-territory castles = 0 VP. The capture event is irrevocable, so even if you lose the castle later, the 5 VP stays banked.

### Combat

| Source | VP | Timing | Notes |
|--------|-----|--------|-------|
| Each **combat won** | **1 VP** | Immediate (permanent) | Tracked on player board. Rewards aggression. |

A combat is "won" when your side controls the hex after resolution (all enemy active units subdued, converted, or retreated). Contested results (both sides have active units remaining) do not count as a win for either side.

**Design rationale (Decision 17):** Replaced "1 VP per controlled hex at game end" which rewarded turtling. Combat VP rewards engagement and aggression.

### Valor Tokens

| Source | VP | Timing | Notes |
|--------|-----|--------|-------|
| Controlling a Valor Token hex at round end | **2 VP** (or 2 bonus resources) | End of round | Player chooses VP or resources |
| Controlling a Valor Token hex at round end (Act III) | **4 VP** (or 2 bonus resources) | End of round | Doubled in Act III |

- 3-5 Valor Tokens placed on random hexes at the start of each round
- Tokens **rotate** each round — no hex is permanently a Valor Token location
- Player **chooses** 2 VP or 2 resources per token controlled (not both)
- Act III doubling makes late-game Valor Tokens critical swing points

### Conversion (v6.0)

| Source | VP | Timing | Notes |
|--------|-----|--------|-------|
| Each **enemy unit converted** over the course of the game | **2 VP** | End of game | Cumulative total, tracked on player board (was 1 VP) |

Conversion VP doubled in v6.0 to reward the deeper play (2:1 conversion ratio + risk of bigger combats). A player who converts 4 enemy units scores 8 VP — meaningful late-game pressure on aggressive players.

### Objective Cards

| Source | VP | Timing | Notes |
|--------|-----|--------|-------|
| Completed **Objective Card** | **2–5 VP** (per card) | End of game or when achieved | 1 secret objective per player |

Players draw 2 Objective Cards at setup and keep 1 (secret). Score at game end if the condition is met.

See [OBJECTIVE_CARDS.md](../mechanics/OBJECTIVE_CARDS.md) for the full list of 16 Objective Cards.

---

## VP Summary Table

| Source | VP Value | Type | When Scored |
|--------|---------|------|-------------|
| **Castle CAPTURE event** | **5** | **Permanent** | At moment of claim |
| Neutral castle held | 1 | Temporary (can be taken) | Game end |
| Enemy home castle held | 2 | Temporary | Game end |
| Own home castle held | 0 | — | — |
| Combat won | 1 | Permanent | Immediate |
| Valor Token (Acts I–II) | 2 (or 2 resources) | Semi-temporary (rotates) | End of round |
| Valor Token (Act III) | 4 (or 2 resources) | Semi-temporary | End of round |
| Enemy unit converted | **2** | Permanent | Game end |
| Objective Card | 2–5 | Permanent | Game end / when achieved |

### Typical VP Ranges (Estimated)

| VP Source | Low Game | Average Game | High Game |
|-----------|----------|-------------|-----------|
| Castles | 0 | 4–8 | 12 |
| Combat wins | 0 | 3–5 | 8+ |
| Valor Tokens | 0 | 4–6 | 10+ |
| Conversions | 0 | 2–3 | 5 |
| Objectives | 0 | 3 | 5 |
| **Total** | **0–5** | **16–25** | **35+** |

**Expected winning score:** 20–30 VP in a competitive 4-player game.

---

## VP Balance Analysis

### Temporary vs. Permanent Split

| Type | Sources | Estimated % of Total VP |
|------|---------|------------------------|
| **Temporary** (can be lost) | Castles, Valor Tokens | ~50-60% |
| **Permanent** (locked in) | Combat wins, Conversions, Objectives | ~40-50% |

This meets the Balance Guide target of "at least 40% from temporary sources." Castle control can swing right up to the final round, keeping the game contested.

### Anti-Turtle Validation

**v6.0 sample VP totals (anti-turtle pass):**

| Strategy | Capture events | Held castle | Combat VP | Valor VP | Conversion VP | Total |
|----------|---------------|-------------|----------|---------|--------------|-------|
| **Aggressive** (1 capture, fights often) | 5 | 1 | 6 | 4 | 6 | **22** |
| **Aggressive** (2 captures, takes home castle too) | 15 | 4 | 6 | 4 | 6 | **35+** |
| **Turtle** (defends home, avoids combat) | 0 | 0 | 1 | 2 | 0 | **3 + objective** |
| **Balanced** (1 capture, selective fights) | 5 | 1 | 3 | 4 | 4 | **17 + objective** |

**Turtling is not viable.** A player who avoids combat scores almost nothing. Capture events are the largest single VP source — and they require leaving home territory with a Flag-bearer to assault a fortified castle. The math now strongly rewards aggression.

---

## Tiebreakers

In order:
1. Most castles controlled
2. Most combats won
3. Most total resources
4. Most enemy units currently converted (in your army)

---

## Objective Cards — Complete

All 16 Objective Cards have been designed and documented in [OBJECTIVE_CARDS.md](../mechanics/OBJECTIVE_CARDS.md). Cards are fully aligned with current systems (deterministic combat, Tactics Cards, passive scouting, Reserve Track, Player Boards). Ancient Ruins and Olympus objectives have been replaced.

---

## Open Questions

1. **Combat win VP for garrison fights?** Does defeating a neutral castle garrison count as a "combat won" for VP purposes? **Recommendation:** Yes — it's a deterministic combat with real risk, and should be rewarded.

2. **Simultaneous combat wins?** If two players fight and both claim to have "won" a hex contest (e.g., they fought in different hexes same round), both score. No issue.

3. **Valor Token choice timing.** When does a player choose VP vs. resources? At end of round (after seeing starvation results) or when the token is claimed? **Recommendation:** At end of round, during Valor Token Check phase. Allows reactive decision-making.

4. **Conversion VP for re-converted units.** If Player A converts a unit from Player B, then Player C later converts that same unit from Player A — does Player A still score the conversion VP? **Recommendation:** Yes. VP is for the act of conversion, not for holding the unit. Track on player board, not by unit identity.

---

*Formalized: 2026-03-13. Last updated: 2026-04-26 (v6.0 anti-turtle rebalance — Decision 28).*
*This is the authoritative VP reference. All other VP values in other documents are superseded by this file.*
