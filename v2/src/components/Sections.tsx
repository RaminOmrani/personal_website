import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { animate, motion, useMotionValue, useTransform } from 'motion/react';
import { Accordion } from '@base-ui/react/accordion';
import { about, clients, faq, nameCard, process, services, stats, toolkit } from '../data/copy';
import { site, whatsappWith } from '../data/site';
import { l, useLang } from '../i18n';
import { Marked } from '../lib';
import { Icon } from './Icon';

const d = (i: number) => ({ '--d': i }) as CSSProperties;

export function Clients() {
  const { t } = useLang();
  return (
    <section className="clients" aria-label={t(clients.title)}>
      <div className="container clients-inner" data-reveal>
        <p className="clients-title">{t(clients.title)}</p>
        <ul className="clients-list">
          {clients.items.map((c) => (
            <li key={c.logo}>
              <img src={c.logo} alt="" width={32} height={32} loading="lazy" />
              {t(c.name)}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Services() {
  const { t, lang } = useLang();
  return (
    <section className="section" id="services">
      <div className="container">
        <header className="section-head" data-reveal>
          <p className="eyebrow">{t(services.eyebrow)}</p>
          <h2>
            <Marked text={t(services.title)} />
          </h2>
          <p className="section-text">{t(services.text)}</p>
        </header>
        <div className="services">
          {services.items.map((s, i) => {
            const title = t(s.title);
            return (
              <article key={s.icon} className={i < 2 ? 'service service--main' : 'service'} data-reveal style={d(i)}>
                <span className="service-icon">
                  <Icon name={s.icon} size={24} />
                </span>
                <h3>{title}</h3>
                <p>{t(s.text)}</p>
                <ul className="ticks">
                  {s.points.map((p) => (
                    <li key={p.fa}>
                      <Icon name="check" size={16} />
                      {t(p)}
                    </li>
                  ))}
                </ul>
                <div className="service-foot">
                  <p className="service-for">
                    <span>{t(services.goodFor)}</span> {s.for.map(t).join(lang === 'fa' ? '، ' : ', ')}
                  </p>
                  <a className="link-arrow" href={whatsappWith(t(services.askMessage).replace('%s', title))} target="_blank" rel="noopener">
                    {t(services.ask)}
                    <Icon name="arrow" size={16} />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Words inside the little product moments. The SMS and calendar belong to the Zehne Sabz clinic. */
const demo = {
  session: l('جلسهٔ کاردرمانی', 'Therapy session'),
  price: l('۶۵۰٬۰۰۰ تومان', '650,000 toman'),
  pay: l('پرداخت آنلاین', 'Pay online'),
  paid: l('پرداخت موفق', 'Payment received'),
  clinic: l('ذهن سبز', 'Zehne Sabz'),
  code: l('کد ورود شما:', 'Your sign-in code:'),
  reminder: l('یادآوری', 'Reminder'),
  today: l('جلسهٔ امروز ساعت ۱۶:۳۰', 'Today’s session at 4:30 pm'),
  month: l('مهر ۱۴۰۵', 'Mehr 1405'),
  free: l('نوبت آزاد', 'Free slots'),
  added: l('به صفحهٔ اصلی اضافه شد', 'Added to Home Screen'),
  query: l('کاردرمانی مشهد', 'therapy clinic mashhad'),
  result: l('کلینیک کاردرمانی ذهن سبز', 'Zehne Sabz Therapy Clinic'),
  domain: l('https://your-site.ir', 'https://your-site.com'),
  backup: l('بک‌آپ شبانه', 'Nightly backup'),
};

/** Tiny product moments. Each plays once, in CSS, when its tile scrolls into view. */
function ToolUI({ id }: { id: string }) {
  const { t, num } = useLang();
  switch (id) {
    case 'pay':
      return (
        <div className="ui ui-pay" aria-hidden="true">
          <div className="ui-pay-row">
            <span>{t(demo.session)}</span>
            <b>{t(demo.price)}</b>
          </div>
          <div className="ui-pay-btn">
            <span className="ui-swap-a">{t(demo.pay)}</span>
            <span className="ui-swap-b">
              <Icon name="check" size={16} /> {t(demo.paid)}
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
              <b>{t(demo.clinic)}</b> {t(demo.code)} <span dir="ltr">{num(48219, { useGrouping: false })}</span>
            </span>
          </div>
          <div className="ui-sms-msg">
            <Icon name="bell" size={16} />
            <span>
              <b>{t(demo.reminder)}</b> {t(demo.today)}
            </span>
          </div>
        </div>
      );
    case 'calendar': {
      const days = Array.from({ length: 21 }, (_, i) => num(i + 8));
      return (
        <div className="ui ui-cal" aria-hidden="true">
          <div className="ui-cal-head">
            <b>{t(demo.month)}</b>
            <span>{t(demo.free)}</span>
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
            <Icon name="plus" size={14} /> {t(demo.added)}
          </span>
        </div>
      );
    case 'seo':
      return (
        <div className="ui ui-seo" aria-hidden="true">
          <div className="ui-seo-bar">
            <Icon name="search" size={15} />
            <span className="ui-seo-q">{t(demo.query)}</span>
          </div>
          <div className="ui-seo-hit">
            <span className="ui-seo-rank">{num(1)}</span>
            <span>
              <small dir="ltr">zehnesabz.com</small>
              <b>{t(demo.result)}</b>
            </span>
          </div>
        </div>
      );
    default:
      return (
        <div className="ui ui-secure" aria-hidden="true">
          <div className="ui-secure-url">
            <Icon name="lock" size={14} />
            <span dir="ltr">{t(demo.domain)}</span>
          </div>
          <div className="ui-secure-job">
            <span>{t(demo.backup)}</span>
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
  const { t } = useLang();
  return (
    <section className="section section--tint">
      <div className="container">
        <header className="section-head" data-reveal>
          <p className="eyebrow">{t(toolkit.eyebrow)}</p>
          <h2>
            <Marked text={t(toolkit.title)} />
          </h2>
          <p className="section-text">{t(toolkit.text)}</p>
        </header>
        <ul className="tools">
          {toolkit.items.map((it, i) => (
            <li key={it.id} className="tool" data-reveal style={d(i % 3)}>
              <ToolUI id={it.id} />
              <h3>{t(it.title)}</h3>
              <p>{t(it.text)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Process() {
  const { t, num } = useLang();
  return (
    <section className="section" id="process">
      <div className="container">
        <header className="section-head section-head--center" data-reveal>
          <p className="eyebrow">{t(process.eyebrow)}</p>
          <h2>
            <Marked text={t(process.title)} />
          </h2>
        </header>
        <ol className="steps">
          {process.steps.map((s, i) => (
            <li key={s.title.fa} className="step" data-reveal style={d(i)}>
              <span className="step-num">{num(i + 1)}</span>
              <h3>{t(s.title)}</h3>
              <p>{t(s.text)}</p>
              <p className="step-get">
                <Icon name="check" size={16} />
                {t(s.get)}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** One number that counts up in the page's digits. Server HTML carries the final value. */
function CountUp({ value, suffix, run }: { value: number; suffix: string; run: boolean | null }) {
  const { num } = useLang();
  const mv = useMotionValue(value);
  const text = useTransform(mv, (v) => num(Math.round(v)) + suffix);
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
  const { t, num } = useLang();
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
          <div key={s.label.fa} className="stat">
            <strong aria-label={num(s.value) + s.suffix}>
              <CountUp value={s.value} suffix={s.suffix} run={run} />
            </strong>
            <span>{t(s.label)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function About() {
  const { t } = useLang();
  const name = t(site.name);
  const [proofBefore, proofAfter] = t(about.proof).split('%s');
  return (
    <section className="section" id="about">
      <div className="container about">
        <aside className="profile" data-reveal>
          <div className="profile-avatar">
            <img src="me/me-face.webp" alt={name} width={84} height={84} loading="lazy" />
          </div>
          <strong className="profile-name">{name}</strong>
          <span className="profile-role">{t(about.role)}</span>
          <p className="profile-now">
            <span className="pulse" aria-hidden="true" />
            {t(about.now)}
          </p>
          <ul className="chips">
            {about.chips.map((c) => (
              <li key={c.fa}>{t(c)}</li>
            ))}
          </ul>
          <div className="profile-links">
            <a className="icon-btn" href={site.socials[0].href} target="_blank" rel="noopener" aria-label={t('گیت‌هاب', 'GitHub')}>
              <Icon name="github" />
            </a>
            <a className="icon-btn" href={site.socials[1].href} target="_blank" rel="noopener" aria-label={t('لینکدین', 'LinkedIn')}>
              <Icon name="linkedin" />
            </a>
            <a className="icon-btn" href={`mailto:${site.email}`} aria-label={t('ایمیل', 'Email')}>
              <Icon name="mail" />
            </a>
          </div>
        </aside>
        <div className="about-text" data-reveal style={d(1)}>
          <p className="eyebrow">{t(about.eyebrow)}</p>
          <h2>
            <Marked text={t(about.title)} />
          </h2>
          {about.text.map((p) => (
            <p key={p.fa}>{t(p)}</p>
          ))}
          <figure className="namecard">
            <div className="namecard-head">
              <strong className="namecard-word">{t(nameCard.word)}</strong>
              <span className="namecard-phon" dir="ltr">
                {nameCard.phonetic}
              </span>
              <span className="namecard-kind">{t(nameCard.kind)}</span>
            </div>
            <ol className="namecard-defs">
              {nameCard.meanings.map((m) => (
                <li key={m.fa}>{t(m)}</li>
              ))}
            </ol>
            <figcaption className="namecard-note">
              <mark>{t(nameCard.note)}</mark>
            </figcaption>
          </figure>
          <div className="about-proof">
            <Icon name="trophy" size={20} />
            <span>
              {proofBefore}
              <b dir="ltr">Q1 Springer</b>
              {proofAfter}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  const { t } = useLang();
  return (
    <section className="section" id="faq">
      <div className="container faq">
        <header className="section-head faq-head" data-reveal>
          <p className="eyebrow">{t(faq.eyebrow)}</p>
          <h2>
            <Marked text={t(faq.title)} />
          </h2>
          <div className="faq-ask">
            <p>{t(faq.ask)}</p>
            <a className="btn btn--whatsapp" href={whatsappWith(t(faq.askMessage))} target="_blank" rel="noopener">
              <Icon name="whatsapp" />
              {t(faq.askButton)}
            </a>
          </div>
        </header>
        <Accordion.Root className="faq-list" hiddenUntilFound data-reveal style={d(1)}>
          {faq.items.map((f) => (
            <Accordion.Item key={f.q.fa} className="faq-item">
              <Accordion.Header className="faq-q">
                <Accordion.Trigger className="faq-trigger">
                  {t(f.q)}
                  <span className="faq-plus" aria-hidden="true">
                    <Icon name="plus" size={18} />
                  </span>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Panel className="faq-panel">
                <p>{t(f.a)}</p>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
