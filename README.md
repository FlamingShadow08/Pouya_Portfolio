# رزومه پویا پوراسماعیل

وبسایت رزومه مدرن و تعاملی با Next.js

## ویژگی‌ها

- ProfileCard با افکت تیلت سه‌بعدی و هولوگرافیک
- TargetCursor (کرسر سفارشی)
- PulseHeart لایک زیر هر نمونه‌کار (یک‌بار به ازای هر دستگاه)
- ذخیره‌سازی بازدید + لایک + آی‌پی + دستگاه + UUID در SQLite
- مهارت‌ها با نوار پیشرفت رنگی (زرد / نارنجی / سبز)
- تم خیلی تیره با رنگ‌های بنفش و آبی تیره
- کاملاً ریسپانسیو
- همه داده‌ها در `src/data/siteData.json` قابل ویرایش

## نصب و اجرا

```bash
cd resume-website
npm install
npm run dev
```

سایت روی `http://localhost:3000` باز می‌شود.

## ساختار عکس‌ها

```
public/images/
├── profile/
│   └── avatar.jpg          ← عکس پروفایل
├── portfolio/
│   ├── employee-panel.jpg
│   ├── local-uploader.jpg
│   └── personal-ai.jpg
└── certificates/
    ├── cs50x.jpg
    ├── cs50-puzzle.jpg
    └── ai-tehran.jpg
```

فقط فایل‌ها را با همین نام‌ها جایگزین کنید.

## ویرایش محتوا

همه متن‌ها، مهارت‌ها، پروژه‌ها و مدارک در فایل زیر قابل ویرایش هستند:

`src/data/siteData.json`

## دیتابیس

فایل SQLite در مسیر `data/analytics.db` ساخته می‌شود.

جداول:
- `visitors` : uuid, ip, user_agent, device_name, visit_count, ...
- `likes` : visitor_uuid + project_id
- `page_views` : لاگ بازدیدها

بعداً می‌توانید با یک اسکریپت ساده خروجی اکسل بگیرید.

## پکیج‌های اصلی

- next, react, react-dom
- gsap (برای TargetCursor)
- better-sqlite3
- uuid

## نکات

- برای لایک و آمار حتماً سرور (`npm run dev` یا `npm start`) باید در حال اجرا باشد.
- روی موبایل کرسر سفارشی غیرفعال است.
- فونت Vazirmatn از CDN لود می‌شود.
