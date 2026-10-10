/**
 * متن بخش‌های صفحه. کلمه‌ای که بین {آکولاد} بیاید با ماژیک زرد هایلایت می‌شود.
 * Page copy, in both languages: l('فارسی', 'English'). Words in {braces} get the yellow highlighter.
 */

import { l } from '../i18n';

export const nav = [
  { href: '#work', label: l('نمونه‌کارها', 'Work') },
  { href: '#services', label: l('خدمات', 'Services') },
  { href: '#process', label: l('روند کار', 'How it works') },
  { href: '#faq', label: l('سؤالات', 'FAQ') },
];

/** Small interface words used in more than one place. */
export const ui = {
  home: l('صفحهٔ اصلی', 'Home'),
  contact: l('تماس', 'Contact'),
  call: l('تماس', 'Call'),
  freeConsult: l('مشاورهٔ رایگان', 'Free consultation'),
  messageWhatsapp: l('پیام در واتس‌اپ', 'Message on WhatsApp'),
  /** The pre-written WhatsApp message behind most buttons. */
  consultMessage: l('سلام رامین، برای یک پروژه مشاوره می‌خواهم.', 'Hi Ramin, I’d like a free consultation about a project.'),
  language: l('زبان', 'Language'),
};

export const hero = {
  badge: l('الان پروژهٔ جدید می‌پذیرم', 'Taking on new projects'),
  title: l('سایت و اپلیکیشنی برایتان می‌سازم که {مشتری بیاورد}', 'I build websites and apps that {bring you customers}'),
  text: l(
    'از طراحی تا برنامه‌نویسی و راه‌اندازی روی سرور، همه را خودم انجام می‌دهم. شما ایده را بگویید؛ رزرو آنلاین، فروش دوره، اپلیکیشن، CRM یا ربات تلگرام را آماده تحویل بگیرید.',
    'Design, code, getting it live on a server — I do all of it myself. You bring the idea; I hand you online booking, course sales, an app, a CRM or a Telegram bot, ready to use.',
  ),
  primary: l('مشاورهٔ رایگان در واتس‌اپ', 'Free consultation on WhatsApp'),
  secondary: l('نمونه‌کارها را ببینید', 'See my work'),
  perks: [
    l('پرداخت آنلاین', 'Online payments'),
    l('پیامک خودکار', 'Automatic SMS'),
    l('اپ قابل نصب', 'Installable app'),
    l('پشتیبانی بعد از تحویل', 'Support after launch'),
  ],
  notifications: [
    { icon: 'calendar', title: l('نوبت جدید ثبت شد', 'New appointment booked'), sub: l('کلینیک ذهن سبز · همین الان', 'Zehne Sabz Clinic · just now') },
    { icon: 'sms', title: l('پیامک یادآوری ارسال شد', 'SMS reminder sent'), sub: l('دو ساعت قبل از جلسه', 'Two hours before the session') },
    { icon: 'card', title: l('پرداخت آنلاین موفق بود', 'Online payment received'), sub: l('درگاه زرین‌پال', 'Via Zarinpal') },
    { icon: 'sparkle', title: l('میلی به سؤال مشتری جواب داد', 'Mili answered a customer'), sub: l('دستیار هوشمند پشتیبانی', 'AI support assistant') },
  ],
  /** Text alternatives for the devices in the hero. */
  laptopAlt: l('پنل دانش‌آموز دوپینگ شیمی، در حال تماشای درس', 'Doping Shimi student panel, playing a lesson'),
  phoneLabel: l('اپلیکیشن کلینیک ذهن سبز', 'Zehne Sabz Clinic app'),
  phoneAlt: l('داشبورد اپلیکیشن کلینیک ذهن سبز', 'Zehne Sabz Clinic app dashboard'),
};

export const clients = {
  title: l('برای این مجموعه‌ها ساخته‌ام', 'Businesses I’ve built for'),
  items: [
    { name: l('کلینیک ذهن سبز', 'Zehne Sabz Clinic'), logo: 'logos/zehnesabz.png' },
    { name: l('دوپینگ شیمی', 'Doping Shimi'), logo: 'logos/doping.svg' },
    { name: l('هلدینگ میلیونر', 'Millionaire Holding'), logo: 'logos/millionaire.svg' },
    { name: l('CRM میلیونر', 'Millionaire CRM'), logo: 'logos/crm.svg' },
    { name: l('فورواردبات', 'ForwardBot'), logo: 'logos/forwardbot.png' },
  ],
};

