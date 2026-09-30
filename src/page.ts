import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type Lenis from 'lenis';
import { contact, site, ui, work, type Lang } from './content';
import type { Ambient } from './fx/audio';
import { initMagnetic } from './fx/magnetic';
import { initMarquees } from './fx/marquee';
import { initScramble, scramble } from './fx/scramble';
import type { SceneState, Stage } from './gl/stage';
import { renderCase, type RenderOptions } from './render';
import { num, pad, t } from './text';

export interface PageEnv {
  lang: Lang;
  lenis: Lenis | null;
  stage: Stage | null;
  audio: Ambient;
  reduced: boolean;
  render: RenderOptions;
  onLangToggle: (e: MouseEvent) => void;
}

const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector<T>(sel);
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => [...root.querySelectorAll<T>(sel)];
const finePointer = () => matchMedia('(hover: hover) and (pointer: fine)').matches;
const expoOut = (x: number) => (x === 1 ? 1 : 1 - Math.pow(2, -10 * x));

export function scrollToTarget(env: PageEnv, target: HTMLElement | number): void {
  if (env.lenis) {
    env.lenis.scrollTo(target, { duration: 1.8, easing: expoOut });
  } else if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: env.reduced ? 'auto' : 'smooth' });
  } else {
    target.scrollIntoView({ behavior: env.reduced ? 'auto' : 'smooth' });
  }
}

let toastTimer = 0;
export function toast(text: string): void {
  const el = $('[data-toast]');
  if (!el) return;
  el.textContent = text;
  el.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => el.classList.remove('is-visible'), 2400);
}

/** Hero entrance, played when the preloader curtain lifts. Builds (and applies the hidden state) immediately. */
export function buildHeroIntro(): gsap.core.Timeline {
  const tl = gsap.timeline({ paused: true });
  tl.fromTo($$('.hero-line .ch'), { yPercent: 118, rotate: 5 }, { yPercent: 0, rotate: 0, duration: 1.6, stagger: 0.055, ease: 'expo.out' }, 0)
    .fromTo($$('.hero-statement .w-i'), { yPercent: 118 }, { yPercent: 0, duration: 1.3, stagger: 0.03, ease: 'expo.out' }, 0.45)
    .fromTo($$('[data-hero-fade]'), { y: 28, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.2, stagger: 0.07, ease: 'expo.out' }, 0.65)
    .fromTo('[data-header]', { yPercent: -130, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1.3, ease: 'expo.out', clearProps: 'transform' }, 0.75);
  return tl;
}

/* ───────────────────────────── Scroll choreography ───────────────────────────── */

function setupScenes(env: PageEnv): void {
  const stage = env.stage;
  if (!stage) return;
  $$('[data-gl]').forEach((sec) => {
    const cfg = JSON.parse(sec.dataset.gl ?? '{"s":0}') as SceneState;
    ScrollTrigger.create({
      trigger: sec,
      start: 'top 55%',
      end: 'bottom 55%',
      onToggle: (self) => self.isActive && stage.goTo(cfg),
    });
  });
}

function setupHud(env: PageEnv): void {
  const label = $('[data-hud-label]');
  if (!label) return;
  ScrollTrigger.create({ trigger: '.footer', start: 'top bottom', toggleClass: { targets: '.hud', className: 'is-hidden' } });
  $$('[data-hud]').forEach((sec, i) => {
    ScrollTrigger.create({
      trigger: sec,
      start: 'top 50%',
      end: 'bottom 50%',
      onToggle: (self) => {
        if (self.isActive) scramble(label, `${i ? `(${pad(i, env.lang)}) ` : ''}${sec.dataset.hud ?? ''}`);
      },
    });
  });
}

