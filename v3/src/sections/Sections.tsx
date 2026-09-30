import { useEffect, useRef, useState, type CSSProperties } from 'react';
import clsx from 'clsx';
import { useCopy, type Copy } from '../data/copy';
import { useSite, whatsappWith } from '../data/site';
import { digits, useLang, type Lang } from '../i18n';
import { gsap, ScrollTrigger } from '../lib/scroll';
import { useReducedMotion } from '../lib/hooks';
import { BotDemo } from '../ui/BotDemo';
import { Browser, Phone } from '../ui/Frames';
import { Icon } from '../ui/Icon';
import { Mili } from '../ui/Mili';
import { Grad } from '../ui/Text';
import { ArchPortrait } from '../ui/Arch';

type Service = Copy['services']['items'][number];

function ServiceVisual({ v, live }: { v: Service['visual']; live?: boolean }) {
  switch (v.kind) {
    case 'browser':
      return <Browser src={v.src} url={v.url === 'crm' ? undefined : v.url} className="sv-browser" />;
    case 'phones':
      return (
        <div className="sv-phones">
          <Phone src={v.src2} className="sv-phone sv-phone--back" />
          <Phone src={v.src} className="sv-phone" />
        </div>
      );
    case 'bot':
      return (
        <Phone className="sv-phone sv-phone--solo">
          <BotDemo interactive={!!live} />
        </Phone>
      );
    default:
      return (
        <Phone className="sv-phone sv-phone--solo">
          <Mili />
        </Phone>
      );
  }
}

