# Red Rising: The Institute — Digital Prototype

A digital playtesting prototype for the board game.

> **Live URL (tonight's playtest):** https://redrising-institute.loca.lt
> See [PLAYTEST_NOTES.md](./PLAYTEST_NOTES.md) for the tunnel password and how to play with remote friends.

## Stack

- Vite + React 18 + TypeScript
- Tailwind CSS
- Zustand (with Immer) for state
- SVG hex map overlaid on the Nano Banana base art

## Run

```bash
npm install
npm run dev
```

## Layout

- `src/` — React UI
- `shared/types/` — game state types
- `shared/data/` — hex grid, houses, castles, calibration
- `shared/engine/` — (TODO) deterministic rules engine
- `public/base_art.png` — board art (copied from `../map/`)

## Status — v6.1 (playtest-ready)

Hot-seat Mars vs Diana, full game-loop end-to-end:

- All orders: Move (free move + 1 order), Hold, Gather, Recruit (3F), Rally, Fortify (4F), Withdraw, Deploy, Attack, Explore
- Combat: 2-phase Tactics Card reveal, retreat-to-RT aftermath, conversions, flag capture, Diana's Hunt prompt, Mars Blood Rally + Apollo Healer's Art recall
- Castle assault with garrison combat + 5 VP capture event
- 30 Proctor cards drawn at round start (10 per Act)
- 10 secret Objective Cards (one per player, 2-5 VP)
- 7 Discovery Sites (Explore for a Tactics Card)
- Win conditions: Flag capture (instant 2p), Domination (34+ hexes), Round 12 VP
- Visible game log, readiness pips on the map, Reserve Track panel, Objective panel

## Run locally

```bash
npm install
npm run dev
# or for production:
npm run build && npx serve dist
```

## Next steps (post-playtest)

1. Real multiplayer (separate browsers + state sync) — currently hot-seat only
2. Fog of war (unlocks Minerva's Owl's Wisdom + Tactician)
3. Equipment Cards (designed in `mechanics/EQUIPMENT_CARDS.md`, not yet wired)
4. Desperate Gambits (Act II/III emergency actions)
5. Conversion choice UI (currently auto-greedy)
6. Bot AI for solo play
7. Mobile-friendly layout pass
