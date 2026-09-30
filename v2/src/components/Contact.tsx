import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import clsx from 'clsx';
import { contact, nav } from '../data/copy';
import { jalaliYear, site, whatsappWith } from '../data/site';
import { copyText, Marked } from '../lib';
import { Icon } from './Icon';

const { brief } = contact;

async function copy(text: string, what: string) {
  if (await copyText(text)) toast.success(`${what} کپی شد`);
  else toast.error('کپی نشد؛ لطفاً دستی کپی کنید');
}

function Channels() {
  const items = [
    { id: 'call', icon: 'call', label: contact.channels.call, value: site.phone.display, href: site.phone.href, copyValue: '0' + site.phone.href.slice(-10), ltr: true },
    { id: 'wa', icon: 'whatsapp', label: contact.channels.whatsapp, value: 'شروع گفت‌وگو', href: whatsappWith('سلام رامین، برای یک پروژه پیام می‌دهم.'), external: true },
    { id: 'tg', icon: 'telegram', label: contact.channels.telegram, value: 'پیام در تلگرام', href: site.telegram, external: true },
    { id: 'mail', icon: 'mail', label: contact.channels.email, value: site.email, href: `mailto:${site.email}`, copyValue: site.email, ltr: true },
  ];
  return (
    <ul className="channels" data-reveal>
      {items.map((c) => (
        <li key={c.id} className={`channel channel--${c.id}`}>
          <span className="channel-icon">
            <Icon name={c.icon} size={22} />
          </span>
          <span className="channel-text">
            <a className="channel-link" href={c.href} {...(c.external ? { target: '_blank', rel: 'noopener' } : {})}>
              {c.label}
            </a>
            <span className="channel-value" dir={c.ltr ? 'ltr' : undefined}>
              {c.value}
            </span>
          </span>
          {c.copyValue ? (
            <button type="button" className="icon-btn icon-btn--sm channel-copy" onClick={() => copy(c.copyValue!, c.label === contact.channels.call ? 'شماره' : 'ایمیل')} aria-label={`کپی ${c.label}`}>
              <Icon name="copy" size={16} />
            </button>
          ) : (
            <Icon name="arrow" size={18} className="channel-arrow" />
          )}
        </li>
      ))}
    </ul>
  );
}

