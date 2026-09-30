/**
 * اطلاعات تماس و هویت — برای تغییر شماره، آیدی یا ایمیل فقط همین فایل را ویرایش کنید.
 */

const PHONE_INTL = '989017021166';
const WHATSAPP_INTL = '989365743458';

export const site = {
  name: 'رامین عمرانی',
  role: 'طراحی سایت، اپلیکیشن و ربات',
  city: 'مشهد',
  description:
    'رامین عمرانی — طراحی و ساخت سایت، اپلیکیشن موبایل، CRM و ربات تلگرام برای کسب‌وکارها. از طراحی تا راه‌اندازی روی سرور، با پشتیبانی بعد از تحویل.',
  url: 'https://raminomrani.github.io/personal_website/v2/',
  email: 'ramin.omrani.95@gmail.com',
  phone: {
    display: '۰۹۰۱ ۷۰۲ ۱۱۶۶',
    href: `tel:+${PHONE_INTL}`,
  },
  whatsapp: `https://wa.me/${WHATSAPP_INTL}`,
  whatsappDisplay: '۰۹۳۶ ۵۷۴ ۳۴۵۸',
  telegram: 'https://t.me/Daneshjoo_AI',
  telegramHandle: '@Daneshjoo_AI',
  socials: [
    { label: 'GitHub', href: 'https://github.com/RaminOmrani' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ramin-omrani' },
  ],
};

/** A WhatsApp link that opens the chat with a pre-written message. */
export const whatsappWith = (text: string) => `${site.whatsapp}?text=${encodeURIComponent(text)}`;

/** Current Persian (Jalali) year in Persian digits, e.g. ۱۴۰۵. */
export const jalaliYear = () => new Intl.DateTimeFormat('fa-IR-u-ca-persian', { year: 'numeric' }).format(new Date());
