import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Drawer } from 'vaul';
import { ui } from '../data/copy';
import { projects, type Project, type Screen } from '../data/projects';
import { site, whatsappWith } from '../data/site';
import { useLang } from '../i18n';
import { Browser, Phone } from './Devices';
import { Icon } from './Icon';
import { MiliChat, TelegramChat } from './LiveDemos';

type Slide = { kind: 'screen'; screen: Screen } | { kind: 'live'; live: 'telegram' | 'mili'; caption: string };

/** Native scroll-snap carousel — the browser's own physics beat a hand-rolled one. */
function Gallery({ slides, name }: { slides: Slide[]; name: string }) {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const step = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    // in RTL the track scrolls toward negative x, so "next" moves left
    const rtl = getComputedStyle(el).direction === 'rtl';
    el.scrollBy({ left: dir * (rtl ? -1 : 1) * el.clientWidth * 0.8, behavior: 'smooth' });
  };
  return (
    <div className="gallery-wrap">
      <div className="gallery" ref={ref} tabIndex={0} role="region" aria-label={t(`تصاویر ${name}`, `Screens from ${name}`)}>
        {slides.map((s, i) =>
          s.kind === 'live' ? (
            <figure className="shot shot--phone" key={`live-${i}`}>
              <Phone className="shot-phone">{s.live === 'telegram' ? <TelegramChat /> : <MiliChat />}</Phone>
              <figcaption>{s.caption}</figcaption>
            </figure>
          ) : (
            <figure className={`shot shot--${s.screen.device}`} key={s.screen.src}>
              {s.screen.device === 'desktop' ? (
                <Browser src={s.screen.src} alt={s.screen.caption} className="shot-browser" />
              ) : (
                <Phone src={s.screen.src} alt={s.screen.caption} className="shot-phone" />
              )}
              <figcaption>{s.screen.caption}</figcaption>
            </figure>
          ),
        )}
      </div>
      <div className="gallery-nav">
        <button type="button" className="icon-btn" onClick={() => step(-1)} aria-label={t('تصویر قبلی', 'Previous screen')}>
          <Icon name="chevron" style={{ transform: 'scaleX(-1)' }} />
        </button>
        <button type="button" className="icon-btn" onClick={() => step(1)} aria-label={t('تصویر بعدی', 'Next screen')}>
          <Icon name="chevron" />
        </button>
      </div>
    </div>
  );
}

