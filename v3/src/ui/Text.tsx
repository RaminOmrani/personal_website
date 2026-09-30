import { Fragment, type ReactNode } from 'react';

/**
 * Inline accents inside copy:
 *   {words} → the lapis-to-turquoise gradient
 *   [words] → Nastaliq calligraphy (used sparingly)
 */
const TOKENS = /(\{[^}]+\}|\[[^\]]+\])/g;

function accent(chunk: string): { text: string; cls: string | null } {
  if (chunk.startsWith('{')) return { text: chunk.slice(1, -1), cls: 'grad' };
  if (chunk.startsWith('[')) return { text: chunk.slice(1, -1), cls: 'nas' };
  return { text: chunk, cls: null };
}

export function Grad({ text }: { text: string }) {
  return (
    <>
      {text.split(TOKENS).map((c, i) => {
        const { text: t, cls } = accent(c);
        return cls ? (
          <span className={cls} key={i}>
            {t}
          </span>
        ) : (
          <Fragment key={i}>{t}</Fragment>
        );
      })}
    </>
  );
}

/**
 * Splits a line into words, each in its own mask, so they can rise into view one by one.
 * Persian letters join, so the split is by word, never by letter. A Nastaliq phrase stays whole.
 */
export function Words({ text, start = 0, step = 70 }: { text: string; start?: number; step?: number }) {
  let n = 0;
  const out: ReactNode[] = [];
  text.split(TOKENS).forEach((chunk, ci) => {
    const { text: t, cls } = accent(chunk);
    const parts = cls === 'nas' ? [t] : t.split(/(\s+)/);
    parts.forEach((w, wi) => {
      if (!w) return;
      if (/^\s+$/.test(w)) {
        out.push(<Fragment key={`${ci}-${wi}`}> </Fragment>);
        return;
      }
      const i = n++;
      out.push(
        <span className={cls === 'nas' ? 'word word--nas' : 'word'} key={`${ci}-${wi}`}>
          <span className={cls ? `word-in ${cls}` : 'word-in'} style={{ animationDelay: `${start + i * step}ms` }}>
            {w}
          </span>
        </span>,
      );
    });
  });
  return <>{out}</>;
}
