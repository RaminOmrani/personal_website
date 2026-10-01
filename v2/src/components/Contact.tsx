import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import clsx from 'clsx';
import { briefMessage, contact, footer, nav, ui } from '../data/copy';
import { copyrightYear, site, whatsappWith } from '../data/site';
import { useLang } from '../i18n';
import { copyText, Marked } from '../lib';
import { Icon } from './Icon';

const { brief } = contact;

function Channels() {
  const { t } = useLang();
  const copy = async (text: string, done: string) => {
    if (await copyText(text)) toast.success(done);
    else toast.error(t(contact.copied.failed));
  };
  const items = [
    {
      id: 'call',
      icon: 'call',
      label: t(contact.channels.call),
      value: t(site.phone.display),
      href: site.phone.href,
      copy: { value: t(site.phone.copy), label: t(contact.copyLabel.phone), done: t(contact.copied.phone) },
    },
    { id: 'wa', icon: 'whatsapp', label: t(contact.channels.whatsapp), value: t(site.whatsappDisplay), href: whatsappWith(t(contact.whatsappMessage)), external: true },
    { id: 'tg', icon: 'telegram', label: t(contact.channels.telegram), value: site.telegramHandle, href: site.telegram, external: true },
    {
      id: 'mail',
      icon: 'mail',
      label: t(contact.channels.email),
      value: site.email,
      href: `mailto:${site.email}`,
      copy: { value: site.email, label: t(contact.copyLabel.email), done: t(contact.copied.email) },
    },
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
            <span className="channel-value" dir="ltr">
              {c.value}
            </span>
          </span>
          {c.copy ? (
            <button type="button" className="icon-btn icon-btn--sm channel-copy" onClick={() => copy(c.copy.value, c.copy.done)} aria-label={c.copy.label}>
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
  const { t, lang } = useLang();
  const [need, setNeed] = useState<string | null>(null);
  const [budget, setBudget] = useState<string | null>(null);
  const [name, setName] = useState('');

  const needSay = brief.needs.find((n) => n.id === need)?.say;
  const budgetSay = brief.budgets.find((b) => b.id === budget)?.say;
  const message = briefMessage[lang](name.trim(), needSay ? t(needSay) : null, budgetSay ? t(budgetSay) : null);

  const sendTelegram = async () => {
    const ok = await copyText(message);
    if (ok) toast.success(t(brief.copied));
    window.open(site.telegram, '_blank', 'noopener');
  };

  return (
    <div className="brief" data-reveal>
      <h3>{t(brief.title)}</h3>
      <fieldset className="brief-group">
        <legend>{t(brief.need)}</legend>
        <div className="options">
          {brief.needs.map((n) => (
            <label key={n.id} className="option">
              <input type="radio" name="need" value={n.id} checked={need === n.id} onChange={() => setNeed(n.id)} />
              <span>{t(n.label)}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset className="brief-group">
        <legend>{t(brief.budget)}</legend>
        <div className="options">
          {brief.budgets.map((b) => (
            <label key={b.id} className="option">
              <input type="radio" name="budget" value={b.id} checked={budget === b.id} onChange={() => setBudget(b.id)} />
              <span>{t(b.label)}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <label className="brief-name">
        <span>{t(brief.name)}</span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t(brief.namePlaceholder)}
          autoComplete="given-name"
          enterKeyHint="done"
          maxLength={40}
        />
      </label>
      <div className="brief-preview" aria-live="polite">
        <span className="brief-preview-label">{t(brief.preview)}</span>
        <p className="bubble">{message}</p>
      </div>
      <div className="brief-actions">
        <a className="btn btn--whatsapp btn--lg" href={whatsappWith(message)} target="_blank" rel="noopener">
          <Icon name="whatsapp" />
          {t(brief.send)}
        </a>
        <button type="button" className="btn btn--telegram btn--lg" onClick={sendTelegram}>
          <Icon name="telegram" />
          {t(brief.sendTelegram)}
        </button>
      </div>
    </div>
  );
}

export function Contact() {
  const { t } = useLang();
  return (
    <section className="section contact" id="contact">
      <div className="container">
        <div className="contact-card">
          <header className="section-head" data-reveal>
            <p className="eyebrow">{t(contact.eyebrow)}</p>
            <h2>
              <Marked text={t(contact.title)} />
            </h2>
            <p className="section-text">{t(contact.text)}</p>
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
  const { t, lang } = useLang();
  const name = t(site.name);
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <img className="brand-mark" src="brand-mark.svg" alt="" width={40} height={40} aria-hidden="true" />
          <div>
            <strong>{name}</strong>
            <p>
              {t(footer.line)} · {t(site.city)}
            </p>
          </div>
        </div>
        <nav className="footer-nav" aria-label={t(footer.links)}>
          {nav.map((n) => (
            <a key={n.href} href={n.href}>
              {t(n.label)}
            </a>
          ))}
          <a href="#contact">{t(ui.contact)}</a>
        </nav>
        <div className="footer-contact">
          <a href={site.phone.href} dir="ltr">
            {t(site.phone.display)}
          </a>
          <a href={site.whatsapp} target="_blank" rel="noopener" aria-label={t(contact.channels.whatsapp)}>
            <Icon name="whatsapp" />
          </a>
          <a href={site.telegram} target="_blank" rel="noopener" aria-label={t(contact.channels.telegram)}>
            <Icon name="telegram" />
          </a>
          <a href={site.socials[0].href} target="_blank" rel="noopener" aria-label={t('گیت‌هاب', 'GitHub')}>
            <Icon name="github" />
          </a>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">
            © {copyrightYear(lang)} {name}. {t(footer.rights)}
          </p>
          <a className="footer-versions" href="../?choose">
            {t(footer.versions)}
          </a>
        </div>
      </div>
    </footer>
  );
}

/**
 * Phone-only action bar: appears once the hero's buttons have scrolled away,
 * and steps aside when the contact section (which has the same buttons) is on screen.
 */
export function MobileBar({ hidden }: { hidden: boolean }) {
  const { t } = useLang();
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
  const phone = t(site.phone.display);
  return (
    <div className={clsx('mobile-bar')} data-show={show || undefined} aria-hidden={!show} inert={!show}>
      <a className="btn btn--ghost" href={site.phone.href} aria-label={t(`تماس با ${phone}`, `Call ${phone}`)}>
        <Icon name="call" size={18} />
        {t(ui.call)}
      </a>
      <a className="btn btn--whatsapp" href={whatsappWith(t(ui.consultMessage))} target="_blank" rel="noopener">
        <Icon name="whatsapp" />
        {/* its own box, so a long label ellipsizes instead of pushing the icon out */}
        <span>{t('مشاورهٔ رایگان در واتس‌اپ', 'Free advice on WhatsApp')}</span>
      </a>
    </div>
  );
}
