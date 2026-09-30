import { useEffect, useRef, type CSSProperties } from 'react';
import { projects, type Project } from '../data/projects';
import { site, whatsappWith } from '../data/site';
import { BotDemo } from '../ui/BotDemo';
import { Browser, Phone } from '../ui/Frames';
import { Icon } from '../ui/Icon';
import { Mili } from '../ui/Mili';
import { ProjectVisual } from './Work';

function Gallery({ p }: { p: Project }) {
  const track = useRef<HTMLDivElement>(null);
  const step = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    // RTL: "next" travels toward negative x
    el.scrollBy({ left: -dir * el.clientWidth * 0.75, behavior: 'smooth' });
  };
  return (
    <div className="gallery">
      <div className="gallery-track" ref={track} tabIndex={0} role="region" aria-label={`صفحه‌های ${p.name}`} data-lenis-prevent>
        {p.live === 'telegram' && (
          <figure className="shot shot--phone shot--live">
            <Phone className="shot-phone">
              <BotDemo />
            </Phone>
            <figcaption>
              <span className="live-dot" aria-hidden="true" /> دکمه‌ها را بزنید؛ همان جواب ربات واقعی را می‌گیرید
            </figcaption>
          </figure>
        )}
        {p.screens.map((s) => (
          <figure key={s.src} className={`shot shot--${s.device}`}>
            {s.device === 'desktop' ? <Browser src={s.src} alt={s.caption} className="shot-browser" /> : <Phone src={s.src} alt={s.caption} className="shot-phone" />}
            <figcaption>{s.caption}</figcaption>
          </figure>
        ))}
        {p.live === 'mili' && (
          <figure className="shot shot--phone">
            <Phone className="shot-phone">
              <Mili />
            </Phone>
            <figcaption>دستیار هوشمند میلی</figcaption>
          </figure>
        )}
      </div>
      <div className="gallery-nav">
        <button type="button" className="icon-btn" onClick={() => step(-1)} aria-label="قبلی">
          <Icon name="chevron" style={{ transform: 'scaleX(-1)' }} />
        </button>
        <button type="button" className="icon-btn" onClick={() => step(1)} aria-label="بعدی">
          <Icon name="chevron" />
        </button>
      </div>
    </div>
  );
}

/** A full-screen project story. The card's visual and title morph into it (View Transitions). */
export function CaseStudy({ p, onClose, onOpen }: { p: Project; onClose: () => void; onOpen: (slug: string) => void }) {
  const scroller = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const next = projects[(projects.findIndex((x) => x.slug === p.slug) + 1) % projects.length];

  useEffect(() => {
    scroller.current?.scrollTo({ top: 0 });
    closeBtn.current?.focus({ preventScroll: true });
  }, [p.slug]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="case" role="dialog" aria-modal="true" aria-labelledby="case-title" style={{ '--brand': p.color, '--tint': p.tint } as CSSProperties}>
      <div className="case-scroll" ref={scroller} data-lenis-prevent>
        <div className="case-bar glass">
          <button type="button" className="icon-btn" onClick={onClose} ref={closeBtn} aria-label="بستن و بازگشت">
            <Icon name="close" />
          </button>
          <span className="case-bar-name">
            <img src={p.logo} alt="" width={28} height={28} />
            {p.name}
          </span>
          {p.link ? (
            <a className="btn btn--glass btn--sm" href={p.link.href} target="_blank" rel="noopener">
              <span className="hide-sm">نسخهٔ زنده</span>
              <Icon name="external" size={16} />
            </a>
          ) : (
            <span />
          )}
        </div>

        <header className="case-hero">
          <div className="case-hero-copy">
            <p className="eyebrow">
              {p.kind} · {p.year}
            </p>
            <h1 id="case-title" className="case-title" style={{ viewTransitionName: 'case-title' }}>
              {p.name}
            </h1>
            <p className="case-lead">{p.summary}</p>
            <ul className="case-facts">
              {p.facts.map((f) => (
                <li key={f.label}>
                  <strong>{f.value}</strong>
                  <span>{f.label}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="case-hero-visual" style={{ viewTransitionName: 'case-visual' }}>
            <ProjectVisual p={p} big eager />
          </div>
        </header>

        <section className="case-story">
          <article>
            <span className="story-icon story-icon--warn">
              <Icon name="bolt" size={20} />
            </span>
            <h2>مشکل چه بود؟</h2>
            <p>{p.problem}</p>
          </article>
          <article>
            <span className="story-icon story-icon--ok">
              <Icon name="check" size={20} />
            </span>
            <h2>چه ساختم؟</h2>
            <p>{p.solution}</p>
          </article>
        </section>

        <section className="case-section">
          <h2 className="case-h">{p.live === 'telegram' ? 'داخل ربات' : 'داخل سایت و اپلیکیشن'}</h2>
          <Gallery p={p} />
        </section>

        <section className="case-section">
          <h2 className="case-h">امکانات</h2>
          <ul className="features">
            {p.features.map((f) => (
              <li key={f.title}>
                <span className="feature-icon">
                  <Icon name={f.icon} size={20} />
                </span>
                <strong>{f.title}</strong>
                <p>{f.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <dl className="case-meta">
          <div>
            <dt>کارفرما</dt>
            <dd>{p.client}</dd>
          </div>
          <div>
            <dt>کار من</dt>
            <dd>{p.role}</dd>
          </div>
          <div className="case-meta-wide">
            <dt>تکنولوژی‌ها</dt>
            <dd>
              <ul className="tags">
                {p.stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>

        <section className="case-cta">
          <div>
            <h2>یک پروژهٔ شبیه این می‌خواهید؟</h2>
            <p>بگویید برای چه کسب‌وکاری؛ مشاورهٔ اول رایگان است.</p>
          </div>
          <div className="case-cta-actions">
            <a className="btn btn--whatsapp btn--lg" href={whatsappWith(`سلام رامین، پروژه‌ای شبیه «${p.name}» می‌خواهم.`)} target="_blank" rel="noopener">
              <Icon name="whatsapp" />
              پیام در واتس‌اپ
            </a>
            <a className="btn btn--glass btn--lg" href={site.phone.href}>
              <Icon name="call" size={18} />
              <span dir="ltr">{site.phone.display}</span>
            </a>
          </div>
        </section>

        <button type="button" className="case-next" onClick={() => onOpen(next.slug)} style={{ '--brand': next.color, '--tint': next.tint } as CSSProperties}>
          <span className="case-next-label">پروژهٔ بعدی</span>
          <strong>{next.name}</strong>
          <span className="case-next-kind">{next.kind}</span>
          <Icon name="arrow" size={22} />
        </button>
      </div>
    </div>
  );
}
