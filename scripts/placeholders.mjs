// Generates placeholder images (portrait, project figures, photo posts, OG image).
// Run: npm run placeholders   — existing files are NOT overwritten, so your real images are safe.
import sharp from 'sharp';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

const force = process.argv.includes('--force');

async function out(path, svg, format = 'jpg') {
  if (existsSync(path) && !force) return console.log('skip  ', path);
  mkdirSync(dirname(path), { recursive: true });
  const img = sharp(Buffer.from(svg));
  await (format === 'png' ? img.png() : img.jpeg({ quality: 82 })).toFile(path);
  console.log('wrote ', path);
}

// Deterministic pseudo-random numbers so re-runs look the same.
function rng(seed) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}

// ---------- Portrait ----------
const portrait = `
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000">
  <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#d9e6e3"/><stop offset="1" stop-color="#a9c4bf"/></linearGradient></defs>
  <rect width="800" height="1000" fill="url(#g)"/>
  <circle cx="400" cy="400" r="150" fill="#7fa29c"/>
  <path d="M120 1000 C 140 720, 660 720, 680 1000 Z" fill="#7fa29c"/>
  <text x="400" y="960" font-family="Helvetica" font-size="30" fill="#4c6b66" text-anchor="middle">replace src/assets/portrait.jpg</text>
</svg>`;

// ---------- Project figures (fake charts) ----------
function figure(kind, seed, label) {
  const r = rng(seed);
  const W = 1440, H = 810, pad = 110;
  let marks = '';
  if (kind === 'lines') {
    const series = [
      ['#2a78d6', 0.0],
      ['#eb6834', 0.35],
    ];
    for (const [color, lift] of series) {
      let y = 0.5, pts = [];
      for (let i = 0; i <= 40; i++) {
        y += (r() - 0.5) * 0.08 + lift * 0.01;
        const px = pad + (i / 40) * (W - 2 * pad);
        const py = H - pad - Math.min(0.95, Math.max(0.05, y)) * (H - 2 * pad);
        pts.push(`${px.toFixed(1)},${py.toFixed(1)}`);
      }
      marks += `<polyline points="${pts.join(' ')}" fill="none" stroke="${color}" stroke-width="5" stroke-linejoin="round"/>`;
    }
  } else if (kind === 'bars') {
    const n = 8, bw = (W - 2 * pad) / n;
    for (let i = 0; i < n; i++) {
      const h = (0.25 + r() * 0.65) * (H - 2 * pad);
      marks += `<rect x="${pad + i * bw + 10}" y="${H - pad - h}" width="${bw - 20}" height="${h}" rx="6" fill="${i === 5 ? '#eb6834' : '#2a78d6'}"/>`;
    }
  } else {
    for (let i = 0; i < 120; i++) {
      const x = r(), y = Math.min(0.95, Math.max(0.05, x * 0.7 + (r() - 0.5) * 0.35 + 0.1));
      marks += `<circle cx="${pad + x * (W - 2 * pad)}" cy="${H - pad - y * (H - 2 * pad)}" r="9" fill="#2a78d6" fill-opacity="0.65"/>`;
    }
    marks += `<line x1="${pad}" y1="${H - pad - 0.13 * (H - 2 * pad)}" x2="${W - pad}" y2="${H - pad - 0.83 * (H - 2 * pad)}" stroke="#eb6834" stroke-width="5"/>`;
  }
  let grid = '';
  for (let i = 0; i <= 4; i++) {
    const y = pad + (i / 4) * (H - 2 * pad);
    grid += `<line x1="${pad}" x2="${W - pad}" y1="${y}" y2="${y}" stroke="#e2ded4" stroke-width="2"/>`;
  }
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="#fffefb"/>
  ${grid}${marks}
  <text x="${pad}" y="70" font-family="Helvetica" font-size="34" fill="#4d4b45">${label}</text>
  <text x="${W - pad}" y="${H - 40}" font-family="Helvetica" font-size="24" fill="#b4532a" text-anchor="end">placeholder figure</text>
</svg>`;
}

// ---------- Photo-like landscapes ----------
function landscape(seed, w, h, palette) {
  const r = rng(seed);
  const [sky1, sky2, ...hills] = palette;
  let layers = '';
  hills.forEach((color, i) => {
    const base = h * (0.45 + i * 0.14);
    let d = `M0 ${h} L0 ${base}`;
    for (let x = 0; x <= w; x += w / 12) d += ` L${x.toFixed(0)} ${(base - r() * h * 0.12).toFixed(0)}`;
    d += ` L${w} ${h} Z`;
    layers += `<path d="${d}" fill="${color}"/>`;
  });
  const sunX = w * (0.2 + r() * 0.6), sunY = h * (0.2 + r() * 0.15);
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${sky1}"/><stop offset="1" stop-color="${sky2}"/></linearGradient></defs>
  <rect width="${w}" height="${h}" fill="url(#s)"/>
  <circle cx="${sunX}" cy="${sunY}" r="${Math.min(w, h) * 0.07}" fill="#fff6e0" fill-opacity="0.85"/>
  ${layers}
</svg>`;
}

