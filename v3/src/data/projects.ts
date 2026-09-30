/**
 * نمونه‌کارها. هر پروژه یک کارت در صفحه و یک صفحهٔ کامل «داستان پروژه» دارد.
 * تصاویر در public/work هستند (اسکرین‌شات‌های واقعی محصولات فارسی، در هر دو زبان همان‌ها).
 *
 * The projects, in both languages: l(persian, english). Screenshots are the real
 * (Persian) products and are shared by both pages.
 */
import { bilingual, l, useLang, type Src } from '../i18n';

export type Category = 'site' | 'app' | 'panel' | 'bot';

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

export interface Screen {
  src: string;
  caption: string;
  device: 'desktop' | 'phone';
}

export interface Project {
  slug: string;
  name: string;
  client: string;
  categories: Category[];
  /** Short label under the title */
  kind: string;
  /** One line on the card */
  pitch: string;
  year: string;
  logo: string;
  /** Brand color, used for tints and accents */
  color: string;
  /** Soft background tint for the card */
  tint: string;
  link?: { href: string; label: string };
  cover: { desktop?: string; phone?: string };
  summary: string;
  problem: string;
  solution: string;
  facts: { value: string; label: string }[];
  features: { icon: FeatureIcon; title: string; text: string }[];
  screens: Screen[];
  /** Live, interactive UI shown inside the case study instead of a screenshot */
  live?: 'telegram' | 'mili';
  stack: string[];
  role: string;
}

const w = (name: string) => `work/${name}.jpg`;

const categorySrc: Src<{ id: Category | 'all'; label: string }[]> = [
  { id: 'all', label: l('همه', 'All') },
  { id: 'site', label: l('سایت', 'Websites') },
  { id: 'app', label: l('اپلیکیشن', 'Apps') },
  { id: 'panel', label: l('پنل و CRM', 'Panels & CRM') },
  { id: 'bot', label: l('ربات و هوش مصنوعی', 'Bots & AI') },
];

const year = l('۱۴۰۵', '2026');
const zarinpal = l('زرین‌پال', 'Zarinpal');

