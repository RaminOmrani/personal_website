import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useCopy } from '../data/copy';
import { telegramWith, useSite, whatsappWith, yearFor } from '../data/site';
import { useLang } from '../i18n';
import { copyText, useReducedMotion } from '../lib/hooks';
import { scrollToTarget } from '../lib/scroll';
import { auroraFragment } from '../three/shaders';
import { Icon } from '../ui/Icon';
import { toast } from '../ui/Toast';
import { Grad } from '../ui/Text';
import { Logo } from '../ui/Logo';

/** The same daylight aurora as the film, on a tiny raw-WebGL canvas that only runs while visible. */
function AuroraCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const mirror = useLang() === 'en';
  useEffect(() => {
    const canvas = ref.current;
    const gl = canvas?.getContext('webgl', { antialias: false, alpha: false, preserveDrawingBuffer: false });
    if (!canvas || !gl) return;
    const vs = 'attribute vec2 position; varying vec2 vUv; void main(){ vUv = position * 0.5 + 0.5; gl_Position = vec4(position, 0.0, 1.0); }';
    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, auroraFragment));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'position');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = (n: string) => gl.getUniformLocation(prog, n);
    const set3 = (n: string, hex: string) => {
      const v = parseInt(hex.slice(1), 16);
      gl.uniform3f(U(n), ((v >> 16) & 255) / 255, ((v >> 8) & 255) / 255, (v & 255) / 255);
    };
    set3('uBase', '#F6F4EF');
    set3('uC1', '#7EA0F0');
    set3('uC2', '#F4C47C');
    set3('uC3', '#72D5CA');
    gl.uniform1f(U('uIntensity'), 1.05);
    gl.uniform1f(U('uFlip'), mirror ? 1 : 0);
    gl.uniform2f(U('uPointer'), 0, 0);

    // soft by nature, so render at half resolution
    const resize = () => {
      const w = Math.max(1, Math.round(canvas.clientWidth * 0.5));
      const h = Math.max(1, Math.round(canvas.clientHeight * 0.5));
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(U('uRes'), w, h);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let raf = 0;
    let visible = false;
    const t0 = performance.now();
    const draw = () => {
      gl.uniform1f(U('uTime'), (performance.now() - t0) / 1000 + 40);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (visible && !reduced) raf = requestAnimationFrame(draw);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) draw();
    });
    io.observe(canvas);
    draw();
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, [reduced, mirror]);
  return <canvas ref={ref} className="contact-aurora" aria-hidden="true" />;
}

type Line = { id: number; me: boolean; text: string };
let lid = 0;

