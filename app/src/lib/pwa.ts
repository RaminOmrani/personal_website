import { useSyncExternalStore } from 'react';

/**
 * Service worker registration and the "new version available" signal.
 * The worker lives next to index.html (./sw.js) and controls only the app's folder (scope ./).
 */
let waiting: ServiceWorker | null = null;
let userAsked = false;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export function registerServiceWorker() {
  if (!('serviceWorker' in navigator) || import.meta.env.DEV) return;
  const start = async () => {
    try {
      const reg = await navigator.serviceWorker.register('./sw.js', { scope: './' });
      const offer = (w: ServiceWorker | null) => {
        if (!w || !navigator.serviceWorker.controller) return; // first install: nothing to replace
        waiting = w;
        emit();
      };
      offer(reg.waiting);
      reg.addEventListener('updatefound', () => {
        const w = reg.installing;
        w?.addEventListener('statechange', () => {
          if (w.state === 'installed') offer(w);
        });
      });
      // installed apps can stay open for days: look for a new version whenever the app comes back
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') reg.update().catch(() => {});
      });
    } catch {
      /* no service worker (private mode, old browser): the app still works online */
    }
  };
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (userAsked) location.reload();
  });
  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start, { once: true });
}

/** Let the waiting worker take over; the page reloads once it controls it. */
export function applyUpdate() {
  if (!waiting) return;
  userAsked = true;
  waiting.postMessage({ type: 'SKIP_WAITING' });
}

export const useUpdateReady = () =>
  useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => waiting !== null,
  );
