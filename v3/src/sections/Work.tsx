import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import clsx from 'clsx';
import { useCopy } from '../data/copy';
import { useProjects, type Category, type Project } from '../data/projects';
import { useFinePointer } from '../lib/hooks';
import { BotDemo } from '../ui/BotDemo';
import { Browser, Phone } from '../ui/Frames';
import { Icon } from '../ui/Icon';
import { Grad } from '../ui/Text';

type Filter = Category | 'all';

/** The device composition for a project: a browser and a phone, floating in its brand light. */
export function ProjectVisual({ p, big, eager }: { p: Project; big?: boolean; eager?: boolean }) {
  const { ui } = useCopy();
  return (
    <div className={clsx('pv', big && 'pv--big')}>
      <span className="pv-light" aria-hidden="true" />
      {p.cover.desktop && <Browser src={p.cover.desktop} alt={ui.desktopOf(p.name)} url={p.link?.label} className="pv-browser" eager={eager} />}
      {p.live === 'telegram' ? (
        <Phone className="pv-phone">
          <BotDemo interactive={false} />
        </Phone>
      ) : (
        p.cover.phone && <Phone src={p.cover.phone} alt={ui.mobileOf(p.name)} className="pv-phone" eager={eager} />
      )}
    </div>
  );
}

/** Pointer tilt with spring-like easing; only for mouse users, and only while hovered. */
function useTilt(enabled: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const card = ref.current;
    if (!enabled || !card) return;
    const inner = card.querySelector<HTMLElement>('.pv');
    const glare = card.querySelector<HTMLElement>('.card-glare');
    if (!inner) return;
    let raf = 0;
    const cur = { x: 0, y: 0, gx: 50, gy: 30 };
    const tgt = { x: 0, y: 0, gx: 50, gy: 30 };
    const loop = () => {
      cur.x += (tgt.x - cur.x) * 0.12;
      cur.y += (tgt.y - cur.y) * 0.12;
      cur.gx += (tgt.gx - cur.gx) * 0.15;
      cur.gy += (tgt.gy - cur.gy) * 0.15;
      inner.style.transform = `rotateX(${cur.y.toFixed(2)}deg) rotateY(${cur.x.toFixed(2)}deg)`;
      if (glare) glare.style.transform = `translate(${(cur.gx - 50).toFixed(1)}%, ${(cur.gy - 50).toFixed(1)}%)`;
      if (Math.abs(tgt.x - cur.x) + Math.abs(tgt.y - cur.y) > 0.01) raf = requestAnimationFrame(loop);
      else raf = 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const move = (e: PointerEvent) => {
      const r = card.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      tgt.x = nx * 9;
      tgt.y = -ny * 7;
      tgt.gx = (nx + 0.5) * 100;
      tgt.gy = (ny + 0.5) * 100;
      kick();
    };
    const leave = () => {
      tgt.x = tgt.y = 0;
      tgt.gx = 50;
      tgt.gy = 30;
      kick();
    };
    card.addEventListener('pointermove', move);
    card.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(raf);
      card.removeEventListener('pointermove', move);
      card.removeEventListener('pointerleave', leave);
    };
  }, [enabled]);
  return ref;
}

function Card({ p, index, onOpen }: { p: Project; index: number; onOpen: (slug: string) => void }) {
  const fine = useFinePointer();
  const ref = useTilt(fine);
  const { work } = useCopy();
  const { categories } = useProjects();
  const labels = categories.filter((c) => c.id !== 'all' && p.categories.includes(c.id as Category)).map((c) => c.label);
  return (
    <motion.article
      layout="position"
      className={clsx('card', index === 0 && 'card--wide')}
      data-slug={p.slug}
      style={{ '--brand': p.color, '--tint': p.tint } as CSSProperties}
      initial={{ opacity: 0, transform: 'translateY(24px) scale(0.97)' }}
      animate={{ opacity: 1, transform: 'translateY(0px) scale(1)' }}
      exit={{ opacity: 0, transform: 'scale(0.96)', transition: { duration: 0.18 } }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], layout: { type: 'spring', bounce: 0, duration: 0.45 } }}
    >
      <div className="card-inner" data-reveal style={{ '--d': Math.max(index, 0) % 2 } as CSSProperties}>
      <div className="card-stage" ref={ref}>
        <ProjectVisual p={p} />
        <span className="card-glare" aria-hidden="true" />
      </div>
      <div className="card-body">
        <div className="card-head">
          <img className="logo-tile" src={p.logo} alt="" width={46} height={46} loading="lazy" />
          <div>
            <h3>{p.name}</h3>
            <p>{p.kind}</p>
          </div>
        </div>
        <p className="card-pitch">{p.pitch}</p>
        {index === 0 && (
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
          <ul className="tags">
            {labels.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
          <span className="card-more">
            {work.open}
            <Icon name="arrow" size={16} />
          </span>
        </div>
      </div>
      <button type="button" className="card-hit" onClick={() => onOpen(p.slug)} aria-label={`${p.name}: ${work.open}`} />
      </div>
    </motion.article>
  );
}

export function Work({ onOpen }: { onOpen: (slug: string) => void }) {
  const [filter, setFilter] = useState<Filter>('all');
  const { work, ui } = useCopy();
  const { projects, categories } = useProjects();
  const list = filter === 'all' ? projects : projects.filter((p) => p.categories.includes(filter));
  return (
    <section className="section work" id="work">
      <div className="container">
        <header className="section-head" data-reveal>
          <p className="eyebrow">{work.eyebrow}</p>
          <h2 className="display">
            <Grad text={work.title} />
          </h2>
          <p className="section-text">{work.text}</p>
        </header>
        <LayoutGroup>
          <div className="chips" role="group" aria-label={ui.filter} data-reveal>
            {categories.map((c) => (
              <button key={c.id} type="button" className="chip" aria-pressed={filter === c.id} onClick={() => setFilter(c.id)}>
                {filter === c.id && <motion.span layoutId="chip-pill" className="chip-pill" transition={{ type: 'spring', bounce: 0.12, duration: 0.4 }} />}
                <span className="chip-label">{c.label}</span>
              </button>
            ))}
          </div>
          <div className="cards">
            <AnimatePresence mode="popLayout" initial={false}>
              {list.map((p, i) => (
                <Card key={p.slug} p={p} index={filter === 'all' ? i : -1} onOpen={onOpen} />
              ))}
            </AnimatePresence>
          </div>
        </LayoutGroup>
      </div>
    </section>
  );
}
