#!/usr/bin/env node
// Generate placeholder SVGs for the 13 missing /media/*.jpg references.
// Drop real assets at the same paths to override these.

const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'public', 'media');
fs.mkdirSync(outDir, { recursive: true });

const placeholders = [
  { name: 'aicss-1',          color: '#00f0ff', label: 'AI SCENE PARSE' },
  { name: 'aicss-2',          color: '#00f0ff', label: 'DEPTH MAPPING' },
  { name: 'time-fold-1',      color: '#fbbf24', label: 'POSTER FRAME' },
  { name: 'time-fold-2',      color: '#fbbf24', label: 'KEY SCENE' },
  { name: 'humanity-docs-1',  color: '#a855f7', label: 'STILL \u00b7 01' },
  { name: 'humanity-docs-2',  color: '#a855f7', label: 'BEHIND THE LENS' },
  { name: 'lims-1',           color: '#00f0ff', label: 'DASHBOARD VIEW' },
  { name: 'lims-2',           color: '#00f0ff', label: 'DATA MODULE' },
  { name: 'urban-escape-1',   color: '#ff6b35', label: 'DIALOGUE SYSTEM' },
  { name: 'urban-escape-2',   color: '#ff6b35', label: 'AI ENEMY HUD' },
  { name: 'love-remote-1',    color: '#ff6b9d', label: 'GAMEPLAY' },
  { name: 'love-remote-2',    color: '#ff6b9d', label: 'BRANCHING NARRATIVE' },
  { name: 'love-remote-3',    color: '#ff6b9d', label: 'AFFECTION HUD' },
  { name: 'love-remote-4',    color: '#ff6b9d', label: 'ENDING VARIANT' },
];

for (const p of placeholders) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a0a0f"/>
      <stop offset="100%" stop-color="#16161c"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${p.color}" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="${p.color}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="${p.color}" stroke-opacity="0.05" stroke-width="0.5"/>
    </pattern>
  </defs>
  <rect width="800" height="450" fill="url(#bg)"/>
  <rect width="800" height="450" fill="url(#grid)"/>
  <ellipse cx="400" cy="225" rx="320" ry="200" fill="url(#glow)"/>
  <g stroke="${p.color}" stroke-opacity="0.35" stroke-width="1" fill="none">
    <polyline points="40,40 40,60 60,60"/>
    <polyline points="760,40 760,60 740,60"/>
    <polyline points="40,410 40,390 60,390"/>
    <polyline points="760,410 760,390 740,390"/>
  </g>
  <text x="400" y="225" text-anchor="middle" font-family="'Courier New', monospace" font-size="20" fill="${p.color}" fill-opacity="0.85" letter-spacing="6">${p.label}</text>
  <text x="400" y="260" text-anchor="middle" font-family="'Courier New', monospace" font-size="11" fill="#a1a1aa" letter-spacing="3" fill-opacity="0.6">PLACEHOLDER \u00b7 DROP REAL ASSET HERE</text>
  <text x="40" y="440" font-family="'Courier New', monospace" font-size="10" fill="${p.color}" fill-opacity="0.55" letter-spacing="2">${p.name.toUpperCase()}</text>
</svg>
`;
  const filePath = path.join(outDir, `${p.name}.svg`);
  fs.writeFileSync(filePath, svg, 'utf8');
  console.log(`wrote ${filePath}`);
}
