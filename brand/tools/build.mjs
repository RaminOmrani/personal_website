// Builds the brand kit from geometry.mjs: SVG masters, PNG exports, the app and store icons.
//   node brand/tools/build.mjs            (then: node brand/tools/guidelines.mjs for the PDF)
// Needs Playwright (Chromium) and Python 3 with uharfbuzz, fonttools and brotli
// (pip install uharfbuzz fonttools brotli). Text is shaped with HarfBuzz and saved as outlines,
// so no logo file depends on a font being installed.
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import * as G from './geometry.mjs';

const f = G.f;
const root = resolve(import.meta.dirname, '../..');
const OUT = resolve(root, 'brand');
const PLAYWRIGHT = process.env.PLAYWRIGHT_MODULE ?? '/opt/node22/lib/node_modules/playwright/index.mjs';

export const C = {
  lapis: '#1F52D6',
  lapisDeep: '#173FA8',
  turq: '#0E9AA7',
  glow: '#5FE3D4',
  saffron: '#E9A23B',
  gold: '#F3C46E',
  ink: '#0F1B2D',
  ink2: '#43506A',
  paper: '#F6F4EF',
  night: '#0B0D12',
  white: '#FFFFFF',
};
export const FONTS = {
  fa: resolve(root, 'v3/node_modules/@fontsource-variable/estedad/files/estedad-arabic-wght-normal.woff2'),
  en: resolve(root, 'chooser/fonts/inter-tight-latin.woff2'),
};
export const NAME = { fa: 'رامین عمرانی', en: 'Ramin Omrani', caps: 'RAMIN OMRANI', role: 'FULL-STACK & AI DEVELOPER', roleFa: 'برنامه‌نویس فول‌استک و هوش مصنوعی' };

const cache = new Map();
export function shape(font, weight, size, text, tracking = 0) {
  const key = [font, weight, size, text, tracking].join('|');
  if (!cache.has(key)) {
    const out = execFileSync('python3', [resolve(import.meta.dirname, 'text2path.py'), font, String(weight), String(size), text, String(tracking)], { encoding: 'utf8' });
    cache.set(key, JSON.parse(out));
  }
  return cache.get(key);
}
// ---- the mark ----------------------------------------------------------------------------------
const P = { tile: G.squircle(), door: G.doorway(), arch: G.archOutline(), reh: G.rehPath() };
// for 16–32px (browser tabs): heavier strokes so the arch and ر survive the pixel grid
const SMALL_ARCH = { ...G.ARCH, w: 13.5 };
const SMALL = { tile: P.tile, door: G.doorway(SMALL_ARCH), arch: G.archOutline(SMALL_ARCH), reh: G.rehPath({ ...G.REH, entry: 15, belly: 16.5, tail: 12 }) };
export const PATHS = P;

export function defs(id) {
  return (
    `<linearGradient id="${id}-tile" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2459E0"/><stop offset="1" stop-color="${C.lapisDeep}"/></linearGradient>` +
    `<linearGradient id="${id}-gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.gold}"/><stop offset="1" stop-color="${C.saffron}"/></linearGradient>` +
    `<linearGradient id="${id}-door" x1="0" y1="0" x2="0" y2="1"><stop offset=".08" stop-color="${C.glow}" stop-opacity="0"/><stop offset="1" stop-color="${C.glow}" stop-opacity=".42"/></linearGradient>`
  );
}
/** the full-colour mark inside its 120×120 box. bleed: the tile fills the square (maskable, iOS) */
export function markBody(id, { bleed = false, small = false } = {}) {
  const p = small ? SMALL : P;
  const tile = bleed ? `<rect width="120" height="120" fill="url(#${id}-tile)"/>` : `<path d="${p.tile}" fill="url(#${id}-tile)"/>`;
  return `${tile}<path d="${p.door}" fill="url(#${id}-door)"/><path d="${p.arch}" fill="url(#${id}-gold)"/><path d="${p.reh}" fill="${C.white}"/>`;
}
/** the symbol alone (no tile); arch, ر and an optional door tint */
export function symbolBody(id, { arch, reh, door }) {
  return (door ? `<path d="${P.door}" fill="${door}"/>` : '') + `<path d="${P.arch}" fill="${arch}"/><path d="${P.reh}" fill="${reh}"/>`;
}
export const SYMBOL_STYLES = {
  color: { arch: C.lapis, reh: C.saffron },
  'on-dark': { arch: 'url(#ro-gold)', reh: C.white },
  black: { arch: C.ink, reh: C.ink },
  white: { arch: C.white, reh: C.white },
};

