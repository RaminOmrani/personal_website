/**
 * اطلاعات تماس و هویت. برای تغییر شماره، آیدی یا ایمیل فقط همین فایل را ویرایش کنید.
 * Contact details and identity, in both languages: l(persian, english).
 */
import { bilingual, faDigits, l, useLang, type Lang } from '../i18n';

const whatsappHref = 'https://wa.me/989365743458';
const telegramHref = 'https://t.me/Daneshjoo_AI';

export const site = bilingual({
  name: l('رامین عمرانی', 'Ramin Omrani'),
  role: l('طراحی و ساخت سایت، اپلیکیشن و ربات', 'Websites, apps and bots, designed and built'),
  city: l('مشهد', 'Mashhad, Iran'),
  /** The public address of this version; the English page is `${url}en.html`. */
  url: 'https://raminomrani.ir/v3/',
  /** پیشنهاد دامنه: raminomrani.ir (اصلی، برای اعتماد و سرعت در ایران) و omrani.dev (بین‌المللی). */
  domain: 'raminomrani.ir',
  email: 'ramin.omrani.95@gmail.com',
  phone: { display: l('۰۹۰۱ ۷۰۲ ۱۱۶۶', '+98 901 702 1166'), plain: l('09017021166', '+989017021166'), href: 'tel:+989017021166' },
  whatsapp: { display: l('۰۹۳۶ ۵۷۴ ۳۴۵۸', '+98 936 574 3458'), plain: l('09365743458', '+989365743458'), href: whatsappHref },
  telegram: { display: '@Daneshjoo_AI', href: telegramHref },
  socials: [
    { label: 'GitHub', href: 'https://github.com/RaminOmrani' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ramin-omrani' },
  ],
});

export type Site = (typeof site)['fa'];

/** Identity and contact details in the page's language. */
export const useSite = () => site[useLang()];

/** WhatsApp chat with a pre-written message. */
export const whatsappWith = (text: string) => `${whatsappHref}?text=${encodeURIComponent(text)}`;

/** Telegram chat; recent Telegram apps also pre-fill `text` as a draft. */
export const telegramWith = (text: string) => `${telegramHref}?text=${encodeURIComponent(text)}`;

/** Persian digits, e.g. 12 → ۱۲ */
export const fa = faDigits;

/** Current Jalali year in Persian digits. */
export const jalaliYear = () => new Intl.DateTimeFormat('fa-IR-u-ca-persian', { year: 'numeric' }).format(new Date());

/** This year in the page's own calendar: Jalali for Persian, Gregorian for English. */
export const yearFor = (lang: Lang) => (lang === 'fa' ? jalaliYear() : String(new Date().getFullYear()));