/** Three taps turn into a ready-to-send message, so the first contact costs nothing. */
function Brief() {
  const [need, setNeed] = useState<string | null>(null);
  const [budget, setBudget] = useState<string | null>(null);
  const [name, setName] = useState('');

  const message = [
    `سلام رامین${name.trim() ? `، ${name.trim()} هستم` : ''}.`,
    need && need !== brief.needs[brief.needs.length - 1] ? `می‌خواهم ${need} بسازم.` : 'برای یک پروژه مشاوره می‌خواهم.',
    budget && budget !== 'نمی‌دانم' ? `بودجه‌ام تقریباً ${budget} است.` : '',
  ]
    .filter(Boolean)
    .join(' ');

  const sendTelegram = async () => {
    const ok = await copyText(message);
    if (ok) toast.success(brief.copied);
    window.open(site.telegram, '_blank', 'noopener');
  };

  return (
    <div className="brief" data-reveal>
      <h3>{brief.title}</h3>
      <fieldset className="brief-group">
        <legend>{brief.need}</legend>
        <div className="options">
          {brief.needs.map((n) => (
            <label key={n} className="option">
              <input type="radio" name="need" value={n} checked={need === n} onChange={() => setNeed(n)} />
              <span>{n}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset className="brief-group">
        <legend>{brief.budget}</legend>
        <div className="options">
          {brief.budgets.map((b) => (
            <label key={b} className="option">
              <input type="radio" name="budget" value={b} checked={budget === b} onChange={() => setBudget(b)} />
              <span>{b}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <label className="brief-name">
        <span>{brief.name}</span>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={brief.namePlaceholder} autoComplete="given-name" enterKeyHint="done" maxLength={40} />
      </label>
      <div className="brief-preview" aria-live="polite">
        <span className="brief-preview-label">پیش‌نمایش پیام</span>
        <p className="bubble">{message}</p>
      </div>
      <div className="brief-actions">
        <a className="btn btn--whatsapp btn--lg" href={whatsappWith(message)} target="_blank" rel="noopener">
          <Icon name="whatsapp" />
          {brief.send}
        </a>
        <button type="button" className="btn btn--telegram btn--lg" onClick={sendTelegram}>
          <Icon name="telegram" />
          {brief.sendTelegram}
        </button>
      </div>
    </div>
  );
}

export function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="container">
        <div className="contact-card">
          <header className="section-head" data-reveal>
            <p className="eyebrow">{contact.eyebrow}</p>
            <h2>
              <Marked text={contact.title} />
            </h2>
            <p className="section-text">{contact.text}</p>
          </header>
          <div className="contact-grid">
            <Channels />
            <Brief />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="brand-mark" aria-hidden="true">
            ر
          </span>
          <div>
            <strong>{site.name}</strong>
            <p>طراحی و ساخت سایت، اپلیکیشن، CRM و ربات تلگرام · {site.city}</p>
          </div>
        </div>
        <nav className="footer-nav" aria-label="لینک‌های پایین صفحه">
          {nav.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
          <a href="#contact">تماس</a>
        </nav>
        <div className="footer-contact">
          <a href={site.phone.href} dir="ltr">
            {site.phone.display}
          </a>
          <a href={site.whatsapp} target="_blank" rel="noopener" aria-label="واتس‌اپ">
            <Icon name="whatsapp" />
          </a>
          <a href={site.telegram} target="_blank" rel="noopener" aria-label="تلگرام">
            <Icon name="telegram" />
          </a>
          <a href={site.socials[0].href} target="_blank" rel="noopener" aria-label="گیت‌هاب">
            <Icon name="github" />
          </a>
        </div>
        <p className="footer-copy">
          © {jalaliYear()} {site.name}. همهٔ پروژه‌ها با اجازهٔ کارفرما نمایش داده شده‌اند.
        </p>
      </div>
    </footer>
  );
}

/**
 * Phone-only action bar: appears once the hero's buttons have scrolled away,
 * and steps aside when the contact section (which has the same buttons) is on screen.
 */
export function MobileBar({ hidden }: { hidden: boolean }) {
  const [past, setPast] = useState(false);
  const [atContact, setAtContact] = useState(false);
  useEffect(() => {
    const hero = document.querySelector('.hero-ctas');
    const contactEl = document.getElementById('contact');
    const ios: IntersectionObserver[] = [];
    if (hero) {
      const io = new IntersectionObserver(([e]) => setPast(!e.isIntersecting && e.boundingClientRect.top < 0));
      io.observe(hero);
      ios.push(io);
    }
    if (contactEl) {
      const io = new IntersectionObserver(([e]) => setAtContact(e.isIntersecting), { rootMargin: '0px 0px -30% 0px' });
      io.observe(contactEl);
      ios.push(io);
    }
    return () => ios.forEach((io) => io.disconnect());
  }, []);
  const show = past && !atContact && !hidden;
  return (
    <div className={clsx('mobile-bar')} data-show={show || undefined} aria-hidden={!show} inert={!show}>
      <a className="btn btn--ghost" href={site.phone.href} aria-label={`تماس با ${site.phone.display}`}>
        <Icon name="call" size={18} />
        تماس
      </a>
      <a className="btn btn--whatsapp" href={whatsappWith('سلام رامین، برای یک پروژه مشاوره می‌خواهم.')} target="_blank" rel="noopener">
        <Icon name="whatsapp" />
        مشاورهٔ رایگان در واتس‌اپ
      </a>
    </div>
  );
}
