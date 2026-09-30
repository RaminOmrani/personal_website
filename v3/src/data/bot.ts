/**
 * فورواردبات، بازسازی‌شده از متن‌ها و دکمه‌های واقعی خود ربات
 * (telkap/i18n.py، handlers/guide.py، handlers/wallet.py و handlers/forward.py).
 * در دموی داخل سایت، هر دکمه همان جوابی را می‌دهد که ربات واقعی می‌دهد.
 *
 * ForwardBot, rebuilt from the real bot's own texts and buttons; on the English page
 * the same screens are shown in English: l(persian, english).
 */
import { bilingual, l, useLang, type Lang, type Src } from '../i18n';

export interface BotReply {
  text: string[];
  /** Inline buttons under the reply */
  inline?: string[];
}

type Key = 'new' | 'jobs' | 'forward' | 'account' | 'plans' | 'wallet' | 'guide' | 'support';

export interface Bot {
  name: string;
  status: string;
  typing: string;
  menuLabel: string;
  welcome: BotReply;
  /** The reply keyboard, row by row. */
  menu: { key: Key; label: string }[][];
  replies: Record<Key, BotReply>;
}

const src: Src<Bot> = {
  name: l('فورواردبات', 'ForwardBot'),
  status: l('ربات', 'bot'),
  typing: l('در حال نوشتن…', 'typing…'),
  menuLabel: l('منوی ربات', 'Bot menu'),

  welcome: {
    text: l(
      [
        '<b>🤖 ربات کپی محتوای تلگرام</b>',
        'پست‌های کانال‌ها را به‌صورت خودکار و لحظه‌ای، با تغییرات دلخواه، در کانال خودتان منتشر کنید.',
        'از دکمه‌های زیر شروع کنید 👇',
      ],
      ['<b>🤖 Telegram content copy bot</b>', 'Republish posts from other channels to your own — automatically, instantly and with the changes you want.', 'Start with the buttons below 👇'],
    ),
  },

  menu: [
    [
      { key: 'new', label: l('➕ کار جدید', '➕ New job') },
      { key: 'jobs', label: l('📋 کارهای کپی', '📋 My copy jobs') },
    ],
    [
      { key: 'forward', label: l('↪️ فوروارد پیشرفته', '↪️ Advanced forward') },
      { key: 'account', label: l('👤 حساب کاربری', '👤 Account') },
    ],
    [
      { key: 'plans', label: l('💳 خرید اشتراک', '💳 Buy a plan') },
      { key: 'wallet', label: l('👛 کیف پول و دعوت', '👛 Wallet & invites') },
    ],
    [
      { key: 'guide', label: l('📚 راهنما', '📚 Guide') },
      { key: 'support', label: l('🛟 پشتیبانی', '🛟 Support') },
    ],
  ],

  replies: {
    new: {
      text: l(['<b>➕ ساخت کار جدید</b>', '📥 آیدی یا لینک کانال <b>مبدا</b> را بفرستید.'], ['<b>➕ Create a new job</b>', '📥 Send the username or link of the <b>source</b> channel.']),
    },
    jobs: { text: l(['هنوز کاری نساخته‌اید. «➕ کار جدید» را بزنید.'], ['You haven’t created any jobs yet. Tap “➕ New job”.']) },
    forward: {
      text: l(['📤 آیدی یا لینک کانال مقصد فوروارد پیشرفته را بفرستید.', 'انصراف: /cancel'], ['📤 Send the username or link of the destination channel for advanced forwarding.', 'Cancel: /cancel']),
    },
    account: {
      text: l(['<b>👤 حساب کاربری</b>'], ['<b>👤 Account</b>']),
      inline: l(['🔐 اتصال اکانت', '📊 سهمیه و اعتبار من', '🧾 گزارش فعالیت', '📬 خلاصه‌ی روزانه'], ['🔐 Connect an account', '📊 My quota & credit', '🧾 Activity log', '📬 Daily digest']),
    },
    plans: {
      text: l(['<b>💳 طرح‌های اشتراک</b>', 'یک طرح را انتخاب کنید:'], ['<b>💳 Subscription plans</b>', 'Choose a plan:']),
      inline: l(['اشتراک آزمایشی', 'اشتراک ۷ روزه', 'اشتراک ۱۴ روزه', 'اشتراک ۳۰ روزه', 'طرح اختصاصی'], ['Free trial', '7-day plan', '14-day plan', '30-day plan', 'Custom plan']),
    },
    wallet: {
      text: l(
        ['<b>👛 کیف پول</b>', 'موجودی شما: <b>۰ تومان</b>', 'کیف پولتان خالی است. با دعوت دوستان پُرش کنید: از هر خریدی که دوستانتان بزنند، سهمی به شما می‌رسد.'],
        ['<b>👛 Wallet</b>', 'Your balance: <b>0 toman</b>', 'Your wallet is empty. Fill it up by inviting friends: you get a share of every purchase they make.'],
      ),
      inline: l(['🎁 دعوت دوستان'], ['🎁 Invite friends']),
    },
    guide: {
      text: l(
        [
          '<b>📚 راهنمای ربات</b>',
          'این ربات پست‌های هر کانالی را به‌صورت خودکار و لحظه‌ای، با تغییرات دلخواه شما، در کانال خودتان منتشر می‌کند.',
          'اگر تازه‌کارید، از «🚀 شروع سریع» بروید.',
        ],
        ['<b>📚 Bot guide</b>', 'This bot republishes posts from any channel to your own — automatically, instantly and with the changes you choose.', 'New here? Start with “🚀 Quick start”.'],
      ),
      inline: l(['🚀 شروع سریع', '❓ سؤال‌های پرتکرار'], ['🚀 Quick start', '❓ FAQ']),
    },
    support: {
      text: l(
        ['<b>🛟 پشتیبانی</b>', 'سؤالی دارید یا مشکلی پیش آمده؟ پیامتان را بنویسید؛ یک <b>شماره‌ی پیگیری</b> می‌گیرید و پاسخ در همین ربات برایتان می‌آید.'],
        ['<b>🛟 Support</b>', 'Have a question or hit a problem? Write your message: you’ll get a <b>tracking number</b>, and the answer arrives right here in the bot.'],
      ),
      inline: l(['✍️ ارسال پیام به پشتیبانی'], ['✍️ Message support']),
    },
  },
};

export const bot: Record<Lang, Bot> = bilingual(src);

/** The bot demo's texts in the page's language. */
export const useBot = () => bot[useLang()];
