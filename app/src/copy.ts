/**
 * The app's own interface words. Everything about Ramin, his services and his projects comes
 * from v3 (../v3/src/data), written once for all versions; only app chrome lives here,
 * in the same l(persian, english) form.
 */
import { bilingual, l, useLang } from '../../v3/src/i18n';

const src = {
  title: l('رامین عمرانی · طراحی سایت و اپلیکیشن', 'Ramin Omrani · Websites & apps'),
  tabs: {
    label: l('بخش‌های اپ', 'App sections'),
    home: l('خانه', 'Home'),
    work: l('نمونه‌کارها', 'Work'),
    services: l('خدمات', 'Services'),
    contact: l('تماس', 'Contact'),
  },
  bar: {
    settings: l('تنظیمات', 'Settings'),
    back: l('بازگشت', 'Back'),
    /** the other language, written in itself */
    otherLang: l('EN', 'فا'),
    otherLangLabel: l('Switch to English', 'تغییر زبان به فارسی'),
  },
  home: {
    hello: l('سلام، رامین هستم', 'Hi, I’m Ramin'),
    sub: l('مشاورهٔ اول رایگان است و معمولاً همان روز جواب می‌دهم.', 'The first consultation is free, and I usually reply the same day.'),
    featured: l('پروژه‌های منتخب', 'Featured projects'),
    seeAll: l('همه', 'See all'),
    allProjects: l('همهٔ نمونه‌کارها', 'All projects'),
    allProjectsText: l((n: string) => `${n} سامانهٔ واقعی، از مشکل تا آخرین صفحه`, (n: string) => `${n} real systems, from the problem to the last screen`),
  },
  work: {
    count: l((n: string) => `${n} پروژه`, (n: string) => `${n} projects`),
  },
  project: {
    cta: l('یکی مثل این می‌خواهم', 'I want something like this'),
    ctaHint: l('مشاورهٔ اول رایگان', 'Free first consultation'),
    notFound: l('این پروژه پیدا نشد.', 'That project wasn’t found.'),
    toWork: l('برگشت به نمونه‌کارها', 'Back to all projects'),
    year: l('سال', 'Year'),
    view: l((caption: string) => `بزرگ‌نمایی: ${caption}`, (caption: string) => `View full screen: ${caption}`),
    of: l((i: string, n: string) => `${i} از ${n}`, (i: string, n: string) => `${i} of ${n}`),
    swipe: l('برای بستن، به پایین بکشید', 'Swipe down to close'),
    gallery: l('تصویرهای پروژه', 'Project screens'),
  },
  services: {
    more: l('جزئیات', 'Details'),
    faq: l('سؤالات رایج', 'Common questions'),
  },
  contact: {
    channels: l('راه‌های ارتباط', 'Ways to reach me'),
    picker: l('چه چیزی لازم دارید؟', 'What do you need?'),
    pickerText: l('سه لمس؛ پیام اول را برایتان آماده می‌کنم.', 'Three taps, and your first message is written for you.'),
    open: l((what: string) => `باز کردن ${what}`, (what: string) => `Open ${what}`),
  },
  settings: {
    title: l('تنظیمات', 'Settings'),
    language: l('زبان', 'Language'),
    site: l('نسخهٔ کامل سایت', 'Open the full website'),
    share: l('معرفی اپ به دوستان', 'Share this app'),
    shareText: l('اپلیکیشن رامین عمرانی؛ طراحی و ساخت سایت، اپلیکیشن و ربات', 'Ramin Omrani’s app: websites, apps and bots, designed and built'),
    version: l('نسخهٔ اپ', 'App version'),
    close: l('بستن', 'Close'),
    shared: l('لینک اپ کپی شد', 'App link copied'),
  },
  net: {
    offline: l('آفلاین هستید؛ نسخهٔ ذخیره‌شده را می‌بینید', 'You’re offline — showing saved content'),
    update: l('نسخهٔ تازهٔ اپ آماده است', 'A new version of the app is ready'),
    updateAction: l('به‌روزرسانی', 'Update'),
  },
};

export const appCopy = bilingual(src);
export const useAppCopy = () => appCopy[useLang()];
