import { useSyncExternalStore } from 'react';
import { dirOf, rememberLang, type Lang } from '../../../v3/src/i18n';
import { appCopy } from '../copy';

/**
 * The app's language: Persian unless the visitor chose English, on the app or on any version of
 * the website (they share localStorage['ro:lang']). index.html already set <html lang dir>.
 */
let lang: Lang = document.documentElement.lang === 'en' ? 'en' : 'fa';
const listeners = new Set<() => void>();

export function setLang(next: Lang) {
  if (next === lang) return;
  lang = next;
  rememberLang(next);
  const html = document.documentElement;
  html.lang = next;
  html.dir = dirOf(next);
  document.title = appCopy[next].title;
  listeners.forEach((l) => l());
}

export function useAppLang() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => lang,
  );
}

/** Another tab (or the website) changed the language: follow it. */
window.addEventListener('storage', (e) => {
  if (e.key === 'ro:lang' && (e.newValue === 'fa' || e.newValue === 'en')) setLang(e.newValue);
});