const svgDoc = (vb, body, { w, h, title = 'Ramin Omrani · رامین عمرانی', id = 'ro' } = {}) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}"${w ? ` width="${w}" height="${h}"` : ''} role="img" aria-label="${title}"><title>${title}</title><defs>${defs(id)}</defs>${body}</svg>\n`;

// ---- lockups -----------------------------------------------------------------------------------
// Units: the mark is 120 tall. Persian lockups read right to left, so the mark sits on the right.
export function lockupFa({ text = C.ink, sub = C.ink2, mark = 'tile', symbol } = {}) {
  const fa = shape(FONTS.fa, 800, 60, NAME.fa);
  const [x0, y0, x1, y1] = fa.bbox;
  const faW = x1 - x0;
  const capSize = 14;
  const en = shape(FONTS.en, 600, capSize, NAME.caps, 0.32);
  const cap = en.capHeight;
  const enW = en.bbox[2] - en.bbox[0];
  const gapLine = 14;
  const blockH = y1 - y0 + gapLine + cap;
  const top = (120 - blockH) / 2 + 1;
  const faBase = top - y0;
  const enBase = top + (y1 - y0) + gapLine + cap;
  const gap = 28;
  const markX = faW + gap;
  const W = markX + 120;
  const markSvg = mark === 'tile' ? `<g transform="translate(${f(markX)} 0)">${markBody('ro')}</g>` : `<g transform="translate(${f(markX)} 0)">${symbolBody('ro', symbol)}</g>`;
  const body =
    `<path d="${fa.d}" fill="${text}" transform="translate(${f(-x0)} ${f(faBase)})"/>` +
    `<path d="${en.d}" fill="${sub}" transform="translate(${f(faW - enW - en.bbox[0])} ${f(enBase)})"/>` +
    markSvg;
  return { body, w: W, h: 120 };
}
export function lockupEn({ text = C.ink, sub = C.ink2, mark = 'tile', symbol } = {}) {
  const name = shape(FONTS.en, 700, 52, NAME.en, -0.02);
  const [x0, y0, x1] = name.bbox;
  const nameW = x1 - x0;
  const roleSize = 12.4;
  const role = shape(FONTS.en, 600, roleSize, NAME.role, 0.24);
  const capN = name.capHeight, capR = role.capHeight;
  const gapLine = 17;
  const blockH = capN + gapLine + capR;
  const top = (120 - blockH) / 2;
  const gap = 28;
  const tx = 120 + gap;
  const body =
    (mark === 'tile' ? markBody('ro') : symbolBody('ro', symbol)) +
    `<path d="${name.d}" fill="${text}" transform="translate(${f(tx - x0)} ${f(top + capN)})"/>` +
    `<path d="${role.d}" fill="${sub}" transform="translate(${f(tx - role.bbox[0])} ${f(top + capN + gapLine + capR)})"/>`;
  return { body, w: tx + nameW, h: 120 };
}
export function lockupStacked({ text = C.ink, sub = C.ink2 } = {}) {
  const fa = shape(FONTS.fa, 800, 60, NAME.fa);
  const [x0, y0, x1, y1] = fa.bbox;
  const faW = x1 - x0;
  const en = shape(FONTS.en, 600, 14, NAME.caps, 0.32);
  const enW = en.bbox[2] - en.bbox[0];
  const W = Math.max(faW, 120);
  const markTop = 0;
  const faTop = 120 + 26;
  const enBase = faTop + (y1 - y0) + 14 + en.capHeight;
  const body =
    `<g transform="translate(${f((W - 120) / 2)} ${markTop})">${markBody('ro')}</g>` +
    `<path d="${fa.d}" fill="${text}" transform="translate(${f((W - faW) / 2 - x0)} ${f(faTop - y0)})"/>` +
    `<path d="${en.d}" fill="${sub}" transform="translate(${f((W - enW) / 2 - en.bbox[0])} ${f(enBase)})"/>`;
  return { body, w: W, h: enBase + 2 };
}

