// The app-store listing images (Cafe Bazaar, Myket, Google Play), from the real, built app:
//   (cd app && npm run build) && node store/make-store.mjs
// Writes store/screenshots/*.png (1080×1920: a headline and the app in a phone), store/feature-graphic.png
// (1024×500) and store/icon-512.png (from brand/). Serves app/dist under /app/ on port 4184, as the
// site does. Needs Playwright (global install).
import { copyFileSync, createReadStream, mkdirSync, mkdtempSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import { extname, join, normalize, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const PLAYWRIGHT = process.env.PLAYWRIGHT_MODULE ?? '/opt/node22/lib/node_modules/playwright/index.mjs';
const { chromium } = await import(PLAYWRIGHT);

const root = resolve(import.meta.dirname, '..');
const dist = resolve(root, 'app/dist');
const out = resolve(root, 'store');
const port = 4184;
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.webmanifest': 'application/manifest+json', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
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

const screens = [
  { name: '01-home', hash: '', title: 'سایت و اپلیکیشنی<br>که مشتری می‌آورد', sub: 'نمونه‌کارها و خدمات رامین عمرانی، در یک اپ' },
  { name: '02-work', hash: '#/work', title: 'نمونه‌کارهای واقعی', sub: 'سایت، اپلیکیشن، پنل مدیریت و ربات؛ همه در حال کار' },
  { name: '03-project', hash: '#/work/dongi', title: 'داستان هر پروژه', sub: 'از مشکل تا راه‌حل، با تصویرهای واقعی' },
  { name: '04-services', hash: '#/services', title: 'از سایت تا CRM و ربات', sub: 'طراحی، برنامه‌نویسی و پشتیبانی، از یک نفر' },
  { name: '05-contact', hash: '#/contact', title: 'مشاورهٔ رایگان،<br>با یک لمس', sub: 'واتس‌اپ، تلگرام یا تماس؛ معمولاً همان روز جواب' },
];

const tmp = mkdtempSync(join(tmpdir(), 'ro-store-'));
const browser = await chromium.launch();

// 1. the raw app screens, as a phone shows them (360×780 CSS px at 3×)
for (const s of screens) {
  const ctx = await browser.newContext({ viewport: { width: 360, height: 780 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true, serviceWorkers: 'block', locale: 'fa-IR' });
  await ctx.addInitScript(() => localStorage.setItem('ro:lang', 'fa'));
  const page = await ctx.newPage();
  await page.goto(base + s.hash);
  await page.waitForLoadState('networkidle');
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].filter((i) => i.getBoundingClientRect().top < innerHeight).map((i) => i.decode().catch(() => {})));
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: join(tmp, `${s.name}.png`) });
  await ctx.close();
}
server.close();

// 2. the listing images, laid out in HTML with the brand's fonts and colours
const font = (p) => pathToFileURL(resolve(root, p)).href;
const css = `
@font-face{font-family:'Estedad';src:url(${font('v3/node_modules/@fontsource-variable/estedad/files/estedad-arabic-wght-normal.woff2')}) format('woff2');font-weight:100 900;unicode-range:U+0600-06FF,U+200C-200E,U+FB50-FDFF,U+FE70-FEFC}
@font-face{font-family:'Inter Tight';src:url(${font('chooser/fonts/inter-tight-latin.woff2')}) format('woff2');font-weight:100 900}
*{box-sizing:border-box}html,body{margin:0}
body{font-family:'Estedad','Inter Tight',sans-serif;direction:rtl;-webkit-font-smoothing:antialiased}
.bg{position:relative;overflow:hidden;color:#fff;background:radial-gradient(70% 45% at 80% 8%,#2d68f0 0%,transparent 70%),radial-gradient(60% 40% at 10% 100%,rgba(95,227,212,.30),transparent 70%),linear-gradient(170deg,#1f52d6 0%,#163b9e 62%,#112c7a 100%)}
.arches{position:absolute;inset:0;opacity:.07}
`;
const archSvg = (w, h, n, scale, y) => {
  const d = 'M28 100V65A54.35 54.35 0 0 1 60 15.46A54.35 54.35 0 0 1 92 65V100H82V65A44.35 44.35 0 0 0 60 26.69A44.35 44.35 0 0 0 38 65V100Z';
  const step = w / (n - 1);
  return `<svg class="arches" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${Array.from({ length: n + 1 }, (_, i) => `<path d="${d}" fill="#fff" transform="translate(${-60 * scale + i * step} ${y + (i % 2 ? -40 : 0)}) scale(${scale})"/>`).join('')}</svg>`;
};
const phone = (img, w) => {
  const bezel = Math.round(w * 0.032);
  return `<div style="width:${w}px;padding:${bezel}px;border-radius:${Math.round(w * 0.14)}px;background:#0d1220;box-shadow:0 0 0 2px rgba(255,255,255,.08),0 50px 90px -30px rgba(5,12,40,.75)">
    <img src="${pathToFileURL(img).href}" style="display:block;width:100%;border-radius:${Math.round(w * 0.11)}px">
  </div>`;
};

