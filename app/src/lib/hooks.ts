import { useSyncExternalStore } from 'react';

function media(query: string) {
  const mq = matchMedia(query);
  return {
    subscribe: (cb: () => void) => {
      mq.addEventListener('change', cb);
      return () => mq.removeEventListener('change', cb);
    },
    get: () => mq.matches,
  };
}

const reduced = media('(prefers-reduced-motion: reduce)');
export const useReducedMotion = () => useSyncExternalStore(reduced.subscribe, reduced.get);
export const prefersReducedMotion = reduced.get;

function subscribeOnline(cb: () => void) {
  window.addEventListener('online', cb);
  window.addEventListener('offline', cb);
  return () => {
    window.removeEventListener('online', cb);
    window.removeEventListener('offline', cb);
  };
}
export const useOnline = () => useSyncExternalStore(subscribeOnline, () => navigator.onLine);

export async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // older WebViews: a hidden textarea and execCommand
    try {
      const t = document.createElement('textarea');
      t.value = text;
      t.setAttribute('readonly', '');
      t.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
      document.body.append(t);
      t.select();
      const ok = document.execCommand('copy');
      t.remove();
      return ok;
    } catch {
      return false;
    }
  }
}
