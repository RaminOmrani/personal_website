// The brand guidelines deck: brand/ramin-omrani-brand-guidelines.pdf and a PNG per page.
//   node brand/tools/guidelines.mjs      (after build.mjs)
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import * as G from './geometry.mjs';
import { C, FONTS, NAME, PATHS, defs, markBody, symbolBody, SYMBOL_STYLES, lockupFa, lockupEn, lockupStacked, storeIcon } from './build.mjs';

const f = G.f;
const root = resolve(import.meta.dirname, '../..');
const OUT = resolve(root, 'brand');
const PLAYWRIGHT = process.env.PLAYWRIGHT_MODULE ?? '/opt/node22/lib/node_modules/playwright/index.mjs';
const url = (p) => pathToFileURL(resolve(root, p)).href;
const fa = (n) => String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]).replace(/\./g, '٫');

const svg = (vb, body, attrs = '') => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" ${attrs}><defs>${defs('ro')}</defs>${body}</svg>`;
const sb = G.symbolBox();
const symVb = `${f(sb.x)} ${f(sb.y)} ${f(sb.w)} ${f(sb.h)}`;
const mark = (size, o) => svg('0 0 120 120', markBody('ro', o), `width="${size}" height="${size}"`);
const symbol = (h, style) => svg(symVb, symbolBody('ro', style), `height="${h}"`);
const lock = (l, h) => svg(`0 0 ${f(l.w)} ${f(l.h)}`, l.body, `height="${h}"`);

// ---- page 3: construction ----------------------------------------------------------------------
function construction() {
  const A = G.ARCH, g = G.archGeometry(A);
  const [p0, p1, p2, p3] = G.REH.curve;
  const grid = Array.from({ length: 13 }, (_, i) => i * 10)
    .map((v) => `<line x1="${v}" y1="0" x2="${v}" y2="120"/><line x1="0" y1="${v}" x2="120" y2="${v}"/>`)
    .join('');
  const cross = ([x, y]) => `<path d="M${x - 2} ${y}H${x + 2}M${x} ${y - 2}V${y + 2}" stroke="${C.saffron}" stroke-width=".5"/>`;
  return `<svg viewBox="-9 -7 146 132" width="760" height="687" font-family="Inter Tight" font-size="3.2"><clipPath id="gridclip"><rect width="120" height="120"/></clipPath>
  <rect x="0" y="0" width="120" height="120" fill="#fff"/>
  <g stroke="#E4E8F1" stroke-width=".25">${grid}</g>
  <path d="${PATHS.door}" fill="${C.turq}" fill-opacity=".07"/>
  <path d="${PATHS.arch}" fill="${C.lapis}" fill-opacity=".16"/>
  <path d="${PATHS.reh}" fill="${C.saffron}" fill-opacity=".28"/>
  <g fill="none" stroke-width=".35" clip-path="url(#gridclip)">
    <circle cx="${f(g.leftCentre[0])}" cy="${A.spring}" r="${f(g.r)}" stroke="${C.lapis}" stroke-dasharray="1.2 1.2" opacity=".55"/>
    <circle cx="${f(g.rightCentre[0])}" cy="${A.spring}" r="${f(g.r)}" stroke="${C.lapis}" stroke-dasharray="1.2 1.2" opacity=".55"/>
    </g><g fill="none" stroke-width=".35">
    <path d="${G.archPath(A)}" stroke="${C.lapis}"/>
    <line x1="60" y1="2" x2="60" y2="118" stroke="${C.ink2}" stroke-dasharray="2 1.4"/>
    <line x1="0" y1="${A.spring}" x2="120" y2="${A.spring}" stroke="${C.ink2}" stroke-dasharray="2 1.4"/>
    <line x1="0" y1="${A.base}" x2="120" y2="${A.base}" stroke="${C.ink2}"/>
    <path d="M${p0}L${p1}M${p2}L${p3}" stroke="${C.saffron}"/>
    <path d="M${p0}C${p1} ${p2} ${p3}" stroke="${C.saffron}" stroke-dasharray="1 .8"/>
  </g>
  ${[p0, p1, p2, p3].map(([x, y]) => `<circle cx="${x}" cy="${y}" r=".9" fill="#fff" stroke="${C.saffron}" stroke-width=".45"/>`).join('')}
  ${cross(g.leftCentre)}${cross(g.rightCentre)}
  <g fill="${C.ink2}">
    <text x="${f(g.leftCentre[0]) + 2}" y="${A.spring - 2}">O₁</text>
    <text x="${f(g.rightCentre[0]) - 7}" y="${A.spring - 2}">O₂</text>
    <text x="122" y="${A.spring + 1}">spring</text>
    <text x="122" y="${A.base + 1}">base</text>
    <text x="61.5" y="5">axis</text>
    <text x="${A.cx + A.a + 7}" y="88">w = 10</text>
    <text x="75" y="76" fill="${C.saffron}">13</text>
    <text x="35" y="97" fill="${C.saffron}">8</text>
  </g>
  <g fill="${C.ink2}" font-size="2.6">${Array.from({ length: 13 }, (_, i) => `<text x="${i * 10}" y="-2.4" text-anchor="middle">${i}</text><text x="-2.4" y="${i * 10 + 0.9}" text-anchor="end">${i}</text>`).join('')}</g>
</svg>`;
}