export const work = {
  eyebrow: l('نمونه‌کارها', 'My work'),
  title: l('پروژه‌هایی که {همین حالا} کار می‌کنند', 'Projects that are {live right now}'),
  text: l(
    'روی هر پروژه بزنید تا صفحه‌ها، محیط اپلیکیشن و همهٔ امکاناتش را از نزدیک ببینید.',
    'Tap any project for a closer look at its pages, the app itself and everything it can do.',
  ),
  open: l('مشاهدهٔ جزئیات', 'See details'),
  filterLabel: l('دسته‌بندی نمونه‌کارها', 'Filter projects'),
  categoriesLabel: l('دسته', 'Categories'),
};

export const services = {
  eyebrow: l('خدمات', 'Services'),
  title: l('چه چیزی برایتان {بسازم}؟', 'What can I {build} for you?'),
  text: l(
    'هر چیزی که کسب‌وکارتان برای آنلاین شدن لازم دارد، زیر یک سقف و با یک نفر.',
    'Everything your business needs to get online — under one roof, from one person.',
  ),
  goodFor: l('مناسب برای', 'Good for'),
  ask: l('بپرسید', 'Ask me'),
  /** WhatsApp message for the "ask" link; `%s` is the service. */
  askMessage: l('سلام رامین، دربارهٔ «%s» سؤال دارم.', 'Hi Ramin, I have a question about “%s”.'),
  items: [
    {
      icon: 'globe',
      title: l('طراحی سایت', 'Websites'),
      text: l(
        'سایت شرکتی، فروشگاهی، آموزشی یا کلینیک؛ سریع، زیبا و آمادهٔ دیده شدن در گوگل.',
        'For your company, shop, school or clinic — fast, good-looking and ready to be found on Google.',
      ),
      points: [
        l('طراحی اختصاصی، نه قالب آماده', 'Custom design, not a template'),
        l('سئو و سرعت بالا', 'SEO and fast loading'),
        l('پنل مدیریت محتوای فارسی', 'An easy panel to edit your content'),
        l('درگاه پرداخت و پیامک', 'Online payments and SMS'),
      ],
      for: [l('کلینیک', 'clinics'), l('آموزشگاه', 'schools'), l('فروشگاه', 'shops'), l('شرکت', 'companies')],
    },
    {
      icon: 'phone',
      title: l('اپلیکیشن موبایل', 'Mobile apps'),
      text: l(
        'اپی که مشتری با یک لمس روی گوشی نصب می‌کند؛ اندروید و آیفون، بدون دردسر استور.',
        'An app your customers install with one tap — on Android and iPhone, without the app-store hassle.',
      ),
      points: [
        l('ورود با کد پیامکی', 'Sign-in with an SMS code'),
        l('اعلان و یادآوری', 'Notifications and reminders'),
        l('اندروید و آیفون', 'Android and iPhone'),
        l('نسخهٔ کافه‌بازار', 'A Cafe Bazaar store version'),
      ],
      for: [l('رزرو نوبت', 'appointment booking'), l('آموزش آنلاین', 'online learning'), l('باشگاه مشتریان', 'loyalty clubs')],
    },
    {
      icon: 'kanban',
      title: l('پنل مدیریت و CRM', 'Admin panels & CRM'),
      text: l(
        'مشتری‌ها، فروش، فاکتور، انبار و گزارش‌ها در یک پنل ساده که تیمتان واقعاً از آن استفاده کند.',
        'Customers, sales, invoices, stock and reports in one simple panel your team will actually use.',
      ),
      points: [
        l('قیف فروش و پیگیری', 'Sales pipeline and follow-ups'),
        l('اتصال به حسابداری', 'Connects to your accounting'),
        l('نقش‌ها و دسترسی‌ها', 'Roles and permissions'),
        l('گزارش لحظه‌ای', 'Live reports'),
      ],
      for: [l('تیم فروش', 'sales teams'), l('پخش و بازرگانی', 'distributors and traders'), l('خدمات', 'service businesses')],
    },
    {
      icon: 'bot',
      title: l('ربات تلگرام', 'Telegram bots'),
      text: l(
        'رباتی که ۲۴ ساعته جواب می‌دهد، سفارش می‌گیرد، اشتراک می‌فروشد و کارهای تکراری را انجام می‌دهد.',
        'A bot that answers around the clock, takes orders, sells subscriptions and handles the repetitive work.',
      ),
      points: [
        l('منوی ساده و فارسی', 'Simple, clear menus'),
        l('پرداخت و اشتراک', 'Payments and subscriptions'),
        l('پنل مدیریت وب', 'A web admin panel'),
        l('اتصال به سایت و CRM', 'Connects to your site and CRM'),
      ],
      for: [l('فروش آنلاین', 'online sales'), l('کانال‌ها', 'channels'), l('پشتیبانی', 'customer support')],
    },
    {
      icon: 'sparkle',
      title: l('هوش مصنوعی در کسب‌وکار', 'AI for your business'),
      text: l(
        'دستیاری که از روی اطلاعات خود شما به مشتری جواب می‌دهد و بار پشتیبانی را سبک می‌کند.',
        'An assistant that answers customers from your own information and takes the load off your support team.',
      ),
      points: [
        l('جواب از روی مستندات شما', 'Answers from your own documents'),
        l('اتصال به دیتابیس', 'Connects to your database'),
        l('فارسی روان', 'Fluent Persian'),
        l('روی سایت و ربات', 'On your website or bot'),
      ],
      for: [l('پشتیبانی', 'support'), l('فروش', 'sales'), l('گزارش‌گیری', 'reporting')],
    },
  ],
};

