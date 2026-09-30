import clsx from 'clsx';
import { l, useLang } from '../i18n';
import { Icon } from './Icon';

/**
 * The ForwardBot /start screen, rebuilt from the bot's real texts and
 * main-menu buttons (telkap/i18n.py and keyboards.py in the bot's repo);
 * the English page shows the same screen in English.
 */
const bot = {
  name: l('فورواردبات', 'ForwardBot'),
  kind: l('ربات', 'bot'),
  title: l('🤖 ربات کپی محتوای تلگرام', '🤖 Telegram content copy bot'),
  intro: l(
    'پست‌های کانال‌ها را به‌صورت خودکار و لحظه‌ای، با تغییرات دلخواه، در کانال خودتان منتشر کنید.',
    'Publish posts from other channels in your own channel — automatically, in real time, with the changes you want.',
  ),
  featuresTitle: l('امکانات اصلی', 'Main features'),
  features: [
    l('⚡️ کپی لحظه‌ای از کانال یا گروه', '⚡️ Instant copying from a channel or group'),
    l('📤 انتشار همزمان در چند کانال، با امضای اختصاصی هرکدام', '📤 Post to several channels at once, each with its own signature'),
    l('✂️ جایگزینی کلمات، حذف لینک و هشتگ', '✂️ Replace words, remove links and hashtags'),
    l('🚦 فیلتر هوشمند تبلیغات', '🚦 Smart ad filter'),
    l('💧 واترمارک تصاویر', '💧 Image watermarks'),
    l('🕓 کپی پیام‌های گذشته', '🕓 Copy past messages'),
  ],
  start: l('از دکمه‌های زیر شروع کنید 👇', 'Start with the buttons below 👇'),
  menuLabel: l('منوی ربات', 'Bot menu'),
  menu: [
    [l('➕ کار جدید', '➕ New job'), l('📋 کارهای کپی', '📋 My copy jobs')],
    [l('↪️ فوروارد پیشرفته', '↪️ Pro forward'), l('👤 حساب کاربری', '👤 My account')],
    [l('💳 خرید اشتراک', '💳 Buy a plan'), l('👛 کیف پول و دعوت', '👛 Wallet & invites')],
    [l('📚 راهنما', '📚 Help'), l('🛟 پشتیبانی', '🛟 Support')],
  ],
};

export function TelegramChat({ compact }: { compact?: boolean }) {
  const { t, dir } = useLang();
  return (
    <div className={clsx('tg', compact && 'tg--compact')} dir={dir}>
      <div className="tg-head">
        <img src="logos/forwardbot.png" alt="" width={36} height={36} />
        <div>
          <strong>{t(bot.name)}</strong>
          <span>{t(bot.kind)}</span>
        </div>
      </div>
      <div className="tg-body">
        <div className="tg-msg tg-msg--me">/start</div>
        <div className="tg-msg">
          <p>
            <b>{t(bot.title)}</b>
          </p>
          <p>{t(bot.intro)}</p>
          {!compact && (
            <>
              <p>
                <b>{t(bot.featuresTitle)}</b>
              </p>
              <ul>
                {bot.features.map((f) => (
                  <li key={f.fa}>{t(f)}</li>
                ))}
              </ul>
              <p>{t(bot.start)}</p>
            </>
          )}
        </div>
      </div>
      <div className="tg-keyboard" aria-label={t(bot.menuLabel)}>
        {bot.menu.map((row) => (
          <div className="tg-row" key={row[0].fa}>
            {row.map((b, i) => (
              <span key={b.fa} className={clsx('tg-btn', b.fa.startsWith('➕') && 'tg-btn--go', b.fa.startsWith('💳') && 'tg-btn--calm')} data-i={i}>
                {t(b)}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** The "Mili" support assistant's opening screen, with its real greeting text. */
const mili = {
  name: l('دستیار هوشمند میلی', 'Mili, smart assistant'),
  tagline: l('همیشه بیدار، همیشه پاسخگو', 'Always awake, always answering'),
  human: l('کارشناس انسانی', 'Human agent'),
  hello: l('سلام! چطور می‌تونم کمکت کنم؟', 'Hi! How can I help you?'),
  sub: l(
    'هر سوالی درباره‌ی نرم‌افزار داری بپرس — جواب رو از توی راهنماهای رسمی برات پیدا می‌کنم.',
    'Ask me anything about the software — I’ll find the answer for you in the official manuals.',
  ),
  input: l('سوالت رو اینجا بنویس…', 'Type your question here…'),
  note: l('پاسخ‌ها بر پایه‌ی راهنماهای رسمی ساخته می‌شوند.', 'Answers are based on the official manuals.'),
};

export function MiliChat() {
  const { t, dir } = useLang();
  return (
    <div className="mili" dir={dir}>
      <div className="mili-head">
        <span className="mili-avatar">
          <Icon name="sparkle" size={18} />
        </span>
        <div>
          <strong>{t(mili.name)}</strong>
          <span>{t(mili.tagline)}</span>
        </div>
        <span className="mili-human">
          <Icon name="users" size={14} /> {t(mili.human)}
        </span>
      </div>
      <div className="mili-body">
        <p className="mili-hello">{t(mili.hello)}</p>
        <p className="mili-sub">{t(mili.sub)}</p>
      </div>
      <div className="mili-input">
        <span>{t(mili.input)}</span>
        <span className="mili-send">
          <Icon name="mic" size={16} />
        </span>
      </div>
      <p className="mili-note">{t(mili.note)}</p>
    </div>
  );
}