/** Services on the right; on wide screens a sticky showcase on the left follows along. */
export function Services() {
  const lang = useLang();
  const { services } = useCopy();
  const [active, setActive] = useState(0);
  const items = useRef<(HTMLElement | null)[]>([]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    items.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="section services" id="services">
      <div className="container">
        <header className="section-head" data-reveal>
          <p className="eyebrow">{services.eyebrow}</p>
          <h2 className="display">
            <Grad text={services.title} />
          </h2>
        </header>
        <div className="svc-grid">
          <ol className="svc-list">
            {services.items.map((s, i) => (
              <li
                key={s.id}
                className="svc"
                data-i={i}
                data-active={active === i || undefined}
                ref={(el) => {
                  items.current[i] = el;
                }}
              >
                <span className="svc-num" aria-hidden="true">
                  {digits(String(i + 1).padStart(2, '0'), lang)}
                </span>
                <span className="svc-icon">
                  <Icon name={s.icon} size={24} />
                </span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <ul className="ticks">
                  {s.points.map((pt) => (
                    <li key={pt}>
                      <Icon name="check" size={15} />
                      {pt}
                    </li>
                  ))}
                </ul>
                <div className="svc-inline" aria-hidden="true">
                  <ServiceVisual v={s.visual} />
                </div>
                <a className="link-arrow" href={whatsappWith(services.askMessage(s.topic))} target="_blank" rel="noopener">
                  {services.ask(s.topic)}
                  <Icon name="arrow" size={16} />
                </a>
              </li>
            ))}
          </ol>
          <div className="svc-stage" aria-hidden="true">
            <div className="svc-stage-inner glass">
              <span className="svc-stage-light" style={{ '--hue': active * 55 } as CSSProperties} />
              {services.items.map((s, i) => (
                <div key={s.id} className="svc-visual" data-on={active === i || undefined}>
                  <ServiceVisual v={s.visual} live={active === i} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Two rows of ready-made capabilities, drifting in opposite directions. */
export function Marquee() {
  const {
    marquee: { label, items: marquee },
  } = useCopy();
  const half = Math.ceil(marquee.length / 2);
  const rows = [marquee.slice(0, half), marquee.slice(half)];
  return (
    <section className="marquee" aria-label={label}>
      {rows.map((row, r) => (
        <div className={clsx('marquee-row', r === 1 && 'marquee-row--rev')} key={r}>
          <div className="marquee-track">
            {[...row, ...row, ...row, ...row].map((m, i) => (
              <span className="marquee-item" key={i} aria-hidden={i >= row.length || undefined}>
                <Icon name="sparkle" size={16} />
                {m}
              </span>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

/** The process as a path that draws itself as you scroll; each step lights up as the line reaches it. */
export function Process() {
  const lang = useLang();
  const { process } = useCopy();
  const root = useRef<HTMLDivElement>(null);
  const [lit, setLit] = useState(process.steps.length);
  const reduced = useReducedMotion();
  useEffect(() => {
    const el = root.current;
    if (!el || reduced || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setLit(0);
    const paths = el.querySelectorAll<SVGPathElement>('.path-draw');
    const tween = gsap.fromTo(
      paths,
      { strokeDashoffset: 1 },
      {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top 72%',
          end: 'bottom 60%',
          scrub: 0.6,
          onUpdate: (s) => setLit(Math.min(process.steps.length, Math.floor(s.progress * process.steps.length + 0.35))),
        },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.set(paths, { strokeDashoffset: 0 });
      setLit(process.steps.length);
    };
  }, [reduced, process.steps.length]);

  // a wave that crosses its midline under each of the four nodes (drawn from the right; mirrored in CSS for left-to-right)
  const wave = 'M1000 40 C958 8 917 8 875 40 S792 72 750 40 S667 8 625 40 S542 72 500 40 S417 8 375 40 S292 72 250 40 S167 8 125 40 S42 72 0 40';
  return (
    <section className="section process" id="process">
      <div className="container">
        <header className="section-head section-head--center" data-reveal>
          <p className="eyebrow">{process.eyebrow}</p>
          <h2 className="display">
            <Grad text={process.title} />
          </h2>
        </header>
        <div className="steps-wrap" ref={root}>
          <svg className="steps-path" viewBox="0 0 1000 80" preserveAspectRatio="none" aria-hidden="true">
            <path d={wave} className="path-base" />
            <path d={wave} className="path-draw" pathLength={1} />
          </svg>
          <span className="steps-rail" aria-hidden="true">
            <svg viewBox="0 0 4 100" preserveAspectRatio="none">
              <path d="M2 0 L2 100" className="path-base" />
              <path d="M2 0 L2 100" className="path-draw" pathLength={1} />
            </svg>
          </span>
          <ol className="steps">
            {process.steps.map((s, i) => (
              <li key={s.title} className="step" data-lit={i < lit || undefined}>
                <span className="step-node" aria-hidden="true">
                  {digits(i + 1, lang)}
                </span>
                <span className="step-time">{s.time}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <p className="step-get">
                  <Icon name="check" size={15} />
                  {s.get}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Counter({ value, suffix, lang }: { value: number; suffix: string; lang: Lang }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const fa = (n: number) => digits(n, lang);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = el.getBoundingClientRect();
    if (r.top < innerHeight) return; // already on screen: keep the real number
    const obj = { v: 0 };
    el.textContent = fa(0) + suffix;
    const tween = gsap.to(obj, {
      v: value,
      duration: 1.6,
      ease: 'expo.out',
      paused: true,
      onUpdate: () => {
        el.textContent = fa(Math.round(obj.v)) + suffix;
      },
    });
    const st = ScrollTrigger.create({ trigger: el, start: 'top 85%', once: true, onEnter: () => tween.play() });
    return () => {
      st.kill();
      tween.kill();
      el.textContent = fa(value) + suffix;
    };
  }, [value, suffix, reduced, lang]);
  return (
    <span ref={ref} aria-label={fa(value) + suffix}>
      {fa(value) + suffix}
    </span>
  );
}

/**
 * The surname as a dictionary entry, inside the logo's arch: tile-blue, a gold girih pattern,
 * the word itself written in Nastaliq.
 */
function NameCard() {
  const { nameCard } = useCopy();
  return (
    <figure className="namecard" data-reveal>
      <svg className="namecard-bg" viewBox="0 0 400 520" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="nc-fill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2356d6" />
            <stop offset=".6" stopColor="#1673c4" />
            <stop offset="1" stopColor="#0e9aa7" />
          </linearGradient>
          <linearGradient id="nc-gold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f8cf7a" />
            <stop offset="1" stopColor="#e0962f" />
          </linearGradient>
          {/* khatam: the eight-pointed star of Persian tilework, two squares turned 45° apart */}
          <pattern id="nc-girih" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M8 8h24v24H8zM20 3l17 17-17 17L3 20z" fill="none" stroke="#f3c46e" strokeWidth="1" />
          </pattern>
          <clipPath id="nc-clip">
            <path d="M20 520 V220 C20 128 104 62 200 12 C296 62 380 128 380 220 V520 Z" />
          </clipPath>
        </defs>
        <path d="M20 520 V220 C20 128 104 62 200 12 C296 62 380 128 380 220 V520 Z" fill="url(#nc-fill)" />
        <rect className="namecard-girih" width="400" height="520" fill="url(#nc-girih)" clipPath="url(#nc-clip)" />
        <path className="namecard-line" d="M44 520 V230 C44 150 116 94 200 50 C284 94 356 150 356 230 V520" fill="none" stroke="url(#nc-gold)" strokeWidth="3" vectorEffect="non-scaling-stroke" pathLength={1} />
      </svg>
      <figcaption className="namecard-body">
        <span className="namecard-eyebrow">{nameCard.eyebrow}</span>
        <strong className="namecard-word">{nameCard.word}</strong>
        <span className="namecard-phon" dir="ltr">
          {nameCard.phonetic}
        </span>
        <span className="namecard-kind">{nameCard.kind}</span>
        <ol className="namecard-defs">
          {nameCard.meanings.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ol>
        <p className="namecard-note">{nameCard.note}</p>
      </figcaption>
    </figure>
  );
}

/** A short personal promise, next to what the name itself promises. */
export function Pledge() {
  const { promise } = useCopy();
  return (
    <section className="section promise" aria-labelledby="promise-title">
      <div className="container promise-grid">
        <NameCard />
        <div className="promise-copy" data-reveal>
          <p className="eyebrow">{promise.eyebrow}</p>
          <h2 id="promise-title" className="promise-title">
            <span className="nas">{promise.title}</span>
          </h2>
          <ul className="promise-list">
            {promise.items.map((it, i) => (
              <li key={it.title} data-reveal style={{ '--d': i + 1 } as CSSProperties}>
                <span className="promise-icon">
                  <Icon name={it.icon} size={22} />
                </span>
                <div>
                  <strong>{it.title}</strong>
                  <p>{it.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function About() {
  const lang = useLang();
  const { about, stats, ui } = useCopy();
  const site = useSite();
  return (
    <section className="section about" id="about">
      <div className="container about-grid">
        <div className="profile glass" data-reveal>
          <ArchPortrait src="me/me-think.webp" alt={about.portraitAlt} width={544} height={482} className="profile-portrait">
            <figcaption className="profile-quote">{about.quote}</figcaption>
          </ArchPortrait>
          <strong className="profile-name">{site.name}</strong>
          <span className="profile-role">{about.role}</span>
          <p className="profile-now">
            <span className="live-dot" aria-hidden="true" />
            {about.now}
          </p>
          <ul className="tags">
            {about.chips.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <div className="profile-links">
            {site.socials.map((s) => (
              <a key={s.label} className="icon-btn" href={s.href} target="_blank" rel="noopener" aria-label={s.label}>
                <Icon name={s.label === 'GitHub' ? 'github' : 'linkedin'} />
              </a>
            ))}
            <a className="icon-btn" href={site.telegram.href} target="_blank" rel="noopener" aria-label={ui.telegram}>
              <Icon name="telegram" />
            </a>
          </div>
        </div>
        <div className="about-copy" data-reveal style={{ '--d': 1 } as CSSProperties}>
          <p className="eyebrow">{about.eyebrow}</p>
          <h2 className="display display--sm">
            <Grad text={about.title} />
          </h2>
          {about.text.map((t) => (
            <p key={t} className="about-p">
              {t}
            </p>
          ))}
          <div className="stats">
            {stats.map((s) => (
              <div key={s.label} className="stat">
                <strong>
                  <Counter value={s.value} suffix={s.suffix} lang={lang} />
                </strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  const { faq } = useCopy();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="section faq" id="faq">
      <div className="container faq-grid">
        <header className="section-head" data-reveal>
          <p className="eyebrow">{faq.eyebrow}</p>
          <h2 className="display display--sm">
            <Grad text={faq.title} />
          </h2>
          <p className="section-text">{faq.text}</p>
          <a className="btn btn--whatsapp" href={whatsappWith(faq.askMessage)} target="_blank" rel="noopener">
            <Icon name="whatsapp" />
            {faq.ask}
          </a>
          <p className="faq-me">
            <span className="avatar avatar--sm">
              <img src="me/me-face.webp" alt="" width={80} height={80} loading="lazy" />
            </span>
            {faq.me}
          </p>
        </header>
        <ul className="faq-list glass" data-reveal>
          {faq.items.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q} className="faq-item" data-open={isOpen || undefined}>
                <h3>
                  <button type="button" className="faq-q" aria-expanded={isOpen} aria-controls={`faq-${i}`} id={`faq-q-${i}`} onClick={() => setOpen(isOpen ? null : i)}>
                    {f.q}
                    <span className="faq-plus" aria-hidden="true">
                      <Icon name="plus" size={18} />
                    </span>
                  </button>
                </h3>
                <div className="faq-a" id={`faq-${i}`} role="region" aria-labelledby={`faq-q-${i}`}>
                  <div>
                    <p>{f.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
