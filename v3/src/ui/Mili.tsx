import { dirOf, l, useLang } from '../i18n';
import { Icon } from './Icon';

const text = {
  name: l('دستیار هوشمند میلی', 'Mili, the AI assistant'),
  tagline: l('همیشه بیدار، همیشه پاسخگو', 'Always awake, always answering'),
  hello: l('سلام! چطور می‌تونم کمکت کنم؟', 'Hi! How can I help you?'),
  sub: l('هر سوالی درباره‌ی نرم‌افزار داری بپرس — جواب رو از توی راهنماهای رسمی برات پیدا می‌کنم.', 'Ask me anything about the software — I’ll find the answer for you in the official guides.'),
  input: l('سوالت رو اینجا بنویس…', 'Type your question here…'),
};

/** The "Mili" support assistant's opening screen, with its real greeting. */
export function Mili() {
  const lang = useLang();
  return (
    <div className="mili" dir={dirOf(lang)}>
      <div className="mili-head">
        <span className="mili-avatar">
          <Icon name="sparkle" size={18} />
        </span>
        <div>
          <strong>{text.name[lang]}</strong>
          <span>{text.tagline[lang]}</span>
        </div>
      </div>
      <div className="mili-body">
        <span className="mili-orb" aria-hidden="true" />
        <p className="mili-hello">{text.hello[lang]}</p>
        <p className="mili-sub">{text.sub[lang]}</p>
      </div>
      <div className="mili-input">
        <span>{text.input[lang]}</span>
        <span className="mili-send">
          <Icon name="mic" size={16} />
        </span>
      </div>
    </div>
  );
}
