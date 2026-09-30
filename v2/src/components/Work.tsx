import { useLayoutEffect, useEffect, useRef, useState, type CSSProperties } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import clsx from 'clsx';
import { work } from '../data/copy';
import { categories, projects, type Category, type Project } from '../data/projects';
import { useLang } from '../i18n';
import { Marked } from '../lib';
import { Browser, Phone } from './Devices';
import { EASE_OUT } from './Hero';
import { Icon } from './Icon';
import { TelegramChat } from './LiveDemos';

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

type Filter = Category | 'all';

/**
 * Segmented filter. The active style lives on a duplicate row that is clipped to the
 * selected tab, so background and text colour change together in one clip-path transition.
 */
function FilterTabs({ value, onChange }: { value: Filter; onChange: (v: Filter) => void }) {
  const { t } = useLang();
  const rowRef = useRef<HTMLDivElement>(null);
  const [clip, setClip] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useIsoLayoutEffect(() => {
    const measure = () => {
      const row = rowRef.current;
      const btn = row?.querySelector<HTMLElement>(`[data-id="${value}"]`);
      if (!row || !btn) return;
      const left = btn.offsetLeft;
      const right = row.offsetWidth - left - btn.offsetWidth;
      setClip(`inset(0 ${right}px 0 ${left}px round 999px)`);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [value]);

  useEffect(() => {
    // enable the transition only after the first measured paint
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setReady(true)));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="tabs" role="group" aria-label={t(work.filterLabel)}>
      <div className="tabs-row" ref={rowRef}>
        {categories.map((c) => (
          <button key={c.id} type="button" data-id={c.id} className="tab" aria-pressed={value === c.id} onClick={() => onChange(c.id)}>
            {t(c.label)}
          </button>
        ))}
      </div>
      <div className="tabs-row tabs-row--active" aria-hidden="true" data-ready={ready || undefined} style={{ clipPath: clip ?? undefined, opacity: clip ? 1 : 0 }}>
        {categories.map((c) => (
          <span key={c.id} className="tab">
            {t(c.label)}
          </span>
        ))}
      </div>
    </div>
  );
}

function CardVisual({ p }: { p: Project }) {
  const { t } = useLang();
  if (p.live === 'telegram') {
    return (
      <div className="card-visual card-visual--bot">
        {p.cover.desktop && <Browser src={p.cover.desktop} alt={t(`سایت ${p.name}`, `${p.name} website`)} url={p.link?.label} className="card-browser" />}
        <Phone className="card-phone">
          <TelegramChat compact />
        </Phone>
      </div>
    );
  }
  return (
    <div className="card-visual">
      {p.cover.desktop && <Browser src={p.cover.desktop} alt={`${p.name} — ${t('نسخهٔ دسکتاپ', 'desktop version')}`} url={p.link?.label} className="card-browser" />}
      {p.cover.phone && <Phone src={p.cover.phone} alt={`${p.name} — ${t('نسخهٔ موبایل', 'mobile version')}`} className="card-phone" />}
    </div>
  );
}

function ProjectCard({ p, featured, onOpen }: { p: Project; featured: boolean; onOpen: (slug: string) => void }) {
  const { t } = useLang();
  const labels = categories.filter((c) => c.id !== 'all' && p.categories.includes(c.id as Category)).map((c) => t(c.label));
  const open = t(work.open);
  return (
    <motion.article
      layout="position"
      className={clsx('card', featured && 'card--featured')}
      style={{ '--tint': p.tint, '--brand': p.color } as CSSProperties}
      initial={{ opacity: 0, transform: 'scale(0.96)' }}
      animate={{ opacity: 1, transform: 'scale(1)' }}
      exit={{ opacity: 0, transform: 'scale(0.96)', transition: { duration: 0.18, ease: EASE_OUT } }}
      transition={{ duration: 0.28, ease: EASE_OUT, layout: { type: 'spring', bounce: 0, duration: 0.4 } }}
    >
      <CardVisual p={p} />
      <div className="card-body">
        <div className="card-head">
          <img className="card-logo" src={p.logo} alt="" width={44} height={44} loading="lazy" />
          <div>
            <h3>{p.name}</h3>
            <span>{p.kind}</span>
          </div>
        </div>
        <p className="card-pitch">{p.pitch}</p>
        {featured && (
          <ul className="card-facts">
            {p.facts.map((f) => (
              <li key={f.label}>
                <strong>{f.value}</strong>
                <span>{f.label}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="card-foot">
          <ul className="chips chips--sm" aria-label={t(work.categoriesLabel)}>
            {labels.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
          <span className="card-more">
            {open}
            <Icon name="arrow" size={16} />
          </span>
        </div>
      </div>
      {/* The whole card is one button; it sits on top so every part of the card is clickable. */}
      <button type="button" className="card-hit" onClick={() => onOpen(p.slug)} aria-label={`${p.name}: ${open}`} />
    </motion.article>
  );
}

export function Work({ onOpen }: { onOpen: (slug: string) => void }) {
  const { t, loc } = useLang();
  const [filter, setFilter] = useState<Filter>('all');
  const all = loc(projects);
  const list = filter === 'all' ? all : all.filter((p) => p.categories.includes(filter));
  return (
    <section className="section" id="work">
      <div className="container">
        <header className="section-head" data-reveal>
          <p className="eyebrow">{t(work.eyebrow)}</p>
          <h2>
            <Marked text={t(work.title)} />
          </h2>
          <p className="section-text">{t(work.text)}</p>
        </header>
        <div data-reveal>
          <FilterTabs value={filter} onChange={setFilter} />
        </div>
        <LayoutGroup>
          <div className="cards">
            <AnimatePresence mode="popLayout" initial={false}>
              {list.map((p, i) => (
                <ProjectCard key={p.slug} p={p} featured={filter === 'all' && i === 0} onOpen={onOpen} />
              ))}
            </AnimatePresence>
          </div>
        </LayoutGroup>
      </div>
    </section>
  );
}
