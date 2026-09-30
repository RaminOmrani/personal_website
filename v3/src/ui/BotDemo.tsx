import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { useBot, type BotReply } from '../data/bot';
import { dirOf, useLang } from '../i18n';

type Msg = { id: number; me: boolean } & BotReply;

let uid = 0;
const start = (welcome: BotReply): Msg[] => [
  { id: ++uid, me: true, text: ['/start'] },
  { id: ++uid, me: false, ...welcome },
];

/**
 * ForwardBot, playable. Every button answers with the real bot's own text.
 * `interactive={false}` renders the same screen as a still picture.
 */
export function BotDemo({ interactive = true, className }: { interactive?: boolean; className?: string }) {
  const bot = useBot();
  const lang = useLang();
  const [msgs, setMsgs] = useState<Msg[]>(() => start(bot.welcome));
  const [typing, setTyping] = useState(false);
  const body = useRef<HTMLDivElement>(null);
  const timer = useRef<number>(0);

  useEffect(() => {
    const el = body.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: msgs.length > 2 ? 'smooth' : 'auto' });
  }, [msgs, typing]);
  useEffect(() => () => clearTimeout(timer.current), []);

  const press = (key: keyof typeof bot.replies, label: string) => {
    if (!interactive || typing) return;
    const reply = bot.replies[key];
    setMsgs((m) => [...m.slice(-6), { id: ++uid, me: true, text: [label] }]);
    setTyping(true);
    timer.current = window.setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { id: ++uid, me: false, ...reply }]);
    }, 700);
  };

  return (
    <div className={clsx('tg', className)} dir={dirOf(lang)}>
      <div className="tg-head">
        <img src="logos/forwardbot.png" alt="" width={36} height={36} />
        <div>
          <strong>{bot.name}</strong>
          <span>{typing ? bot.typing : bot.status}</span>
        </div>
      </div>
      <div className="tg-body" ref={body} data-lenis-prevent>
        {msgs.map((m) => (
          <div key={m.id} className={clsx('tg-msg', m.me && 'tg-msg--me')}>
            {m.text.map((line, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: line }} />
            ))}
            {m.inline && (
              <div className="tg-inline">
                {m.inline.map((b) => (
                  <span key={b}>{b}</span>
                ))}
              </div>
            )}
          </div>
        ))}
        {typing && (
          <div className="tg-msg tg-typing" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
        )}
      </div>
      <div className="tg-keyboard" role={interactive ? 'group' : undefined} aria-label={bot.menuLabel}>
        {bot.menu.map((row) => (
          <div className="tg-row" key={row[0].key}>
            {row.map((b) =>
              interactive ? (
                <button key={b.key} type="button" className="tg-btn" onClick={() => press(b.key, b.label)}>
                  {b.label}
                </button>
              ) : (
                <span key={b.key} className="tg-btn">
                  {b.label}
                </span>
              ),
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
