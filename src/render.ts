import {
  about,
  contact,
  faq,
  hero,
  journey,
  journeyKinds,
  process,
  services,
  site,
  testimonials,
  tools,
  ui,
  work,
  type Lang,
  type Project,
} from './content';
import { icons, type IconName } from './icons';
import { accessible, chars, esc, num, pad, plain, rich, t, words } from './text';

export interface RenderOptions {
  /** Show placeholder content (true in dev). Sample testimonials are never rendered in production. */
  dev: boolean;
  year: number;
}

/** Particle-scene state for a section: s = shape index, x = offset toward inline-end (fraction of viewport). */
interface GL {
  s: number;
  x?: number;
  o?: number;
  sc?: number;
}
const gl = (cfg: GL): string => `data-gl='${JSON.stringify(cfg)}'`;

const sampleBadge = (sample: boolean | undefined, lang: Lang, dev: boolean): string =>
  sample && dev ? `<span class="sample-badge">${esc(t(ui.sample, lang))}</span>` : '';

const label = (index: number, text: string, lang: Lang): string =>
  `<p class="section-label" data-reveal><span class="section-label-i">(${pad(index, lang)})</span><span>${esc(text)}</span></p>`;

const heading = (text: string, tag = 'h2', cls = 'section-title'): string =>
  `<${tag} class="${cls}" data-split>${accessible(text, words(text))}</${tag}>`;

const marqueeRow = (items: string[], dir: 1 | -1, outline: boolean): string => {
  const unit = items.map((i) => `<span class="mq-item">${esc(i)}</span><span class="mq-sep">${icons.spark}</span>`).join('');
  return `<div class="marquee${outline ? ' marquee--outline' : ''}" data-marquee="${dir}"><div class="marquee-track"><div class="marquee-unit">${unit}</div><div class="marquee-unit" aria-hidden="true">${unit}</div></div></div>`;
};

/* ───────────── Cover art (drawn in CSS when a project has no image) ───────────── */

const mockUi = `<div class="mock-nav"><b></b><span></span><span></span><span></span></div>
  <div class="mock-hero"><i class="mock-h1"></i><i class="mock-h1 mock-h1--s"></i><i class="mock-btn"></i></div>
  <div class="mock-grid"><i></i><i></i><i></i></div>`;

const phoneUi = `<div class="phone-notch"></div><div class="phone-cover"></div>
  <i class="phone-line"></i><i class="phone-line phone-line--s"></i>
  <div class="phone-list"><i></i><i></i><i></i></div><div class="phone-bar"></div>`;

export function projectArt(p: Project, lang: Lang, big = false): string {
  if (p.image) {
    return `<img class="art-img" src="${esc(p.image)}" alt="${esc(t(p.title, lang))}" loading="${big ? 'eager' : 'lazy'}" decoding="async">`;
  }
  const device =
    p.kind === 'app'
      ? `<div class="mock mock--phones"><div class="phone">${phoneUi}</div><div class="phone phone--2">${phoneUi}</div></div>`
      : `<div class="mock mock--browser"><div class="mock-bar"><i></i><i></i><i></i><span></span></div><div class="mock-body">${mockUi}</div></div>`;
  return `<div class="art art--${p.kind}" style="--c1:${p.colors[0]};--c2:${p.colors[1]}" aria-hidden="true">
    <div class="art-bg"></div><div class="art-word">${esc(p.title.en)}</div>${device}</div>`;
}

/* ───────────────────────────── Sections ───────────────────────────── */

