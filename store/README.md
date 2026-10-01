<div dir="rtl">

# انتشار اپلیکیشن در بازار، مایکت و گوگل‌پلی

همهٔ چیزهایی که فروشگاه‌ها می‌خواهند آماده است. اپ اندروید همان صفحهٔ `https://raminomrani.ir/app/` است که PWABuilder آن را به فایل اندروید (TWA) تبدیل می‌کند؛ پس بعد از انتشار، هر تغییری در سایت خودکار در اپ هم دیده می‌شود.

## چه چیزهایی آماده است

| مورد | کجا |
| --- | --- |
| سیاست حریم خصوصی (فارسی و انگلیسی) | `https://raminomrani.ir/privacy/` |
| فایل تأیید مالکیت دامنه، با ورودی مخصوص بازار (`cafebazaar_twa`) | `https://raminomrani.ir/.well-known/assetlinks.json` |
| آیکون فروشگاه ۵۱۲×۵۱۲ با نام اپ | [`icon-512.png`](icon-512.png) |
| ۵ اسکرین‌شات ۱۰۸۰×۱۹۲۰ با تیتر | [`screenshots/`](screenshots) |
| تصویر شاخص ۱۰۲۴×۵۰۰ (گوگل‌پلی) | [`feature-graphic.png`](feature-graphic.png) |
| لینک دانلود مستقیم APK و لینک فروشگاه‌ها، که خودکار در سایت و اپ نشان داده می‌شوند | [`deploy/android.json`](../deploy/android.json) |
| لوگو و راهنمای هویت بصری | [`brand/`](../brand) |

## قدم‌ها

### ۱. ساختن فایل اندروید در PWABuilder

