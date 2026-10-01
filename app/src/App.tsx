import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { projects } from '../../v3/src/data/projects';
import { useSite } from '../../v3/src/data/site';
import { LangProvider, faDigits, type Lang } from '../../v3/src/i18n';
import { useAppCopy } from './copy';
import { useAndroidLinks } from './lib/android';
import { copyText, useOnline, useReducedMotion } from './lib/hooks';
import { setLang, useAppLang } from './lib/lang';
import { closeOverlay, goBack, goTab, onRetap, openOverlay, tabOf, tabPaths, useNav, type Motion, type Nav, type Route, type TabPath } from './lib/router';
import { Contact } from './screens/Contact';
import { Home } from './screens/Home';
import { Project } from './screens/Project';
import { Services } from './screens/Services';
import { Work } from './screens/Work';
import { LogoMark } from './ui/bits';
import { Icon } from './ui/Icon';
import { Sheet } from './ui/Sheet';
import { Toasts, toast } from './ui/Toast';

export function App() {
  const lang = useAppLang();
  return (
    <LangProvider lang={lang}>
      <Shell />
    </LangProvider>
  );
}

function Shell() {
  const nav = useNav();
  const online = useOnline();
  const t = useAppCopy();
  const detail = nav.route.name === 'project';
  return (
    <div className="app" data-detail={detail || undefined}>
      <AppBar nav={nav} />
      {!online && (
        <p className="offline-pill" role="status">
          <Icon name="wifiOff" size={15} />
          {t.net.offline}
        </p>
      )}
      <Stack nav={nav} />
      <TabBar active={tabOf(nav.route)} hidden={detail} />
      <Toasts />
      <SettingsSheet open={nav.overlay?.kind === 'settings'} />
    </div>
  );
}

/* ---------- app bar ---------- */

function AppBar({ nav }: { nav: Nav }) {
  const t = useAppCopy();
  const site = useSite();
  const lang = useAppLang();
  const r = nav.route;
  const project = r.name === 'project' ? projects[lang].find((p) => p.slug === r.slug) : undefined;
  const title = r.name === 'project' ? (project?.name ?? '') : r.name === 'home' ? site.name : t.tabs[r.name];
  return (
    <header className="appbar">
      <div className="appbar-row">
        {r.name === 'project' ? (
          <button type="button" className="icon-btn appbar-back" onClick={() => goBack()} aria-label={t.bar.back}>
            <Icon name="chevron" className="flip" size={24} />
          </button>
        ) : (
          <a
            className="appbar-logo"
            href="#/"
            aria-label={site.name}
            onClick={(e) => {
              e.preventDefault();
              goTab('/');
            }}
          >
            <LogoMark size={34} />
          </a>
        )}
        <p className="appbar-title" key={title}>
          {title}
        </p>
        <button type="button" className="lang-btn" onClick={() => setLang(lang === 'fa' ? 'en' : 'fa')} aria-label={t.bar.otherLangLabel} lang={lang === 'fa' ? 'en' : 'fa'}>
          {t.bar.otherLang}
        </button>
        <button type="button" className="icon-btn" onClick={() => openOverlay({ kind: 'settings' })} aria-label={t.bar.settings} aria-haspopup="dialog">
          <Icon name="settings" size={22} />
        </button>
      </div>
    </header>
  );
}

/* ---------- tab bar ---------- */

const tabIcons: Record<TabPath, string> = { '/': 'home', '/work': 'work', '/services': 'services', '/contact': 'chat' };
const tabKeys: Record<TabPath, 'home' | 'work' | 'services' | 'contact'> = { '/': 'home', '/work': 'work', '/services': 'services', '/contact': 'contact' };

