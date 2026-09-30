/**
 * نمونه‌کارها. هر پروژه یک کارت در صفحه و یک صفحهٔ جزئیات (با کشیدن از پایین) دارد.
 * تصاویر در public/work هستند.
 * Projects, in both languages: l('فارسی', 'English'). Screenshots are the real (Persian) products.
 */

import { l, type L, type Localized } from '../i18n';

export type Category = 'site' | 'app' | 'panel' | 'bot';

export const categories: { id: Category | 'all'; label: L }[] = [
  { id: 'all', label: l('همه', 'All') },
  { id: 'site', label: l('سایت', 'Websites') },
  { id: 'app', label: l('اپلیکیشن', 'Apps') },
  { id: 'panel', label: l('پنل و CRM', 'Panels & CRM') },
  { id: 'bot', label: l('ربات و هوش مصنوعی', 'Bots & AI') },
];

export type FeatureIcon =
  | 'calendar'
  | 'sms'
  | 'phone'
  | 'users'
  | 'chart'
  | 'card'
  | 'pen'
  | 'shield'
  | 'video'
  | 'trophy'
  | 'excel'
  | 'kanban'
  | 'bell'
  | 'box'
  | 'layers'
  | 'code'
  | 'mic'
  | 'chat'
  | 'bolt'
  | 'sparkle'
  | 'filter'
  | 'drop'
  | 'search'
  | 'wallet';

export interface ScreenData {
  src: string;
  caption: L;
  device: 'desktop' | 'phone';
}

export interface ProjectData {
  slug: string;
  name: L;
  client: L;
  categories: Category[];
  /** Short label under the title */
  kind: L;
  /** One line on the card */
  pitch: L;
  year: L;
  logo: string;
  /** Brand color, used for tints and accents */
  color: string;
  /** Soft background tint for the card */
  tint: string;
  link?: { href: string; label: string };
  cover: { desktop?: string; phone?: string };
  summary: L;
  problem: L;
  solution: L;
  facts: { value: L; label: L }[];
  features: { icon: FeatureIcon; title: L; text: L }[];
  screens: ScreenData[];
  /** Live, interactive UI shown inside the case study instead of a screenshot */
  live?: 'telegram' | 'mili';
  /** Tool names; the few Persian ones are bilingual. */
  stack: (string | L)[];
  role: L;
}

/** A project in one language — what the components render. */
export type Project = Localized<ProjectData>;
export type Screen = Localized<ScreenData>;

const w = (name: string) => `work/${name}.jpg`;

// shared names, so every mention agrees
const ZARINPAL = l('زرین‌پال', 'Zarinpal');
const MILLIONAIRE_GROUP = l('گروه نرم‌افزاری میلیونر', 'Millionaire Software Group');