function header(lang: Lang): string {
  const n = ui.nav;
  const links: [string, string][] = [
    ['#work', t(n.work, lang)],
    ['#about', t(n.about, lang)],
    ['#services', t(n.services, lang)],
    ['#process', t(n.process, lang)],
    ['#contact', t(n.contact, lang)],
  ];
  const navItems = links
    .map(
      ([href, text], i) =>
        `<li><a href="${href}" class="nav-link" data-scramble><span class="nav-i">${pad(i + 1, lang)}</span><span class="nav-t" data-text="${esc(text)}">${esc(text)}</span></a></li>`,
    )
    .join('');
  const menuItems = links
    .map(
      ([href, text], i) =>
        `<li><a href="${href}" class="menu-link" data-menu-link><span class="menu-i">${pad(i + 1, lang)}</span><span class="menu-t">${esc(text)}</span></a></li>`,
    )
    .join('');
  const other = lang === 'fa' ? 'EN' : 'FA';
  const current = lang === 'fa' ? 'FA' : 'EN';

  return `
<header class="header" data-header>
  <a class="brand" href="#top" data-magnetic aria-label="${esc(t(site.name, lang))}">
    <span class="brand-mark"><img src="me/me-face.webp" alt="" width="44" height="44" decoding="async"></span>
    <span class="brand-name">${esc(t(site.name, lang))}<small>${esc(t(site.role, lang))}</small></span>
  </a>
  <nav class="nav" aria-label="${esc(t(ui.chooseSection, lang))}"><ul>${navItems}</ul></nav>
  <div class="header-tools">
    <button class="tool-btn lang-btn" type="button" data-lang-toggle aria-label="${esc(t(ui.langSwitch, lang))}" data-cursor="hover">
      <span class="lang-cur">${current}</span><span class="lang-sep">/</span><span class="lang-next">${other}</span>
    </button>
    <button class="tool-btn sound-btn" type="button" data-sound aria-pressed="false" aria-label="${esc(t(ui.soundOn, lang))}" data-label-on="${esc(t(ui.soundOff, lang))}" data-label-off="${esc(t(ui.soundOn, lang))}" data-cursor="hover">
      <span class="bars" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
    </button>
    <a class="btn btn--pill header-cta" href="#contact" data-magnetic><span class="btn-t">${esc(t(ui.talk, lang))}</span><span class="btn-dot"></span></a>
    <button class="tool-btn menu-btn" type="button" data-menu-toggle aria-expanded="false" aria-controls="menu">
      <span class="menu-lines" aria-hidden="true"><i></i><i></i></span><span class="sr-only">${esc(t(ui.menu, lang))}</span>
    </button>
  </div>
</header>
<div class="menu" id="menu" data-menu hidden>
  <div class="menu-bg" aria-hidden="true"></div>
  <nav aria-label="${esc(t(ui.menu, lang))}"><ul class="menu-list">${menuItems}</ul></nav>
  <div class="menu-foot">
    <a href="mailto:${esc(site.email)}" class="menu-mail">${esc(site.email)}</a>
    <ul class="menu-socials">${site.socials.map((s) => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)}</a></li>`).join('')}</ul>
  </div>
</div>`;
}

function heroSection(lang: Lang, o: RenderOptions): string {
  const [l1, l2] = site.heroName[lang];
  const split = (s: string) => (lang === 'fa' ? `<span class="ch ch--word">${esc(s)}</span>` : chars(s));
  return `