function setupReveals(): void {
  const items = $$('[data-reveal]');
  gsap.set(items, { autoAlpha: 0, y: 44 });
  ScrollTrigger.batch(items, {
    start: 'top 90%',
    once: true,
    onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 1.3, stagger: 0.09, ease: 'expo.out', overwrite: true }),
  });
  $$('[data-split]').forEach((h) => {
    gsap.fromTo(
      $$('.w-i', h),
      { yPercent: 118, rotate: 4 },
      {
        yPercent: 0,
        rotate: 0,
        duration: 1.4,
        stagger: 0.06,
        ease: 'expo.out',
        scrollTrigger: { trigger: h, start: 'top 88%', once: true },
      },
    );
  });
}

function setupHeroScroll(rtl: boolean): void {
  const hero = $('.hero');
  if (!hero) return;
  const s = rtl ? -1 : 1;
  const st = { trigger: hero, start: 'top top', end: 'bottom top', scrub: true };
  gsap.to('.hero-line--1 .hero-line-i', { xPercent: -14 * s, ease: 'none', scrollTrigger: st });
  gsap.to('.hero-line--2 .hero-line-i', { xPercent: 14 * s, ease: 'none', scrollTrigger: st });
  gsap.to(['.hero-meta', '.hero-statement', '.hero-bottom'], {
    autoAlpha: 0,
    y: -80,
    ease: 'none',
    scrollTrigger: { trigger: hero, start: 'top top', end: '70% top', scrub: true },
  });
}

function setupManifesto(): void {
  const el = $('[data-manifesto]');
  if (!el) return;
  gsap.fromTo(
    $$('.w', el),
    { opacity: 0.13 },
    { opacity: 1, ease: 'none', stagger: 0.1, scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 42%', scrub: 0.6 } },
  );
}

function setupStats(env: PageEnv): void {
  if (env.reduced) return;
  $$('[data-count]').forEach((el) => {
    const end = Number(el.dataset.count) || 0;
    const o = { v: 0 };
    el.textContent = num(0, env.lang);
    gsap.to(o, {
      v: end,
      duration: 2.4,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      onUpdate: () => {
        el.textContent = num(Math.round(o.v), env.lang);
      },
    });
  });
}

function setupServices(): void {
  const items = $$('.svc');
  items.forEach((li, i) => {
    const next = items[i + 1];
    const card = $('.svc-card', li);
    if (!next || !card) return;
    gsap.to(card, {
      scale: 0.9,
      rotationX: 8,
      transformOrigin: '50% 0%',
      transformPerspective: 1400,
      '--dim': 0.7,
      ease: 'none',
      scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 25%', scrub: true },
    });
  });
}

function setupWork(env: PageEnv, mm: gsap.MatchMedia): void {
  const pin = $('[data-work-pin]');
  const track = $('[data-work-track]');
  const bar = $('[data-work-progress]');
  if (!pin || !track) return;
  const rtl = env.lang === 'fa';
  mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
    const distance = () => Math.max(0, track.scrollWidth - document.documentElement.clientWidth);
    gsap.to(track, {
      x: () => (rtl ? 1 : -1) * distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: pin,
        start: 'top top',
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 0.9,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: (self) => bar && gsap.set(bar, { scaleX: self.progress }),
      },
    });
  });
}

function setupProcess(): void {
  const steps = $('.steps');
  if (!steps) return;
  gsap.fromTo(
    '[data-process-line]',
    { scaleY: 0 },
    { scaleY: 1, ease: 'none', scrollTrigger: { trigger: steps, start: 'top 60%', end: 'bottom 60%', scrub: true } },
  );
  $$('.step').forEach((step) => {
    ScrollTrigger.create({ trigger: step, start: 'top 62%', end: 'bottom 38%', toggleClass: 'is-active' });
  });
}

function setupFooter(): void {
  const chars = $$('[data-footer-mark] .ch');
  if (!chars.length) return;
  gsap.fromTo(
    chars,
    { yPercent: 105 },
    { yPercent: 0, stagger: 0.035, ease: 'none', scrollTrigger: { trigger: '.footer', start: 'top 90%', end: 'bottom bottom', scrub: 0.6 } },
  );
}

