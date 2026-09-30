import { useSyncExternalStore } from 'react';

/**
 * Hash routes (#/, #/work, #/work/<slug>, #/services, #/contact), so deep links work on any static
 * host, plus history entries for sheets and the picture viewer, so Android's back button (which a
 * Trusted Web Activity maps to history.back) closes them and pops screens instead of leaving the app.
 *
 * Every entry carries its depth ({ d }) in history.state. `stack` remembers which path sits at each
 * depth during this session, so "back" and the tab bar can tell where they would land.
 */
export type Route =
  | { name: 'home' }
  | { name: 'work' }
  | { name: 'project'; slug: string }
  | { name: 'services' }
  | { name: 'contact' };

export type Overlay = { kind: 'settings' } | { kind: 'viewer'; index: number } | null;

/** How the screen change that led here animates: push/pop slide, tab switches fade. */
export type Motion = 'push' | 'pop' | 'fade' | 'none';

export interface Nav {
  path: string;
  route: Route;
  depth: number;
  overlay: Overlay;
  motion: Motion;
  /** Changes whenever the screen (not just an overlay) changes. */
  key: number;
}

export type TabPath = '/' | '/work' | '/services' | '/contact';
export const tabPaths: TabPath[] = ['/', '/work', '/services', '/contact'];

interface Entry {
  d: number;
  o?: Overlay;
}

export function parse(hash: string): { path: string; route: Route } {
  const parts = hash.replace(/^#/, '').split('?')[0].split('/').filter(Boolean);
  const [a, b] = parts;
  if (a === 'work' && b) {
    const slug = decodeURIComponent(b);
    return { path: `/work/${encodeURIComponent(slug)}`, route: { name: 'project', slug } };
  }
  if (a === 'work') return { path: '/work', route: { name: 'work' } };
  if (a === 'services') return { path: '/services', route: { name: 'services' } };
  if (a === 'contact') return { path: '/contact', route: { name: 'contact' } };
  return { path: '/', route: { name: 'home' } };
}

/** The tab a route belongs to. */
export const tabOf = (r: Route): TabPath => (r.name === 'home' ? '/' : r.name === 'project' ? '/work' : `/${r.name}`);

const level = (r: Route) => (r.name === 'project' ? 2 : 1);

function readEntry(): Entry | null {
  const s = history.state as Entry | null;
  return s && typeof s.d === 'number' ? s : null;
}

const stack: (string | undefined)[] = [];
const listeners = new Set<() => void>();
const retapListeners = new Set<() => void>();
let pendingMotion: Motion | null = null;

let nav: Nav = (() => {
  const { path, route } = parse(location.hash);
  const e = readEntry();
  const d = e?.d ?? 0;
  // an overlay left open before a reload is not reopened
  history.replaceState({ d } satisfies Entry, '', location.href);
  stack[d] = path;
  return { path, route, depth: d, overlay: null, motion: 'none', key: 0 };
})();

function commit(next: Pick<Nav, 'path' | 'route' | 'depth' | 'overlay'>, motion?: Motion) {
  const changed = next.path !== nav.path;
  let m: Motion = 'none';
  if (changed) {
    const a = level(nav.route);
    const b = level(next.route);
    m = motion ?? (b > a ? 'push' : b < a ? 'pop' : a === 2 ? (next.depth < nav.depth ? 'pop' : 'push') : 'fade');
  }
  nav = { ...next, motion: changed ? m : nav.motion, key: changed ? nav.key + 1 : nav.key };
  listeners.forEach((l) => l());
}

window.addEventListener('popstate', () => {
  let e = readEntry();
  const { path, route } = parse(location.hash);
  if (!e) {
    // a plain #fragment navigation (a typed URL, a shortcut into a running app): a new entry on top
    e = { d: nav.depth + 1 };
    history.replaceState(e, '', location.href);
  }
  stack[e.d] = path;
  const motion = pendingMotion ?? undefined;
  pendingMotion = null;
  commit({ path, route, depth: e.d, overlay: e.o ?? null }, motion);
});

export function navigate(to: string, opts: { replace?: boolean; motion?: Motion } = {}) {
  const { path, route } = parse(`#${to}`);
  const d = opts.replace ? nav.depth : nav.depth + 1;
  const entry: Entry = { d };
  if (opts.replace) history.replaceState(entry, '', `#${path}`);
  else history.pushState(entry, '', `#${path}`);
  stack[d] = path;
  stack.length = d + 1;
  commit({ path, route, depth: d, overlay: null }, opts.motion);
}

/** The back button in the app bar: pop if we came from inside the app, else go up to the list. */
export function goBack(fallback: TabPath = '/work') {
  if (nav.depth > 0 && stack[nav.depth - 1] !== undefined) history.back();
  else navigate(fallback, { replace: true, motion: 'pop' });
}

/**
 * The tab bar. From Home a tab is pushed; between other tabs it replaces, so the back button
 * always leads home and then out, like an Android app. Tapping the current tab scrolls to the top.
 */
export function goTab(to: TabPath) {
  if (nav.overlay) return;
  if (nav.path === to) {
    retapListeners.forEach((l) => l());
    return;
  }
  const below = nav.depth > 0 ? stack[nav.depth - 1] : undefined;
  if (below === to) {
    if (tabOf(nav.route) !== to) pendingMotion = 'fade';
    history.back();
    return;
  }
  if (to === '/') {
    for (let j = nav.depth - 1; j >= 0; j--) {
      if (stack[j] === '/') {
        pendingMotion = 'fade';
        history.go(j - nav.depth);
        return;
      }
    }
  }
  const up = nav.route.name === 'project' && to === '/work';
  navigate(to, { replace: nav.route.name !== 'home', motion: up ? 'pop' : 'fade' });
}

export function openOverlay(o: NonNullable<Overlay>) {
  if (nav.overlay) {
    history.replaceState({ d: nav.depth, o } satisfies Entry, '', location.href);
    commit({ ...nav, overlay: o });
    return;
  }
  const d = nav.depth + 1;
  history.pushState({ d, o } satisfies Entry, '', location.href);
  stack[d] = nav.path;
  stack.length = d + 1;
  commit({ ...nav, depth: d, overlay: o });
}

/** Keep an open overlay's own state (e.g. which picture the viewer shows) in its history entry. */
export function updateOverlay(o: NonNullable<Overlay>) {
  if (!nav.overlay) return;
  history.replaceState({ d: nav.depth, o } satisfies Entry, '', location.href);
  nav = { ...nav, overlay: o };
  listeners.forEach((l) => l());
}

export function closeOverlay() {
  if (!nav.overlay) return;
  if (nav.depth > 0 && stack[nav.depth - 1] === nav.path) history.back();
  else {
    history.replaceState({ d: nav.depth } satisfies Entry, '', location.href);
    commit({ ...nav, overlay: null });
  }
}

export function onRetap(fn: () => void) {
  retapListeners.add(fn);
  return () => {
    retapListeners.delete(fn);
  };
}

export function useNav() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => nav,
  );
}
