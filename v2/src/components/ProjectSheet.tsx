import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Drawer } from 'vaul';
import { projects, type Project, type Screen } from '../data/projects';
import { site, whatsappWith } from '../data/site';
import { Browser, Phone } from './Devices';
import { Icon } from './Icon';
import { MiliChat, TelegramChat } from './LiveDemos';

type Slide = { kind: 'screen'; screen: Screen } | { kind: 'live'; live: 'telegram' | 'mili'; caption: string };

/** Native scroll-snap carousel — the browser's own physics beat a hand-rolled one. */
function Gallery({ slides, name }: { slides: Slide[]; name: string }) {
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
      <div className="gallery" ref={ref} tabIndex={0} role="region" aria-label={`تصاویر ${name}`}>
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
        <button type="button" className="icon-btn" onClick={() => step(-1)} aria-label="تصویر قبلی">
          <Icon name="chevron" style={{ transform: 'scaleX(-1)' }} />
        </button>
        <button type="button" className="icon-btn" onClick={() => step(1)} aria-label="تصویر بعدی">
          <Icon name="chevron" />
        </button>
      </div>
    </div>
  );
}

function CaseStudy({ p, onOpen }: { p: Project; onOpen: (slug: string) => void }) {
  const next = projects[(projects.findIndex((x) => x.slug === p.slug) + 1) % projects.length];
  const slides: Slide[] = [
    ...(p.live === 'telegram' ? [{ kind: 'live' as const, live: 'telegram' as const, caption: 'منوی اصلی ربات در تلگرام' }] : []),
    ...p.screens.map((screen) => ({ kind: 'screen' as const, screen })),
    ...(p.live === 'mili' ? [{ kind: 'live' as const, live: 'mili' as const, caption: 'دستیار هوشمند میلی' }] : []),
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
            <a className="btn btn--ghost btn--sm" href={p.link.href} target="_blank" rel="noopener">
              <span className="hide-sm">مشاهدهٔ نسخهٔ زنده</span>
              <Icon name="external" size={16} />
            </a>
          )}
          <Drawer.Close className="icon-btn" aria-label="بستن">
            <Icon name="close" />
          </Drawer.Close>
        </div>
      </header>

      <div className="case-hero">
        {p.cover.desktop && <Browser src={p.cover.desktop} alt={`${p.name} — نسخهٔ دسکتاپ`} url={p.link?.label} className="case-browser" eager />}
        {p.live === 'telegram' ? (
          <Phone className="case-phone">
            <TelegramChat />
          </Phone>
        ) : (
          p.cover.phone && <Phone src={p.cover.phone} alt={`${p.name} — نسخهٔ موبایل`} className="case-phone" eager />
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
            مشکل چه بود؟
          </h3>
          <p>{p.problem}</p>
        </section>
        <section>
          <h3>
            <span className="dot dot--ok" aria-hidden="true" />
            چه ساختم؟
          </h3>
          <p>{p.solution}</p>
        </section>
      </div>

      <h3 className="case-h">امکانات</h3>
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

      <h3 className="case-h">صفحه‌ها و محیط {p.live === 'telegram' ? 'ربات' : 'برنامه'}</h3>
      <Gallery slides={slides} name={p.name} />

      <dl className="case-meta">
        <div>
          <dt>کارفرما</dt>
          <dd>{p.client}</dd>
        </div>
        <div>
          <dt>کار من</dt>
          <dd>{p.role}</dd>
        </div>
        <div className="case-meta-wide">
          <dt>تکنولوژی‌ها</dt>
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
          <strong>یک پروژهٔ شبیه این می‌خواهید؟</strong>
          <p>بگویید برای چه کسب‌وکاری؛ مشاورهٔ اول رایگان است.</p>
        </div>
        <div className="case-cta-actions">
          <a className="btn btn--whatsapp" href={whatsappWith(`سلام رامین، پروژه‌ای شبیه «${p.name}» می‌خواهم.`)} target="_blank" rel="noopener">
            <Icon name="whatsapp" />
            پیام در واتس‌اپ
          </a>
          <a className="btn btn--ghost" href={site.phone.href}>
            <Icon name="call" size={18} />
            تماس
          </a>
        </div>
      </div>

      <button type="button" className="case-next" onClick={() => onOpen(next.slug)}>
        <span>پروژهٔ بعدی</span>
        <strong>{next.name}</strong>
        <Icon name="arrow" />
      </button>
    </article>
  );
}

export function ProjectSheet({ slug, onClose, onOpen }: { slug: string | null; onClose: () => void; onOpen: (slug: string) => void }) {
  const current = projects.find((p) => p.slug === slug) ?? null;
  // keep the last project mounted while the sheet animates closed
  const [shown, setShown] = useState<Project | null>(current);
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (current) {
      setShown(current);
      scrollRef.current?.scrollTo({ top: 0 });
    }
  }, [current]);

  return (
    <Drawer.Root open={!!current} onOpenChange={(o) => !o && onClose()} shouldScaleBackground>
      <Drawer.Portal>
        <Drawer.Overlay className="sheet-overlay" />
        <Drawer.Content className="sheet sheet--project" aria-describedby={undefined}>
          <Drawer.Handle className="sheet-handle" />
          <div className="sheet-scroll" ref={scrollRef}>
            {shown && <CaseStudy p={shown} onOpen={onOpen} />}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
