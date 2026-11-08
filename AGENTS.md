# AGENTS.md: handoff guide for AI assistants and developers

<div dir="rtl">

**برای رامین:** این فایل برای هر هوش مصنوعی یا برنامه‌نویسی است که بعداً کار را ادامه می‌دهد. همه چیز اینجاست: پروژه چیست، چطور ساخته و منتشر می‌شود، وضعیت سرور و سرویس‌ها، تصمیم‌ها و کارهای باقی‌مانده. کافی است به هوش مصنوعی بعدی بگویید: «مخزن RaminOmrani/personal_website را باز کن و اول AGENTS.md را بخوان».

</div>

Read this file first, then `DEPLOY.md` (deploy guide, Persian) and `README.md` (feature tour, Persian).
Last updated: 2026-11-08.

---

## 1. Rules that matter most

1. **Answer the owner in English and Persian.** Ramin speaks Persian and asked for every answer in both languages, because they are learning English but need Persian to understand fully. Write the English section, then the same content in Persian.
2. **The logo is not approved yet.** The logo currently in the repo (the arch with «ر», see §8) is a proposal. Don't build on it as final, and don't tell the owner to deploy before a logo is picked (see rule 3).
3. **Don't ask the owner to run `setup-server.sh --update` until the logo is approved.** The release package in `release/` contains the unapproved logo. Urgent live fixes have been done as small, targeted commands instead (§6).
4. **Approval before applying design changes.** For anything visual (logo, identity, big layout changes), show options or mockups first, then apply only what the owner approves.
5. **Never ask for SSH passwords, keys or other secrets.** Give the owner exact commands to run on the server; they paste the output back. Never commit secrets.
6. **Keep the Enamad code on the homepage exactly as issued** (`chooser/index.html`: the `<meta name="enamad">` tag and the trust-seal `<a><img>` in the footer), and keep `chooser/14167236.txt`.
7. **After any change to the site, rebuild and commit the release package** (§5). The server installs from that file.
8. **The VPS runs other people's sites too.** Only touch raminomrani.ir's own files and Nginx config.
9. **Keep this file current.** When something here changes (a task is done, the server or DNS changes, a decision is made), update the relevant section and the date at the top in the same commit.

---

## 2. The owner and how to work together

- **Ramin Omrani** (رامین عمرانی): full-stack and AI developer in Mashhad, Iran, who builds websites, apps, CRMs and Telegram bots for clients. GitHub: `RaminOmrani`.
- This repo is Ramin's **personal portfolio site** at **https://raminomrani.ir**. The audience is mostly Iranian clients, so the site is Persian-first (RTL) with an English version.
- Ramin usually works from a Windows PC, writes in Persian, and sends screenshots of panels (ArvanCloud, ParsPack, ImprovMX and so on). Explain things step by step: which field, what to type, which button.
- Ramin has an SSH session open to the server and runs the commands you give. Make commands safe to repeat, back up before editing, and say what output to expect.
- Contact details shown on the site: phone 0901 702 1166, WhatsApp 0936 574 3458, Telegram @Daneshjoo_AI. Mail for the domain is info@raminomrani.ir (§7).

---

## 3. What the site is

One domain, a few versions of the same portfolio. Visitors choose on their first visit.

| URL | What | Source |
| --- | --- | --- |
| `/` | **Version chooser** (fa/en). Remembers the pick in `localStorage` (`ro:version`, `ro:lang`) and redirects next time; `/?choose` shows it again. Holds the Enamad meta tag and seal. | `chooser/index.html` (static HTML, no build) |
| `/v1/` | **"Night"**: dark, WebGL particles (Three.js), GSAP, Lenis, ambient sound. English: `/v1/?lang=en`. | repo root: `src/`, `index.html`, `public/` (Vite + TypeScript, no framework) |
| `/v2/` | **"Day"**: light, simple, fast. English: `/v2/en.html`. | `v2/` (React 19, Motion, Vaul, Base UI, Sonner; prerendered) |
| `/v3/` | **"Cinema"**: light, 3D film (React Three Fiber), Persian-tile palette, newest. English: `/v3/en.html`. | `v3/` (React 19, R3F, GSAP, Lenis; prerendered) |
| `/app/` | **Installable app (PWA)**, the base for the Android app in Cafe Bazaar, Myket and Google Play. | `app/` (React 19, service worker in `app/sw/`) |
| `/privacy/` | Privacy policy (fa, with English at `#en`), needed by app stores. | `chooser/privacy/index.html` |
| `/.well-known/assetlinks.json`, `/app-links.json` | Generated from `deploy/android.json` at build time (§9, Bazaar). | `scripts/build-site.mjs` |