// ---- page 6: clear space -----------------------------------------------------------------------
function clearSpace() {
  const l = lockupFa();
  const x = 30; // a quarter of the mark's height
  const W = l.w + 2 * x, H = l.h + 2 * x;
  const corner = (cx, cy) => `<rect x="${cx}" y="${cy}" width="${x}" height="${x}" fill="${C.saffron}" fill-opacity=".14" stroke="${C.saffron}" stroke-width=".8"/><text x="${cx + x / 2}" y="${cy + x / 2 + 4}" text-anchor="middle" font-size="12" fill="${C.saffron}" font-family="Inter Tight" font-weight="700">x</text>`;
  return svg(`0 0 ${f(W)} ${f(H)}`,
    `<rect x=".5" y=".5" width="${f(W - 1)}" height="${f(H - 1)}" fill="none" stroke="${C.lapis}" stroke-dasharray="4 3" stroke-width="1"/>` +
    corner(0, 0) + corner(W - x, 0) + corner(0, H - x) + corner(W - x, H - x) +
    `<g transform="translate(${x} ${x})">${l.body}</g>`, `width="100%"`);
}

// ---- page 9: icons -----------------------------------------------------------------------------
const safeZone = () =>
  `<div class="maskable">${svg('0 0 120 120', `<rect width="120" height="120" fill="url(#ro-tile)"/><g transform="translate(60 60) scale(.8) translate(-60 -60)">${markBody('ro', { bleed: true }).replace(/^<rect[^>]+\/>/, '')}</g><circle cx="60" cy="60" r="48" fill="none" stroke="#fff" stroke-opacity=".75" stroke-width=".7" stroke-dasharray="2 1.6"/>`, 'width="220" height="220"')}</div>`;

function homeScreen() {
  const apps = ['#34A853', '#EA4335', '#FBBC04', '#4285F4', '#8E44AD', '#16A085', '#E67E22', '#2C3E50'];
  const cells = apps.slice(0, 7).map((c) => `<span class="app"><i style="background:${c}"></i><b></b></span>`);
  cells.splice(5, 0, `<span class="app me">${mark(64)}<b>رامین عمرانی</b></span>`);
  return `<div class="phone"><div class="screen"><div class="clock">۱۰:۴۵</div><div class="apps">${cells.join('')}</div></div></div>`;
}

// ---- page 10: applications ---------------------------------------------------------------------
function card() {
  const front = `<div class="card front">${symbol(130, SYMBOL_STYLES['on-dark'])}</div>`;
  const back = `<div class="card back">
    <div class="who">${lock(lockupFa(), 50)}</div>
    <ul>
      <li><span>تلفن</span><b dir="ltr">0901 702 1166</b></li>
      <li><span>واتس‌اپ</span><b dir="ltr">0936 574 3458</b></li>
      <li><span>تلگرام</span><b dir="ltr">@Daneshjoo_AI</b></li>
      <li><span>وب‌سایت</span><b dir="ltr">raminomrani.ir</b></li>
    </ul></div>`;
  return front + back;
}
function browserMock() {
  return `<div class="browser"><div class="tabs"><div class="tab">${svg('0 0 120 120', markBody('ro', { small: true }), 'width="16" height="16"')}<span>رامین عمرانی · طراحی سایت و اپلیکیشن</span></div></div>
  <div class="bar"><span dir="ltr">raminomrani.ir</span></div>
  <div class="site"><div class="nav">${lock(lockupFa(), 40)}<nav><a>نمونه‌کارها</a><a>خدمات</a><a>تماس</a></nav></div>
  <h3>سایت و اپلیکیشنی که دیده می‌شود</h3><p>برنامه‌نویس فول‌استک و هوش مصنوعی در مشهد</p></div></div>`;
}

// ---- don'ts ------------------------------------------------------------------------------------
function donts() {
  const items = [
    ['کشیده یا فشرده نکنید', `<div style="transform:scaleX(1.45)">${mark(110)}</div>`],
    ['نچرخانید', `<div style="transform:rotate(-14deg)">${mark(110)}</div>`],
    ['رنگ‌ها را عوض نکنید', svg('0 0 120 120', `<path d="${PATHS.tile}" fill="#C2185B"/><path d="${PATHS.arch}" fill="#7CFC00"/><path d="${PATHS.reh}" fill="#FFEB3B"/>`, 'width="110" height="110"')],
    ['سایه و افکت اضافه نکنید', `<div style="filter:drop-shadow(8px 10px 0 #000) blur(.4px)">${mark(110)}</div>`],
    ['اجزا را جابه‌جا نکنید', svg('0 0 120 120', `<path d="${PATHS.tile}" fill="url(#ro-tile)"/><path d="${PATHS.arch}" fill="url(#ro-gold)"/><g transform="translate(24 -38)"><path d="${PATHS.reh}" fill="#fff"/></g>`, 'width="110" height="110"')],
    ['روی پس‌زمینهٔ شلوغ کم‌کنتراست نگذارید', `<div class="busy">${symbol(96, SYMBOL_STYLES.color)}</div>`],
  ];
  return items.map(([t, el]) => `<figure class="dont"><div class="box">${el}</div><figcaption><i>✕</i>${t}</figcaption></figure>`).join('');
}

