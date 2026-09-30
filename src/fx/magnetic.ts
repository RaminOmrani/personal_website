import gsap from 'gsap';

/** Elements with [data-magnetic] are gently pulled toward the pointer. */
export function initMagnetic(root: ParentNode, signal: AbortSignal): void {
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  root.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    const xTo = gsap.quickTo(el, 'x', { duration: 0.8, ease: 'elastic.out(1, 0.35)' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.8, ease: 'elastic.out(1, 0.35)' });
    const strength = Number(el.dataset.magnetic) || 0.32;
    el.addEventListener(
      'pointermove',
      (e) => {
        const r = el.getBoundingClientRect();
        const tx = Number(gsap.getProperty(el, 'x')) || 0;
        const ty = Number(gsap.getProperty(el, 'y')) || 0;
        xTo((e.clientX - (r.left - tx + r.width / 2)) * strength);
        yTo((e.clientY - (r.top - ty + r.height / 2)) * strength);
      },
      { signal },
    );
    el.addEventListener(
      'pointerleave',
      () => {
        xTo(0);
        yTo(0);
      },
      { signal },
    );
  });
}