function CaseStudy({ p, next, onOpen }: { p: Project; next: Project; onOpen: (slug: string) => void }) {
  const { t } = useLang();
  const slides: Slide[] = [
    ...(p.live === 'telegram' ? [{ kind: 'live' as const, live: 'telegram' as const, caption: t('منوی اصلی ربات در تلگرام', 'The bot’s main menu in Telegram') }] : []),
    ...p.screens.map((screen) => ({ kind: 'screen' as const, screen })),
    ...(p.live === 'mili' ? [{ kind: 'live' as const, live: 'mili' as const, caption: t('دستیار هوشمند میلی', 'Mili, the smart assistant') }] : []),
  ];

  return (
    <article className="case" style={{ '--tint': p.tint, '--brand': p.color } as CSSProperties}>
      <header className="case-top">
        <img className="case-logo" src={p.logo} alt="" width={48} height={48} />
        <div className="case-title">
          <Drawer.Title asChild>
            <h2>{p.name}</h2>
          </Drawer.Title>
          <p>
            {p.kind} · {p.year}
          </p>
        </div>
        <div className="case-actions">
          {p.link && (
            <a className="btn btn--ghost btn--sm" href={p.link.href} target="_blank" rel="noopener" aria-label={t(`${p.name}: مشاهدهٔ نسخهٔ زنده`, `${p.name}: view the live site`)}>
              <span className="hide-sm">{t('مشاهدهٔ نسخهٔ زنده', 'View live site')}</span>
              <Icon name="external" size={16} />
            </a>
          )}
          <Drawer.Close className="icon-btn" aria-label={t('بستن', 'Close')}>
            <Icon name="close" />
          </Drawer.Close>
        </div>
      </header>

      <div className="case-hero">
        {p.cover.desktop && (
          <Browser src={p.cover.desktop} alt={`${p.name} — ${t('نسخهٔ دسکتاپ', 'desktop version')}`} url={p.link?.label} className="case-browser" eager />
        )}
        {p.live === 'telegram' ? (
          <Phone className="case-phone">
            <TelegramChat />
          </Phone>
        ) : (
          p.cover.phone && <Phone src={p.cover.phone} alt={`${p.name} — ${t('نسخهٔ موبایل', 'mobile version')}`} className="case-phone" eager />
        )}
      </div>

      <p className="case-lead">{p.summary}</p>

      <ul className="case-facts">
        {p.facts.map((f) => (
          <li key={f.label}>
            <strong>{f.value}</strong>
            <span>{f.label}</span>
          </li>
        ))}
      </ul>

      <div className="case-story">
        <section>
          <h3>
            <span className="dot dot--warn" aria-hidden="true" />
            {t('مشکل چه بود؟', 'What was the problem?')}
          </h3>
          <p>{p.problem}</p>
        </section>
        <section>
          <h3>
            <span className="dot dot--ok" aria-hidden="true" />
            {t('چه ساختم؟', 'What I built')}
          </h3>
          <p>{p.solution}</p>
        </section>
      </div>

      <h3 className="case-h">{t('امکانات', 'What it does')}</h3>
      <ul className="case-features">
        {p.features.map((f) => (
          <li key={f.title}>
            <span className="feature-icon">
              <Icon name={f.icon} size={20} />
            </span>
            <strong>{f.title}</strong>
            <p>{f.text}</p>
          </li>
        ))}
      </ul>

      <h3 className="case-h">
        {p.live === 'telegram' ? t('صفحه‌ها و محیط ربات', 'Inside the bot') : t('صفحه‌ها و محیط برنامه', 'Pages and screens')}
      </h3>
      <Gallery slides={slides} name={p.name} />

      <dl className="case-meta">
        <div>
          <dt>{t('کارفرما', 'Client')}</dt>
          <dd>{p.client}</dd>
        </div>
        <div>
          <dt>{t('کار من', 'What I did')}</dt>
          <dd>{p.role}</dd>
        </div>
        <div className="case-meta-wide">
          <dt>{t('تکنولوژی‌ها', 'Built with')}</dt>
          <dd>
            <ul className="chips chips--sm">
              {p.stack.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>

      <div className="case-cta">
        <div>
          <strong>{t('یک پروژهٔ شبیه این می‌خواهید؟', 'Want something like this?')}</strong>
          <p>{t('بگویید برای چه کسب‌وکاری؛ مشاورهٔ اول رایگان است.', 'Tell me about your business — the first consultation is free.')}</p>
        </div>
        <div className="case-cta-actions">
          <a
            className="btn btn--whatsapp"
            href={whatsappWith(t(`سلام رامین، پروژه‌ای شبیه «${p.name}» می‌خواهم.`, `Hi Ramin, I’d like a project like “${p.name}”.`))}
            target="_blank"
            rel="noopener"
          >
            <Icon name="whatsapp" />
            {t(ui.messageWhatsapp)}
          </a>
          <a className="btn btn--ghost" href={site.phone.href}>
            <Icon name="call" size={18} />
            {t(ui.call)}
          </a>
        </div>
      </div>

      <button type="button" className="case-next" onClick={() => onOpen(next.slug)}>
        <span>{t('پروژهٔ بعدی', 'Next project')}</span>
        <strong>{next.name}</strong>
        <Icon name="arrow" />
      </button>
    </article>
  );
}

export function ProjectSheet({ slug, onClose, onOpen }: { slug: string | null; onClose: () => void; onOpen: (slug: string) => void }) {
  const { loc } = useLang();
  const list = loc(projects);
  const current = list.find((p) => p.slug === slug) ?? null;
  // keep the last project mounted while the sheet animates closed
  const [shown, setShown] = useState<Project | null>(current);
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (current) {
      setShown(current);
      scrollRef.current?.scrollTo({ top: 0 });
    }
  }, [current]);
  const next = shown && list[(list.findIndex((x) => x.slug === shown.slug) + 1) % list.length];

  return (
    <Drawer.Root open={!!current} onOpenChange={(o) => !o && onClose()} shouldScaleBackground>
      <Drawer.Portal>
        <Drawer.Overlay className="sheet-overlay" />
        <Drawer.Content className="sheet sheet--project" aria-describedby={undefined}>
          <Drawer.Handle className="sheet-handle" />
          <div className="sheet-scroll" ref={scrollRef}>
            {shown && next && <CaseStudy p={shown} next={next} onOpen={onOpen} />}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
