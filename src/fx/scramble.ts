const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=<>/';
const running = new WeakMap<HTMLElement, number>();
const PERSIAN = /[؀-ۿ]/;

/** "Decoding" text effect. Persian text is swapped directly — scrambling would break letter joining. */
export function scramble(el: HTMLElement, text: string, duration = 0.55): void {
  cancelAnimationFrame(running.get(el) ?? 0);
  if (PERSIAN.test(text) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = text;
    return;
  }
  const start = performance.now();
  const chars = [...text];
  const step = (now: number) => {
    const p = Math.min(1, (now - start) / (duration * 1000));
    const revealed = Math.floor(p * chars.length);
    el.textContent = chars
      .map((c, i) => (i < revealed || c === ' ' ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
      .join('');
    if (p < 1) running.set(el, requestAnimationFrame(step));
  };
  running.set(el, requestAnimationFrame(step));
}

export function initScramble(root: ParentNode, signal: AbortSignal): void {
  root.querySelectorAll<HTMLElement>('[data-scramble]').forEach((link) => {
    const target = link.querySelector<HTMLElement>('[data-text]');
    if (!target) return;
    link.addEventListener('pointerenter', () => scramble(target, target.dataset.text ?? ''), { signal });
  });
}
