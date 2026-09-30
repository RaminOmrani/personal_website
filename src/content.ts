/**
 * ─────────────────────────────────────────────────────────────
 *  همهٔ محتوای سایت اینجاست — فقط همین فایل را ویرایش کنید.
 *  All website content lives here — this is the only file you need to edit.
 * ─────────────────────────────────────────────────────────────
 *
 *  • Every text has a Persian (fa) and an English (en) version.
 *  • Wrap words in *asterisks* to give them the accent style (italic / colored).
 *  • Items marked `sample: true` are PLACEHOLDERS. Replace them with your real
 *    work and then delete the flag. Sample testimonials are never published in
 *    a production build, and `npm run build` lists every sample item left.
 */

export type Lang = 'fa' | 'en';
export type L = Record<Lang, string>;

const l = (fa: string, en: string): L => ({ fa, en });

/* ───────────────────────── Identity ───────────────────────── */

export const site = {
  defaultLang: 'fa' as Lang,
  /** Final public URL (used for SEO / social previews). Change it after you buy a domain. */
  url: 'https://raminomrani.ir/v1/',
  name: l('رامین عمرانی', 'Ramin Omrani'),
  /** The two big lines in the hero. */
  heroName: { fa: ['رامین', 'عمرانی'], en: ['RAMIN', 'OMRANI'] },
  monogram: 'RO',
  role: l('توسعه‌دهندهٔ فول‌استک و هوش مصنوعی', 'Full-stack & AI Developer'),
  description: l(
    'رامین عمرانی — توسعه‌دهندهٔ فول‌استک و هوش مصنوعی در مشهد. ساخت وب‌سایت، سیستم‌های تحت وب سازمانی و دستیارهای هوش مصنوعی، از ایده تا اجرا.',
    'Ramin Omrani — full-stack & AI developer in Mashhad, Iran. Websites, business web systems and AI assistants, built end to end.',
  ),
  location: l('مشهد · ایران', 'Mashhad · Iran'),
  /** City in English, for search-engine structured data. */
  city: 'Mashhad',
  timezone: 'Asia/Tehran',
  email: 'ramin.omrani.95@gmail.com',
  available: true,
  availability: l('پذیرش پروژهٔ جدید', 'Available for new projects'),
  socials: [
    { label: 'GitHub', url: 'https://github.com/RaminOmrani' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/ramin-omrani' },
    { label: 'Google Scholar', url: 'https://scholar.google.com/citations?user=2BLkB4YAAAAJ' },
    { label: 'Telegram', url: 'https://t.me/Daneshjoo_AI' },
    { label: 'WhatsApp', url: 'https://wa.me/989365743458' },
  ],
};

/* ───────────────────────── Hero ───────────────────────── */

export const hero = {
  eyebrow: l('پورتفولیو', 'Portfolio'),
  statement: l(
    'وب‌سایت، سیستم‌های تحت وب و دستیارهای *هوش مصنوعی* می‌سازم که واقعاً به کار می‌آیند.',
    'I build websites, web systems and *AI* assistants that actually get used.',
  ),
  intro: l(
    'از طراحی و کدنویسی تا سرور، امنیت و نگهداری، همه را خودم انجام می‌دهم. نتیجه محصولی است که هر روز در کسب‌وکار شما کار می‌کند، نه فقط یک دموی زیبا.',
    'Design, code, servers, security and upkeep — I handle all of it myself. You get a product that works in your business every day, not just a pretty demo.',
  ),
  primaryCta: l('نمونه‌کارها', 'Selected work'),
  secondaryCta: l('شروع یک پروژه', 'Start a project'),
  scroll: l('اسکرول کنید', 'Scroll to explore'),
};

/* ───────────────────────── About ───────────────────────── */

export const about = {
  label: l('دربارهٔ من', 'About'),
  manifesto: l(
    'من رامینم؛ مهندس صنایع و پژوهشگر داده‌ای که عاشق ساختن شد. سال‌ها روی داده‌های واقعی سلامت کار کردم و همان دقت را به نرم‌افزار آورده‌ام. سیستم‌هایی می‌سازم که *داده* را به *تصمیم* و ایده را به *محصول* تبدیل می‌کنند.',
    "I'm Ramin — an industrial engineer and data researcher who fell in love with building. I spent years on real national health data, and I bring the same rigour to software: I build systems that turn *data* into *decisions* and ideas into *products*.",
  ),
  nameCard: {
    word: l('عُمرانی', 'Omrani'),
    phonetic: '/om·rā·ni/',
    text: l(
      'از ریشهٔ «عمران»؛ یعنی ساختن، آباد کردن و جان دادن به چیزها. انگار اسمم از اول شرح شغلم بوده.',
      'From the Persian “omrān” — to build, to develop, to bring to life. Turns out my name was a job description all along.',
    ),
  },
  stats: [
    { value: 6, suffix: '+', label: l('سال کار با داده و هوش مصنوعی', 'Years in data & AI') },
    { value: 10, suffix: '+', label: l('سیستم در حال استفاده، ساخت و نگهداری انفرادی', 'Live systems, built & run solo') },
    { value: 2, suffix: '', label: l('دستیار هوش مصنوعی در استفادهٔ روزانه', 'AI assistants in daily use') },
    { value: 99, suffix: '%', label: l('دقت پیش‌بینی مدل منتشرشده', 'Forecast accuracy, published model') },
  ],
};

/* ───────────────────────── Services ───────────────────────── */

export const services = {
  label: l('خدمات', 'Services'),
  title: l('چه کاری *برای شما* انجام می‌دهم', 'What I can do *for you*'),
  items: [
    {
      icon: 'app',
      title: l('سیستم‌های تحت وب سازمانی', 'Business Web Systems'),
      text: l(
        'CRM، تیکتینگ آنلاین، حقوق و دستمزد، داشبورد و کیوسک سفارش؛ امن، چندکاربره و ساخته‌شده بر اساس روش کار واقعی تیم شما.',
        'CRM, live ticketing, payroll, dashboards and ordering kiosks — secure, multi-user and shaped around how your team actually works.',
      ),
      tags: ['FastAPI', 'Node.js', 'PostgreSQL', 'SQL Server', 'WebSockets'],
    },
    {
      icon: 'bot',
      title: l('دستیار هوش مصنوعی و چت‌بات', 'AI Assistants & Chatbots'),
      text: l(
        'پشتیبان هوشمندی که از روی مستندات خودتان جواب می‌دهد، دستیاری که سؤال فارسی را به کوئری SQL تبدیل می‌کند و پردازش تصویر با مدل‌های بینایی.',
        'Support bots that answer from your own documents, assistants that turn plain-language questions into SQL, and vision-LLM pipelines.',
      ),
      tags: ['OpenAI', 'Gemini', 'RAG', 'Text-to-SQL', 'Vision'],
    },
    {
      icon: 'web',
      title: l('وب‌سایت و اپلیکیشن PWA', 'Websites & PWA Apps'),
      text: l(
        'سایت‌های سریع و فارسی با سئو و طراحی جدی که روی موبایل مثل اپلیکیشن نصب می‌شوند؛ با پرداخت آنلاین، پیامک و پنل مدیریت.',
        'Fast Persian-first sites with real SEO and serious design that install like an app on phones — with online payments, SMS and an admin panel.',
      ),
      tags: ['Next.js', 'React', 'Tailwind', 'PWA', 'SEO'],
    },
    {
      icon: 'chart',
      title: l('تحلیل داده و پیش‌بینی', 'Data Analysis & Forecasting'),
      text: l(
        'داشبورد، گزارش KPI و مدل‌های یادگیری ماشین برای پیش‌بینی؛ با خط لولهٔ دادهٔ اعتبارسنجی‌شده و قابل تکرار.',
        'Dashboards, KPI reporting and machine-learning forecasts, built on validated and reproducible data pipelines.',
      ),
      tags: ['Python', 'Pandas', 'Scikit-learn', 'XGBoost', 'Power BI'],
    },
    {
      icon: 'motion',
      title: l('اتوماسیون و ایجنت‌های هوشمند', 'Automation & AI Agents'),
      text: l(
        'ایجنت‌ها و ربات‌هایی که هر روز خودکار اطلاعات را جمع می‌کنند، پاک‌سازی و امتیازدهی می‌کنند و نتیجه را جلوی شما می‌گذارند.',
        'Agents and bots that collect, clean and score information for you every day, automatically.',
      ),
      tags: ['Python', 'LLM agents', 'Scheduling', 'Telegram', 'SQLite'],
    },
  ],
};

/* ───────────────────────── Work ───────────────────────── */

export interface Project {
  slug: string;
  /** Placeholder project — replace with a real one, then delete this flag. */
  sample?: boolean;
  title: L;
  category: L;
  year: number;
  client: L;
  role: L;
  /** 'web' draws a browser mockup, 'app' draws phones (only when no image is given). */
  kind: 'web' | 'app';
  stack: string[];
  summary: L;
  challenge: L;
  solution: L;
  results: { value: L; label: L }[];
  link?: string;
  /** Two brand colors used for the generated cover art. */
  colors: [string, string];
  /** Optional real cover image, e.g. 'projects/nava.webp' (put the file in /public/projects). */
  image?: string;
}

export const work = {
  label: l('نمونه‌کارها', 'Work'),
  title: l('نمونه‌کارهای *منتخب*', 'Selected *work*'),
  hint: l('برای دیدن جزئیات هر پروژه کلیک کنید', 'Click a project to open its case study'),
  outro: {
    title: l('پروژهٔ بعدی، *مال شماست*؟', 'Your project *next*?'),
    cta: l('بیایید حرف بزنیم', "Let's talk"),
  },
  projects: [
    {
      slug: 'zehnesabz',
      title: l('کلینیک ذهن سبز', 'Zehne Sabz Clinic'),
      category: l('وب‌سایت، وب‌اپ و اپلیکیشن موبایل', 'Website, web app & mobile app'),
      year: 2026,
      client: l('کلینیک کاردرمانی و توان‌بخشی ذهن سبز، مشهد', 'Zehne Sabz rehabilitation clinic, Mashhad'),
      role: l('طراحی، توسعهٔ فول‌استک و استقرار', 'Design, full-stack development & deployment'),
      kind: 'app',
      stack: ['Next.js', 'TypeScript', 'Express', 'Prisma', 'Tailwind', 'PWA', 'Zarinpal'],
      summary: l(
        'پلتفرمی یکپارچه برای یک کلینیک کاردرمانی: سایت عمومی با نوبت‌دهی آنلاین، اپلیکیشن قابل‌نصب برای مراجعان و پنل‌های جداگانه برای مدیر، منشی و درمانگر.',
        'An all-in-one platform for an occupational-therapy clinic: a public website with online booking, an installable patient app, and separate panels for managers, secretaries and therapists.',
      ),
      challenge: l(
        'زمان‌بندی جلسات، ارزیابی‌های بالینی، امور مالی و ارتباط با مراجع باید برای چهار نقش مختلف، به فارسی و با تقویم شمسی، در یک سامانه کنار هم کار می‌کردند.',
        'Scheduling, clinical assessments, billing and patient communication had to work together for four different roles, in Persian and on the Jalali calendar.',
      ),
      solution: l(
        'پنل‌های نقش‌محور، تأیید و یادآوری خودکار پیامکی پیش از هر جلسه، فرم‌های ارزیابی امتیازدار با نمودار پیشرفت، پرداخت آنلاین، رضایت‌نامه با امضای دیجیتال و اپ اندروید ساخته‌شده بر پایهٔ PWA.',
        'Role-based panels, automatic SMS confirmations and reminders before every session, scored assessment forms with progress charts, online payments, digital consent signatures, and an Android app built on the PWA.',
      ),
      results: [
        { value: l('۴ نقش', '4 roles'), label: l('مدیر، منشی، درمانگر و مراجع', 'Manager, secretary, therapist, patient') },
        { value: l('۶۳', '63'), label: l('صفحه و پنل', 'Pages and panels') },
        { value: l('خودکار', 'Automatic'), label: l('یادآوری پیامکی جلسات', 'SMS session reminders') },
      ],
      link: 'https://zehnesabz.com',
      colors: ['#0b5e2e', '#c18a26'],
      image: 'projects/zehnesabz.jpg',
    },
    {
      slug: 'dopingshimi',
      title: l('دوپینگ شیمی', 'Doping Shimi'),
      category: l('وب‌سایت و پلتفرم آموزش آنلاین', 'Website & e-learning platform'),
      year: 2026,
      client: l('استاد جواد پرتویی، مدرس شیمی کنکور', 'Javad Partovi, konkur chemistry teacher'),
      role: l('طراحی، توسعهٔ فول‌استک و استقرار', 'Design, full-stack development & deployment'),
      kind: 'web',
      stack: ['Next.js', 'React', 'PostgreSQL', 'Prisma', 'Tailwind', 'ArvanCloud', 'PWA'],
      summary: l(
        'سایتی سینمایی، اپلیکیشن قابل‌نصب و پنل‌های دانش‌آموز و مدیریت برای یک مدرس شیمی کنکور؛ با ویدیوی محافظت‌شده، آزمون آنلاین، رتبه‌بندی و پرداخت آنلاین.',
        'A cinematic website, installable app and student and admin panels for a konkur chemistry teacher, with protected video lessons, online exams, leaderboards and online payments.',
      ),
      challenge: l(
        'ویدیوهای آموزشی باید فروخته و محافظت می‌شدند، آزمون‌های داخلی و خارجی برگزار می‌شد و دانش‌آموز انگیزه می‌گرفت؛ بدون اینکه فایل‌های سنگین ویدیو روی سرور بنشیند.',
        'Sell and protect paid video lessons, run both in-site and external exams and keep students motivated — without storing heavy video files on the server.',
      ),
      solution: l(
        'پخش ویدیو از ابر آروان با لینک امن و انقضادار و واترمارک متحرک، امتیاز و سطح‌بندی با نام عناصر جدول تناوبی، ورود نتایج آزمون از اکسل و اطلاع‌رسانی پیامکی به دانش‌آموز و والدین.',
        'ArvanCloud streaming through expiring per-user links with a moving watermark, points and levels named after chemical elements, Excel import of exam results, and SMS updates for students and parents.',
      ),
      results: [
        { value: l('H → Au', 'H → Au'), label: l('سطح‌بندی دانش‌آموز با عناصر شیمیایی', 'Student levels named after elements') },
        { value: l('۳۸', '38'), label: l('صفحه و پنل', 'Pages and panels') },
        { value: l('امن', 'Protected'), label: l('ویدیو با لینک انقضادار و واترمارک', 'Video with expiring links & watermark') },
      ],
      link: 'https://dopingshimi.ir',
      colors: ['#22d3ee', '#8b5cf6'],
      image: 'projects/dopingshimi.jpg',
    },
    {
      slug: 'support',
      title: l('مرکز پشتیبانی میلیونر', 'Millionaire Support Center'),
      category: l('تیکتینگ و دستیار هوش مصنوعی', 'Helpdesk & AI assistant'),
      year: 2026,
      client: l('گروه نرم‌افزاری میلیونر', 'Millionaire Software Group'),
      role: l('طراحی و توسعهٔ کامل', 'End-to-end design & development'),
      kind: 'web',
      stack: ['React', 'Node.js', 'Socket.IO', 'SQLite', 'FastAPI', 'RAG', 'Vision LLM'],
      summary: l(
        'سامانهٔ تیکتینگ لحظه‌ای و چندشرکتی برای مشتریان یک گروه نرم‌افزاری، به‌همراه «میلی»؛ دستیار هوش مصنوعی که پیش از ثبت تیکت از روی راهنماهای رسمی پاسخ می‌دهد.',
        'A real-time, multi-company ticketing system for a software group’s customers, with “Mili”, an AI assistant that answers from the official manuals before a ticket is opened.',
      ),
      challenge: l(
        'چند برند از یک تیم پشتیبانی مشترک استفاده می‌کنند و بسیاری از پاسخ‌ها در راهنماهای PDF طولانی و پر از اسکرین‌شات پنهان مانده است.',
        'Several brands share one support team, and many answers are buried in long PDF manuals that are mostly screenshots.',
      ),
      solution: l(
        'هلپ‌دسک با پیام صوتی، تخصیص خودکار به کم‌کارترین کارشناس، SLA بر اساس ساعت کاری و گزارش رضایت مشتری؛ و دستیار RAG که اسکرین‌شات‌های PDF را با مدل بینایی می‌خواند و متن فارسی را معنایی و کلیدواژه‌ای جست‌وجو می‌کند.',
        'A helpdesk with voice messages, auto-assignment to the least-loaded agent, business-hours SLAs and satisfaction reporting — plus a RAG assistant that reads PDF screenshots with a vision model and searches Persian text semantically and by keyword.',
      ),
      results: [
        { value: l('۱۱۷ صفحه', '117 pages'), label: l('راهنمای PDF که دستیار می‌خواند', 'Of PDF manuals the assistant reads') },
        { value: l('۵۹ صفحه', '59 pages'), label: l('که پاسخشان فقط داخل تصویر است', 'Where the answer lives only in an image') },
        { value: l('لحظه‌ای', 'Real-time'), label: l('پیام، تایپ و رسید خواندن', 'Messages, typing and read receipts') },
      ],
      link: 'https://support.softmiliac.com',
      colors: ['#8b0000', '#0f7d76'],
      image: 'projects/support.jpg',
    },
    {
      slug: 'crm',
      title: l('CRM میلیونر', 'Millionaire CRM'),
      category: l('نرم‌افزار تحت وب (SaaS)', 'SaaS web app'),
      year: 2026,
      client: l('گروه نرم‌افزاری میلیونر', 'Millionaire Software Group'),
      role: l('طراحی و توسعهٔ کامل', 'End-to-end design & development'),
      kind: 'web',
      stack: ['FastAPI', 'SQLAlchemy', 'SQL Server', 'JavaScript', 'Tailwind', 'pytest'],
      summary: l(
        'CRM فارسی و چندسازمانی برای کسب‌وکارهایی که از نرم‌افزار حسابداری میلیونر استفاده می‌کنند؛ قیف فروش، پیگیری خودکار و گزارش مدیریتی، با ثبت مستقیم فاکتور در حسابداری هر مشتری.',
        'A Persian multi-tenant sales CRM for businesses on Millionaire accounting software: pipeline, automatic follow-ups and management reports, with invoices posted straight into each customer’s accounting.',
      ),
      challenge: l(
        'یک CRM تحت وب باید به‌صورت امن به دیتابیس قدیمی SQL Server حسابداری هر مشتری وصل می‌شد، بدون نوشتن مستقیم روی جدول‌هایش و با جدا ماندن کامل دادهٔ هر مشتری.',
        'Connect a modern web CRM safely to each customer’s legacy SQL Server accounting database, without writing to its tables directly, while keeping every customer’s data fully isolated.',
      ),
      solution: l(
        'بک‌اند FastAPI که فقط از راه Stored Procedureهای نسخه‌دار با حسابداری کار می‌کند؛ با تفکیک داده در سطح سازمان، قیف فروش کشیدنی، طراح قالب فاکتور، API عمومی و وب‌فرم قابل‌جاسازی برای جذب لید.',
        'A FastAPI backend that talks to accounting only through versioned stored procedures, with per-organization isolation, a drag-and-drop pipeline, an invoice template designer, a public API and embeddable lead forms.',
      ),
      results: [
        { value: l('چندسازمانی', 'Multi-tenant'), label: l('دادهٔ هر مشتری کاملاً جدا', 'Every customer’s data isolated') },
        { value: l('۲۰', '20'), label: l('ماژول تست خودکار', 'Automated test modules') },
        { value: l('مستقیم', 'Direct'), label: l('ثبت فاکتور در حسابداری', 'Invoices posted to accounting') },
      ],
      colors: ['#cc2630', '#3db59a'],
      image: 'projects/crm.jpg',
    },
    {
      slug: 'superapp',
      title: l('سوپراپ میلیونر', 'Millionaire Super-App'),
      category: l('پورتال، اپلیکیشن PWA و پنل محتوا', 'Portal, PWA & CMS'),
      year: 2026,
      client: l('هلدینگ نرم‌افزاری میلیونر', 'Millionaire software holding'),
      role: l('طراحی و توسعهٔ کامل', 'End-to-end design & development'),
      kind: 'web',
      stack: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Drizzle', 'SQLite', 'Docker'],
      summary: l(
        'پورتالی یکپارچه و قابل‌نصب برای پنج محصول یک هلدینگ نرم‌افزاری؛ با لانچر جست‌وجومحور، صفحهٔ اختصاصی هر محصول، ثبت درخواست مشاوره و پنل مدیریت محتوا.',
        'One installable portal for a software holding’s five products, with a search-first launcher, product hubs, consultation requests and an admin CMS.',
      ),
      challenge: l(
        'هر محصول سایت و دامنهٔ جداگانه‌ای داشت و مشتری جای واحدی برای رسیدن به پنل، پشتیبانی و تعرفهٔ هر محصول نداشت.',
        'Each product had its own site and domain, so customers had no single place to reach a product’s panel, support and pricing.',
      ),
      solution: l(
        'پورتالی که محتوایش از یک منبع داده خوانده می‌شود؛ با وضعیت «قفل» و «به‌زودی»، پنل مدیریت تعرفه‌ها و بنرهای زمان‌دار، آمار بازدید و تصویر اشتراک‌گذاری اختصاصی برای هر محصول.',
        'A portal driven by a single data source, with locked and coming-soon states, an admin for pricing and scheduled banners, visit stats and a dedicated social image per product.',
      ),
      results: [
        { value: l('۵ محصول', '5 products'), label: l('در یک پورتال', 'In one portal') },
        { value: l('PWA', 'PWA'), label: l('قابل نصب روی موبایل', 'Installable on phones') },
        { value: l('CMS', 'CMS'), label: l('مدیریت محتوا، تعرفه و بنر', 'Content, pricing & banners') },
      ],
      link: 'https://app.softmiliac.com',
      colors: ['#980000', '#101840'],
      image: 'projects/superapp.jpg',
    },
  ] satisfies Project[] as Project[],
};

/* ───────────────────────── Process ───────────────────────── */

export const process = {
  label: l('فرایند', 'Process'),
  title: l('مسیر *همکاری* ما', 'How we’ll work *together*'),
  text: l(
    'شفاف، مرحله‌به‌مرحله و بدون غافلگیری. در هر لحظه می‌دانید پروژه کجاست.',
    'Transparent, step by step, no surprises. You always know exactly where your project stands.',
  ),
  steps: [
    {
      title: l('کشف و شناخت', 'Discovery'),
      text: l(
        'یک جلسهٔ رایگان برای شناخت اهداف، مخاطب و بودجه. در پایان یک پیشنهاد شفاف با زمان‌بندی و هزینهٔ مشخص می‌گیرید.',
        'A free call to understand your goals, audience and budget. You get a clear proposal with timeline and a fixed price.',
      ),
      time: l('۱ تا ۳ روز', '1–3 days'),
    },
    {
      title: l('استراتژی و طراحی', 'Strategy & Design'),
      text: l(
        'نقشهٔ سیستم، وایرفریم و طراحی رابط کاربری. با هم آن‌قدر جلو می‌رویم تا دقیقاً همان چیزی شود که می‌خواهید.',
        'System map, wireframes and interface design. We iterate together until it feels exactly right.',
      ),
      time: l('۱ تا ۳ هفته', '1–3 weeks'),
    },
    {
      title: l('توسعه', 'Development'),
      text: l(
        'کد تمیز و مقیاس‌پذیر با دموی هفتگی؛ همیشه پیشرفت واقعی را می‌بینید، نه یک جعبهٔ سیاه.',
        'Clean, scalable code with weekly demos — you always see real progress, never a black box.',
      ),
      time: l('۲ تا ۸ هفته', '2–8 weeks'),
    },
    {
      title: l('تست و انتشار', 'Launch'),
      text: l(
        'تست روی همهٔ دستگاه‌ها، راه‌اندازی روی سرور امن با TLS و بک‌آپ خودکار و سپس یک انتشار بی‌دردسر.',
        'Testing on every device, deployment on a secure server with TLS and automatic backups, then a smooth go-live.',
      ),
      time: l('۱ هفته', '1 week'),
    },
    {
      title: l('پشتیبانی و رشد', 'Care & Growth'),
      text: l(
        'پشتیبانی، تحلیل داده و بهبود مستمر تا محصولتان هر روز بهتر از دیروز شود.',
        'Ongoing support, analytics and improvements so your product keeps getting better.',
      ),
      time: l('مستمر', 'Ongoing'),
    },
  ],
};

/* ───────────────────────── Journey / activities ───────────────────────── */

export type JourneyKind = 'work' | 'research' | 'publication' | 'teaching' | 'education';

export const journeyKinds: Record<JourneyKind, L> = {
  work: l('کار', 'Work'),
  research: l('پژوهش', 'Research'),
  publication: l('مقاله', 'Publication'),
  teaching: l('تدریس', 'Teaching'),
  education: l('تحصیل', 'Education'),
};

const BNUT = l('دانشگاه صنعتی نوشیروانی بابل', 'Babol Noshirvani Univ. of Technology');

export const journey = {
  label: l('فعالیت‌ها', 'Activities'),
  title: l('مسیر و *فعالیت‌ها*', 'Journey & *activities*'),
  items: [
    {
      year: l('۲۰۲۶', '2026'),
      kind: 'work',
      title: l('طراحی و توسعهٔ مستقل برای مشتریان', 'Freelance web & app development'),
      place: l('کلینیک ذهن سبز، دوپینگ شیمی و…', 'Zehne Sabz clinic, Doping Shimi and more'),
    },
    {
      year: l('۲۰۲۵ تاکنون', '2025 – now'),
      kind: 'work',
      title: l('تحلیلگر داده و توسعه‌دهندهٔ هوش مصنوعی', 'Data Analyst & AI Developer'),
      place: l('شرکت نرم‌افزاری میلیونر، مشهد', 'Millionaire Software Co., Mashhad'),
    },
    {
      year: l('۲۰۲۵', '2025'),
      kind: 'publication',
      title: l('مقالهٔ Q1: پیش‌بینی شدت همه‌گیری با رویکرد علّی عصبی‌-فازی', 'Q1 paper: neuro-fuzzy causal forecasting of pandemic severity'),
      place: l('Int. J. of Data Science and Analytics · Springer', 'Int. J. of Data Science and Analytics · Springer'),
      url: 'https://doi.org/10.1007/s41060-025-00813-z',
    },
    {
      year: l('در حال داوری', 'Under review'),
      kind: 'publication',
      title: l('پیش‌بینی تقاضای درمان: الگوریتم‌های گروهی در برابر غیرگروهی', 'Healthcare demand forecasting: ensemble vs. non-ensemble AI'),
      place: l('Scientific Reports · Nature Portfolio', 'Scientific Reports · Nature Portfolio'),
    },
    {
      year: l('۲۰۲۴', '2024'),
      kind: 'education',
      title: l('بوت‌کمپ پایتون و هوش مصنوعی (۲۰۰+ ساعت)', 'Python & AI Bootcamp (200+ h)'),
      place: l('پای‌توپیا', 'Pytopia'),
    },
    {
      year: l('۲۰۲۳', '2023'),
      kind: 'education',
      title: l('بوت‌کمپ علم دادهٔ کاربردی (۳۵۰+ ساعت)', 'Applied Data Science Bootcamp (350+ h)'),
      place: l('دانشگاه تهران', 'University of Tehran'),
    },
    {
      year: l('۲۰۲۰ – ۲۰۲۳', '2020 – 2023'),
      kind: 'research',
      title: l('پژوهشگر هوش مصنوعی در سلامت؛ مشاور داشبورد ملی کووید-۱۹', 'AI in Healthcare researcher; advisor on the national COVID-19 dashboard'),
      place: BNUT,
    },
    {
      year: l('۲۰۲۰ – ۲۰۲۲', '2020 – 2022'),
      kind: 'teaching',
      title: l('دستیار آموزشی درس انفورماتیک سلامت (ارشد)', 'Teaching Assistant, Informatics in Healthcare (M.Sc.)'),
      place: BNUT,
    },
    {
      year: l('۲۰۱۹ – ۲۰۲۳', '2019 – 2023'),
      kind: 'education',
      title: l('کارشناسی ارشد مهندسی صنایع، سیستم‌های سلامت', 'M.Sc. Industrial Engineering, Health Systems'),
      place: BNUT,
    },
    {
      year: l('۲۰۱۴ – ۲۰۱۹', '2014 – 2019'),
      kind: 'education',
      title: l('کارشناسی مهندسی صنایع', 'B.Sc. Industrial Engineering'),
      place: l('دانشگاه تربت حیدریه', 'University of Torbat Heydarieh'),
    },
  ] as { year: L; kind: JourneyKind; title: L; place: L; url?: string; sample?: boolean }[],
};

/* ───────────────────────── Tools (marquee) ───────────────────────── */

export const tools = {
  label: l('ابزارها و تکنولوژی‌ها', 'Tools & technologies'),
  rows: [
    ['Python', 'FastAPI', 'Node.js', 'Next.js', 'React', 'TypeScript', 'PostgreSQL', 'SQL Server', 'Prisma', 'Tailwind CSS'],
    ['OpenAI', 'Gemini', 'RAG', 'PyTorch', 'Scikit-learn', 'XGBoost', 'Pandas', 'Power BI', 'Docker', 'Nginx'],
  ],
};

/* ───────────────────────── Testimonials ───────────────────────── */

export const testimonials = {
  label: l('نظر مشتریان', 'Kind words'),
  title: l('آن‌ها چه *می‌گویند*', 'What clients *say*'),
  /** SAMPLE quotes are hidden in production. Add real quotes (with permission) and remove `sample`. */
  items: [
    {
      sample: true,
      quote: l(
        'رامین فقط یک سایت تحویل نداد؛ کل تصویر برند ما را عوض کرد. از روز انتشار، درخواست‌ها دو برابر شد.',
        'Ramin didn’t just deliver a website — he changed how people see our brand. Enquiries doubled from launch day.',
      ),
      name: l('نام مشتری', 'Client Name'),
      role: l('مدیرعامل، شرکت نمونه', 'CEO, Sample Company'),
    },
    {
      sample: true,
      quote: l(
        'دقیق، خلاق و همیشه در دسترس. دموهای هفتگی باعث شد هیچ‌وقت نگران پیشرفت پروژه نباشیم.',
        'Precise, creative and always available. The weekly demos meant we never had to worry about progress.',
      ),
      name: l('نام مشتری', 'Client Name'),
      role: l('مدیر محصول، استارتاپ نمونه', 'Product Manager, Sample Startup'),
    },
    {
      sample: true,
      quote: l(
        'اپلیکیشنی که ساخت از چیزی که تصور می‌کردیم سریع‌تر و زیباتر بود. کاربرانمان عاشقش شدند.',
        'The app he built was faster and more beautiful than we imagined. Our users fell in love with it.',
      ),
      name: l('نام مشتری', 'Client Name'),
      role: l('بنیان‌گذار، برند نمونه', 'Founder, Sample Brand'),
    },
  ],
};

/* ───────────────────────── FAQ ───────────────────────── */

export const faq = {
  label: l('سؤالات رایج', 'FAQ'),
  title: l('سؤال‌هایی که *زیاد* می‌پرسند', 'Questions clients *often* ask'),
  items: [
    {
      q: l('هزینهٔ طراحی سایت یا اپلیکیشن چقدر است؟', 'How much does a website or app cost?'),
      a: l(
        'هر پروژه متفاوت است. بعد از یک گفت‌وگوی کوتاه، یک پیشنهاد با قیمت ثابت و بدون هزینهٔ پنهان برایتان می‌فرستم. پروژه‌های بزرگ را هم می‌توانیم فازبندی کنیم تا با بودجهٔ شما جور شود.',
        'Every project is different. After a short call I send a fixed-price proposal with no hidden costs. Bigger projects can be split into phases to match your budget.',
      ),
    },
    {
      q: l('انجام پروژه چقدر زمان می‌برد؟', 'How long does a project take?'),
      a: l(
        'یک لندینگ‌پیج معمولاً ۲ تا ۳ هفته و یک وب‌سایت یا اپلیکیشن کامل بین ۶ تا ۱۲ هفته. زمان‌بندی دقیق را قبل از شروع کار با هم قطعی می‌کنیم.',
        'A landing page usually takes 2–3 weeks; a complete website or app 6–12 weeks. We lock the exact timeline together before any work starts.',
      ),
    },
    {
      q: l('با مشتریان خارج از ایران هم کار می‌کنید؟', 'Do you work with international clients?'),
      a: l(
        'بله. به‌صورت ریموت و به دو زبان فارسی و انگلیسی با تیم‌هایی در منطقه‌های زمانی مختلف همکاری می‌کنم.',
        'Yes. I work remotely, in English and Persian, with teams across different time zones.',
      ),
    },
    {
      q: l('بعد از تحویل پروژه چه اتفاقی می‌افتد؟', 'What happens after launch?'),
      a: l(
        'هر پروژه با یک دورهٔ پشتیبانی رایگان تحویل داده می‌شود. میزبانی، امنیت و بک‌آپ را هم می‌توانم برایتان مدیریت کنم و بعد از آن برای نگهداری و رشد محصول قرارداد ماهانه داشته باشیم.',
        'Every project ships with a free support period. I can also run the hosting, security and backups for you, and continue with a monthly plan for maintenance and growth.',
      ),
    },
    {
      q: l('می‌توانید به سیستم فعلی ما هوش مصنوعی اضافه کنید؟', 'Can you add AI to our existing system?'),
      a: l(
        'بله. دستیار را مستقیم به پایگاه داده یا مستندات فعلی‌تان وصل می‌کنم؛ مثلاً دستیاری که روی SQL Server به سؤال‌ها جواب می‌دهد یا پشتیبانی که از روی راهنماهای خودتان پاسخ می‌دهد، بدون اینکه چیزی که درست کار می‌کند را از نو بسازیم.',
        'Yes. I connect assistants to your existing database or documents — for example one that answers questions over SQL Server, or a support bot grounded in your own guides — without rebuilding what already works.',
      ),
    },
    {
      q: l('می‌توانم محتوای سایت را خودم تغییر دهم؟', 'Can I update the content myself?'),
      a: l(
        'بله. در صورت نیاز یک پنل مدیریت محتوای ساده روی سایت راه‌اندازی می‌کنم و نحوهٔ کار با آن را آموزش می‌دهم.',
        'Absolutely. When needed I set up a simple CMS and walk you through using it.',
      ),
    },
  ],
};

/* ───────────────────────── Contact ───────────────────────── */

export const contact = {
  label: l('تماس', 'Contact'),
  title: l('بیایید چیزی *ماندگار* بسازیم', 'Let’s build something *remarkable*'),
  text: l(
    'ایده، محصول یا یک رؤیای بلندپروازانه دارید؟ برایم بنویسید؛ معمولاً در کمتر از ۲۴ ساعت پاسخ می‌دهم.',
    'Have an idea, a product or a wild vision? Tell me about it — I usually reply within 24 hours.',
  ),
  form: {
    title: l('خلاصهٔ پروژه', 'Project brief'),
    name: l('نام شما', 'Your name'),
    need: l('به چه چیزی نیاز دارید؟', 'What do you need?'),
    needs: [
      l('وب‌سایت', 'Website'),
      l('سیستم تحت وب / CRM', 'Web system / CRM'),
      l('دستیار هوش مصنوعی', 'AI assistant'),
      l('داشبورد و تحلیل داده', 'Data & dashboards'),
      l('اتوماسیون / ربات', 'Automation / bot'),
      l('موارد دیگر', 'Something else'),
    ],
    budget: l('بودجهٔ تقریبی', 'Estimated budget'),
    budgets: [l('کوچک', 'Small'), l('متوسط', 'Medium'), l('بزرگ', 'Large'), l('هنوز نمی‌دانم', 'Not sure yet')],
    message: l('کمی دربارهٔ پروژه بگویید…', 'Tell me a bit about the project…'),
    submit: l('ارسال درخواست', 'Send brief'),
    note: l('با کلیک، ایمیل شما با همین اطلاعات آماده می‌شود.', 'This opens your email app with the brief pre-filled.'),
    subject: l('درخواست پروژه از طریق سایت', 'Project enquiry via website'),
  },
};

/* ───────────────────────── Interface strings ───────────────────────── */

export const ui = {
  skip: l('رفتن به محتوای اصلی', 'Skip to content'),
  nav: {
    work: l('نمونه‌کار', 'Work'),
    about: l('درباره', 'About'),
    services: l('خدمات', 'Services'),
    process: l('فرایند', 'Process'),
    contact: l('تماس', 'Contact'),
  },
  talk: l('بیایید حرف بزنیم', 'Let’s talk'),
  menu: l('منو', 'Menu'),
  close: l('بستن', 'Close'),
  langName: l('English', 'فارسی'),
  langSwitch: l('Switch to English', 'تغییر زبان به فارسی'),
  sound: l('صدا', 'Sound'),
  soundOn: l('روشن کردن صدای محیطی', 'Turn ambient sound on'),
  soundOff: l('خاموش کردن صدا', 'Turn sound off'),
  loading: l('در حال آماده‌سازی تجربه', 'Loading experience'),
  localTime: l('ساعت محلی', 'Local time'),
  view: l('مشاهده', 'View'),
  drag: l('بکشید', 'Drag'),
  caseStudy: l('مطالعهٔ موردی', 'Case study'),
  client: l('کارفرما', 'Client'),
  year: l('سال', 'Year'),
  role: l('نقش من', 'My role'),
  stack: l('تکنولوژی‌ها', 'Stack'),
  challenge: l('چالش', 'The challenge'),
  solution: l('راه‌حل', 'The solution'),
  results: l('در یک نگاه', 'At a glance'),
  visit: l('مشاهدهٔ پروژه', 'Visit live site'),
  next: l('پروژهٔ بعدی', 'Next project'),
  prevQuote: l('نظر قبلی', 'Previous testimonial'),
  nextQuote: l('نظر بعدی', 'Next testimonial'),
  copy: l('کپی ایمیل', 'Copy email'),
  copied: l('ایمیل کپی شد!', 'Email copied!'),
  backTop: l('بازگشت به بالا', 'Back to top'),
  rights: l('تمام حقوق محفوظ است.', 'All rights reserved.'),
  madeIn: l('طراحی و توسعه با عشق در مشهد', 'Designed & built with love in Mashhad'),
  versions: l('نسخه‌های دیگر سایت', 'Other versions of this site'),
  sample: l('نمونه', 'Sample'),
  socials: l('شبکه‌های اجتماعی', 'Socials'),
  chooseSection: l('بخش‌ها', 'Sections'),
};
