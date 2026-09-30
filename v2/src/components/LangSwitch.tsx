import clsx from 'clsx';
import { otherPage, rememberLang, useLang } from '../i18n';

/**
 * A compact FA / EN toggle. It is a plain link to the other page (both live in the same folder),
 * so it works before JavaScript loads; the click also remembers the choice for the version chooser.
 */
export function LangSwitch({ className }: { className?: string }) {
  const { lang } = useLang();
  const other = otherPage[lang];
  return (
    <a
      className={clsx('lang-switch', className)}
      href={other.href}
      hrefLang={other.lang}
      lang={other.lang}
      dir="ltr"
      // named in the language it switches to, the way language pickers are read out
      aria-label={other.lang === 'en' ? 'English' : 'فارسی'}
      onClick={() => rememberLang(other.lang)}
    >
      <span data-on={lang === 'fa' || undefined} aria-hidden="true">
        FA
      </span>
      <span data-on={lang === 'en' || undefined} aria-hidden="true">
        EN
      </span>
    </a>
  );
}