function setupTilt(signal: AbortSignal, reduced: boolean): void {
  if (!finePointer() || reduced) return;
  const targets: [HTMLElement, number][] = [
    ...$$('[data-tilt]').map((el): [HTMLElement, number] => [el, 10]),
    ...$$('.project-media').map((el): [HTMLElement, number] => [el, 5]),
  ];
  for (const [el, amount] of targets) {
    gsap.set(el, { transformPerspective: 900 });
    const rx = gsap.quickTo(el, 'rotationX', { duration: 0.7, ease: 'power3' });
    const ry = gsap.quickTo(el, 'rotationY', { duration: 0.7, ease: 'power3' });
    el.addEventListener(
      'pointermove',
      (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ry(px * amount);
        rx(-py * amount);
        el.style.setProperty('--mx', `${(px + 0.5) * 100}%`);
        el.style.setProperty('--my', `${(py + 0.5) * 100}%`);
      },
      { signal },
    );
    el.addEventListener(
      'pointerleave',
      () => {
        rx(0);
        ry(0);
      },
      { signal },
    );
  }
}

/* ───────────────────────────── Chrome & interactions ───────────────────────────── */

function setupMenu(env: PageEnv, signal: AbortSignal) {
  const btn = $('[data-menu-toggle]');
  const menu = $('[data-menu]');
  let open = false;
  const rtl = env.lang === 'fa';
  const set = (value: boolean) => {
    if (!btn || !menu || value === open) return;
    open = value;
    btn.setAttribute('aria-expanded', String(value));
    document.documentElement.classList.toggle('menu-open', value);
    gsap.killTweensOf([menu, ...$$('.menu-bg, .menu-t, .menu-i, .menu-foot', menu)]);
    if (value) {
      menu.hidden = false;
      env.lenis?.stop();
      const origin = rtl ? '0% 0%' : '100% 0%';
      gsap.set(menu, { autoAlpha: 1 });
      gsap
        .timeline()
        .fromTo('.menu-bg', { clipPath: `circle(0% at ${origin})` }, { clipPath: `circle(150% at ${origin})`, duration: env.reduced ? 0 : 1.1, ease: 'expo.inOut' })
        .fromTo($$('.menu-t, .menu-i', menu), { yPercent: 120 }, { yPercent: 0, duration: 1, stagger: 0.05, ease: 'expo.out' }, env.reduced ? 0 : 0.4)
        .fromTo('.menu-foot', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.8 }, env.reduced ? 0 : 0.7);
      $('.menu-link', menu)?.focus({ preventScroll: true });
    } else {
      env.lenis?.start();
      gsap.to(menu, {
        autoAlpha: 0,
        duration: 0.45,
        onComplete: () => {
          menu.hidden = true;
        },
      });
      btn.focus({ preventScroll: true });
    }
  };
  btn?.addEventListener('click', () => set(!open), { signal });
  document.addEventListener('keydown', (e) => e.key === 'Escape' && set(false), { signal });
  return { close: () => set(false) };
}

function setupAnchors(env: PageEnv, signal: AbortSignal, closeMenu: () => void): void {
  document.addEventListener(
    'click',
    (e) => {
      const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a || e.defaultPrevented) return;
      const href = a.getAttribute('href') ?? '#';
      if (href.startsWith('#case/')) return;
      e.preventDefault();
      closeMenu();
      if (href === '#' || href === '#top') {
        scrollToTarget(env, 0);
        return;
      }
      const target = document.querySelector<HTMLElement>(href);
      if (!target) return;
      scrollToTarget(env, target);
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    },
    { signal },
  );
}

