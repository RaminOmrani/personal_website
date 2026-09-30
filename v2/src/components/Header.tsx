import { useEffect, useState } from 'react';
import { Drawer } from 'vaul';
import { nav, ui } from '../data/copy';
import { site, whatsappWith } from '../data/site';
import { useLang } from '../i18n';
import { Icon } from './Icon';
import { LangSwitch } from './LangSwitch';

export function Header() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const name = t(site.name);
  const consult = whatsappWith(t(ui.consultMessage));

  return (
    <header className="header" data-scrolled={scrolled || undefined}>
      <div className="header-inner">
        <a className="brand" href="#top" aria-label={`${name} — ${t('صفحهٔ اصلی', 'home')}`}>
          <span className="brand-mark" aria-hidden="true">
            {t('ر', 'R')}
          </span>
          <span className="brand-text">
            <strong>{name}</strong>
            <small>{t(site.role)}</small>
          </span>
        </a>

        <nav className="header-nav" aria-label={t('بخش‌های سایت', 'Site sections')}>
          {nav.map((n) => (
            <a key={n.href} href={n.href}>
              {t(n.label)}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a className="header-phone" href={site.phone.href} dir="ltr">
            <Icon name="call" size={16} />
            {t(site.phone.display)}
          </a>
          <LangSwitch />
          <a className="btn btn--brand btn--sm header-cta" href={consult} target="_blank" rel="noopener">
            {t(ui.freeConsult)}
          </a>
          <Drawer.Root open={menu} onOpenChange={setMenu}>
            <Drawer.Trigger className="icon-btn header-menu" aria-label={t('باز کردن منو', 'Open menu')}>
              <Icon name="menu" />
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay className="sheet-overlay" />
              <Drawer.Content className="sheet sheet--menu" aria-describedby={undefined}>
                <Drawer.Handle className="sheet-handle" />
                <Drawer.Title className="sr-only">{t('منو', 'Menu')}</Drawer.Title>
                <nav className="menu-links" aria-label={t('منوی موبایل', 'Mobile menu')}>
                  {[{ href: '#top', label: ui.home }, ...nav, { href: '#contact', label: ui.contact }].map((n) => (
                    <a key={n.href} href={n.href} onClick={() => setMenu(false)}>
                      {t(n.label)}
                      <Icon name="chevron" size={18} />
                    </a>
                  ))}
                </nav>
                <div className="menu-lang">
                  <span>{t(ui.language)}</span>
                  <LangSwitch />
                </div>
                <div className="menu-contact">
                  <a className="btn btn--whatsapp" href={consult} target="_blank" rel="noopener">
                    <Icon name="whatsapp" />
                    {t(ui.messageWhatsapp)}
                  </a>
                  <a className="btn btn--ghost" href={site.phone.href}>
                    <Icon name="call" size={18} />
                    <span dir="ltr">{t(site.phone.display)}</span>
                  </a>
                </div>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </div>
      </div>
    </header>
  );
}