// ---- icons -------------------------------------------------------------------------------------
/** the mark scaled about the centre (maskable icons keep it inside the 80% safe circle) */
const scaled = (s, body) => `<g transform="translate(60 60) scale(${s}) translate(-60 -60)">${body}</g>`;
export function storeIcon() {
  // like the clinic app: the mark on top, the app's name under it, all on the tile
  const name = shape(FONTS.fa, 800, 16.5, NAME.fa);
  const [x0, y0, x1, y1] = name.bbox;
  const nw = x1 - x0;
  const inner = symbolBody('ro', { arch: 'url(#ro-gold)', reh: C.white, door: 'url(#ro-door)' });
  return (
    `<path d="${P.tile}" fill="url(#ro-tile)"/>` +
    `<g transform="translate(60 46) scale(.7) translate(-60 -57.7)">${inner}</g>` +
    `<path d="${name.d}" fill="${C.white}" transform="translate(${f(60 - nw / 2 - x0)} ${f(99 - y1)})"/>`
  );
}

// ---- write -------------------------------------------------------------------------------------
function write(rel, text) {
  const p = resolve(OUT, rel);
  mkdirSync(resolve(p, '..'), { recursive: true });
  writeFileSync(p, text);
  return p;
}

export function buildSvgs() {
  const files = {};
  const sb = G.symbolBox();
  const pad = 0;
  const symVb = `${f(sb.x - pad)} ${f(sb.y - pad)} ${f(sb.w + 2 * pad)} ${f(sb.h + 2 * pad)}`;
  files['svg/mark.svg'] = svgDoc('0 0 120 120', markBody('ro'));
  for (const [k, s] of Object.entries(SYMBOL_STYLES)) files[`svg/symbol-${k}.svg`] = svgDoc(symVb, symbolBody('ro', s));
  const variants = {
    '': {},
    '-on-dark': { text: C.white, sub: C.gold },
    '-black': { text: C.ink, sub: C.ink, mark: 'symbol', symbol: SYMBOL_STYLES.black },
    '-white': { text: C.white, sub: C.white, mark: 'symbol', symbol: SYMBOL_STYLES.white },
  };
  for (const [suffix, o] of Object.entries(variants)) {
    const fa = lockupFa(o);
    files[`svg/logo-fa${suffix}.svg`] = svgDoc(`0 0 ${f(fa.w)} ${fa.h}`, fa.body);
    const en = lockupEn(o);
    files[`svg/logo-en${suffix}.svg`] = svgDoc(`0 0 ${f(en.w)} ${en.h}`, en.body);
  }
  const st = lockupStacked();
  files['svg/logo-stacked.svg'] = svgDoc(`0 0 ${f(st.w)} ${f(st.h)}`, st.body);
  const std = lockupStacked({ text: C.white, sub: C.gold });
  files['svg/logo-stacked-on-dark.svg'] = svgDoc(`0 0 ${f(std.w)} ${f(std.h)}`, std.body);
  // app icons
  files['svg/app-icon.svg'] = files['svg/mark.svg'];
  files['svg/app-icon-maskable.svg'] = svgDoc('0 0 120 120', `<rect width="120" height="120" fill="url(#ro-tile)"/>` + scaled(0.8, markBody('ro', { bleed: true }).replace(/^<rect[^>]+\/>/, '')));
  files['svg/app-icon-ios.svg'] = svgDoc('0 0 120 120', `<rect width="120" height="120" fill="url(#ro-tile)"/>` + scaled(0.9, markBody('ro', { bleed: true }).replace(/^<rect[^>]+\/>/, '')));
  files['svg/store-icon.svg'] = svgDoc('0 0 120 120', storeIcon());
  files['svg/favicon.svg'] = svgDoc('0 0 120 120', markBody('ro', { small: true }));
  for (const [rel, text] of Object.entries(files)) write(rel, text);
  return files;
}

