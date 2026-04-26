# Deploy to Render — Step by Step

The repo is committed and ready. Two things to do: push to GitHub, then connect to Render.

## 1. Create the GitHub repo

Go to https://github.com/new and create a new repo:
- **Name:** `red-rising-institute` (or whatever you prefer — just remember it)
- **Visibility:** Private is fine (Render works with private repos)
- **Don't** initialize with a README, .gitignore, or license (we already have those locally)

Click **Create repository**.

## 2. Push your local repo

GitHub will show you the "push an existing repo" commands. From this directory:

```bash
git remote add origin https://github.com/Joshw125/red-rising-institute.git
git branch -M main
git push -u origin main
```

(Replace `Joshw125` with your actual username if different.)

If git asks for credentials, paste your GitHub personal access token. Git Credential Manager on Windows usually remembers it from past pushes.

## 3. Connect to Render

1. Go to https://dashboard.render.com
2. Click **New +** → **Blueprint**
3. Select your `red-rising-institute` repo
4. Render will read `render.yaml` at the repo root and propose two services:
   - `red-rising-institute-server` (Node web service from `digital/server`)
   - `red-rising-institute-client` (Static site from `digital`)
5. Click **Apply**

Render will:
- Build the server (`npm install`)
- Build the client (`npm install && npm run build`)
- Deploy both
- Hook them together via the `VITE_SERVER_URL=wss://red-rising-institute-server.onrender.com` env var

## 4. Done

After ~3-5 minutes, you'll have two URLs:
- **Game (share this):** `https://red-rising-institute-client.onrender.com`
- **Server (under the hood):** `https://red-rising-institute-server.onrender.com`

Open the client URL, create a room, share the 4-letter code with your friends. They open the same URL, type the code, pick a House, and play.

## Free tier caveats

- **First request after 15 min idle is slow.** Render's free tier sleeps web services after inactivity. The first connection of the night will take ~30 seconds to wake the server. After that, it stays awake for the duration of the playtest. Tell your friends "if it's slow at first, refresh once."
- **No persistence.** When the server sleeps, in-flight game state is lost. Don't pause for >15 min mid-game.
- **For permanent always-on:** upgrade the server's plan to Starter ($7/mo) — sleeps never, persistent. Worth it if this becomes a regular thing.

## Updating the deployment

After making code changes locally:

```bash
git add -A
git commit -m "Your commit message"
git push
```

Render auto-redeploys both services on every push to `main`. About 2-3 minutes.

## Troubleshooting

**Server URL doesn't match what's baked into the client?**

If you renamed the server service in render.yaml, update `digital/.env.production`:
```
VITE_SERVER_URL=wss://your-new-name.onrender.com
```
…then commit + push.

**WebSocket connection fails?**

Check the server's logs in the Render dashboard. Most common issues:
- Server is still building (wait 1-2 min)
- Server crashed on startup (check logs for stack trace)
- The client baked in the wrong URL (check `digital/.env.production` and rebuild)

**Render says "render.yaml is invalid"?**

Compare against this repo's `render.yaml` — it follows the Render Blueprint spec exactly. If you customized it, check the YAML indentation.
