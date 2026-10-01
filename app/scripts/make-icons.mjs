// Generates the app's icons (public/icons/*.png) from the brand kit (brand/svg/, made by
// brand/tools/build.mjs). Each variant is rendered once at 1024px with Playwright (Chromium), then
// scaled down with Pillow (Lanczos). Run it again whenever the logo changes:
//   node scripts/make-icons.mjs
// Needs Playwright (global install) and Python 3 with Pillow; neither is needed for `npm run build`.
import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const PLAYWRIGHT = process.env.PLAYWRIGHT_MODULE ?? '/opt/node22/lib/node_modules/playwright/index.mjs';
const { chromium } = await import(PLAYWRIGHT);

const app = resolve(import.meta.dirname, '..');
const out = resolve(app, 'public/icons');
const brand = (name) => readFileSync(resolve(app, '../brand/svg', name), 'utf8');
const at1024 = (svg) => svg.replace(/<svg([^>]*)>/, '<svg$1 width="1024" height="1024">');

// the tile and its gradients, for the shortcut glyphs
const mark = brand('mark.svg');
const defs = mark.match(/<defs>[\s\S]*<\/defs>/)[0];
const tile = mark.match(/<path d="[^"]+" fill="url\(#ro-tile\)"\/>/)?.[0];
if (!tile) throw new Error('brand/svg/mark.svg changed shape: could not find the tile');
const glyph = (d) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="1024" height="1024">${defs}${tile}` +
  `<g transform="translate(30 30) scale(2.5)" fill="none" stroke="#fff" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${d}</g></svg>`;

const variants = {
  // "any": the mark on its rounded tile, transparent corners
  any: at1024(brand('app-icon.svg')),
  // "maskable": full-bleed lapis, the mark inside the central safe circle (radius 40%)
  maskable: at1024(brand('app-icon-maskable.svg')),
  // iOS rounds the corners itself: full bleed, the mark a little larger
  apple: at1024(brand('app-icon-ios.svg')),
  'shortcut-work': glyph('<rect x="3" y="7" width="18" height="13" rx="2.5"/><path d="M8.5 7V5.5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2V7"/><path d="M3 12.5h18"/>'),
  'shortcut-contact': glyph('<path d="M7.9 20A9 9 0 1 0 4 16.1L2.5 21.5Z"/><path d="M8 12h.01M12 12h.01M16 12h.01"/>'),
};

const tmp = mkdtempSync(join(tmpdir(), 'ro-icons-'));
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1024, height: 1024 } });
for (const [name, markup] of Object.entries(variants)) {
  await page.setContent(`<!doctype html><html><body style="margin:0;background:transparent">${markup}</body></html>`);
  await page.screenshot({ path: join(tmp, `${name}.png`), omitBackground: true, clip: { x: 0, y: 0, width: 1024, height: 1024 } });
}
await browser.close();

const jobs = [
  ...[48, 72, 96, 128, 144, 192, 256, 384, 512].map((s) => ['any', `icon-${s}.png`, s]),
  ['maskable', 'maskable-192.png', 192],
  ['maskable', 'maskable-512.png', 512],
  ['apple', 'apple-touch-icon.png', 180],
  ['shortcut-work', 'shortcut-work.png', 96],
  ['shortcut-contact', 'shortcut-contact.png', 96],
];
mkdirSync(out, { recursive: true });
const py = `
import json, sys
from PIL import Image
for src, dst, size in json.loads(sys.argv[1]):
    im = Image.open(src).convert('RGBA').resize((size, size), Image.LANCZOS)
    if 'apple' in dst:
        im = im.convert('RGB')  # iOS shows transparency as black
    im.save(dst, optimize=True)
    print(dst, im.size)
`;
const script = join(tmp, 'resize.py');
writeFileSync(script, py);
const args = jobs.map(([v, file, size]) => [join(tmp, `${v}.png`), join(out, file), size]);
console.log(execFileSync('python3', [script, JSON.stringify(args)], { encoding: 'utf8' }));