// ---- colours -----------------------------------------------------------------------------------
const hexRgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const cmyk = (h) => {
  const [r, g, b] = hexRgb(h).map((v) => v / 255);
  const k = 1 - Math.max(r, g, b);
  if (k === 1) return [0, 0, 0, 100];
  return [(1 - r - k) / (1 - k), (1 - g - k) / (1 - k), (1 - b - k) / (1 - k), k].map((v) => Math.round(v * 100));
};
const swatches = [
  ['لاجوردی', 'Lapis', C.lapis, 'رنگ اصلی؛ کاشی‌های مشهد و اصفهان'],
  ['لاجوردی تیره', 'Lapis Deep', C.lapisDeep, 'پس‌زمینهٔ آیکون، سایه‌ها'],
  ['فیروزه‌ای', 'Turquoise', C.turq, 'نور درگاه، تأکیدهای آرام'],
  ['زعفرانی', 'Saffron', C.saffron, 'طاق، دکمه‌ها و نقطه‌های تأکید'],
  ['طلایی', 'Gold', C.gold, 'طاق روی زمینهٔ تیره'],
  ['جوهری', 'Ink', C.ink, 'متن و نسخهٔ تک‌رنگ'],
  ['کاغذی', 'Paper', C.paper, 'پس‌زمینهٔ روشن'],
];

