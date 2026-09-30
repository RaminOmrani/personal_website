import type { L, Lang } from './content';

export const t = (value: L, lang: Lang): string => value[lang];

const ENTITIES: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export const esc = (s: string): string => s.replace(/[&<>"']/g, (c) => ENTITIES[c]);

/** `*word*` → accent-styled <em>. */
export const rich = (s: string): string => esc(s).replace(/\*(.+?)\*/g, '<em>$1</em>');
export const plain = (s: string): string => s.replace(/\*/g, '');

const FA_DIGITS = '۰۱۲۳۴۵۶۷۸۹';
export const num = (value: number | string, lang: Lang): string =>
  lang === 'fa' ? String(value).replace(/\d/g, (d) => FA_DIGITS[Number(d)]) : String(value);

export const pad = (n: number, lang: Lang): string => num(String(n).padStart(2, '0'), lang);

/**
 * Splits text into masked words (`.w > .w-i`) for reveal animations.
 * Persian is always split by word — splitting by character would break letter joining.
 */
export function words(s: string): string {
  let inEm = false;
  return s
    .split(/\s+/)
    .filter(Boolean)
    .map((raw) => {
      let w = raw;
      if (w.startsWith('*')) {
        inEm = true;
        w = w.slice(1);
      }
      const isEm = inEm;
      const close = w.indexOf('*');
      if (close >= 0) {
        w = w.slice(0, close) + w.slice(close + 1);
        inEm = false;
      }
      const inner = isEm ? `<em>${esc(w)}</em>` : esc(w);
      return `<span class="w"><span class="w-i">${inner}</span></span>`;
    })
    .join(' ');
}

/** Splits a (Latin) word into characters. */
export const chars = (s: string): string =>
  [...s].map((c) => `<span class="ch">${c === ' ' ? '&nbsp;' : esc(c)}</span>`).join('');

/** Visually hidden accessible text + animated aria-hidden twin. */
export const accessible = (label: string, visual: string): string =>
  `<span class="sr-only">${esc(plain(label))}</span><span aria-hidden="true">${visual}</span>`;