<section class="hero" id="top" ${gl({ s: 0, x: 0.16 })} data-hud="${esc(t(hero.eyebrow, lang))}">
  <div class="hero-meta">
    <p class="hero-eyebrow" data-hero-fade>(${esc(t(hero.eyebrow, lang))} — ©${num(o.year, lang)})</p>
    <p class="hero-loc" data-hero-fade>${esc(t(site.location, lang))} — <time data-clock>--:--</time></p>
    ${site.available ? `<p class="status" data-hero-fade><span class="status-dot" aria-hidden="true"></span>${esc(t(site.availability, lang))}</p>` : ''}
  </div>
  <h1 class="hero-title">
    <span class="sr-only">${esc(t(site.name, lang))} — ${esc(t(site.role, lang))}</span>
    <span class="hero-line hero-line--1" aria-hidden="true"><span class="hero-line-i">${split(l1)}</span></span>
    <span class="hero-line hero-line--2" aria-hidden="true"><span class="hero-line-i">${split(l2)}</span></span>
  </h1>
  <p class="hero-statement" data-hero-split>${accessible(t(hero.statement, lang), words(t(hero.statement, lang)))}</p>
  <div class="hero-bottom">
    <p class="hero-intro" data-hero-fade>${esc(t(hero.intro, lang))}</p>
    <div class="hero-ctas" data-hero-fade>
      <a class="btn btn--primary" href="#work" data-magnetic><span class="btn-t">${esc(t(hero.primaryCta, lang))}</span><span class="btn-ic">${icons.arrow}</span></a>
      <a class="btn btn--ghost" href="#contact" data-magnetic><span class="btn-t">${esc(t(hero.secondaryCta, lang))}</span></a>
    </div>
    <a class="scroll-hint" href="#about" data-hero-fade><span>${esc(t(hero.scroll, lang))}</span><i aria-hidden="true"></i></a>
  </div>
</section>`;
}

function aboutSection(lang: Lang, idx: number): string {
  const m = t(about.manifesto, lang);
  const stats = about.stats
    .map(
      (s) => `<li class="stat" data-reveal>
        <span class="stat-num" dir="ltr"><span data-count="${s.value}">${num(s.value, lang)}</span><span class="stat-suf">${esc(s.suffix)}</span></span>
        <span class="stat-label">${esc(t(s.label, lang))}</span></li>`,
    )
    .join('');
  return `
<section class="section about" id="about" ${gl({ s: 1, x: 0.27, o: 0.95 })} data-hud="${esc(t(about.label, lang))}">
  ${label(idx, t(about.label, lang), lang)}
  <p class="manifesto" data-manifesto>${accessible(m, words(m))}</p>
  <div class="about-portrait" data-portrait-anchor aria-hidden="true"></div>
  <div class="about-grid">
    <div class="name-card" data-reveal data-tilt>
      <div class="name-card-glow" aria-hidden="true"></div>
      <p class="name-card-word">${esc(t(about.nameCard.word, lang))}</p>
      <p class="name-card-ph" dir="ltr">${esc(about.nameCard.phonetic)}</p>
      <p class="name-card-text">${esc(t(about.nameCard.text, lang))}</p>
    </div>
    <ul class="stats">${stats}</ul>
  </div>
</section>`;
}

function servicesSection(lang: Lang, idx: number): string {
  const items = services.items
    .map(
      (s, i) => `
    <li class="svc" style="--i:${i}">
      <article class="svc-card">
        <span class="svc-dim" aria-hidden="true"></span>
        <div class="svc-top"><span class="svc-num">${pad(i + 1, lang)}</span><span class="svc-icon">${icons[s.icon as IconName]}</span></div>
        <h3 class="svc-title">${esc(t(s.title, lang))}</h3>
        <p class="svc-text">${esc(t(s.text, lang))}</p>
        <ul class="tags">${s.tags.map((tag) => `<li>${esc(tag)}</li>`).join('')}</ul>
      </article>
    </li>`,
    )
    .join('');
  return `
<section class="section services" id="services" ${gl({ s: 2, x: 0, o: 0.75 })} data-hud="${esc(t(services.label, lang))}">
  <header class="section-head">${label(idx, t(services.label, lang), lang)}${heading(t(services.title, lang))}</header>
  <ol class="svc-list">${items}</ol>
</section>`;
}

function workSection(lang: Lang, idx: number, o: RenderOptions): string {
  const cards = work.projects
    .map(
      (p, i) => `
      <a class="project" href="#case/${p.slug}" data-case="${p.slug}" data-cursor="view" data-cursor-label="${esc(t(ui.view, lang))}">
        <div class="project-media">${projectArt(p, lang)}<span class="spot" aria-hidden="true"></span>${sampleBadge(p.sample, lang, o.dev)}</div>
        <div class="project-info">
          <span class="project-idx">${pad(i + 1, lang)}</span>
          <h3 class="project-title">${esc(t(p.title, lang))}</h3>
          <span class="project-cat">${esc(t(p.category, lang))}</span>
          <span class="project-year">${num(p.year, lang)}</span>
        </div>
      </a>`,
    )
    .join('');
  return `
