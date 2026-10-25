import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
let checked = 0;
function scan(directory) {
  for (const name of readdirSync(directory)) {
    if (name === '.git') continue;
    const file = resolve(directory, name);
    if (statSync(file).isDirectory()) { scan(file); continue; }
    if (!name.endsWith('.html')) continue;
    const html = readFileSync(file, 'utf8');
    for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
      const href = match[1];
      if (/^(?:[a-z]+:|\/\/|#)/i.test(href)) continue;
      const pathname = href.split(/[?#]/)[0];
      if (!pathname || pathname === '/') continue;
      const local = resolve(pathname.startsWith('/') ? root : dirname(file), '.' + (pathname.startsWith('/') ? pathname : '/' + pathname));
      assert(local.startsWith(root + '/'), `Link escapes website: ${href}`);
      assert(existsSync(local) || existsSync(local + '.html'), `Missing ${href} in ${file}`);
      checked++;
    }
  }
}
scan(root);
const publicPages = ['index', 'how-it-works', 'games', 'community', 'about', 'contact', 'updates', 'website-privacy'];
for (const name of publicPages) {
  const html = readFileSync(resolve(root, name + '.html'), 'utf8');
  assert(!/early.access|private beta|request access/i.test(html), `${name} still advertises early access`);
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `${name} needs one page heading`);
}
for (const name of ['signup', 'home', 'profile', 'new-password', 'auth/callback', 'account-entry']) {
  const html = readFileSync(resolve(root, name + '.html'), 'utf8');
  assert(html.includes('noindex,nofollow'), `${name} should not be indexed`);
}
const config = JSON.parse(readFileSync(resolve(root, 'vercel.json'), 'utf8'));
assert(config.cleanUrls);
assert(config.rewrites.some(rule => rule.source === '/' && rule.has?.some(item => item.key === 'account' && item.value === '1')));
console.log(`Verified ${checked} asset/page links, public page structure, private-page indexing, and account routing.`);
