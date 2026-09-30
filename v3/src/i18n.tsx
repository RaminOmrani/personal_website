import { createContext, useContext, type ReactNode } from 'react';

/**
 * Two languages from one build: index.html is Persian (right to left), en.html is English.
 * The page tells the app which one it is (data-lang on #root, written into each HTML file),
 * so the language never depends on the URL.
 *
 * Content is written once, side by side: any value in a data module may be given as
 * l(persian, english). `bilingual()` turns such a tree into one plain copy per language.
 */

export type Lang = 'fa' | 'en';
export const langs: readonly Lang[] = ['fa', 'en'];

/** A value given in both languages. */
export class Bi<T> {
  constructor(
    readonly fa: T,
    readonly en: T,
  ) {}
}

/** l(persian, english) */
export const l = <T,>(fa: T, en: T) => new Bi<T>(fa, en);

/** T with every Bi<X> inside it replaced by X. */
export type Local<T> = T extends Bi<infer U>
  ? Local<U>
  : T extends (...args: never[]) => unknown
    ? T
    : T extends readonly (infer U)[]
      ? Local<U>[]
      : T extends object
        ? { [K in keyof T]: Local<T[K]> }
        : T;

/** The authoring shape of T: anywhere inside it, a value may also be given as l(fa, en). */
export type Src<T> = T extends (...args: never[]) => unknown
  ? T | Bi<T>
  : T extends readonly (infer U)[]
    ? Src<U>[] | Bi<T>
    : T extends object
      ? { [K in keyof T]: Src<T[K]> } | Bi<T>
      : T | Bi<T>;

function resolve(v: unknown, lang: Lang): unknown {
  if (v instanceof Bi) return resolve(v[lang], lang);
  if (Array.isArray(v)) return v.map((x) => resolve(x, lang));
  if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, resolve(x, lang)]));
  return v;
}

/** One plain copy of `src` per language. */
export function bilingual<S>(src: S): Record<Lang, Local<S>> {
  return { fa: resolve(src, 'fa') as Local<S>, en: resolve(src, 'en') as Local<S> };
}

const LangContext = createContext<Lang>('fa');

export function LangProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);

export const dirOf = (lang: Lang) => (lang === 'fa' ? 'rtl' : 'ltr');

/** Which page this is: #root carries data-lang; <html lang> is the fallback. */
export function pageLang(root: HTMLElement | null): Lang {
  const v = root?.dataset.lang || document.documentElement.lang;
  return v?.startsWith('en') ? 'en' : 'fa';
}

/** Persian digits, e.g. 12 → ۱۲ */
export const faDigits = (n: number | string) => String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[+d]);

/** A number in the page's own digits. */
export const digits = (n: number | string, lang: Lang) => (lang === 'fa' ? faDigits(n) : String(n));

/** The other language's page, relative to this one (both live in the same folder). */
export const otherPage = (lang: Lang) => (lang === 'fa' ? { lang: 'en' as const, href: 'en.html' } : { lang: 'fa' as const, href: './' });

/** Remember the visitor's choice for the site's version chooser; storage may be unavailable. */
export function rememberLang(lang: Lang) {
  try {
    localStorage.setItem('ro:lang', lang);
  } catch {
    /* private mode or blocked storage */
  }
}
