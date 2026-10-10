/**
 * متن همهٔ بخش‌ها، به دو زبان: l(فارسی، انگلیسی).
 * {آکولاد} = رنگ گرادیان لاجوردی تا فیروزه‌ای ، [کروشه] = خط نستعلیق (کم و به‌جا)
 *
 * Every section's copy, in both languages: l(persian, english).
 * {braces} = the lapis-to-turquoise gradient; [brackets] = the calligraphic accent
 * (Nastaliq in Persian, an italic serif in English), used sparingly.
 */
import { bilingual, l, useLang } from '../i18n';

const src = {
  nav: [
    { href: '#work', label: l('نمونه‌کارها', 'Work') },
    { href: '#services', label: l('خدمات', 'Services') },
    { href: '#process', label: l('روند کار', 'Process') },
    { href: '#faq', label: l('سؤالات', 'FAQ') },
  ],

  hero: {
    eyebrow: l('طراحی و ساخت سایت و اپلیکیشن', 'Design, build & launch'),
    lines: l(['سایت و اپلیکیشنی', 'که [دیده می‌شود]', 'و {مشتری می‌آورد}'], ['Websites & apps', 'that get [noticed]', 'and {win customers}']),
    text: l(
      'از اولین طرح تا روزی که اپلیکیشنتان روی گوشی مشتری نصب می‌شود، کنارتان هستم: طراحی چشم‌گیر، برنامه‌نویسی دقیق، پرداخت آنلاین، پیامک و پنل مدیریت فارسی.',
      'From the first sketch to the day your app lands on your customers’ phones, I’m with you: striking design, careful engineering, online payments, SMS and an admin panel your team will actually enjoy.',
    ),
    primary: l('گفت‌وگوی رایگان در واتس‌اپ', 'Free chat on WhatsApp'),
    primaryMessage: l('سلام رامین، برای ساخت سایت یا اپلیکیشن مشاوره می‌خواهم.', 'Hi Ramin, I’d like some advice on building a website or an app.'),
    secondary: l('تماشای نمونه‌کارها', 'See my work'),
    proof: l(['۷ سامانهٔ فعال', 'از مشهد تا همه‌جا', 'تحویل با پشتیبانی'], ['7 live systems', 'From Mashhad to anywhere', 'Support after launch']),
    signature: l('رامین عمرانی', 'Ramin Omrani'),
    chips: l(['مقالهٔ Q1 اسپرینگر', 'فول‌استک و هوش مصنوعی', 'پاسخ همان روز'], ['Springer Q1 paper', 'Full-stack & AI', 'Same-day replies']),
    scroll: l('اسکرول کنید؛ می‌رویم داخل پروژه‌ها', 'Scroll — we’re going inside the projects'),
    skip: l('رد شدن از معرفی', 'Skip the intro'),
    skipShort: l('رد شدن', 'Skip'),
  },

  /** Chapter 1 of the film: the laptop screen dives through four real systems. */
  sites: {
    chapter: l('فصل یک · سایت و پنل مدیریت', 'Chapter one · Websites & panels'),
    items: [
      {
        slug: 'zehnesabz',
        screen: 'work/zehnesabz-home.jpg',
        label: l('کلینیک ذهن سبز', 'Zehne Sabz Clinic'),
        title: l('کلینیکی که شبانه‌روز نوبت می‌دهد', 'A clinic that takes bookings around the clock'),
        text: l('رزرو آنلاین، پیامک یادآوری و پروندهٔ درمان؛ بدون حتی یک تماس تلفنی.', 'Online booking, SMS reminders and treatment records — without a single phone call.'),
      },
      {
        slug: 'dopingshimi',
        screen: 'work/doping-video.jpg',
        label: l('دوپینگ شیمی', 'Doping Shimi'),
        title: l('کلاس کنکوری که آنلاین فروخته می‌شود', 'An exam-prep class that sells itself online'),
        text: l('ویدیوی محافظت‌شده، آزمون آنلاین و رتبه‌بندی‌ای که دانش‌آموز را سر ذوق می‌آورد.', 'Protected video lessons, online exams and a leaderboard that keeps students hooked.'),
      },
      {
        slug: 'crm',
        screen: 'work/crm-pipeline.jpg',
        label: l('CRM میلیونر', 'Millionaire CRM'),
        title: l('تیم فروشی که هیچ مشتری‌ای را فراموش نمی‌کند', 'A sales team that never forgets a customer'),
        text: l('قیف فروش کشیدنی، یادآور خودکار و فاکتوری که مستقیم در حسابداری ثبت می‌شود.', 'A drag-and-drop pipeline, automatic reminders and invoices that go straight into accounting.'),
      },
      {
        slug: 'support',
        screen: 'work/support-dashboard.jpg',
        label: l('پشتیبانی میلیونر', 'Millionaire Support'),
        title: l('پشتیبانی‌ای که هوش مصنوعی جواب می‌دهد', 'Support where AI answers first'),
        text: l('دستیار «میلی» قبل از ثبت تیکت، جواب را از دل راهنماها پیدا می‌کند.', 'Before a ticket is even opened, the “Mili” assistant digs the answer out of the manuals.'),
      },
    ],
    more: l('داستان کامل این پروژه', 'The full project story'),
  },

  /** Chapter 2 of the film: the phone turns and walks through real app screens. */
  app: {
    chapter: l('فصل دو · اپلیکیشن موبایل', 'Chapter two · Mobile apps'),
    title: l('اپلیکیشنی که {روی گوشی می‌ماند}', 'An app that {lives on their phone}'),
    text: l(
      'بدون دردسر استور، با یک لمس روی اندروید و آیفون نصب می‌شود و مثل یک اپ واقعی کار می‌کند.',
      'No app-store hassle: it installs on Android and iPhone with one tap and works just like a native app.',
    ),
    screens: [
      { screen: 'work/zehnesabz-app-login.jpg', aspect: 960 / 540, title: l('ورود با یک کد پیامکی', 'Sign in with one SMS code'), text: l('نه رمزی، نه فراموشی.', 'No passwords, nothing to forget.') },
      { screen: 'work/zehnesabz-app-dashboard.jpg', aspect: 960 / 540, title: l('همه‌چیز در یک نگاه', 'Everything at a glance'), text: l('جلسهٔ بعدی، وضعیت مالی و پیشرفت درمان.', 'Next session, balance and treatment progress.') },
      { screen: 'work/doping-m-video.jpg', aspect: 1169 / 540, title: l('دوپینگ شیمی: کلاس در جیب', 'Doping Shimi: a class in your pocket'), text: l('ویدیوی درس، جزوه و آزمون، هر جا که دانش‌آموز هست.', 'Lessons, notes and exams, wherever the student is.') },
      { screen: 'work/dongi-m-balances.jpg', aspect: 1169 / 540, title: l('دنگی: حساب اکیپ، صاف', 'Dongi: the group tab, settled'), text: l('کی به کی چقدر بدهکاره؟ با شمارهٔ کارت و یادآوری.', 'Who owes whom, and how much — with card numbers and reminders.') },
      { screen: 'work/crm-m.jpg', aspect: 1169 / 540, title: l('CRM در جیب تیم فروش', 'A CRM in the sales team’s pocket'), text: l('موجودی، قیمت و مانده حساب، همان‌جا که مشتری است.', 'Stock, prices and balances, right there with the customer.') },
    ],
  },

  work: {
    eyebrow: l('نمونه‌کارها', 'Selected work'),
    title: l('هر کدام یک {داستان واقعی}', 'Every one a {true story}'),
    text: l(
      'روی هر پروژه بزنید تا از مشکل اول تا آخرین صفحه‌اش را ببینید. همه همین حالا در حال استفاده‌اند.',
      'Open any project to follow it from the first problem to the last screen. Every one of them is in use right now.',
    ),
    open: l('دیدن داستان پروژه', 'Read the project story'),
  },

  services: {
    eyebrow: l('خدمات', 'Services'),
    title: l('چه چیزی برایتان {بسازم}؟', 'What can I {build} for you?'),
    items: [
      {
        id: 'site',
        icon: 'globe',
        title: l('طراحی سایت', 'Websites'),
        topic: l('طراحی سایت', 'a website'),
        text: l(
          'سایتی که در نگاه اول اعتماد می‌سازد، در گوگل پیدا می‌شود و بازدیدکننده را به مشتری تبدیل می‌کند.',
          'A site that earns trust at first glance, gets found on Google and turns visitors into customers.',
        ),
        points: l(['طراحی اختصاصی، نه قالب آماده', 'سئو و سرعت بالا', 'پنل مدیریت فارسی', 'درگاه پرداخت و پیامک'], ['Custom design, never a template', 'SEO and speed built in', 'An easy admin panel', 'Online payments and SMS']),
        visual: { kind: 'browser', src: 'work/zehnesabz-home.jpg', url: 'zehnesabz.com' },
      },
      {
        id: 'app',
        icon: 'phone',
        title: l('اپلیکیشن موبایل', 'Mobile apps'),
        topic: l('اپلیکیشن موبایل', 'a mobile app'),
        text: l(
          'اپی که با یک لمس روی گوشی مشتری می‌نشیند و هر روز او را به کسب‌وکارتان برمی‌گرداند.',
          'An app that settles onto your customer’s phone in one tap and brings them back to your business every day.',
        ),
        points: l(['اندروید و آیفون', 'ورود با کد پیامکی', 'اعلان و یادآوری', 'نسخهٔ کافه‌بازار'], ['Android and iPhone', 'Sign-in with an SMS code', 'Notifications and reminders', 'A Café Bazaar edition']),
        visual: { kind: 'phones', src: 'work/zehnesabz-app-dashboard.jpg', src2: 'work/zehnesabz-app-schedule.jpg' },
      },
      {
        id: 'crm',
        icon: 'kanban',
        title: l('پنل مدیریت و CRM', 'Admin panels & CRM'),
        topic: l('پنل مدیریت و CRM', 'an admin panel or CRM'),
        text: l(
          'مشتری، فروش، فاکتور و گزارش در پنلی که تیمتان واقعاً دوستش دارد و با آن کار می‌کند.',
          'Customers, sales, invoices and reports in a panel your team genuinely likes working in.',
        ),
        points: l(['قیف فروش و پیگیری', 'اتصال به حسابداری', 'نقش‌ها و دسترسی‌ها', 'گزارش لحظه‌ای'], ['Sales pipeline and follow-ups', 'Connected to your accounting', 'Roles and permissions', 'Live reports']),
        visual: { kind: 'browser', src: 'work/crm-pipeline.jpg', url: 'crm' },
      },
      {
        id: 'bot',
        icon: 'bot',
        title: l('ربات تلگرام', 'Telegram bots'),
        topic: l('ربات تلگرام', 'a Telegram bot'),
        text: l(
          'رباتی که شبانه‌روز جواب می‌دهد، اشتراک می‌فروشد و کارهای تکراری را به‌جای شما انجام می‌دهد.',
          'A bot that answers day and night, sells subscriptions and takes the repetitive work off your hands.',
        ),
        points: l(['منوی فارسی و ساده', 'پرداخت و اشتراک', 'پنل مدیریت وب', 'اتصال به سایت و CRM'], ['Simple, friendly menus', 'Payments and subscriptions', 'A web admin panel', 'Connected to your site and CRM']),
        visual: { kind: 'bot' },
      },
      {
        id: 'ai',
        icon: 'sparkle',
        title: l('هوش مصنوعی در کسب‌وکار', 'AI for your business'),
        topic: l('هوش مصنوعی در کسب‌وکار', 'AI for business'),
        text: l(
          'دستیاری که از روی اطلاعات خود شما به مشتری جواب می‌دهد و بار پشتیبانی را سبک می‌کند.',
          'An assistant that answers customers from your own information and lightens the load on your support team.',
        ),
        points: l(['جواب از روی مستندات شما', 'فارسی روان', 'روی سایت و ربات', 'اتصال به دیتابیس'], ['Answers from your own documents', 'Fluent, natural replies', 'On your site and in your bot', 'Connected to your database']),
        visual: { kind: 'mili' },
      },
    ],
    ask: l((topic: string) => `دربارهٔ ${topic} بپرسید`, (topic: string) => `Ask about ${topic}`),
    askMessage: l((topic: string) => `سلام رامین، دربارهٔ «${topic}» سؤال دارم.`, (topic: string) => `Hi Ramin, I have a question about ${topic}.`),
  },

  marquee: {
    label: l('امکانات آماده', 'Ready-made features'),
    items: l(
      ['پرداخت آنلاین', 'پیامک خودکار', 'تقویم شمسی', 'نصب روی گوشی', 'سئو و سرعت', 'پنل مدیریت فارسی', 'ورود با کد پیامکی', 'هوش مصنوعی', 'گزارش و نمودار', 'بک‌آپ شبانه', 'سرور امن و SSL', 'ربات تلگرام'],
      ['Online payments', 'Automatic SMS', 'Persian calendar', 'Installs on phones', 'SEO & speed', 'Easy admin panel', 'SMS-code sign-in', 'Artificial intelligence', 'Reports & charts', 'Nightly backups', 'Secure server & SSL', 'Telegram bots'],
    ),
  },

  process: {
    eyebrow: l('روند کار', 'How it works'),
    title: l('از اولین پیام تا {روز افتتاح}', 'From first message to {launch day}'),
    steps: [
      {
        title: l('گفت‌وگوی رایگان', 'Free consultation'),
        time: l('۱ روز', '1 day'),
        text: l('نیازتان را می‌شنوم و صادقانه می‌گویم چه راهی برایتان به‌صرفه‌تر است.', 'I listen to what you need and tell you honestly which route gives you the best value.'),
        get: l('پیشنهاد مکتوب با زمان و قیمت ثابت', 'A written proposal with a fixed timeline and price'),
      },
      {
        title: l('طراحی', 'Design'),
        time: l('۱ تا ۲ هفته', '1–2 weeks'),
        text: l('قبل از هر خط کد، ظاهر صفحه‌ها را می‌بینید و تا راضی نشوید جلو نمی‌رویم.', 'You see every screen before a line of code is written, and we don’t move on until you’re happy.'),
        get: l('طرح صفحه‌ها برای تأیید شما', 'Screen designs for your sign-off'),
      },
      {
        title: l('ساخت', 'Build'),
        time: l('۲ تا ۸ هفته', '2–8 weeks'),
        text: l('هر هفته نسخهٔ قابل استفاده را روی یک لینک آزمایشی می‌بینید و نظر می‌دهید.', 'Every week you get a working version on a preview link to try out and comment on.'),
        get: l('دموی هفتگی و در دسترس', 'A weekly demo, always within reach'),
      },
      {
        title: l('افتتاح', 'Launch'),
        time: l('همیشه', 'And beyond'),
        text: l('روی دامنه و سرور خودتان راه‌اندازی می‌کنم و بعد از تحویل هم کنارتان هستم.', 'I launch it on your own domain and server — and I’m still here after handover.'),
        get: l('آموزش پنل و پشتیبانی رایگان', 'Admin training and free support'),
      },
    ],
  },

  /** What the surname means, set like a dictionary entry beside the promise. */
  nameCard: {
    eyebrow: l('معنی اسم', 'What my name means'),
    word: l('عُمرانی', 'Omrani'),
    phonetic: '/om·rā·ni/',
    kind: l('از ریشهٔ «عمران»', 'from the Persian “omrān”'),
    meanings: l(
      ['ساختن، آباد کردن و جان دادن به چیزها.', 'کسی که برای کسب‌وکار شما سایت و اپلیکیشن می‌سازد.'],
      ['To build, to develop, to bring things to life.', 'Someone who builds websites and apps for your business.'],
    ),
    note: l('انگار اسمم از اول شرح شغلم بوده.', 'Turns out my name was a job description all along.'),
  },

  /** A short, personal promise. */
  promise: {
    eyebrow: l('تعهد من', 'My commitment'),
    title: l('قول من', 'My promise'),
    items: [
      {
        icon: 'wallet',
        title: l('قیمت ثابت، بدون هزینهٔ پنهان', 'A fixed price, no hidden costs'),
        text: l('قبل از شروع، قیمت و امکانات مکتوب می‌شود و همان می‌ماند.', 'Price and features are agreed in writing before we start — and that’s how they stay.'),
      },
      {
        icon: 'calendar',
        title: l('زمان مشخص، دموی هفتگی', 'Clear deadlines, weekly demos'),
        text: l('هر هفته نسخهٔ قابل استفاده را روی یک لینک می‌بینید؛ نه اینکه ماه‌ها بی‌خبر بمانید.', 'Every week you see a working version on a link — never months of silence.'),
      },
      {
        icon: 'shield',
        title: l('بعد از تحویل هم هستم', 'I’m still here after launch'),
        text: l('پشتیبانی رایگان بعد از افتتاح، و پیامی که بی‌جواب نمی‌ماند.', 'Free support after go-live, and no message left unanswered.'),
      },
    ],
  },

  stats: [
    { value: 7, suffix: '', label: l('سامانهٔ فعال که همین حالا استفاده می‌شوند', 'live systems in daily use right now') },
    { value: 63, suffix: '', label: l('صفحه و بخش فقط در یکی از پروژه‌ها', 'pages and sections in just one of the projects') },
    { value: 6, suffix: '+', label: l('سال تجربه در برنامه‌نویسی و هوش مصنوعی', 'years of experience in software and AI') },
  ],

  about: {
    eyebrow: l('دربارهٔ من', 'About me'),
    title: l('سلام، رامین هستم؛ {یک نفر} از ایده تا اجرا', 'Hi, I’m Ramin\u00a0— {one person} from idea to launch'),
    quote: l('هر پروژه، امضای من است', 'Every project carries my signature'),
    role: l('برنامه‌نویس فول‌استک و هوش مصنوعی', 'Full-stack & AI developer'),
    portraitAlt: l('رامین عمرانی', 'Ramin Omrani'),
    text: l(
      [
        'برنامه‌نویس فول‌استک و توسعه‌دهندهٔ هوش مصنوعی در مشهد. کارم را با داده و پژوهش شروع کردم و مدل پیش‌بینی‌ای که ساختم در یک مجلهٔ علمی معتبر اسپرینگر (Q1) منتشر شده است.',
        'امروز سایت، اپلیکیشن و سامانه‌هایی می‌سازم که کسب‌وکارها هر روز با آن‌ها کار می‌کنند. چون همه‌چیز از طراحی تا سرور دست خودم است، طرف حسابتان یک نفر است، نه زنجیره‌ای از واسطه‌ها.',
      ],
      [
        'I’m a full-stack and AI developer based in Mashhad, Iran. I started out in data and research, and the forecasting model I built was published in a leading Springer journal (Q1).',
        'Today I build the websites, apps and systems that businesses run on every day. Because I handle everything myself, from design to servers, you deal with one person — not a chain of middlemen.',
      ],
    ),
    now: l('الان: توسعه‌دهندهٔ هوش مصنوعی در گروه نرم‌افزاری میلیونر', 'Now: AI developer at Millionaire Software Group'),
    chips: l(['مشهد', 'همکاری آنلاین با همهٔ شهرها', 'فارسی و انگلیسی'], ['Mashhad, Iran', 'Working remotely, anywhere', 'English & Persian']),
  },

  faq: {
    eyebrow: l('سؤالات رایج', 'FAQ'),
    title: l('قبل از شروع {بپرسید}', 'Questions {before we start}'),
    text: l('سؤالتان اینجا نیست؟ مستقیم بپرسید؛ معمولاً همان روز جواب می‌دهم.', 'Don’t see your question? Just ask — I usually reply the same day.'),
    ask: l('سؤال در واتس‌اپ', 'Ask on WhatsApp'),
    askMessage: l('سلام رامین، یک سؤال داشتم:', 'Hi Ramin, I have a question:'),
    me: l('سؤال‌هایتان را خودم جواب می‌دهم، نه ربات و نه واسطه.', 'I answer your questions myself — no bots, no middlemen.'),
    items: [
      {
        q: l('هزینهٔ ساخت سایت یا اپلیکیشن چقدر است؟', 'How much does a website or app cost?'),
        a: l(
          'بستگی به امکانات دارد. بعد از گفت‌وگوی رایگان یک پیشنهاد مکتوب با قیمت ثابت می‌گیرید؛ بدون هزینهٔ پنهان. پروژه‌های بزرگ‌تر را می‌شود مرحله‌به‌مرحله پیش برد تا با بودجه‌تان جور شود.',
          'It depends on the features. After a free consultation you get a written, fixed-price proposal with no hidden costs. Bigger projects can be built in phases to fit your budget.',
        ),
      },
      {
        q: l('چقدر طول می‌کشد؟', 'How long does it take?'),
        a: l(
          'یک سایت معرفی معمولاً ۲ تا ۳ هفته و یک سامانهٔ کامل با پنل و اپلیکیشن ۶ تا ۱۲ هفته. زمان دقیق را قبل از شروع با هم قطعی می‌کنیم.',
          'A business website usually takes 2–3 weeks; a complete system with an admin panel and an app, 6–12 weeks. We agree on the exact timeline together before we start.',
        ),
      },
      {
        q: l('اپلیکیشن روی آیفون هم نصب می‌شود؟', 'Will the app install on iPhones too?'),
        a: l(
          'بله. اپلیکیشن‌هایم روی اندروید و آیفون از خود مرورگر نصب می‌شوند و مثل یک اپ معمولی آیکون دارند. در صورت نیاز نسخهٔ کافه‌بازار هم آماده می‌کنم.',
          'Yes. My apps install straight from the browser on both Android and iPhone and get a home-screen icon like any other app. If you need one, I can also prepare an edition for Café Bazaar, Iran’s Android app store.',
        ),
      },
      {
        q: l('دامنه و سرور را هم شما تهیه می‌کنید؟', 'Do you take care of the domain and hosting?'),
        a: l(
          'بله. خرید دامنه، سرور، SSL و راه‌اندازی را انجام می‌دهم و همه به نام خودتان ثبت می‌شود.',
          'Yes. I handle the domain, the server, SSL and the setup — and everything is registered in your name.',
        ),
      },
      {
        q: l('بعداً خودم می‌توانم محتوا را عوض کنم؟', 'Can I update the content myself later?'),
        a: l(
          'بله. یک پنل مدیریت فارسی و ساده تحویل می‌گیرید و کار با آن را قدم‌به‌قدم آموزش می‌دهم.',
          'Yes. You get a simple, clean admin panel, and I walk you through it step by step.',
        ),
      },
      {
        q: l('بعد از تحویل چه می‌شود؟', 'What happens after launch?'),
        a: l(
          'یک دورهٔ پشتیبانی رایگان دارید. بعد از آن هم می‌توانیم برای نگهداری، بک‌آپ و امکانات جدید قرارداد ماهانه ببندیم.',
          'You get a free support period. After that, we can agree on a monthly plan for maintenance, backups and new features.',
        ),
      },
      {
        q: l('فقط با کسب‌وکارهای مشهد کار می‌کنید؟', 'Do you only work with businesses in Mashhad?'),
        a: l(
          'نه. با کسب‌وکارهای همهٔ شهرها و حتی خارج از ایران به‌صورت آنلاین کار می‌کنم؛ جلسه‌ها تلفنی یا تصویری است.',
          'Not at all. I work online with businesses in every city and outside Iran too; our meetings happen by phone or video call.',
        ),
      },
    ],
  },

  contact: {
    eyebrow: l('شروع همکاری', 'Let’s work together'),
    title: l('ایده‌تان را بگویید؛ [بقیه‌اش با من]', 'Tell me your idea\u00a0— [leave the rest to me]'),
    text: l('مشاورهٔ اول رایگان است و معمولاً همان روز جواب می‌دهم.', 'The first consultation is free, and I usually reply the same day.'),
    channels: {
      call: l('تماس تلفنی', 'Call'),
      whatsapp: l('واتس‌اپ', 'WhatsApp'),
      telegram: l('تلگرام', 'Telegram'),
      email: l('ایمیل', 'Email'),
    },
    channelMessage: l('سلام رامین، برای یک پروژه پیام می‌دهم.', 'Hi Ramin, I’m getting in touch about a project.'),
    copy: l((what: string) => `کپی ${what}`, (what: string) => `Copy ${what}`),
    copiedWhat: l((what: string) => `${what} کپی شد`, (what: string) => `${what} copied`),
    copyFailed: l('کپی نشد؛ لطفاً دستی کپی کنید', 'Couldn’t copy — please copy it by hand'),
    chat: {
      title: l('گفت‌وگوی سی‌ثانیه‌ای', 'A 30-second chat'),
      status: l('معمولاً همان روز جواب می‌دهد', 'Usually replies the same day'),
      typing: l('در حال نوشتن…', 'typing…'),
      typingLabel: l('در حال نوشتن', 'Typing'),
      hello: l('سلام! 👋 خوشحالم که اینجایید. چه چیزی می‌خواهید بسازیم؟', 'Hi! 👋 Glad you’re here. What would you like to build?'),
      needs: l(['سایت', 'اپلیکیشن', 'CRM و پنل', 'ربات تلگرام', 'هوش مصنوعی', 'هنوز مطمئن نیستم'], ['A website', 'An app', 'A CRM or panel', 'A Telegram bot', 'Something with AI', 'Not sure yet']),
      askBudget: l('عالی! بودجه‌تان حدوداً چقدر است؟', 'Great! Roughly what budget do you have in mind?'),
      budgets: l(['کوچک', 'متوسط', 'بزرگ', 'نمی‌دانم'], ['Small', 'Medium', 'Large', 'Not sure']),
      askName: l('و اسمتان؟ (اختیاری)', 'And your name? (optional)'),
      nameLabel: l('اسم شما', 'Your name'),
      namePlaceholder: l('مثلاً مریم', 'e.g. Sarah'),
      noName: l('ترجیح می‌دهم نگویم', 'I’d rather not say'),
      next: l('ادامه', 'Continue'),
      ready: l('پیامتان آماده است. از کجا بفرستم؟', 'Your message is ready. Where shall I send it?'),
      sendWhatsapp: l('ارسال در واتس‌اپ', 'Send on WhatsApp'),
      sendTelegram: l('ارسال در تلگرام', 'Send on Telegram'),
      restart: l('از اول', 'Start over'),
      copied: l('متن پیام کپی شد؛ اگر در تلگرام خالی بود، همان را بچسبانید.', 'Message copied — if Telegram opens with an empty box, just paste it in.'),
      /** The drafted message: greeting, what they want (by index in `needs`), budget (by index in `budgets`). */
      greet: l(
        (name: string) => `سلام رامین${name ? `، ${name} هستم` : ''}.`,
        (name: string) => `Hi Ramin${name ? `, this is ${name}` : ''}.`,
      ),
      needLines: l(
        ['می‌خواهم سایت بسازم.', 'می‌خواهم اپلیکیشن بسازم.', 'می‌خواهم CRM و پنل بسازم.', 'می‌خواهم ربات تلگرام بسازم.', 'می‌خواهم هوش مصنوعی بسازم.', 'برای یک پروژه مشاوره می‌خواهم.'],
        ['I’d like to build a website.', 'I’d like to build an app.', 'I’d like to build a CRM or admin panel.', 'I’d like to build a Telegram bot.', 'I’d like to put AI to work in my business.', 'I’d like some advice on a project.'],
      ),
      budgetLines: l(
        ['بودجه‌ام تقریباً کوچک است.', 'بودجه‌ام تقریباً متوسط است.', 'بودجه‌ام تقریباً بزرگ است.', ''],
        ['My budget is on the small side.', 'My budget is mid-range.', 'My budget is on the larger side.', ''],
      ),
    },
  },

  /** Interface words: buttons, labels and screen-reader text. */
  ui: {
    skip: l('رفتن به نمونه‌کارها', 'Skip to my work'),
    home: l((name: string) => `${name}، بازگشت به ابتدا`, (name: string) => `${name} — back to the top`),
    sections: l('بخش‌های سایت', 'Site sections'),
    cta: l('گفت‌وگوی رایگان', 'Free consultation'),
    ctaMessage: l('سلام رامین، برای یک پروژه مشاوره می‌خواهم.', 'Hi Ramin, I’d like some advice on a project.'),
    openMenu: l('باز کردن منو', 'Open menu'),
    closeMenu: l('بستن منو', 'Close menu'),
    menu: l('منو', 'Menu'),
    top: l('ابتدای صفحه', 'Top of the page'),
    contact: l('تماس', 'Contact'),
    whatsapp: l('واتس‌اپ', 'WhatsApp'),
    telegram: l('تلگرام', 'Telegram'),
    github: l('گیت‌هاب', 'GitHub'),
    linkedin: l('لینکدین', 'LinkedIn'),
    langSwitch: l('نسخهٔ انگلیسی این صفحه', 'Persian version of this page'),
    quick: l('تماس سریع', 'Quick contact'),
    call: l('تماس', 'Call'),
    callTo: l((n: string) => `تماس با ${n}`, (n: string) => `Call ${n}`),
    freeConsult: l('مشاورهٔ رایگان', 'Free consult'),
    intro: l('معرفی', 'Introduction'),
    aboutRamin: l('دربارهٔ رامین', 'About Ramin'),
    chapters: l(['معرفی', 'سایت‌ها', 'اپلیکیشن'], ['Intro', 'Websites', 'Apps']),
    filter: l('دسته‌بندی نمونه‌کارها', 'Filter projects'),
    desktopOf: l((name: string) => `${name}، نسخهٔ دسکتاپ`, (name: string) => `${name}, desktop version`),
    mobileOf: l((name: string) => `${name}، نسخهٔ موبایل`, (name: string) => `${name}, mobile version`),
    footerLinks: l('لینک‌های پایین صفحه', 'Footer links'),
    rights: l('همهٔ پروژه‌ها با اجازهٔ کارفرما نمایش داده شده‌اند.', 'All projects are shown with their clients’ permission.'),
    versions: l('نسخه‌های دیگر سایت', 'Other versions of this site'),
    enamad: l('نماد اعتماد الکترونیکی', 'Enamad e-trust seal'),
  },

  /** Words inside a project's story. */
  caseStudy: {
    close: l('بستن و بازگشت', 'Close and go back'),
    live: l('نسخهٔ زنده', 'Live site'),
    problem: l('مشکل چه بود؟', 'What was the problem?'),
    solution: l('چه ساختم؟', 'What did I build?'),
    insideBot: l('داخل ربات', 'Inside the bot'),
    inside: l('داخل سایت و اپلیکیشن', 'Inside the site and app'),
    features: l('امکانات', 'Features'),
    client: l('کارفرما', 'Client'),
    role: l('کار من', 'My role'),
    stack: l('تکنولوژی‌ها', 'Tech stack'),
    ctaTitle: l('یک پروژهٔ شبیه این می‌خواهید؟', 'Want a project like this one?'),
    ctaText: l('بگویید برای چه کسب‌وکاری؛ مشاورهٔ اول رایگان است و خودم جواب می‌دهم.', 'Tell me about your business — the first consultation is free, and I reply personally.'),
    ctaMessage: l((name: string) => `سلام رامین، پروژه‌ای شبیه «${name}» می‌خواهم.`, (name: string) => `Hi Ramin, I’d like a project similar to “${name}”.`),
    whatsapp: l('پیام در واتس‌اپ', 'Message on WhatsApp'),
    next: l('پروژهٔ بعدی', 'Next project'),
    screensOf: l((name: string) => `صفحه‌های ${name}`, (name: string) => `Screens from ${name}`),
    tryBot: l('دکمه‌ها را بزنید؛ همان جواب ربات واقعی را می‌گیرید', 'Tap the buttons — you get the real bot’s replies'),
    mili: l('دستیار هوشمند میلی', 'Mili, the AI assistant'),
    prev: l('قبلی', 'Previous'),
    nextShot: l('بعدی', 'Next'),
  },
};

export const copy = bilingual(src);

export type Copy = (typeof copy)['fa'];

/** All copy in the page's language. */
export const useCopy = () => copy[useLang()];