export async function renderPngs(files) {
  const { chromium } = await import(PLAYWRIGHT);
  const browser = await chromium.launch();
  const page = await browser.newPage({ deviceScaleFactor: 1 });
  const vb = (svg) => svg.match(/viewBox="([^"]+)"/)[1].split(' ').map(Number);
  async function png(svgText, rel, width, { bg } = {}) {
    const [, , w, h] = vb(svgText);
    const height = Math.round((width * h) / w);
    await page.setViewportSize({ width, height });
    const sized = svgText.replace('<svg ', `<svg width="${width}" height="${height}" `);
    await page.setContent(`<!doctype html><html><body style="margin:0;background:${bg ?? 'transparent'}">${sized}</body></html>`);
    const p = resolve(OUT, rel);
    mkdirSync(resolve(p, '..'), { recursive: true });
    await page.screenshot({ path: p, omitBackground: !bg, clip: { x: 0, y: 0, width, height } });
  }
  const jobs = [
    ['svg/mark.svg', 'png/mark-1024.png', 1024],
    ['svg/mark.svg', 'png/mark-512.png', 512],
    ['svg/symbol-color.svg', 'png/symbol-color-1024.png', 1024],
    ['svg/symbol-on-dark.svg', 'png/symbol-on-dark-1024.png', 1024],
    ['svg/symbol-black.svg', 'png/symbol-black-1024.png', 1024],
    ['svg/symbol-white.svg', 'png/symbol-white-1024.png', 1024],
    ['svg/logo-fa.svg', 'png/logo-fa-2000.png', 2000],
    ['svg/logo-fa-on-dark.svg', 'png/logo-fa-on-dark-2000.png', 2000],
    ['svg/logo-fa-black.svg', 'png/logo-fa-black-2000.png', 2000],
    ['svg/logo-fa-white.svg', 'png/logo-fa-white-2000.png', 2000],
    ['svg/logo-en.svg', 'png/logo-en-2000.png', 2000],
    ['svg/logo-en-on-dark.svg', 'png/logo-en-on-dark-2000.png', 2000],
    ['svg/logo-stacked.svg', 'png/logo-stacked-1200.png', 1200],
    ['svg/logo-stacked-on-dark.svg', 'png/logo-stacked-on-dark-1200.png', 1200],
    ['svg/store-icon.svg', 'png/store-icon-512.png', 512],
    ['svg/app-icon-maskable.svg', 'png/app-icon-maskable-512.png', 512],
    ['svg/app-icon-ios.svg', 'png/app-icon-ios-1024.png', 1024],
    ['svg/favicon.svg', 'png/favicon-32.png', 32],
    ['svg/favicon.svg', 'png/favicon-16.png', 16],
    ['svg/favicon.svg', 'png/favicon-48.png', 48],
    ['svg/mark.svg', 'png/icon-192.png', 192],
    ['svg/app-icon-ios.svg', 'png/apple-touch-icon-180.png', 180],
    ['svg/logo-fa.svg', 'png/logo-fa-600.png', 600],
  ];
  for (const [src, dst, w] of jobs) await png(files[src], dst, w);
  // a profile picture for Telegram/WhatsApp/Instagram: full-bleed, they crop to a circle
  await png(svgDoc('0 0 120 120', `<rect width="120" height="120" fill="url(#ro-tile)"/>` + scaled(0.78, markBody('ro', { bleed: true }).replace(/^<rect[^>]+\/>/, ''))), 'png/avatar-1080.png', 1080);
  await browser.close();
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const files = buildSvgs();
  await renderPngs(files);
  console.log(`${Object.keys(files).length} SVGs and the PNG exports are in brand/`);
}