function setupTools(env: PageEnv, signal: AbortSignal, app: HTMLElement): void {
  $('[data-lang-toggle]')?.addEventListener('click', env.onLangToggle, { signal });

  const sound = $('[data-sound]');
  const sync = () => {
    if (!sound) return;
    sound.setAttribute('aria-pressed', String(env.audio.on));
    sound.setAttribute('aria-label', (env.audio.on ? sound.dataset.labelOn : sound.dataset.labelOff) ?? '');
    document.documentElement.classList.toggle('sound-on', env.audio.on);
  };
  sync();
  sound?.addEventListener(
    'click',
    async () => {
      await env.audio.toggle();
      sync();
    },
    { signal },
  );
  $$('a, button, summary, .chip', app).forEach((el, i) =>
    el.addEventListener('pointerenter', () => env.audio.blip(1 + (i % 5) * 0.06), { signal }),
  );
}

function setupQuotes(env: PageEnv, signal: AbortSignal, timers: number[]): void {
  const stage = $('[data-quotes]');
  if (!stage) return;
  const quotes = $$('[data-quote]', stage);
  const index = $('[data-quote-index]', stage);
  if (quotes.length < 2) {
    $('.quote-nav', stage)?.setAttribute('hidden', '');
    return;
  }
  let i = 0;
  let busy = false;
  let visible = false;
  let paused = false;
  const show = (n: number) => {
    const nextI = (n + quotes.length) % quotes.length;
    if (busy || nextI === i) return;
    const from = quotes[i];
    const to = quotes[nextI];
    i = nextI;
    from.classList.remove('is-active');
    from.setAttribute('aria-hidden', 'true');
    to.classList.add('is-active');
    to.setAttribute('aria-hidden', 'false');
    if (index) index.textContent = pad(i + 1, env.lang);
    if (env.reduced) return;
    busy = true;
    gsap
      .timeline({ onComplete: () => void (busy = false) })
      .fromTo(from, { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -30, duration: 0.45, ease: 'power2.in' })
      .fromTo(to, { autoAlpha: 0, y: 36 }, { autoAlpha: 1, y: 0, duration: 1, ease: 'expo.out' });
  };
  $('[data-quote-prev]', stage)?.addEventListener('click', () => show(i - 1), { signal });
  $('[data-quote-next]', stage)?.addEventListener('click', () => show(i + 1), { signal });
  stage.addEventListener('pointerenter', () => (paused = true), { signal });
  stage.addEventListener('pointerleave', () => (paused = false), { signal });
  stage.addEventListener('focusin', () => (paused = true), { signal });
  stage.addEventListener('focusout', () => (paused = false), { signal });
  const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
  io.observe(stage);
  signal.addEventListener('abort', () => io.disconnect());
  if (!env.reduced) timers.push(window.setInterval(() => visible && !paused && show(i + 1), 7000));
}

function setupContact(env: PageEnv, signal: AbortSignal): void {
  $('[data-copy-email]')?.addEventListener(
    'click',
    async () => {
      try {
        await navigator.clipboard.writeText(site.email);
        toast(t(ui.copied, env.lang));
      } catch {
        window.location.href = `mailto:${site.email}`;
      }
    },
    { signal },
  );

  const form = $<HTMLFormElement>('[data-brief]');
  form?.addEventListener(
    'submit',
    (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = String(data.get('name') ?? '').trim();
      const nameInput = form.elements.namedItem('name') as HTMLInputElement | null;
      if (!name) {
        nameInput?.setAttribute('aria-invalid', 'true');
        nameInput?.focus();
        return;
      }
      nameInput?.removeAttribute('aria-invalid');
      const f = contact.form;
      const L = env.lang;
      const body = [
        `${t(f.name, L)}: ${name}`,
        `${t(f.need, L)} ${data.getAll('need').join('، ') || '—'}`,
        `${t(f.budget, L)}: ${String(data.get('budget') ?? '—')}`,
        '',
        String(data.get('message') ?? ''),
      ].join('\n');
      const subject = `${t(f.subject, L)} — ${name}`;
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    },
    { signal },
  );
}

function setupClock(env: PageEnv, timers: number[]): void {
  const els = $$<HTMLTimeElement>('[data-clock]');
  if (!els.length) return;
  const fmt = new Intl.DateTimeFormat(env.lang === 'fa' ? 'fa-IR' : 'en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: site.timezone,
  });
  const tick = () => {
    const now = new Date();
    const text = fmt.format(now);
    for (const el of els) {
      el.textContent = text;
      el.dateTime = now.toISOString();
    }
  };
  tick();
  timers.push(window.setInterval(tick, 1000));
}

