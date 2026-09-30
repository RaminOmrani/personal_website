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
  url: 'https://raminomrani.github.io/personal_website/',
  name: l('رامین عمرانی', 'Ramin Omrani'),
  /** The two big lines in the hero. */
  heroName: { fa: ['رامین', 'عمرانی'], en: ['RAMIN', 'OMRANI'] },
  monogram: 'RO',
  role: l('طراح و توسعه‌دهندهٔ وب و اپلیکیشن', 'Web & App Designer · Developer'),
  description: l(
    'رامین عمرانی — طراحی و توسعهٔ وب‌سایت، اپلیکیشن موبایل و تجربه‌های دیجیتال خلاق برای برندها و استارتاپ‌ها.',
    'Ramin Omrani — designer & developer crafting websites, mobile apps and creative digital experiences for brands and startups.',
  ),
  location: l('تهران · ایران', 'Tehran · Iran'),
  timezone: 'Asia/Tehran',
  /** TODO: replace with your real public email address. */
  email: 'hello@raminomrani.com',
  available: true,
  availability: l('پذیرش پروژهٔ جدید', 'Available for new projects'),
  socials: [
    { label: 'GitHub', url: 'https://github.com/RaminOmrani' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/' },
    { label: 'Instagram', url: 'https://www.instagram.com/' },
    { label: 'Telegram', url: 'https://t.me/' },
    { label: 'Dribbble', url: 'https://dribbble.com/' },
  ],
};

/* ───────────────────────── Hero ───────────────────────── */

export const hero = {
  eyebrow: l('پورتفولیو', 'Portfolio'),
  statement: l(
    'وب‌سایت‌ها و اپلیکیشن‌هایی *فراموش‌نشدنی* طراحی می‌کنم و می‌سازم.',
    'I design & build *unforgettable* websites and apps.',
  ),
  intro: l(
    'از اولین طرح تا روز انتشار، ایده‌های بلندپروازانه را به محصولات دیجیتالی سریع، زیبا و اثرگذار تبدیل می‌کنم؛ برای برندها، استارتاپ‌ها و آدم‌هایی که می‌خواهند دیده شوند.',
    'From the first sketch to launch day, I turn ambitious ideas into fast, beautiful and meaningful digital products — for brands, startups and people who want to stand out.',
  ),
  primaryCta: l('نمونه‌کارها', 'Selected work'),
  secondaryCta: l('شروع یک پروژه', 'Start a project'),
  scroll: l('اسکرول کنید', 'Scroll to explore'),
};

/* ───────────────────────── About ───────────────────────── */

export const about = {
  label: l('دربارهٔ من', 'About'),
  manifesto: l(
    'من رامینم؛ طراحی که کد می‌نویسد و توسعه‌دهنده‌ای که وسواس جزئیات دارد. برای من هر وب‌سایت یک *داستان* است و هر تعامل یک *حس*. استراتژی، طراحی و مهندسی را کنار هم می‌گذارم تا تجربه‌هایی بسازم که فقط زیبا نیستند؛ کسب‌وکار شما را *رشد* می‌دهند.',
    "I'm Ramin — a designer who codes and a developer obsessed with detail. To me every website is a *story* and every interaction a *feeling*. I blend strategy, design and engineering into experiences that don't just look good — they *grow* your business.",
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
    { value: 6, suffix: '+', label: l('سال تجربه', 'Years of experience'), sample: true },
    { value: 40, suffix: '+', label: l('پروژهٔ تحویل‌شده', 'Projects delivered'), sample: true },
    { value: 25, suffix: '+', label: l('مشتری راضی', 'Happy clients'), sample: true },
    { value: 98, suffix: '%', label: l('تحویل به‌موقع', 'On-time delivery'), sample: true },
  ],
};

/* ───────────────────────── Services ───────────────────────── */

