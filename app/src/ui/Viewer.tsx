import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent } from 'react';
import type { Screen } from '../../../v3/src/data/projects';
import { digits, useLang } from '../../../v3/src/i18n';
import { useCopy } from '../../../v3/src/data/copy';
import { useAppCopy } from '../copy';
import { prefersReducedMotion } from '../lib/hooks';
import { Icon } from './Icon';

/**
 * Full-screen pictures: swipe sideways between them (native scroll snapping), drag down to close.
 * Closing goes through `onClose` (history.back), so Android's back button closes it as well.
 */
export function Viewer({ screens, start, open, onClose, onIndex }: { screens: Screen[]; start: number; open: boolean; onClose: () => void; onIndex?: (i: number) => void }) {
  const lang = useLang();
  const t = useAppCopy();
  const { caseStudy } = useCopy();
  const [mounted, setMounted] = useState(open);
  const [index, setIndex] = useState(start);
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  if (open && !mounted) setMounted(true);

  useLayoutEffect(() => {
    const el = root.current;
    if (!mounted || !el) return;
    if (open) {
      returnFocus.current = document.activeElement as HTMLElement | null;
      setIndex(start);
      const tr = track.current;
      if (tr) tr.scrollLeft = (getComputedStyle(tr).direction === 'rtl' ? -1 : 1) * start * tr.clientWidth;
      el.dataset.state = 'open';
      closeBtn.current?.focus({ preventScroll: true });
      return;
    }
    el.dataset.state = 'closed';
    const done = window.setTimeout(() => setMounted(false), prefersReducedMotion() ? 120 : 220);
    returnFocus.current?.focus?.({ preventScroll: true });
    return () => window.clearTimeout(done);
  }, [open, mounted]);

  const go = (i: number) => {
    const tr = track.current;
    if (!tr) return;
    const left = (getComputedStyle(tr).direction === 'rtl' ? -1 : 1) * i * tr.clientWidth;
    tr.scrollTo({ left, behavior: prefersReducedMotion() ? 'instant' : 'smooth' });
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      const fwd = lang === 'fa' ? 'ArrowLeft' : 'ArrowRight';
      const bwd = lang === 'fa' ? 'ArrowRight' : 'ArrowLeft';
      if (e.key === fwd) go(Math.min(screens.length - 1, index + 1));
      if (e.key === bwd) go(Math.max(0, index - 1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  // which picture is showing (scrollLeft runs negative in right-to-left)
  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    const i = Math.round(Math.abs(el.scrollLeft) / el.clientWidth);
    if (i !== index && i >= 0 && i < screens.length) {
      setIndex(i);
      onIndex?.(i);
    }
  };

  // drag down to close: the picture follows the finger, the black fades with the distance
  const drag = useRef<{ id: number; x0: number; y0: number; dy: number; on: boolean; t0: number } | null>(null);
  const figureAt = (i: number) => track.current?.children[i]?.querySelector('figure') as HTMLElement | null;
  const onDown = (e: PointerEvent) => {
    if (e.pointerType === 'mouse') return;
    drag.current = { id: e.pointerId, x0: e.clientX, y0: e.clientY, dy: 0, on: false, t0: e.timeStamp };
  };
  const onMove = (e: PointerEvent) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.x0;
    d.dy = e.clientY - d.y0;
    if (!d.on) {
      if (Math.abs(d.dy) < 10 || Math.abs(d.dy) < Math.abs(dx)) return;
      d.on = true;
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    }
    const f = figureAt(index);
    const y = Math.max(0, d.dy);
    if (f) {
      f.style.transition = 'none';
      f.style.transform = `translateY(${y}px) scale(${1 - Math.min(0.12, y / 2400)})`;
    }
    root.current?.style.setProperty('--dim', String(Math.max(0.25, 1 - y / 500)));
  };
  const onUp = (e: PointerEvent) => {
    const d = drag.current;
    drag.current = null;
    if (!d || !d.on) return;
    const v = d.dy / Math.max(1, e.timeStamp - d.t0);
    const f = figureAt(index);
    if (e.type !== 'pointercancel' && (d.dy > 110 || (v > 0.6 && d.dy > 40))) {
      onClose();
      return;
    }
    if (f) {
      f.style.transition = 'transform 320ms var(--ease-drawer)';
      f.style.transform = '';
    }
    root.current?.style.setProperty('--dim', '1');
  };

  if (!mounted) return null;
  const s = screens[index] ?? screens[0];
  return (
    <div className="viewer" ref={root} role="dialog" aria-modal="true" aria-label={t.project.gallery} data-state="closed">
      <div className="viewer-top">
        <span className="viewer-count" aria-live="polite">
          {t.project.of(digits(index + 1, lang), digits(screens.length, lang))}
        </span>
        <button type="button" className="viewer-close" ref={closeBtn} onClick={onClose} aria-label={t.settings.close}>
          <Icon name="close" size={22} />
        </button>
      </div>
      <div className="viewer-track" ref={track} onScroll={onScroll} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}>
        {screens.map((sc, i) => (
          <div className="viewer-slide" key={sc.src}>
            <figure className={`viewer-figure viewer-figure--${sc.device}`}>
              <img src={sc.src} alt={sc.caption} loading={Math.abs(i - start) <= 1 ? 'eager' : 'lazy'} decoding="async" draggable={false} />
            </figure>
          </div>
        ))}
      </div>
      <div className="viewer-bottom">
        <p className="viewer-caption">{s?.caption}</p>
        <div className="viewer-nav">
          <button type="button" className="viewer-arrow" onClick={() => go(index - 1)} disabled={index === 0} aria-label={caseStudy.prev}>
            <Icon name="chevron" className="flip" size={22} />
          </button>
          <span className="viewer-hint">{t.project.swipe}</span>
          <button type="button" className="viewer-arrow" onClick={() => go(index + 1)} disabled={index === screens.length - 1} aria-label={caseStudy.nextShot}>
            <Icon name="chevron" size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}
