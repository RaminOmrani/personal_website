/**
 * اطلاعات تماس و هویت — برای تغییر شماره، آیدی یا ایمیل فقط همین فایل را ویرایش کنید.
 * Contact details and identity. Texts are bilingual: l('فارسی', 'English').
 */

import { l, type Lang } from '../i18n';

const PHONE_INTL = '989017021166';
const WHATSAPP_INTL = '989365743458';

export const site = {
  name: l('رامین عمرانی', 'Ramin Omrani'),
  role: l('طراحی سایت، اپلیکیشن و ربات', 'Websites, apps & bots'),
  city: l('مشهد', 'Mashhad'),
  description: l(
    'رامین عمرانی — طراحی و ساخت سایت، اپلیکیشن موبایل، CRM و ربات تلگرام برای کسب‌وکارها. از طراحی تا راه‌اندازی روی سرور، با پشتیبانی بعد از تحویل.',
    'Ramin Omrani designs and builds websites, mobile apps, CRMs and Telegram bots for businesses — from design to launch on your server, with support after handover.',
  ),
  /** Public address of this version; the English page is `${url}en.html`. */
  url: 'https://raminomrani.ir/v2/',
  email: 'ramin.omrani.95@gmail.com',
  phone: {
    display: l('۰۹۰۱ ۷۰۲ ۱۱۶۶', '+98 901 702 1166'),
    href: `tel:+${PHONE_INTL}`,
    /** What the copy button puts on the clipboard. */
    copy: l('0' + PHONE_INTL.slice(2), '+' + PHONE_INTL),
  },
  whatsapp: `https://wa.me/${WHATSAPP_INTL}`,
  whatsappDisplay: l('۰۹۳۶ ۵۷۴ ۳۴۵۸', '+98 936 574 3458'),
  telegram: 'https://t.me/Daneshjoo_AI',
  telegramHandle: '@Daneshjoo_AI',
  socials: [
    { label: 'GitHub', href: 'https://github.com/RaminOmrani' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ramin-omrani' },
  ],
};

/** A WhatsApp link that opens the chat with a pre-written message. */
export const whatsappWith = (text: string) => `${site.whatsapp}?text=${encodeURIComponent(text)}`;

/** This year for the footer: Jalali in Persian digits (۱۴۰۵) on fa, Gregorian (2026) on en. */
export const copyrightYear = (lang: Lang) =>
  lang === 'fa' ? new Intl.DateTimeFormat('fa-IR-u-ca-persian', { year: 'numeric' }).format(new Date()) : String(new Date().getFullYear());
