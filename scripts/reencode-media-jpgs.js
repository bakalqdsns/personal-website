#!/usr/bin/env node
// Re-encode every mislabeled PNG-as-.jpg in public/media/ as a real JPEG.
// The original files are valid PNG byte streams (magic 89 50 4E 47) but carry
// the .jpg extension, which causes some browsers (and Next.js <Image>) to
// reject the response when the server's Content-Type: image/jpeg does not
// match the real payload.
//
// sharp is transitively available via @vercel/og.

const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');

const mediaDir = path.resolve(__dirname, '..', 'public', 'media');
const entries = fs
  .readdirSync(mediaDir)
  .filter((name) => name.endsWith('.jpg'));

if (entries.length === 0) {
  console.log('no .jpg files to process');
  process.exit(0);
}

(async () => {
  for (const name of entries) {
    const src = path.join(mediaDir, name);
    const tmp = path.join(mediaDir, `${name}.tmp.jpg`);
    try {
      const meta = await sharp(src).metadata();
      // Strip alpha: real JPEGs cannot carry transparency. Any alpha pixels
      // are flattened against a near-black background (matches the design
      // token --bg) so previews stay visually consistent with the dark UI.
      await sharp(src)
        .flatten({ background: { r: 8, g: 8, b: 10 } })
        .jpeg({ quality: 88, mozjpeg: true })
        .toFile(tmp);
      fs.renameSync(tmp, src);
      console.log(`ok   ${name}  ${meta.width}x${meta.height}  -> jpeg(quality 88)`);
    } catch (e) {
      console.error(`fail ${name}: ${e.message}`);
      if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
      process.exitCode = 1;
    }
  }
})();