1. در [pwabuilder.com](https://www.pwabuilder.com) آدرس `https://raminomrani.ir/app/` را بدهید و **Package For Stores → Android → Generate Package** را بزنید.
2. در **Options** این‌ها را بگذارید:
   - Package ID: `ir.raminomrani.app` (دقیقاً همین؛ در فایل تأیید دامنه همین آمده)
   - App name: `رامین عمرانی · طراحی سایت و اپلیکیشن` و Launcher name: `رامین عمرانی`
   - App version: `1.0.0` و App version code: `1` (برای هر آپدیت بعدی در بازار، version code را یکی بیشتر کنید)
   - Host: `raminomrani.ir` و Start URL: `/app/?source=pwa`
   - Display mode: Standalone
   - Notification delegation: **خاموش** و Location delegation: **خاموش** (اپ به این‌ها نیازی ندارد و در حریم خصوصی هم همین نوشته شده)
   - Signing key: **Create new**. نام و سازمان را بنویسید و رمزها را جایی یادداشت کنید.
3. فایل zip را دانلود کنید. **فایل `signing.keystore` و `signing-key-info.txt` را در دو جای امن نگه دارید** (مثلاً گوگل‌درایو و یک فلش). بدون آن‌ها هیچ‌وقت نمی‌توانید اپ را در بازار آپدیت کنید.

### ۲. فرستادن اثر انگشت کلید برای من

محتوای فایل `assetlinks.json` داخل همان zip را برای من بفرستید (فقط یک خط `sha256_cert_fingerprints` لازم است؛ این اطلاعات عمومی است و رمز نیست). من آن را در `deploy/android.json` می‌گذارم و بعد از `--update` روی سرور، آدرس زیر هر دو ورودی را نشان می‌دهد:

`https://raminomrani.ir/.well-known/assetlinks.json`

تا این مرحله انجام نشود، اپ نصب‌شده بالای صفحه نوار آدرس مرورگر را نشان می‌دهد و بازار هم مالکیت دامنه را تأیید نمی‌کند.

### ۳. انتشار در بازار

1. در [پیشخان توسعه‌دهندگان بازار](https://pishkhan.cafebazaar.ir) برنامهٔ جدید بسازید و فایل `.apk` داخل zip را بارگذاری کنید. بازار خودش `assetlinks.json` را چک می‌کند.
2. صفحهٔ برنامه را با متن‌های پایین و تصویرهای این پوشه پر کنید.
3. لینک سیاست حریم خصوصی: `https://raminomrani.ir/privacy/`
4. بعد از تأیید، لینک صفحهٔ اپ در بازار (`https://cafebazaar.ir/app/ir.raminomrani.app`) را برایم بفرستید تا در `deploy/android.json` بگذارم؛ دکمهٔ «دریافت از بازار» خودکار در صفحهٔ اول سایت و تنظیمات اپ ظاهر می‌شود.

مایکت هم همین مراحل را دارد (همان APK و همان متن‌ها). برای گوگل‌پلی فایل `.aab` را بارگذاری کنید و اگر Play App Signing روشن بود، اثر انگشت SHA-256 کلیدِ گوگل (Play Console → App integrity) را هم برایم بفرستید.

### ۴. دانلود مستقیم از سایت (اختیاری)

فایل `.apk` را با نام `raminomrani.apk` در پوشهٔ `/var/www/raminomrani.ir/downloads/` روی سرور بگذارید (با WinSCP یا `scp`). همین که فایل آنجا باشد، دکمهٔ «دانلود مستقیم (APK)» خودکار در سایت و اپ نشان داده می‌شود و با `--update` هم پاک نمی‌شود.

## متن‌های صفحهٔ فروشگاه

**نام برنامه:** رامین عمرانی

**دسته‌بندی:** بازار و مایکت: «ابزارها». گوگل‌پلی: Business.

**توضیح کوتاه** (حداکثر ۸۰ حرف):

> نمونه‌کارها و مشاورهٔ رایگان طراحی سایت، اپلیکیشن، CRM و ربات تلگرام

**توضیح کامل:**

> اپلیکیشن رامین عمرانی، برنامه‌نویس فول‌استک و هوش مصنوعی در مشهد. اگر برای کسب‌وکارتان سایت، اپلیکیشن موبایل، نرم‌افزار CRM، پنل مدیریت یا ربات تلگرام می‌خواهید، اینجا کارهای واقعی را می‌بینید و با یک لمس مشاورهٔ رایگان می‌گیرید.
>
> در این اپ:
> • ۷ پروژهٔ واقعی که همین حالا در حال کارند: کلینیک ذهن سبز، دنگی (تقسیم هزینه‌های گروهی)، پنل آموزشی دوپینگ شیمی، CRM و سوپراپ میلیونر، پشتیبانی با دستیار هوش مصنوعی «میلی» و ربات تلگرام فورواردبات
> • داستان هر پروژه: مشکل مشتری، راه‌حل، تصویرهای واقعی و امکانات
> • خدمات: طراحی سایت، اپلیکیشن موبایل، CRM و پنل مدیریت، ربات تلگرام و هوش مصنوعی
> • تماس سریع با واتس‌اپ، تلگرام یا تلفن؛ معمولاً همان روز جواب می‌گیرید
> • فارسی و انگلیسی، سبک و سریع، و بدون اینترنت هم باز می‌شود
>
> بدون ثبت‌نام، بدون تبلیغ و بدون جمع‌آوری اطلاعات شخصی.

**تغییرات این نسخه (۱٫۰٫۰):**

> اولین نسخه: نمونه‌کارها، خدمات و تماس با یک لمس.

**کلمات کلیدی:** طراحی سایت، ساخت اپلیکیشن، برنامه‌نویس، CRM، ربات تلگرام، هوش مصنوعی، مشهد، نمونه‌کار

**وب‌سایت:** `https://raminomrani.ir`

## English listing (Google Play)

**Short description:** Portfolio and free consultation: websites, apps, CRMs and Telegram bots.

**Full description:**

> The app of Ramin Omrani, a full-stack and AI developer in Mashhad, Iran. See seven real, running projects (a rehabilitation clinic, a group-expense app, a learning platform, a sales CRM and super app, an AI help desk and a Telegram bot), read the story behind each one, and get a free consultation on WhatsApp, Telegram or by phone in one tap. Persian and English, fast, and it works offline. No sign-up, no ads, no personal data collected.

## ساختن دوبارهٔ تصویرها

اگر ظاهر اپ یا لوگو عوض شد:

```bash
node brand/tools/build.mjs && node brand/tools/apply.mjs   # لوگو و آیکون‌ها
(cd app && node scripts/make-icons.mjs && npm run build)    # آیکون‌های اپ
node store/make-store.mjs                                   # تصویرهای همین پوشه
```

</div>
