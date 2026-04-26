#!/usr/bin/env node
// Watchdog for localtunnel — auto-restarts a tunnel if it exits.
// Usage: node tunnel-keepalive.js <port> <subdomain>
// Example: node tunnel-keepalive.js 4173 redrising-institute

import { spawn } from 'child_process';

const port = process.argv[2];
const subdomain = process.argv[3];

if (!port || !subdomain) {
  console.error('Usage: node tunnel-keepalive.js <port> <subdomain>');
  process.exit(1);
}

const RESTART_DELAY_MS = 2000;

function start() {
  console.log(`[${new Date().toISOString()}] starting tunnel: ${subdomain} -> :${port}`);
  const child = spawn(
    process.platform === 'win32' ? 'npx.cmd' : 'npx',
    ['localtunnel', '--port', port, '--subdomain', subdomain],
    { stdio: ['ignore', 'pipe', 'pipe'] }
  );

  child.stdout.on('data', (d) => process.stdout.write(`[${subdomain}] ${d}`));
  child.stderr.on('data', (d) => process.stderr.write(`[${subdomain}!] ${d}`));

  child.on('exit', (code) => {
    console.log(`[${new Date().toISOString()}] tunnel ${subdomain} exited (code ${code}). Restarting in ${RESTART_DELAY_MS}ms…`);
    setTimeout(start, RESTART_DELAY_MS);
  });
}

start();

// Quiet exit on Ctrl-C
process.on('SIGINT', () => process.exit(0));
process.on('SIGTERM', () => process.exit(0));
