import { StrictMode, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/vazirmatn';
import '@fontsource-variable/geist';
import '../styles.css';
import './prototypes.css';
import './picker.css';
import { App } from '../App';
import { HeroShowcase } from '../components/Hero';
import { HeroConversation } from './HeroConversation';
import { HeroEditorial } from './HeroEditorial';

/** Three directions for the first screen, shown one at a time inside the real page. */
const variants: { name: string; render: () => ReactNode }[] = [
  { name: 'ویترین', render: () => <HeroShowcase /> },
  { name: 'گفت‌وگو', render: () => <HeroConversation /> },
  { name: 'پوستر', render: () => <HeroEditorial /> },
];

function initial() {
  const v = parseInt(new URLSearchParams(location.search).get('v') ?? '', 10);
  return v >= 1 && v <= variants.length ? v - 1 : 0;
}

function Harness() {
  const [current, setCurrent] = useState(initial);
  const [mount, setMount] = useState(0); // bump to re-mount (replay)
  const [ready, setReady] = useState(false);
  const pickerRef = useRef<HTMLElement>(null);
  const highlightRef = useRef<HTMLSpanElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const moveHighlight = () => {
    const el = itemRefs.current[current];
    const hl = highlightRef.current;
    if (!el || !hl) return;
    hl.style.width = el.offsetWidth + 'px';
    hl.style.transform = `translateX(${el.offsetLeft}px)`;
  };

  useLayoutEffect(() => {
    moveHighlight();
    window.addEventListener('resize', moveHighlight);
    return () => window.removeEventListener('resize', moveHighlight);
  });

  useEffect(() => {
    // Enable the slide only after first paint, so load doesn't animate.
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setReady(true)));
    return () => cancelAnimationFrame(id);
  }, []);

  const setActive = (i: number) => {
    if (i < 0 || i >= variants.length) return;
    setCurrent(i);
    setMount((m) => m + 1);
    const url = new URL(location.href);
    url.searchParams.set('v', String(i + 1));
    try {
      history.replaceState(null, '', url);
    } catch {
      /* sandboxed preview */
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= variants.length) setActive(num - 1);
      else if (e.key === 'ArrowRight') setActive((current + 1) % variants.length);
      else if (e.key === 'ArrowLeft') setActive((current - 1 + variants.length) % variants.length);
      else if (e.key === 'r' || e.key === 'R') setMount((m) => m + 1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  });

  return (
    <>
      {/* keyed re-mount, so entrance animations run again on every switch */}
      <App key={mount} hero={variants[current].render()} />
      {/* the picker is left-to-right chrome; the wrapper keeps its order stable on this RTL page */}
      <div dir="ltr">
        <nav className="proto-picker" aria-label="Prototype variants" ref={pickerRef} data-ready={ready || undefined}>
          <span className="proto-picker-highlight" aria-hidden="true" ref={highlightRef}></span>
          {variants.map((v, i) => (
            <button
              key={v.name}
              className="proto-picker-item"
              data-active={i === current || undefined}
              aria-current={i === current ? 'true' : undefined}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              onClick={() => setActive(i)}
            >
              {v.name}
            </button>
          ))}
          <span className="proto-picker-divider" aria-hidden="true"></span>
          <button className="proto-picker-item proto-picker-replay" aria-label="Replay animation (R)" onClick={() => setMount((m) => m + 1)}>
            ↻
          </button>
        </nav>
      </div>
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Harness />
  </StrictMode>,
);
