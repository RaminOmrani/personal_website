import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { hero } from '../data/copy';
import { projects } from '../data/projects';
import { whatsappWith } from '../data/site';
import { Browser } from '../components/Devices';
import { EASE_OUT } from '../components/Hero';
import { Icon } from '../components/Icon';
import { useOnScreen } from '../lib';

/**
 * Variant "پوستر" — axis: typography and layout.
 * A centred, poster-sized headline whose middle word rotates through real client types,
 * and a slow strip of live projects underneath.
 */
const words = ['کلینیک', 'آموزشگاه', 'فروشگاه', 'شرکت', 'کسب‌وکار'];

function RotatingWord() {
  const ref = useRef<HTMLSpanElement>(null);
  const onScreen = useOnScreen(ref);
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!onScreen) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setI((v) => (v + 1) % words.length);
    }, 2400);
    return () => clearInterval(id);
  }, [onScreen]);
  return (
    <span className="ed-word" ref={ref}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.mark
          key={words[i]}
          className="marker ed-marker"
          initial={{ opacity: 0, transform: 'translateY(0.35em)', filter: 'blur(8px)' }}
          animate={{ opacity: 1, transform: 'translateY(0em)', filter: 'blur(0px)' }}
          exit={{ opacity: 0, transform: 'translateY(-0.35em)', filter: 'blur(8px)', transition: { duration: 0.2, ease: EASE_OUT } }}
          transition={{ duration: 0.45, ease: EASE_OUT }}
        >
          {words[i]}
        </motion.mark>
      </AnimatePresence>
    </span>
  );
}

export function HeroEditorial() {
  const shots = projects.filter((p) => p.cover.desktop).map((p) => ({ src: p.cover.desktop!, url: p.link?.label, name: p.name, color: p.color }));
  const strip = [...shots, ...shots];
  return (
    <section className="hero hero--ed" id="top">
      <div className="container ed">
        <p className="pill" data-enter style={{ '--i': 0 } as CSSProperties}>
          <span className="pulse" aria-hidden="true" />
          {hero.badge}
        </p>
        <h1 className="ed-title" data-enter style={{ '--i': 1 } as CSSProperties}>
          <span>سایت و اپلیکیشنِ</span>
          <RotatingWord />
          <span>شما را می‌سازم</span>
        </h1>
        <p className="ed-text" data-enter style={{ '--i': 2 } as CSSProperties}>
          {hero.text}
        </p>
        <div className="hero-ctas ed-ctas" data-enter style={{ '--i': 3 } as CSSProperties}>
          <a className="btn btn--brand btn--lg" href={whatsappWith(hero.primaryMessage)} target="_blank" rel="noopener">
            <Icon name="whatsapp" />
            {hero.primary}
          </a>
          <a className="btn btn--ghost btn--lg" href="#work">
            {hero.secondary}
            <Icon name="arrow" size={18} />
          </a>
        </div>
      </div>
      <div className="ed-strip" data-enter style={{ '--i': 4 } as CSSProperties} aria-label="چند نمونه از پروژه‌ها">
        <div className="ed-track">
          {strip.map((s, i) => (
            <figure className="ed-shot" key={i} aria-hidden={i >= shots.length || undefined}>
              <Browser src={s.src} alt={s.name} url={s.url} eager={i < 3} />
              <figcaption>
                <span style={{ background: s.color }} />
                {s.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
