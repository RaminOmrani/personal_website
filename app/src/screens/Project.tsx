import { useRef, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { useCopy } from '../../../v3/src/data/copy';
import { useProjects } from '../../../v3/src/data/projects';
import { whatsappWith } from '../../../v3/src/data/site';
import { useAppCopy } from '../copy';
import { closeOverlay, goBack, openOverlay, useNav } from '../lib/router';
import { Img, Link } from '../ui/bits';
import { Icon } from '../ui/Icon';
import { Viewer } from '../ui/Viewer';

export function Project({ slug, active }: { slug: string; active: boolean }) {
  const { projects } = useProjects();
  const { caseStudy, ui } = useCopy();
  const t = useAppCopy();
  const nav = useNav();
  const lastStart = useRef(0);
  const at = projects.findIndex((p) => p.slug === slug);
  const p = projects[at];

  if (!p) {
    return (
      <div className="page page--empty">
        <Icon name="search" size={40} />
        <p>{t.project.notFound}</p>
        <button type="button" className="btn btn--primary" onClick={() => goBack()}>
          {t.project.toWork}
        </button>
      </div>
    );
  }

  const next = projects[(at + 1) % projects.length];
  const viewing = active && nav.overlay?.kind === 'viewer';
  if (nav.overlay?.kind === 'viewer') lastStart.current = nav.overlay.index;
  const style = { '--tint': p.tint, '--brand': p.color } as CSSProperties;

  return (
    <>
      <article className="page page--project" style={style}>
        <div className="phero">
          {p.cover.desktop && (
            <span className="frame frame--desktop">
              <span className="frame-bar" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <Img src={p.cover.desktop} alt={ui.desktopOf(p.name)} eager width={1280} height={800} />
            </span>
          )}
          {p.cover.phone && (
            <span className={p.cover.desktop ? 'frame frame--phone' : 'frame frame--phone frame--solo'}>
              <Img src={p.cover.phone} alt={ui.mobileOf(p.name)} eager width={540} height={1169} />
            </span>
          )}
        </div>

        <header className="phead">
          <img className="logo-tile" src={p.logo} alt="" width={56} height={56} />
          <div>
            <h1>{p.name}</h1>
            <p>{p.kind}</p>
          </div>
        </header>

        <dl className="pmeta">
          <div>
            <dt>{caseStudy.client}</dt>
            <dd>{p.client}</dd>
          </div>
          <div>
            <dt>{t.project.year}</dt>
            <dd>{p.year}</dd>
          </div>
        </dl>

        {p.link && (
          <a className="live-link" href={p.link.href} target="_blank" rel="noopener">
            <span className="live-dot" aria-hidden="true" />
            <span>{caseStudy.live}</span>
            <span className="live-url" dir="ltr">
              {p.link.label}
            </span>
            <Icon name="external" size={16} />
          </a>
        )}

        <p className="psummary">{p.summary}</p>

        <ul className="facts">
          {p.facts.map((f) => (
            <li key={f.label}>
              <strong>{f.value}</strong>
              <span>{f.label}</span>
            </li>
          ))}
        </ul>

        <section className="ps" aria-label={`${caseStudy.problem} ${caseStudy.solution}`}>
          <div className="ps-card ps-card--problem">
            <h2>{caseStudy.problem}</h2>
            <p>{p.problem}</p>
          </div>
          <span className="ps-arrow" aria-hidden="true">
            <Icon name="arrow" size={18} />
          </span>
          <div className="ps-card ps-card--solution">
            <h2>{caseStudy.solution}</h2>
            <p>{p.solution}</p>
          </div>
        </section>

        <section className="block" aria-labelledby="shots-title">
          <h2 className="block-title" id="shots-title">
            {caseStudy.screensOf(p.name)}
          </h2>
          <ul className="gallery">
            {p.screens.map((s, i) => (
              <li key={s.src} className={`shot shot--${s.device}`}>
                <button type="button" className="shot-btn" onClick={() => openOverlay({ kind: 'viewer', index: i })} aria-label={t.project.view(s.caption)}>
                  <Img src={s.src} alt="" width={s.device === 'phone' ? 540 : 1280} height={s.device === 'phone' ? 1169 : 800} />
                  <span className="shot-zoom" aria-hidden="true">
                    <Icon name="expand" size={15} />
                  </span>
                </button>
                <span className="shot-cap">{s.caption}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="block" aria-labelledby="features-title">
          <h2 className="block-title" id="features-title">
            {caseStudy.features}
          </h2>
          <ul className="features">
            {p.features.map((f) => (
              <li key={f.title}>
                <span className="feature-icon">
                  <Icon name={f.icon} size={20} />
                </span>
                <div>
                  <strong>{f.title}</strong>
                  <p>{f.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="block">
          <h2 className="block-title">{caseStudy.role}</h2>
          <p className="role">{p.role}</p>
          <h2 className="block-title">{caseStudy.stack}</h2>
          <ul className="stack">
            {p.stack.map((s) => (
              <li key={s} dir="auto">
                {s}
              </li>
            ))}
          </ul>
        </section>

        <Link to={`/work/${next.slug}`} className="next-card" style={{ '--tint': next.tint } as CSSProperties}>
          <img className="logo-tile" src={next.logo} alt="" width={44} height={44} />
          <span>
            <small>{caseStudy.next}</small>
            <strong>{next.name}</strong>
          </span>
          <Icon name="arrow" size={20} />
        </Link>
      </article>

      <div className="cta-bar">
        <span className="cta-text">
          <strong>{caseStudy.ctaTitle}</strong>
          <small>{t.project.ctaHint}</small>
        </span>
        <a className="btn btn--wa" href={whatsappWith(caseStudy.ctaMessage(p.name))} target="_blank" rel="noopener">
          <Icon name="whatsapp" size={20} />
          {t.project.cta}
        </a>
      </div>

      {active && createPortal(<Viewer screens={p.screens} start={lastStart.current} open={viewing} onClose={closeOverlay} />, document.body)}
    </>
  );
}
