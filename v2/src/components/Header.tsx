import { useEffect, useState } from 'react';
import { Drawer } from 'vaul';
import { nav } from '../data/copy';
import { site, whatsappWith } from '../data/site';
import { Icon } from './Icon';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="header" data-scrolled={scrolled || undefined}>
      <div className="header-inner">
        <a className="brand" href="#top" aria-label={`${site.name} — صفحهٔ اصلی`}>
          <span className="brand-mark" aria-hidden="true">
            ر
          </span>
          <span className="brand-text">
            <strong>{site.name}</strong>
            <small>{site.role}</small>
          </span>
        </a>

        <nav className="header-nav" aria-label="بخش‌های سایت">
          {nav.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a className="header-phone" href={site.phone.href} dir="ltr">
            <Icon name="call" size={16} />
            {site.phone.display}
          </a>
          <a className="btn btn--brand btn--sm header-cta" href={whatsappWith('سلام رامین، برای یک پروژه مشاوره می‌خواهم.')} target="_blank" rel="noopener">
            مشاورهٔ رایگان
          </a>
          <Drawer.Root open={menu} onOpenChange={setMenu}>
            <Drawer.Trigger className="icon-btn header-menu" aria-label="باز کردن منو">
              <Icon name="menu" />
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay className="sheet-overlay" />
              <Drawer.Content className="sheet sheet--menu" aria-describedby={undefined}>
                <Drawer.Handle className="sheet-handle" />
                <Drawer.Title className="sr-only">منو</Drawer.Title>
                <nav className="menu-links" aria-label="منوی موبایل">
                  {[{ href: '#top', label: 'صفحهٔ اصلی' }, ...nav, { href: '#contact', label: 'تماس' }].map((n) => (
                    <a key={n.href} href={n.href} onClick={() => setMenu(false)}>
                      {n.label}
                      <Icon name="chevron" size={18} />
                    </a>
                  ))}
                </nav>
                <div className="menu-contact">
                  <a className="btn btn--whatsapp" href={whatsappWith('سلام رامین، برای یک پروژه مشاوره می‌خواهم.')} target="_blank" rel="noopener">
                    <Icon name="whatsapp" />
                    پیام در واتس‌اپ
                  </a>
                  <a className="btn btn--ghost" href={site.phone.href}>
                    <Icon name="call" size={18} />
                    <span dir="ltr">{site.phone.display}</span>
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