<section class="section work" id="work" ${gl({ s: 3, x: 0, o: 0.6 })} data-hud="${esc(t(work.label, lang))}">
  <div class="work-pin" data-work-pin>
    <header class="work-head">
      ${label(idx, t(work.label, lang), lang)}
      ${heading(t(work.title, lang))}
      <p class="work-meta" data-reveal><span class="work-count">${pad(work.projects.length, lang)}</span><span>${esc(t(work.hint, lang))}</span></p>
    </header>
    <div class="work-track" data-work-track>
      ${cards}
      <div class="work-outro">
        <p class="work-outro-title">${rich(t(work.outro.title, lang))}</p>
        <a class="btn btn--primary" href="#contact" data-magnetic><span class="btn-t">${esc(t(work.outro.cta, lang))}</span><span class="btn-ic">${icons.arrow}</span></a>
      </div>
    </div>
    <div class="work-progress" aria-hidden="true"><i data-work-progress></i></div>
  </div>
</section>`;
}

function processSection(lang: Lang, idx: number): string {
  const steps = process.steps
    .map(
      (s, i) => `
      <li class="step" data-reveal>
        <span class="step-num">${pad(i + 1, lang)}</span>
        <div class="step-body"><h3 class="step-title">${esc(t(s.title, lang))}</h3><p class="step-text">${esc(t(s.text, lang))}</p></div>
        <span class="step-time">${esc(t(s.time, lang))}</span>
      </li>`,
    )
    .join('');
  return `
<section class="section process" id="process" ${gl({ s: 4, x: -0.3, o: 0.85 })} data-hud="${esc(t(process.label, lang))}">
  <div class="process-grid">
    <div class="process-aside">
      ${label(idx, t(process.label, lang), lang)}
      ${heading(t(process.title, lang))}
      <p class="process-text" data-reveal>${esc(t(process.text, lang))}</p>
    </div>
    <div class="process-steps">
      <div class="process-line" aria-hidden="true"><i data-process-line></i></div>
      <ol class="steps">${steps}</ol>
    </div>
  </div>
</section>`;
}

function journeySection(lang: Lang, idx: number, o: RenderOptions): string {
  const rows = journey.items
    .map(
      (j) => `
      <li class="jr" data-reveal>
        <span class="jr-year">${esc(t(j.year, lang))}</span>
        <span class="jr-title">${
          j.url
            ? `<a href="${esc(j.url)}" target="_blank" rel="noopener">${esc(t(j.title, lang))}</a>`
            : esc(t(j.title, lang))
        }${sampleBadge(j.sample, lang, o.dev)}</span>
        <span class="jr-place">${esc(t(j.place, lang))}</span>
        <span class="jr-kind">${esc(t(journeyKinds[j.kind], lang))}</span>
      </li>`,
    )
    .join('');
  return `
<section class="section journey" id="journey" ${gl({ s: 5, x: 0, o: 0.55 })} data-hud="${esc(t(journey.label, lang))}">
  <header class="section-head">${label(idx, t(journey.label, lang), lang)}${heading(t(journey.title, lang))}</header>
  <ul class="jr-list">${rows}</ul>
</section>
<section class="tools" aria-label="${esc(t(tools.label, lang))}">
  ${marqueeRow(tools.rows[0], 1, false)}
  ${marqueeRow(tools.rows[1], -1, true)}