function TabBar({ active, hidden }: { active: TabPath; hidden: boolean }) {
  const t = useAppCopy();
  const i = tabPaths.indexOf(active);
  return (
    <nav className="tabbar" aria-label={t.tabs.label} data-hidden={hidden || undefined} inert={hidden}>
      <div className="tabbar-row" style={{ '--i': i } as CSSProperties}>
        <span className="tabbar-ind" aria-hidden="true" />
        {tabPaths.map((p) => (
          <a
            key={p}
            className="tab"
            href={`#${p}`}
            aria-current={p === active ? 'page' : undefined}
            onClick={(e) => {
              e.preventDefault();
              goTab(p);
            }}
          >
            <span className="tab-icon">
              <Icon name={tabIcons[p]} size={23} />
            </span>
            <span className="tab-label">{t.tabs[tabKeys[p]]}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}

/* ---------- screens: push/pop slide, tab switches fade ---------- */

type Layer = { key: number; path: string; route: Route; anim: string; restore: boolean };
const scrollMemory = new Map<string, number>();

function Stack({ nav }: { nav: Nav }) {
  const reduced = useReducedMotion();
  const [layers, setLayers] = useState<Layer[]>(() => [{ key: nav.key, path: nav.path, route: nav.route, anim: '', restore: true }]);
  const [shown, setShown] = useState(nav.key);

  // a new screen: keep the old one on stage just long enough to animate the change
  if (nav.key !== shown) {
    setShown(nav.key);
    const m: Motion = reduced && nav.motion !== 'none' ? 'fade' : nav.motion;
    const incoming: Layer = { key: nav.key, path: nav.path, route: nav.route, anim: m === 'none' ? '' : `${m}-in`, restore: nav.motion !== 'push' };
    const top = layers[layers.length - 1];
    setLayers(m === 'none' ? [incoming] : [{ ...top, anim: `${m}-out` }, incoming]);
  }

  const done = (key: number, anim: string) => {
    if (anim.endsWith('-out')) setLayers((ls) => ls.filter((l) => l.key !== key));
    else setLayers((ls) => ls.map((l) => (l.key === key ? { ...l, anim: '' } : l)));
  };

  return (
    <main className="screens">
      {layers.map((l) => (
        <ScreenLayer key={l.key} layer={l} top={l.key === nav.key} onDone={done} />
      ))}
    </main>
  );
}

function ScreenLayer({ layer, top, onDone }: { layer: Layer; top: boolean; onDone: (key: number, anim: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.scrollTop = layer.restore ? (scrollMemory.get(layer.path) ?? 0) : 0;
    document.querySelector('.appbar')?.classList.toggle('is-scrolled', el.scrollTop > 2);
  }, [layer.path, layer.restore]);

  // tapping the tab you're on scrolls back to the top
  useEffect(() => {
    if (!top) return;
    return onRetap(() => ref.current?.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }));
  }, [top]);

  const r = layer.route;
  return (
    <div
      ref={ref}
      className={`screen screen--${r.name}`}
      data-anim={layer.anim || undefined}
      aria-hidden={!top || undefined}
      inert={!top}
      onScroll={(e) => {
        const y = e.currentTarget.scrollTop;
        scrollMemory.set(layer.path, y);
        if (top) document.querySelector('.appbar')?.classList.toggle('is-scrolled', y > 2);
      }}
      onAnimationEnd={(e) => {
        if (e.target === e.currentTarget) onDone(layer.key, layer.anim);
      }}
    >
      {r.name === 'home' && <Home />}
      {r.name === 'work' && <Work />}
      {r.name === 'project' && <Project slug={r.slug} active={top} />}
      {r.name === 'services' && <Services />}
      {r.name === 'contact' && <Contact />}
    </div>
  );
}

/* ---------- settings ---------- */

function SettingsSheet({ open }: { open: boolean }) {
  const t = useAppCopy();
  const lang = useAppLang();
  const built = new Intl.DateTimeFormat(lang === 'fa' ? 'fa-IR-u-ca-persian' : 'en-GB', { dateStyle: 'medium' }).format(new Date(__BUILD_DATE__));
  const version = `${lang === 'fa' ? faDigits(__APP_VERSION__) : __APP_VERSION__} · ${built}`;
  const [canShare] = useState(() => typeof navigator.share === 'function');
  const android = useAndroidLinks(open);
  const stores = android ? (['bazaar', 'myket', 'googlePlay', 'apk'] as const).filter((k) => android[k]) : [];
  const langs: { id: Lang; label: string }[] = [
    { id: 'fa', label: 'فارسی' },
    { id: 'en', label: 'English' },
  ];
  const share = async () => {
    const url = new URL('./', location.href).href;
    if (canShare) {
      try {
        await navigator.share({ title: t.title, text: t.settings.shareText, url });
      } catch {
        /* dismissed */
      }
    } else if (await copyText(url)) toast(t.settings.shared);
  };
  return (
    <Sheet open={open} onClose={closeOverlay} labelledBy="settings-title">
      <div className="sheet-head">
        <h2 id="settings-title">{t.settings.title}</h2>
        <button type="button" className="icon-btn icon-btn--sm" onClick={closeOverlay} aria-label={t.settings.close}>
          <Icon name="close" size={18} />
        </button>
      </div>
      <div className="setting">
        <span className="setting-label">
          <Icon name="language" size={20} />
          {t.settings.language}
        </span>
        <div className="segmented" role="radiogroup" aria-label={t.settings.language} style={{ '--i': lang === 'fa' ? 0 : 1 } as CSSProperties}>
          <span className="segmented-thumb" aria-hidden="true" />
          {langs.map((l) => (
            <button key={l.id} type="button" role="radio" aria-checked={lang === l.id} lang={l.id} onClick={() => setLang(l.id)}>
              {l.label}
            </button>
          ))}
        </div>
      </div>
      <a className="setting setting--link" href="../?choose">
        <span className="setting-label">
          <Icon name="layers" size={20} />
          {t.settings.site}
        </span>
        <span className="setting-value" dir="ltr">
          raminomrani.ir
        </span>
        <Icon name="chevron" size={18} />
      </a>
      <button type="button" className="setting setting--link" onClick={share}>
        <span className="setting-label">
          <Icon name="share" size={20} />
          {t.settings.share}
        </span>
        <Icon name="chevron" size={18} />
      </button>
      {stores.map((k) => (
        <a key={k} className="setting setting--link" href={android![k]} target="_blank" rel="noopener" {...(k === 'apk' ? { download: '' } : {})}>
          <span className="setting-label">
            <Icon name={k === 'apk' ? 'download' : 'android'} size={20} />
            {t.settings[k]}
          </span>
          <Icon name="chevron" size={18} />
        </a>
      ))}
      <a className="setting setting--link" href={lang === 'en' ? '../privacy/#en' : '../privacy/'}>
        <span className="setting-label">
          <Icon name="shield" size={20} />
          {t.settings.privacy}
        </span>
        <Icon name="chevron" size={18} />
      </a>
      <div className="setting setting--static">
        <span className="setting-label">
          <Icon name="code" size={20} />
          {t.settings.version}
        </span>
        <span className="setting-value">{version}</span>
      </div>
    </Sheet>
  );
}