/** A 30-second chat that writes the first message for the visitor. */
function ChatBrief() {
  const c = useCopy().contact.chat;
  const site = useSite();
  const [lines, setLines] = useState<Line[]>([{ id: ++lid, me: false, text: c.hello }]);
  const [step, setStep] = useState<'need' | 'budget' | 'name' | 'ready'>('need');
  const [typing, setTyping] = useState(false);
  const [need, setNeed] = useState(-1);
  const [budget, setBudget] = useState(-1);
  const [name, setName] = useState('');
  const body = useRef<HTMLDivElement>(null);
  const timer = useRef(0);

  useEffect(() => {
    const el = body.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [lines, typing, step]);
  useEffect(() => () => clearTimeout(timer.current), []);

  const say = (mine: string, reply: string | null, nextStep: typeof step) => {
    setLines((l) => [...l, { id: ++lid, me: true, text: mine }]);
    setTyping(true);
    setStep(nextStep);
    timer.current = window.setTimeout(() => {
      setTyping(false);
      if (reply) setLines((l) => [...l, { id: ++lid, me: false, text: reply }]);
    }, 650);
  };

  // greeting, what they want (the last option, "not sure", asks for advice), and the budget if they gave one
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

  const sendTelegram = async () => {
    if (await copyText(message)) toast(c.copied);
  };

  const options = step === 'need' ? c.needs : step === 'budget' ? c.budgets : null;

  return (
    <div className="chat glass" data-reveal>
      <div className="chat-head">
        <span className="avatar">
          <img src="me/me-face.webp" alt="" width={80} height={80} />
        </span>
        <div>
          <strong>{site.name}</strong>
          <span>{typing ? c.typing : c.status}</span>
        </div>
        {lines.length > 1 && (
          <button type="button" className="chat-restart" onClick={restart}>
            {c.restart}
          </button>
        )}
      </div>
      <div className="chat-body" ref={body} data-lenis-prevent aria-live="polite">
        <AnimatePresence initial={false}>
          {lines.map((l) => (
            <motion.div
              key={l.id}
              className={l.me ? 'line line--me' : 'line'}
              initial={{ opacity: 0, transform: 'translateY(10px) scale(0.97)' }}
              animate={{ opacity: 1, transform: 'translateY(0px) scale(1)' }}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
            >
              {!l.me && (
                <span className="avatar avatar--sm" aria-hidden="true">
                  <img src="me/me-face.webp" alt="" width={68} height={68} />
                </span>
              )}
              <p className={l.me ? 'bubble bubble--me' : 'bubble'}>{l.text}</p>
            </motion.div>
          ))}
        </AnimatePresence>
        {typing && (
          <p className="bubble bubble--typing" aria-label={c.typingLabel}>
            <i />
            <i />
            <i />
          </p>
        )}
        {step === 'ready' && !typing && (
          <div className="chat-final">
            <p className="bubble bubble--draft">{message}</p>
          </div>
        )}
      </div>
      <div className="chat-input">
        {options && !typing && (
          <div className="chat-options">
            {options.map((o, i) => (
              <button
                key={o}
                type="button"
                className="chat-option"
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
            className="chat-name"
            onSubmit={(e) => {
              e.preventDefault();
              say(name.trim() || c.noName, c.ready, 'ready');
            }}
          >
            <label htmlFor="chat-name" className="sr-only">
              {c.nameLabel}
            </label>
            <input id="chat-name" value={name} onChange={(e) => setName(e.target.value)} placeholder={c.namePlaceholder} autoComplete="given-name" enterKeyHint="send" maxLength={40} />
            <button type="submit" className="btn btn--primary">
              {c.next}
            </button>
          </form>
        )}
        {step === 'ready' && !typing && (
          <div className="chat-send">
            <a className="btn btn--whatsapp btn--lg" href={whatsappWith(message)} target="_blank" rel="noopener">
              <Icon name="whatsapp" />
              {c.sendWhatsapp}
            </a>
            <a className="btn btn--telegram btn--lg" href={telegramWith(message)} target="_blank" rel="noopener" onClick={sendTelegram}>
              <Icon name="telegram" />
              {c.sendTelegram}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

function Channels() {
  const { contact } = useCopy();
  const site = useSite();
  const items = [
    { id: 'call', icon: 'call', label: contact.channels.call, value: site.phone.display, href: site.phone.href, copy: site.phone.plain },
    { id: 'wa', icon: 'whatsapp', label: contact.channels.whatsapp, value: site.whatsapp.display, href: whatsappWith(contact.channelMessage), copy: site.whatsapp.plain, ext: true },
    { id: 'tg', icon: 'telegram', label: contact.channels.telegram, value: site.telegram.display, href: site.telegram.href, copy: site.telegram.display, ext: true },
    { id: 'mail', icon: 'mail', label: contact.channels.email, value: site.email, href: `mailto:${site.email}`, copy: site.email },
  ];
  return (
    <ul className="channels" data-reveal>
      {items.map((c) => (
        <li key={c.id} className={`channel channel--${c.id} glass`}>
          <span className="channel-icon">
            <Icon name={c.icon} size={22} />
          </span>
          <span className="channel-text">
            <a className="channel-link" href={c.href} {...(c.ext ? { target: '_blank', rel: 'noopener' } : {})}>
              {c.label}
            </a>
            <span className="channel-value" dir="ltr">
              {c.value}
            </span>
          </span>
          <button
            type="button"
            className="icon-btn icon-btn--sm channel-copy"
            aria-label={contact.copy(c.label)}
            onClick={async () => toast((await copyText(c.copy)) ? contact.copiedWhat(c.label) : contact.copyFailed)}
          >
            <Icon name="copy" size={16} />
          </button>
        </li>
      ))}
    </ul>
  );
}

export function Contact() {
  const { contact } = useCopy();
  return (
    <section className="contact" id="contact">
      <AuroraCanvas />
      <div className="container contact-inner">
        <header className="section-head section-head--center" data-reveal>
          <p className="eyebrow">{contact.eyebrow}</p>
          <h2 className="display display--xl">
            <Grad text={contact.title} />
          </h2>
          <p className="section-text">{contact.text}</p>
        </header>
        <div className="contact-grid">
          <ChatBrief />
          <Channels />
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const lang = useLang();
  const { nav, ui } = useCopy();
  const site = useSite();
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Logo size={48} latin />
          <p>
            {site.role} · {site.city}
          </p>
          <span className="footer-sign" aria-hidden="true">
            {site.name}
          </span>
        </div>
        <nav className="footer-nav" aria-label={ui.footerLinks}>
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToTarget(n.href);
              }}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="footer-social">
          <a href={site.whatsapp.href} target="_blank" rel="noopener" aria-label={ui.whatsapp}>
            <Icon name="whatsapp" />
          </a>
          <a href={site.telegram.href} target="_blank" rel="noopener" aria-label={ui.telegram}>
            <Icon name="telegram" />
          </a>
          <a href={site.socials[0].href} target="_blank" rel="noopener" aria-label={ui.github}>
            <Icon name="github" />
          </a>
          <a href={site.socials[1].href} target="_blank" rel="noopener" aria-label={ui.linkedin}>
            <Icon name="linkedin" />
          </a>
        </div>
        {/* Enamad (enamad.ir) trust seal: keep the link and image exactly as Enamad issued them */}
        <a
          className="footer-seal"
          referrerPolicy="origin"
          target="_blank"
          href="https://trustseal.enamad.ir/?id=8117770&Code=9EiztP6QldcKM73OthDdMisT3J4LgfOk"
          aria-label={ui.enamad}
        >
          <img
            referrerPolicy="origin"
            src="https://trustseal.enamad.ir/logo.aspx?id=8117770&Code=9EiztP6QldcKM73OthDdMisT3J4LgfOk"
            alt=""
            style={{ cursor: 'pointer' }}
            {...{ code: '9EiztP6QldcKM73OthDdMisT3J4LgfOk' }}
          />
        </a>
        <p className="footer-copy">
          © {yearFor(lang)} {site.name} · {ui.rights}
        </p>
        <a className="footer-versions" href="../?choose">
          <Icon name="layers" size={16} />
          {ui.versions}
        </a>
      </div>
    </footer>
  );
}
