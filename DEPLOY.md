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

رکوردهای فعلی DNS در ابر آروان:

| نام | نوع | مقدار | پروکسی آروان | کاربرد |
| --- | --- | --- | --- | --- |
| `@` | `A` | آی‌پی سرور سایت | خاموش | سایت |
| `www` | `A` | آی‌پی سرور سایت | خاموش | سایت (به `raminomrani.ir` منتقل می‌شود) |
| `payamak` | `CNAME` | `panel.payamak-panel.com` | خاموش | پنل نمایندگی ملی پیامک، روی سرورهای خود ملی پیامک |

موقع عوض کردن سرور فقط `@` و `www` عوض می‌شوند؛ رکورد `payamak` به سرور ما ربطی ندارد و نباید دست بخورد.

## ۳. ساختن فایل‌های سایت

روی کامپیوتر خودتان (Node.js نسخهٔ ۲۲ لازم است)، در پوشهٔ پروژه:

```bash
npm run build:site
```

خروجی پوشهٔ `site` است: همهٔ نسخه‌ها، اپلیکیشن، صفحهٔ ۴۰۴، `robots.txt` و `sitemap.xml`. **همین پوشه را روی سرور می‌گذارید.**

## ۴. راه‌اندازی روی سرور

### گزینهٔ ۱: VPS لینوکس (Nginx) — مستقیم از گیت‌هاب، با یک دستور

بستهٔ آمادهٔ سایت همیشه در مخزن است ([`release/raminomrani-site.tar.gz`](release/raminomrani-site.tar.gz)) و داخلش کل سایت و اسکریپت راه‌اندازی هست. روی سرور (با SSH) فقط همین را بزنید:

```bash
cd /root && curl -fL -o raminomrani-site.tar.gz https://raw.githubusercontent.com/RaminOmrani/personal_website/HEAD/release/raminomrani-site.tar.gz && tar -xzf raminomrani-site.tar.gz && cd raminomrani-site && sudo bash setup-server.sh
```

اگر سرور به گیت‌هاب دسترسی نداشت، همان فایل را از گیت‌هاب دانلود کنید و با WinSCP یا `scp` در `/root` سرور بگذارید، بعد دستور بالا را از `tar -xzf` به بعد بزنید.

اسکریپت [`deploy/setup-server.sh`](deploy/setup-server.sh) این کارها را خودش انجام می‌دهد:
   - Nginx و Certbot را نصب می‌کند.
   - سایت را در `/var/www/raminomrani.ir` می‌گذارد.
   - تنظیمات [`deploy/nginx/raminomrani.ir.conf`](deploy/nginx/raminomrani.ir.conf) را فعال می‌کند.
   - اگر فایروال (ufw) روشن باشد، پورت‌های ۸۰ و ۴۴۳ را باز می‌کند.
   - وقتی دامنه به سرور رسید، گواهی رایگان HTTPS را می‌گیرد. تمدیدش هم خودکار است.
4. اگر دامنه هنوز به سرور نرسیده بود، اسکریپت خودش می‌گوید. چند ساعت بعد این را بزنید:
   ```bash
   sudo bash setup-server.sh --https
   ```
5. **برای به‌روزرسانی‌های بعدی** فقط این را روی سرور بزنید. آخرین نسخه را از گیت‌هاب می‌گیرد و نصب می‌کند؛ تنظیمات Nginx و HTTPS دست نمی‌خورند:
   ```bash
   sudo bash /root/raminomrani-site/setup-server.sh --update
   ```

بعد از چند روز که همه‌چیز درست کار کرد، می‌توانید HSTS را روشن کنید:
1. در `/etc/nginx/sites-available/raminomrani.ir.conf`، خط `Strict-Transport-Security` را از حالت کامنت دربیاورید.
2. `sudo systemctl reload nginx` بزنید.

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

## ۶. اپ اندروید (PWABuilder) و انتشار در بازار، مایکت و گوگل‌پلی

راهنمای کامل، متن‌های صفحهٔ فروشگاه، آیکون ۵۱۲ با نام اپ و اسکرین‌شات‌ها در پوشهٔ [`store/`](store/README.md) است. خلاصه:

1. در [pwabuilder.com](https://www.pwabuilder.com) آدرس `https://raminomrani.ir/app/` را بدهید → **Package For Stores → Android**، با Package ID `ir.raminomrani.app` و کلید امضای جدید. فایل کلید (`signing.keystore`) و اطلاعاتش را در دو جای امن نگه دارید.
2. اثر انگشت کلید (`sha256_cert_fingerprints` در `assetlinks.json` داخل zip) در [`deploy/android.json`](deploy/android.json) می‌رود. سایت خودش `https://raminomrani.ir/.well-known/assetlinks.json` را می‌سازد، همراه ورودی `cafebazaar_twa` که بازار برای تأیید اپ‌های TWA می‌خواهد.
3. سیاست حریم خصوصی برای فروشگاه‌ها: `https://raminomrani.ir/privacy/`
4. APK را در بازار و مایکت، و AAB را در گوگل‌پلی منتشر کنید. لینک صفحهٔ اپ در هر فروشگاه که در `deploy/android.json` گذاشته شود، دکمه‌اش خودکار در صفحهٔ اول سایت و تنظیمات اپ ظاهر می‌شود.
5. دانلود مستقیم: فایل APK را با نام `raminomrani.apk` در `/var/www/raminomrani.ir/downloads/` بگذارید؛ با `--update` پاک نمی‌شود.
6. **iOS (اختیاری):** PWABuilder پروژهٔ Xcode می‌سازد، اما برای انتشار، مک و حساب Apple Developer لازم است. کاربر آیفون می‌تواند همان `raminomrani.ir/app/` را در Safari با Share → Add to Home Screen نصب کند.

**نکتهٔ مهم:** اپ اندروید همان صفحهٔ زندهٔ `raminomrani.ir/app/` را باز می‌کند. پس هر تغییری در محتوا (پروژهٔ جدید، متن، عکس) بعد از آپلود سایت خودکار در اپ هم دیده می‌شود. فقط وقتی نام، آیکن یا شناسهٔ اپ عوض شود، باید دوباره در فروشگاه منتشر کنید.

لوگو، نسخه‌های آن و راهنمای هویت بصری در پوشهٔ [`brand/`](brand/README.md) است.

## ۷. به‌روزرسانی‌های بعدی

1. متن‌ها و پروژه‌ها را ویرایش کنید (فایل‌ها در README معرفی شده‌اند).
2. `npm run package:site` بزنید. این دستور `release/raminomrani-site.tar.gz` را دوباره می‌سازد. بعد commit و push کنید.
3. روی سرور بزنید: `sudo bash /root/raminomrani-site/setup-server.sh --update`. سایت در چند ثانیه عوض می‌شود.

</div>
