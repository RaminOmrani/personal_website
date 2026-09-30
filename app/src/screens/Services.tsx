import { useId, useState, type CSSProperties, type ReactNode } from 'react';
import { useCopy } from '../../../v3/src/data/copy';
import { whatsappWith } from '../../../v3/src/data/site';
import { digits, useLang } from '../../../v3/src/i18n';
import { Grad } from '../../../v3/src/ui/Text';
import { useAppCopy } from '../copy';
import { Icon } from '../ui/Icon';

/** Remembers which service was open, across tab switches. */
let remembered: string | null = null;

export function Services() {
  const lang = useLang();
  const { services, process, marquee, faq } = useCopy();
  const t = useAppCopy();
  const [open, setOpen] = useState<string | null>(remembered);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const toggle = (id: string) => {
    const next = open === id ? null : id;
    remembered = next;
    setOpen(next);
  };

  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">{services.eyebrow}</p>
        <h1 className="display">
          <Grad text={services.title} />
        </h1>
      </header>

      <ul className="services">
        {services.items.map((s) => (
          <li key={s.id} className="service" data-open={open === s.id || undefined}>
            <Disclosure
              open={open === s.id}
              onToggle={() => toggle(s.id)}
              head={
                <>
                  <span className="service-icon">
                    <Icon name={s.icon} size={22} />
                  </span>
                  <span className="service-text">
                    <strong>{s.title}</strong>
                    <small>{s.text}</small>
                  </span>
                </>
              }
            >
              <ul className="ticks">
                {s.points.map((pt) => (
                  <li key={pt}>
                    <Icon name="check" size={18} />
                    {pt}
                  </li>
                ))}
              </ul>
              <a className="btn btn--wa btn--sm" href={whatsappWith(services.askMessage(s.topic))} target="_blank" rel="noopener">
                <Icon name="whatsapp" size={18} />
                {services.ask(s.topic)}
              </a>
            </Disclosure>
          </li>
        ))}
      </ul>

      <section className="block" aria-labelledby="process-title">
        <p className="eyebrow">{process.eyebrow}</p>
        <h2 className="display display--sm" id="process-title">
          <Grad text={process.title} />
        </h2>
        <ol className="steps">
          {process.steps.map((s, i) => (
            <li key={s.title} className="step" style={{ '--i': i } as CSSProperties}>
              <span className="step-n" aria-hidden="true">
                {digits(i + 1, lang)}
              </span>
              <div className="step-body">
                <div className="step-head">
                  <strong>{s.title}</strong>
                  <span className="step-time">{s.time}</span>
                </div>
                <p>{s.text}</p>
                <p className="step-get">
                  <Icon name="check" size={16} />
                  {s.get}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="block" aria-labelledby="ready-title">
        <h2 className="block-title" id="ready-title">
          {marquee.label}
        </h2>
        <ul className="tags">
          {marquee.items.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      </section>

      <section className="block" aria-labelledby="faq-title">
        <h2 className="block-title" id="faq-title">
          {t.services.faq}
        </h2>
        <ul className="faq">
          {faq.items.map((f, i) => (
            <li key={f.q} className="faq-item">
              <Disclosure open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} head={<strong className="faq-q">{f.q}</strong>}>
                <p className="faq-a">{f.a}</p>
              </Disclosure>
            </li>
          ))}
        </ul>
        <a className="btn btn--soft btn--block" href={whatsappWith(faq.askMessage)} target="_blank" rel="noopener">
          <Icon name="whatsapp" size={19} />
          {faq.ask}
        </a>
      </section>
    </div>
  );
}

/** A row that opens in place; the panel's height animates through a 0fr → 1fr grid row. */
function Disclosure({ open, onToggle, head, children }: { open: boolean; onToggle: () => void; head: ReactNode; children: ReactNode }) {
  const id = useId();
  return (
    <>
      <button type="button" className="disclosure" aria-expanded={open} aria-controls={id} onClick={onToggle}>
        {head}
        <span className="disclosure-mark" aria-hidden="true">
          <Icon name="plus" size={18} />
        </span>
      </button>
      <div className="disclosure-panel" id={id} data-open={open || undefined} inert={!open}>
        <div className="disclosure-inner">{children}</div>
      </div>
    </>
  );
}
