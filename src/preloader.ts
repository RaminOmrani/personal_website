import gsap from 'gsap';
import type { Lang } from './content';
import { num } from './text';

interface PreloaderOptions {
  lang: Lang;
  reduced: boolean;
  /** Resolves when fonts + WebGL are ready. */
  ready: Promise<unknown>;
  /** Returning visitors in the same session get a shorter intro. */
  returning: boolean;
  /** Called the moment the curtain starts to lift. */
  onReveal: () => void;
}

const withTimeout = (p: Promise<unknown>, ms: number) => Promise.race([p, new Promise((r) => setTimeout(r, ms))]);

export async function runPreloader({ lang, reduced, ready, returning, onReveal }: PreloaderOptions): Promise<void> {
  const el = document.querySelector<HTMLElement>('[data-preloader]');
  if (!el) {
    onReveal();
    return;
  }
  const count = el.querySelector<HTMLElement>('[data-pl-count]');
  const bar = el.querySelector<HTMLElement>('[data-pl-bar]');
  const chars = el.querySelectorAll('.pl-name .ch');

  if (reduced) {
    gsap.set(chars, { yPercent: 0 });
    await withTimeout(ready, 2500);
    onReveal();
    await gsap.to(el, { autoAlpha: 0, duration: 0.4 });
    el.remove();
    return;
  }

  gsap.fromTo(chars, { yPercent: 120 }, { yPercent: 0, duration: 1.2, stagger: 0.045, ease: 'expo.out', delay: 0.1 });
  gsap.fromTo(el.querySelectorAll('.pl-row'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8, delay: 0.2 });

  const progress = { v: 0 };
  const draw = () => {
    if (count) count.textContent = num(String(Math.round(progress.v * 100)).padStart(3, '0'), lang);
    if (bar) bar.style.transform = `scaleX(${progress.v})`;
  };
  // run to 86% on a minimum duration, then finish once everything is ready
  await gsap.to(progress, { v: 0.86, duration: returning ? 0.8 : 2, ease: 'power2.inOut', onUpdate: draw });
  await withTimeout(ready, 6000);
  await gsap.to(progress, { v: 1, duration: 0.45, ease: 'power2.out', onUpdate: draw });

  await new Promise<void>((resolve) => {
    gsap
      .timeline({ onComplete: resolve })
      .to(chars, { yPercent: -120, duration: 0.7, stagger: 0.025, ease: 'power3.inOut' })
      .to(el.querySelectorAll('.pl-row, .pl-bar'), { autoAlpha: 0, duration: 0.4 }, 0)
      .call(onReveal, [], '-=0.15')
      .to(el, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.25, ease: 'expo.inOut' }, '-=0.3');
  });
  el.remove();
}