</section>`;
}

function quotesSection(lang: Lang, idx: number, o: RenderOptions): string {
  const items = testimonials.items.filter((q) => o.dev || !q.sample);
  if (!items.length) return '';
  const figs = items
    .map(
      (q, i) => `
      <figure class="quote${i === 0 ? ' is-active' : ''}" data-quote aria-hidden="${i === 0 ? 'false' : 'true'}">
        ${sampleBadge(q.sample, lang, o.dev)}
        <blockquote><p>${esc(t(q.quote, lang))}</p></blockquote>
        <figcaption><strong>${esc(t(q.name, lang))}</strong><span>${esc(t(q.role, lang))}</span></figcaption>
      </figure>`,
    )
    .join('');
  return `
<section class="section quotes" id="testimonials" ${gl({ s: 6, x: 0, o: 0.5 })} data-hud="${esc(t(testimonials.label, lang))}">
  <header class="section-head">${label(idx, t(testimonials.label, lang), lang)}${heading(t(testimonials.title, lang))}</header>
  <div class="quote-stage" data-quotes data-reveal>
    <span class="quote-mark" aria-hidden="true">“</span>
    ${figs}
    <div class="quote-nav">
      <button class="round-btn" type="button" data-quote-prev aria-label="${esc(t(ui.prevQuote, lang))}" data-magnetic>${icons.arrow}</button>
      <span class="quote-count"><span data-quote-index>${pad(1, lang)}</span> / ${pad(items.length, lang)}</span>
      <button class="round-btn" type="button" data-quote-next aria-label="${esc(t(ui.nextQuote, lang))}" data-magnetic>${icons.arrow}</button>
    </div>
  </div>
</section>`;
}

function faqSection(lang: Lang, idx: number): string {
  const qa = faq.items
    .map(
      (f) => `
      <details class="qa" name="faq" data-reveal>
        <summary><span class="qa-q">${esc(t(f.q, lang))}</span><span class="qa-icon" aria-hidden="true">${icons.plus}</span></summary>
        <div class="qa-a"><p>${esc(t(f.a, lang))}</p></div>
      </details>`,
    )
    .join('');
  return `
<section class="section faq" id="faq" ${gl({ s: 6, x: 0.25, o: 0.45 })} data-hud="${esc(t(faq.label, lang))}">
  <div class="faq-grid">
    <header class="section-head">${label(idx, t(faq.label, lang), lang)}${heading(t(faq.title, lang))}</header>
    <div class="faq-list">${qa}</div>
  </div>
</section>`;
}

function contactSection(lang: Lang, idx: number): string {
  const f = contact.form;
  const chip = (name: string, value: string, type: 'checkbox' | 'radio') =>
    `<label class="chip"><input type="${type}" name="${name}" value="${esc(value)}"><span>${esc(value)}</span></label>`;
  return `
