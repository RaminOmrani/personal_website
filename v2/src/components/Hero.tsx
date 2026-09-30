import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react';
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'motion/react';
import { hero } from '../data/copy';
import { whatsappWith } from '../data/site';
import { Marked, useOnScreen } from '../lib';
import { Browser, Phone } from './Devices';
import { Icon } from './Icon';

/** Strong ease-out (Emil Kowalski) — for everything entering the screen. */
export const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const enter = (i: number) => ({ '--i': i }) as CSSProperties;

export function HeroCopy() {
  return (
    <div className="hero-copy">
      <p className="pill" data-enter style={enter(0)}>
        <span className="pulse" aria-hidden="true" />
        {hero.badge}
      </p>
      <h1 className="hero-title" data-enter style={enter(1)}>
        <Marked text={hero.title} />
      </h1>
      <p className="hero-text" data-enter style={enter(2)}>
        {hero.text}
      </p>
      <div className="hero-ctas" data-enter style={enter(3)}>
        <a className="btn btn--brand btn--lg" href={whatsappWith(hero.primaryMessage)} target="_blank" rel="noopener">
          <Icon name="whatsapp" />
          {hero.primary}
        </a>
        <a className="btn btn--ghost btn--lg" href="#work">
          {hero.secondary}
          <Icon name="arrow" size={18} />
        </a>
      </div>
      <ul className="perks" data-enter style={enter(4)}>
        {hero.perks.map((p) => (
          <li key={p}>
            <Icon name="check" size={16} />
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Cycles through notifications of real features while the hero is on screen. */
function Notifications({ active }: { active: boolean }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!active) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setI((v) => (v + 1) % hero.notifications.length);
    }, 3400);
    return () => clearInterval(id);
  }, [active]);
  const n = hero.notifications[i];
  return (
    <div className="notif-slot" aria-live="off">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={i}
          className="notif"
          initial={{ opacity: 0, transform: 'translateY(14px) scale(0.96)' }}
          animate={{ opacity: 1, transform: 'translateY(0px) scale(1)' }}
          exit={{ opacity: 0, transform: 'translateY(-10px) scale(0.98)', transition: { duration: 0.2, ease: EASE_OUT } }}
          transition={{ duration: 0.45, ease: EASE_OUT }}
        >
          <span className="notif-icon">
            <Icon name={n.icon} size={18} />
          </span>
          <span className="notif-text">
            <strong>{n.title}</strong>
            <small>{n.sub}</small>
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/** Laptop + a phone you can grab and throw; both drift gently with the pointer. */
export function ShowcaseStage() {
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(ref);

  // pointer parallax — springs, so it has momentum instead of sticking to the cursor
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 120, damping: 20, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 120, damping: 20, mass: 0.6 });
  const bx = useTransform(sx, (v) => v * -10);
  const by = useTransform(sy, (v) => v * -8);
  const fx = useTransform(sx, (v) => v * 16);
  const fy = useTransform(sy, (v) => v * 12);
  const back = useMotionTemplate`translate3d(${bx}px, ${by}px, 0)`;
  const front = useMotionTemplate`translate3d(${fx}px, ${fy}px, 0)`;

  // the phone tilts in the direction it is dragged
  const dragX = useMotionValue(0);
  const rotate = useTransform(dragX, [-240, 240], [-9, 9]);

  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <div className="stage" ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} data-enter style={enter(2)}>
      <div className="stage-glow" aria-hidden="true" />
      <motion.div className="stage-back" style={{ transform: back }}>
        <Browser src="work/doping-video.jpg" alt="پنل دانش‌آموز دوپینگ شیمی، در حال تماشای درس" url="dopingshimi.ir/panel" eager />
      </motion.div>
      <motion.div className="stage-front" style={{ transform: front }}>
        <motion.div
          className="stage-phone"
          drag
          dragSnapToOrigin
          dragElastic={0.18}
          dragTransition={{ bounceStiffness: 260, bounceDamping: 20 }}
          whileDrag={{ scale: 1.03 }}
          style={{ x: dragX, rotate }}
          aria-label="اپلیکیشن کلینیک ذهن سبز"
        >
          <Phone src="work/zehnesabz-app-dashboard.jpg" alt="داشبورد اپلیکیشن کلینیک ذهن سبز" eager />
        </motion.div>
      </motion.div>
      <Notifications active={onScreen} />
    </div>
  );
}

export function HeroShowcase() {
  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <HeroCopy />
        <ShowcaseStage />
      </div>
    </section>
  );
}
