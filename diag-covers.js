// /j-web/diag-covers.js
// Diagnostic: screenshot projects section, sample pixel at each card center,
// AND probe each /covers/*.svg via DOM Image with cacheBust.
//
// Outputs:
//   diag-fullpage.png        full page
//   diag-projects.png        projects section only
//   diag-results.json        full report (cards/probes/pixels)
//   human-readable summary   printed to stdout

const puppeteer = require('puppeteer-core');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const TARGET = 'http://localhost:3000/';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const OUT_DIR = process.cwd();

function setPixel(img, x, y) {
  const idx = (y * img.width + x) * img.channels;
  return [img.data[idx], img.data[idx + 1], img.data[idx + 2], img.data[idx + 3]];
}

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  const logs = [];
  page.on('console', (m) => logs.push(`CONSOLE.${m.type()}: ${m.text()}`));
  page.on('pageerror', (e) => logs.push(`PAGEERROR: ${e.message}`));
  page.on('requestfailed', (r) => {
    const u = r.url();
    if (u.includes('/covers/') || u.includes('/media/')) logs.push(`REQFAIL: ${r.failure()?.errorText} ${u}`);
  });
  page.on('response', (r) => {
    const u = r.url();
    if (u.includes('/covers/') || u.includes('/media/')) logs.push(`RESP ${r.status()} ${u}`);
  });

  await page.goto(TARGET, { waitUntil: 'networkidle0', timeout: 60000 });

  // scroll #projects into view
  await page.evaluate(() => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ block: 'start' });
  });
  await new Promise((r) => setTimeout(r, 800));

  // Collect cards + run imageProbe for each cover
  const probe = await page.evaluate(async () => {
    const grid = document.querySelector('#projects .grid');
    if (!grid) return { error: 'no grid' };
    const cards = Array.from(grid.children);
    const cardsOut = [];
    for (let i = 0; i < cards.length; i++) {
      const c = cards[i];
      const idxText = c.querySelector('.font-mono')?.textContent?.trim() || `card${i}`;
      const coverDiv = c.querySelector('div[style*="background-image"]');
      const cs = coverDiv ? getComputedStyle(coverDiv) : null;
      const r = c.getBoundingClientRect();
      cardsOut.push({
        i,
        idx: idxText,
        bgImage: cs ? cs.backgroundImage : null,
        bgSize: cs ? cs.backgroundSize : null,
        rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
      });
    }

    // imageProbe: load each SVG with cacheBust
    const probeOne = (src) => new Promise((resolve) => {
      const img = new Image();
      const url = src + (src.includes('?') ? '&' : '?') + 'cb=' + Date.now() + '_' + Math.random().toString(36).slice(2);
      let done = false;
      const finish = (event) => {
        if (done) return;
        done = true;
        resolve({
          src,
          url,
          event,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          complete: img.complete,
        });
      };
      img.onload = () => finish('load');
      img.onerror = () => finish('error');
      setTimeout(() => finish('timeout'), 6000);
      img.src = url;
    });
    const probes = await Promise.all([
      probeOne('/covers/aicss.svg'),
      probeOne('/covers/time-fold.svg'),
      probeOne('/covers/humanity-docs.svg'),
      probeOne('/covers/lims.svg'),
      probeOne('/covers/ue-city.svg'),
      probeOne('/covers/arbook.svg'),
      probeOne('/covers/anifocus.svg'),
    ]);
    return { cards: cardsOut, probes };
  });

  // screenshot the section
  await page.evaluate(() => document.getElementById('projects').scrollIntoView({ block: 'start' }));
  await new Promise((r) => setTimeout(r, 200));
  const sec = await page.$('#projects');
  const secBuf = await sec.screenshot();
  fs.writeFileSync(path.join(OUT_DIR, 'diag-projects.png'), secBuf);
  const fullBuf = await page.screenshot({ fullPage: true });
  fs.writeFileSync(path.join(OUT_DIR, 'diag-fullpage.png'), fullBuf);

  // Pixel sampling: load diag-projects.png, sample at each card's center relative to section.
  // But because the section's BoundingClientRect was measured BEFORE scrolling (some clips
  // are fine — sec.screenshot captures element bounds exactly). Convert card rect to local.
  const img = sharp(secBuf);
  const md = await img.metadata();
  const raw = await img.raw().toBuffer({ resolveWithObject: true });
  const channelNum = md.channels || 4;
  function px(x, y) {
    const cx = Math.max(0, Math.min(md.width - 1, Math.round(x)));
    const cy = Math.max(0, Math.min(md.height - 1, Math.round(y)));
    const idx = (cy * md.width + cx) * channelNum;
    return [raw.data[idx], raw.data[idx + 1], raw.data[idx + 2], raw.data[idx + 3]];
  }

  // For pixel sample, scroll the page back to top to recompute coords consistently, but
  // since we already screenshotted the section element (whose internal coordinates match
  // getBoundingClientRect), we can re-measure in-page and convert.
  const cardCoords = await page.evaluate(() => {
    const sec = document.getElementById('projects');
    const sr = sec.getBoundingClientRect();
    const cards = Array.from(sec.querySelectorAll('.grid > *'));
    return cards.map((c, i) => {
      const cr = c.getBoundingClientRect();
      return {
        i,
        idx: c.querySelector('.font-mono')?.textContent?.trim() || `card${i}`,
        // Local coords relative to section
        lx: cr.x - sr.x,
        ly: cr.y - sr.y,
        cw: cr.width,
        ch: cr.height,
      };
    });
  });

  const pixels = cardCoords.map((c) => {
    const cx = Math.round(c.lx + c.cw / 2);
    const cy = Math.round(c.ly + c.ch / 2);
    // also sample a few corners for context
    const topLeft = px(c.lx + 8, c.ly + 8);
    const center = px(cx, cy);
    const bottomRight = px(c.lx + c.cw - 8, c.ly + c.ch - 8);
    return { i: c.i, idx: c.idx, sampleX: cx, sampleY: cy, center, topLeft, bottomRight };
  });

  // Decide paint/no-paint from pixel evidence:
  // For a filled SVG-cover card with gradient overlay, the rendered card-center pixel should
  // be ~darker than the page bg but should not match the gradient overlay black-ish
  // exactly. We compare to a baseline: also sample a card whose cover IS known (aicss) and
  // flag obvious patterns. Simpler: compute luminance range; if any card center is bright
  // AND card has bgImage set AND imageProbe says load → "paints".
  // We will let the user inspect diag-projects.png. The key signal is:
  //   - did the PNG bytes at the card center change compared to a known background?
  // Print raw pixel bytes; user can compare with previous run.
  const report = {
    cards: cardCoords.map((c, i) => ({
      i: c.i,
      idx: c.idx,
      rect: { x: Math.round(c.lx), y: Math.round(c.ly), w: Math.round(c.cw), h: Math.round(c.ch) },
    })),
    bgImage: probe.cards.map((c) => ({ i: c.i, idx: c.idx, bgImage: c.bgImage, bgSize: c.bgSize })),
    probes: probe.probes,
    pixels,
  };
  fs.writeFileSync(path.join(OUT_DIR, 'diag-results.json'), JSON.stringify(report, null, 2));

  // ---- human readable ----
  console.log('===== CARDS =====');
  cardCoords.forEach((c) => {
    const r = report.bgImage.find((b) => b.i === c.i);
    console.log(`${c.idx}  rect=(${Math.round(c.lx)},${Math.round(c.ly)} ${Math.round(c.cw)}x${Math.round(c.ch)}) bgImage=${r?.bgImage}`);
  });
  console.log('\n===== IMAGE PROBE (cacheBusted <img> load) =====');
  probe.probes.forEach((p) => {
    console.log(`  ${p.src.padEnd(28)} event=${p.event.padEnd(7)} natural=${p.naturalWidth}x${p.naturalHeight} complete=${p.complete}`);
  });
  console.log('\n===== PIXEL SAMPLES (center / top-left / bottom-right of card on diag-projects.png) =====');
  pixels.forEach((p) => {
    const c = p.center;
    const tl = p.topLeft;
    const br = p.bottomRight;
    const lum = (a) => 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
    console.log(
      `  ${p.idx}  center=rgba(${c[0]},${c[1]},${c[2]},${c[3]}) L=${lum(c).toFixed(0)}  ` +
        `TL=rgba(${tl[0]},${tl[1]},${tl[2]},${tl[3]}) BR=rgba(${br[0]},${br[1]},${br[2]},${br[3]})`
    );
  });
  console.log('\n===== NETWORK / CONSOLE =====');
  console.log(logs.join('\n') || '(no errors)');

  await browser.close();
})().catch((e) => {
  console.error('FATAL', e);
  process.exit(1);
});