<section class="section contact" id="contact" ${gl({ s: 7, x: 0, o: 1 })} data-hud="${esc(t(contact.label, lang))}">
  ${label(idx, t(contact.label, lang), lang)}
  ${heading(t(contact.title, lang), 'h2', 'contact-title')}
  <div class="contact-grid">
    <div class="contact-info" data-reveal>
      <p class="contact-text">${esc(t(contact.text, lang))}</p>
      <button class="email" type="button" data-copy-email="${esc(site.email)}" data-cursor="view" data-cursor-label="${esc(t(ui.copy, lang))}">
        <span class="email-addr" dir="ltr">${esc(site.email)}</span>
        <span class="email-ic">${icons.copy}<span class="sr-only">${esc(t(ui.copy, lang))}</span></span>
      </button>
      <ul class="socials" aria-label="${esc(t(ui.socials, lang))}">
        ${site.socials.map((s) => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener" data-scramble><span class="nav-t" data-text="${esc(s.label)}">${esc(s.label)}</span>${icons.arrowOut}</a></li>`).join('')}
      </ul>
      <div class="contact-meta">
        <p><span>${esc(t(ui.localTime, lang))}</span><time data-clock>--:--</time></p>
        <p><span>${esc(t(site.location, lang))}</span>${site.available ? `<span class="status"><span class="status-dot" aria-hidden="true"></span>${esc(t(site.availability, lang))}</span>` : ''}</p>
      </div>
    </div>
    <form class="brief" data-brief data-reveal novalidate>
      <p class="brief-title">${esc(t(f.title, lang))}</p>
      <label class="field"><span class="field-label">${esc(t(f.name, lang))}</span><input name="name" type="text" autocomplete="name" required></label>
      <fieldset class="field"><legend class="field-label">${esc(t(f.need, lang))}</legend><div class="chips">${f.needs.map((n) => chip('need', t(n, lang), 'checkbox')).join('')}</div></fieldset>
      <fieldset class="field"><legend class="field-label">${esc(t(f.budget, lang))}</legend><div class="chips">${f.budgets.map((b) => chip('budget', t(b, lang), 'radio')).join('')}</div></fieldset>
      <label class="field"><span class="field-label">${esc(t(f.message, lang))}</span><textarea name="message" rows="4"></textarea></label>
      <div class="brief-foot">
        <button class="btn btn--primary" type="submit" data-magnetic><span class="btn-t">${esc(t(f.submit, lang))}</span><span class="btn-ic">${icons.arrow}</span></button>
        <p class="brief-note">${esc(t(f.note, lang))}</p>
      </div>
    </form>
  </div>
</section>`;
}

function footer(lang: Lang, o: RenderOptions): string {
  const mark = lang === 'fa' ? `<span class="ch ch--word">${esc(t(site.name, lang))}</span>` : chars(t(site.name, lang).toUpperCase());
  return `
<footer class="footer">
  <div class="footer-top">
    <a class="round-btn round-btn--lg" href="#top" data-magnetic aria-label="${esc(t(ui.backTop, lang))}">${icons.arrowUp}</a>
    <ul class="footer-links">${site.socials.map((s) => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)}</a></li>`).join('')}</ul>
  </div>
  <p class="footer-mark" aria-hidden="true" data-footer-mark>${mark}</p>
  <div class="footer-bottom">
    <p>© ${num(o.year, lang)} ${esc(t(site.name, lang))}. ${esc(t(ui.rights, lang))}</p>
    <p>${esc(t(ui.madeIn, lang))}</p>
    <p><a class="footer-versions" href="../?choose" data-cursor="hover">${esc(t(ui.versions, lang))} ↗</a></p>
  </div>
</footer>`;
}

/* ───────────────────────────── Page ───────────────────────────── */

export function renderApp(lang: Lang, o: RenderOptions): string {
  let i = 0;
  const next = () => ++i;
  const body = [
    heroSection(lang, o),
    aboutSection(lang, next()),
    servicesSection(lang, next()),
    workSection(lang, next(), o),
    processSection(lang, next()),
    journeySection(lang, next(), o),
  ];
  const hasQuotes = testimonials.items.some((q) => o.dev || !q.sample);
  if (hasQuotes) body.push(quotesSection(lang, next(), o));
  body.push(faqSection(lang, next()), contactSection(lang, next()));

  return `${header(lang)}
<main id="main">${body.join('')}</main>
${footer(lang, o)}
<div class="hud" aria-hidden="true"><span class="hud-sec"><span class="hud-dot"></span><span data-hud-label>${esc(t(hero.eyebrow, lang))}</span></span><span class="hud-pct" dir="ltr" data-hud-pct>000%</span></div>
<div class="toast" role="status" aria-live="polite" data-toast></div>
<dialog class="case" id="case" data-case-dialog data-lenis-prevent aria-labelledby="case-title"></dialog>`;
}

export function renderCase(p: Project, lang: Lang, nextP: Project, o: RenderOptions): string {
  const meta: [string, string][] = [
    [t(ui.client, lang), t(p.client, lang)],
    [t(ui.year, lang), num(p.year, lang)],
    [t(ui.role, lang), t(p.role, lang)],
  ];
  return `
<div class="case-inner">
  <div class="case-top">
    <p class="case-kicker">${esc(t(ui.caseStudy, lang))} — ${esc(t(p.category, lang))}</p>
    <button class="round-btn" type="button" data-case-close aria-label="${esc(t(ui.close, lang))}" autofocus>${icons.close}</button>
  </div>
  <h2 class="case-title" id="case-title">${esc(t(p.title, lang))}${sampleBadge(p.sample, lang, o.dev)}</h2>
  <p class="case-summary">${esc(t(p.summary, lang))}</p>
  <div class="case-cover" data-case-cover>${projectArt(p, lang, true)}</div>
  <dl class="case-meta">${meta.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}
    <div><dt>${esc(t(ui.stack, lang))}</dt><dd><ul class="tags">${p.stack.map((s) => `<li>${esc(s)}</li>`).join('')}</ul></dd></div>
  </dl>
  <div class="case-story">
    <section><h3>${esc(t(ui.challenge, lang))}</h3><p>${esc(t(p.challenge, lang))}</p></section>
    <section><h3>${esc(t(ui.solution, lang))}</h3><p>${esc(t(p.solution, lang))}</p></section>
  </div>
  <section class="case-results"><h3>${esc(t(ui.results, lang))}</h3>
    <ul>${p.results.map((r) => `<li><strong>${esc(t(r.value, lang))}</strong><span>${esc(t(r.label, lang))}</span></li>`).join('')}</ul>
  </section>
  <div class="case-foot">
    ${p.link ? `<a class="btn btn--primary" href="${esc(p.link)}" target="_blank" rel="noopener"><span class="btn-t">${esc(t(ui.visit, lang))}</span><span class="btn-ic">${icons.arrowOut}</span></a>` : ''}
    <button class="case-next" type="button" data-case-next="${nextP.slug}">
      <span>${esc(t(ui.next, lang))}</span><strong>${esc(t(nextP.title, lang))}</strong><span class="btn-ic">${icons.arrow}</span>
    </button>
  </div>
</div>`;
}

export function renderPreloader(lang: Lang, year: number): string {
  const name = t(site.name, lang);
  const visual = lang === 'fa' ? `<span class="ch ch--word">${esc(name)}</span>` : chars(name.toUpperCase());
  return `
<div class="preloader" data-preloader aria-hidden="true">
  <div class="pl-row"><span>${esc(site.monogram)}©</span><span>${esc(t(hero.eyebrow, lang))} ${num(year, lang)}</span></div>
  <p class="pl-name">${visual}</p>
  <div class="pl-row pl-row--bottom">
    <span class="pl-status">${esc(t(ui.loading, lang))}</span>
    <span class="pl-count" dir="ltr"><span data-pl-count>${num('000', lang)}</span></span>
  </div>
  <div class="pl-bar"><i data-pl-bar></i></div>
</div>`;
}

export function renderHead(lang: Lang): { title: string; description: string; jsonLd: string } {
  const title = `${t(site.name, lang)} — ${t(site.role, lang)}`;
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name.en,
    alternateName: site.name.fa,
    jobTitle: plain(site.role.en),
    url: site.url,
    email: `mailto:${site.email}`,
    address: { '@type': 'PostalAddress', addressLocality: site.city, addressCountry: 'IR' },
    sameAs: site.socials.map((s) => s.url),
    knowsAbout: tools.rows.flat(),
  });
  return { title, description: t(site.description, lang), jsonLd };
}

/** Lists every placeholder item still flagged `sample: true`. */
export function listSamples(): string[] {
  const out: string[] = [];
  work.projects.forEach((p) => p.sample && out.push(`work.projects → ${p.title.en}`));
  journey.items.forEach((j) => j.sample && out.push(`journey.items → ${j.title.en}`));
  testimonials.items.forEach((q) => q.sample && out.push(`testimonials.items → ${q.role.en} (hidden in production)`));
  return out;
}