/* ───────────────────────────── Case studies ───────────────────────────── */

type ViewTransitionDoc = Document & { startViewTransition?: (cb: () => void) => { finished: Promise<void>; ready: Promise<void> } };

function setupCases(env: PageEnv, signal: AbortSignal): void {
  const dialog = $<HTMLDialogElement>('[data-case-dialog]');
  const cursor = $('[data-cursor-root]');
  if (!dialog) return;
  const doc = document as ViewTransitionDoc;
  const canTransition = typeof doc.startViewTransition === 'function' && !env.reduced;
  let source: HTMLElement | null = null;

  const mediaFor = (slug: string) => $(`[data-case="${slug}"] .project-media`);
  const inView = (el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    return r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth;
  };

  const fill = (slug: string): boolean => {
    const i = work.projects.findIndex((p) => p.slug === slug);
    if (i < 0) return false;
    const next = work.projects[(i + 1) % work.projects.length];
    dialog.innerHTML = renderCase(work.projects[i], env.lang, next, env.render);
    dialog.scrollTop = 0;
    return true;
  };

  const setName = (el: Element | null, name: string) => {
    if (el instanceof HTMLElement) el.style.viewTransitionName = name;
  };

  // bumps whenever a pending open must be cancelled (e.g. "back" pressed mid-transition)
  let token = 0;

  const show = (slug: string, media: HTMLElement | null, push: boolean) => {
    if (dialog.open || !fill(slug)) return;
    const mine = ++token;
    const reveal = () => {
      if (mine !== token) return;
      dialog.showModal();
      if (cursor) dialog.append(cursor);
      document.documentElement.classList.add('case-open');
      env.lenis?.stop();
    };
    if (canTransition && media && inView(media)) {
      setName(media, 'case-media');
      const vt = doc.startViewTransition!(() => {
        setName(media, '');
        reveal();
        setName($('[data-case-cover]', dialog), 'case-media');
      });
      vt.finished.finally(() => setName($('[data-case-cover]', dialog), ''));
    } else {
      reveal();
    }
    source = media;
    if (push) history.pushState({ case: slug }, '', `#case/${slug}`);
  };

  const hide = () => {
    token++;
    if (!dialog.open) return;
    const done = () => {
      dialog.close();
      if (cursor) document.body.insertBefore(cursor, document.getElementById('app'));
      document.documentElement.classList.remove('case-open');
      env.lenis?.start();
    };
    const media = source && inView(source) ? source : null;
    if (canTransition && media) {
      setName($('[data-case-cover]', dialog), 'case-media');
      const vt = doc.startViewTransition!(() => {
        setName($('[data-case-cover]', dialog), '');
        done();
        setName(media, 'case-media');
      });
      vt.finished.finally(() => setName(media, ''));
    } else {
      done();
    }
    source = null;
  };

  const requestClose = () => {
    if (history.state?.case) history.back();
    else {
      hide();
      if (location.hash.startsWith('#case/')) history.replaceState(null, '', location.pathname + location.search);
    }
  };

  document.addEventListener(
    'click',
    (e) => {
      const card = (e.target as Element).closest<HTMLAnchorElement>('a[data-case]');
      if (!card) return;
      e.preventDefault();
      show(card.dataset.case!, $('.project-media', card), true);
    },
    { signal },
  );

  dialog.addEventListener(
    'click',
    (e) => {
      const el = e.target as Element;
      if (el === dialog || el.closest('[data-case-close]')) {
        requestClose();
        return;
      }
      const next = el.closest<HTMLElement>('[data-case-next]');
      if (next) {
        const slug = next.dataset.caseNext!;
        fill(slug);
        source = mediaFor(slug);
        history.replaceState({ case: slug }, '', `#case/${slug}`);
        $<HTMLElement>('[data-case-close]', dialog)?.focus({ preventScroll: true });
        if (!env.reduced) gsap.from($('.case-inner', dialog), { opacity: 0, y: 60, duration: 0.9, ease: 'expo.out' });
      }
    },
    { signal },
  );
  dialog.addEventListener(
    'cancel',
    (e) => {
      e.preventDefault();
      requestClose();
    },
    { signal },
  );

  const fromHash = (push: boolean) => {
    const m = location.hash.match(/^#case\/([\w-]+)/);
    if (m) show(m[1], mediaFor(m[1]), push);
    else hide();
  };
  window.addEventListener('popstate', () => fromHash(false), { signal });
  window.addEventListener('ro:ready', () => location.hash.startsWith('#case/') && fromHash(false), { signal, once: true });
}

/* ───────────────────────────── Init ───────────────────────────── */

export function initPage(env: PageEnv): () => void {
  const app = document.getElementById('app')!;
  const ac = new AbortController();
  const { signal } = ac;
  const timers: number[] = [];
  const mm = gsap.matchMedia();
  const rtl = env.lang === 'fa';
  let feedMarquee: (v: number) => void = () => {};

  const ctx = gsap.context(() => {
    setupScenes(env);
    setupHud(env);
    setupStats(env);
    setupWork(env, mm);
    if (!env.reduced) {
      setupReveals();
      setupHeroScroll(rtl);
      setupManifesto();
      setupServices();
      setupProcess();
      setupFooter();
    }
    feedMarquee = initMarquees(app, env.reduced);
  }, app);

  const menu = setupMenu(env, signal);
  setupAnchors(env, signal, menu.close);
  setupTools(env, signal, app);
  setupQuotes(env, signal, timers);
  setupContact(env, signal);
  setupCases(env, signal);
  setupClock(env, timers);
  setupTilt(signal, env.reduced);
  initMagnetic(app, signal);
  initScramble(app, signal);

  // one scroll handler drives the header, HUD, marquees, card skew and particle turbulence
  const header = $('[data-header]');
  const pct = $('[data-hud-pct]');
  const cards = $$('.project');
  const wide = () => innerWidth >= 900;
  const skew = cards.length ? gsap.quickTo(cards, 'skewX', { duration: 0.6, ease: 'power3' }) : null;
  let skewReset = 0;
  let lastY = window.scrollY;
  const onScroll = (y: number, velocity: number, progress: number) => {
    if (pct) pct.textContent = `${num(String(Math.round(progress * 100)).padStart(3, '0'), env.lang)}%`;
    if (header) {
      header.classList.toggle('is-scrolled', y > 40);
      if (Math.abs(y - lastY) > 4 && !document.documentElement.classList.contains('menu-open')) {
        header.classList.toggle('is-hidden', y > 320 && y > lastY);
        lastY = y;
      }
    }
    env.stage?.velocity(velocity / 14);
    feedMarquee(velocity);
    if (skew && wide() && !env.reduced) {
      skew(gsap.utils.clamp(-7, 7, velocity * -0.22 * (rtl ? -1 : 1)));
      clearTimeout(skewReset);
      skewReset = window.setTimeout(() => skew(0), 140);
    }
  };

  let unsubscribe: () => void;
  if (env.lenis) {
    const lenis = env.lenis;
    unsubscribe = lenis.on('scroll', () => onScroll(lenis.scroll, lenis.velocity, lenis.progress));
  } else {
    let prev = window.scrollY;
    const handler = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - innerHeight;
      onScroll(y, y - prev, max > 0 ? y / max : 0);
      prev = y;
    };
    window.addEventListener('scroll', handler, { passive: true });
    unsubscribe = () => window.removeEventListener('scroll', handler);
  }

  ScrollTrigger.refresh();

  return () => {
    ac.abort();
    unsubscribe();
    timers.forEach((id) => clearInterval(id));
    clearTimeout(skewReset);
    mm.revert();
    ctx.revert();
  };
}
