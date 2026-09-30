import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent, type ReactNode } from 'react';
import { prefersReducedMotion } from '../lib/hooks';

/**
 * A bottom sheet. It rises from the bottom, follows the finger 1:1 when dragged, and is dismissed
 * by a drag past a third of its height or a quick flick down; otherwise it settles back.
 * Closing always goes through `onClose` (history.back), so Android's back button closes it too.
 */
export function Sheet({ open, onClose, labelledBy, children }: { open: boolean; onClose: () => void; labelledBy: string; children: ReactNode }) {
  const [mounted, setMounted] = useState(open);
  const panel = useRef<HTMLDivElement>(null);
  const scrim = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const justDragged = useRef(false);

  if (open && !mounted) setMounted(true);

  // enter from below / leave downwards, starting from wherever a drag left the panel
  useLayoutEffect(() => {
    const p = panel.current;
    const s = scrim.current;
    if (!mounted || !p || !s) return;
    const quick = prefersReducedMotion();
    if (open) {
      returnFocus.current = document.activeElement as HTMLElement | null;
      p.style.transition = 'none';
      p.style.transform = quick ? 'none' : 'translateY(100%)';
      p.style.opacity = quick ? '0' : '1';
      s.style.transition = 'none';
      s.style.opacity = '0';
      void p.offsetHeight;
      p.style.transition = quick ? 'opacity 160ms ease' : 'transform 420ms var(--ease-drawer)';
      p.style.transform = 'none';
      p.style.opacity = '1';
      s.style.transition = 'opacity 300ms ease';
      s.style.opacity = '1';
      p.focus({ preventScroll: true });
      return;
    }
    p.style.transition = quick ? 'opacity 140ms ease' : 'transform 260ms var(--ease-drawer)';
    if (quick) p.style.opacity = '0';
    else p.style.transform = 'translateY(100%)';
    s.style.transition = 'opacity 240ms ease';
    s.style.opacity = '0';
    const done = window.setTimeout(() => setMounted(false), quick ? 150 : 270);
    returnFocus.current?.focus?.({ preventScroll: true });
    return () => window.clearTimeout(done);
  }, [open, mounted]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  // drag to dismiss
  const drag = useRef<{ id: number; y0: number; dy: number; on: boolean; moved: boolean; samples: { y: number; t: number }[] } | null>(null);
  const onPointerDown = (e: PointerEvent) => {
    if (!open || (e.pointerType === 'mouse' && e.button !== 0)) return;
    drag.current = { id: e.pointerId, y0: e.clientY, dy: 0, on: false, moved: false, samples: [{ y: e.clientY, t: e.timeStamp }] };
  };
  const onPointerMove = (e: PointerEvent) => {
    const d = drag.current;
    const p = panel.current;
    if (!d || d.id !== e.pointerId || !p) return;
    d.dy = e.clientY - d.y0;
    if (!d.on) {
      if (Math.abs(d.dy) < 8) return;
      d.on = true;
      d.moved = true;
      p.setPointerCapture(e.pointerId);
      p.style.transition = 'none';
      if (scrim.current) scrim.current.style.transition = 'none';
    }
    d.samples.push({ y: e.clientY, t: e.timeStamp });
    if (d.samples.length > 5) d.samples.shift();
    const h = p.offsetHeight;
    // downwards 1:1; upwards it resists, like pulling against a spring
    const y = d.dy >= 0 ? d.dy : -((-d.dy * h * 0.55) / (h + 0.55 * -d.dy)) * 0.35;
    p.style.transform = `translateY(${y}px)`;
    if (scrim.current) scrim.current.style.opacity = String(Math.max(0, 1 - Math.max(0, y) / h));
  };
  const onPointerUp = (e: PointerEvent) => {
    const d = drag.current;
    const p = panel.current;
    drag.current = null;
    if (!d || !d.on || !p) return;
    justDragged.current = true;
    window.setTimeout(() => (justDragged.current = false), 0);
    const first = d.samples[0];
    const last = d.samples[d.samples.length - 1];
    const v = (last.y - first.y) / Math.max(1, last.t - first.t); // px per ms
    const h = p.offsetHeight;
    // project the flick forward (Apple's decay projection) and decide where it lands
    const projected = d.dy + v * (0.998 / (1 - 0.998));
    if (e.type !== 'pointercancel' && (d.dy > h * 0.33 || (v > 0.45 && projected > h * 0.5))) {
      onClose();
      return;
    }
    p.style.transition = 'transform 360ms var(--ease-drawer)';
    p.style.transform = 'none';
    if (scrim.current) {
      scrim.current.style.transition = 'opacity 240ms ease';
      scrim.current.style.opacity = '1';
    }
  };

  if (!mounted) return null;
  return (
    <div className="sheet-root">
      <div className="sheet-scrim" ref={scrim} onClick={onClose} aria-hidden="true" />
      <div
        className="sheet"
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClickCapture={(e) => {
          // a drag that ends over a button is not a tap on it
          if (justDragged.current) e.stopPropagation();
        }}
      >
        <span className="sheet-handle" aria-hidden="true" />
        {children}
      </div>
    </div>
  );
}
