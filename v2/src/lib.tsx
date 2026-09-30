import { Fragment, useEffect, useState, type RefObject } from 'react';

/** Renders text where `{words}` get the yellow highlighter. */
export function Marked({ text }: { text: string }) {
  const parts = text.split(/(\{[^}]+\})/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith('{') ? (
          <mark className="marker" key={i}>
            {p.slice(1, -1)}
          </mark>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        ),
      )}
    </>
  );
}

/**
 * Marks `[data-reveal]` elements with `data-in` the first time they scroll into view.
 * The motion itself is plain CSS (transform + opacity), so it stays smooth while the page is busy.
 */
export function useRevealOnScroll(deps: unknown[] = []) {
  useEffect(() => {
    const els = [...document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-in])')];
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.setAttribute('data-in', ''));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.setAttribute('data-in', '');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -12% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/** True once the element has entered the viewport (fires once). */
export function useInViewOnce(ref: RefObject<Element | null>, margin = '0px 0px -15% 0px') {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, margin, inView]);
  return inView;
}

/** Live visibility of an element (true while on screen). */
export function useOnScreen(ref: RefObject<Element | null>, margin = '0px') {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { rootMargin: margin });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, margin]);
  return on;
}

/** Media query as state. Always false during server rendering. */
export function useMedia(query: string) {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    const mq = matchMedia(query);
    const update = () => setMatch(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [query]);
  return match;
}

/** Copies text; falls back to selecting it when the clipboard is blocked. */
export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
