/* Ramin Omrani, the app: service worker.
 *
 * - The app shell (index.html, JS, CSS, fonts, the content that lives in the JS, logos, the
 *   manifest and the offline page) is precached at install. The list and the version below are
 *   written in at build time by vite.config.ts, so every build that changes a file is a new worker.
 * - Navigations get the precached shell (routes are #hashes, so it is always the same page);
 *   if even that is missing, offline.html.
 * - Screenshots and photos are cached the first time they are shown (cache-first, capped), so a
 *   project opened once still has its pictures offline. A missing picture becomes a quiet tile.
 * - A new worker waits until the app asks it to take over ("new version, tap to update").
 */
const VERSION = self.__RO_VERSION__;
const PRECACHE = self.__RO_PRECACHE__;

const PRE = `ro-app-pre-${VERSION}`;
const IMG = 'ro-app-img-v1';
const IMG_MAX = 60;
const scope = new URL(self.registration.scope);
const shell = new URL('index.html', scope).href;
const offline = new URL('offline.html', scope).href;
const precached = new Set(PRECACHE.map((p) => new URL(p, scope).href));

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(PRE).then((cache) => cache.addAll(PRECACHE.map((p) => new Request(new URL(p, scope), { cache: 'reload' })))),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => k.startsWith('ro-app-pre-') && k !== PRE).map((k) => caches.delete(k)));
      await self.clients.claim();
    })(),
  );
});

self.addEventListener('message', (event) => {
  const type = event.data && event.data.type;
  if (type === 'SKIP_WAITING') self.skipWaiting();
  if (type === 'VERSION' && event.ports[0]) event.ports[0].postMessage(VERSION);
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== scope.origin || !url.pathname.startsWith(scope.pathname)) return;
  const path = url.pathname.slice(scope.pathname.length);

  if (req.mode === 'navigate') {
    // the app is one page: its root, index.html, with or without ?source=pwa
    if (path === '' || path === 'index.html') event.respondWith(page());
    else event.respondWith(fetch(req).catch(() => caches.match(offline)));
    return;
  }
  const key = url.origin + url.pathname;
  if (precached.has(key)) {
    event.respondWith(fromPrecache(req, key));
    return;
  }
  if (/\.(?:jpe?g|png|webp|avif|gif|svg)$/i.test(url.pathname)) event.respondWith(image(req));
});

async function page() {
  const cache = await caches.open(PRE);
  const hit = await cache.match(shell);
  if (hit) return hit;
  try {
    return await fetch(shell);
  } catch {
    return (await caches.match(offline)) || new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain' } });
  }
}

async function fromPrecache(req, key) {
  const hit = await caches.match(key, { cacheName: PRE });
  return hit || fetch(req);
}

/** Cache-first for pictures, keeping at most IMG_MAX of them (oldest out first). */
async function image(req) {
  const cache = await caches.open(IMG);
  const hit = await cache.match(req, { ignoreSearch: true });
  if (hit) return hit;
  try {
    const res = await fetch(req);
    if (res.ok) {
      await cache.put(req, res.clone());
      trim(cache);
    }
    return res;
  } catch {
    return placeholder();
  }
}

async function trim(cache) {
  const keys = await cache.keys();
  for (const k of keys.slice(0, Math.max(0, keys.length - IMG_MAX))) await cache.delete(k);
}

/** A soft ivory tile with the arch, for pictures that were never seen online. */
function placeholder() {
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 100" preserveAspectRatio="xMidYMid slice">' +
    '<rect width="160" height="100" fill="#eeebe3"/>' +
    '<path d="M68 70V52c0-8 5-14 12-18 7 4 12 10 12 18v18" fill="none" stroke="#c9c2b2" stroke-width="3" stroke-linecap="round"/>' +
    '</svg>';
  return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml', 'Cache-Control': 'no-store' } });
}
