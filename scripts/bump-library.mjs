#!/usr/bin/env node
/**
 * After @sakaniui/react <version> is live: put it on sakaniui.com.
 *
 *   node scripts/bump-library.mjs 0.17.0
 *   node scripts/bump-library.mjs 0.17.0 --merge docs/charts-0.17.0     (merge a docs branch that was waiting for it)
 *   node scripts/bump-library.mjs 0.17.0 --no-push                       (everything but the push)
 *
 * It refuses to run until the version is on the registry (a docs build against a version npm does not have yet would
 * fail the production deploy), then: merges the waiting branch if given, installs the version, sets the hero's
 * "Last updated" badge to today, type-checks and builds, commits and pushes to main.
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const [version, ...rest] = process.argv.slice(2);
if (!/^\d+\.\d+\.\d+$/.test(version ?? '')) { console.error('Usage: node scripts/bump-library.mjs <version> [--merge <branch>] [--no-push]'); process.exit(1); }
const mergeBranch = rest.includes('--merge') ? rest[rest.indexOf('--merge') + 1] : null;
const push = !rest.includes('--no-push');

const sh = (cmd, a, o = {}) => execFileSync(cmd, a, { cwd: root, encoding: 'utf8', stdio: o.inherit ? 'inherit' : ['ignore', 'pipe', 'pipe'], ...o });
const step = (m) => console.log(`\n\x1b[1m${m}\x1b[0m`);

step(`Is @sakaniui/react@${version} live?`);
let live = '';
try { live = sh('npm', ['view', `@sakaniui/react@${version}`, 'version']).trim(); } catch { /* E404: not there yet */ }
if (live !== version) { console.error(`  No: npm does not have ${version} yet. Publishing takes about 10 minutes; try again then.`); process.exit(1); }
console.log('  Yes.');

step('Starting point');
const branch = sh('git', ['rev-parse', '--abbrev-ref', 'HEAD']).trim();
if (branch !== 'main') { console.error(`  On ${branch}: switch to main first (git checkout main).`); process.exit(1); }
if (sh('git', ['status', '--porcelain', '--untracked-files=no']).trim()) { console.error('  Uncommitted changes: commit or stash them first.'); process.exit(1); }
sh('git', ['pull', '--ff-only', '--quiet']);
console.log('  main, clean, up to date.');

if (mergeBranch) {
  step(`Merging ${mergeBranch}`);
  sh('git', ['merge', '--no-ff', mergeBranch, '-m', `Merge ${mergeBranch}`], { inherit: true });
}

step(`Installing @sakaniui/react@^${version}`);
sh('npm', ['install', `@sakaniui/react@^${version}`], { inherit: true });

step('Last updated badge');
const pagePath = path.join(root, 'src/app/page.tsx');
const now = new Date();
const day = now.getDate();
const ordinal = `${day}${[, 'st', 'nd', 'rd'][(day % 100 >> 3) ^ 1 && day % 10] || 'th'}`;
const label = `${now.toLocaleString('en-US', { month: 'long' })} ${ordinal}`;
const src = fs.readFileSync(pagePath, 'utf8');
const next = src.replace(/Last updated: [A-Za-z]+ \d+(st|nd|rd|th)/, `Last updated: ${label}`);
if (next === src) console.log(`  Already says "${label}" (or the badge text changed shape: check src/app/page.tsx).`);
else { fs.writeFileSync(pagePath, next); console.log(`  Now says "${label}".`); }

step('Type-check and build');
sh('npx', ['tsc', '--noEmit'], { inherit: true });
sh('npm', ['run', 'build'], { inherit: true });

step('Commit');
sh('git', ['add', '-A', 'package.json', 'package-lock.json', 'src']);
try { sh('git', ['commit', '-q', '-m', `chore: @sakaniui/react ${version}`]); } catch { console.log('  Nothing to commit.'); }
if (push) { sh('git', ['push', 'origin', 'main'], { inherit: true }); console.log('\n\x1b[32mPushed.\x1b[0m Vercel deploys main; check sakaniui.com in a minute.'); }
else console.log('\nCommitted locally (--no-push).');