export const toolkit = {
  eyebrow: l('آماده و تست‌شده', 'Ready and proven'),
  title: l('چیزهایی که کسب‌وکار ایرانی {لازم دارد}', 'What an Iranian business {really needs}'),
  text: l(
    'این امکانات را در پروژه‌های واقعی ساخته‌ام و بارها استفاده شده‌اند؛ لازم نیست برایشان از صفر هزینه کنید.',
    'I’ve built these in real projects and they’re used every day, so you don’t pay to have them made from scratch.',
  ),
  items: [
    { id: 'pay', title: l('پرداخت آنلاین', 'Online payments'), text: l('زرین‌پال، کارت‌به‌کارت و کیف پول.', 'Zarinpal, card-to-card transfers and wallets.') },
    { id: 'sms', title: l('پیامک خودکار', 'Automatic SMS'), text: l('کد ورود، تأیید نوبت و یادآوری.', 'Sign-in codes, booking confirmations and reminders.') },
    { id: 'calendar', title: l('تقویم شمسی', 'Persian calendar'), text: l('نوبت‌دهی، پیگیری و گزارش با تاریخ شمسی.', 'Bookings, follow-ups and reports in Persian (Jalali) dates.') },
    { id: 'install', title: l('نصب روی گوشی', 'Installs on any phone'), text: l('اپلیکیشن بدون نیاز به استور.', 'A real app, no app store needed.') },
    { id: 'seo', title: l('دیده شدن در گوگل', 'Found on Google'), text: l('سئوی فنی، سرعت بالا و ساختار استاندارد.', 'Technical SEO, fast pages and a clean structure.') },
    { id: 'secure', title: l('سرور امن و بک‌آپ', 'Secure server & backups'), text: l('SSL، بک‌آپ شبانه و راه‌اندازی کامل.', 'SSL, nightly backups and a complete setup.') },
  ],
};

export const process = {
  eyebrow: l('روند کار', 'How it works'),
  title: l('از اولین پیام تا {روز افتتاح}', 'From your first message to {launch day}'),
  steps: [
    {
      title: l('گفت‌وگوی رایگان', 'A free chat'),
      text: l(
        'در یک تماس کوتاه نیازتان را می‌شنوم و می‌گویم چه راهی برایتان به‌صرفه‌تر است.',
        'In a short call I listen to what you need and tell you the most cost-effective way to get there.',
      ),
      get: l('پیشنهاد مکتوب با زمان و قیمت ثابت', 'A written proposal with a fixed timeline and price'),
    },
    {
      title: l('طراحی', 'Design'),
      text: l(
        'قبل از کدنویسی، ظاهر صفحه‌ها را می‌بینید و تا راضی نشوید جلو نمی‌رویم.',
        'Before any code is written, you see how the pages will look — and we don’t move on until you’re happy.',
      ),
      get: l('طرح صفحه‌ها برای تأیید شما', 'Page designs for your approval'),
    },
    {
      title: l('ساخت', 'Build'),
      text: l(
        'هر هفته نسخهٔ قابل استفاده را روی یک لینک آزمایشی می‌بینید و نظر می‌دهید.',
        'Every week you get a working version on a test link to try out and comment on.',
      ),
      get: l('دموی هفتگی و در دسترس', 'A weekly demo you can open anytime'),
    },
    {
      title: l('افتتاح و پشتیبانی', 'Launch & support'),
      text: l(
        'روی دامنه و سرور خودتان راه‌اندازی می‌کنم و بعد از تحویل هم کنارتان هستم.',
        'I launch it on your own domain and server, and I’m still here for you after handover.',
      ),
      get: l('آموزش پنل + دورهٔ پشتیبانی رایگان', 'Panel training + a free support period'),
    },
  ],
};

