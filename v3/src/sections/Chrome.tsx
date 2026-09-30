import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'motion/react';
import { useCopy } from '../data/copy';
import { useSite, whatsappWith } from '../data/site';
import { otherPage, rememberLang, useLang } from '../i18n';
import { lockScroll, scrollToTarget } from '../lib/scroll';
import { Icon } from '../ui/Icon';
import { Logo } from '../ui/Logo';

const go = (href: string) => (e: React.MouseEvent) => {
  e.preventDefault();
  scrollToTarget(href);
};

/**
 * FA / EN: a link to the same page in the other language (the two pages sit side by side),
 * which also remembers the choice for the site's version chooser.
 */
export function LangSwitch({ className }: { className?: string }) {
  const lang = useLang();
  const { ui } = useCopy();
  const other = otherPage(lang);
  return (
    <a className={clsx('lang-switch', className)} href={other.href} hrefLang={other.lang} aria-label={ui.langSwitch} onClick={() => rememberLang(other.lang)}>
      <span className="lang-opt" data-on={lang === 'fa' || undefined} aria-hidden="true">
        FA
      </span>
      <span className="lang-opt" data-on={lang === 'en' || undefined} aria-hidden="true">
        EN
      </span>
    </a>
  );
}

/** Floating glass header; on phones a menu button opens a full-screen sheet. */
export function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const { nav, ui } = useCopy();
  const site = useSite();

  useEffect(() => {
    const on = () => setSolid(scrollY > 40);
    on();
    addEventListener('scroll', on, { passive: true });
    return () => removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    lockScroll(open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header className="header" data-solid={solid || undefined}>
        <div className="header-pill glass">
          <a className="brand" href="#top" onClick={go('#top')} aria-label={ui.home(site.name)}>
            <Logo size={42} />
          </a>
          <nav className="header-nav" aria-label={ui.sections}>
            {nav.map((n) => (
              <a key={n.href} href={n.href} onClick={go(n.href)}>
                {n.label}
              </a>
            ))}
          </nav>
          <LangSwitch className="header-lang" />
          <a className="btn btn--primary btn--sm header-cta" href={whatsappWith(ui.ctaMessage)} target="_blank" rel="noopener">
            <Icon name="whatsapp" size={17} />
            {ui.cta}
          </a>
          <button type="button" className="icon-btn header-menu" aria-label={ui.openMenu} aria-expanded={open} onClick={() => setOpen(true)}>
            <Icon name="menu" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="menu"
            role="dialog"
            aria-modal="true"
            aria-label={ui.menu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.18 } }}
            transition={{ duration: 0.25 }}
          >
            <LangSwitch className="menu-lang" />
            <button type="button" className="icon-btn menu-close" aria-label={ui.closeMenu} onClick={() => setOpen(false)} autoFocus>
              <Icon name="close" />
            </button>
            <nav className="menu-links">
              {[{ href: '#top', label: ui.top }, ...nav, { href: '#contact', label: ui.contact }].map((n, i) => (
                <motion.a
                  key={n.href}
                  href={n.href}
                  onClick={(e) => {
                    setOpen(false);
                    go(n.href)(e);
                  }}
                  initial={{ opacity: 0, transform: 'translateY(18px)' }}
                  animate={{ opacity: 1, transform: 'translateY(0px)' }}
                  transition={{ delay: 0.04 + i * 0.045, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                >
                  {n.label}
                </motion.a>
              ))}
            </nav>
            <div className="menu-contact">
              <a className="btn btn--whatsapp btn--lg" href={whatsappWith(ui.ctaMessage)} target="_blank" rel="noopener">
                <Icon name="whatsapp" />
                {ui.whatsapp}
              </a>
              <a className="btn btn--telegram btn--lg" href={site.telegram.href} target="_blank" rel="noopener">
                <Icon name="telegram" />
                {ui.telegram}
              </a>
              <a className="btn btn--glass btn--lg menu-call" href={site.phone.href}>
                <Icon name="call" size={18} />
                <span dir="ltr">{site.phone.display}</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/**
 * Phone-only dock: call, WhatsApp and Telegram always one tap away,
 * once the hero's own buttons are gone, and out of the way at the contact section.
 */
export function Dock({ hidden }: { hidden: boolean }) {
  const [past, setPast] = useState(false);
  const [atContact, setAtContact] = useState(false);
  const { ui } = useCopy();
  const site = useSite();
  useEffect(() => {
    const on = () => setPast(scrollY > innerHeight * 0.6);
    on();
    addEventListener('scroll', on, { passive: true });
    const c = document.getElementById('contact');
    const io = c ? new IntersectionObserver(([e]) => setAtContact(e.isIntersecting), { rootMargin: '0px 0px -35% 0px' }) : null;
    if (c && io) io.observe(c);
    return () => {
      removeEventListener('scroll', on);
      io?.disconnect();
    };
  }, []);
  const show = past && !atContact && !hidden;
  return (
    <nav className="dock glass" data-show={show || undefined} aria-label={ui.quick} aria-hidden={!show} inert={!show}>
      <a href={site.phone.href} className="dock-btn" aria-label={ui.callTo(site.phone.display)}>
        <Icon name="call" size={20} />
        <span>{ui.call}</span>
      </a>
      <a href={whatsappWith(ui.ctaMessage)} target="_blank" rel="noopener" className="dock-btn dock-btn--wa">
        <Icon name="whatsapp" size={22} />
        <span>{ui.freeConsult}</span>
      </a>
      <a href={site.telegram.href} target="_blank" rel="noopener" className="dock-btn" aria-label={ui.telegram}>
        <Icon name="telegram" size={20} />
        <span>{ui.telegram}</span>
      </a>
    </nav>
  );
}
