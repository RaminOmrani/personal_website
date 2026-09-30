import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { app, hero, sites } from '../data/copy';
import { fa, whatsappWith } from '../data/site';
import { beats, damp, film, range, stepped, stepVisibility } from '../three/film';
import { gsap, ScrollTrigger, scrollToTarget } from '../lib/scroll';
import { hasWebGL, useMounted, useReducedMotion } from '../lib/hooks';
import { Browser, Phone } from '../ui/Frames';
import { Icon } from '../ui/Icon';
import { Grad, Words } from '../ui/Text';

const Stage = lazy(() => import('../three/Stage'));

const show = (el: HTMLElement | null, v: number, y = 0) => {
  if (!el) return;
  el.style.opacity = v.toFixed(3);
  el.style.transform = y ? `translate3d(0, ${y.toFixed(1)}px, 0)` : 'none';
  el.style.pointerEvents = v > 0.6 ? 'auto' : 'none';
  el.style.visibility = v < 0.005 ? 'hidden' : 'visible';
};

/**
 * The opening film: one pinned stage, three acts.
 * Hero (devices float, lid opens) → dive into the laptop through four live systems →
 * the phone turns and walks through five app screens.
 */
export function Film({ onOpen }: { onOpen: (slug: string) => void }) {
  const root = useRef<HTMLElement>(null);
  const heroEl = useRef<HTMLDivElement>(null);
  const cue = useRef<HTMLDivElement>(null);
  const sitesTag = useRef<HTMLParagraphElement>(null);
  const caps = useRef<(HTMLElement | null)[]>([]);
  const appHead = useRef<HTMLDivElement>(null);
  const callouts = useRef<(HTMLElement | null)[]>([]);
  const bar = useRef<HTMLSpanElement>(null);
  const chapterDots = useRef<(HTMLElement | null)[]>([]);

  const mounted = useMounted();
  const reduced = useReducedMotion();
  const [gl, setGl] = useState<boolean | null>(null);
  const [active, setActive] = useState(true);
  const [ready, setReady] = useState(false);
  const onReady = useCallback(() => setReady(true), []);

  useEffect(() => setGl(hasWebGL()), []);
  useEffect(() => {
    film.reduced = reduced;
  }, [reduced]);

  // scroll position → film.target; render only while the film is on screen
  useEffect(() => {
    const el = root.current;
    if (!el || gl === false) return;
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (s) => {
        film.target = s.progress;
      },
    });
    film.target = film.p = st.progress;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { rootMargin: '120px' });
    io.observe(el);
    return () => {
      st.kill();
      io.disconnect();
    };
  }, [gl]);

  // pointer parallax for the hero (mouse only)
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      film.pointerX = (e.clientX / innerWidth - 0.5) * 2;
      film.pointerY = (e.clientY / innerHeight - 0.5) * 2;
    };
    addEventListener('pointermove', onMove, { passive: true });
    return () => removeEventListener('pointermove', onMove);
  }, []);

  // one ticker eases the film and moves every caption from the same value as the 3D
  useEffect(() => {
    if (gl === false) return;
    let last = -1;
    const apply = (p: number) => {
      const out = range(p, ...beats.heroOut);
      show(heroEl.current, 1 - out, reduced ? 0 : -out * 70);
      show(cue.current, 1 - range(p, 0, 0.025));

      const sitesGate = range(p, 0.235, 0.275) * (1 - range(p, 0.595, 0.625));
      show(sitesTag.current, sitesGate);
      const s = stepped(p, beats.sites, sites.items.length);
      caps.current.forEach((el, i) => {
        const v = stepVisibility(s, i) * sitesGate;
        show(el, v, reduced ? 0 : (s < i ? 1 : -1) * (1 - v) * 24);
      });

      const appGate = range(p, 0.665, 0.72) * (1 - range(p, 0.955, 0.99));
      show(appHead.current, appGate, reduced ? 0 : (1 - appGate) * 20);
      const calloutGate = range(p, 0.715, 0.745) * (1 - range(p, 0.95, 0.985));
      const a = stepped(p, beats.screens, app.screens.length);
      callouts.current.forEach((el, i) => {
        const v = stepVisibility(a, i) * calloutGate;
        show(el, v, reduced ? 0 : (a < i ? 1 : -1) * (1 - v) * 20);
      });

      if (bar.current) bar.current.style.transform = `scaleX(${p.toFixed(4)})`;
      const chapter = p < 0.2 ? 0 : p < 0.63 ? 1 : 2;
      chapterDots.current.forEach((el, i) => el?.toggleAttribute('data-on', i === chapter));
    };
    const tick = (_: number, dtMs: number) => {
      const dt = Math.min(dtMs / 1000, 0.1);
      film.p = reduced ? film.target : damp(film.p, film.target, 5, dt);
      if (Math.abs(film.p - last) < 0.00002) return;
      last = film.p;
      apply(film.p);
    };
    apply(film.p);
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, [gl, reduced]);

  const staticFilm = gl === false;

  return (
    <section className={staticFilm ? 'film film--static' : 'film'} ref={root} id="top" aria-label="معرفی">
      <div className="film-sticky">
        <div className="film-bg" aria-hidden="true" />
        {mounted && gl && (
          <div className="film-canvas" data-ready={ready || undefined}>
            <Suspense fallback={null}>
              <Stage active={active} onReady={onReady} />
            </Suspense>
          </div>
        )}

        <div className="film-ui">
          <div className="hero-copy" ref={heroEl}>
            <p className="pill" data-enter style={{ animationDelay: '60ms' }}>
              <span className="live-dot" aria-hidden="true" />
              {hero.eyebrow}
            </p>
            <h1 className="hero-title">
              {hero.lines.map((l, i) => (
                <span className="line" key={l}>
                  <Words text={l} start={180 + i * 180} />
                </span>
              ))}
            </h1>
            <p className="hero-text" data-enter style={{ animationDelay: '720ms' }}>
              {hero.text}
            </p>
            <div className="hero-ctas" data-enter style={{ animationDelay: '840ms' }}>
              <a className="btn btn--primary btn--lg" href={whatsappWith(hero.primaryMessage)} target="_blank" rel="noopener" data-magnetic>
                <Icon name="whatsapp" />
                {hero.primary}
              </a>
              <a
                className="btn btn--glass btn--lg"
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTarget('#work');
                }}
              >
                {hero.secondary}
                <Icon name="arrow" size={18} />
              </a>
            </div>
            <ul className="proof" data-enter style={{ animationDelay: '960ms' }}>
              {hero.proof.map((p) => (
                <li key={p}>
                  <Icon name="check" size={15} />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {staticFilm && (
            <div className="film-still" aria-hidden="true">
              <Browser src={sites.items[0].screen} url="zehnesabz.com" className="still-browser" eager />
              <Phone src={app.screens[1].screen} className="still-phone" eager />
            </div>
          )}

          {!staticFilm && (
            <>
              <div className="film-cue" ref={cue} aria-hidden="true">
                <span className="mouse">
                  <i />
                </span>
                {hero.scroll}
              </div>

              <p className="chapter-tag chapter-tag--sites" ref={sitesTag}>
                {sites.chapter}
              </p>
              <div className="caps">
                {sites.items.map((c, i) => (
                  <article
                    key={c.slug}
                    className="cap glass"
                    ref={(el) => {
                      caps.current[i] = el;
                    }}
                  >
                    <span className="cap-label">
                      <span className="cap-index">{fa(String(i + 1).padStart(2, '0'))}</span>
                      {c.label}
                    </span>
                    <h2>{c.title}</h2>
                    <p>{c.text}</p>
                    <button type="button" className="link-arrow" onClick={() => onOpen(c.slug)}>
                      داستان کامل این پروژه
                      <Icon name="arrow" size={16} />
                    </button>
                  </article>
                ))}
              </div>

              <div className="app-head" ref={appHead}>
                <p className="chapter-tag">{app.chapter}</p>
                <h2>
                  <Grad text={app.title} />
                </h2>
                <p>{app.text}</p>
              </div>
              <div className="callouts">
                {app.screens.map((s, i) => (
                  <div
                    key={s.screen}
                    className="callout glass"
                    ref={(el) => {
                      callouts.current[i] = el;
                    }}
                  >
                    <span className="callout-n" aria-hidden="true">
                      {fa(String(i + 1).padStart(2, '0'))}
                    </span>
                    <strong>{s.title}</strong>
                    <span>{s.text}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {!staticFilm && (
          <div className="film-hud">
            <ol className="film-chapters" aria-hidden="true">
              {['معرفی', 'سایت‌ها', 'اپلیکیشن'].map((c, i) => (
                <li
                  key={c}
                  ref={(el) => {
                    chapterDots.current[i] = el;
                  }}
                >
                  {c}
                </li>
              ))}
            </ol>
            <span className="film-bar" aria-hidden="true">
              <span ref={bar} />
            </span>
            <a
              className="film-skip"
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                scrollToTarget('#work');
              }}
            >
              <span className="skip-long">{hero.skip}</span>
              <span className="skip-short">رد شدن</span>
              <Icon name="arrow" size={14} style={{ transform: 'rotate(-90deg)' }} />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
