import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { animate, motion, useMotionValue, useTransform } from 'motion/react';
import { Accordion } from '@base-ui/react/accordion';
import { about, clients, faq, nameCard, process, services, stats, toolkit } from '../data/copy';
import { site, whatsappWith } from '../data/site';
import { Marked } from '../lib';
import { Icon } from './Icon';

const d = (i: number) => ({ '--d': i }) as CSSProperties;

export function Clients() {
  return (
    <section className="clients" aria-label={clients.title}>
      <div className="container clients-inner" data-reveal>
        <p className="clients-title">{clients.title}</p>
        <ul className="clients-list">
          {clients.items.map((c) => (
            <li key={c.name}>
              <img src={c.logo} alt="" width={32} height={32} loading="lazy" />
              {c.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <header className="section-head" data-reveal>
          <p className="eyebrow">{services.eyebrow}</p>
          <h2>
            <Marked text={services.title} />
          </h2>
          <p className="section-text">{services.text}</p>
        </header>
        <div className="services">
          {services.items.map((s, i) => (
            <article key={s.title} className={i < 2 ? 'service service--main' : 'service'} data-reveal style={d(i)}>
              <span className="service-icon">
                <Icon name={s.icon} size={24} />
              </span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <ul className="ticks">
                {s.points.map((p) => (
                  <li key={p}>
                    <Icon name="check" size={16} />
                    {p}
                  </li>
                ))}
              </ul>
              <div className="service-foot">
                <p className="service-for">
                  <span>مناسب برای</span> {s.for.join('، ')}
                </p>
                <a className="link-arrow" href={whatsappWith(`سلام رامین، دربارهٔ «${s.title}» سؤال دارم.`)} target="_blank" rel="noopener">
                  بپرسید
                  <Icon name="arrow" size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Tiny product moments. Each plays once, in CSS, when its tile scrolls into view. */
function ToolUI({ id }: { id: string }) {
  switch (id) {
    case 'pay':
      return (
        <div className="ui ui-pay" aria-hidden="true">
          <div className="ui-pay-row">
            <span>جلسهٔ کاردرمانی</span>
            <b>۶۵۰٬۰۰۰ تومان</b>
          </div>
          <div className="ui-pay-btn">
            <span className="ui-swap-a">پرداخت آنلاین</span>
            <span className="ui-swap-b">
              <Icon name="check" size={16} /> پرداخت موفق
            </span>
          </div>
        </div>
      );
    case 'sms':
      return (
        <div className="ui ui-sms" aria-hidden="true">
          <div className="ui-sms-msg">
            <Icon name="sms" size={16} />
            <span>
              <b>ذهن سبز</b> کد ورود شما: <span dir="ltr">۴۸۲۱۹</span>
            </span>
          </div>
          <div className="ui-sms-msg">
            <Icon name="bell" size={16} />
            <span>
              <b>یادآوری</b> جلسهٔ امروز ساعت ۱۶:۳۰
            </span>
          </div>
        </div>
      );
    case 'calendar': {
      const days = Array.from({ length: 21 }, (_, i) => (i + 8).toLocaleString('fa-IR'));
      return (
        <div className="ui ui-cal" aria-hidden="true">
          <div className="ui-cal-head">
            <b>مهر ۱۴۰۵</b>
            <span>نوبت آزاد</span>
          </div>
          <div className="ui-cal-grid">
            {days.map((day, i) => (
              <span key={day} className={i === 11 ? 'is-picked' : i % 5 === 2 ? 'is-busy' : undefined}>
                {day}
              </span>
            ))}
          </div>
        </div>
      );
    }
    case 'install':
      return (
        <div className="ui ui-install" aria-hidden="true">
          <div className="ui-install-grid">
            <i />
            <i />
            <i />
            <span className="ui-install-app">
              <img src="logos/zehnesabz.png" alt="" width={40} height={40} loading="lazy" />
            </span>
            <i />
            <i />
            <i />
            <i />
          </div>
          <span className="ui-install-toast">
            <Icon name="plus" size={14} /> به صفحهٔ اصلی اضافه شد
          </span>
        </div>
      );
    case 'seo':
      return (
        <div className="ui ui-seo" aria-hidden="true">
          <div className="ui-seo-bar">
            <Icon name="search" size={15} />
            <span className="ui-seo-q">کاردرمانی مشهد</span>
          </div>
          <div className="ui-seo-hit">
            <span className="ui-seo-rank">۱</span>
            <span>
              <small dir="ltr">zehnesabz.com</small>
              <b>کلینیک کاردرمانی ذهن سبز</b>
            </span>
          </div>
        </div>
      );
    default:
      return (
        <div className="ui ui-secure" aria-hidden="true">
          <div className="ui-secure-url">
            <Icon name="lock" size={14} />
            <span dir="ltr">https://your-site.ir</span>
          </div>
          <div className="ui-secure-job">
            <span>بک‌آپ شبانه</span>
            <span className="ui-secure-bar">
              <i />
            </span>
            <span className="ui-secure-ok">
              <Icon name="check" size={14} />
            </span>
          </div>
        </div>
      );
  }
}

export function Toolkit() {
  return (
    <section className="section section--tint">
      <div className="container">
        <header className="section-head" data-reveal>
          <p className="eyebrow">{toolkit.eyebrow}</p>
          <h2>
            <Marked text={toolkit.title} />
          </h2>
          <p className="section-text">{toolkit.text}</p>
        </header>
        <ul className="tools">
          {toolkit.items.map((t, i) => (
            <li key={t.id} className="tool" data-reveal style={d(i % 3)}>
              <ToolUI id={t.id} />
              <h3>{t.title}</h3>
              <p>{t.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section className="section" id="process">
      <div className="container">
        <header className="section-head section-head--center" data-reveal>
          <p className="eyebrow">{process.eyebrow}</p>
          <h2>
            <Marked text={process.title} />
          </h2>
        </header>
        <ol className="steps">
          {process.steps.map((s, i) => (
            <li key={s.title} className="step" data-reveal style={d(i)}>
              <span className="step-num">{(i + 1).toLocaleString('fa-IR')}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <p className="step-get">
                <Icon name="check" size={16} />
                {s.get}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const fa = (n: number) => Math.round(n).toLocaleString('fa-IR');

/** One number that counts up in Persian digits. Server HTML carries the final value. */
function CountUp({ value, suffix, run }: { value: number; suffix: string; run: boolean | null }) {
  const mv = useMotionValue(value);
  const text = useTransform(mv, (v) => fa(v) + suffix);
  useEffect(() => {
    if (run === false) mv.set(0);
    if (run) {
      const c = animate(mv, value, { duration: 1.4, ease: [0.23, 1, 0.32, 1] });
      return () => c.stop();
    }
  }, [run, mv, value]);
  return <motion.span>{text}</motion.span>;
}

/** Numbers count up the first time they scroll into view. */
export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  // null: leave the server-rendered numbers alone; false: waiting; true: counting
  const [run, setRun] = useState<boolean | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = el.getBoundingClientRect();
    if (r.top < innerHeight && r.bottom > 0) return; // already visible: keep the real numbers
    setRun(false);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRun(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -20% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div className="container">
      <div className="stats" ref={ref}>
        {stats.map((s) => (
          <div key={s.label} className="stat">
            <strong aria-label={fa(s.value) + s.suffix}>
              <CountUp value={s.value} suffix={s.suffix} run={run} />
            </strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function About() {
  return (
    <section className="section" id="about">
      <div className="container about">
        <aside className="profile" data-reveal>
          <div className="profile-avatar">
            <img src="me/me-face.webp" alt={site.name} width={84} height={84} loading="lazy" />
          </div>
          <strong className="profile-name">{site.name}</strong>
          <span className="profile-role">برنامه‌نویس فول‌استک و هوش مصنوعی</span>
          <p className="profile-now">
            <span className="pulse" aria-hidden="true" />
            {about.now}
          </p>
          <ul className="chips">
            {about.chips.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <div className="profile-links">
            <a className="icon-btn" href={site.socials[0].href} target="_blank" rel="noopener" aria-label="گیت‌هاب">
              <Icon name="github" />
            </a>
            <a className="icon-btn" href={site.socials[1].href} target="_blank" rel="noopener" aria-label="لینکدین">
              <Icon name="linkedin" />
            </a>
            <a className="icon-btn" href={`mailto:${site.email}`} aria-label="ایمیل">
              <Icon name="mail" />
            </a>
          </div>
        </aside>
        <div className="about-text" data-reveal style={d(1)}>
          <p className="eyebrow">{about.eyebrow}</p>
          <h2>
            <Marked text={`${about.hello}؛ {یک نفر} از ایده تا اجرا`} />
          </h2>
          {about.text.map((t) => (
            <p key={t}>{t}</p>
          ))}
          <figure className="namecard">
            <div className="namecard-head">
              <strong className="namecard-word">{nameCard.word}</strong>
              <span className="namecard-phon" dir="ltr">
                {nameCard.phonetic}
              </span>
              <span className="namecard-kind">{nameCard.kind}</span>
            </div>
            <ol className="namecard-defs">
              {nameCard.meanings.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ol>
            <figcaption className="namecard-note">
              <mark>{nameCard.note}</mark>
            </figcaption>
          </figure>
          <div className="about-proof">
            <Icon name="trophy" size={20} />
            <span>
              مقالهٔ علمی منتشرشده در مجلهٔ <b dir="ltr">Q1 Springer</b> · مدل هوش مصنوعی برای پیش‌بینی
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section className="section" id="faq">
      <div className="container faq">
        <header className="section-head faq-head" data-reveal>
          <p className="eyebrow">{faq.eyebrow}</p>
          <h2>
            <Marked text={faq.title} />
          </h2>
          <div className="faq-ask">
            <p>سؤالتان اینجا نیست؟ مستقیم بپرسید؛ معمولاً همان روز جواب می‌دهم.</p>
            <a className="btn btn--whatsapp" href={whatsappWith('سلام رامین، یک سؤال داشتم:')} target="_blank" rel="noopener">
              <Icon name="whatsapp" />
              سؤال در واتس‌اپ
            </a>
          </div>
        </header>
        <Accordion.Root className="faq-list" hiddenUntilFound data-reveal style={d(1)}>
          {faq.items.map((f) => (
            <Accordion.Item key={f.q} className="faq-item">
              <Accordion.Header className="faq-q">
                <Accordion.Trigger className="faq-trigger">
                  {f.q}
                  <span className="faq-plus" aria-hidden="true">
                    <Icon name="plus" size={18} />
                  </span>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Panel className="faq-panel">
                <p>{f.a}</p>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
