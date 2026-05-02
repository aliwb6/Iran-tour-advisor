// Event-Iran — Utility functions (Jalali calendar, Persian numerals, provinces, categories)

// ── Persian numerals ─────────────────────────────────────────
const toPersianNum = (n) => String(n).replace(/[0-9]/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);

// ── Gregorian → Jalali conversion ────────────────────────────
function toJalali(gy, gm, gd) {
  var g_d_no, j_d_no, j_np, i;
  var gy2 = gm > 2 ? gy + 1 : gy;
  g_d_no = 365 * gy
    + Math.floor((gy2 + 3) / 4)
    - Math.floor((gy2 + 99) / 100)
    + Math.floor((gy2 + 399) / 400);
  var gDaysInMonth = [31, (gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  for (i = 0; i < gm - 1; i++) g_d_no += gDaysInMonth[i];
  g_d_no += gd - 1;
  j_d_no = g_d_no - 79;
  j_np = Math.floor(j_d_no / 12053);
  j_d_no %= 12053;
  var jy = 979 + 33 * j_np + 4 * Math.floor(j_d_no / 1461);
  j_d_no %= 1461;
  if (j_d_no >= 366) {
    jy += Math.floor((j_d_no - 1) / 365);
    j_d_no = (j_d_no - 1) % 365;
  }
  var jDaysInMonth = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
  for (i = 0; i < 11 && j_d_no >= jDaysInMonth[i]; i++) j_d_no -= jDaysInMonth[i];
  return [jy, i + 1, j_d_no + 1];
}

const jalaliMonths = ['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'];
const jalaliMonthsShort = ['فرو','ارد','خرد','تیر','مرد','شهر','مهر','آبان','آذر','دی','بهمن','اسف'];

function formatJalali(date) {
  const d = date instanceof Date ? date : new Date(date);
  const [jy, jm, jd] = toJalali(d.getFullYear(), d.getMonth() + 1, d.getDate());
  return `${toPersianNum(jd)} ${jalaliMonths[jm - 1]} ${toPersianNum(jy)}`;
}

function formatJalaliShort(date) {
  const d = date instanceof Date ? date : new Date(date);
  const [jy, jm, jd] = toJalali(d.getFullYear(), d.getMonth() + 1, d.getDate());
  return `${toPersianNum(jd)}/${toPersianNum(jm)}/${toPersianNum(jy)}`;
}

// ── Iran Provinces (31) ───────────────────────────────────────
const IRAN_PROVINCES = [
  'آذربایجان شرقی','آذربایجان غربی','اردبیل','اصفهان','البرز',
  'ایلام','بوشهر','تهران','چهارمحال و بختیاری','خراسان جنوبی',
  'خراسان رضوی','خراسان شمالی','خوزستان','زنجان','سمنان',
  'سیستان و بلوچستان','فارس','قزوین','قم','کردستان',
  'کرمان','کرمانشاه','کهگیلویه و بویراحمد','گلستان','گیلان',
  'لرستان','مازندران','مرکزی','هرمزگان','همدان','یزد'
];

// ── Event Categories ──────────────────────────────────────────
const EVENT_CATEGORIES = [
  { id: 'cultural',    label: 'فرهنگی',   color: 'purple' },
  { id: 'art',         label: 'هنری',     color: 'pink'   },
  { id: 'music',       label: 'موسیقی',   color: 'violet' },
  { id: 'sports',      label: 'ورزشی',    color: 'green'  },
  { id: 'religious',   label: 'مذهبی',    color: 'teal'   },
  { id: 'national',    label: 'ملی',      color: 'blue'   },
  { id: 'tourism',     label: 'گردشگری',  color: 'orange' },
  { id: 'educational', label: 'آموزشی',   color: 'yellow' },
  { id: 'business',    label: 'تجاری',    color: 'slate'  },
  { id: 'tech',        label: 'فناوری',   color: 'cyan'   },
  { id: 'charity',     label: 'خیریه',    color: 'rose'   },
];

const CATEGORY_COLORS = {
  purple: { bg: '#F3E8FF', text: '#7E22CE', border: '#D8B4FE' },
  pink:   { bg: '#FCE7F3', text: '#9D174D', border: '#F9A8D4' },
  violet: { bg: '#EDE9FE', text: '#6D28D9', border: '#C4B5FD' },
  green:  { bg: '#D1FAE5', text: '#065F46', border: '#6EE7B7' },
  teal:   { bg: '#CCFBF1', text: '#115E59', border: '#5EEAD4' },
  blue:   { bg: '#DBEAFE', text: '#1E40AF', border: '#93C5FD' },
  orange: { bg: '#FED7AA', text: '#9A3412', border: '#FDBA74' },
  yellow: { bg: '#FEF9C3', text: '#854D0E', border: '#FDE047' },
  slate:  { bg: '#F1F5F9', text: '#334155', border: '#CBD5E1' },
  cyan:   { bg: '#CFFAFE', text: '#155E75', border: '#67E8F9' },
  rose:   { bg: '#FFE4E6', text: '#9F1239', border: '#FDA4AF' },
};

// ── Sample Event Data ─────────────────────────────────────────
const SAMPLE_EVENTS = [
  { id:1, title:'جشنواره بین‌المللی موسیقی فجر', category:'music', province:'تهران',
    startDate: new Date(2025,3,12), endDate: new Date(2025,3,20),
    image: null, attendees: 1240, status: 'active',
    venue: 'تالار وحدت، خیابان سمیه', description: 'بزرگ‌ترین رویداد موسیقی ایران' },
  { id:2, title:'نمایشگاه گردشگری اصفهان', category:'tourism', province:'اصفهان',
    startDate: new Date(2025,4,1), endDate: new Date(2025,4,5),
    image: null, attendees: 3400, status: 'active',
    venue: 'نمایشگاه بین‌المللی اصفهان', description: 'معرفی ظرفیت‌های گردشگری' },
  { id:3, title:'همایش ملی فناوری اطلاعات', category:'tech', province:'تهران',
    startDate: new Date(2025,5,15), endDate: new Date(2025,5,16),
    image: null, attendees: 800, status: 'pending',
    venue: 'مرکز همایش‌های بین‌المللی تهران', description: 'نوآوری و فناوری دیجیتال' },
  { id:4, title:'جشن نوروز شیراز', category:'national', province:'فارس',
    startDate: new Date(2025,2,21), endDate: new Date(2025,3,2),
    image: null, attendees: 5000, status: 'completed',
    venue: 'باغ ارم شیراز', description: 'آیین‌های باستانی نوروز' },
  { id:5, title:'مسابقات ورزشی دانشجویی', category:'sports', province:'مشهد',
    startDate: new Date(2025,6,10), endDate: new Date(2025,6,14),
    image: null, attendees: 600, status: 'active',
    venue: 'مجموعه ورزشی امام رضا (ع)', description: 'المپیاد ورزشی دانشگاه‌ها' },
  { id:6, title:'کنگره بین‌المللی پزشکی', category:'educational', province:'تهران',
    startDate: new Date(2025,7,20), endDate: new Date(2025,7,22),
    image: null, attendees: 450, status: 'pending',
    venue: 'هتل اسپیناس پالاس تهران', description: 'آخرین دستاوردهای علوم پزشکی' },
];

const SAMPLE_ARTICLES = [
  { id:1, title:'راهنمای سفر به شیراز؛ شهر شعر و گل', category:'tourism',
    date: new Date(2025,2,15), readTime: 8, excerpt: 'شیراز، شهر حافظ و سعدی، با باغ‌های تاریخی و معماری خیره‌کننده‌اش، هر ساله میزبان میلیون‌ها گردشگر است.' },
  { id:2, title:'۱۰ جشنواره بهار که نباید از دست بدهید', category:'cultural',
    date: new Date(2025,3,1), readTime: 6, excerpt: 'فهرستی از مهم‌ترین رویدادها و جشنواره‌های فصل بهار در سراسر ایران.' },
  { id:3, title:'اصفهان؛ نصف جهان در آستانه نوروز', category:'national',
    date: new Date(2025,2,20), readTime: 10, excerpt: 'میدان نقش جهان و بازار بزرگ اصفهان در روزهای منتهی به عید نوروز جلوه‌ای دیگر دارند.' },
];

Object.assign(window, {
  toPersianNum, toJalali, formatJalali, formatJalaliShort,
  jalaliMonths, jalaliMonthsShort,
  IRAN_PROVINCES, EVENT_CATEGORIES, CATEGORY_COLORS,
  SAMPLE_EVENTS, SAMPLE_ARTICLES
});