Each version's footer links back to `/?choose` and shows the Enamad seal.

---

## 4. Repository layout

| Path | Contents |
| --- | --- |
| `src/`, `index.html`, `public/`, `vite.config.ts` | v1. All text lives in `src/content.ts` (`l('fa', 'en')` pairs); `src/render.ts` builds the HTML. |
| `v2/src/` | v2. Text in `v2/src/data/copy.ts`, contacts in `site.ts`, projects in `projects.ts`; images in `v2/public/work/`. |
| `v3/src/` | v3. Text in `v3/src/data/copy.ts`, contacts in `site.ts`, projects in `projects.ts`, bot demo in `bot.ts`; colours in `v3/src/styles/base.css`; logo component `v3/src/ui/Logo.tsx`. |
| `app/` | The PWA. `app/src/copy.ts` holds text; `app/scripts/make-icons.mjs` makes icons from `brand/`; `app/scripts/screenshots.mjs` makes manifest screenshots. |
| `chooser/` | The homepage, privacy page, 404, robots, sitemap, OG image, screenshots of each version (`shots/`), Enamad file. |
| `brand/` | Logo kit (proposal, not approved): `tools/geometry.mjs` (shapes), `tools/build.mjs` (SVG/PNG), `tools/guidelines.mjs` (PDF), `tools/apply.mjs` (copies into the sites), `svg/`, `png/`, guidelines PDF. See `brand/README.md`. |
| `store/` | App-store listing: texts (fa/en), screenshots, feature graphic, icon; `make-store.mjs` regenerates them. See `store/README.md`. |
| `deploy/` | `setup-server.sh` (install/update on an Ubuntu VPS), `check-server.sh` (read-only server survey), `nginx/raminomrani.ir.conf`, `apache/.htaccess`, `iis/web.config`, `android.json`. |
| `scripts/build-site.mjs` | Builds everything into `site/` and, with `--package`, into `release/raminomrani-site.tar.gz`. |
| `scripts/serve-site.mjs` | Serves `site/` locally the way Nginx does, for checking a build in a browser. |
| `release/raminomrani-site.tar.gz` | The committed deploy package the server downloads. |
| `.claude/skills/` | Design and animation skills for Claude Code (Emil Kowalski, MIT). |
| `.github/workflows/deploy.yml` | GitHub Pages deploy. **Inactive**: it triggers on `main`, which doesn't exist. Production is the VPS. |

Generated and ignored: `node_modules/`, `dist/`, `site/`, `dist-ssr/`, `brand/guidelines/`.

---

## 5. Build, check, package

Needs Node 22. Each project (root, `v2`, `v3`, `app`) has its own `package.json` and lockfile.

```bash
npm run build:site                              # npm ci + build in every project, then assemble ./site
node scripts/build-site.mjs --no-install        # same, reusing existing node_modules
node scripts/build-site.mjs --no-install --package   # also writes release/raminomrani-site.tar.gz
npm run serve:site                              # serves ./site on http://localhost:4300
```

- There are no unit tests. To check a change: each project's build runs `tsc --noEmit` first, so a clean `build-site` means types are fine. Then serve `site/` and look at the pages (Playwright screenshots work well), on desktop and on a phone-sized viewport, in Persian and English.
- `scripts/build-site.mjs` prints a warning about a missing signing-key fingerprint until the Bazaar step is done. That's expected.
- Brand, icon and store scripts need Playwright. They import it from `PLAYWRIGHT_MODULE`, defaulting to `/opt/node22/lib/node_modules/playwright/index.mjs`. Set the variable if yours is elsewhere. The brand text-to-outline step also needs `pip install uharfbuzz fonttools brotli`.
- **Git:** the default branch on GitHub is `claude/gallant-goldberg-g3496m`; it is the only branch. The server downloads `release/raminomrani-site.tar.gz` from the default branch's HEAD, so pushing a rebuilt package stages a release. It goes live only when the owner runs `--update`.

---

## 6. Production: the live server

- **Server:** ParsPack VPS (outside Iran), IP `82.115.8.170`, Ubuntu 24.04, Nginx with Let's Encrypt (certbot). It also hosts other sites, so leave other server blocks alone.
- **Site files:** `/var/www/raminomrani.ir`. **Nginx:** `/etc/nginx/sites-available/raminomrani.ir.conf`, enabled as `/etc/nginx/sites-enabled/zz-raminomrani.ir.conf`.
- **Install/update:** `sudo bash /root/raminomrani-site/setup-server.sh --update`. It downloads the package, replaces the site files (keeping `.well-known/` and `downloads/`), rewrites the Nginx config (HTTPS when a certificate exists; restores the old file if `nginx -t` fails) and reloads Nginx. First install and the other options are in `DEPLOY.md` §4.