export const stats = [
  { value: 10, suffix: '+', label: l('سیستم آنلاین و در حال استفاده', 'Systems live and in daily use') },
  { value: 4, suffix: '', label: l('حوزهٔ کاری: درمان، آموزش، نرم‌افزار، رسانه', 'Industries: healthcare, education, software, media') },
  { value: 6, suffix: '+', label: l('سال تجربه در داده و هوش مصنوعی', 'Years of experience in data and AI') },
];

/** What the surname means, set like a dictionary entry. */
export const nameCard = {
  word: l('عُمرانی', 'Omrani'),
  phonetic: '/om·rā·ni/',
  kind: l('از ریشهٔ «عمران»', 'from the Persian “omrān”'),
  meanings: [
    l('ساختن، آباد کردن و جان دادن به چیزها.', 'To build, to develop, to bring things to life.'),
    l('کسی که برای کسب‌وکار شما سایت و اپلیکیشن می‌سازد.', 'Someone who builds websites and apps for your business.'),
  ],
  note: l('انگار اسمم از اول شرح شغلم بوده.', 'Turns out my name was a job description all along.'),
};

export const about = {
  eyebrow: l('دربارهٔ من', 'About me'),
  title: l('سلام، رامین هستم؛ {یک نفر} از ایده تا اجرا', 'Hi, I’m Ramin — {one person} from idea to launch'),
  role: l('برنامه‌نویس فول‌استک و هوش مصنوعی', 'Full-stack & AI developer'),
  text: [
    l(
      'برنامه‌نویس فول‌استک و توسعه‌دهندهٔ هوش مصنوعی در مشهد. کارم را با داده و پژوهش شروع کردم؛ مدل پیش‌بینی‌ای که ساختم در یک مجلهٔ علمی معتبر (Q1 اسپرینگر) منتشر شده است.',
      'I’m a full-stack and AI developer in Mashhad, Iran. I started out in data and research — a forecasting model I built was published in a respected scientific journal (Q1, Springer).',
    ),
    l(
      'امروز سایت، اپلیکیشن و سیستم‌هایی می‌سازم که کسب‌وکارها هر روز با آن‌ها کار می‌کنند. چون همه‌چیز از طراحی تا سرور دست خودم است، طرف حسابتان یک نفر است، نه یک زنجیره از واسطه‌ها.',
      'Today I build websites, apps and systems that businesses rely on every day. Because everything from design to the server is in my hands, you deal with one person — not a chain of middlemen.',
    ),
  ],
  chips: [l('مشهد', 'Mashhad, Iran'), l('همکاری آنلاین با همهٔ شهرها', 'Working online with clients anywhere'), l('فارسی و انگلیسی', 'Persian & English')],
  now: l('الان: توسعه‌دهندهٔ هوش مصنوعی در شرکت نرم‌افزاری میلیونر', 'Now: AI developer at Millionaire Software'),
  proof: l('مقالهٔ علمی منتشرشده در مجلهٔ %s · مدل هوش مصنوعی برای پیش‌بینی', 'Research paper in a %s journal · an AI forecasting model'),
};

