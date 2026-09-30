import { useEffect, useRef, useState } from 'react';
import { useCopy } from '../../../v3/src/data/copy';
import { telegramWith, useSite, whatsappWith } from '../../../v3/src/data/site';
import { useLang } from '../../../v3/src/i18n';
import { Grad } from '../../../v3/src/ui/Text';
import { useAppCopy } from '../copy';
import { copyText, prefersReducedMotion } from '../lib/hooks';
import { ArchPortrait } from '../ui/bits';
import { Icon } from '../ui/Icon';
import { toast } from '../ui/Toast';

export function Contact() {
  const lang = useLang();
  const { contact } = useCopy();
  const t = useAppCopy();
  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">{contact.eyebrow}</p>
        <h1 className="display">
          <Grad text={contact.title} />
        </h1>
        <p className="lead">{contact.text}</p>
      </header>

      <section className="block block--tight" aria-labelledby="channels-title">
        <h2 className="block-title" id="channels-title">
          {t.contact.channels}
        </h2>
        <Channels />
      </section>

      <section className="block" aria-labelledby="picker-title">
        <h2 className="block-title" id="picker-title">
          {t.contact.picker}
        </h2>
        <p className="block-text">{t.contact.pickerText}</p>
        {/* a new language starts the conversation over */}
        <Picker key={lang} />
      </section>

      <About />
    </div>
  );
}

function Channels() {
  const { contact } = useCopy();
  const site = useSite();
  const t = useAppCopy();
  const items = [
    { id: 'call', icon: 'call', label: contact.channels.call, value: site.phone.display, href: site.phone.href, copy: site.phone.plain },
    { id: 'wa', icon: 'whatsapp', label: contact.channels.whatsapp, value: site.whatsapp.display, href: whatsappWith(contact.channelMessage), copy: site.whatsapp.plain, ext: true },
    { id: 'tg', icon: 'telegram', label: contact.channels.telegram, value: site.telegram.display, href: site.telegram.href, copy: site.telegram.display, ext: true },
    { id: 'mail', icon: 'mail', label: contact.channels.email, value: site.email, href: `mailto:${site.email}`, copy: site.email },
  ];
  return (
    <ul className="channels">
      {items.map((c) => (
        <li key={c.id} className={`channel channel--${c.id}`}>
          <a className="channel-link" href={c.href} {...(c.ext ? { target: '_blank', rel: 'noopener' } : {})} aria-label={`${t.contact.open(c.label)}: ${c.value}`}>
            <span className="channel-icon">
              <Icon name={c.icon} size={23} />
            </span>
            <span className="channel-text">
              <strong>{c.label}</strong>
              <span className="channel-value" dir="ltr">
                {c.value}
              </span>
            </span>
          </a>
          <button
            type="button"
            className="channel-copy"
            aria-label={contact.copy(c.label)}
            onClick={async () => toast((await copyText(c.copy)) ? contact.copiedWhat(c.label) : contact.copyFailed)}
          >
            <Icon name="copy" size={19} />
          </button>
        </li>
      ))}
    </ul>
  );
}

type Line = { id: number; me: boolean; text: string };
let lid = 0;

