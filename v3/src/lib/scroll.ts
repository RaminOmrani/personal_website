import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

/** Smooth wheel scrolling (desktop), kept in lock-step with ScrollTrigger. Null when motion is reduced. */
export let lenis: Lenis | null = null;

export function startScroll(reduced: boolean) {
  if (reduced || lenis) return () => {};
  lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 0.9, anchors: false });
  lenis.on('scroll', ScrollTrigger.update);
  const tick = (time: number) => lenis?.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return () => {
    gsap.ticker.remove(tick);
    lenis?.destroy();
    lenis = null;
  };
}

/** Scroll to an element or to the top; instant when motion is reduced. */
export function scrollToTarget(target: string | HTMLElement | number, offset = -88) {
  const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
  if (el == null) return;
  if (lenis) lenis.scrollTo(el, { offset, duration: 1.4 });
  else if (typeof el === 'number') window.scrollTo({ top: el });
  else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset });
}

/** Freeze page scrolling while a full-screen layer is open. */
export function lockScroll(locked: boolean) {
  document.documentElement.classList.toggle('is-locked', locked);
  if (locked) lenis?.stop();
  else lenis?.start();
}

export { gsap, ScrollTrigger };