export const faq = {
  eyebrow: l('سؤالات رایج', 'Common questions'),
  title: l('قبل از شروع {بپرسید}', 'Before we start, {ask away}'),
  ask: l('سؤالتان اینجا نیست؟ مستقیم بپرسید؛ معمولاً همان روز جواب می‌دهم.', 'Don’t see your question? Just ask — I usually reply the same day.'),
  askButton: l('سؤال در واتس‌اپ', 'Ask on WhatsApp'),
  askMessage: l('سلام رامین، یک سؤال داشتم:', 'Hi Ramin, I have a question:'),
  items: [
    {
      q: l('هزینهٔ ساخت سایت یا اپلیکیشن چقدر است؟', 'How much does a website or app cost?'),
      a: l(
        'بستگی به امکانات دارد. بعد از گفت‌وگوی رایگان یک پیشنهاد مکتوب با قیمت ثابت می‌گیرید؛ بدون هزینهٔ پنهان. پروژه‌های بزرگ‌تر را هم می‌شود مرحله‌به‌مرحله پیش برد تا با بودجه‌تان جور شود.',
        'It depends on the features. After a free chat you get a written proposal with a fixed price — no hidden costs. Bigger projects can be built in stages to fit your budget.',
      ),
    },
    {
      q: l('چقدر طول می‌کشد؟', 'How long does it take?'),
      a: l(
        'یک سایت معرفی معمولاً ۲ تا ۳ هفته و یک سامانهٔ کامل با پنل و اپلیکیشن ۶ تا ۱۲ هفته. زمان دقیق را قبل از شروع با هم قطعی می‌کنیم.',
        'A simple business website usually takes 2–3 weeks; a complete system with an admin panel and an app, 6–12 weeks. We agree on the exact timeline before we start.',
      ),
    },
    {
      q: l('دامنه و سرور را هم شما تهیه می‌کنید؟', 'Can you get the domain and server for me too?'),
      a: l(
        'بله. اگر ندارید، خرید دامنه، سرور، SSL و راه‌اندازی را انجام می‌دهم و همه به نام خودتان ثبت می‌شود.',
        'Yes. If you don’t have them yet, I’ll buy the domain, server and SSL and set it all up — everything registered in your name.',
      ),
    },
    {
      q: l('اپلیکیشن روی آیفون هم نصب می‌شود؟', 'Will the app work on iPhone too?'),
      a: l(
        'بله. اپلیکیشن‌هایم روی اندروید و آیفون از خود مرورگر نصب می‌شوند و مثل یک اپ معمولی آیکون دارند. در صورت نیاز نسخهٔ اندروید برای کافه‌بازار هم آماده می‌کنم.',
        'Yes. My apps install on Android and iPhone straight from the browser and get their own icon, just like any other app. If you need it, I can also prepare an Android version for Cafe Bazaar, Iran’s app store.',
      ),
    },
    {
      q: l('بعداً خودم می‌توانم محتوا را عوض کنم؟', 'Can I change the content myself later?'),
      a: l(
        'بله. یک پنل مدیریت فارسی و ساده تحویل می‌گیرید و کار با آن را قدم‌به‌قدم آموزش می‌دهم.',
        'Yes. You get a simple admin panel, and I’ll walk you through using it step by step.',
      ),
    },
    {
      q: l('بعد از تحویل پروژه چه می‌شود؟', 'What happens after launch?'),
      a: l(
        'یک دورهٔ پشتیبانی رایگان دارید. بعد از آن هم می‌توانیم برای نگهداری، بک‌آپ و اضافه کردن امکانات جدید قرارداد ماهانه ببندیم.',
        'You get a free support period. After that, we can agree on a monthly plan for maintenance, backups and new features.',
      ),
    },
    {
      q: l('فقط با کسب‌وکارهای مشهد کار می‌کنید؟', 'Do you only work with businesses in Mashhad?'),
      a: l(
        'نه. با کسب‌وکارهای همهٔ شهرها و حتی خارج از ایران به‌صورت آنلاین کار می‌کنم؛ جلسه‌ها تلفنی یا تصویری برگزار می‌شوند.',
        'No. I work online with businesses in every city, and outside Iran too; we meet by phone or video call.',
      ),
    },
  ],
};

