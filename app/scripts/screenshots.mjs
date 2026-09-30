// Captures the manifest's store screenshots (public/screenshots/*.jpg) from the real, built app:
//   npm run build && node scripts/screenshots.mjs && npm run build
// (the second build copies the fresh screenshots into dist). Serves dist/ under /app/ on port 4183,
// exactly as the site will. Needs Playwright (global install); `npm run build` itself does not.
import { createReadStream, mkdirSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve } from 'node:path';

const PLAYWRIGHT = process.env.PLAYWRIGHT_MODULE ?? '/opt/node22/lib/node_modules/playwright/index.mjs';
const { chromium } = await import(PLAYWRIGHT);

const app = resolve(import.meta.dirname, '..');
const dist = resolve(app, 'dist');
const out = resolve(app, 'public/screenshots');
const port = 4183;
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.webmanifest': 'application/manifest+json', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };

const server = createServer((req, res) => {
  const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (!path.startsWith('/app/')) return res.writeHead(404).end();
  let file = normalize(join(dist, path.slice(5)));
  try {
    if (!file.startsWith(dist)) throw new Error('outside');
    if (statSync(file).isDirectory()) file = join(file, 'index.html');
    res.writeHead(200, { 'Content-Type': types[extname(file)] ?? 'application/octet-stream' });
    createReadStream(file).pipe(res);
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise((r) => server.listen(port, r));
const base = `http://localhost:${port}/app/`;

const shots = [
  // narrow: 360×780 CSS pixels at 3× = 1080×2340
  { file: 'home.jpg', hash: '', w: 360, h: 780, scale: 3 },
  { file: 'project.jpg', hash: '#/work/dongi', w: 360, h: 780, scale: 3 },
  { file: 'work.jpg', hash: '#/work', w: 360, h: 780, scale: 3 },
  { file: 'contact.jpg', hash: '#/contact', w: 360, h: 780, scale: 3 },
  // wide: 1280×800
  { file: 'wide.jpg', hash: '#/work', w: 1280, h: 800, scale: 1 },
];

mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
for (const s of shots) {
  const mobile = s.w < 600;
  const ctx = await browser.newContext({ viewport: { width: s.w, height: s.h }, deviceScaleFactor: s.scale, isMobile: mobile, hasTouch: mobile, serviceWorkers: 'block', locale: 'fa-IR' });
  await ctx.addInitScript(() => localStorage.setItem('ro:lang', 'fa'));
  const page = await ctx.newPage();
  await page.goto(base + s.hash);
  await page.waitForLoadState('networkidle');
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].filter((i) => !i.loading || i.getBoundingClientRect().top < innerHeight).map((i) => i.decode().catch(() => {})));
  });
  await page.waitForTimeout(700);
  await page.screenshot({ path: join(out, s.file), type: 'jpeg', quality: 86 });
  console.log(`${s.file}: ${s.w * s.scale}×${s.h * s.scale}`);
  await ctx.close();
}
await browser.close();
server.close();
