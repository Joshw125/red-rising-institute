# Deployment Guide

The current "live URL" via localtunnel is a quick-and-dirty setup that requires:
- Your machine to stay on
- One-time captcha + tunnel password from visitors
- Re-running the tunnel command if it disconnects

For a permanent URL (no machine, no captcha, no password), deploy to a static host. Three good options:

## Option A — Vercel (recommended)

1. Sign up at https://vercel.com (free tier is generous)
2. Install the CLI: `npm i -g vercel`
3. From this directory:
   ```bash
   vercel
   ```
4. First time: it asks login + project name. Subsequent deploys: just `vercel --prod`.

The included `vercel.json` configures the build command and output directory. Vercel auto-detects Vite.

## Option B — Netlify

1. Sign up at https://netlify.com
2. Install CLI: `npm i -g netlify-cli`
3. From this directory:
   ```bash
   netlify deploy --build
   netlify deploy --build --prod
   ```

Netlify auto-detects Vite from `package.json`.

## Option C — Cloudflare Pages

1. Sign up at https://pages.cloudflare.com
2. Connect a GitHub repo (push this project to GitHub first)
3. Set build command: `npm run build`
4. Set output directory: `dist`

Cloudflare Pages gives unlimited bandwidth on the free tier — best for a public game.

## Option D — Manual static hosting

1. `npm run build` produces `dist/`
2. Upload `dist/` contents to any static host:
   - GitHub Pages (push to gh-pages branch)
   - Surge.sh (`npx surge dist`)
   - AWS S3 + CloudFront
   - Any web server with a public IP

## After deploy

Update `PLAYTEST_NOTES.md` and `README.md` with the new permanent URL. Tear down the localtunnel.