export const contact = {
  eyebrow: l('شروع همکاری', 'Let’s work together'),
  title: l('پروژه‌تان را {همین امروز} شروع کنیم', 'Let’s start your project {today}'),
  text: l(
    'مشاورهٔ اول رایگان است و معمولاً در کمتر از ۲۴ ساعت جواب می‌دهم. از هر راهی که راحت‌ترید پیام بدهید.',
    'The first consultation is free, and I usually reply within 24 hours. Reach out whichever way suits you.',
  ),
  channels: {
    call: l('تماس تلفنی', 'Call me'),
    whatsapp: l('واتس‌اپ', 'WhatsApp'),
    telegram: l('تلگرام', 'Telegram'),
    email: l('ایمیل', 'Email'),
  },
  whatsappMessage: l('سلام رامین، برای یک پروژه پیام می‌دهم.', 'Hi Ramin, I’m getting in touch about a project.'),
  copied: {
    phone: l('شماره کپی شد', 'Number copied'),
    email: l('ایمیل کپی شد', 'Email copied'),
    failed: l('کپی نشد؛ لطفاً دستی کپی کنید', 'Couldn’t copy — please copy it by hand'),
  },
  copyLabel: {
    phone: l('کپی تماس تلفنی', 'Copy phone number'),
    email: l('کپی ایمیل', 'Copy email address'),
  },
  brief: {
    title: l('یا در ۳۰ ثانیه بگویید چه می‌خواهید', 'Or tell me what you need in 30 seconds'),
    need: l('چه می‌خواهید بسازید؟', 'What would you like to build?'),
    /** `say` is how the choice reads inside the message; null means "just a consultation". */
    needs: [
      { id: 'site', label: l('سایت', 'Website'), say: l('سایت', 'a website') },
      { id: 'app', label: l('اپلیکیشن', 'App'), say: l('اپلیکیشن', 'an app') },
      { id: 'crm', label: l('CRM و پنل', 'CRM & admin panel'), say: l('CRM و پنل', 'a CRM and admin panel') },
      { id: 'bot', label: l('ربات تلگرام', 'Telegram bot'), say: l('ربات تلگرام', 'a Telegram bot') },
      { id: 'ai', label: l('هوش مصنوعی', 'AI'), say: l('هوش مصنوعی', 'something with AI') },
      { id: 'unsure', label: l('هنوز مطمئن نیستم', 'Not sure yet'), say: null },
    ],
    budget: l('بودجهٔ تقریبی', 'Rough budget'),
    budgets: [
      { id: 'small', label: l('کوچک', 'Small'), say: l('کوچک', 'on the small side') },
      { id: 'medium', label: l('متوسط', 'Medium'), say: l('متوسط', 'medium') },
      { id: 'large', label: l('بزرگ', 'Large'), say: l('بزرگ', 'on the larger side') },
      { id: 'unknown', label: l('نمی‌دانم', 'Not sure'), say: null },
    ],
    name: l('اسم شما', 'Your name'),
    namePlaceholder: l('مثلاً مریم', 'e.g. Sarah'),
    preview: l('پیش‌نمایش پیام', 'Message preview'),
    send: l('ارسال در واتس‌اپ', 'Send on WhatsApp'),
    sendTelegram: l('کپی و ارسال در تلگرام', 'Copy & send on Telegram'),
    copied: l('متن کپی شد؛ در تلگرام برایم بفرستید', 'Message copied — now send it to me on Telegram'),
  },
};

/** The message the brief turns into, in each language. */
export const briefMessage = {
  fa: (name: string, need: string | null, budget: string | null) =>
    [`سلام رامین${name ? `، ${name} هستم` : ''}.`, need ? `می‌خواهم ${need} بسازم.` : 'برای یک پروژه مشاوره می‌خواهم.', budget ? `بودجه‌ام تقریباً ${budget} است.` : '']
      .filter(Boolean)
      .join(' '),
  en: (name: string, need: string | null, budget: string | null) =>
    [`Hi Ramin${name ? `, this is ${name}` : ''}.`, need ? `I’d like to build ${need}.` : 'I’d like some advice about a project.', budget ? `My budget is ${budget}.` : '']
      .filter(Boolean)
      .join(' '),
};

export const footer = {
  line: l('طراحی و ساخت سایت، اپلیکیشن، CRM و ربات تلگرام', 'Websites, apps, CRMs and Telegram bots'),
  rights: l('همهٔ پروژه‌ها با اجازهٔ کارفرما نمایش داده شده‌اند.', 'All projects are shown with the client’s permission.'),
  links: l('لینک‌های پایین صفحه', 'Footer links'),
  versions: l('نسخه‌های دیگر سایت', 'Other versions of this site'),
  enamad: l('نماد اعتماد الکترونیکی', 'Enamad e-trust seal'),
};
