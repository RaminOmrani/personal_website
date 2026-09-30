<div dir="rtl">

# راهنمای انتشار raminomrani.ir

همهٔ کارهای فنی آماده است؛ این فایل فقط کارهای دستی را قدم‌به‌قدم می‌گوید. ساختار سایت روی دامنه:

| آدرس | چه چیزی |
| --- | --- |
| `raminomrani.ir/` | صفحهٔ انتخاب نسخه (فارسی و انگلیسی) |
| `raminomrani.ir/v1/` ، `/v2/` ، `/v3/` | سه نسخهٔ سایت. انگلیسی: `v1/?lang=en` ، `v2/en` ، `v3/en` |
| `raminomrani.ir/app/` | اپلیکیشن قابل نصب (PWA) که با PWABuilder به اپ اندروید تبدیل می‌شود |

## ۱. چه سروری لازم است؟

سایت **کاملاً استاتیک** است: فقط فایل HTML، CSS، JS، فونت و عکس، بدون دیتابیس و بدون PHP. کل سایت حدود ۱۵ مگابایت است، پس کوچک‌ترین پلن هر سرویس کافی است. تنها شرط جدی: **HTTPS** (بدون آن اپلیکیشن نصب نمی‌شود).

پیشنهاد من، به ترتیب:

1. **یک VPS لینوکسی کوچک داخل ایران** (Ubuntu 24.04، یک هسته، ۱ گیگ رم، ۱۰ تا ۲۰ گیگ دیسک) با Nginx و گواهی رایگان Let's Encrypt.
   - برای بازدیدکنندهٔ ایرانی سریع است و وقتی اینترنت بین‌الملل قطع یا کند است هم باز می‌شود.
   - کنترل کامل روی تنظیمات دارید (لازم برای اپ اندروید). تنظیمات آماده: [`deploy/nginx/raminomrani.ir.conf`](deploy/nginx/raminomrani.ir.conf)
2. **هاست اشتراکی لینوکسی با cPanel یا DirectAdmin** (هر هاست ایرانی معتبر) با SSL رایگان.
   - ساده‌ترین راه: فقط آپلود. فایل `.htaccess` خودش داخل پوشهٔ `site` است.
3. **همان VPS ویندوزی پارس‌پک که CRM رویش است (IIS)**.
   - هزینهٔ اضافه ندارد. تنظیمات آماده: [`deploy/iis/web.config`](deploy/iis/web.config)
   - فقط یادتان باشد آن سرور، سرور اصلی CRM است.

اختیاری: CDN ابر آروان را جلوی هر کدام بگذارید تا سرعت و محافظت بیشتر شود.

## ۲. دامنه

