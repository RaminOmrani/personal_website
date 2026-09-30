import clsx from 'clsx';
import { Icon } from './Icon';

/**
 * The ForwardBot /start screen, rebuilt from the bot's real texts and
 * main-menu buttons (telkap/i18n.py and keyboards.py in the bot's repo).
 */
export function TelegramChat({ compact }: { compact?: boolean }) {
  const features = [
    '⚡️ کپی لحظه‌ای از کانال یا گروه',
    '📤 انتشار همزمان در چند کانال، با امضای اختصاصی هرکدام',
    '✂️ جایگزینی کلمات، حذف لینک و هشتگ',
    '🚦 فیلتر هوشمند تبلیغات',
    '💧 واترمارک تصاویر',
    '🕓 کپی پیام‌های گذشته',
  ];
  const menu = [
    ['➕ کار جدید', '📋 کارهای کپی'],
    ['↪️ فوروارد پیشرفته', '👤 حساب کاربری'],
    ['💳 خرید اشتراک', '👛 کیف پول و دعوت'],
    ['📚 راهنما', '🛟 پشتیبانی'],
  ];
  return (
    <div className={clsx('tg', compact && 'tg--compact')} dir="rtl">
      <div className="tg-head">
        <img src="logos/forwardbot.png" alt="" width={36} height={36} />
        <div>
          <strong>فورواردبات</strong>
          <span>ربات</span>
        </div>
      </div>
      <div className="tg-body">
        <div className="tg-msg tg-msg--me">/start</div>
        <div className="tg-msg">
          <p>
            <b>🤖 ربات کپی محتوای تلگرام</b>
          </p>
          <p>پست‌های کانال‌ها را به‌صورت خودکار و لحظه‌ای، با تغییرات دلخواه، در کانال خودتان منتشر کنید.</p>
          {!compact && (
            <>
              <p>
                <b>امکانات اصلی</b>
              </p>
              <ul>
                {features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <p>از دکمه‌های زیر شروع کنید 👇</p>
            </>
          )}
        </div>
      </div>
      <div className="tg-keyboard" aria-label="منوی ربات">
        {menu.map((row) => (
          <div className="tg-row" key={row[0]}>
            {row.map((b, i) => (
              <span key={b} className={clsx('tg-btn', b.startsWith('➕') && 'tg-btn--go', b.startsWith('💳') && 'tg-btn--calm')} data-i={i}>
                {b}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** The "Mili" support assistant's opening screen, with its real greeting text. */
export function MiliChat() {
  return (
    <div className="mili" dir="rtl">
      <div className="mili-head">
        <span className="mili-avatar">
          <Icon name="sparkle" size={18} />
        </span>
        <div>
          <strong>دستیار هوشمند میلی</strong>
          <span>همیشه بیدار، همیشه پاسخگو</span>
        </div>
        <span className="mili-human">
          <Icon name="users" size={14} /> کارشناس انسانی
        </span>
      </div>
      <div className="mili-body">
        <p className="mili-hello">سلام! چطور می‌تونم کمکت کنم؟</p>
        <p className="mili-sub">هر سوالی درباره‌ی نرم‌افزار داری بپرس — جواب رو از توی راهنماهای رسمی برات پیدا می‌کنم.</p>
      </div>
      <div className="mili-input">
        <span>سوالت رو اینجا بنویس…</span>
        <span className="mili-send">
          <Icon name="mic" size={16} />
        </span>
      </div>
      <p className="mili-note">پاسخ‌ها بر پایه‌ی راهنماهای رسمی ساخته می‌شوند.</p>
    </div>
  );
}
