#!/usr/bin/env node
// Rewrite `/media/<name>.jpg` references to `/media/<name>.svg` in
// lib/projects.ts so the static gallery picks up the placeholder SVGs we just
// generated. Pure byte-level replacement — preserves UTF-8 encoding.

const fs = require('node:fs');
const path = require('node:path');

const file = path.resolve(__dirname, '..', 'lib', 'projects.ts');
const before = fs.readFileSync(file, 'utf8');
const re = /'\/media\/([^']+)\.jpg'/g;
const matches = before.match(re) || [];
if (matches.length === 0) {
  console.log('no /media/*.jpg references found, nothing to do');
  process.exit(0);
}
const after = before.replace(re, "'/media/$1.svg'");
fs.writeFileSync(file, after, 'utf8');
console.log(`rewrote ${matches.length} references in lib/projects.ts`);
