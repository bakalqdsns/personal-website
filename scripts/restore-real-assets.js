#!/usr/bin/env node
// After re-encoding the real assets:
//   1. Delete the placeholder SVGs we generated earlier.
//   2. Flip /media/*.svg references back to /media/*.jpg in lib/projects.ts.

const fs = require('node:fs');
const path = require('node:path');

const mediaDir = path.resolve(__dirname, '..', 'public', 'media');
const projects = path.resolve(__dirname, '..', 'lib', 'projects.ts');

// 1) Remove placeholder SVGs.
const placeholders = fs
  .readdirSync(mediaDir)
  .filter((name) => name.endsWith('.svg'));
for (const name of placeholders) {
  fs.unlinkSync(path.join(mediaDir, name));
  console.log(`removed placeholder ${name}`);
}

// 2) Flip references back to .jpg (only the entries we touched earlier).
const before = fs.readFileSync(projects, 'utf8');
const re = /'\/media\/([^']+)\.svg'/g;
const matches = before.match(re) || [];
if (matches.length === 0) {
  console.log('no .svg references left, nothing to flip');
  process.exit(0);
}
const after = before.replace(re, "'/media/$1.jpg'");
fs.writeFileSync(projects, after, 'utf8');
console.log(`flipped ${matches.length} references .svg -> .jpg in lib/projects.ts`);
