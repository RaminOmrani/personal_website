/**
 * اطلاعات تماس و هویت — برای تغییر شماره، آیدی یا ایمیل فقط همین فایل را ویرایش کنید.
 */

const PHONE_INTL = '989017021166';

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
  whatsapp: `https://wa.me/${PHONE_INTL}`,
  /**
   * TODO: اگر آیدی تلگرام دارید اینجا بگذارید، مثلاً 'https://t.me/ramin_omrani'.
   * لینک شماره‌ای فقط وقتی کار می‌کند که در تنظیمات حریم خصوصی تلگرام،
   * «چه کسی می‌تواند مرا با شماره پیدا کند» روی «همه» باشد.
   */
  telegram: `https://t.me/+${PHONE_INTL}`,
  socials: [
    { label: 'GitHub', href: 'https://github.com/RaminOmrani' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ramin-omrani' },
  ],
};

/** A WhatsApp link that opens the chat with a pre-written message. */
export const whatsappWith = (text: string) => `${site.whatsapp}?text=${encodeURIComponent(text)}`;

/** Current Persian (Jalali) year in Persian digits, e.g. ۱۴۰۵. */
export const jalaliYear = () => new Intl.DateTimeFormat('fa-IR-u-ca-persian', { year: 'numeric' }).format(new Date());