const projectSrc: Src<Project>[] = [
  {
    slug: 'zehnesabz',
    name: l('کلینیک ذهن سبز', 'Zehne Sabz Clinic'),
    client: l('کلینیک کاردرمانی و توان‌بخشی ذهن سبز، مشهد', 'Zehne Sabz occupational therapy & rehabilitation clinic, Mashhad'),
    categories: ['site', 'app', 'panel'],
    kind: l('سایت + اپلیکیشن + پنل مدیریت', 'Website + app + admin panels'),
    pitch: l(
      'از رزرو نوبت تا پیامک یادآوری و پرونده درمان؛ همهٔ کارهای یک کلینیک، آنلاین و خودکار.',
      'From booking and SMS reminders to treatment records — everything a clinic does, online and automated.',
    ),
    year,
    logo: 'logos/zehnesabz.png',
    color: '#0B5E2E',
    tint: '#E8F4EC',
    link: { href: 'https://zehnesabz.com', label: 'zehnesabz.com' },
    cover: { desktop: w('zehnesabz-home'), phone: w('zehnesabz-app-dashboard') },
    summary: l(
      'ذهن سبز یک کلینیک کاردرمانی در مشهد است. برایش یک سامانهٔ کامل ساختم: سایتی که مراجع جدید از گوگل پیدایش می‌کند و آنلاین نوبت می‌گیرد، اپلیکیشنی که روی گوشی نصب می‌شود، و پنل‌های جدا برای مدیر، منشی و درمانگر.',
      'Zehne Sabz is an occupational-therapy clinic in Mashhad. I built it a complete system: a website where new patients find the clinic on Google and book online, an app that installs on their phone, and separate panels for the manager, the secretary and the therapists.',
    ),
    problem: l(
      'نوبت‌ها تلفنی و دفتری ثبت می‌شد، مراجعان جلسه را فراموش می‌کردند و پرونده‌ها، فاکتورها و ارزیابی‌های درمانی هر کدام جای جدایی بود.',
      'Appointments were taken over the phone and written in a paper diary, patients forgot their sessions, and records, invoices and clinical assessments each lived in a different place.',
    ),
    solution: l(
      'حالا نوبت آنلاین ثبت می‌شود، پیامک تأیید و یادآوری خودکار می‌رود و مراجع برنامهٔ جلسات، تمرین‌های خانگی و وضعیت مالی‌اش را در اپلیکیشن می‌بیند. درمانگر فرم‌های ارزیابی را پر می‌کند و نمودار پیشرفت خودش ساخته می‌شود.',
      'Now bookings happen online, confirmation and reminder texts go out automatically, and patients see their session schedule, home exercises and balance in the app. Therapists fill in assessment forms, and the progress chart builds itself.',
    ),
    facts: [
      { value: l('۴ پنل', '4 panels'), label: l('مدیر، منشی، درمانگر و مراجع', 'Manager, secretary, therapist and patient') },
      { value: l('۶۳', '63'), label: l('صفحه و بخش', 'Pages and sections') },
      { value: l('۲ ساعت', '2 hours'), label: l('یادآوری پیامکی قبل از هر جلسه', 'SMS reminder before every session') },
    ],
    features: [
      { icon: 'calendar', title: l('رزرو آنلاین نوبت', 'Online booking'), text: l('مراجع از سایت، با تقویم شمسی و بدون تماس تلفنی نوبت می‌گیرد.', 'Patients book on the website with the Persian calendar — no phone call needed.') },
      { icon: 'sms', title: l('پیامک خودکار', 'Automatic SMS'), text: l('تأیید نوبت برای مراجع و درمانگر و یادآوری دو ساعت قبل از جلسه.', 'Booking confirmations for patient and therapist, and a reminder two hours before each session.') },
      { icon: 'phone', title: l('اپلیکیشن قابل نصب', 'An installable app'), text: l('روی اندروید و آیفون نصب می‌شود؛ ورود فقط با کد پیامکی.', 'Installs on Android and iPhone; sign-in takes nothing but an SMS code.') },
      { icon: 'users', title: l('پنل برای هر نقش', 'A panel for every role'), text: l('مدیر، منشی، درمانگر و مراجع هر کدام فقط چیزی را می‌بینند که لازم دارند.', 'Manager, secretary, therapist and patient each see only what they need.') },
      { icon: 'chart', title: l('ارزیابی و نمودار پیشرفت', 'Assessments & progress charts'), text: l('فرم‌های ارزیابی امتیازدار و نمودار روند درمان برای هر مراجع.', 'Scored assessment forms and a treatment-progress chart for every patient.') },
      { icon: 'card', title: l('پرداخت آنلاین و کیف پول', 'Online payments & wallet'), text: l('پرداخت با زرین‌پال، فاکتور، بدهی و گزارش صندوق روزانه.', 'Payments through Zarinpal, invoices, outstanding balances and a daily cash report.') },
      { icon: 'pen', title: l('امضای دیجیتال', 'Digital signatures'), text: l('رضایت‌نامهٔ درمان روی خود گوشی امضا می‌شود.', 'Treatment consent forms are signed right on the phone.') },
      { icon: 'shield', title: l('گزارش و بک‌آپ', 'Reports & backups'), text: l('درآمد هر درمانگر، نرخ غیبت، مراجعان در خطر ریزش و بک‌آپ شبانه.', 'Revenue per therapist, no-show rates, patients at risk of dropping out, and nightly backups.') },
    ],
    screens: [
      { src: w('zehnesabz-home'), caption: l('صفحهٔ اصلی سایت', 'The website’s home page'), device: 'desktop' },
      { src: w('zehnesabz-app-dashboard'), caption: l('داشبورد مراجع در اپلیکیشن', 'The patient dashboard in the app'), device: 'phone' },
      { src: w('zehnesabz-app-schedule'), caption: l('برنامهٔ جلسات و وضعیت هر نوبت', 'Session schedule and the status of each booking'), device: 'phone' },
      { src: w('zehnesabz-app-login'), caption: l('ورود با کد پیامکی', 'Sign-in with an SMS code'), device: 'phone' },
      { src: w('zehnesabz-app-install'), caption: l('راهنمای نصب اپلیکیشن', 'The app’s install guide'), device: 'phone' },
      { src: w('zehnesabz-home-m'), caption: l('سایت روی موبایل', 'The website on a phone'), device: 'phone' },
    ],
    stack: ['Next.js', 'TypeScript', 'Express', 'Prisma', 'Tailwind', 'PWA', zarinpal, l('ملی‌پیامک', 'Melipayamak SMS')],
    role: l('طراحی رابط کاربری، برنامه‌نویسی کامل، راه‌اندازی سرور و نسخهٔ اندروید', 'UI design, full development, server setup and the Android version'),
  },
  {
    slug: 'dongi',
    name: l('دنگی', 'Dongi'),
    client: l('محصول نرم‌افزاری برای اکیپ‌ها و خانواده‌ها', 'A software product for friend groups and families'),
    categories: ['app', 'site'],
    kind: l('اپلیکیشن تقسیم هزینه‌های گروهی', 'Group expense-splitting app'),
    pitch: l(
      'کی به کی چقدر بدهکاره؟ دنگی حساب اکیپ را با کمترین جابه‌جایی پول صاف می‌کند؛ با شمارهٔ کارت و یادآوری.',
      'Who owes whom, and how much? Dongi settles the group’s tab with the fewest possible transfers — card numbers and reminders included.',
    ),
    year,
    logo: 'logos/dongi.png',
    color: '#15756A',
    tint: '#E4F3F0',
    link: { href: 'https://dongi.softmiliac.com', label: 'dongi.softmiliac.com' },
    cover: { desktop: w('dongi-home'), phone: w('dongi-m-balances') },
    summary: l(
      'دنگی یک اپلیکیشن فارسی برای حساب‌وکتاب هزینه‌های مشترک است: سفر، خانهٔ دانشجویی، دورهمی یا خانواده. هرکس خرجی می‌کند ثبت می‌کند و دنگی می‌گوید دقیقاً چه کسی، چقدر و به چه کسی بدهد.',
      'Dongi is a Persian app for keeping track of shared expenses: trips, student houses, get-togethers or the family budget. Whoever pays logs it, and Dongi tells you exactly who should pay how much, and to whom.',
    ),
    problem: l(
      'حساب اکیپ همیشه روی کاغذ یا در گروه تلگرام گم می‌شد؛ یکی کل پول را داده، یکی نصفش را و آخر سفر هیچ‌کس نمی‌دانست کی به کی بدهکار است. واریزهای ضربدری هم کار را بدتر می‌کرد.',
      'The group’s accounts always got lost on paper or in a Telegram chat. One person paid for everything, another paid half, and by the end of the trip nobody knew who owed whom. Criss-crossing transfers only made it worse.',
    ),
    solution: l(
      'یک الگوریتم تسویه ساختم که به‌جای شش واریز، دو واریز پیشنهاد می‌دهد و با دادهٔ یکسان همیشه همان جواب را می‌دهد. کنار هر بدهی شمارهٔ کارت طلبکار با دکمهٔ کپی هست، یادآوری پیامکی دوستانه می‌رود و گزارش آمادهٔ تلگرام یا فاکتور PDF با یک لمس ساخته می‌شود.',
      'I built a settlement algorithm that suggests two transfers instead of six, and always gives the same answer for the same data. Next to every debt sits the creditor’s card number with a copy button; friendly SMS reminders go out, and a Telegram-ready summary or a PDF invoice is one tap away.',
    ),
    facts: [
      { value: l('۲ به‌جای ۶', '2 instead of 6'), label: l('واریز، با الگوریتم کمترین جابه‌جایی', 'Transfers, thanks to a fewest-transfers algorithm') },
      { value: l('۴ روش', '4 ways'), label: l('تقسیم: مساوی، دلخواه، وزنی، آیتمی', 'To split: equal, custom, weighted, by item') },
      { value: 'PWA', label: l('نصب روی گوشی، با حالت شب', 'Installs on phones, with a dark mode') },
    ],
    features: [
      { icon: 'wallet', title: l('کمترین جابه‌جایی پول', 'The fewest possible transfers'), text: l('به‌جای واریزهای ضربدری، کوتاه‌ترین مسیر تسویه؛ نتیجه با دادهٔ یکسان همیشه ثابت است.', 'Instead of criss-crossing payments, the shortest route to settle up — and the same data always gives the same result.') },
      { icon: 'users', title: l('اکیپ، تیم و مهمان', 'Groups, teams and guests'), text: l('چند گروه با یک حساب، تیم خانوادگی با نمایندهٔ حساب، و مهمانی که حساب کاربری ندارد.', 'Several groups on one account, family teams with one person settling for all, and guests who don’t even need an account.') },
      { icon: 'layers', title: l('چهار مدل تقسیم', 'Four ways to split'), text: l('مساوی، دلخواه، وزنی و آیتمی؛ مالیات و سرویس فاکتور به نسبت سهم پخش می‌شود.', 'Equal, custom, weighted and by item; tax and service charges are shared out in proportion.') },
      { icon: 'card', title: l('کارت‌به‌کارت آسان', 'Easy card-to-card payments'), text: l('شمارهٔ کارت طلبکار کنار هر بدهی، با کپی مبلغ و ثبت رسید واریز.', 'The creditor’s card number next to every debt, with one-tap amount copying and payment receipts.') },
      { icon: 'sms', title: l('یادآوری پیامکی', 'SMS reminders'), text: l('یادآوری مودبانه به بدهکار، بدون اینکه رفاقت خراب شود؛ با چند سرویس پیامک ایرانی.', 'A polite nudge to whoever owes money, without spoiling the friendship; works with several Iranian SMS services.') },
      { icon: 'chart', title: l('نمودار و کارنامه', 'Charts and report cards'), text: l('سهم هر دسته از خرج‌ها، روند ماهانه و کارنامهٔ هر نفر.', 'Each spending category’s share, the monthly trend and a report card for every member.') },
      { icon: 'excel', title: l('گزارش، PDF و اکسل', 'Reports, PDF and Excel'), text: l('متن آمادهٔ تلگرام، عکس خلاصه، فاکتور PDF و خروجی اکسل فارسی.', 'A Telegram-ready summary, a snapshot image, a PDF invoice and a Persian Excel export.') },
      { icon: 'calendar', title: l('تقویم شمسی و میلادی', 'Persian and Gregorian calendars'), text: l('هر تاریخ به هر دو صورت نمایش داده می‌شود؛ هزینه‌های تکرارشونده با یک دکمه.', 'Every date is shown both ways; recurring expenses take a single button.') },
    ],
    screens: [
      { src: w('dongi-home'), caption: l('صفحهٔ معرفی دنگی', 'Dongi’s landing page'), device: 'desktop' },
      { src: w('dongi-m-balances'), caption: l('طلب و بدهی هر نفر', 'What each person is owed or owes'), device: 'phone' },
      { src: w('dongi-m-settle'), caption: l('صندوق مشترک و پرداخت‌ها', 'The shared fund and payments'), device: 'phone' },
      { src: w('dongi-m-expenses'), caption: l('فهرست هزینه‌ها با جست‌وجو و فیلتر', 'Expense list with search and filters'), device: 'phone' },
      { src: w('dongi-m-add'), caption: l('ثبت هزینه با تقویم شمسی', 'Adding an expense with the Persian calendar'), device: 'phone' },
      { src: w('dongi-m-charts'), caption: l('نمودار خرج‌ها و آمار اکیپ', 'Spending charts and group stats'), device: 'phone' },
      { src: w('dongi-home-m'), caption: l('صفحهٔ معرفی روی موبایل', 'The landing page on a phone'), device: 'phone' },
    ],
    stack: ['PHP', 'SQLite / MySQL', 'JavaScript', 'PWA', 'Web Push', l('پیامک ایرانی', 'Iranian SMS gateways'), 'PDF'],
    role: l('ایده، طراحی تجربهٔ کاربری، برنامه‌نویسی کامل و صفحهٔ معرفی', 'Idea, UX design, full development and the landing page'),
  },
  {
    slug: 'dopingshimi',
    name: l('دوپینگ شیمی', 'Doping Shimi'),
    client: l('استاد جواد پرتویی، مدرس شیمی کنکور', 'Javad Partovi, chemistry teacher for Iran’s university entrance exam (konkur)'),
    categories: ['site', 'app'],
    kind: l('سایت آموزشی + اپلیکیشن', 'Chemistry exam-prep site + app'),
    pitch: l(
      'فروش ویدیوی آموزشی، آزمون آنلاین و رتبه‌بندی دانش‌آموزان برای یک مدرس کنکور.',
      'Video lessons for sale, online exams and a student leaderboard for an entrance-exam chemistry teacher.',
    ),
    year,
    logo: 'logos/doping.svg',
    color: '#7C3AED',
    tint: '#F1ECFE',
    link: { href: 'https://dopingshimi.ir', label: 'dopingshimi.ir' },
    cover: { desktop: w('doping-video'), phone: w('doping-m-video') },
    summary: l(
      'یک مدرس شیمی کنکور می‌خواست کلاس‌ها، همایش‌ها و ویدیوهایش را آنلاین بفروشد و پیشرفت دانش‌آموزانش را دنبال کند. نتیجه یک سایت پرانرژی و یک اپلیکیشن آموزشی شد.',
      'A konkur chemistry teacher wanted to sell his classes, seminars and videos online and keep track of his students’ progress. The result: a high-energy website and a learning app.',
    ),
    problem: l(
      'ویدیوهای پولی باید از دانلود و اشتراک‌گذاری محافظت می‌شدند، آزمون‌ها نیاز به تصحیح خودکار داشتند و دانش‌آموزان برای ادامه دادن به انگیزه نیاز داشتند.',
      'Paid videos had to be protected from downloading and sharing, exams needed automatic marking, and students needed a reason to keep going.',
    ),
    solution: l(
      'ویدیوها از ابر آروان با لینک امن و واترمارک متحرک (شمارهٔ خود دانش‌آموز) پخش می‌شوند. آزمون‌ها آنلاین برگزار و تصحیح می‌شوند و هر دانش‌آموز امتیاز، سطح و رتبه دارد؛ سطح‌ها به اسم عناصر جدول تناوبی‌اند.',
      'Videos stream from ArvanCloud through secure links with a moving watermark (the student’s own phone number). Exams are taken and marked online, and every student has points, a level and a rank — the levels are named after elements of the periodic table.',
    ),
    facts: [
      { value: 'H → Au', label: l('سطح‌بندی دانش‌آموزان با عناصر شیمی', 'Student levels named after chemical elements') },
      { value: l('۳۸', '38'), label: l('صفحه و بخش', 'Pages and sections') },
      { value: l('۲ روش', '2 ways'), label: l('پرداخت: زرین‌پال و کارت‌به‌کارت', 'To pay: Zarinpal and card-to-card') },
    ],
    features: [
      { icon: 'video', title: l('ویدیوی محافظت‌شده', 'Protected video'), text: l('لینک پخش شخصی و انقضادار، به‌همراه واترمارک متحرک با شمارهٔ دانش‌آموز.', 'Personal, expiring playback links, plus a moving watermark with the student’s number.') },
      { icon: 'bolt', title: l('آزمون آنلاین', 'Online exams'), text: l('آزمون زمان‌دار با ذخیرهٔ خودکار پاسخ‌ها و تصحیح فوری با نمرهٔ منفی.', 'Timed exams with auto-saved answers and instant marking, negative marking included.') },
      { icon: 'excel', title: l('ورود نتایج از اکسل', 'Results imported from Excel'), text: l('نتایج آزمون‌های بیرونی از فایل اکسل خوانده و به دانش‌آموزها وصل می‌شود.', 'Results from outside exams are read from an Excel file and matched to each student.') },
      { icon: 'trophy', title: l('امتیاز، سطح و رتبه', 'Points, levels and ranks'), text: l('داشبورد انگیزشی با امتیاز، رکورد روزانه و مقایسه با میانگین کلاس.', 'A motivating dashboard with points, daily streaks and a comparison with the class average.') },
      { icon: 'card', title: l('فروش تکی و پکیج', 'Single lessons and bundles'), text: l('دسترسی زمان‌دار یا دائمی؛ پرداخت آنلاین یا کارت‌به‌کارت با تأیید مدیر.', 'Time-limited or lifetime access; pay online, or by card transfer approved by the admin.') },
      { icon: 'sms', title: l('پیامک به دانش‌آموز و والدین', 'SMS to students and parents'), text: l('خبر آزمون‌ها و نتیجه‌ها به خود دانش‌آموز و خانواده‌اش می‌رسد.', 'News of exams and results reaches both the student and their family.') },
      { icon: 'sparkle', title: l('صفحهٔ اول سینمایی', 'A cinematic home page'), text: l('انیمیشن مولکول‌ها و طراحی تیره و نئونی که با حال‌وهوای کنکوری‌ها جور است.', 'Animated molecules and a dark, neon look that suits the exam-prep crowd.') },
      { icon: 'search', title: l('سئو و مقاله', 'SEO and articles'), text: l('بخش مقاله و ساختار استاندارد برای دیده شدن در گوگل.', 'An articles section and a standards-based structure, so it gets found on Google.') },
    ],
    screens: [
      { src: w('doping-video'), caption: l('پنل دانش‌آموز: تماشای جلسهٔ درس', 'Student panel: watching a lesson'), device: 'desktop' },
      { src: w('doping-m-video'), caption: l('همان کلاس روی گوشی', 'The same class on a phone'), device: 'phone' },
      { src: w('doping-panel'), caption: l('داشبورد دانش‌آموز: پیشرفت، آزمون‌ها و رتبه', 'Student dashboard: progress, exams and rank'), device: 'desktop' },
      { src: w('doping-m-panel'), caption: l('پنل دانش‌آموز در اپلیکیشن', 'The student panel in the app'), device: 'phone' },
      { src: w('doping-home'), caption: l('صفحهٔ اصلی با انیمیشن مولکول‌ها', 'Home page with animated molecules'), device: 'desktop' },
      { src: w('doping-home-m'), caption: l('نسخهٔ موبایل و اپلیکیشن', 'The mobile site and app'), device: 'phone' },
    ],
    stack: ['Next.js', 'React', 'PostgreSQL', 'Prisma', 'Tailwind', 'PWA', l('ابر آروان', 'ArvanCloud'), zarinpal],
    role: l('طراحی، برنامه‌نویسی کامل و راه‌اندازی روی سرور', 'Design, full development and server deployment'),
  },
  {
    slug: 'crm',
    name: l('CRM میلیونر', 'Millionaire CRM'),
    client: l('گروه نرم‌افزاری میلیونر', 'Millionaire Software Group'),
    categories: ['panel'],
    kind: l('نرم‌افزار فروش و مدیریت مشتری', 'Sales & customer management software'),
    pitch: l(
      'قیف فروش، پیگیری خودکار و فاکتور؛ مستقیم وصل به نرم‌افزار حسابداری مشتری.',
      'A sales pipeline, automatic follow-ups and invoicing — plugged straight into the customer’s accounting software.',
    ),
    year,
    logo: 'logos/crm.svg',
    color: '#C81E1E',
    tint: '#FDECEC',
    cover: { desktop: w('crm-pipeline'), phone: w('crm-m') },
    summary: l(
      'یک CRM فارسی برای شرکت‌هایی که از نرم‌افزار حسابداری میلیونر استفاده می‌کنند. تیم فروش همهٔ مشتری‌ها، فرصت‌ها و پیگیری‌هایش را در یک جا می‌بیند و فاکتور را بدون ورود دوباره، مستقیم در حسابداری ثبت می‌کند.',
      'A Persian CRM for companies that run Millionaire accounting software. The sales team sees every customer, deal and follow-up in one place, and invoices go straight into accounting without being typed in twice.',
    ),
    problem: l(
      'فروشنده‌ها پیگیری‌ها را در دفتر و اکسل نگه می‌داشتند، مدیر تصویر روشنی از فروش نداشت و هر فاکتور یک بار دیگر در حسابداری وارد می‌شد.',
      'Salespeople kept their follow-ups in notebooks and Excel, the manager had no clear picture of sales, and every invoice was entered a second time in accounting.',
    ),
    solution: l(
      'یک پنل تحت وب با قیف فروش کشیدنی، یادآورهای خودکار و تقویم شمسی که به‌صورت امن به دیتابیس حسابداری هر مشتری وصل می‌شود. داده‌های هر شرکت کاملاً جداست و هر نفر فقط بخش خودش را می‌بیند.',
      'A web panel with a drag-and-drop sales pipeline, automatic reminders and a Persian calendar, securely connected to each customer’s accounting database. Every company’s data is kept fully separate, and each person sees only their own part.',
    ),
    facts: [
      { value: l('چندشرکتی', 'Multi-tenant'), label: l('دادهٔ هر شرکت کاملاً جدا', 'Every company’s data fully isolated') },
      { value: l('مستقیم', 'Direct'), label: l('ثبت فاکتور در حسابداری', 'Invoices posted to accounting') },
      { value: l('۲۰', '20'), label: l('ماژول تست خودکار', 'Automated test modules') },
    ],
    features: [
      { icon: 'kanban', title: l('قیف فروش کشیدنی', 'Drag-and-drop pipeline'), text: l('هر فرصت فروش یک کارت است؛ با کشیدن، مرحله‌اش عوض می‌شود و برای «باخت» دلیل ثبت می‌شود.', 'Every deal is a card: drag it to change its stage, and a lost deal records the reason why.') },
      { icon: 'bell', title: l('پیگیری و یادآور خودکار', 'Follow-ups & automatic reminders'), text: l('کارهای امروز، یادآورها و تقویم شمسی تا هیچ مشتری‌ای فراموش نشود.', 'Today’s tasks, reminders and a Persian calendar, so no customer is ever forgotten.') },
      { icon: 'excel', title: l('فاکتور مستقیم در حسابداری', 'Invoices straight into accounting'), text: l('فاکتور فروش و مرجوعی بدون ورود دوباره در نرم‌افزار حسابداری ثبت می‌شود.', 'Sales and return invoices are posted to the accounting software without re-entry.') },
      { icon: 'box', title: l('موجودی و قیمت لحظه‌ای', 'Live stock and prices'), text: l('فروشنده موجودی انبار، قیمت و مانده حساب مشتری را همان‌جا می‌بیند.', 'Salespeople see stock levels, prices and the customer’s balance right there.') },
      { icon: 'users', title: l('نقش‌ها و دسترسی‌ها', 'Roles and permissions'), text: l('مدیر، مدیر فروش و ویزیتور؛ هر کدام با سطح دسترسی خودش.', 'Manager, sales manager and field rep, each with their own access level.') },
      { icon: 'pen', title: l('طراح قالب فاکتور', 'Invoice template designer'), text: l('ظاهر فاکتور را با پیش‌نمایش زنده، مطابق برند خودتان بچینید.', 'Lay out your invoices to match your brand, with a live preview.') },
      { icon: 'code', title: l('فرم جذب مشتری برای سایت', 'Lead form for your website'), text: l('فرمی که روی سایت شما قرار می‌گیرد و مشتری جدید را مستقیم وارد CRM می‌کند.', 'A form that sits on your website and sends new leads straight into the CRM.') },
      { icon: 'chart', title: l('گزارش مدیریتی', 'Management reports'), text: l('نرخ تبدیل، عملکرد ویزیتورها و ارزش قیف فروش در یک نگاه.', 'Conversion rate, rep performance and pipeline value at a glance.') },
    ],
    screens: [
      { src: w('crm-pipeline'), caption: l('قیف فروش با کارت‌های کشیدنی', 'The sales pipeline with drag-and-drop cards'), device: 'desktop' },
      { src: w('crm-leads'), caption: l('فهرست مشتریان بالقوه با فیلتر کامل', 'The lead list, fully filterable'), device: 'desktop' },
      { src: w('crm-calendar'), caption: l('تقویم شمسی پیگیری‌ها', 'Follow-ups on a Persian calendar'), device: 'desktop' },
      { src: w('crm-reports'), caption: l('گزارش مدیریتی', 'Management report'), device: 'desktop' },
      { src: w('crm-m'), caption: l('CRM روی موبایل', 'The CRM on a phone'), device: 'phone' },
    ],
    stack: ['FastAPI', 'Python', 'SQL Server', 'SQLAlchemy', 'JavaScript', 'Tailwind', 'pytest'],
    role: l('طراحی و برنامه‌نویسی کامل، از دیتابیس تا رابط کاربری', 'Full design and development, from the database to the interface'),
  },
  {
    slug: 'support',
    name: l('پشتیبانی میلیونر + دستیار «میلی»', 'Millionaire Support + the “Mili” assistant'),
    client: l('گروه نرم‌افزاری میلیونر', 'Millionaire Software Group'),
    categories: ['panel', 'bot'],
    kind: l('سامانهٔ تیکت + دستیار هوش مصنوعی', 'Ticketing system + AI assistant'),
    pitch: l(
      'تیکت آنلاین با پیام صوتی و دستیار هوشمندی که قبل از ثبت تیکت، خودش جواب را پیدا می‌کند.',
      'Online tickets with voice messages, and an AI assistant that finds the answer itself before a ticket is ever opened.',
    ),
    year,
    logo: 'logos/millionaire.svg',
    color: '#8B0000',
    tint: '#FBEDEA',
    link: { href: 'https://support.softmiliac.com', label: 'support.softmiliac.com' },
    cover: { desktop: w('support-dashboard'), phone: w('support-m') },
    summary: l(
      'مشتریان چند برند نرم‌افزاری از یک مرکز پشتیبانی کمک می‌گیرند. سامانهٔ تیکت لحظه‌ای ساختم و کنارش «میلی»، دستیار هوش مصنوعی‌ای که از روی راهنماهای رسمی جواب می‌دهد تا خیلی از سؤال‌ها اصلاً به تیکت نرسند.',
      'Customers of several software brands get help from one support centre. I built a real-time ticketing system and, alongside it, “Mili” — an AI assistant that answers from the official manuals, so many questions never turn into tickets at all.',
    ),
    problem: l(
      'یک تیم پشتیبانی جواب‌گوی چند برند بود و بیشتر پاسخ‌ها لای راهنماهای PDF طولانی و پر از اسکرین‌شات گم شده بود.',
      'One support team answered for several brands, and most of the answers were buried in long PDF manuals full of screenshots.',
    ),
    solution: l(
      'تیکت‌ها به‌صورت خودکار به کم‌کارترین کارشناس می‌رسند، گفت‌وگو زنده است و مشتری می‌تواند پیام صوتی بفرستد. میلی قبل از ثبت تیکت جواب را از راهنماها پیدا می‌کند؛ حتی از داخل تصاویر.',
      'Tickets go automatically to the least-busy agent, conversations are live, and customers can send voice messages. Before a ticket is opened, Mili finds the answer in the manuals — even inside the images.',
    ),
    facts: [
      { value: l('۱۱۷ صفحه', '117 pages'), label: l('راهنمای PDF که میلی می‌خواند', 'Of PDF manuals that Mili reads') },
      { value: l('۵۹ صفحه', '59 pages'), label: l('که جوابشان فقط داخل تصویر است', 'Where the answer lives only in an image') },
      { value: l('زنده', 'Live'), label: l('تایپ و «خوانده شد» لحظه‌ای', 'Real-time typing and read receipts') },
    ],
    features: [
      { icon: 'sparkle', title: l('دستیار هوشمند میلی', 'Mili, the AI assistant'), text: l('از روی راهنماهای رسمی جواب می‌دهد و متن داخل اسکرین‌شات‌ها را هم می‌خواند.', 'Answers from the official manuals, and reads the text inside screenshots too.') },
      { icon: 'mic', title: l('پیام صوتی', 'Voice messages'), text: l('مشتری مشکلش را همان‌جا ضبط می‌کند؛ عکس، فایل و ویدیو هم پیوست می‌شود.', 'Customers record their problem on the spot; photos, files and video can be attached too.') },
      { icon: 'chat', title: l('گفت‌وگوی زنده', 'Live conversation'), text: l('نمایش «در حال تایپ» و «خوانده شد»، درست مثل پیام‌رسان‌ها.', '“Typing…” and “Seen” indicators, just like a messaging app.') },
      { icon: 'users', title: l('تخصیص خودکار', 'Automatic assignment'), text: l('هر تیکت به کارشناسی می‌رسد که کمترین کار را دارد.', 'Each ticket goes to the agent with the lightest workload.') },
      { icon: 'bell', title: l('SLA بر اساس ساعت کاری', 'SLAs on business hours'), text: l('زمان پاسخ فقط در ساعت کاری شمرده می‌شود و تأخیرها مشخص است.', 'Response times only count during working hours, and delays are flagged.') },
      { icon: 'chart', title: l('گزارش و رضایت مشتری', 'Reports & satisfaction'), text: l('زمان اولین پاسخ، زمان حل مشکل، امتیاز رضایت و عملکرد هر کارشناس.', 'First-response time, time to resolution, satisfaction scores and each agent’s performance.') },
      { icon: 'layers', title: l('چند شرکت، یک سامانه', 'Many companies, one system'), text: l('هر برند با لوگو، بخش‌ها و ساعت کاری خودش.', 'Each brand with its own logo, departments and working hours.') },
      { icon: 'sms', title: l('ورود با کد', 'Sign-in with a code'), text: l('ورود با کد پیامکی یا ایمیل، بدون نیاز به رمز عبور.', 'Log in with an SMS or email code — no password needed.') },
    ],
    screens: [
      { src: w('support-dashboard'), caption: l('داشبورد کارشناس پشتیبانی', 'The support agent’s dashboard'), device: 'desktop' },
      { src: w('support-thread'), caption: l('گفت‌وگوی تیکت با پیام صوتی', 'A ticket conversation with a voice message'), device: 'desktop' },
      { src: w('support-new'), caption: l('ثبت تیکت جدید', 'Opening a new ticket'), device: 'desktop' },
      { src: w('support-reports'), caption: l('گزارش‌ها و آمار', 'Reports and statistics'), device: 'desktop' },
      { src: w('support-m'), caption: l('تیکت روی موبایل', 'Tickets on a phone'), device: 'phone' },
    ],
    live: 'mili',
    stack: ['React', 'Node.js', 'Socket.IO', 'SQLite', 'FastAPI', 'RAG', l('مدل بینایی', 'Vision model')],
    role: l('طراحی و برنامه‌نویسی کامل سامانهٔ تیکت و دستیار هوش مصنوعی', 'Full design and development of the ticketing system and the AI assistant'),
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
    year,
    logo: 'logos/forwardbot.png',
    color: '#2563EB',
    tint: '#EAF1FE',
    link: { href: 'https://forwardbot.softmiliac.com', label: 'forwardbot.softmiliac.com' },
    cover: { desktop: w('forwardbot-home') },
    summary: l(
      'فورواردبات یک ربات اشتراکی تلگرام است که مدیریت کانال را خودکار می‌کند: پست‌ها را لحظه‌ای منتقل می‌کند، تبلیغات را فیلتر می‌کند، واترمارک می‌زند و در صورت نیاز متن را با هوش مصنوعی خلاصه، بازنویسی یا ترجمه می‌کند.',
      'ForwardBot is a subscription Telegram bot that puts channel management on autopilot: it moves posts across in real time, filters out ads, adds watermarks and, when needed, summarises, rewrites or translates the text with AI.',
    ),
    problem: l(
      'پردازش هوشمند تک‌تک پست‌ها برای هر مشترک باید سریع و ارزان می‌بود؛ اگر هر پست به مدل هوش مصنوعی می‌رفت، هزینه از خود اشتراک بیشتر می‌شد.',
      'Smart processing of every single post for every subscriber had to be fast and cheap: if every post went to an AI model, it would cost more than the subscription itself.',
    ),
    solution: l(
      'یک فیلتر دومرحله‌ای ساختم: اول امتیازدهی سریع با کلمات کلیدی و بعد فقط پست‌های مشکوک به هوش مصنوعی می‌رسند. همهٔ امکانات با دکمه‌های فارسی و ساده در خود تلگرام در دسترس است و فروش اشتراک، کیف پول و دعوت دوستان هم داخل ربات انجام می‌شود.',
      'I built a two-stage filter: a fast keyword score comes first, and only the suspicious posts go on to the AI. Every feature is a simple button away inside Telegram itself, and subscriptions, the wallet and friend invites all happen inside the bot too.',
    ),
    facts: [
      { value: l('۸ دکمه', '8 buttons'), label: l('منوی اصلی ساده و فارسی', 'In a simple main menu') },
      { value: l('۵ لحن', '5 tones'), label: l('بازنویسی متن با هوش مصنوعی', 'For AI rewriting') },
      { value: l('۳ روش', '3 ways'), label: l('پرداخت داخل ربات', 'To pay inside the bot') },
    ],
    features: [
      { icon: 'bolt', title: l('انتقال لحظه‌ای', 'Real-time transfer'), text: l('متن، عکس، آلبوم، ویدیو و فایل؛ چند ثانیه بعد از انتشار در مبدا.', 'Text, photos, albums, video and files — seconds after they appear at the source.') },
      { icon: 'layers', title: l('چند کانال همزمان', 'Many channels at once'), text: l('انتشار در چند کانال، هرکدام با امضای اختصاصی خودش.', 'Publish to several channels, each with its own signature.') },
      { icon: 'filter', title: l('فیلتر هوشمند تبلیغات', 'Smart ad filter'), text: l('سه سطح حساسیت و دکمهٔ «تست تنظیمات» قبل از فعال‌سازی.', 'Three sensitivity levels, and a “Test settings” button before you switch it on.') },
      { icon: 'drop', title: l('واترمارک', 'Watermarks'), text: l('متن، ایموجی یا لوگو روی تصاویر؛ با پیش‌نمایش شش حالت آماده.', 'Text, emoji or a logo on images, with a preview of six ready-made styles.') },
      { icon: 'sparkle', title: l('هوش مصنوعی', 'AI'), text: l('خلاصه، بازنویسی با ۵ لحن و ترجمه به ۵ زبان، با سیستم اعتبار.', 'Summaries, rewrites in 5 tones and translation into 5 languages, on a credit system.') },
      { icon: 'wallet', title: l('فروش داخل ربات', 'Sales inside the bot'), text: l('اشتراک، کیف پول، دعوت دوستان، کد تخفیف و سه روش پرداخت.', 'Subscriptions, a wallet, friend invites, discount codes and three ways to pay.') },
      { icon: 'chat', title: l('پشتیبانی در ربات', 'Support in the bot'), text: l('کاربر مشکلش را همان‌جا تیکت می‌کند و جواب می‌گیرد.', 'Users open a ticket right there and get their answer.') },
      { icon: 'chart', title: l('پنل مدیریت وب', 'Web admin panel'), text: l('طرح‌ها، کاربران و پرداخت‌ها از یک پنل تحت وب مدیریت می‌شوند.', 'Plans, users and payments are all managed from one web panel.') },
    ],
    screens: [
      { src: w('forwardbot-home'), caption: l('سایت معرفی ربات', 'The bot’s website'), device: 'desktop' },
      { src: w('forwardbot-m'), caption: l('سایت روی موبایل', 'The website on a phone'), device: 'phone' },
    ],
    live: 'telegram',
    stack: ['Python', 'aiogram', 'Telethon', 'SQLAlchemy', l('هوش مصنوعی', 'AI'), zarinpal, 'Docker'],
    role: l('طراحی تجربهٔ کاربری ربات، برنامه‌نویسی کامل، سایت و پنل مدیریت', 'Bot UX design, full development, the website and the admin panel'),
  },
  {
    slug: 'superapp',
    name: l('سوپراپ میلیونر', 'Millionaire Super App'),
    client: l('هلدینگ نرم‌افزاری میلیونر', 'Millionaire software holding'),
    categories: ['site', 'app'],
    kind: l('پورتال + اپلیکیشن قابل نصب', 'Portal + installable app'),
    pitch: l('یک اپلیکیشن برای پنج محصول یک هلدینگ؛ جست‌وجو، پشتیبانی و تعرفه‌ها در یک جا.', 'One app for a holding company’s five products — search, support and pricing in one place.'),
    year,
    logo: 'logos/millionaire.svg',
    color: '#980000',
    tint: '#F7EEEE',
    link: { href: 'https://app.softmiliac.com', label: 'app.softmiliac.com' },
    cover: { desktop: w('superapp-home'), phone: w('superapp-m') },
    summary: l(
      'هلدینگ میلیونر پنج محصول با سایت‌ها و دامنه‌های جدا داشت. یک پورتال قابل نصب ساختم که مشتری از همان‌جا به پنل، پشتیبانی و تعرفهٔ هر محصول برسد.',
      'The Millionaire holding had five products, each with its own website and domain. I built an installable portal where customers reach every product’s panel, support and pricing from one place.',
    ),
    problem: l('مشتری برای رسیدن به پنل یا پشتیبانی هر محصول باید بین چند سایت مختلف می‌گشت.', 'To reach a product’s panel or support, customers had to hunt across several different websites.'),
    solution: l(
      'یک لانچر ساده با جست‌وجوی سریع، صفحهٔ اختصاصی هر محصول و پنل مدیریت محتوا تا تیم خودش تعرفه‌ها و بنرهای تبلیغاتی را بدون برنامه‌نویس عوض کند.',
      'A simple launcher with fast search, a dedicated page for every product, and a content panel so the team can change pricing and promo banners themselves — no developer required.',
    ),
    facts: [
      { value: l('۵ محصول', '5 products'), label: l('در یک اپلیکیشن', 'In one app') },
      { value: 'PWA', label: l('نصب روی گوشی و کامپیوتر', 'Installs on phones and computers') },
      { value: 'CMS', label: l('مدیریت محتوا بدون برنامه‌نویس', 'Content managed without a developer') },
    ],
    features: [
      { icon: 'search', title: l('لانچر جست‌وجومحور', 'Search-first launcher'), text: l('مشتری اسم محصول یا کارش را تایپ می‌کند و مستقیم می‌رسد.', 'Customers type a product name or a task and land right there.') },
      { icon: 'phone', title: l('نصب مثل اپلیکیشن', 'Installs like an app'), text: l('روی گوشی و کامپیوتر نصب می‌شود؛ با حالت روشن و تیره.', 'On phones and computers, with light and dark modes.') },
      { icon: 'chat', title: l('درخواست مشاوره', 'Consultation requests'), text: l('فرم مشاوره با پنل پیگیری، جست‌وجو و خروجی اکسل برای تیم فروش.', 'A consultation form with a follow-up panel, search and Excel export for the sales team.') },
      { icon: 'pen', title: l('مدیریت محتوا', 'Content management'), text: l('تعرفه‌ها و بنرهای زمان‌دار با پیش‌نمایش زنده، بدون نیاز به برنامه‌نویس.', 'Pricing and scheduled banners with a live preview — no developer needed.') },
      { icon: 'chart', title: l('آمار بازدید', 'Visitor stats'), text: l('نمودار ۳۰ روزه و گزارش ورودها.', 'A 30-day chart and a log of sign-ins.') },
      { icon: 'shield', title: l('امن و سبک', 'Secure and lightweight'), text: l('ورود مدیر محدودشده و راه‌اندازی با Docker.', 'Restricted admin sign-in, deployed with Docker.') },
    ],
    screens: [
      { src: w('superapp-home'), caption: l('صفحهٔ اصلی پورتال', 'The portal’s home page'), device: 'desktop' },
      { src: w('superapp-m'), caption: l('نسخهٔ موبایل', 'The mobile version'), device: 'phone' },
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'SQLite', 'Docker'],
    role: l('طراحی و برنامه‌نویسی کامل، پنل مدیریت و راه‌اندازی', 'Full design and development, the admin panel and deployment'),
  },
];

export const categories: Record<'fa' | 'en', { id: Category | 'all'; label: string }[]> = bilingual(categorySrc);
export const projects: Record<'fa' | 'en', Project[]> = bilingual(projectSrc);

/** Every project's slug (the same in both languages). */
export const slugs = projects.fa.map((p) => p.slug);

/** Projects and filter labels in the page's language. */
export const useProjects = () => {
  const lang = useLang();
  return { projects: projects[lang], categories: categories[lang] };
};