/** v3's 30-second chat: three taps write the visitor's first message, ready for WhatsApp or Telegram. */
function Picker() {
  const c = useCopy().contact.chat;
  const site = useSite();
  const [lines, setLines] = useState<Line[]>(() => [{ id: ++lid, me: false, text: c.hello }]);
  const [step, setStep] = useState<'need' | 'budget' | 'name' | 'ready'>('need');
  const [typing, setTyping] = useState(false);
  const [need, setNeed] = useState(-1);
  const [budget, setBudget] = useState(-1);
  const [name, setName] = useState('');
  const bottom = useRef<HTMLDivElement>(null);
  const timer = useRef(0);
  const started = useRef(false);

  useEffect(() => () => clearTimeout(timer.current), []);

  // keep the next choice in view as the conversation grows
  useEffect(() => {
    if (!started.current || typing) return;
    bottom.current?.scrollIntoView({ block: 'nearest', behavior: prefersReducedMotion() ? 'instant' : 'smooth' });
  }, [typing, step]);

  const say = (mine: string, reply: string | null, nextStep: typeof step) => {
    started.current = true;
    setLines((l) => [...l, { id: ++lid, me: true, text: mine }]);
    setTyping(true);
    setStep(nextStep);
    timer.current = window.setTimeout(() => {
      setTyping(false);
      if (reply) setLines((l) => [...l, { id: ++lid, me: false, text: reply }]);
    }, 550);
  };

  const message = [c.greet(name.trim()), c.needLines[need] ?? c.needLines[c.needLines.length - 1], c.budgetLines[budget] ?? ''].filter(Boolean).join(' ');

  const restart = () => {
    clearTimeout(timer.current);
    setTyping(false);
    setNeed(-1);
    setBudget(-1);
    setName('');
    setStep('need');
    setLines([{ id: ++lid, me: false, text: c.hello }]);
  };

  const options = step === 'need' ? c.needs : step === 'budget' ? c.budgets : null;

  return (
    <div className="picker">
      <div className="picker-head">
        <span className="avatar">
          <img src="me/me-face.webp" alt="" width={80} height={80} />
        </span>
        <span className="picker-who">
          <strong>{site.name}</strong>
          <small>{typing ? c.typing : c.status}</small>
        </span>
        {lines.length > 1 && (
          <button type="button" className="picker-restart" onClick={restart}>
            <Icon name="refresh" size={16} />
            {c.restart}
          </button>
        )}
      </div>
      <div className="picker-body" aria-live="polite">
        {lines.map((l) => (
          <p key={l.id} className={l.me ? 'bubble bubble--me' : 'bubble'}>
            {l.text}
          </p>
        ))}
        {typing && (
          <p className="bubble bubble--typing" aria-label={c.typingLabel}>
            <i />
            <i />
            <i />
          </p>
        )}
        {step === 'ready' && !typing && <p className="bubble bubble--draft">{message}</p>}
      </div>
      <div className="picker-input" ref={bottom}>
        {options && !typing && (
          <div className="picker-options">
            {options.map((o, i) => (
              <button
                key={o}
                type="button"
                className="chip chip--option"
                onClick={() => {
                  if (step === 'need') {
                    setNeed(i);
                    say(o, c.askBudget, 'budget');
                  } else {
                    setBudget(i);
                    say(o, c.askName, 'name');
                  }
                }}
              >
                {o}
              </button>
            ))}
          </div>
        )}
        {step === 'name' && !typing && (
          <form
            className="picker-name"
            onSubmit={(e) => {
              e.preventDefault();
              (document.activeElement as HTMLElement | null)?.blur();
              say(name.trim() || c.noName, c.ready, 'ready');
            }}
          >
            <label htmlFor="picker-name" className="sr-only">
              {c.nameLabel}
            </label>
            <input id="picker-name" value={name} onChange={(e) => setName(e.target.value)} placeholder={c.namePlaceholder} autoComplete="given-name" enterKeyHint="send" maxLength={40} />
            <button type="submit" className="btn btn--primary">
              {c.next}
            </button>
          </form>
        )}
        {step === 'ready' && !typing && (
          <div className="picker-send">
            <a className="btn btn--wa" href={whatsappWith(message)} target="_blank" rel="noopener">
              <Icon name="whatsapp" size={20} />
              {c.sendWhatsapp}
            </a>
            <a
              className="btn btn--tg"
              href={telegramWith(message)}
              target="_blank"
              rel="noopener"
              onClick={async () => {
                if (await copyText(message)) toast(c.copied);
              }}
            >
              <Icon name="telegram" size={20} />
              {c.sendTelegram}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

function About() {
  const { about } = useCopy();
  const site = useSite();
  return (
    <section className="block about" aria-labelledby="about-title">
      <div className="about-card">
        <ArchPortrait src="me/me-think.webp" alt={about.portraitAlt} className="about-arch" />
        <p className="eyebrow">{about.eyebrow}</p>
        <h2 className="about-title" id="about-title">
          <Grad text={about.title} />
        </h2>
        <p className="about-now">
          <span className="live-dot" aria-hidden="true" />
          {about.now}
        </p>
        {about.text.map((p) => (
          <p key={p} className="about-text">
            {p}
          </p>
        ))}
        <ul className="tags">
          {about.chips.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        <div className="about-links">
          {site.socials.map((s) => (
            <a key={s.label} className="social" href={s.href} target="_blank" rel="noopener">
              <Icon name={s.label === 'GitHub' ? 'github' : 'linkedin'} size={20} />
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
