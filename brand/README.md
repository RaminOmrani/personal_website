<div dir="rtl">

# هویت بصری رامین عمرانی

راهنمای کامل (ایده، ساختار هندسی، رنگ‌ها، حروف، حریم، کاربردها و موارد نادرست): [`ramin-omrani-brand-guidelines.pdf`](ramin-omrani-brand-guidelines.pdf)

**ایده:** طاقِ جناغی ایرانی («عمرانی» یعنی سازنده) و «ر» رامین که مثل ضرب قلم نی کشیده شده؛ نورِ فیروزه‌ای از پایین درگاه می‌تابد. طاق و ر کنار هم یادآور تگ کد `</>` هم هستند.

## فایل‌ها

همهٔ SVGها متن را به‌صورت شکل (outline) دارند و به هیچ فونتی وابسته نیستند.

| فایل | کاربرد |
| --- | --- |
| `svg/logo-fa.svg` · `png/logo-fa-2000.png` | لوگوی اصلی (فارسی، افقی) روی زمینهٔ روشن |
| `svg/logo-fa-on-dark.svg` | روی زمینهٔ تیره یا لاجوردی |
| `svg/logo-fa-black.svg` · `svg/logo-fa-white.svg` | تک‌رنگ: مهر، چاپ تک‌رنگ، روی عکس |
| `svg/logo-en.svg` · `svg/logo-en-on-dark.svg` | نسخهٔ انگلیسی |
| `svg/logo-stacked.svg` | عمودی (نشانه بالا، نام پایین) |
| `svg/mark.svg` · `png/mark-1024.png` | نشانه (آیکون) |
| `svg/symbol-*.svg` | نماد بدون کاشی: رنگی، روی تیره، مشکی، سفید |
| `svg/favicon.svg` · `png/favicon-*.png` | نسخهٔ پرضخامت برای ۱۶ تا ۴۸ پیکسل |
| `png/store-icon-512.png` | آیکون فروشگاه با نام اپ (بازار، مایکت) |
| `png/app-icon-maskable-512.png` · `png/app-icon-ios-1024.png` | آیکون اندروید و iOS |
| `png/avatar-1080.png` | عکس پروفایل تلگرام، واتس‌اپ و اینستاگرام |

## رنگ‌ها

| نام | HEX |
| --- | --- |
| لاجوردی (اصلی) | `#1F52D6` |
| لاجوردی تیره | `#173FA8` |
| فیروزه‌ای | `#0E9AA7` |
| زعفرانی | `#E9A23B` |
| طلایی | `#F3C46E` |
| جوهری (متن) | `#0F1B2D` |
| کاغذی (زمینه) | `#F6F4EF` |

**حروف:** Estedad برای نام و تیترها، Vazirmatn برای متن، Inter Tight برای لاتین.

## ساختن دوباره

هندسهٔ نشانه در [`tools/geometry.mjs`](tools/geometry.mjs) است. بعد از هر تغییر:

```bash
pip install uharfbuzz fonttools brotli        # یک بار
node brand/tools/build.mjs                    # SVG و PNGها
node brand/tools/guidelines.mjs               # راهنمای PDF
node brand/tools/apply.mjs                    # کپی در سایت‌ها
(cd app && node scripts/make-icons.mjs)       # آیکون‌های اپ
```

</div>