// ---- the deck ----------------------------------------------------------------------------------
function html() {
  const fd = lockupFa({ text: C.white, sub: C.gold });
  const css = `
  @font-face{font-family:'Estedad';src:url(${url('v3/node_modules/@fontsource-variable/estedad/files/estedad-arabic-wght-normal.woff2')}) format('woff2');font-weight:100 900;unicode-range:U+0600-06FF,U+200C-200E,U+FB50-FDFF,U+FE70-FEFC}
  @font-face{font-family:'Estedad';src:url(${url('v3/node_modules/@fontsource-variable/estedad/files/estedad-latin-wght-normal.woff2')}) format('woff2');font-weight:100 900;unicode-range:U+0000-00FF,U+2000-206F}
  @font-face{font-family:'Vazirmatn';src:url(${url('v3/node_modules/@fontsource-variable/vazirmatn/files/vazirmatn-arabic-wght-normal.woff2')}) format('woff2');font-weight:100 900;unicode-range:U+0600-06FF,U+200C-200E,U+FB50-FDFF,U+FE70-FEFC}
  @font-face{font-family:'Inter Tight';src:url(${url('chooser/fonts/inter-tight-latin.woff2')}) format('woff2');font-weight:100 900}
  @page{size:1600px 1000px;margin:0}
  *{box-sizing:border-box}
  html,body{margin:0;background:#888}
  body{font-family:'Inter Tight','Estedad',sans-serif;color:${C.ink};-webkit-print-color-adjust:exact;print-color-adjust:exact}
  .slide{position:relative;width:1600px;height:1000px;overflow:hidden;background:${C.paper};padding:84px 96px;page-break-after:always;break-after:page;direction:rtl;font-family:'Estedad','Inter Tight',sans-serif}
  .slide:last-child{page-break-after:auto}
  .kicker{font:700 15px/1 'Inter Tight';letter-spacing:.28em;color:${C.lapis};direction:ltr;text-align:right;text-transform:uppercase}
  h2{margin:14px 0 0;font:850 54px/1.25 'Estedad';letter-spacing:-.01em}
  .lead{margin:16px 0 0;max-width:760px;font:400 21px/1.95 'Vazirmatn','Estedad';color:${C.ink2}}
  .foot{position:absolute;inset:auto 96px 40px 96px;display:flex;justify-content:space-between;align-items:center;font:600 13px/1 'Inter Tight';letter-spacing:.18em;color:#9AA3B5;direction:ltr}
  .foot .pg{font-family:'Inter Tight'}
  .dark{background:${C.night};color:#fff}.dark .lead{color:rgba(255,255,255,.66)}.dark .kicker{color:${C.gold}}
  /* cover */
  .cover{background:radial-gradient(60% 70% at 78% 30%,#2a63ea 0%,transparent 70%),radial-gradient(50% 60% at 15% 90%,rgba(95,227,212,.28),transparent 70%),linear-gradient(160deg,#1d4fd4,#122f86);color:#fff;display:grid;place-items:center;text-align:center}
  .cover .big{display:grid;justify-items:center;gap:56px}
  .cover .sub{font:500 22px/1.8 'Estedad';color:rgba(255,255,255,.8)}
  .cover .sub b{display:block;font:700 15px/1 'Inter Tight';letter-spacing:.32em;color:${C.gold};margin-top:12px;direction:ltr}
  .arches{position:absolute;inset:0;opacity:.07}
  /* concept */
  .concept{display:grid;grid-template-columns:1fr 560px;gap:80px;align-items:center;height:100%}
  .concept .ideas{display:grid;gap:22px;margin-top:34px}
  .idea{display:grid;grid-template-columns:64px 1fr;gap:20px;align-items:start;padding:22px 24px;background:#fff;border-radius:22px;box-shadow:0 1px 0 rgba(15,27,45,.04),0 12px 30px -18px rgba(15,27,45,.25)}
  .idea .n{width:64px;height:64px;border-radius:18px;display:grid;place-items:center;font:800 26px/1 'Estedad';color:#fff}
  .idea h4{margin:4px 0 4px;font:800 23px/1.4 'Estedad'}
  .idea p{margin:0;font:400 17.5px/1.9 'Vazirmatn';color:${C.ink2}}
  .hero-mark{display:grid;place-items:center;height:640px;border-radius:44px;background:radial-gradient(70% 60% at 50% 35%,#fff,#ecebe6)}
  /* construction */
  .cons{display:grid;grid-template-columns:1fr 760px;gap:60px;align-items:start}
  .specs{display:grid;gap:12px;margin-top:30px}
  .spec{display:flex;justify-content:space-between;gap:20px;padding:15px 20px;border-radius:14px;background:#fff;font:400 17px/1.6 'Vazirmatn'}
  .spec b{font:700 17px/1.6 'Estedad';color:${C.lapis}}
  /* versions */
  .grid{display:grid;gap:22px;margin-top:40px}
  .tile{border-radius:26px;background:#fff;display:grid;place-items:center;position:relative;overflow:hidden}
  .tile .lbl{position:absolute;top:18px;right:22px;font:600 13px/1 'Estedad';color:#9AA3B5}
  .tile.dk{background:${C.night}}.tile.lp{background:linear-gradient(160deg,#1d4fd4,#122f86)}.tile.tq{background:${C.turq}}.tile.pp{background:${C.paper}}
  .tile.dk .lbl,.tile.lp .lbl,.tile.tq .lbl{color:rgba(255,255,255,.55)}
  .tile.photo{background:#1b2440}
  .tile.photo::before{content:'';position:absolute;inset:-20px;background:url(${url('v3/public/me/me-hero.webp')}) 50% 22%/cover;filter:blur(3px)}
  .tile.photo::after{content:'';position:absolute;inset:0;background:linear-gradient(160deg,rgba(15,27,45,.78),rgba(23,63,168,.55))}
  .tile.photo>svg{position:relative;z-index:1}.tile.photo .lbl{z-index:1}
  .tile.pp{box-shadow:inset 0 0 0 1px #E3E0D7}
  .code{font-family:'Inter Tight';font-weight:700;color:${C.lapis}}
  /* colours */
  .swatches{display:grid;grid-template-columns:repeat(7,1fr);gap:16px;margin-top:46px}
  .sw{border-radius:24px;overflow:hidden;background:#fff;box-shadow:0 12px 30px -20px rgba(15,27,45,.35)}
  .sw .chip{height:300px;display:flex;align-items:flex-end;padding:18px;font:800 22px/1.3 'Estedad'}
  .sw .meta{padding:16px 18px;display:grid;gap:6px;font:500 13.5px/1.4 'Inter Tight';color:${C.ink2};direction:ltr;text-align:left}
  .sw .meta b{font:700 15px/1.2 'Inter Tight';color:${C.ink};letter-spacing:.04em}
  .sw .use{padding:0 18px 18px;font:400 13.5px/1.8 'Vazirmatn';color:${C.ink2}}
  .minis{display:flex;gap:30px;align-items:center;margin-top:34px;padding:26px 32px;background:#fff;border-radius:22px}
  .minis .cap{font:500 15px/1 'Estedad';color:#9AA3B5;margin-inline-end:auto}
  .ratio{display:flex;gap:0;height:22px;border-radius:999px;overflow:hidden;margin-top:28px}
  /* type */
  .type{display:grid;grid-template-columns:1fr 1fr;gap:28px;margin-top:40px}
  .spec-card{background:#fff;border-radius:26px;padding:36px 40px;min-height:560px}
  .spec-card .name{font:700 14px/1 'Inter Tight';letter-spacing:.24em;color:${C.lapis};direction:ltr;text-align:right}
  .spec-card .sample{margin:22px 0 8px;font:900 120px/1.15 'Estedad'}
  .spec-card .weights{display:grid;gap:4px;margin-top:22px}
  .spec-card .weights div{display:flex;justify-content:space-between;align-items:baseline;border-top:1px solid #EDEFF4;padding:10px 0}
  .spec-card .weights span{font:500 13px/1 'Inter Tight';color:#9AA3B5;direction:ltr}
  .en .sample{font-family:'Inter Tight';direction:ltr;text-align:left;letter-spacing:-.03em}
  .en .weights div{direction:ltr}
  /* icons */
  .icons{display:grid;grid-template-columns:repeat(4,1fr);gap:22px;margin-top:40px}
  .icon-card{background:#fff;border-radius:26px;padding:28px;display:grid;justify-items:center;align-content:center;gap:26px;min-height:600px;text-align:center;font:400 15.5px/1.8 'Vazirmatn';color:${C.ink2}}
  .icon-card b{display:block;font:800 18px/1.4 'Estedad';color:${C.ink}}
  .maskable svg{border-radius:50%}
  .fav{display:flex;gap:18px;align-items:end}
  .fav span{display:grid;justify-items:center;gap:8px;font:600 12px/1 'Inter Tight';color:#9AA3B5}
  .phone{width:300px;height:600px;border-radius:46px;background:#111;padding:12px;box-shadow:0 30px 60px -30px rgba(0,0,0,.5)}
  .screen{width:100%;height:100%;border-radius:36px;background:linear-gradient(170deg,#3f5fae,#1b2a55 60%,#0f1830);padding:56px 22px;color:#fff}
  .clock{font:300 60px/1 'Estedad';text-align:center;margin-bottom:40px}
  .apps{display:grid;grid-template-columns:repeat(4,1fr);gap:22px 10px}
  .app{display:grid;justify-items:center;gap:7px}
  .app i{width:54px;height:54px;border-radius:16px;display:block;opacity:.85}
  .app b{display:block;width:40px;height:6px;border-radius:3px;background:rgba(255,255,255,.35)}
  .app.me svg{width:54px;height:54px}
  .app.me b{width:auto;height:auto;background:none;font:600 10.5px/1.2 'Estedad';white-space:nowrap}
  /* applications */
  .apps-grid{display:grid;grid-template-columns:470px 470px 1fr;grid-template-rows:auto auto;gap:26px;margin-top:30px;align-items:start}
  .apps-grid .browser{grid-column:1 / span 2}
  .card{width:470px;height:304px;border-radius:20px;box-shadow:0 26px 50px -30px rgba(15,27,45,.55)}
  .card.front{background:radial-gradient(70% 80% at 70% 20%,#2a63ea,transparent 70%),linear-gradient(160deg,#1d4fd4,#122f86);display:grid;place-items:center}
  .card.back{background:#fff;padding:30px 34px;display:grid;grid-template-rows:auto 1fr;gap:18px}
  .card.back ul{list-style:none;margin:0;padding:0;display:grid;gap:7px;align-content:end;font:400 14px/1.4 'Vazirmatn'}
  .card.back li{display:flex;gap:14px;justify-content:space-between;border-bottom:1px solid #EEF0F5;padding-bottom:6px}
  .card.back li span{color:#9AA3B5}
  .card.back li b{font:600 15px/1.4 'Inter Tight';color:${C.ink}}
  .card.back .who{align-self:start}
  .browser{border-radius:20px;overflow:hidden;background:#fff;box-shadow:0 26px 50px -30px rgba(15,27,45,.55)}
  .tabs{background:#E9ECF2;padding:10px 12px 0;display:flex}
  .tab{display:flex;gap:10px;align-items:center;background:#fff;border-radius:12px 12px 0 0;padding:10px 16px;font:500 13px/1 'Estedad';color:${C.ink}}
  .bar{padding:10px 14px;border-bottom:1px solid #EEF0F5}
  .bar span{display:block;background:#F2F4F8;border-radius:999px;padding:9px 16px;font:500 14px/1 'Inter Tight';color:${C.ink2};text-align:left}
  .site{padding:20px 30px 26px;background:linear-gradient(180deg,#fff,#F3F6FD)}
  .nav{display:flex;justify-content:space-between;align-items:center}
  .nav nav{display:flex;gap:20px;font:500 14px/1 'Estedad';color:${C.ink2}}
  .site h3{margin:22px 0 4px;font:900 30px/1.4 'Estedad'}
  .site p{margin:0;font:400 16px/1.8 'Vazirmatn';color:${C.ink2}}
  .socials{display:grid;justify-items:center;text-align:center;gap:18px;padding:30px 24px;background:#fff;border-radius:22px;align-self:stretch;align-content:center}
  .socials .av{width:150px;height:150px}
  .socials .av{width:120px;height:120px;border-radius:50%;overflow:hidden;box-shadow:0 16px 30px -18px rgba(15,27,45,.6)}
  .socials p{margin:0;font:400 15.5px/1.9 'Vazirmatn';color:${C.ink2}}
  /* donts */
  .donts{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:40px}
  .dont .box{height:230px;border-radius:24px;background:#fff;display:grid;place-items:center;overflow:hidden}
  .dont figcaption{margin-top:12px;font:600 17px/1.5 'Estedad';display:flex;gap:10px;align-items:center}
  .dont i{font-style:normal;width:26px;height:26px;border-radius:50%;background:#E5484D;color:#fff;display:grid;place-items:center;font:700 13px/1 'Inter Tight'}
  .dont{margin:0}
  .busy{width:100%;height:100%;display:grid;place-items:center;background:repeating-linear-gradient(45deg,#3b6cf0 0 12px,#e9a23b 12px 24px,#1f52d6 24px 36px)}
  `;
  const arches = svg('0 0 1600 1000', Array.from({ length: 9 }, (_, i) => `<g transform="translate(${-80 + i * 210} ${i % 2 ? 560 : 640}) scale(2.6)"><path d="${PATHS.arch}" fill="#fff"/></g>`).join(''), 'width="1600" height="1000" class="arches"');
  const foot = (n) => `<div class="foot"><span>RAMIN OMRANI · BRAND GUIDELINES</span><span class="pg">${String(n).padStart(2, '0')}</span></div>`;
  const slides = [
    // 1 cover
    `<section class="slide cover">${arches}<div class="big">${lock(fd, 190)}<div class="sub">راهنمای هویت بصری<b>BRAND GUIDELINES · 2026</b></div></div></section>`,
    // 2 concept
    `<section class="slide"><div class="concept"><div>
      <div class="kicker">01 · Concept</div><h2>طاقِ سازنده، با قلمِ نی</h2>
      <p class="lead">نشانه از دو جزء ساخته شده که هر کدام بخشی از داستان رامین عمرانی را می‌گوید، و کنار هم یک تصویر سوم می‌سازند.</p>
      <div class="ideas">
        <div class="idea"><span class="n" style="background:${C.saffron}">۱</span><div><h4>طاق: «عمرانی» یعنی سازنده</h4><p>قوس جناغی معماری ایرانی، از درگاه‌های مشهد و اصفهان. سازه‌ای دقیق و هندسی؛ همان کاری که در کد انجام می‌شود: ساختن چیزی که می‌ماند.</p></div></div>
        <div class="idea"><span class="n" style="background:${C.lapis}">۲</span><div><h4>ر: رامین، با ضرب قلم</h4><p>حرف اول نام، مثل خطی که با قلم نی کشیده شده: سرِ اریب، شکمِ پُر و دنبالهٔ سبک‌تر. کنار طاقِ هندسی، یعنی مهندسی و هنر با هم.</p></div></div>
        <div class="idea"><span class="n" style="background:${C.turq}">۳</span><div><h4>درگاهِ روشن و <bdi dir="ltr" class="code">&lt;/&gt;</bdi></h4><p>نور فیروزه‌ای از پایین درگاه می‌تابد: ورودی به پروژهٔ شما. طاق و ر کنار هم یادآور تگ کد <bdi dir="ltr" class="code">&lt;/&gt;</bdi> هم هستند.</p></div></div>
      </div></div>
      <div class="hero-mark">${mark(420)}</div></div>${foot(2)}</section>`,
    // 3 construction
    `<section class="slide"><div class="cons"><div>
      <div class="kicker">02 · Construction</div><h2>ساختار و هندسه</h2>
      <p class="lead">همه‌چیز روی شبکهٔ ۱۲×۱۲ ساخته شده. طاق، قوس جناغیِ دو مرکزی است: دو کمان دایره که مرکزشان روی خط پاکار قرار دارد و در محور به هم می‌رسند.</p>
      <div class="specs">
        <div class="spec"><span>دهانهٔ طاق (محور تا محور پایه‌ها)</span><b>${fa(2 * G.ARCH.a)} واحد</b></div>
        <div class="spec"><span>ارتفاع خیز (پاکار تا رأس)</span><b>${fa(G.ARCH.spring - G.ARCH.apex)} واحد</b></div>
        <div class="spec"><span>شعاع هر کمان</span><b>${fa(G.archGeometry().r.toFixed(1))} واحد</b></div>
        <div class="spec"><span>ضخامت طاق</span><b>${fa(G.ARCH.w)} واحد</b></div>
        <div class="spec"><span>ضخامت ر: سر / شکم / دنباله</span><b>${fa(G.REH.entry)} / ${fa(G.REH.belly)} / ${fa(G.REH.tail)}</b></div>
        <div class="spec"><span>نسخهٔ ۱۶ تا ۳۲ پیکسل (فاوآیکن)</span><b>طاق ${fa(13.5)} / ر ${fa(16.5)} واحد</b></div>
      </div></div>${construction()}</div>${foot(3)}</section>`,
    // 4 versions
    `<section class="slide"><div class="kicker">03 · Logo versions</div><h2>نسخه‌های لوگو</h2>
      <div class="grid" style="grid-template-columns:1.35fr 1fr;grid-template-rows:290px 290px">
        <div class="tile" style="grid-row:span 1"><span class="lbl">لوگوی اصلی · فارسی</span>${lock(lockupFa(), 120)}</div>
        <div class="tile"><span class="lbl">عمودی</span>${lock(lockupStacked(), 190)}</div>
        <div class="tile"><span class="lbl">انگلیسی</span>${lock(lockupEn(), 104)}</div>
        <div class="grid" style="grid-template-columns:1fr 1fr;margin:0">
          <div class="tile"><span class="lbl">نشانه (آیکون)</span>${mark(150)}</div>
          <div class="tile"><span class="lbl">نماد بدون کاشی</span>${symbol(150, SYMBOL_STYLES.color)}</div>
        </div>
      </div>${foot(4)}</section>`,
    // 5 backgrounds
    `<section class="slide"><div class="kicker">04 · On backgrounds</div><h2>روی پس‌زمینه‌های مختلف</h2>
      <div class="grid" style="grid-template-columns:repeat(3,1fr);grid-template-rows:300px 300px">
        <div class="tile dk"><span class="lbl">زمینهٔ تیره</span>${lock(lockupFa({ text: C.white, sub: C.gold }), 86)}</div>
        <div class="tile lp"><span class="lbl">زمینهٔ لاجوردی</span>${lock(lockupFa({ text: C.white, sub: C.gold, mark: 'symbol', symbol: SYMBOL_STYLES['on-dark'] }), 86)}</div>
        <div class="tile photo"><span class="lbl">روی عکس</span>${lock(lockupFa({ text: C.white, sub: C.white, mark: 'symbol', symbol: SYMBOL_STYLES.white }), 86)}</div>
        <div class="tile"><span class="lbl">تک‌رنگ مشکی (مهر، چاپ تک‌رنگ)</span>${lock(lockupFa({ text: C.ink, sub: C.ink, mark: 'symbol', symbol: SYMBOL_STYLES.black }), 86)}</div>
        <div class="tile tq"><span class="lbl">تک‌رنگ سفید</span>${lock(lockupFa({ text: C.white, sub: C.white, mark: 'symbol', symbol: SYMBOL_STYLES.white }), 86)}</div>
        <div class="tile pp"><span class="lbl">زمینهٔ کاغذی</span>${lock(lockupFa({ mark: 'symbol', symbol: SYMBOL_STYLES.color }), 86)}</div>
      </div>${foot(5)}</section>`,
    // 6 clear space & min size
    `<section class="slide"><div class="kicker">05 · Clear space & minimum size</div><h2>حریم و کوچک‌ترین اندازه</h2>
      <p class="lead">دور لوگو دست‌کم به اندازهٔ x خالی بماند؛ x یک‌چهارمِ ارتفاع نشانه است. متن، لبهٔ صفحه یا عکس نباید وارد این حریم شود.</p>
      <div class="grid" style="grid-template-columns:1.5fr 1fr;align-items:center">
        <div class="tile" style="padding:40px 50px;place-items:stretch">${clearSpace()}</div>
        <div class="specs" style="margin:0">
          <div class="spec"><span>لوگوی افقی</span><b>حداقل ${fa(120)} پیکسل عرض</b></div>
          <div class="spec"><span>نشانه (آیکون)</span><b>حداقل ${fa(16)} پیکسل، با نسخهٔ فاوآیکن</b></div>
          <div class="spec"><span>نماد بدون کاشی</span><b>حداقل ${fa(20)} پیکسل ارتفاع</b></div>
          <div class="spec"><span>چاپ</span><b>حداقل ${fa(25)} میلی‌متر عرض لوگو</b></div>
        </div></div>
      <div class="minis"><span class="cap">در کوچک‌ترین اندازه، به اندازهٔ واقعی:</span>
        <span>${svg(`0 0 ${f(lockupFa().w)} 120`, lockupFa().body, 'width="120"')}</span>
        <span>${svg('0 0 120 120', markBody('ro', { small: true }), 'width="16" height="16"')}</span>
        <span>${symbol(20, SYMBOL_STYLES.color)}</span>
        <span style="margin-inline-start:40px">${svg(`0 0 ${f(lockupFa().w)} 120`, lockupFa().body, 'width="240"')}</span>
        <span>${mark(32)}</span><span>${symbol(40, SYMBOL_STYLES.color)}</span></div>${foot(6)}</section>`,
    // 7 colours
    `<section class="slide"><div class="kicker">06 · Colour</div><h2>رنگ‌ها، از کاشی‌کاری ایرانی</h2>
      <p class="lead">لاجوردی رنگ اصلی است؛ زعفرانی و طلایی برای طاق و تأکیدها، و فیروزه‌ای برای نورِ درگاه. سهم تقریبی هر رنگ در طراحی‌ها در نوار پایین آمده.</p>
      <div class="swatches">${swatches.map(([n, en, hex, use]) => {
        const light = [C.paper, C.gold].includes(hex);
        const [r, g, b] = hexRgb(hex); const [c, m, y, k] = cmyk(hex);
        return `<div class="sw"><div class="chip" style="background:${hex};color:${light ? C.ink : '#fff'}${hex === C.paper ? ';box-shadow:inset 0 0 0 1px #E6E3DA' : ''}">${n}</div><div class="meta"><b>${en} · ${hex}</b><span>RGB ${r} ${g} ${b}</span><span>CMYK ${c} ${m} ${y} ${k}</span></div><div class="use">${use}</div></div>`;
      }).join('')}</div>
      <div class="ratio"><i style="flex:40;background:${C.lapis}"></i><i style="flex:22;background:${C.paper};box-shadow:inset 0 0 0 1px #E6E3DA"></i><i style="flex:16;background:${C.ink}"></i><i style="flex:10;background:${C.saffron}"></i><i style="flex:7;background:${C.turq}"></i><i style="flex:5;background:${C.gold}"></i></div>
      ${foot(7)}</section>`,
    // 8 typography
    `<section class="slide"><div class="kicker">07 · Typography</div><h2>حروف</h2>
      <div class="type">
        <div class="spec-card"><div class="name">ESTEDAD · PERSIAN DISPLAY</div><div class="sample">رامین</div>
          <p class="lead" style="margin:0;font-size:18px">اِستِداد برای نام، تیترها و دکمه‌ها؛ هندسی و هم‌خانواده با ر نشانه. برای متن بلند از وزیرمتن استفاده می‌شود.</p>
          <div class="weights"><div><b style="font:400 24px 'Estedad'">سایت و اپلیکیشن</b><span>Regular 400</span></div><div><b style="font:600 24px 'Estedad'">سایت و اپلیکیشن</b><span>SemiBold 600</span></div><div><b style="font:800 24px 'Estedad'">سایت و اپلیکیشن</b><span>ExtraBold 800 · logo</span></div><div><b style="font:400 20px 'Vazirmatn'">متن بدنه با وزیرمتن، خوانا در اندازه‌های کوچک</b><span>Vazirmatn 400 · body</span></div></div></div>
        <div class="spec-card en"><div class="name">INTER TIGHT · LATIN</div><div class="sample">Omrani</div>
          <p class="lead" style="margin:0;font-size:18px">اینتر تایت برای نام لاتین و نسخهٔ انگلیسی. نام لاتین زیر لوگو با حروف بزرگ و فاصلهٔ ۰٫۳۲em نوشته می‌شود.</p>
          <div class="weights"><div><b style="font:400 24px 'Inter Tight'">Websites & apps</b><span>Regular 400</span></div><div><b style="font:600 24px 'Inter Tight'">Websites & apps</b><span>SemiBold 600</span></div><div><b style="font:700 24px 'Inter Tight';letter-spacing:-.02em">Websites & apps</b><span>Bold 700 · logo</span></div><div><b style="font:600 16px 'Inter Tight';letter-spacing:.32em">RAMIN OMRANI</b><span>SemiBold 600 · +0.32em</span></div></div></div>
      </div>${foot(8)}</section>`,
    // 9 icons
    `<section class="slide"><div class="kicker">08 · App & store icons</div><h2>آیکون اپلیکیشن و فروشگاه</h2>
      <div class="icons" style="grid-template-columns:1fr 1fr 1fr 320px">
        <div class="icon-card">${svg('0 0 120 120', storeIcon(), 'width="220" height="220"')}<div><b>آیکون فروشگاه (بازار، مایکت)</b>۵۱۲×۵۱۲ با نام اپ</div></div>
        <div class="icon-card">${safeZone()}<div><b>آیکون اندروید (maskable)</b>نشانه داخل دایرهٔ امن ۸۰٪</div></div>
        <div class="icon-card"><div class="fav"><span>${svg('0 0 120 120', markBody('ro', { small: true }), 'width="16" height="16"')}16</span><span>${svg('0 0 120 120', markBody('ro', { small: true }), 'width="32" height="32"')}32</span><span>${mark(64)}64</span><span>${mark(120)}120</span></div><div><b>فاوآیکن و اندازه‌های کوچک</b>زیر ۳۲ پیکسل نسخهٔ پرضخامت</div></div>
        <div style="display:grid;place-items:center">${homeScreen()}</div>
      </div>${foot(9)}</section>`,
    // 10 applications
    `<section class="slide"><div class="kicker">09 · Applications</div><h2>کاربردها</h2>
      <div class="apps-grid">${card()}
      <div class="socials" style="grid-row:span 2"><div class="av">${svg('0 0 120 120', `<rect width="120" height="120" fill="url(#ro-tile)"/><g transform="translate(60 60) scale(.78) translate(-60 -60)">${markBody('ro', { bleed: true }).replace(/^<rect[^>]+\/>/, '')}</g>`, 'width="150" height="150"')}</div><p><b style="font:800 18px 'Estedad';color:${C.ink}">عکس پروفایل</b><br>تلگرام، واتس‌اپ و اینستاگرام عکس را دایره‌ای می‌بُرند؛ فایل avatar-1080.png برای همین ساخته شده.</p></div>
      ${browserMock()}
      </div>${foot(10)}</section>`,
    // 11 don'ts
    `<section class="slide"><div class="kicker">10 · Misuse</div><h2>کارهایی که نباید کرد</h2><div class="donts">${donts()}</div>${foot(11)}</section>`,
  ];
  return `<!doctype html><html lang="fa"><head><meta charset="utf-8"><style>${css}</style></head><body>${slides.join('')}</body></html>`;
}

const { chromium } = await import(PLAYWRIGHT);
const dir = resolve(OUT, 'guidelines');
mkdirSync(dir, { recursive: true });
const file = resolve(dir, '.deck.html');
writeFileSync(file, html());
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
await page.goto(pathToFileURL(file).href);
await page.evaluate(() => document.fonts.ready);
await page.pdf({ path: resolve(OUT, 'ramin-omrani-brand-guidelines.pdf'), width: '1600px', height: '1000px', printBackground: true });
const n = await page.locator('.slide').count();
for (let i = 0; i < n; i++) await page.locator('.slide').nth(i).screenshot({ path: resolve(dir, `page-${String(i + 1).padStart(2, '0')}.png`) });
await browser.close();
console.log(`guidelines: ${n} pages`);
