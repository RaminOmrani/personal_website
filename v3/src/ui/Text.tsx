import { Fragment } from 'react';

/** Renders text where `{words}` get the iridescent gradient. */
export function Grad({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\{[^}]+\})/g).map((p, i) =>
        p.startsWith('{') ? (
          <span className="grad" key={i}>
            {p.slice(1, -1)}
          </span>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        ),
      )}
    </>
  );
}

/**
 * Splits a line into words, each in a mask, so they can rise into view one by one.
 * Persian letters join, so the split is by word, never by letter.
 */
export function Words({ text, start = 0, step = 70 }: { text: string; start?: number; step?: number }) {
  let n = 0;
  return (
    <>
      {text.split(/(\{[^}]+\})/g).map((chunk, ci) => {
        const hot = chunk.startsWith('{');
        const words = (hot ? chunk.slice(1, -1) : chunk).split(/(\s+)/);
        return words.map((w, wi) => {
          if (!w) return null;
          if (/^\s+$/.test(w)) return <Fragment key={`${ci}-${wi}`}> </Fragment>;
          const i = n++;
          return (
            <span className="word" key={`${ci}-${wi}`}>
              <span className={hot ? 'word-in grad' : 'word-in'} style={{ animationDelay: `${start + i * step}ms` }}>
                {w}
              </span>
            </span>
          );
        });
      })}
    </>
  );
}