const page = await browser.newPage({ deviceScaleFactor: 1 });
// a file page, so the fonts and the screens (file: URLs) load
const show = async (html) => {
  const file = join(tmp, 'layout.html');
  writeFileSync(file, html);
  await page.goto(pathToFileURL(file).href);
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map((i) => i.decode().catch(() => {})));
  });
};
mkdirSync(resolve(out, 'screenshots'), { recursive: true });
for (const s of screens) {
  await page.setViewportSize({ width: 1080, height: 1920 });
  await show(`<!doctype html><html><head><meta charset="utf-8"><style>${css}
    .shot{width:1080px;height:1920px;display:flex;flex-direction:column;align-items:center}
    h1{margin:118px 60px 0;font-weight:900;font-size:84px;line-height:1.32;text-align:center;letter-spacing:-.01em}
    p{margin:22px 60px 0;font-weight:500;font-size:38px;line-height:1.6;text-align:center;color:rgba(255,255,255,.78)}
    .ph{margin-top:auto;transform:translateY(130px)}
  </style></head><body><div class="bg shot">${archSvg(1080, 1920, 6, 3.2, 1500)}<h1>${s.title}</h1><p>${s.sub}</p><div class="ph">${phone(join(tmp, `${s.name}.png`), 700)}</div></div></body></html>`);
  await page.screenshot({ path: resolve(out, 'screenshots', `${s.name}.png`) });
  console.log(`screenshots/${s.name}.png 1080×1920`);
}

// the feature graphic (Google Play; also handy as a cover elsewhere)
const lockup = readFileSync(resolve(root, 'brand/svg/logo-fa-on-dark.svg'), 'utf8').replace('<svg ', '<svg height="132" ');
await page.setViewportSize({ width: 1024, height: 500 });
await show(`<!doctype html><html><head><meta charset="utf-8"><style>${css}
  .fg{width:1024px;height:500px;display:flex;align-items:center;justify-content:space-between;padding:0 70px}
  .txt{display:grid;gap:26px;justify-items:start}
  .txt p{margin:0;font-weight:600;font-size:27px;line-height:1.7;color:rgba(255,255,255,.82)}
  .ph{align-self:flex-start;margin-top:70px;transform:rotate(-4deg)}
</style></head><body><div class="bg fg">${archSvg(1024, 500, 6, 2, 330)}<div class="txt">${lockup}<p>طراحی و ساخت سایت، اپلیکیشن، CRM و ربات</p></div><div class="ph">${phone(join(tmp, '01-home.png'), 300)}</div></div></body></html>`);
await page.screenshot({ path: resolve(out, 'feature-graphic.png') });
console.log('feature-graphic.png 1024×500');
await browser.close();

copyFileSync(resolve(root, 'brand/png/store-icon-512.png'), resolve(out, 'icon-512.png'));
console.log('icon-512.png 512×512');