export const projects: ProjectData[] = [
  {
    slug: 'zehnesabz',
    name: l('کلینیک ذهن سبز', 'Zehne Sabz Clinic'),
    client: l('کلینیک کاردرمانی و توان‌بخشی ذهن سبز، مشهد', 'Zehne Sabz occupational therapy & rehabilitation clinic, Mashhad'),
    categories: ['site', 'app', 'panel'],
    kind: l('سایت + اپلیکیشن + پنل مدیریت', 'Website + app + admin panel'),
    pitch: l(
      'از رزرو نوبت تا پیامک یادآوری و پرونده درمان؛ همهٔ کارهای یک کلینیک، آنلاین و خودکار.',
      'From booking to SMS reminders and therapy records — everything a clinic does, online and automatic.',
    ),
    year: l('۱۴۰۵', '2026'),
    logo: 'logos/zehnesabz.png',
    color: '#0B5E2E',
    tint: '#E8F4EC',
    link: { href: 'https://zehnesabz.com', label: 'zehnesabz.com' },
    cover: { desktop: w('zehnesabz-home'), phone: w('zehnesabz-app-dashboard') },
    summary: l(
      'ذهن سبز یک کلینیک کاردرمانی در مشهد است. برایش یک سامانهٔ کامل ساختم: سایتی که مراجع جدید از گوگل پیدایش می‌کند و آنلاین نوبت می‌گیرد، اپلیکیشنی که روی گوشی نصب می‌شود، و پنل‌های جدا برای مدیر، منشی و درمانگر.',
      'Zehne Sabz is an occupational therapy clinic in Mashhad. I built it a complete system: a website where new clients find it on Google and book online, an app that installs on their phone, and separate panels for the manager, the receptionist and the therapists.',
    ),
    problem: l(
      'نوبت‌ها تلفنی و دفتری ثبت می‌شد، مراجعان جلسه را فراموش می‌کردند و پرونده‌ها، فاکتورها و ارزیابی‌های درمانی هر کدام جای جدایی بود.',
      'Appointments were taken by phone and written in a notebook, clients forgot their sessions, and records, invoices and therapy assessments were each kept somewhere different.',
    ),
    solution: l(
      'حالا نوبت آنلاین ثبت می‌شود، پیامک تأیید و یادآوری خودکار می‌رود و مراجع برنامهٔ جلسات، تمرین‌های خانگی و وضعیت مالی‌اش را در اپلیکیشن می‌بیند. درمانگر فرم‌های ارزیابی را پر می‌کند و نمودار پیشرفت خودش ساخته می‌شود.',
      'Now bookings happen online, confirmation and reminder texts go out automatically, and clients see their session schedule, home exercises and balance in the app. Therapists fill in assessment forms, and the progress chart draws itself.',
    ),
    facts: [
      { value: l('۴ پنل', '4 panels'), label: l('مدیر، منشی، درمانگر و مراجع', 'Manager, receptionist, therapist and client') },
      { value: l('۶۳', '63'), label: l('صفحه و بخش', 'Pages and sections') },
      { value: l('۲ ساعت', '2 hours'), label: l('یادآوری پیامکی قبل از هر جلسه', 'SMS reminder before every session') },
    ],
    features: [
      {
        icon: 'calendar',
        title: l('رزرو آنلاین نوبت', 'Online booking'),
        text: l('مراجع از سایت، با تقویم شمسی و بدون تماس تلفنی نوبت می‌گیرد.', 'Clients book on the website, on the Persian calendar — no phone call needed.'),
      },
      {
        icon: 'sms',
        title: l('پیامک خودکار', 'Automatic SMS'),
        text: l('تأیید نوبت برای مراجع و درمانگر و یادآوری دو ساعت قبل از جلسه.', 'Booking confirmations for client and therapist, and a reminder two hours before each session.'),
      },
      {
        icon: 'phone',
        title: l('اپلیکیشن قابل نصب', 'Installable app'),
        text: l('روی اندروید و آیفون نصب می‌شود؛ ورود فقط با کد پیامکی.', 'Installs on Android and iPhone; signing in takes just an SMS code.'),
      },
      {
        icon: 'users',
        title: l('پنل برای هر نقش', 'A panel for every role'),
        text: l('مدیر، منشی، درمانگر و مراجع هر کدام فقط چیزی را می‌بینند که لازم دارند.', 'Manager, receptionist, therapist and client each see only what they need.'),
      },
      {
        icon: 'chart',
        title: l('ارزیابی و نمودار پیشرفت', 'Assessments & progress charts'),
        text: l('فرم‌های ارزیابی امتیازدار و نمودار روند درمان برای هر مراجع.', 'Scored assessment forms and a treatment progress chart for every client.'),
      },
      {
        icon: 'card',
        title: l('پرداخت آنلاین و کیف پول', 'Online payments & wallet'),
        text: l('پرداخت با زرین‌پال، فاکتور، بدهی و گزارش صندوق روزانه.', 'Zarinpal payments, invoices, outstanding balances and a daily cash report.'),
      },
      {
        icon: 'pen',
        title: l('امضای دیجیتال', 'Digital signatures'),
        text: l('رضایت‌نامهٔ درمان روی خود گوشی امضا می‌شود.', 'Treatment consent forms are signed right on the phone.'),
      },
      {
        icon: 'shield',
        title: l('گزارش و بک‌آپ', 'Reports & backups'),
        text: l(
          'درآمد هر درمانگر، نرخ غیبت، مراجعان در خطر ریزش و بک‌آپ شبانه.',
          'Revenue per therapist, no-show rates, clients at risk of dropping out, and nightly backups.',
        ),
      },
    ],
    screens: [
      { src: w('zehnesabz-home'), caption: l('صفحهٔ اصلی سایت', 'The website’s home page'), device: 'desktop' },
      { src: w('zehnesabz-app-dashboard'), caption: l('داشبورد مراجع در اپلیکیشن', 'Client dashboard in the app'), device: 'phone' },
      { src: w('zehnesabz-app-schedule'), caption: l('برنامهٔ جلسات و وضعیت هر نوبت', 'Sessions and the status of each booking'), device: 'phone' },
      { src: w('zehnesabz-app-login'), caption: l('ورود با کد پیامکی', 'Signing in with an SMS code'), device: 'phone' },
      { src: w('zehnesabz-app-install'), caption: l('راهنمای نصب اپلیکیشن', 'How to install the app'), device: 'phone' },
      { src: w('zehnesabz-home-m'), caption: l('سایت روی موبایل', 'The website on a phone'), device: 'phone' },
    ],
    stack: ['Next.js', 'TypeScript', 'Express', 'Prisma', 'Tailwind', 'PWA', ZARINPAL, l('ملی‌پیامک', 'Melipayamak')],
    role: l('طراحی رابط کاربری، برنامه‌نویسی کامل، راه‌اندازی سرور و نسخهٔ اندروید', 'Interface design, all the programming, server setup and the Android version'),
  },
  {
    slug: 'dopingshimi',
    name: l('دوپینگ شیمی', 'Doping Shimi'),
    client: l('استاد جواد پرتویی، مدرس شیمی کنکور', 'Javad Partovi, chemistry teacher for Iran’s university entrance exam (Konkur)'),
    categories: ['site', 'app'],
    kind: l('سایت آموزشی + اپلیکیشن', 'Learning website + app'),
    pitch: l(
      'فروش ویدیوی آموزشی، آزمون آنلاین و رتبه‌بندی دانش‌آموزان برای یک مدرس کنکور.',
      'Video lessons for sale, online exams and student rankings for a chemistry exam-prep teacher.',
    ),
    year: l('۱۴۰۵', '2026'),
    logo: 'logos/doping.svg',
    color: '#7C3AED',
    tint: '#F1ECFE',
    link: { href: 'https://dopingshimi.ir', label: 'dopingshimi.ir' },
    cover: { desktop: w('doping-video'), phone: w('doping-m-video') },
    summary: l(
      'یک مدرس شیمی کنکور می‌خواست کلاس‌ها، همایش‌ها و ویدیوهایش را آنلاین بفروشد و پیشرفت دانش‌آموزانش را دنبال کند. نتیجه یک سایت پرانرژی و یک اپلیکیشن آموزشی شد.',
      'A chemistry teacher who prepares students for Iran’s university entrance exam wanted to sell his classes, seminars and videos online and keep track of how his students were doing. The result: a high-energy website and a learning app.',
    ),
    problem: l(
      'ویدیوهای پولی باید از دانلود و اشتراک‌گذاری محافظت می‌شدند، آزمون‌ها نیاز به تصحیح خودکار داشتند و دانش‌آموزان برای ادامه دادن به انگیزه نیاز داشتند.',
      'Paid videos had to be protected from downloading and sharing, exams needed marking automatically, and students needed a reason to keep going.',
    ),
    solution: l(
      'ویدیوها از ابر آروان با لینک امن و واترمارک متحرک (شمارهٔ خود دانش‌آموز) پخش می‌شوند. آزمون‌ها آنلاین برگزار و تصحیح می‌شوند و هر دانش‌آموز امتیاز، سطح و رتبه دارد؛ سطح‌ها به اسم عناصر جدول تناوبی‌اند.',
      'Videos stream from ArvanCloud through secure links, with a moving watermark showing the student’s own phone number. Exams are taken and marked online, and every student has points, a level and a rank — the levels are named after elements of the periodic table.',
    ),
    facts: [
      { value: l('H → Au', 'H → Au'), label: l('سطح‌بندی دانش‌آموزان با عناصر شیمی', 'Student levels named after chemical elements') },
      { value: l('۳۸', '38'), label: l('صفحه و بخش', 'Pages and sections') },
      { value: l('۲ روش', '2 ways'), label: l('پرداخت: زرین‌پال و کارت‌به‌کارت', 'To pay: Zarinpal or card-to-card') },
    ],
    features: [
      {
        icon: 'video',
        title: l('ویدیوی محافظت‌شده', 'Protected videos'),
        text: l(
          'لینک پخش شخصی و انقضادار، به‌همراه واترمارک متحرک با شمارهٔ دانش‌آموز.',
          'Personal playback links that expire, plus a moving watermark with the student’s number.',
        ),
      },
      {
        icon: 'bolt',
        title: l('آزمون آنلاین', 'Online exams'),
        text: l(
          'آزمون زمان‌دار با ذخیرهٔ خودکار پاسخ‌ها و تصحیح فوری با نمرهٔ منفی.',
          'Timed exams that save answers as you go and mark them instantly, negative marking included.',
        ),
      },
      {
        icon: 'excel',
        title: l('ورود نتایج از اکسل', 'Results from Excel'),
        text: l(
          'نتایج آزمون‌های بیرونی از فایل اکسل خوانده و به دانش‌آموزها وصل می‌شود.',
          'Results from outside exams are read from an Excel file and matched to each student.',
        ),
      },
      {
        icon: 'trophy',
        title: l('امتیاز، سطح و رتبه', 'Points, levels and ranks'),
        text: l(
          'داشبورد انگیزشی با امتیاز، رکورد روزانه و مقایسه با میانگین کلاس.',
          'A motivating dashboard with points, daily streaks and a comparison with the class average.',
        ),
      },
      {
        icon: 'card',
        title: l('فروش تکی و پکیج', 'Single lessons & bundles'),
        text: l(
          'دسترسی زمان‌دار یا دائمی؛ پرداخت آنلاین یا کارت‌به‌کارت با تأیید مدیر.',
          'Time-limited or lifetime access; pay online, or by card-to-card transfer approved by the admin.',
        ),
      },
      {
        icon: 'sms',
        title: l('پیامک به دانش‌آموز و والدین', 'SMS to students & parents'),
        text: l('خبر آزمون‌ها و نتیجه‌ها به خود دانش‌آموز و خانواده‌اش می‌رسد.', 'News about exams and results reaches both the student and their family.'),
      },
      {
        icon: 'sparkle',
        title: l('صفحهٔ اول سینمایی', 'A cinematic home page'),
        text: l(
          'انیمیشن مولکول‌ها و طراحی تیره و نئونی که با حال‌وهوای کنکوری‌ها جور است.',
          'Animated molecules and a dark, neon look that suits students cramming for the big exam.',
        ),
      },
      {
        icon: 'search',
        title: l('سئو و مقاله', 'SEO & articles'),
        text: l('بخش مقاله و ساختار استاندارد برای دیده شدن در گوگل.', 'An articles section and a clean structure, to get found on Google.'),
      },
    ],
    screens: [
      { src: w('doping-video'), caption: l('پنل دانش‌آموز: تماشای جلسهٔ درس', 'Student panel: watching a lesson'), device: 'desktop' },
      { src: w('doping-m-video'), caption: l('همان کلاس روی گوشی', 'The same class on a phone'), device: 'phone' },
      { src: w('doping-panel'), caption: l('داشبورد دانش‌آموز: پیشرفت، آزمون‌ها و رتبه', 'Student dashboard: progress, exams and rank'), device: 'desktop' },
      { src: w('doping-m-panel'), caption: l('پنل دانش‌آموز در اپلیکیشن', 'The student panel in the app'), device: 'phone' },
      { src: w('doping-home'), caption: l('صفحهٔ اصلی با انیمیشن مولکول‌ها', 'Home page with animated molecules'), device: 'desktop' },
      { src: w('doping-home-m'), caption: l('نسخهٔ موبایل و اپلیکیشن', 'Mobile site and app'), device: 'phone' },
    ],
    stack: ['Next.js', 'React', 'PostgreSQL', 'Prisma', 'Tailwind', 'PWA', l('ابر آروان', 'ArvanCloud'), ZARINPAL],
    role: l('طراحی، برنامه‌نویسی کامل و راه‌اندازی روی سرور', 'Design, all the programming and launch on the server'),
  },
  {
    slug: 'crm',
    name: l('CRM میلیونر', 'Millionaire CRM'),
    client: MILLIONAIRE_GROUP,
    categories: ['panel'],
    kind: l('نرم‌افزار فروش و مدیریت مشتری', 'Sales & customer management software'),
    pitch: l(
      'قیف فروش، پیگیری خودکار و فاکتور؛ مستقیم وصل به نرم‌افزار حسابداری مشتری.',
      'Sales pipeline, automatic follow-ups and invoices — wired straight into the customer’s accounting software.',
    ),
    year: l('۱۴۰۵', '2026'),
    logo: 'logos/crm.svg',
    color: '#C81E1E',
    tint: '#FDECEC',
    cover: { desktop: w('crm-pipeline'), phone: w('crm-m') },
    summary: l(
      'یک CRM فارسی برای شرکت‌هایی که از نرم‌افزار حسابداری میلیونر استفاده می‌کنند. تیم فروش همهٔ مشتری‌ها، فرصت‌ها و پیگیری‌هایش را در یک جا می‌بیند و فاکتور را بدون ورود دوباره، مستقیم در حسابداری ثبت می‌کند.',
      'A Persian-language CRM for companies that use Millionaire accounting software. The sales team sees every customer, deal and follow-up in one place, and invoices go straight into accounting — no typing them in twice.',
    ),
    problem: l(
      'فروشنده‌ها پیگیری‌ها را در دفتر و اکسل نگه می‌داشتند، مدیر تصویر روشنی از فروش نداشت و هر فاکتور یک بار دیگر در حسابداری وارد می‌شد.',
      'Salespeople kept their follow-ups in notebooks and Excel, the manager had no clear picture of sales, and every invoice had to be entered into accounting a second time.',
    ),
    solution: l(
      'یک پنل تحت وب با قیف فروش کشیدنی، یادآورهای خودکار و تقویم شمسی که به‌صورت امن به دیتابیس حسابداری هر مشتری وصل می‌شود. داده‌های هر شرکت کاملاً جداست و هر نفر فقط بخش خودش را می‌بیند.',
      'A web panel with a drag-and-drop sales pipeline, automatic reminders and a Persian calendar, securely connected to each customer’s accounting database. Every company’s data is kept completely separate, and each person sees only their own part.',
    ),
    facts: [
      { value: l('چندشرکتی', 'Multi-company'), label: l('دادهٔ هر شرکت کاملاً جدا', 'Each company’s data kept fully separate') },
      { value: l('مستقیم', 'Direct'), label: l('ثبت فاکتور در حسابداری', 'Invoices posted to accounting') },
      { value: l('۲۰', '20'), label: l('ماژول تست خودکار', 'Automated test modules') },
    ],
    features: [
      {
        icon: 'kanban',
        title: l('قیف فروش کشیدنی', 'Drag-and-drop pipeline'),
        text: l(
          'هر فرصت فروش یک کارت است؛ با کشیدن، مرحله‌اش عوض می‌شود و برای «باخت» دلیل ثبت می‌شود.',
          'Every deal is a card: drag it to change its stage, and a lost deal gets its reason recorded.',
        ),
      },
      {
        icon: 'bell',
        title: l('پیگیری و یادآور خودکار', 'Follow-ups & automatic reminders'),
        text: l('کارهای امروز، یادآورها و تقویم شمسی تا هیچ مشتری‌ای فراموش نشود.', 'Today’s tasks, reminders and a Persian calendar, so no customer is forgotten.'),
      },
      {
        icon: 'excel',
        title: l('فاکتور مستقیم در حسابداری', 'Invoices straight into accounting'),
        text: l(
          'فاکتور فروش و مرجوعی بدون ورود دوباره در نرم‌افزار حسابداری ثبت می‌شود.',
          'Sales and return invoices are recorded in the accounting software without retyping.',
        ),
      },
      {
        icon: 'box',
        title: l('موجودی و قیمت لحظه‌ای', 'Live stock & prices'),
        text: l('فروشنده موجودی انبار، قیمت و مانده حساب مشتری را همان‌جا می‌بیند.', 'Salespeople see stock, prices and the customer’s balance right where they work.'),
      },
      {
        icon: 'users',
        title: l('نقش‌ها و دسترسی‌ها', 'Roles & permissions'),
        text: l('مدیر، مدیر فروش و ویزیتور؛ هر کدام با سطح دسترسی خودش.', 'Manager, sales manager and field rep — each with their own level of access.'),
      },
      {
        icon: 'pen',
        title: l('طراح قالب فاکتور', 'Invoice template designer'),
        text: l('ظاهر فاکتور را با پیش‌نمایش زنده، مطابق برند خودتان بچینید.', 'Lay out your invoices to match your brand, with a live preview.'),
      },
      {
        icon: 'code',
        title: l('فرم جذب مشتری برای سایت', 'Lead form for your website'),
        text: l(
          'فرمی که روی سایت شما قرار می‌گیرد و مشتری جدید را مستقیم وارد CRM می‌کند.',
          'A form that sits on your website and brings new customers straight into the CRM.',
        ),
      },
      {
        icon: 'chart',
        title: l('گزارش مدیریتی', 'Management reports'),
        text: l('نرخ تبدیل، عملکرد ویزیتورها و ارزش قیف فروش در یک نگاه.', 'Conversion rates, rep performance and pipeline value at a glance.'),
      },
    ],
    screens: [
      { src: w('crm-pipeline'), caption: l('قیف فروش با کارت‌های کشیدنی', 'The sales pipeline, with drag-and-drop cards'), device: 'desktop' },
      { src: w('crm-leads'), caption: l('فهرست مشتریان بالقوه با فیلتر کامل', 'Leads list with full filters'), device: 'desktop' },
      { src: w('crm-calendar'), caption: l('تقویم شمسی پیگیری‌ها', 'Follow-ups on the Persian calendar'), device: 'desktop' },
      { src: w('crm-reports'), caption: l('گزارش مدیریتی', 'Management reports'), device: 'desktop' },
      { src: w('crm-m'), caption: l('CRM روی موبایل', 'The CRM on a phone'), device: 'phone' },
    ],
    stack: ['FastAPI', 'Python', 'SQL Server', 'SQLAlchemy', 'JavaScript', 'Tailwind', 'pytest'],
    role: l('طراحی و برنامه‌نویسی کامل، از دیتابیس تا رابط کاربری', 'All the design and programming, from the database to the interface'),
  },
  {
    slug: 'support',
    name: l('پشتیبانی میلیونر + دستیار «میلی»', 'Millionaire Support + “Mili” assistant'),
    client: MILLIONAIRE_GROUP,
    categories: ['panel', 'bot'],
    kind: l('سامانهٔ تیکت + دستیار هوش مصنوعی', 'Ticketing system + AI assistant'),
    pitch: l(
      'تیکت آنلاین با پیام صوتی و دستیار هوشمندی که قبل از ثبت تیکت، خودش جواب را پیدا می‌کند.',
      'Online tickets with voice messages, and a smart assistant that finds the answer before a ticket is even opened.',
    ),
    year: l('۱۴۰۵', '2026'),
    logo: 'logos/millionaire.svg',
    color: '#8B0000',
    tint: '#FBEDEA',
    link: { href: 'https://support.softmiliac.com', label: 'support.softmiliac.com' },
    cover: { desktop: w('support-dashboard'), phone: w('support-m') },
    summary: l(
      'مشتریان چند برند نرم‌افزاری از یک مرکز پشتیبانی کمک می‌گیرند. سامانهٔ تیکت لحظه‌ای ساختم و کنارش «میلی»، دستیار هوش مصنوعی‌ای که از روی راهنماهای رسمی جواب می‌دهد تا خیلی از سؤال‌ها اصلاً به تیکت نرسند.',
      'Customers of several software brands get help from one support centre. I built a real-time ticketing system and, alongside it, “Mili” — an AI assistant that answers from the official manuals, so many questions never need a ticket at all.',
    ),
    problem: l(
      'یک تیم پشتیبانی جواب‌گوی چند برند بود و بیشتر پاسخ‌ها لای راهنماهای PDF طولانی و پر از اسکرین‌شات گم شده بود.',
      'One support team was answering for several brands, and most answers were buried in long PDF manuals full of screenshots.',
    ),
    solution: l(
      'تیکت‌ها به‌صورت خودکار به کم‌کارترین کارشناس می‌رسند، گفت‌وگو زنده است و مشتری می‌تواند پیام صوتی بفرستد. میلی قبل از ثبت تیکت جواب را از راهنماها پیدا می‌کند؛ حتی از داخل تصاویر.',
      'Tickets automatically go to the least busy agent, conversations are live, and customers can send voice messages. Before a ticket is opened, Mili looks for the answer in the manuals — even inside the images.',
    ),
    facts: [
      { value: l('۱۱۷ صفحه', '117 pages'), label: l('راهنمای PDF که میلی می‌خواند', 'Of PDF manuals that Mili reads') },
      { value: l('۵۹ صفحه', '59 pages'), label: l('که جوابشان فقط داخل تصویر است', 'Where the answer is only inside an image') },
      { value: l('زنده', 'Live'), label: l('تایپ و «خوانده شد» لحظه‌ای', 'Real-time typing and read receipts') },
    ],
    features: [
      {
        icon: 'sparkle',
        title: l('دستیار هوشمند میلی', 'Mili, the smart assistant'),
        text: l(
          'از روی راهنماهای رسمی جواب می‌دهد و متن داخل اسکرین‌شات‌ها را هم می‌خواند.',
          'Answers from the official manuals, and reads the text inside screenshots too.',
        ),
      },
      {
        icon: 'mic',
        title: l('پیام صوتی', 'Voice messages'),
        text: l(
          'مشتری مشکلش را همان‌جا ضبط می‌کند؛ عکس، فایل و ویدیو هم پیوست می‌شود.',
          'Customers record their problem right there; photos, files and videos can be attached too.',
        ),
      },
      {
        icon: 'chat',
        title: l('گفت‌وگوی زنده', 'Live chat'),
        text: l('نمایش «در حال تایپ» و «خوانده شد»، درست مثل پیام‌رسان‌ها.', '“Typing…” and “Read” indicators, just like a messaging app.'),
      },
      {
        icon: 'users',
        title: l('تخصیص خودکار', 'Automatic assignment'),
        text: l('هر تیکت به کارشناسی می‌رسد که کمترین کار را دارد.', 'Each ticket goes to the agent with the lightest workload.'),
      },
      {
        icon: 'bell',
        title: l('SLA بر اساس ساعت کاری', 'SLAs that follow business hours'),
        text: l('زمان پاسخ فقط در ساعت کاری شمرده می‌شود و تأخیرها مشخص است.', 'Response time only counts during working hours, and delays are clearly flagged.'),
      },
      {
        icon: 'chart',
        title: l('گزارش و رضایت مشتری', 'Reports & customer satisfaction'),
        text: l(
          'زمان اولین پاسخ، زمان حل مشکل، امتیاز رضایت و عملکرد هر کارشناس.',
          'Time to first reply, time to resolve, satisfaction scores and each agent’s performance.',
        ),
      },
      {
        icon: 'layers',
        title: l('چند شرکت، یک سامانه', 'Many companies, one system'),
        text: l('هر برند با لوگو، بخش‌ها و ساعت کاری خودش.', 'Each brand with its own logo, departments and working hours.'),
      },
      {
        icon: 'sms',
        title: l('ورود با کد', 'Sign in with a code'),
        text: l('ورود با کد پیامکی یا ایمیل، بدون نیاز به رمز عبور.', 'Sign in with a code by SMS or email — no password needed.'),
      },
    ],
    screens: [
      { src: w('support-dashboard'), caption: l('داشبورد کارشناس پشتیبانی', 'The support agent’s dashboard'), device: 'desktop' },
      { src: w('support-thread'), caption: l('گفت‌وگوی تیکت با پیام صوتی', 'A ticket conversation with a voice message'), device: 'desktop' },
      { src: w('support-new'), caption: l('ثبت تیکت جدید', 'Opening a new ticket'), device: 'desktop' },
      { src: w('support-reports'), caption: l('گزارش‌ها و آمار', 'Reports and statistics'), device: 'desktop' },
      { src: w('support-m'), caption: l('تیکت روی موبایل', 'A ticket on a phone'), device: 'phone' },
    ],
    live: 'mili',
    stack: ['React', 'Node.js', 'Socket.IO', 'SQLite', 'FastAPI', 'RAG', l('مدل بینایی', 'Vision LLM')],
    role: l('طراحی و برنامه‌نویسی کامل سامانهٔ تیکت و دستیار هوش مصنوعی', 'All the design and programming of the ticketing system and the AI assistant'),
  },
  {
    slug: 'forwardbot',
    name: l('فورواردبات', 'ForwardBot'),
    client: l('محصول نرم‌افزاری روی تلگرام', 'A software product on Telegram'),
    categories: ['bot'],
    kind: l('ربات تلگرام + پنل وب', 'Telegram bot + web panel'),
    pitch: l(
      'رباتی که پست‌ها را لحظه‌ای بین کانال‌ها منتقل می‌کند؛ با فیلتر تبلیغات، واترمارک و هوش مصنوعی.',
      'A bot that moves posts between channels in real time — with ad filtering, watermarks and AI.',
    ),
    year: l('۱۴۰۵', '2026'),
    logo: 'logos/forwardbot.png',
    color: '#2563EB',
    tint: '#EAF1FE',
    link: { href: 'https://forwardbot.softmiliac.com', label: 'forwardbot.softmiliac.com' },
    cover: { desktop: w('forwardbot-home') },
    summary: l(
      'فورواردبات یک ربات اشتراکی تلگرام است که مدیریت کانال را خودکار می‌کند: پست‌ها را لحظه‌ای منتقل می‌کند، تبلیغات را فیلتر می‌کند، واترمارک می‌زند و در صورت نیاز متن را با هوش مصنوعی خلاصه، بازنویسی یا ترجمه می‌کند.',
      'ForwardBot is a subscription Telegram bot that puts channel management on autopilot: it moves posts in real time, filters out ads, adds watermarks and, when needed, summarises, rewrites or translates the text with AI.',
    ),
    problem: l(
      'پردازش هوشمند تک‌تک پست‌ها برای هر مشترک باید سریع و ارزان می‌بود؛ اگر هر پست به مدل هوش مصنوعی می‌رفت، هزینه از خود اشتراک بیشتر می‌شد.',
      'Smart processing of every single post, for every subscriber, had to be fast and cheap — if every post went to an AI model, it would cost more than the subscription itself.',
    ),
    solution: l(
      'یک فیلتر دومرحله‌ای ساختم: اول امتیازدهی سریع با کلمات کلیدی و بعد فقط پست‌های مشکوک به هوش مصنوعی می‌رسند. همهٔ امکانات با دکمه‌های فارسی و ساده در خود تلگرام در دسترس است و فروش اشتراک، کیف پول و دعوت دوستان هم داخل ربات انجام می‌شود.',
      'I built a two-step filter: a quick keyword score first, and only suspicious posts are sent on to the AI. Everything works through simple Persian buttons right inside Telegram, and subscriptions, the wallet and inviting friends all happen inside the bot too.',
    ),
    facts: [
      { value: l('۸ دکمه', '8 buttons'), label: l('منوی اصلی ساده و فارسی', 'In a simple Persian main menu') },
      { value: l('۵ لحن', '5 tones'), label: l('بازنویسی متن با هوش مصنوعی', 'For rewriting text with AI') },
      { value: l('۳ روش', '3 ways'), label: l('پرداخت داخل ربات', 'To pay inside the bot') },
    ],
    features: [
      {
        icon: 'bolt',
        title: l('انتقال لحظه‌ای', 'Real-time copying'),
        text: l('متن، عکس، آلبوم، ویدیو و فایل؛ چند ثانیه بعد از انتشار در مبدا.', 'Text, photos, albums, videos and files — seconds after they’re posted at the source.'),
      },
      {
        icon: 'layers',
        title: l('چند کانال همزمان', 'Many channels at once'),
        text: l('انتشار در چند کانال، هرکدام با امضای اختصاصی خودش.', 'Publish to several channels, each with its own signature.'),
      },
      {
        icon: 'filter',
        title: l('فیلتر هوشمند تبلیغات', 'Smart ad filter'),
        text: l('سه سطح حساسیت و دکمهٔ «تست تنظیمات» قبل از فعال‌سازی.', 'Three sensitivity levels, and a “Test settings” button before you switch it on.'),
      },
      {
        icon: 'drop',
        title: l('واترمارک', 'Watermarks'),
        text: l('متن، ایموجی یا لوگو روی تصاویر؛ با پیش‌نمایش شش حالت آماده.', 'Text, emoji or a logo on images, with a preview of six ready-made styles.'),
      },
      {
        icon: 'sparkle',
        title: l('هوش مصنوعی', 'AI tools'),
        text: l('خلاصه، بازنویسی با ۵ لحن و ترجمه به ۵ زبان، با سیستم اعتبار.', 'Summaries, rewriting in 5 tones and translation into 5 languages, paid with credits.'),
      },
      {
        icon: 'wallet',
        title: l('فروش داخل ربات', 'Sales inside the bot'),
        text: l('اشتراک، کیف پول، دعوت دوستان، کد تخفیف و سه روش پرداخت.', 'Subscriptions, a wallet, invite-a-friend, discount codes and three ways to pay.'),
      },
      {
        icon: 'chat',
        title: l('پشتیبانی در ربات', 'Support in the bot'),
        text: l('کاربر مشکلش را همان‌جا تیکت می‌کند و جواب می‌گیرد.', 'Users open a ticket right there and get their answer.'),
      },
      {
        icon: 'chart',
        title: l('پنل مدیریت وب', 'Web admin panel'),
        text: l('طرح‌ها، کاربران و پرداخت‌ها از یک پنل تحت وب مدیریت می‌شوند.', 'Plans, users and payments are all managed from one web panel.'),
      },
    ],
    screens: [
      { src: w('forwardbot-home'), caption: l('سایت معرفی ربات', 'The bot’s website'), device: 'desktop' },
      { src: w('forwardbot-m'), caption: l('سایت روی موبایل', 'The website on a phone'), device: 'phone' },
    ],
    live: 'telegram',
    stack: ['Python', 'aiogram', 'Telethon', 'SQLAlchemy', l('هوش مصنوعی', 'AI'), ZARINPAL, 'Docker'],
    role: l('طراحی تجربهٔ کاربری ربات، برنامه‌نویسی کامل، سایت و پنل مدیریت', 'The bot’s user experience, all the programming, the website and the admin panel'),
  },
  {
    slug: 'superapp',
    name: l('سوپراپ میلیونر', 'Millionaire Super App'),
    client: l('هلدینگ نرم‌افزاری میلیونر', 'Millionaire Software Holding'),
    categories: ['site', 'app'],
    kind: l('پورتال + اپلیکیشن قابل نصب', 'Portal + installable app'),
    pitch: l(
      'یک اپلیکیشن برای پنج محصول یک هلدینگ؛ جست‌وجو، پشتیبانی و تعرفه‌ها در یک جا.',
      'One app for a holding company’s five products — search, support and pricing, all in one place.',
    ),
    year: l('۱۴۰۵', '2026'),
    logo: 'logos/millionaire.svg',
    color: '#980000',
    tint: '#F7EEEE',
    link: { href: 'https://app.softmiliac.com', label: 'app.softmiliac.com' },
    cover: { desktop: w('superapp-home'), phone: w('superapp-m') },
    summary: l(
      'هلدینگ میلیونر پنج محصول با سایت‌ها و دامنه‌های جدا داشت. یک پورتال قابل نصب ساختم که مشتری از همان‌جا به پنل، پشتیبانی و تعرفهٔ هر محصول برسد.',
      'Millionaire Holding had five products, each with its own website and domain. I built an installable portal where customers reach every product’s panel, support and pricing from one place.',
    ),
    problem: l(
      'مشتری برای رسیدن به پنل یا پشتیبانی هر محصول باید بین چند سایت مختلف می‌گشت.',
      'To reach a product’s panel or support, customers had to hunt around several different websites.',
    ),
    solution: l(
      'یک لانچر ساده با جست‌وجوی سریع، صفحهٔ اختصاصی هر محصول و پنل مدیریت محتوا تا تیم خودش تعرفه‌ها و بنرهای تبلیغاتی را بدون برنامه‌نویس عوض کند.',
      'A simple launcher with quick search, a page for each product, and a content panel so the team can change pricing and promo banners themselves, without a developer.',
    ),
    facts: [
      { value: l('۵ محصول', '5 products'), label: l('در یک اپلیکیشن', 'In one app') },
      { value: l('PWA', 'PWA'), label: l('نصب روی گوشی و کامپیوتر', 'Installs on phones and computers') },
      { value: l('CMS', 'CMS'), label: l('مدیریت محتوا بدون برنامه‌نویس', 'Content editing without a developer') },
    ],
    features: [
      {
        icon: 'search',
        title: l('لانچر جست‌وجومحور', 'Search-first launcher'),
        text: l('مشتری اسم محصول یا کارش را تایپ می‌کند و مستقیم می‌رسد.', 'Customers type a product name or what they need, and land right there.'),
      },
      {
        icon: 'phone',
        title: l('نصب مثل اپلیکیشن', 'Installs like an app'),
        text: l('روی گوشی و کامپیوتر نصب می‌شود؛ با حالت روشن و تیره.', 'Installs on phones and computers, with light and dark modes.'),
      },
      {
        icon: 'chat',
        title: l('درخواست مشاوره', 'Consultation requests'),
        text: l(
          'فرم مشاوره با پنل پیگیری، جست‌وجو و خروجی اکسل برای تیم فروش.',
          'A consultation form with a follow-up panel, search and Excel export for the sales team.',
        ),
      },
      {
        icon: 'pen',
        title: l('مدیریت محتوا', 'Content management'),
        text: l(
          'تعرفه‌ها و بنرهای زمان‌دار با پیش‌نمایش زنده، بدون نیاز به برنامه‌نویس.',
          'Pricing and scheduled banners with a live preview, no developer needed.',
        ),
      },
      {
        icon: 'chart',
        title: l('آمار بازدید', 'Visit stats'),
        text: l('نمودار ۳۰ روزه و گزارش ورودها.', 'A 30-day chart and a log of sign-ins.'),
      },
      {
        icon: 'shield',
        title: l('امن و سبک', 'Secure and light'),
        text: l('ورود مدیر محدودشده و راه‌اندازی با Docker.', 'Locked-down admin sign-in, deployed with Docker.'),
      },
    ],
    screens: [
      { src: w('superapp-home'), caption: l('صفحهٔ اصلی پورتال', 'The portal’s home page'), device: 'desktop' },
      { src: w('superapp-m'), caption: l('نسخهٔ موبایل', 'Mobile version'), device: 'phone' },
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'SQLite', 'Docker'],
    role: l('طراحی و برنامه‌نویسی کامل، پنل مدیریت و راه‌اندازی', 'All the design and programming, the admin panel and deployment'),
  },
];