export const services = {
  label: l('خدمات', 'Services'),
  title: l('چه کاری *برای شما* انجام می‌دهم', 'What I can do *for you*'),
  items: [
    {
      icon: 'web',
      title: l('طراحی و توسعهٔ وب‌سایت', 'Web Design & Development'),
      text: l(
        'سایت شرکتی، لندینگ‌پیج و پورتفولیو؛ سریع، سئوشده و طراحی‌شده برای تبدیل بازدیدکننده به مشتری.',
        'Corporate sites, landing pages and portfolios that load fast, rank well and turn visitors into customers.',
      ),
      tags: ['Next.js', 'Astro', 'CMS', 'SEO', 'Responsive'],
    },
    {
      icon: 'app',
      title: l('اپلیکیشن موبایل', 'Mobile Applications'),
      text: l(
        'اپلیکیشن‌های اندروید و iOS با Flutter و React Native؛ از MVP تا انتشار در استورها.',
        'iOS & Android apps built with Flutter and React Native — from MVP all the way to the stores.',
      ),
      tags: ['Flutter', 'React Native', 'Firebase', 'Push', 'Offline-first'],
    },
    {
      icon: 'design',
      title: l('طراحی رابط و تجربهٔ کاربری', 'UI / UX & Product Design'),
      text: l(
        'تحقیق کاربر، وایرفریم، پروتوتایپ و دیزاین‌سیستم در فیگما؛ رابط‌هایی که کار با آن‌ها لذت‌بخش است.',
        'Research, wireframes, prototypes and design systems in Figma — interfaces people genuinely enjoy.',
      ),
      tags: ['Figma', 'Prototyping', 'Design Systems', 'User Research'],
    },
    {
      icon: 'shop',
      title: l('فروشگاه اینترنتی و وب‌اپلیکیشن', 'E-commerce & Web Apps'),
      text: l(
        'فروشگاه آنلاین، داشبورد و پلتفرم‌های SaaS با درگاه پرداخت امن و بک‌اند قدرتمند.',
        'Online stores, dashboards and SaaS platforms with secure payments and rock-solid back-ends.',
      ),
      tags: ['Node.js', 'Laravel', 'PostgreSQL', 'Payments', 'Dashboards'],
    },
    {
      icon: 'motion',
      title: l('موشن، سه‌بعدی و وب خلاق', 'Motion, 3D & Creative Web'),
      text: l(
        'تجربه‌های تعاملی با WebGL، Three.js و GSAP؛ درست مثل همین سایتی که الان در حال اسکرولش هستید.',
        'Immersive WebGL, Three.js and GSAP experiences — just like the one you are scrolling right now.',
      ),
      tags: ['Three.js', 'WebGL', 'GSAP', 'Shaders', 'Interaction'],
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
      slug: 'nava',
      sample: true,
      title: l('نوا', 'Nava'),
      category: l('اپلیکیشن پخش موسیقی', 'Music streaming app'),
      year: 2025,
      client: l('نوا مدیا', 'Nava Media'),
      role: l('طراحی محصول، توسعهٔ Flutter', 'Product design, Flutter development'),
      kind: 'app',
      stack: ['Flutter', 'Firebase', 'Node.js', 'Figma'],
      summary: l(
        'اپلیکیشن پخش موسیقی برای هنرمندان مستقل ایرانی با پخش آفلاین و متن زندهٔ ترانه‌ها.',
        'A music streaming app for independent Persian artists, with offline listening and live lyrics.',
      ),
      challenge: l(
        'هنرمندان مستقل جایی برای دیده شدن نداشتند و شنونده‌ها با اینترنت ناپایدار، تجربهٔ پخش خوبی نداشتند.',
        'Independent artists had nowhere to be discovered, and listeners on unstable connections had a poor playback experience.',
      ),
      solution: l(
        'یک اپ آفلاین‌محور با کش هوشمند، پلیر روان با متن همگام ترانه و پنل ساده برای انتشار آثار توسط خود هنرمندان.',
        'An offline-first app with smart caching, a fluid player with synced lyrics, and a simple dashboard where artists publish their own releases.',
      ),
      results: [
        { value: l('۱۲۰هزار+', '120K+'), label: l('نصب', 'Downloads') },
        { value: l('۴٫۸', '4.8'), label: l('امتیاز کاربران', 'Store rating') },
        { value: l('۳۸٪', '38%'), label: l('افزایش ماندگاری', 'Retention uplift') },
      ],
      colors: ['#7b5cff', '#ff4d8d'],
    },
    {
      slug: 'saffron',
      sample: true,
      title: l('زعفران‌زار', 'Saffron House'),
      category: l('فروشگاه اینترنتی', 'E-commerce'),
      year: 2025,
      client: l('زعفران‌زار', 'Saffron House'),
      role: l('طراحی UI/UX، توسعهٔ فول‌استک', 'UI/UX design, full-stack development'),
      kind: 'web',
      stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind'],
      summary: l(
        'فروشگاه آنلاین زعفران ممتاز با فروش داخلی و صادراتی، در سه زبان.',
        'A premium saffron store selling locally and abroad, in three languages.',
      ),
      challenge: l(
        'فروش آنلاین برند فقط ۱۰٪ کل فروش بود و سایت قبلی روی موبایل کند و غیرقابل‌اعتماد به نظر می‌رسید.',
        'Online sales were only 10% of revenue, and the old site felt slow and untrustworthy on mobile.',
      ),
      solution: l(
        'هویت بصری لوکس، صفحات محصول داستان‌محور، پرداخت یک‌مرحله‌ای و بهینه‌سازی کامل سرعت و سئو.',
        'A luxurious visual language, story-driven product pages, one-step checkout and a full speed & SEO overhaul.',
      ),
      results: [
        { value: l('۲۱۰٪+', '+210%'), label: l('رشد فروش آنلاین', 'Online sales') },
        { value: l('۱٫۲ ثانیه', '1.2s'), label: l('زمان بارگذاری', 'Largest paint') },
        { value: l('۳', '3'), label: l('زبان', 'Languages') },
      ],
      colors: ['#ffb23f', '#e0344b'],
    },
    {
      slug: 'atlas',
      sample: true,
      title: l('اطلس', 'Atlas'),
      category: l('داشبورد SaaS', 'SaaS dashboard'),
      year: 2024,
      client: l('اطلس لجستیک', 'Atlas Logistics'),
      role: l('طراحی محصول، فرانت‌اند', 'Product design, front-end'),
      kind: 'web',
      stack: ['React', 'TypeScript', 'D3.js', 'NestJS'],
      summary: l(
        'داشبورد تحلیلی لحظه‌ای برای مدیریت ناوگان و ارسال مرسوله.',
        'A real-time analytics dashboard for fleet and shipment management.',
      ),
      challenge: l(
        'مدیران عملیات بین ده‌ها اکسل و سیستم قدیمی گم شده بودند و تصمیم‌گیری ساعت‌ها طول می‌کشید.',
        'Operations managers were lost between dozens of spreadsheets and legacy tools; decisions took hours.',
      ),
      solution: l(
        'یک داشبورد یکپارچه با نقشهٔ زنده، هشدارهای هوشمند و گزارش‌های قابل‌سفارشی‌سازی.',
        'One unified dashboard with a live map, smart alerts and customizable reports.',
      ),
      results: [
        { value: l('۶۰٪', '60%'), label: l('تصمیم‌گیری سریع‌تر', 'Faster decisions') },
        { value: l('۲۴/۷', '24/7'), label: l('پایش زنده', 'Live monitoring') },
        { value: l('۱۵+', '15+'), label: l('سیستم یکپارچه‌شده', 'Integrations') },
      ],
      colors: ['#37f0cf', '#2b6bff'],
    },
    {
      slug: 'mehr',
      sample: true,
      title: l('کلینیک مهر', 'Mehr Clinic'),
      category: l('اپلیکیشن نوبت‌دهی', 'Booking app'),
      year: 2024,
      client: l('کلینیک مهر', 'Mehr Clinic'),
      role: l('طراحی و توسعهٔ React Native', 'Design & React Native development'),
      kind: 'app',
      stack: ['React Native', 'Expo', 'Laravel', 'MySQL'],
      summary: l(
        'نوبت‌دهی آنلاین، پرونده سلامت و یادآور دارو برای بیماران یک کلینیک چندتخصصی.',
        'Online booking, health records and medication reminders for a multi-specialty clinic.',
      ),
      challenge: l(
        'صف‌های تلفنی طولانی و نوبت‌های ازدست‌رفته، هم بیماران و هم پذیرش را خسته کرده بود.',
        'Long phone queues and missed appointments were exhausting both patients and front-desk staff.',
      ),
      solution: l(
        'اپی ساده و قابل‌دسترس برای همهٔ سنین، با رزرو سه‌کلیکی و یادآورهای خودکار.',
        'A simple, accessible app for every age group, with three-tap booking and automatic reminders.',
      ),
      results: [
        { value: l('۷۰٪', '70%'), label: l('کاهش تماس تلفنی', 'Fewer phone calls') },
        { value: l('۴۵٪', '45%'), label: l('کاهش غیبت بیماران', 'Fewer no-shows') },
        { value: l('۳۰هزار+', '30K+'), label: l('کاربر فعال', 'Active users') },
      ],
      colors: ['#3ddc97', '#1b8cff'],
    },
    {
      slug: 'noor',
      sample: true,
      title: l('نور', 'Noor'),
      category: l('وب‌سایت سه‌بعدی برند', 'Immersive 3D brand site'),
      year: 2023,
      client: l('نور لایتینگ', 'Noor Lighting'),
      role: l('کارگردانی خلاق، WebGL', 'Creative direction, WebGL'),
      kind: 'web',
      stack: ['Three.js', 'GSAP', 'Astro', 'Blender'],
      summary: l(
        'تجربهٔ تعاملی سه‌بعدی برای معرفی محصولات یک برند روشنایی.',
        'An interactive 3D experience showcasing the products of a lighting brand.',
      ),
      challenge: l(
        'محصولات این برند در عکس معمولی جلوه‌ای نداشتند؛ حس نور باید تجربه می‌شد، نه دیده.',
        'The products looked flat in regular photos — light had to be experienced, not just seen.',
      ),
      solution: l(
        'صحنه‌های WebGL که با اسکرول روشن و خاموش می‌شوند و کاربر می‌تواند نور هر محصول را خودش تنظیم کند.',
        'Scroll-driven WebGL scenes that light up as you move, letting visitors tune each product’s light themselves.',
      ),
      results: [
        { value: l('۴ دقیقه', '4 min'), label: l('میانگین حضور', 'Avg. session') },
        { value: l('۳×', '3×'), label: l('درخواست همکاری', 'Dealer requests') },
        { value: l('جایزه', 'Award'), label: l('معرفی در گالری‌های طراحی', 'Design gallery feature') },
      ],
      colors: ['#ffe45c', '#ff7a1a'],
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
        'نقشهٔ سایت، وایرفریم و طراحی دقیق در فیگما. با هم آن‌قدر جلو می‌رویم تا دقیقاً همان چیزی شود که می‌خواهید.',
        'Sitemap, wireframes and pixel-perfect UI in Figma. We iterate together until it feels exactly right.',
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
        'تست روی همهٔ دستگاه‌ها، بهینه‌سازی سرعت و سئو و سپس یک انتشار بی‌دردسر.',
        'Testing on every device, performance and SEO tuning, then a smooth go-live.',
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

export type JourneyKind = 'work' | 'talk' | 'open-source' | 'teaching' | 'award' | 'education';

export const journeyKinds: Record<JourneyKind, L> = {
  work: l('کار', 'Work'),
  talk: l('سخنرانی', 'Talk'),
  'open-source': l('متن‌باز', 'Open source'),
  teaching: l('آموزش', 'Teaching'),
  award: l('جایزه', 'Award'),
  education: l('تحصیل', 'Education'),
};

export const journey = {
  label: l('فعالیت‌ها', 'Activities'),
  title: l('مسیر و *فعالیت‌ها*', 'Journey & *activities*'),
  items: [
    { year: '2026', kind: 'work', title: l('طراح و توسعه‌دهندهٔ مستقل', 'Independent Designer & Developer'), place: l('فریلنس', 'Freelance'), sample: true },
    { year: '2025', kind: 'talk', title: l('سخنرانی: وب خلاق با WebGL', 'Talk: Creative Web with WebGL'), place: l('رویداد برنامه‌نویسان تهران', 'Tehran Dev Meetup'), sample: true },
    { year: '2024', kind: 'work', title: l('توسعه‌دهندهٔ ارشد فرانت‌اند', 'Senior Front-end Developer'), place: l('استارتاپ فین‌تک', 'Fintech startup'), sample: true },
    { year: '2023', kind: 'open-source', title: l('کیت رابط کاربری فارسی و راست‌چین', 'Persian RTL UI kit'), place: l('گیت‌هاب', 'GitHub'), sample: true },
    { year: '2022', kind: 'teaching', title: l('مدرس دورهٔ توسعهٔ وب مدرن', 'Instructor — Modern Web Development'), place: l('دورهٔ آنلاین', 'Online course'), sample: true },
    { year: '2020', kind: 'education', title: l('کارشناسی مهندسی کامپیوتر', 'B.Sc. Computer Engineering'), place: l('دانشگاه', 'University'), sample: true },
  ] as { year: string; kind: JourneyKind; title: L; place: L; sample?: boolean }[],
};

/* ───────────────────────── Tools (marquee) ───────────────────────── */

export const tools = {
  label: l('ابزارها و تکنولوژی‌ها', 'Tools & technologies'),
  rows: [
    ['TypeScript', 'React', 'Next.js', 'Vue', 'Nuxt', 'Astro', 'Tailwind CSS', 'Three.js', 'GSAP', 'WebGL'],
    ['Flutter', 'React Native', 'Node.js', 'NestJS', 'Laravel', 'PostgreSQL', 'Docker', 'Figma', 'Firebase', 'Git'],
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
        'هر پروژه با یک دورهٔ پشتیبانی رایگان تحویل داده می‌شود. بعد از آن هم می‌توانیم برای نگهداری، به‌روزرسانی و رشد محصول قرارداد ماهانه داشته باشیم.',
        'Every project ships with a free support period. After that we can continue with a monthly plan for maintenance, updates and growth.',
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
      l('اپلیکیشن موبایل', 'Mobile app'),
      l('طراحی UI/UX', 'UI/UX design'),
      l('فروشگاه اینترنتی', 'E-commerce'),
      l('وب سه‌بعدی', '3D / creative web'),
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
  results: l('نتیجه', 'Results'),
  visit: l('مشاهدهٔ پروژه', 'Visit live site'),
  next: l('پروژهٔ بعدی', 'Next project'),
  prevQuote: l('نظر قبلی', 'Previous testimonial'),
  nextQuote: l('نظر بعدی', 'Next testimonial'),
  copy: l('کپی ایمیل', 'Copy email'),
  copied: l('ایمیل کپی شد!', 'Email copied!'),
  backTop: l('بازگشت به بالا', 'Back to top'),
  rights: l('تمام حقوق محفوظ است.', 'All rights reserved.'),
  madeIn: l('طراحی و توسعه با عشق در تهران', 'Designed & built with love in Tehran'),
  sample: l('نمونه', 'Sample'),
  socials: l('شبکه‌های اجتماعی', 'Socials'),
  chooseSection: l('بخش‌ها', 'Sections'),
};
