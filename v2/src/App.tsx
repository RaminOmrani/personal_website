import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { MotionConfig } from 'motion/react';
import { Toaster } from 'sonner';
import { projects } from './data/projects';
import { i18n, LangProvider, type Lang } from './i18n';
import { useRevealOnScroll } from './lib';
import { Header } from './components/Header';
import { HeroShowcase } from './components/Hero';
import { Work } from './components/Work';
import { ProjectSheet } from './components/ProjectSheet';
import { About, Clients, Faq, Process, Services, Stats, Toolkit } from './components/Sections';
import { Contact, Footer, MobileBar } from './components/Contact';

const slugFromHash = () => {
  const m = typeof location === 'undefined' ? null : location.hash.match(/^#p-([\w-]+)$/);
  return m && projects.some((p) => p.slug === m[1]) ? m[1] : null;
};

/** Project case studies are deep-linkable (#p-crm) and the back button closes them. */
function useProjectRoute() {
  const [slug, setSlug] = useState<string | null>(null);
  const pushed = useRef(false);

  useEffect(() => {
    const sync = () => {
      const s = slugFromHash();
      if (!s) pushed.current = false;
      setSlug(s);
    };
    sync();
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);

  const open = useCallback((s: string) => {
    try {
      if (slugFromHash()) history.replaceState(null, '', `#p-${s}`);
      else {
        history.pushState(null, '', `#p-${s}`);
        pushed.current = true;
      }
    } catch {
      /* sandboxed frames can refuse history writes; the sheet still opens */
    }
    setSlug(s);
  }, []);

  const close = useCallback(() => {
    setSlug(null);
    try {
      if (pushed.current) {
        pushed.current = false;
        history.back();
      } else if (slugFromHash()) {
        history.replaceState(null, '', location.pathname + location.search);
      }
    } catch {
      /* ignore */
    }
  }, []);

  return { slug, open, close };
}

/** The whole page, in one language. Each prerendered page (index.html, en.html) passes its own. */
export function App({ lang = 'fa', hero }: { lang?: Lang; hero?: ReactNode }) {
  const { slug, open, close } = useProjectRoute();
  useRevealOnScroll();
  const { t, dir } = i18n(lang);

  return (
    <LangProvider lang={lang}>
      <MotionConfig reducedMotion="user">
        <a className="skip" href="#work">
          {t('رفتن به نمونه‌کارها', 'Skip to my work')}
        </a>
        <div className="page" vaul-drawer-wrapper="">
          <Header />
          <main>
            {hero ?? <HeroShowcase />}
            <Clients />
            <Work onOpen={open} />
            <Services />
            <Toolkit />
            <Process />
            <Stats />
            <About />
            <Faq />
            <Contact />
          </main>
          <Footer />
        </div>
        <MobileBar hidden={!!slug} />
        <ProjectSheet slug={slug} onClose={close} onOpen={open} />
        <Toaster dir={dir} position="bottom-center" mobileOffset={{ bottom: 96 }} toastOptions={{ className: 'toast' }} />
      </MotionConfig>
    </LangProvider>
  );
}
