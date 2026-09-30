import { Icon } from './Icon';

/** The "Mili" support assistant's opening screen, with its real greeting. */
export function Mili() {
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
      </div>
      <div className="mili-body">
        <span className="mili-orb" aria-hidden="true" />
        <p className="mili-hello">سلام! چطور می‌تونم کمکت کنم؟</p>
        <p className="mili-sub">هر سوالی درباره‌ی نرم‌افزار داری بپرس — جواب رو از توی راهنماهای رسمی برات پیدا می‌کنم.</p>
      </div>
      <div className="mili-input">
        <span>سوالت رو اینجا بنویس…</span>
        <span className="mili-send">
          <Icon name="mic" size={16} />
        </span>
      </div>
    </div>
  );
}
