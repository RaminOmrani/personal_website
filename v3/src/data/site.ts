/**
 * اطلاعات تماس و هویت. برای تغییر شماره، آیدی یا ایمیل فقط همین فایل را ویرایش کنید.
 */

export const site = {
  name: 'رامین عمرانی',
  role: 'طراحی و ساخت سایت، اپلیکیشن و ربات',
  city: 'مشهد',
  url: 'https://raminomrani.github.io/personal_website/v3/',
  /** پیشنهاد دامنه: raminomrani.ir (اصلی، برای اعتماد و سرعت در ایران) و omrani.dev (بین‌المللی). */
  domain: 'raminomrani.ir',
  email: 'ramin.omrani.95@gmail.com',
  phone: { display: '۰۹۰۱ ۷۰۲ ۱۱۶۶', plain: '09017021166', href: 'tel:+989017021166' },
  whatsapp: { display: '۰۹۳۶ ۵۷۴ ۳۴۵۸', plain: '09365743458', href: 'https://wa.me/989365743458' },
  telegram: { display: '@Daneshjoo_AI', href: 'https://t.me/Daneshjoo_AI' },
  socials: [
    { label: 'GitHub', href: 'https://github.com/RaminOmrani' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ramin-omrani' },
  ],
};

/** WhatsApp chat with a pre-written message. */
export const whatsappWith = (text: string) => `${site.whatsapp.href}?text=${encodeURIComponent(text)}`;

/** Telegram chat; recent Telegram apps also pre-fill `text` as a draft. */
export const telegramWith = (text: string) => `${site.telegram.href}?text=${encodeURIComponent(text)}`;

/** Persian digits, e.g. 12 → ۱۲ */
export const fa = (n: number | string) => String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[+d]);

/** Current Jalali year in Persian digits. */
export const jalaliYear = () => new Intl.DateTimeFormat('fa-IR-u-ca-persian', { year: 'numeric' }).format(new Date());