**What is live now differs from the repo.** The live site is a package built before the logo proposal (commit `55ea562` or earlier), plus these hand-made changes:
1. `<meta name="enamad" content="14167236" />` added after `<meta charset>` in `/var/www/raminomrani.ir/index.html`.
2. An empty `/var/www/raminomrani.ir/14167236.txt` (Enamad domain check).
3. The Enamad trust seal in the homepage footer, added with a small Python edit (backup in `/root/index.html.before-enamad`). The owner was given this command; check with `curl -s https://raminomrani.ir/ | grep -c trustseal.enamad.ir` (prints `1` if it's there).

Not live yet (in the repo only): the new logo proposal, the privacy page, `assetlinks.json` and `app-links.json`, store links in the app and chooser, and the Enamad seal in the v1, v2 and v3 footers. All of it arrives with the next `--update`, which waits on the logo decision.

**Planned:** a second VPS inside Iran (ParsPack irHybrid XSSD-02, Ubuntu 24.04) for Ramin's Iran-facing sites: this portfolio and two client projects, Zehne Sabz (Next.js + API + Prisma + Postgres) and Doping Shimi (Next.js + Prisma + Postgres, videos on Arvan VOD), with up to about 10 more later. Not bought yet. When the owner sends the IP: set up a multi-site server (Nginx, PM2, PostgreSQL, HTTPS, backups, memory limits) and move those sites over. Keep Telegram bots and services that need foreign APIs on the foreign server. GitHub, npm and Docker Hub can be slow or blocked from Iran; plan for mirrors or uploading builds.

---

## 7. Domain, DNS and outside services

- **Domain:** `raminomrani.ir`, registered at nic.ir. **DNS:** ArvanCloud (nameservers `k.ns.arvancdn.ir`, `y.ns.arvancdn.ir`). Arvan's **Cloud (proxy) is off** for every record.

| Name | Type | Value | Purpose |
| --- | --- | --- | --- |
| `@` | A | `82.115.8.170` | site |
| `www` | A | `82.115.8.170` | site (redirects to the bare domain) |
| `@` | MX | `mx1.improvmx.com` (10), `mx2.improvmx.com` (20) | mail for info@raminomrani.ir |
| `@` | TXT | `v=spf1 include:spf.improvmx.com include:_spf.google.com ~all` | SPF (ImprovMX and Gmail's "Send mail as") |
| `payamak` | CNAME | `panel.payamak-panel.com` | Melli Payamak SMS reseller panel |

When the site moves to another server, only the two A records change.

| Service | Status |
| --- | --- |
| **ImprovMX** (free) | Forwards info@raminomrani.ir to the owner's Gmail; MX and SPF checked from outside. Sending as info@ from Gmail ("Send mail as" with smtp.gmail.com and an app password) was explained but may not be set up. |
| **Enamad** (enamad.ir, Iran's e-commerce trust seal) | Domain verified (code `14167236`). Trust seal issued: `id=8117770`, `Code=9EiztP6QldcKM73OthDdMisT3J4LgfOk`. In the repo on the homepage and in all version footers; live on the homepage only (§6). |
| **Melli Payamak** (SMS reseller) | Gave `payamak.raminomrani.ir`; the owner was adding the CNAME (Cloud must be off). Verify with a DNS lookup. If the panel shows an SSL warning, Melli Payamak has to issue the certificate on their side. |
| **Cafe Bazaar / Myket / Google Play** | Prep done (privacy page, assetlinks with the `cafebazaar_twa` entry, store texts and images in `store/`). Waiting on the owner to build the Android package in PWABuilder (§9). |

---

## 8. Brand and logo status

- **Live today:** an older mark, a white «ر» inside a golden pointed arch on a lapis tile.
- **In the repo (proposal):** the `brand/` kit. A two-centred Persian pointed arch ("Omrani" suggests builder), a reed-pen «ر» for Ramin, a turquoise glow in the doorway, on a lapis squircle. Palette: lapis `#1F52D6`, dark lapis `#173FA8`, turquoise `#0E9AA7`, saffron `#E9A23B`, gold `#F3C46E`, ink `#0F1B2D`, paper `#F6F4EF`. Fonts: Estedad (name, headings), Vazirmatn (text), Inter Tight (Latin). It is already applied across the sites, app icons, store images and favicons in the repo.
- **Owner's feedback:** a lone «ر» doesn't say "Ramin Omrani" enough; the owner wants more of the name in it. A second round of 10 very different concepts (some with an AI/tech feel) was shown as images; the owner felt they weren't unique enough and asked for a neutral prompt to try other AI image tools. **Nothing has been chosen.** The owner may come back with a design made elsewhere.
- **When a logo is approved:** redraw it as clean vectors (extend `brand/tools/geometry.mjs` and `build.mjs`), rebuild the kit, then run `brand/tools/apply.mjs`, `app` icons (`cd app && npm run icons`), the store images (`node store/make-store.mjs` after `cd app && npm run build`), the version screenshots in `chooser/shots/` and the OG image if the logo appears there, and the logo inside the v2 and v3 headers and footers (`v3/src/ui/Logo.tsx`, `v2/public/brand-mark.svg`). Rebuild the package, push, and only then ask the owner to run `--update`.

---

## 9. Open tasks, most urgent first

1. **Logo decision** (§8). Blocks the next full deploy.
2. **Full deploy** after approval: rebuild the package, push, owner runs `--update`, then check the live site (all versions, fa/en, phone and desktop, the Enamad seal, `/privacy/`, `/.well-known/assetlinks.json`).
3. **Android app / Cafe Bazaar** (steps in `store/README.md`): the owner builds the APK in PWABuilder (package `ir.raminomrani.app`, a new signing key), sends the SHA-256 fingerprint → put it in `deploy/android.json` → rebuild and push → deploy. Once the app is published, add the store links (and the APK path if it's hosted under `/downloads/`) to `deploy/android.json`; the chooser and app show them automatically.
4. **Confirm the `payamak` CNAME** resolves and the panel opens.
5. **Iran VPS and migration** (§6), once it's bought.
6. Possibly: set up "Send mail as info@" in Gmail, if the owner wants to reply from that address.

---

## 10. Conventions and gotchas

- **Persian first.** Every page is RTL Persian with an LTR English twin. Use logical CSS properties (`inset-inline`, `margin-inline`), and check both directions.
- **Bilingual text lives in data files**, written as `l('فارسی', 'English')`. In v2 components use `t(...)`; in v3 use the `useCopy()` objects. Don't hard-code one language in components.
- **No external CDNs or Google Fonts.** Everything is self-hosted (`@fontsource` packages, local files), because foreign services are unreliable from Iran. Third-party requests on the site: only the Enamad seal image.
- **Fonts:** v1 uses Vazirmatn, Inter Tight, JetBrains Mono, Unbounded and Instrument Serif. v2 uses Vazirmatn and Geist. v3 and the app use Vazirmatn for text, Estedad for headings, Noto Nastaliq Urdu for a few accent words, and Bricolage Grotesque, Instrument Sans and Instrument Serif for Latin; in v3 data files `{...}` marks a gradient word and `[...]` a Nastaliq word.
- **Motion:** honour `prefers-reduced-motion`; animate `transform`/`opacity`; buttons get a press state. The Claude skills in `.claude/skills/` describe the house style for motion.
- **The chooser is plain HTML.** Edit `chooser/index.html` directly; its English strings are in the `en` object near the bottom.
- **Enamad seal markup:** on the homepage it's Enamad's snippet verbatim. In React (v2, v3) the same attributes are written in JSX (`referrerPolicy="origin"`, `code` passed with a spread). The site sends `Referrer-Policy: strict-origin-when-cross-origin`; the seal's own `referrerpolicy='origin'` overrides it, which Enamad needs.
- **Server config lives in `deploy/`.** `setup-server.sh` rewrites the Nginx file on every run from `deploy/nginx/raminomrani.ir.conf`, so change the template, not the live file (unless it's an urgent targeted fix, which you then also put in the template).
- **APKs** under `/downloads/` are served with the right MIME type (Nginx, Apache and IIS configs all handle it) and survive updates.
- **Comments in code** are short and explain why. Match the surrounding style.
- **Commits:** clear messages describing what changed and why; rebuild and include `release/raminomrani-site.tar.gz` when the site changed.

---

## 11. History in brief

- **2026-09-30:** v1 (dark particles) built; design skills added. Then v2 (light React) and v3 (cinematic 3D) built with real project screenshots (Zehne Sabz, Doping Shimi, a CRM, a support desk, Dongi, ForwardBot); English versions; the chooser at `/`; deploy configs and `setup-server.sh`; the PWA at `/app/`. Live on the VPS with HTTPS.
- **2026-10-01:** logo system proposal (`brand/`), Cafe Bazaar prep (privacy page, assetlinks, store listing). The owner was asked not to deploy until a logo is approved.
- **2026-10-06 to 10-10:** DNS table in `DEPLOY.md`, Enamad verification and trust seal, info@ mailbox through ImprovMX, Melli Payamak subdomain.
- **2026-11-08:** this handoff guide and `scripts/serve-site.mjs`.
