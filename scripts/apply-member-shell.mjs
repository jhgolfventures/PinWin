import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const bar = '<nav class="website-return-bar" aria-label="Website navigation"><a href="/">← Back to Website</a><span>PinWin Golf</span></nav>';
function apply(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) { apply(path); continue; }
    if (!entry.name.endsWith('.html')) continue;
    let html = readFileSync(path, 'utf8');
    if (!html.includes('id="expo-reset"')) continue;
    const original = html;
    if (!html.includes('name="robots"')) html = html.replace('</head>', '<meta name="robots" content="noindex,nofollow"></head>');
    if (!html.includes('/assets/member-shell.css')) html = html.replace('</head>', '<link rel="stylesheet" href="/assets/member-shell.css"></head>');
    if (!html.includes('class="website-return-bar"')) html = html.replace(/<body([^>]*)>/, `<body$1>${bar}`);
    if (html !== original) writeFileSync(path, html);
  }
}
apply(root);