1. `raminomrani.ir` را در [nic.ir](https://nic.ir) ثبت کنید (قبلش آزاد بودنش را چک کنید).
2. در پنل ایرنیک، DNS سرورهای دامنه را بگذارید: یا DNSهای شرکت هاست، یا یک سرویس DNS مثل ابر آروان.
3. در همان سرویس DNS دو رکورد بسازید:
   - رکورد `A` برای `@` → آی‌پی سرور
   - رکورد `A` برای `www` → همان آی‌پی (یا `CNAME` برای `www` → `raminomrani.ir`)
4. چند ساعت صبر کنید تا دامنه روی آی‌پی بنشیند (`ping raminomrani.ir` باید آی‌پی سرور را نشان دهد).

## ۳. ساختن فایل‌های سایت

روی کامپیوتر خودتان (Node.js نسخهٔ ۲۲ لازم است)، در پوشهٔ پروژه:

```bash
npm run build:site
```

خروجی پوشهٔ `site` است: همهٔ نسخه‌ها، اپلیکیشن، صفحهٔ ۴۰۴، `robots.txt` و `sitemap.xml`. **همین پوشه را روی سرور می‌گذارید.**

## ۴. راه‌اندازی روی سرور

### گزینهٔ ۱: VPS لینوکس (Nginx)

روی سرور (با SSH):

```bash
sudo apt update && sudo apt install -y nginx certbot python3-certbot-nginx
sudo mkdir -p /var/www/raminomrani.ir
```

محتوای پوشهٔ `site` را در `/var/www/raminomrani.ir` آپلود کنید:
- **از ویندوز:** با برنامهٔ WinSCP (کشیدن و رها کردن)، یا در PowerShell: `scp -r .\site\* root@IP:/var/www/raminomrani.ir/`
- **از لینوکس یا مک:** `DEPLOY_TARGET=root@IP ./scripts/deploy.sh` (خودش می‌سازد و آپلود می‌کند)

بعد فایل تنظیمات را روی سرور کپی و فعال کنید:

```bash
sudo cp raminomrani.ir.conf /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/raminomrani.ir.conf /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d raminomrani.ir -d www.raminomrani.ir
```

`certbot` خودش HTTPS را فعال می‌کند و هر سه ماه گواهی را تمدید می‌کند. بعد از چند روز که همه‌چیز درست کار کرد، خط `Strict-Transport-Security` را در فایل تنظیمات از حالت کامنت دربیاورید و دوباره `sudo systemctl reload nginx` بزنید.

### گزینهٔ ۲: هاست cPanel

1. در File Manager، وارد `public_html` شوید.
2. محتوای پوشهٔ `site` را آپلود کنید. ساده‌ترین راه: پوشه را zip کنید، zip را آپلود کنید و همان‌جا Extract بزنید. فایل `.htaccess` هم باید کنار `index.html` باشد؛ در File Manager گزینهٔ Show Hidden Files را روشن کنید تا ببینیدش.
3. در بخش SSL/TLS Status یا Let's Encrypt، برای `raminomrani.ir` و `www` گواهی بگیرید.
4. اگر قبل از فعال شدن SSL سایت باز نشد، سه خط بخش HTTPS در `.htaccess` را موقتاً با `#` غیرفعال کنید و بعد از فعال شدن گواهی برگردانید.

### گزینهٔ ۳: ویندوز سرور (IIS)

1. ماژول رایگان **URL Rewrite** مایکروسافت را روی IIS نصب کنید.
2. محتوای `site` را در یک پوشه (مثلاً `C:\inetpub\raminomrani.ir`) کپی کنید و فایل [`deploy/iis/web.config`](deploy/iis/web.config) را کنار `index.html` بگذارید.
3. در IIS Manager یک Site جدید با همین پوشه بسازید، با Binding برای `raminomrani.ir` و `www.raminomrani.ir` روی پورت ۸۰.
4. گواهی رایگان را با برنامهٔ **win-acme** بگیرید (Binding پورت ۴۴۳ را خودش می‌سازد و تمدید هم می‌کند).

## ۵. بعد از انتشار، این‌ها را چک کنید

- [ ] `https://raminomrani.ir` صفحهٔ انتخاب نسخه را نشان می‌دهد، با قفل سبز.
- [ ] هر سه نسخه باز می‌شوند، هر کدام فارسی و انگلیسی (`/v3/en` هم باید کار کند).
- [ ] `http://` و `www.` خودکار به `https://raminomrani.ir` می‌روند.
- [ ] یک آدرس اشتباه مثل `raminomrani.ir/abc` صفحهٔ ۴۰۴ فارسی/انگلیسی را نشان می‌دهد.
- [ ] روی گوشی اندرویدی، `raminomrani.ir/app/` را در Chrome باز کنید؛ گزینهٔ «نصب برنامه» یا Add to Home screen باید بیاید.
- [ ] در [PageSpeed Insights](https://pagespeed.web.dev) سرعت را ببینید.
- [ ] سایت را در [Google Search Console](https://search.google.com/search-console) ثبت کنید و `https://raminomrani.ir/sitemap.xml` را بدهید.

## ۶. ساختن اپ اندروید با PWABuilder

1. به [pwabuilder.com](https://www.pwabuilder.com) بروید و آدرس `https://raminomrani.ir/app/` را بدهید.
2. گزارشش را ببینید. manifest، service worker و HTTPS باید سبز باشند.
3. **Package For Stores → Android** را بزنید. مقادیر پیشنهادی:
   - Package ID: `ir.raminomrani.app`
   - App name: `رامین عمرانی`
   - Signing key: گزینهٔ New (خود PWABuilder کلید می‌سازد)
4. فایل zip را دانلود کنید. داخلش این‌هاست:
   - فایل `.aab` برای Google Play
   - فایل `.apk` برای کافه‌بازار، مایکت یا نصب مستقیم
   - فایل کلید امضا و اطلاعاتش. **این دو را جای امنی نگه دارید؛ بدون آن‌ها هیچ‌وقت نمی‌توانید اپ را آپدیت کنید.**
   - فایل `assetlinks.json`
5. فایل `assetlinks.json` را در پروژه در مسیر `chooser/.well-known/assetlinks.json` بگذارید. دوباره `npm run build:site` بزنید و سایت را آپلود کنید، تا از آدرس `https://raminomrani.ir/.well-known/assetlinks.json` باز شود.
   - این فایل ثابت می‌کند اپ مال همین سایت است. بدون آن، بالای اپ نوار آدرس مرورگر دیده می‌شود.
   - اگر در Google Play گزینهٔ Play App Signing را فعال کردید، اثر انگشت SHA-256 کلیدی را که گوگل در Play Console (بخش App integrity) نشان می‌دهد هم به همین فایل اضافه کنید.
6. APK را در کافه‌بازار یا مایکت، و AAB را در Google Play منتشر کنید.
7. **iOS (اختیاری):** PWABuilder پروژهٔ Xcode می‌سازد، اما برای انتشار، مک و حساب Apple Developer لازم است. کاربر آیفون می‌تواند همان `raminomrani.ir/app/` را در Safari با Share → Add to Home Screen نصب کند.

**نکتهٔ مهم:** اپ اندروید همان صفحهٔ زندهٔ `raminomrani.ir/app/` را باز می‌کند. پس هر تغییری در محتوا (پروژهٔ جدید، متن، عکس) بعد از آپلود سایت خودکار در اپ هم دیده می‌شود. فقط وقتی نام، آیکن یا شناسهٔ اپ عوض شود، باید دوباره در فروشگاه منتشر کنید.

## ۷. به‌روزرسانی‌های بعدی

1. متن‌ها و پروژه‌ها را ویرایش کنید (فایل‌ها در README معرفی شده‌اند).
2. `npm run build:site`
3. پوشهٔ `site` را دوباره آپلود کنید (لینوکس: `DEPLOY_TARGET=root@IP ./scripts/deploy.sh`).

</div>
