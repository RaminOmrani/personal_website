import { createContext, useContext, type ReactNode } from 'react';

/**
 * Two languages, two prerendered pages: index.html (fa, right-to-left) and en.html (en, left-to-right).
 * The page's language is fixed by its HTML, never by the URL, so /v2/en, /v2/en.html and previews all work.
 */
export type Lang = 'fa' | 'en';

/** A text (or any value) in both languages. */
export type L<T = string> = { readonly fa: T; readonly en: T };

/** Write bilingual data as `l('فارسی', 'English')`. */
export const l = <T = string,>(fa: T, en: T): L<T> => ({ fa, en });

/** `T` with every `L<X>` inside it replaced by `X` — the shape components actually render. */
export type Localized<T> =
  T extends L<infer U>
    ? U
    : T extends readonly (infer E)[]
      ? Localized<E>[]
      : T extends (...args: never[]) => unknown
        ? T
        : T extends object
          ? { -readonly [K in keyof T]: Localized<T[K]> }
          : T;

const isL = (v: object): v is L<unknown> => {
  const keys = Object.keys(v);
  return keys.length === 2 && 'fa' in v && 'en' in v;
};

function resolve(v: unknown, lang: Lang): unknown {
  if (Array.isArray(v)) return v.map((x) => resolve(x, lang));
  if (v && typeof v === 'object') {
    if (isL(v)) return v[lang];
    return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, resolve(x, lang)]));
  }
  return v;
}

// resolved once per language, so the same data keeps the same identity between renders
const cache: Record<Lang, WeakMap<object, unknown>> = { fa: new WeakMap(), en: new WeakMap() };

/** Resolves a whole bilingual data tree to one language. */
export function localize<T extends object>(data: T, lang: Lang): Localized<T> {
  let out = cache[lang].get(data);
  if (out === undefined) cache[lang].set(data, (out = resolve(data, lang)));
  return out as Localized<T>;
}

function make(lang: Lang) {
  const locale = lang === 'fa' ? 'fa-IR' : 'en-US';
  function t<T>(v: L<T>): T;
  function t(fa: string, en: string): string;
  function t(a: L<unknown> | string, b?: string) {
    return typeof a === 'string' ? (lang === 'fa' ? a : b) : a[lang];
  }
  return {
    lang,
    dir: (lang === 'fa' ? 'rtl' : 'ltr') as 'rtl' | 'ltr',
    locale,
    /** Picks one language: `t(data.title)` or, for short UI strings, `t('بستن', 'Close')`. */
    t,
    /** A whole data tree in this language (cached). */
    loc: <T extends object>(data: T) => localize(data, lang),
    /** Digits in the page's own script: ۱۲ on the Persian page, 12 on the English one. */
    num: (n: number, opts?: Intl.NumberFormatOptions) => n.toLocaleString(locale, opts),
  };
}

const I18N = { fa: make('fa'), en: make('en') };
export type I18n = ReturnType<typeof make>;

/** Helpers for a language, outside React. */
export const i18n = (lang: Lang): I18n => I18N[lang];

const LangContext = createContext<Lang>('fa');

export function LangProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

export function useLang(): I18n {
  return I18N[useContext(LangContext)];
}

/**
 * The language the page was built for. Prerendering writes it into the HTML
 * (`<div id="root" data-lang>` and `<html lang>`); an inline script re-applies
 * `<html lang dir>` in case a host strips them.
 */
export function readLang(root?: HTMLElement | null): Lang {
  const v = root?.dataset.lang || document.documentElement.lang;
  return v?.toLowerCase().startsWith('en') ? 'en' : 'fa';
}

/** Where the other language lives. Both pages sit in the same folder. */
export const otherPage: Record<Lang, { lang: Lang; href: string }> = {
  fa: { lang: 'en', href: 'en.html' },
  en: { lang: 'fa', href: './' },
};

/** Remembers the visitor's choice, for the site's version chooser. */
export function rememberLang(lang: Lang) {
  try {
    localStorage.setItem('ro:lang', lang);
  } catch {
    /* storage can be blocked (private mode, sandboxed previews) */
  }
}