const palettes = {
  dawn: ['#f6d5b8', '#f3b28c', '#c97b63', '#8e5149', '#4d2f33'],
  coast: ['#bfe0ea', '#e8f1ef', '#7fb2b5', '#3f7f86', '#1f4b54'],
  forest: ['#dce8d0', '#f4f1e1', '#88a37a', '#4f7553', '#2b4535'],
  dusk: ['#3d4a7a', '#d98f86', '#6c5b7b', '#3d3557', '#1f1c2e'],
};

const photoPosts = [
  ['field-trip', 'coast', 11, ['cover', '1', '2', '3']],
  ['monsoon-walk', 'forest', 23, ['cover', '1', '2']],
  ['conference-city', 'dusk', 37, ['cover', '1', '2', '3']],
  ['first-light', 'dawn', 51, ['cover', '1', '2']],
];

// ---------- OG image ----------
const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#f7f5f0"/>
  <rect x="80" y="80" width="64" height="64" rx="14" fill="#0f5c57"/>
  <text x="112" y="122" font-family="Menlo, monospace" font-size="24" fill="#fff" text-anchor="middle">YN</text>
  <text x="80" y="260" font-family="Georgia, serif" font-size="72" fill="#1c1b18">Your Name</text>
  <text x="80" y="330" font-family="Helvetica" font-size="30" fill="#4d4b45">Information Systems · Operations Management</text>
  <text x="80" y="540" font-family="Menlo, monospace" font-size="22" fill="#7c7970">priyanshi8806.github.io</text>
</svg>`;

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#0f5c57"/><text x="32" y="41" font-family="Menlo, monospace" font-size="24" fill="#fff" text-anchor="middle">YN</text></svg>`;

await out('src/assets/portrait.jpg', portrait);
await out('src/content/projects/figures/forecast-overrides.png', figure('scatter', 3, 'Override size vs. forecast error'), 'png');
await out('src/content/projects/figures/pos-data-sharing.png', figure('lines', 7, 'Order variability by tier'), 'png');
await out('src/content/projects/figures/demand-forecasting.png', figure('lines', 13, 'Forecast vs. actual demand'), 'png');
await out('src/content/projects/figures/inventory-optimization.png', figure('bars', 17, 'Inventory cost by warehouse'), 'png');
await out('src/content/projects/figures/masters-thesis.png', figure('scatter', 19, 'Main result'), 'png');
await out('src/content/projects/figures/bachelors-project.png', figure('bars', 29, 'Waiting time by policy'), 'png');
for (const [slug, pal, seed, files] of photoPosts) {
  for (const [i, f] of files.entries()) {
    const portraitShape = f === '2';
    await out(
      `src/content/photos/${slug}/${f}.jpg`,
      landscape(seed + i * 5, portraitShape ? 1000 : 1600, portraitShape ? 1300 : 1066, palettes[pal]),
    );
  }
}
await out('public/og-default.png', og, 'png');
if (!existsSync('public/favicon.svg') || force) writeFileSync('public/favicon.svg', favicon);
