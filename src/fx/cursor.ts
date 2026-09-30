import gsap from 'gsap';

const INTERACTIVE = 'a, button, summary, label, [data-cursor]';

/** Custom cursor: a precise dot plus a lagging ring that morphs over interactive elements. */
export function initCursor(): void {
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const root = document.querySelector<HTMLElement>('[data-cursor-root]');
  const ring = document.querySelector<HTMLElement>('[data-cursor-ring]');
  const dot = document.querySelector<HTMLElement>('[data-cursor-dot]');
  const label = document.querySelector<HTMLElement>('[data-cursor-label]');
  if (!root || !ring || !dot || !label) return;

  document.documentElement.classList.add('has-cursor');
  const dx = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3' });
  const dy = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3' });
  const rx = gsap.quickTo(ring, 'x', { duration: 0.55, ease: 'power3' });
  const ry = gsap.quickTo(ring, 'y', { duration: 0.55, ease: 'power3' });

  window.addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType !== 'mouse') return;
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
      root.classList.add('is-visible');
    },
    { passive: true },
  );
  document.documentElement.addEventListener('pointerleave', () => root.classList.remove('is-visible'));
  window.addEventListener('pointerdown', () => root.classList.add('is-down'));
  window.addEventListener('pointerup', () => root.classList.remove('is-down'));

  document.addEventListener('pointerover', (e) => {
    const target = (e.target as Element).closest<HTMLElement>(INTERACTIVE);
    const text = (e.target as Element).closest('input, textarea');
    root.classList.toggle('is-text', !!text);
    if (!target) {
      root.classList.remove('is-hover', 'is-view');
      return;
    }
    const mode = target.dataset.cursor;
    const custom = mode === 'view' && target.dataset.cursorLabel;
    root.classList.toggle('is-view', !!custom);
    root.classList.toggle('is-hover', !custom);
    if (custom) label.textContent = target.dataset.cursorLabel ?? '';
  });
}
