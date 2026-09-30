/**
 * نمونه‌کارها. هر پروژه یک کارت در صفحه و یک صفحهٔ کامل «داستان پروژه» دارد.
 * تصاویر در public/work هستند.
 */

export type Category = 'site' | 'app' | 'panel' | 'bot';

export const categories: { id: Category | 'all'; label: string }[] = [
  { id: 'all', label: 'همه' },
  { id: 'site', label: 'سایت' },
  { id: 'app', label: 'اپلیکیشن' },
  { id: 'panel', label: 'پنل و CRM' },
  { id: 'bot', label: 'ربات و هوش مصنوعی' },
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

export const projects: Project[] = [
  {
    slug: 'zehnesabz',
    name: 'کلینیک ذهن سبز',
    client: 'کلینیک کاردرمانی و توان‌بخشی ذهن سبز، مشهد',
    categories: ['site', 'app', 'panel'],
    kind: 'سایت + اپلیکیشن + پنل مدیریت',
    pitch: 'از رزرو نوبت تا پیامک یادآوری و پرونده درمان؛ همهٔ کارهای یک کلینیک، آنلاین و خودکار.',
    year: '۱۴۰۵',
    logo: 'logos/zehnesabz.png',
    color: '#0B5E2E',
    tint: '#E8F4EC',
    link: { href: 'https://zehnesabz.com', label: 'zehnesabz.com' },
    cover: { desktop: w('zehnesabz-home'), phone: w('zehnesabz-app-dashboard') },
    summary:
      'ذهن سبز یک کلینیک کاردرمانی در مشهد است. برایش یک سامانهٔ کامل ساختم: سایتی که مراجع جدید از گوگل پیدایش می‌کند و آنلاین نوبت می‌گیرد، اپلیکیشنی که روی گوشی نصب می‌شود، و پنل‌های جدا برای مدیر، منشی و درمانگر.',
    problem:
      'نوبت‌ها تلفنی و دفتری ثبت می‌شد، مراجعان جلسه را فراموش می‌کردند و پرونده‌ها، فاکتورها و ارزیابی‌های درمانی هر کدام جای جدایی بود.',
    solution:
      'حالا نوبت آنلاین ثبت می‌شود، پیامک تأیید و یادآوری خودکار می‌رود و مراجع برنامهٔ جلسات، تمرین‌های خانگی و وضعیت مالی‌اش را در اپلیکیشن می‌بیند. درمانگر فرم‌های ارزیابی را پر می‌کند و نمودار پیشرفت خودش ساخته می‌شود.',
    facts: [
      { value: '۴ پنل', label: 'مدیر، منشی، درمانگر و مراجع' },
      { value: '۶۳', label: 'صفحه و بخش' },
      { value: '۲ ساعت', label: 'یادآوری پیامکی قبل از هر جلسه' },
    ],
    features: [
      { icon: 'calendar', title: 'رزرو آنلاین نوبت', text: 'مراجع از سایت، با تقویم شمسی و بدون تماس تلفنی نوبت می‌گیرد.' },
      { icon: 'sms', title: 'پیامک خودکار', text: 'تأیید نوبت برای مراجع و درمانگر و یادآوری دو ساعت قبل از جلسه.' },
      { icon: 'phone', title: 'اپلیکیشن قابل نصب', text: 'روی اندروید و آیفون نصب می‌شود؛ ورود فقط با کد پیامکی.' },
      { icon: 'users', title: 'پنل برای هر نقش', text: 'مدیر، منشی، درمانگر و مراجع هر کدام فقط چیزی را می‌بینند که لازم دارند.' },
      { icon: 'chart', title: 'ارزیابی و نمودار پیشرفت', text: 'فرم‌های ارزیابی امتیازدار و نمودار روند درمان برای هر مراجع.' },
      { icon: 'card', title: 'پرداخت آنلاین و کیف پول', text: 'پرداخت با زرین‌پال، فاکتور، بدهی و گزارش صندوق روزانه.' },
      { icon: 'pen', title: 'امضای دیجیتال', text: 'رضایت‌نامهٔ درمان روی خود گوشی امضا می‌شود.' },
      { icon: 'shield', title: 'گزارش و بک‌آپ', text: 'درآمد هر درمانگر، نرخ غیبت، مراجعان در خطر ریزش و بک‌آپ شبانه.' },
    ],
    screens: [
      { src: w('zehnesabz-home'), caption: 'صفحهٔ اصلی سایت', device: 'desktop' },
      { src: w('zehnesabz-app-dashboard'), caption: 'داشبورد مراجع در اپلیکیشن', device: 'phone' },
      { src: w('zehnesabz-app-schedule'), caption: 'برنامهٔ جلسات و وضعیت هر نوبت', device: 'phone' },
      { src: w('zehnesabz-app-login'), caption: 'ورود با کد پیامکی', device: 'phone' },
      { src: w('zehnesabz-app-install'), caption: 'راهنمای نصب اپلیکیشن', device: 'phone' },
      { src: w('zehnesabz-home-m'), caption: 'سایت روی موبایل', device: 'phone' },
    ],
    stack: ['Next.js', 'TypeScript', 'Express', 'Prisma', 'Tailwind', 'PWA', 'زرین‌پال', 'ملی‌پیامک'],
    role: 'طراحی رابط کاربری، برنامه‌نویسی کامل، راه‌اندازی سرور و نسخهٔ اندروید',
  },
  {
    slug: 'dongi',
    name: 'دنگی',
    client: 'محصول نرم‌افزاری برای اکیپ‌ها و خانواده‌ها',
    categories: ['app', 'site'],
    kind: 'اپلیکیشن تقسیم هزینه‌های گروهی',
    pitch: 'کی به کی چقدر بدهکاره؟ دنگی حساب اکیپ را با کمترین جابه‌جایی پول صاف می‌کند؛ با شمارهٔ کارت و یادآوری.',
    year: '۱۴۰۵',
    logo: 'logos/dongi.png',
    color: '#15756A',
    tint: '#E4F3F0',
    link: { href: 'https://dongi.softmiliac.com', label: 'dongi.softmiliac.com' },
    cover: { desktop: w('dongi-home'), phone: w('dongi-m-balances') },
    summary:
      'دنگی یک اپلیکیشن فارسی برای حساب‌وکتاب هزینه‌های مشترک است: سفر، خانهٔ دانشجویی، دورهمی یا خانواده. هرکس خرجی می‌کند ثبت می‌کند و دنگی می‌گوید دقیقاً چه کسی، چقدر و به چه کسی بدهد.',
    problem:
      'حساب اکیپ همیشه روی کاغذ یا در گروه تلگرام گم می‌شد؛ یکی کل پول را داده، یکی نصفش را و آخر سفر هیچ‌کس نمی‌دانست کی به کی بدهکار است. واریزهای ضربدری هم کار را بدتر می‌کرد.',
    solution:
      'یک الگوریتم تسویه ساختم که به‌جای شش واریز، دو واریز پیشنهاد می‌دهد و با دادهٔ یکسان همیشه همان جواب را می‌دهد. کنار هر بدهی شمارهٔ کارت طلبکار با دکمهٔ کپی هست، یادآوری پیامکی دوستانه می‌رود و گزارش آمادهٔ تلگرام یا فاکتور PDF با یک لمس ساخته می‌شود.',
    facts: [
      { value: '۲ به‌جای ۶', label: 'واریز، با الگوریتم کمترین جابه‌جایی' },
      { value: '۴ روش', label: 'تقسیم: مساوی، دلخواه، وزنی، آیتمی' },
      { value: 'PWA', label: 'نصب روی گوشی، با حالت شب' },
    ],
    features: [
      { icon: 'wallet', title: 'کمترین جابه‌جایی پول', text: 'به‌جای واریزهای ضربدری، کوتاه‌ترین مسیر تسویه؛ نتیجه با دادهٔ یکسان همیشه ثابت است.' },
      { icon: 'users', title: 'اکیپ، تیم و مهمان', text: 'چند گروه با یک حساب، تیم خانوادگی با نمایندهٔ حساب، و مهمانی که حساب کاربری ندارد.' },
      { icon: 'layers', title: 'چهار مدل تقسیم', text: 'مساوی، دلخواه، وزنی و آیتمی؛ مالیات و سرویس فاکتور به نسبت سهم پخش می‌شود.' },
      { icon: 'card', title: 'کارت‌به‌کارت آسان', text: 'شمارهٔ کارت طلبکار کنار هر بدهی، با کپی مبلغ و ثبت رسید واریز.' },
      { icon: 'sms', title: 'یادآوری پیامکی', text: 'یادآوری مودبانه به بدهکار، بدون اینکه رفاقت خراب شود؛ با چند سرویس پیامک ایرانی.' },
      { icon: 'chart', title: 'نمودار و کارنامه', text: 'سهم هر دسته از خرج‌ها، روند ماهانه و کارنامهٔ هر نفر.' },
      { icon: 'excel', title: 'گزارش، PDF و اکسل', text: 'متن آمادهٔ تلگرام، عکس خلاصه، فاکتور PDF و خروجی اکسل فارسی.' },
      { icon: 'calendar', title: 'تقویم شمسی و میلادی', text: 'هر تاریخ به هر دو صورت نمایش داده می‌شود؛ هزینه‌های تکرارشونده با یک دکمه.' },
    ],
    screens: [
      { src: w('dongi-home'), caption: 'صفحهٔ معرفی دنگی', device: 'desktop' },
      { src: w('dongi-m-balances'), caption: 'طلب و بدهی هر نفر', device: 'phone' },
      { src: w('dongi-m-settle'), caption: 'صندوق مشترک و پرداخت‌ها', device: 'phone' },
      { src: w('dongi-m-expenses'), caption: 'فهرست هزینه‌ها با جست‌وجو و فیلتر', device: 'phone' },
      { src: w('dongi-m-add'), caption: 'ثبت هزینه با تقویم شمسی', device: 'phone' },
      { src: w('dongi-m-charts'), caption: 'نمودار خرج‌ها و آمار اکیپ', device: 'phone' },
      { src: w('dongi-home-m'), caption: 'صفحهٔ معرفی روی موبایل', device: 'phone' },
    ],
    stack: ['PHP', 'SQLite / MySQL', 'JavaScript', 'PWA', 'Web Push', 'پیامک ایرانی', 'PDF'],
    role: 'ایده، طراحی تجربهٔ کاربری، برنامه‌نویسی کامل و صفحهٔ معرفی',
  },
  {
    slug: 'dopingshimi',
    name: 'دوپینگ شیمی',
    client: 'استاد جواد پرتویی، مدرس شیمی کنکور',
    categories: ['site', 'app'],
    kind: 'سایت آموزشی + اپلیکیشن',
    pitch: 'فروش ویدیوی آموزشی، آزمون آنلاین و رتبه‌بندی دانش‌آموزان برای یک مدرس کنکور.',
    year: '۱۴۰۵',
    logo: 'logos/doping.svg',
    color: '#7C3AED',
    tint: '#F1ECFE',
    link: { href: 'https://dopingshimi.ir', label: 'dopingshimi.ir' },
    cover: { desktop: w('doping-video'), phone: w('doping-m-video') },
    summary:
      'یک مدرس شیمی کنکور می‌خواست کلاس‌ها، همایش‌ها و ویدیوهایش را آنلاین بفروشد و پیشرفت دانش‌آموزانش را دنبال کند. نتیجه یک سایت پرانرژی و یک اپلیکیشن آموزشی شد.',
    problem:
      'ویدیوهای پولی باید از دانلود و اشتراک‌گذاری محافظت می‌شدند، آزمون‌ها نیاز به تصحیح خودکار داشتند و دانش‌آموزان برای ادامه دادن به انگیزه نیاز داشتند.',
    solution:
      'ویدیوها از ابر آروان با لینک امن و واترمارک متحرک (شمارهٔ خود دانش‌آموز) پخش می‌شوند. آزمون‌ها آنلاین برگزار و تصحیح می‌شوند و هر دانش‌آموز امتیاز، سطح و رتبه دارد؛ سطح‌ها به اسم عناصر جدول تناوبی‌اند.',
    facts: [
      { value: 'H → Au', label: 'سطح‌بندی دانش‌آموزان با عناصر شیمی' },
      { value: '۳۸', label: 'صفحه و بخش' },
      { value: '۲ روش', label: 'پرداخت: زرین‌پال و کارت‌به‌کارت' },
    ],
    features: [
      { icon: 'video', title: 'ویدیوی محافظت‌شده', text: 'لینک پخش شخصی و انقضادار، به‌همراه واترمارک متحرک با شمارهٔ دانش‌آموز.' },
      { icon: 'bolt', title: 'آزمون آنلاین', text: 'آزمون زمان‌دار با ذخیرهٔ خودکار پاسخ‌ها و تصحیح فوری با نمرهٔ منفی.' },
      { icon: 'excel', title: 'ورود نتایج از اکسل', text: 'نتایج آزمون‌های بیرونی از فایل اکسل خوانده و به دانش‌آموزها وصل می‌شود.' },
      { icon: 'trophy', title: 'امتیاز، سطح و رتبه', text: 'داشبورد انگیزشی با امتیاز، رکورد روزانه و مقایسه با میانگین کلاس.' },
      { icon: 'card', title: 'فروش تکی و پکیج', text: 'دسترسی زمان‌دار یا دائمی؛ پرداخت آنلاین یا کارت‌به‌کارت با تأیید مدیر.' },
      { icon: 'sms', title: 'پیامک به دانش‌آموز و والدین', text: 'خبر آزمون‌ها و نتیجه‌ها به خود دانش‌آموز و خانواده‌اش می‌رسد.' },
      { icon: 'sparkle', title: 'صفحهٔ اول سینمایی', text: 'انیمیشن مولکول‌ها و طراحی تیره و نئونی که با حال‌وهوای کنکوری‌ها جور است.' },
      { icon: 'search', title: 'سئو و مقاله', text: 'بخش مقاله و ساختار استاندارد برای دیده شدن در گوگل.' },
    ],
    screens: [
      { src: w('doping-video'), caption: 'پنل دانش‌آموز: تماشای جلسهٔ درس', device: 'desktop' },
      { src: w('doping-m-video'), caption: 'همان کلاس روی گوشی', device: 'phone' },
      { src: w('doping-panel'), caption: 'داشبورد دانش‌آموز: پیشرفت، آزمون‌ها و رتبه', device: 'desktop' },
      { src: w('doping-m-panel'), caption: 'پنل دانش‌آموز در اپلیکیشن', device: 'phone' },
      { src: w('doping-home'), caption: 'صفحهٔ اصلی با انیمیشن مولکول‌ها', device: 'desktop' },
      { src: w('doping-home-m'), caption: 'نسخهٔ موبایل و اپلیکیشن', device: 'phone' },
    ],
    stack: ['Next.js', 'React', 'PostgreSQL', 'Prisma', 'Tailwind', 'PWA', 'ابر آروان', 'زرین‌پال'],
    role: 'طراحی، برنامه‌نویسی کامل و راه‌اندازی روی سرور',
  },
  {
    slug: 'crm',
    name: 'CRM میلیونر',
    client: 'گروه نرم‌افزاری میلیونر',
    categories: ['panel'],
    kind: 'نرم‌افزار فروش و مدیریت مشتری',
    pitch: 'قیف فروش، پیگیری خودکار و فاکتور؛ مستقیم وصل به نرم‌افزار حسابداری مشتری.',
    year: '۱۴۰۵',
    logo: 'logos/crm.svg',
    color: '#C81E1E',
    tint: '#FDECEC',
    cover: { desktop: w('crm-pipeline'), phone: w('crm-m') },
    summary:
      'یک CRM فارسی برای شرکت‌هایی که از نرم‌افزار حسابداری میلیونر استفاده می‌کنند. تیم فروش همهٔ مشتری‌ها، فرصت‌ها و پیگیری‌هایش را در یک جا می‌بیند و فاکتور را بدون ورود دوباره، مستقیم در حسابداری ثبت می‌کند.',
    problem:
      'فروشنده‌ها پیگیری‌ها را در دفتر و اکسل نگه می‌داشتند، مدیر تصویر روشنی از فروش نداشت و هر فاکتور یک بار دیگر در حسابداری وارد می‌شد.',
    solution:
      'یک پنل تحت وب با قیف فروش کشیدنی، یادآورهای خودکار و تقویم شمسی که به‌صورت امن به دیتابیس حسابداری هر مشتری وصل می‌شود. داده‌های هر شرکت کاملاً جداست و هر نفر فقط بخش خودش را می‌بیند.',
    facts: [
      { value: 'چندشرکتی', label: 'دادهٔ هر شرکت کاملاً جدا' },
      { value: 'مستقیم', label: 'ثبت فاکتور در حسابداری' },
      { value: '۲۰', label: 'ماژول تست خودکار' },
    ],
    features: [
      { icon: 'kanban', title: 'قیف فروش کشیدنی', text: 'هر فرصت فروش یک کارت است؛ با کشیدن، مرحله‌اش عوض می‌شود و برای «باخت» دلیل ثبت می‌شود.' },
      { icon: 'bell', title: 'پیگیری و یادآور خودکار', text: 'کارهای امروز، یادآورها و تقویم شمسی تا هیچ مشتری‌ای فراموش نشود.' },
      { icon: 'excel', title: 'فاکتور مستقیم در حسابداری', text: 'فاکتور فروش و مرجوعی بدون ورود دوباره در نرم‌افزار حسابداری ثبت می‌شود.' },
      { icon: 'box', title: 'موجودی و قیمت لحظه‌ای', text: 'فروشنده موجودی انبار، قیمت و مانده حساب مشتری را همان‌جا می‌بیند.' },
      { icon: 'users', title: 'نقش‌ها و دسترسی‌ها', text: 'مدیر، مدیر فروش و ویزیتور؛ هر کدام با سطح دسترسی خودش.' },
      { icon: 'pen', title: 'طراح قالب فاکتور', text: 'ظاهر فاکتور را با پیش‌نمایش زنده، مطابق برند خودتان بچینید.' },
      { icon: 'code', title: 'فرم جذب مشتری برای سایت', text: 'فرمی که روی سایت شما قرار می‌گیرد و مشتری جدید را مستقیم وارد CRM می‌کند.' },
      { icon: 'chart', title: 'گزارش مدیریتی', text: 'نرخ تبدیل، عملکرد ویزیتورها و ارزش قیف فروش در یک نگاه.' },
    ],
    screens: [
      { src: w('crm-pipeline'), caption: 'قیف فروش با کارت‌های کشیدنی', device: 'desktop' },
      { src: w('crm-leads'), caption: 'فهرست مشتریان بالقوه با فیلتر کامل', device: 'desktop' },
      { src: w('crm-calendar'), caption: 'تقویم شمسی پیگیری‌ها', device: 'desktop' },
      { src: w('crm-reports'), caption: 'گزارش مدیریتی', device: 'desktop' },
      { src: w('crm-m'), caption: 'CRM روی موبایل', device: 'phone' },
    ],
    stack: ['FastAPI', 'Python', 'SQL Server', 'SQLAlchemy', 'JavaScript', 'Tailwind', 'pytest'],
    role: 'طراحی و برنامه‌نویسی کامل، از دیتابیس تا رابط کاربری',
  },
  {
    slug: 'support',
    name: 'پشتیبانی میلیونر + دستیار «میلی»',
    client: 'گروه نرم‌افزاری میلیونر',
    categories: ['panel', 'bot'],
    kind: 'سامانهٔ تیکت + دستیار هوش مصنوعی',
    pitch: 'تیکت آنلاین با پیام صوتی و دستیار هوشمندی که قبل از ثبت تیکت، خودش جواب را پیدا می‌کند.',
    year: '۱۴۰۵',
    logo: 'logos/millionaire.svg',
    color: '#8B0000',
    tint: '#FBEDEA',
    link: { href: 'https://support.softmiliac.com', label: 'support.softmiliac.com' },
    cover: { desktop: w('support-dashboard'), phone: w('support-m') },
    summary:
      'مشتریان چند برند نرم‌افزاری از یک مرکز پشتیبانی کمک می‌گیرند. سامانهٔ تیکت لحظه‌ای ساختم و کنارش «میلی»، دستیار هوش مصنوعی‌ای که از روی راهنماهای رسمی جواب می‌دهد تا خیلی از سؤال‌ها اصلاً به تیکت نرسند.',
    problem:
      'یک تیم پشتیبانی جواب‌گوی چند برند بود و بیشتر پاسخ‌ها لای راهنماهای PDF طولانی و پر از اسکرین‌شات گم شده بود.',
    solution:
      'تیکت‌ها به‌صورت خودکار به کم‌کارترین کارشناس می‌رسند، گفت‌وگو زنده است و مشتری می‌تواند پیام صوتی بفرستد. میلی قبل از ثبت تیکت جواب را از راهنماها پیدا می‌کند؛ حتی از داخل تصاویر.',
    facts: [
      { value: '۱۱۷ صفحه', label: 'راهنمای PDF که میلی می‌خواند' },
      { value: '۵۹ صفحه', label: 'که جوابشان فقط داخل تصویر است' },
      { value: 'زنده', label: 'تایپ و «خوانده شد» لحظه‌ای' },
    ],
    features: [
      { icon: 'sparkle', title: 'دستیار هوشمند میلی', text: 'از روی راهنماهای رسمی جواب می‌دهد و متن داخل اسکرین‌شات‌ها را هم می‌خواند.' },
      { icon: 'mic', title: 'پیام صوتی', text: 'مشتری مشکلش را همان‌جا ضبط می‌کند؛ عکس، فایل و ویدیو هم پیوست می‌شود.' },
      { icon: 'chat', title: 'گفت‌وگوی زنده', text: 'نمایش «در حال تایپ» و «خوانده شد»، درست مثل پیام‌رسان‌ها.' },
      { icon: 'users', title: 'تخصیص خودکار', text: 'هر تیکت به کارشناسی می‌رسد که کمترین کار را دارد.' },
      { icon: 'bell', title: 'SLA بر اساس ساعت کاری', text: 'زمان پاسخ فقط در ساعت کاری شمرده می‌شود و تأخیرها مشخص است.' },
      { icon: 'chart', title: 'گزارش و رضایت مشتری', text: 'زمان اولین پاسخ، زمان حل مشکل، امتیاز رضایت و عملکرد هر کارشناس.' },
      { icon: 'layers', title: 'چند شرکت، یک سامانه', text: 'هر برند با لوگو، بخش‌ها و ساعت کاری خودش.' },
      { icon: 'sms', title: 'ورود با کد', text: 'ورود با کد پیامکی یا ایمیل، بدون نیاز به رمز عبور.' },
    ],
    screens: [
      { src: w('support-dashboard'), caption: 'داشبورد کارشناس پشتیبانی', device: 'desktop' },
      { src: w('support-thread'), caption: 'گفت‌وگوی تیکت با پیام صوتی', device: 'desktop' },
      { src: w('support-new'), caption: 'ثبت تیکت جدید', device: 'desktop' },
      { src: w('support-reports'), caption: 'گزارش‌ها و آمار', device: 'desktop' },
      { src: w('support-m'), caption: 'تیکت روی موبایل', device: 'phone' },
    ],
    live: 'mili',
    stack: ['React', 'Node.js', 'Socket.IO', 'SQLite', 'FastAPI', 'RAG', 'مدل بینایی'],
    role: 'طراحی و برنامه‌نویسی کامل سامانهٔ تیکت و دستیار هوش مصنوعی',
  },
  {
    slug: 'forwardbot',
    name: 'فورواردبات',
    client: 'محصول نرم‌افزاری روی تلگرام',
    categories: ['bot'],
    kind: 'ربات تلگرام + پنل وب',
    pitch: 'رباتی که پست‌ها را لحظه‌ای بین کانال‌ها منتقل می‌کند؛ با فیلتر تبلیغات، واترمارک و هوش مصنوعی.',
    year: '۱۴۰۵',
    logo: 'logos/forwardbot.png',
    color: '#2563EB',
    tint: '#EAF1FE',
    link: { href: 'https://forwardbot.softmiliac.com', label: 'forwardbot.softmiliac.com' },
    cover: { desktop: w('forwardbot-home') },
    summary:
      'فورواردبات یک ربات اشتراکی تلگرام است که مدیریت کانال را خودکار می‌کند: پست‌ها را لحظه‌ای منتقل می‌کند، تبلیغات را فیلتر می‌کند، واترمارک می‌زند و در صورت نیاز متن را با هوش مصنوعی خلاصه، بازنویسی یا ترجمه می‌کند.',
    problem:
      'پردازش هوشمند تک‌تک پست‌ها برای هر مشترک باید سریع و ارزان می‌بود؛ اگر هر پست به مدل هوش مصنوعی می‌رفت، هزینه از خود اشتراک بیشتر می‌شد.',
    solution:
      'یک فیلتر دومرحله‌ای ساختم: اول امتیازدهی سریع با کلمات کلیدی و بعد فقط پست‌های مشکوک به هوش مصنوعی می‌رسند. همهٔ امکانات با دکمه‌های فارسی و ساده در خود تلگرام در دسترس است و فروش اشتراک، کیف پول و دعوت دوستان هم داخل ربات انجام می‌شود.',
    facts: [
      { value: '۸ دکمه', label: 'منوی اصلی ساده و فارسی' },
      { value: '۵ لحن', label: 'بازنویسی متن با هوش مصنوعی' },
      { value: '۳ روش', label: 'پرداخت داخل ربات' },
    ],
    features: [
      { icon: 'bolt', title: 'انتقال لحظه‌ای', text: 'متن، عکس، آلبوم، ویدیو و فایل؛ چند ثانیه بعد از انتشار در مبدا.' },
      { icon: 'layers', title: 'چند کانال همزمان', text: 'انتشار در چند کانال، هرکدام با امضای اختصاصی خودش.' },
      { icon: 'filter', title: 'فیلتر هوشمند تبلیغات', text: 'سه سطح حساسیت و دکمهٔ «تست تنظیمات» قبل از فعال‌سازی.' },
      { icon: 'drop', title: 'واترمارک', text: 'متن، ایموجی یا لوگو روی تصاویر؛ با پیش‌نمایش شش حالت آماده.' },
      { icon: 'sparkle', title: 'هوش مصنوعی', text: 'خلاصه، بازنویسی با ۵ لحن و ترجمه به ۵ زبان، با سیستم اعتبار.' },
      { icon: 'wallet', title: 'فروش داخل ربات', text: 'اشتراک، کیف پول، دعوت دوستان، کد تخفیف و سه روش پرداخت.' },
      { icon: 'chat', title: 'پشتیبانی در ربات', text: 'کاربر مشکلش را همان‌جا تیکت می‌کند و جواب می‌گیرد.' },
      { icon: 'chart', title: 'پنل مدیریت وب', text: 'طرح‌ها، کاربران و پرداخت‌ها از یک پنل تحت وب مدیریت می‌شوند.' },
    ],
    screens: [
      { src: w('forwardbot-home'), caption: 'سایت معرفی ربات', device: 'desktop' },
      { src: w('forwardbot-m'), caption: 'سایت روی موبایل', device: 'phone' },
    ],
    live: 'telegram',
    stack: ['Python', 'aiogram', 'Telethon', 'SQLAlchemy', 'هوش مصنوعی', 'زرین‌پال', 'Docker'],
    role: 'طراحی تجربهٔ کاربری ربات، برنامه‌نویسی کامل، سایت و پنل مدیریت',
  },
  {
    slug: 'superapp',
    name: 'سوپراپ میلیونر',
    client: 'هلدینگ نرم‌افزاری میلیونر',
    categories: ['site', 'app'],
    kind: 'پورتال + اپلیکیشن قابل نصب',
    pitch: 'یک اپلیکیشن برای پنج محصول یک هلدینگ؛ جست‌وجو، پشتیبانی و تعرفه‌ها در یک جا.',
    year: '۱۴۰۵',
    logo: 'logos/millionaire.svg',
    color: '#980000',
    tint: '#F7EEEE',
    link: { href: 'https://app.softmiliac.com', label: 'app.softmiliac.com' },
    cover: { desktop: w('superapp-home'), phone: w('superapp-m') },
    summary:
      'هلدینگ میلیونر پنج محصول با سایت‌ها و دامنه‌های جدا داشت. یک پورتال قابل نصب ساختم که مشتری از همان‌جا به پنل، پشتیبانی و تعرفهٔ هر محصول برسد.',
    problem: 'مشتری برای رسیدن به پنل یا پشتیبانی هر محصول باید بین چند سایت مختلف می‌گشت.',
    solution:
      'یک لانچر ساده با جست‌وجوی سریع، صفحهٔ اختصاصی هر محصول و پنل مدیریت محتوا تا تیم خودش تعرفه‌ها و بنرهای تبلیغاتی را بدون برنامه‌نویس عوض کند.',
    facts: [
      { value: '۵ محصول', label: 'در یک اپلیکیشن' },
      { value: 'PWA', label: 'نصب روی گوشی و کامپیوتر' },
      { value: 'CMS', label: 'مدیریت محتوا بدون برنامه‌نویس' },
    ],
    features: [
      { icon: 'search', title: 'لانچر جست‌وجومحور', text: 'مشتری اسم محصول یا کارش را تایپ می‌کند و مستقیم می‌رسد.' },
      { icon: 'phone', title: 'نصب مثل اپلیکیشن', text: 'روی گوشی و کامپیوتر نصب می‌شود؛ با حالت روشن و تیره.' },
      { icon: 'chat', title: 'درخواست مشاوره', text: 'فرم مشاوره با پنل پیگیری، جست‌وجو و خروجی اکسل برای تیم فروش.' },
      { icon: 'pen', title: 'مدیریت محتوا', text: 'تعرفه‌ها و بنرهای زمان‌دار با پیش‌نمایش زنده، بدون نیاز به برنامه‌نویس.' },
      { icon: 'chart', title: 'آمار بازدید', text: 'نمودار ۳۰ روزه و گزارش ورودها.' },
      { icon: 'shield', title: 'امن و سبک', text: 'ورود مدیر محدودشده و راه‌اندازی با Docker.' },
    ],
    screens: [
      { src: w('superapp-home'), caption: 'صفحهٔ اصلی پورتال', device: 'desktop' },
      { src: w('superapp-m'), caption: 'نسخهٔ موبایل', device: 'phone' },
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'SQLite', 'Docker'],
    role: 'طراحی و برنامه‌نویسی کامل، پنل مدیریت و راه‌اندازی',
  },
];
