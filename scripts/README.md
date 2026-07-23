# scripts/

Ad-hoc maintenance utilities. Run them with `node scripts/<name>.js` from the project root.

| Script | Purpose |
|--------|---------|
| `reencode-media-jpgs.js` | Re-encodes every PNG-as-`.jpg` in `public/media/` to a real JPEG using `sharp` (transitively available via `@vercel/og`). Strips alpha against the design-token `--bg` (`#08080A`) and writes at quality 88 with mozjpeg. Updates files in place. |
| `restore-real-assets.js` | One-time recovery helper: deletes stale placeholder SVGs from `public/media/` and flips `lib/projects.ts` references from `/media/*.svg` back to `/media/*.jpg`. Idempotent. |

These are not part of the build pipeline — keep them around as quick tools for the next time assets change.
