import '@fontsource-variable/vazirmatn';
import '@fontsource-variable/unbounded';
import '@fontsource-variable/inter-tight';
import '@fontsource-variable/jetbrains-mono';
import '@fontsource/instrument-serif/400.css';
import '@fontsource/instrument-serif/400-italic.css';
import 'lenis/dist/lenis.css';
import './styles/main.css';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { site, type Lang } from './content';
import { Ambient } from './fx/audio';
import { initCursor } from './fx/cursor';
import type { Stage } from './gl/stage';
import { buildHeroIntro, initPage, scrollToTarget, type PageEnv } from './page';
import { runPreloader } from './preloader';
import { renderApp, renderHead, renderPreloader, type RenderOptions } from './render';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

const root = document.documentElement;
const app = document.getElementById('app')!;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const renderOptions: RenderOptions = {
  // VITE_SHOW_SAMPLES=1 builds a shareable preview that labels placeholder content
  dev: import.meta.env.DEV || import.meta.env.VITE_SHOW_SAMPLES === '1',
  year: new Date().getFullYear(),
};

/* ───────────── Language ───────────── */

const isLang = (v: unknown): v is Lang => v === 'fa' || v === 'en';

function detectLang(): Lang {
  const param = new URLSearchParams(location.search).get('lang');
  if (isLang(param)) return param;
  try {
    const saved = localStorage.getItem('ro:lang');
    if (isLang(saved)) return saved;
  } catch {
    /* storage blocked */
  }
  return site.defaultLang;
}

function applyLang(lang: Lang): void {
  root.lang = lang;
  root.dir = lang === 'fa' ? 'rtl' : 'ltr';
  const head = renderHead(lang);
  document.title = head.title;
  document.querySelector('meta[name="description"]')?.setAttribute('content', head.description);
  const skip = document.querySelector('.skip-link');
  if (skip) skip.textContent = lang === 'fa' ? 'رفتن به محتوای اصلی' : 'Skip to content';
  try {
    localStorage.setItem('ro:lang', lang);
  } catch {
    /* storage blocked */
  }
}

let lang = detectLang();
const prerendered = root.lang;
applyLang(lang);
if (lang !== prerendered) {
  document.querySelector('[data-preloader]')?.insertAdjacentHTML('afterend', renderPreloader(lang, renderOptions.year));
  document.querySelector('[data-preloader]')?.remove();
}
if (lang !== prerendered || import.meta.env.DEV) app.innerHTML = renderApp(lang, renderOptions);

/* ───────────── Smooth scroll, WebGL, sound ───────────── */

let lenis: Lenis | null = null;
if (!reduced) {
  lenis = new Lenis({ lerp: 0.085, smoothWheel: true, wheelMultiplier: 0.95 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  lenis.stop();
}

let stage: Stage | null = null;

/** Three.js is loaded lazily so the preloader can start animating right away. */
async function loadStage(): Promise<void> {
  const canvas = document.querySelector<HTMLCanvasElement>('[data-gl-canvas]');
  try {
    const { createStage } = await import('./gl/stage');
    stage = canvas ? createStage(canvas, reduced) : null;
  } catch {
    stage = null;
  }
  if (!stage) {
    root.classList.add('no-webgl');
    return;
  }
  const s = stage;
  s.setDirection(root.dir as 'ltr' | 'rtl');
  gsap.ticker.add(s.tick);
  window.addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType === 'mouse') s.pointer(e.clientX, e.clientY);
    },
    { passive: true },
  );
  root.addEventListener('pointerleave', () => s.pointerLeave());
  let resizeTimer = 0;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => s.resize(), 120);
  });
  await s.ready;
}

const audio = new Ambient();
initCursor();

/* ───────────── Page lifecycle ───────────── */

const env = (): PageEnv => ({ lang, lenis, stage, audio, reduced, render: renderOptions, onLangToggle: switchLang });
let cleanup: (() => void) | null = null;
let initializedWithStage = false;

function startPage(): void {
  if (cleanup && (initializedWithStage || !stage)) return;
  cleanup?.();
  cleanup = initPage(env());
  initializedWithStage = !!stage;
}

type VTDocument = Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void>; finished: Promise<void> } };

/** Re-renders the page in the other language with a circular reveal from the click point. */
async function switchLang(e: MouseEvent): Promise<void> {
  const next: Lang = lang === 'fa' ? 'en' : 'fa';
  const x = e.clientX || innerWidth / 2;
  const y = e.clientY || 40;

  // remember where we are so the same section stays on screen
  const sections = [...document.querySelectorAll<HTMLElement>('main > section')];
  const current = sections.find((s) => s.getBoundingClientRect().bottom > innerHeight * 0.3);
  const offset = current ? current.getBoundingClientRect().top : 0;

  const apply = () => {
    cleanup?.();
    lang = next;
    applyLang(next);
    app.innerHTML = renderApp(next, renderOptions);
    stage?.setDirection(root.dir as 'ltr' | 'rtl');
    cleanup = initPage(env());
    initializedWithStage = !!stage;
    const again = current?.id ? document.getElementById(current.id) : null;
    if (again) {
      const top = again.getBoundingClientRect().top + window.scrollY - offset;
      if (lenis) lenis.scrollTo(top, { immediate: true, force: true });
      else window.scrollTo(0, top);
    }
    ScrollTrigger.refresh();
    (document.querySelector('[data-lang-toggle]') as HTMLElement | null)?.focus({ preventScroll: true });
  };

  const doc = document as VTDocument;
  if (!doc.startViewTransition || reduced) {
    apply();
    return;
  }
  root.dataset.vt = 'lang';
  const vt = doc.startViewTransition(apply);
  await vt.ready;
  const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  root.animate(
    { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
    { duration: 900, easing: 'cubic-bezier(.76,0,.24,1)', pseudoElement: '::view-transition-new(root)' },
  );
  await vt.finished.catch(() => undefined);
  delete root.dataset.vt;
}

/* ───────────── Boot ───────────── */

async function boot(): Promise<void> {
  window.scrollTo(0, 0);
  const intro = reduced ? null : buildHeroIntro();
  const stageLoaded = loadStage();
  // if WebGL arrives late (slow network), re-bind the scroll scenes once it does
  stageLoaded.then(() => cleanup && startPage());
  const ready = Promise.all([document.fonts.ready, stageLoaded]).then(startPage);
  const returning = root.classList.contains('is-return');

  await runPreloader({
    lang,
    reduced,
    ready,
    returning,
    onReveal: () => {
      stage?.intro(0.05);
      intro?.play();
    },
  });

  startPage();
  lenis?.start();
  ScrollTrigger.refresh();
  try {
    sessionStorage.setItem('ro:visited', '1');
  } catch {
    /* storage blocked */
  }

  const hash = location.hash;
  if (hash && !hash.startsWith('#case/')) {
    const target = document.querySelector<HTMLElement>(hash);
    if (target) scrollToTarget(env(), target);
  }
  window.dispatchEvent(new Event('ro:ready'));
}

boot();
