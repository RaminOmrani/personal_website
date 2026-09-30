import { useState, type CSSProperties } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { whatsappWith } from '../data/site';
import { Browser, Phone } from '../components/Devices';
import { EASE_OUT } from '../components/Hero';
import { Icon } from '../components/Icon';
import { TelegramChat } from '../components/LiveDemos';
import { Marked } from '../lib';

/**
 * Variant "گفت‌وگو" — axis: interaction model.
 * The hero asks one question; each answer swaps in a real project and rewrites the CTA.
 */
const answers = [
  {
    id: 'site',
    label: 'سایت',
    icon: 'globe',
    note: 'سایت کلینیک ذهن سبز: شبانه‌روز نوبت می‌گیرد، حتی وقتی منشی نیست.',
    message: 'سلام رامین، یک سایت برای کسب‌وکارم می‌خواهم.',
    desktop: { src: 'work/zehnesabz-home.jpg', url: 'zehnesabz.com' },
    phone: 'work/zehnesabz-home-m.jpg',
  },
  {
    id: 'app',
    label: 'اپلیکیشن',
    icon: 'phone',
    note: 'اپلیکیشن ذهن سبز: مراجع جلسه، تمرین و پرداختش را روی گوشی می‌بیند.',
    message: 'سلام رامین، یک اپلیکیشن موبایل می‌خواهم.',
    phones: ['work/zehnesabz-app-schedule.jpg', 'work/zehnesabz-app-dashboard.jpg'],
  },
  {
    id: 'crm',
    label: 'CRM',
    icon: 'kanban',
    note: 'CRM میلیونر: تیم فروش هیچ مشتری‌ای را فراموش نمی‌کند و فاکتور مستقیم در حسابداری ثبت می‌شود.',
    message: 'سلام رامین، یک CRM برای تیم فروشم می‌خواهم.',
    desktop: { src: 'work/crm-pipeline.jpg', url: undefined },
    phone: 'work/crm-m.jpg',
  },
  {
    id: 'bot',
    label: 'ربات تلگرام',
    icon: 'bot',
    note: 'فورواردبات: ۲۴ ساعته کار می‌کند، اشتراک می‌فروشد و به کاربرها جواب می‌دهد.',
    message: 'سلام رامین، یک ربات تلگرام می‌خواهم.',
    desktop: { src: 'work/forwardbot-home.jpg', url: 'forwardbot.softmiliac.com' },
    live: true,
  },
] as const;

type Answer = (typeof answers)[number];

function Preview({ a }: { a: Answer }) {
  if ('phones' in a) {
    return (
      <div className="conv-devices conv-devices--phones">
        <Phone src={a.phones[0]} alt="برنامهٔ جلسات در اپلیکیشن" className="conv-phone conv-phone--back" eager />
        <Phone src={a.phones[1]} alt="داشبورد اپلیکیشن" className="conv-phone" eager />
      </div>
    );
  }
  return (
    <div className="conv-devices">
      <Browser src={a.desktop.src} alt={a.note} url={a.desktop.url} className="conv-browser" eager />
      {'live' in a ? (
        <Phone className="conv-phone">
          <TelegramChat compact />
        </Phone>
      ) : (
        <Phone src={a.phone} alt="" className="conv-phone" eager />
      )}
    </div>
  );
}

export function HeroConversation() {
  const [id, setId] = useState<Answer['id']>('site');
  const a = answers.find((x) => x.id === id)!;
  const enter = { opacity: 0, transform: 'translateY(12px) scale(0.98)', filter: 'blur(6px)' };

  return (
    <section className="hero hero--conv" id="top">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="pill" data-enter style={{ '--i': 0 } as CSSProperties}>
            <span className="pulse" aria-hidden="true" />
            الان پروژهٔ جدید می‌پذیرم
          </p>
          <h1 className="hero-title" data-enter style={{ '--i': 1 } as CSSProperties}>
            <Marked text="برای کسب‌وکارتان {چه بسازیم}؟" />
          </h1>
          <div className="conv-answers" role="radiogroup" aria-label="چه چیزی لازم دارید؟" data-enter style={{ '--i': 2 } as CSSProperties}>
            {answers.map((x) => (
              <button key={x.id} type="button" role="radio" aria-checked={x.id === id} className="conv-answer" onClick={() => setId(x.id)}>
                <Icon name={x.icon} size={20} />
                {x.label}
              </button>
            ))}
          </div>
          <div className="conv-note" aria-live="polite" data-enter style={{ '--i': 3 } as CSSProperties}>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.p
                key={a.id}
                initial={{ opacity: 0, filter: 'blur(4px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(4px)', transition: { duration: 0.15 } }}
                transition={{ duration: 0.25, ease: EASE_OUT }}
              >
                {a.note}
              </motion.p>
            </AnimatePresence>
          </div>
          <div className="hero-ctas" data-enter style={{ '--i': 4 } as CSSProperties}>
            <a className="btn btn--brand btn--lg" href={whatsappWith(a.message)} target="_blank" rel="noopener">
              <Icon name="whatsapp" />
              شروع ساخت {a.label} در واتس‌اپ
            </a>
            <a className="btn btn--ghost btn--lg" href="#work">
              همهٔ نمونه‌کارها
              <Icon name="arrow" size={18} />
            </a>
          </div>
        </div>
        <div className="stage conv-stage" data-enter style={{ '--i': 2 } as CSSProperties}>
          <div className="stage-glow" aria-hidden="true" />
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={a.id}
              className="conv-layer"
              initial={enter}
              animate={{ opacity: 1, transform: 'translateY(0px) scale(1)', filter: 'blur(0px)' }}
              exit={{ ...enter, transform: 'translateY(-8px) scale(0.98)', transition: { duration: 0.18, ease: EASE_OUT } }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
            >
              <Preview a={a} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
