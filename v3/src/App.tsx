import { useCallback, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { MotionConfig } from 'motion/react';
import { projects } from './data/projects';
import { useReducedMotion } from './lib/hooks';
import { gsap, lockScroll, startScroll } from './lib/scroll';
import { Film } from './sections/Film';
import { Dock, Header } from './sections/Chrome';
import { Work } from './sections/Work';
import { CaseStudy } from './sections/CaseStudy';
import { About, Faq, Marquee, Pledge, Process, Services } from './sections/Sections';
import { Contact, Footer } from './sections/Contact';
import { Toaster } from './ui/Toast';

type VTDoc = Document & { startViewTransition?: (cb: () => void) => { finished: Promise<void> } };

const slugFromHash = () => {
  const m = location.hash.match(/^#work-([\w-]+)$/);
  return m && projects.some((p) => p.slug === m[1]) ? m[1] : null;
};

const onScreen = (el: Element | null | undefined) => {
  if (!el) return false;
  const r = el.getBoundingClientRect();
  return r.bottom > 0 && r.top < innerHeight;
};

/** Case studies open over the page, morph out of their card, and live at #work-<slug> so Back closes them. */
function useCaseRoute(reduced: boolean) {
  const [slug, setSlug] = useState<string | null>(null);
  const slugRef = useRef<string | null>(null);
  const pushed = useRef(false);
  const reducedRef = useRef(reduced);
  reducedRef.current = reduced;

  const commit = (next: string | null) => {
    slugRef.current = next;
    flushSync(() => setSlug(next));
  };

  const morph = (update: () => void, name?: { el: HTMLElement; title: HTMLElement | null; onto: 'old' | 'new' }) => {
    const doc = document as VTDoc;
    if (!doc.startViewTransition || reducedRef.current) return update();
    if (name?.onto === 'old') {
      name.el.style.viewTransitionName = 'case-visual';
      if (name.title) name.title.style.viewTransitionName = 'case-title';
    }
    const t = doc.startViewTransition(() => {
      if (name?.onto === 'old') {
        name.el.style.viewTransitionName = '';
        if (name.title) name.title.style.viewTransitionName = '';
      }
      if (name?.onto === 'new') {
        name.el.style.viewTransitionName = 'case-visual';
        if (name.title) name.title.style.viewTransitionName = 'case-title';
      }
      update();
    });
    t.finished.finally(() => {
      if (name) {
        name.el.style.viewTransitionName = '';
        if (name.title) name.title.style.viewTransitionName = '';
      }
    });
  };

  const cardParts = (s: string) => {
    const card = document.querySelector(`.card[data-slug="${s}"]`);
    const el = card?.querySelector<HTMLElement>('.card-stage') ?? null;
    return el && onScreen(el) ? { el, title: card!.querySelector<HTMLElement>('h3') } : null;
  };

  const show = useCallback((next: string) => {
    const from = slugRef.current;
    if (from === next) return;
    if (from) return morph(() => commit(next)); // project → project: the named parts morph between them
    const parts = cardParts(next);
    morph(() => commit(next), parts ? { ...parts, onto: 'old' } : undefined);
  }, []);

  const hide = useCallback(() => {
    const from = slugRef.current;
    if (!from) return;
    const parts = cardParts(from);
    morph(() => commit(null), parts ? { ...parts, onto: 'new' } : undefined);
  }, []);

  const open = useCallback(
    (next: string) => {
      try {
        if (slugRef.current) history.replaceState(null, '', `#work-${next}`);
        else {
          history.pushState(null, '', `#work-${next}`);
          pushed.current = true;
        }
      } catch {
        /* a sandboxed frame may refuse history writes; the story still opens */
      }
      show(next);
    },
    [show],
  );

  const close = useCallback(() => {
    if (pushed.current) {
      pushed.current = false;
      try {
        history.back(); // popstate closes it
        return;
      } catch {
        /* fall through */
      }
    }
    try {
      if (slugFromHash()) history.replaceState(null, '', location.pathname + location.search);
    } catch {
      /* ignore */
    }
    hide();
  }, [hide]);

  useEffect(() => {
    const sync = () => {
      const s = slugFromHash();
      if (s) show(s);
      else {
        pushed.current = false;
        hide();
      }
    };
    const initial = slugFromHash();
    if (initial) {
      slugRef.current = initial;
      setSlug(initial);
    }
    addEventListener('popstate', sync);
    return () => removeEventListener('popstate', sync);
  }, [show, hide]);

  useEffect(() => {
    lockScroll(!!slug);
  }, [slug]);

  return { slug, open, close };
}

/** Marks [data-reveal] elements with data-in as they scroll into view, including ones added later. */
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          if (e.isIntersecting) {
            e.target.setAttribute('data-in', '');
            io.unobserve(e.target);
          }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    const scan = (root: ParentNode) => root.querySelectorAll('[data-reveal]:not([data-in])').forEach((el) => io.observe(el));
    scan(document);
    const mo = new MutationObserver((muts) => {
      for (const m of muts) m.addedNodes.forEach((n) => n instanceof Element && (n.matches('[data-reveal]') ? io.observe(n) : scan(n)));
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
}

/** Buttons that lean toward the cursor (mouse only). */
function useMagnetic(reduced: boolean) {
  useEffect(() => {
    if (reduced || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const els = [...document.querySelectorAll<HTMLElement>('[data-magnetic]')];
    const offs = els.map((el) => {
      const x = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'elastic.out(1, 0.55)' });
      const y = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'elastic.out(1, 0.55)' });
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        x((e.clientX - r.left - r.width / 2) * 0.22);
        y((e.clientY - r.top - r.height / 2) * 0.3);
      };
      const leave = () => {
        x(0);
        y(0);
      };
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerleave', leave);
      return () => {
        el.removeEventListener('pointermove', move);
        el.removeEventListener('pointerleave', leave);
      };
    });
    return () => offs.forEach((f) => f());
  }, [reduced]);
}

export function App() {
  const reduced = useReducedMotion();
  const { slug, open, close } = useCaseRoute(reduced);
  const project = projects.find((p) => p.slug === slug) ?? null;

  useEffect(() => startScroll(reduced), [reduced]);
  useReveal();
  useMagnetic(reduced);

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#work">
        رفتن به نمونه‌کارها
      </a>
      <Header />
      <main>
        <Film onOpen={open} />
        <Work onOpen={open} />
        <Services />
        <Marquee />
        <Process />
        <Pledge />
        <About />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <Dock hidden={!!slug} />
      {project && <CaseStudy p={project} onClose={close} onOpen={open} />}
      <Toaster />
    </MotionConfig>
  );
}
