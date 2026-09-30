import { useId, type CSSProperties } from 'react';
import { useCopy } from '../../../v3/src/data/copy';
import { useProjects } from '../../../v3/src/data/projects';
import { useSite, whatsappWith } from '../../../v3/src/data/site';
import { digits, useLang } from '../../../v3/src/i18n';
import { Grad } from '../../../v3/src/ui/Text';
import { useAppCopy } from '../copy';
import { goTab } from '../lib/router';
import { ArchPortrait, Img, Link } from '../ui/bits';
import { Icon } from '../ui/Icon';

export function Home() {
  const lang = useLang();
  const { hero, stats, promise, about, contact, nameCard, ui } = useCopy();
  const site = useSite();
  const { projects } = useProjects();
  const t = useAppCopy();
  const featured = projects.slice(0, 5);

  return (
    <div className="page page--home">
      <section className="intro" aria-labelledby="intro-title">
        <div className="intro-glow" aria-hidden="true" />
        <div className="intro-top">
          <ArchPortrait src="me/me-hero.webp" alt={site.name} className="intro-arch" />
          <div className="intro-who">
            <span className="intro-status">
              <span className="live-dot" aria-hidden="true" />
              {contact.chat.status}
            </span>
            <strong className="intro-hello">{t.home.hello}</strong>
            <span className="intro-role">{about.role}</span>
            <span className="intro-city">
              <Icon name="globe" size={14} />
              {site.city}
            </span>
          </div>
        </div>
        <h1 className="intro-title" id="intro-title">
          {hero.lines.map((line) => (
            <span key={line} className="intro-line">
              <Grad text={line} />
            </span>
          ))}
        </h1>
        <p className="intro-sub">{t.home.sub}</p>
        <div className="intro-actions">
          <a className="btn btn--wa" href={whatsappWith(hero.primaryMessage)} target="_blank" rel="noopener">
            <Icon name="whatsapp" size={21} />
            {hero.primary}
          </a>
          <a className="btn btn--soft" href={site.phone.href} aria-label={ui.callTo(site.phone.display)}>
            <Icon name="call" size={19} />
            {ui.call}
          </a>
        </div>
      </section>

      <ul className="stats">
        {stats.map((s) => (
          <li key={s.label}>
            <strong>
              {digits(s.value, lang)}
              {s.suffix}
            </strong>
            <span>{s.label}</span>
          </li>
        ))}
      </ul>

      <section className="block" aria-labelledby="featured-title">
        <header className="block-head">
          <h2 id="featured-title">{t.home.featured}</h2>
          <a
            className="more"
            href="#/work"
            onClick={(e) => {
              e.preventDefault();
              goTab('/work');
            }}
          >
            {t.home.seeAll}
            <Icon name="chevron" size={16} />
          </a>
        </header>
        <ul className="carousel">
          {featured.map((p, i) => (
            <li key={p.slug} className="carousel-item">
              <Link to={`/work/${p.slug}`} className="fcard" style={{ '--tint': p.tint, '--brand': p.color } as CSSProperties}>
                <Img className="fcard-media" src={p.cover.desktop ?? p.cover.phone ?? ''} alt="" eager={i < 2} width={1280} height={800} />
                <span className="fcard-body">
                  <img className="logo-tile" src={p.logo} alt="" width={40} height={40} />
                  <span className="fcard-text">
                    <strong>{p.name}</strong>
                    <small>{p.kind}</small>
                  </span>
                </span>
              </Link>
            </li>
          ))}
          <li className="carousel-item">
            <a
              className="fcard fcard--all"
              href="#/work"
              onClick={(e) => {
                e.preventDefault();
                goTab('/work');
              }}
            >
              <Icon name="work" size={30} />
              <strong>{t.home.allProjects}</strong>
              <small>{t.home.allProjectsText(digits(projects.length, lang))}</small>
              <span className="fcard-go">
                <Icon name="arrow" size={20} />
              </span>
            </a>
          </li>
        </ul>
      </section>

      <section className="block promise" aria-labelledby="promise-title">
        <p className="eyebrow">{promise.eyebrow}</p>
        <h2 id="promise-title" className="promise-title">
          <span className="nas">{promise.title}</span>
        </h2>
        <ul className="promise-list">
          {promise.items.map((it) => (
            <li key={it.title}>
              <span className="promise-icon">
                <Icon name={it.icon} size={21} />
              </span>
              <div>
                <strong>{it.title}</strong>
                <p>{it.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="block" aria-label={nameCard.eyebrow}>
        <NameCard />
      </section>
    </div>
  );
}

/** The surname as a dictionary entry, inside the logo's arch (v3's name card, pocket-sized). */
function NameCard() {
  const { nameCard } = useCopy();
  const id = useId().replace(/:/g, '');
  const arch = 'M20 520 V220 C20 128 104 62 200 12 C296 62 380 128 380 220 V520 Z';
  return (
    <figure className="namecard">
      <svg className="namecard-bg" viewBox="0 0 400 520" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id={`${id}f`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2356d6" />
            <stop offset=".6" stopColor="#1673c4" />
            <stop offset="1" stopColor="#0e9aa7" />
          </linearGradient>
          <linearGradient id={`${id}g`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f8cf7a" />
            <stop offset="1" stopColor="#e0962f" />
          </linearGradient>
          {/* khatam: the eight-pointed star of Persian tilework, two squares turned 45° apart */}
          <pattern id={`${id}p`} width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M8 8h24v24H8zM20 3l17 17-17 17L3 20z" fill="none" stroke="#f3c46e" strokeWidth="1" />
          </pattern>
          <clipPath id={`${id}c`}>
            <path d={arch} />
          </clipPath>
        </defs>
        <path d={arch} fill={`url(#${id}f)`} />
        <rect className="namecard-girih" width="400" height="520" fill={`url(#${id}p)`} clipPath={`url(#${id}c)`} />
        <path d="M44 520 V230 C44 150 116 94 200 50 C284 94 356 150 356 230 V520" fill="none" stroke={`url(#${id}g)`} strokeWidth="3" vectorEffect="non-scaling-stroke" />
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
