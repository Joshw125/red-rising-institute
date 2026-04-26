# Playtest Notes — Multiplayer (v6.1 + multiplayer)

## Live URLs

**Game (client):** https://redrising-institute.loca.lt
**Server (WebSocket):** wss://redrising-server.loca.lt (used automatically by the client; no need to share with friends)

The client connects to the server URL on page load.

### Tunnel password (one-time, when first visiting the game URL)

When friends first visit the game URL, localtunnel shows a "click to continue" page asking for a "tunnel password." It's the host machine's public IPv4:

**`104.8.176.40`**

Enter that, click Submit, and the game loads. Once per browser/session.

## How to play with remote friends

The game now has **real multiplayer** — separate browsers, server-authoritative state, room codes.

### Flow

1. **You** open https://redrising-institute.loca.lt — the lobby appears
2. Enter your name, pick a player count (2/3/4), click **Create Room**
3. The server gives you a 4-letter room code (e.g. `YVA6`) — share it with your friends via Discord/text
4. Each friend opens the same URL, enters their name, types the code, clicks **Join Room**
5. Each player picks a House (Mars/Diana/Apollo/Minerva) — locked-in once chosen
6. Each player clicks **Mark Ready**
7. **Host (you)** clicks **Start Game** when all are ready
8. The game begins; turns rotate; only the active player's controls are responsive

### Reconnection

If a friend's browser disconnects mid-game, they can refresh and rejoin with the same name + room code. Their slot is held; the game state syncs back to them.

### Hot-seat fallback

If the server is down or you want to play single-browser:
- Append `?local=1` to the URL: https://redrising-institute.loca.lt/?local=1
- This skips the lobby and starts a Mars vs Diana hot-seat game

## What works

- All v6.1 mechanics (orders, combat with retreat-to-RT, castle assault, Reserve Track, Tactics Cards, Proctor cards, Objectives, Discovery Sites, win conditions)
- Server-authoritative game state — no possibility of clients diverging
- 2-4 player rooms
- Reconnection (refresh and rejoin with same name)
- Chat protocol exists in server but no UI yet — easy add later

## Known gaps

- **No per-player view filtering** — every client sees the full state, including opponents' Tactics Cards, secret Objectives, and other "hidden" info. The privacy layer is a real to-do but not blocking play if friends are honor-code about not peeking. Implementing it is server-side (filter the broadcast state per recipient) — about an hour of work.
- **No fog of war** — opponent unit positions are visible. Same as above; players can self-enforce.
- **Server is on localtunnel** — if your machine sleeps or the tunnel dies, multiplayer dies. For a permanent setup, deploy to Render (see [DEPLOY.md](./DEPLOY.md), or specifically the `server/` README).

## To restart everything if it dies

```bash
cd C:/Users/joshu/red-rising-institute/digital
npm run build
npx serve dist -l 4173 -s &

cd server
npm start &

cd ..
npx localtunnel --port 4173 --subdomain redrising-institute &
npx localtunnel --port 3002 --subdomain redrising-server &
```

Or use the convenience script: `start-all.bat` (Windows) — see below.

## Server deployment to Render (recommended for permanent setup)

The server has `render.yaml` configured. To deploy:

1. Push this repo to GitHub
2. On Render, create a new Web Service from the repo
3. Set the **root directory** to `digital/server`
4. Render auto-detects render.yaml and uses the right commands
5. Set env var `PORT=10000`
6. Deploy

You'll get a URL like `https://red-rising-institute-server.onrender.com`. Update `digital/.env.production` with `VITE_SERVER_URL=wss://red-rising-institute-server.onrender.com`, then redeploy the client (Vercel/Netlify).

After this, no tunnels needed — the server lives in the cloud, the client is a static site, and it Just Works.
