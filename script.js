/**
 * نظام المعالجة والتحقق البرمجي الرقمي المطور (الإصدار الماسي V12 - الشامل مع الرسوم البيانية)
 * تجمع شباب الشريعة-مديرية البصرة
 */

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').then(reg => {
            console.log('PWA Ready', reg.scope);
        }).catch(err => console.log('PWA Error:', err));
    });
}

const GAS_API_URL = "https://script.google.com/macros/s/AKfycbw4fzCqQInf-Z7Zxui9mfPuj2k_DpOK6ut9kXFOIgnqdl-epib3bofSSbiVfWq7c3o77Q/exec";
const FORMS_API_URL = "https://script.google.com/macros/s/AKfycbzhHhpQmX3xA1rsgCT1qjhwCBsm2GJ2jBZQbUY0k520sjaZPhyGk4J2PPIN92nMP9TxAA/exec"; 

const MEMBERS_DATABASE = {
    "صباح فاضل جاسم": {
        code: "SF-31300", fullName: "صباح فاضل جاسم حسين العواجي", avatar: "https://ibb.co/gZThbDYp", drive: "https://drive.google.com/drive/folders/1Lno5kFx-CJYx_KZAeKYm2egkYM59kPJ_",
        basic: [ { label: "التولد", val: "5/2/2000" }, { label: "رقم الهاتف", val: "07747309173" }, { label: "التحصيل الدراسي", val: "دبلوم" }, { label: "اسم الأم الثلاثي", val: "نجاة عدلان سعيد" }, { label: "الحالة الاجتماعية", val: "متزوج" }, { label: "اسم الزوجة", val: "حليمة عزيز عبد" }, { label: "تولد الزوجة", val: "3/6/2005" }, { label: "أسماء الأبناء", val: "1- فهد صباح فاضل" } ],
        skills: [ { label: "الدورات", val: "لا يوجد" }, { label: "الهوايات", val: "كرة القدم ٫ التصوير ٫محرر اكواد برمجة ٫ التصميم" }, { label: "دورة عسكرية", val: "كلا" }, { label: "إجادة الأسلحة", val: "كلاشنكوف ٫ مسدس" } ],
        housing: [ { label: "معلومات السكن", val: "البصرة قضاء المدينة حي الشهداء" }, { label: "نوع السكن", val: "ايجار" }, { label: "أقرب نقطة دالة", val: "دائرة البطاقة الوطنية" }, { label: "العنوان السابق", val: "كربلاء" } ],
        work: [ { title: "قسم الاعلام المركزي", doc: "", date: "2023" } ], punishments: [], awards: []
    },
    "كرار ازريع ماطر": {
        code: "KA-89014", fullName: "كرار ازريع ماطر اجويد البخاتري", avatar: "https://ibb.co/j9LfHLSt", drive: "https://drive.google.com/drive/folders/1avF2T1LmL7RmZ_asNWFBMeY7mfi_Sb1d",
        basic: [ { label: "التولد", val: "14/2/1989" }, { label: "رقم الهاتف", val: "07780368016" }, { label: "التحصيل", val: "ابتدائية" }, { label: "اسم الأم", val: "ساعدية جباري جيجان" }, { label: "الحالة الاجتماعية", val: "متزوج" }, { label: "اسم الزوجة", val: "بدور ناجي كاظم" }, { label: "أسماء الأبناء", val: "1-علي كرار ، 2-غزل كرار" } ],
        skills: [ { label: "الدورات", val: "لا يوجد" }, { label: "الهوايات", val: "ترحال ، سباحه" }, { label: "دورة عسكرية", val: "كلا" }, { label: "إجادة الأسلحة", val: "كلاشنكوف ٫ مسدس" } ],
        housing: [ { label: "السكن", val: "البصرة قضاء المدينة حي الشهداء" }, { label: "نوع السكن", val: "ايجار" }, { label: "نقطة دالة", val: "مدرسة الخوارزمي الابتدائية" }, { label: "العنوان السابق", val: "لا يوجد" } ],
        work: [ { title: "مسؤول قسم التجهيز", doc: "", date: "2022" } ],
        punishments: [ { title: "تنبيه", doc: "123", date: "3/8/2024" }, { title: "تنبيه", doc: "239", date: "2/3/2025" } ],
        awards: [ { title: "شكر", doc: "215", date: "27/12/2024" } ]
    },
    "منتظر حزام سلمان": {
        code: "MH-02102", fullName: "منتظر حزام سلمان عبد الحسين الحساني", avatar: "https://ibb.co/fzPjhKmh", drive: "https://drive.google.com/drive/folders/1czMi0F8NTS1avUj9DWGeuLQWGvLCId9E",
        basic: [ { label: "التولد", val: "21/10/2002" }, { label: "رقم الهاتف", val: "07788488821" }, { label: "التحصيل", val: "دبلوم" }, { label: "اسم الأم", val: "وهيبة حيدر حمد" }, { label: "الحالة الاجتماعية", val: "متزوج" }, { label: "اسم الزوجة", val: "تغريد عبد الفضل جفات" }, { label: "أسماء الأبناء", val: "1-زينب منتظر حزام" } ],
        skills: [ { label: "الدورات", val: "دورة قائد" }, { label: "الهوايات", val: "كرة القدم ٫ التصوير ٫ التصميم" }, { label: "دورة عسكرية", val: "كلا" }, { label: "إجادة الأسلحة", val: "كلاشنكوف ٫ مسدس" } ],
        housing: [ { label: "السكن", val: "البصرة قضاء المدينة الجلال" }, { label: "نوع السكن", val: "زراعي" }, { label: "نقطة دالة", val: "مدرسة العقيدة" }, { label: "العنوان السابق", val: "لا يوجد" } ],
        work: [ { title: "قائد فرقة", doc: "", date: "" }, { title: "مسؤول مؤسسة ابناء المهندس", doc: "", date: "2021" }, { title: "امين اعلام الكشافة", doc: "", date: "" } ],
        punishments: [ { title: "تنبيه", doc: "123", date: "3/8/2024" } ],
        awards: [ { title: "شكر", doc: "241", date: "2/4/2025" } ]
    },
    "علي عبدالقادر سلمان": {
        code: "AQ-97225", fullName: "علي عبدالقادر سلمان عبد الحسين الحساني", avatar: "https://ibb.co/YCnDBKs", drive: "https://drive.google.com/drive/folders/1-pCu7LeC-uzWXUdQMUKxmaOtAM4BxJZB",
        basic: [ { label: "التولد", val: "25/2/1997" }, { label: "رقم الهاتف", val: "07713984061" }, { label: "التحصيل", val: "ابتدائية" }, { label: "اسم الأم", val: "ناديه زيدان خدام" }, { label: "الحالة", val: "متزوج" }, { label: "الزوجة", val: "نرجس عبد الفضل جفات" }, { label: "الأبناء", val: "1-رضا علي عبد القادر" } ],
        skills: [ { label: "الدورات", val: "دورة قائد ٫ دورة شارة كشافة" }, { label: "الهوايات", val: "لا يوجد" }, { label: "عسكرية", val: "كلا" }, { label: "إجادة الأسلحة", val: "كلاشنكوف ٫ مسدس" } ],
        housing: [ { label: "السكن", val: "البصرة قضاء المدينة الجلال" }, { label: "نوع السكن", val: "زراعي" }, { label: "نقطة دالة", val: "مدرسة العقيدة" }, { label: "العنوان السابق", val: "لا يوجد" } ],
        work: [ { title: "قائد فرقة", doc: "", date: "2016" }, { title: "عميد فوج", doc: "", date: "3/1/2025" } ],
        punishments: [ { title: "تنبيه", doc: "123", date: "3/8/2024" } ], awards: []
    },
    "ياسين مهدي حسين": {
        code: "YM-03729", fullName: "ياسين مهدي حسين محمد البطاط", avatar: "https://ibb.co/nMP484X9", drive: "https://drive.google.com/drive/folders/1V7kvMuFEiOq8pLyqWkzR0aIpjsNzLrv5",
        basic: [ { label: "التولد", val: "29/7/2003" }, { label: "رقم الهاتف", val: "07841231371" }, { label: "التحصيل", val: "ابتدائية" }, { label: "اسم الأم", val: "صالحة علي محمد" }, { label: "الحالة", val: "اعزب" } ],
        skills: [ { label: "الدورات", val: "قائد فرق" }, { label: "الهوايات", val: "كرة القدم ، قراءة" }, { label: "عسكرية", val: "كلا" }, { label: "إجادة الأسلحة", val: "كلاشنكوف ٫ مسدس" } ],
        housing: [ { label: "السكن", val: "البصرة /قضاء الصادق/ باهلة" }, { label: "نوع السكن", val: "زراعي" }, { label: "نقطة دالة", val: "مسجد الامام المهدي ع" }, { label: "العنوان السابق", val: "لا يوجد" } ],
        work: [ { title: "الاعلام المركزي", doc: "", date: "2026" } ],
        punishments: [ { title: "توبيخ", doc: "122", date: "3/8/2024" }, { title: "تنبيه", doc: "123", date: "3/8/2024" }, { title: "انذار نهائي", doc: "167", date: "24/7/2024" } ], awards: []
    },
    "علي عبد الحسين هليل": {
        code: "AH-96102", fullName: "علي عبد الحسين هليل حامي العواجي", avatar: "https://ibb.co/0yVV6JMs", drive: "https://drive.google.com/drive/folders/1vtm5vAsOzjOBIlPf5XfAHh2wc4_aWs2K",
        basic: [ { label: "التولد", val: "21/10/1996" }, { label: "رقم الهاتف", val: "07717576100" }, { label: "التحصيل", val: "بكالوريوس علوم البيئة" }, { label: "اسم الأم", val: "جنان جاسم محمد" }, { label: "الحالة", val: "متزوج" }, { label: "الزوجة", val: "ايات عبد الله عبد الائمة" }, { label: "تولد الزوجة", val: "12/9/1999" }, { label: "الأبناء", val: "1-رقية علي عبد الحسين (2025)" } ],
        skills: [ { label: "الدورات", val: "دورة عميد فوج ٫ دورة قائد" }, { label: "الهوايات", val: "كرة القدم" }, { label: "عسكرية", val: "نعم (3 دورات)" }, { label: "إجادة الأسلحة", val: "كلاشنكوف ٫ مسدس" } ],
        housing: [ { label: "السكن", val: "البصرة قضاء المدينة حي الشهداء" }, { label: "نوع السكن", val: "زراعي" }, { label: "نقطة دالة", val: "دائرة البطاقة الوطنية" }, { label: "العنوان السابق", val: "لا يوجد" } ],
        work: [ { title: "مسؤول المتابعة", doc: "79", date: "10/10/2023" }, { title: "قسم جرد المعلومات", doc: "157", date: "7/3/2024" }, { title: "مسؤول الادارة المركزية", doc: "", date: "" } ],
        punishments: [ { title: "تنبيه", doc: "130", date: "16/4/2024" } ], awards: []
    },
    "محمد نوري فالح": {
        code: "MN-04010", fullName: "محمد نوري فالح زغير السلمي", avatar: "https://ibb.co/spSWJ4XR", drive: "https://drive.google.com/drive/folders/1YNJ4vv0JEZr9KyGgf1Uwk-TfBxRe2mTC",
        basic: [ { label: "التولد", val: "1/1/2004" }, { label: "رقم الهاتف", val: "07733201484" }, { label: "التحصيل", val: "اعدادية" }, { label: "اسم الأم", val: "سميرة جنيد شريم" }, { label: "الحالة", val: "اعزب" } ],
        skills: [ { label: "الدورات", val: "لا يوجد" }, { label: "الهوايات", val: "سباحة تصوير صيد" }, { label: "عسكرية", val: "نعم (عدد 1)" }, { label: "إجادة الأسلحة", val: "كلاشنكوف ٫ مسدس،رمانة ،بيكسي" } ],
        housing: [ { label: "السكن", val: "البصرة قضاء المدينة حي الشهداء" }, { label: "نوع السكن", val: "ملك" }, { label: "نقطة دالة", val: "مدرسة الخوارزمي الابتدائية" }, { label: "العنوان السابق", val: "سوق قضاء المدينة" } ],
        work: [ { title: "مسؤول قسم الصيانة", doc: "", date: "2021" }, { title: "امن المديرية", doc: "", date: "2020" } ],
        punishments: [ { title: "توبيخ", doc: "", date: "16/4/2023" }, { title: "انذار اول", doc: "8", date: "11/10/2023" } ], awards: []
    },
    "مرتضى عبد النبي حسن": {
        code: "MA-89923", fullName: "مرتضى عبد النبي حسن كاصد العبادي", avatar: "https://ibb.co/v6Mtw2bx", drive: "https://drive.google.com/drive/folders/1mwT0FemmunTEfDSKyt_F87M5OxxV0rZm",
        basic: [ { label: "التولد", val: "23/9/1989" }, { label: "رقم الهاتف", val: "07713562826" }, { label: "التحصيل", val: "بكالوريوس" }, { label: "اسم الأم", val: "رسمية كاظم عباس" }, { label: "الحالة", val: "متزوج" }, { label: "الزوجة", val: "انوار ناصر داخل" }, { label: "الأبناء", val: "1-سراج مرتضى ، 2-ريحانه مرتضى" } ],
        skills: [ { label: "الدورات", val: "دورة قائد" }, { label: "الهوايات", val: "ركوب الخيل ،رماية وسباحة" }, { label: "عسكرية", val: "نعم" }, { label: "إجادة الأسلحة", val: "كلاشنكوف ٫ مسدس" } ],
        housing: [ { label: "السكن", val: "البصرة قضاء المدينة حي الشهداء" }, { label: "نوع السكن", val: "ملك" }, { label: "نقطة دالة", val: "مدرسة الخوارزمي الابتدائية" }, { label: "العنوان السابق", val: "لا يوجد" } ],
        work: [ { title: "مسؤول قسم الكشافة", doc: "", date: "2021" } ], punishments: [], awards: []
    },
    "وليد خالد حسن": {
        code: "WK-99117", fullName: "وليد خالد حسن جعاز الحيدري", avatar: "https://ibb.co/ym1rdV3S", drive: "https://drive.google.com/drive/folders/1omVlCNX2tREUfoBdacj88VkJdGaTYT9H",
        basic: [ { label: "التولد", val: "17/1/1999" }, { label: "رقم الهاتف", val: "07840831914" }, { label: "التحصيل", val: "طالب جامعي" }, { label: "اسم الأم", val: "خديجة يحيى عبد الحسن" }, { label: "الحالة", val: "متزوج" }, { label: "الزوجة", val: "جنان طاهر يحيى" }, { label: "الأبناء", val: "1-باقر وليد ، 2-شاه زنان وليد" } ],
        skills: [ { label: "الدورات", val: "لا يوجد" }, { label: "الهوايات", val: "كرة القدم ٫ مطالعه تصوير تصميم" }, { label: "عسكرية", val: "كلا" }, { label: "إجادة الأسلحة", val: "كلاشنكوف ٫ مسدس" } ],
        housing: [ { label: "السكن", val: "البصرة قضاء المدينة منطقة الحيادر" }, { label: "نوع السكن", val: "زراعي" }, { label: "نقطة دالة", val: "مدرسة الاهوار الابتدائية" }, { label: "العنوان السابق", val: "لا يوجد" } ],
        work: [ { title: "عميد فوج", doc: "", date: "" }, { title: "مسؤول قسم التخطيط", doc: "", date: "" } ], punishments: [],
        awards: [ { title: "شكر", doc: "241", date: "2/4/2025" } ]
    },
    "مازن عواد طالب": {
        code: "MO-84122", fullName: "مازن عواد طالب خضير السوداني", avatar: "https://i.ibb.co/wrptBSZz/IMG-20260522-145859-919-1.jpg", drive: "https://drive.google.com/drive/folders/1KhIm05ca5IC6XRI5mS7yCYJ-gOg-uGhw",
        basic: [ { label: "التولد", val: "21/12/1984" }, { label: "رقم الهاتف", val: "07703190263" }, { label: "التحصيل", val: "بكالوريوس" }, { label: "اسم الأم", val: "نشمية عبد العظيم خضير" }, { label: "الحالة", val: "متزوج" }, { label: "الزوجة", val: "غفران كريم عبد الرسول" } ],
        skills: [ { label: "الدورات", val: "لا يوجد" }, { label: "الهوايات", val: "كمال الاجسام، القيادة ،الحسابات" }, { label: "عسكرية", val: "كلا" }, { label: "إجادة الأسلحة", val: "كلاشنكوف ، مسدس" } ],
        housing: [ { label: "السكن", val: "البصرة قضاء المدينة حي الشهداء 1" }, { label: "نوع السكن", val: "ملك" }, { label: "نقطة دالة", val: "مؤسسة العين" }, { label: "العنوان السابق", val: "لا يوجد" } ],
        work: [], punishments: [], awards: []
    },
    "محسن علي خميس": {
        code: "MC-97112", fullName: "محسن علي خميس حمود السالم", avatar: "https://ibb.co/8gH6K0gt", drive: "https://drive.google.com/drive/folders/1Gtsrg8vnZfETkmtm94wMrVR4v3rb_zmO",
        basic: [ { label: "التولد", val: "1/1/1997" }, { label: "رقم الهاتف", val: "07710928015" }, { label: "التحصيل", val: "دبلوم" }, { label: "اسم الأم", val: "كريمة عبد الله فرهود" }, { label: "الحالة", val: "متزوج" }, { label: "الزوجة", val: "زينب علي عبد العباس" }, { label: "الأبناء", val: "1-رضا محسن علي (2023)" } ],
        skills: [ { label: "الدورات", val: "دورة قائد، عميد فوج ، مدرب، لجميع الاختصاصات" }, { label: "الهوايات", val: "السفر" }, { label: "عسكرية", val: "نعم" }, { label: "إجادة الأسلحة", val: "كلاشنكوف ٫ مسدس" } ],
        housing: [ { label: "السكن", val: "البصرة /قضاء الصادق/ السالم" }, { label: "نوع السكن", val: "زراعي" }, { label: "نقطة دالة", val: "لا يوجد" }, { label: "العنوان السابق", val: "لا يوجد" } ],
        work: [ { title: "مسؤول المؤسسة الصحية", doc: "", date: "" } ], punishments: [], awards: []
    },
    "محمد بشير جرمل": {
        code: "MB-01125", fullName: "محمد بشير جرمل صالح السخان", avatar: "https://ibb.co/35B2QRtq", drive: "https://drive.google.com/drive/folders/1m9-JGF4GjIAJJFwgrqdnoebIipc9tThM",
        basic: [ { label: "التولد", val: "25/1/2001" }, { label: "رقم الهاتف", val: "07716869329" }, { label: "التحصيل", val: "طالب جامعي" }, { label: "اسم الأم", val: "رباب غازي لطيف" }, { label: "الحالة", val: "اعزب" } ],
        skills: [ { label: "الدورات", val: "دورة قائد، شارة كشافة ، اختصاص موارد بشرية" }, { label: "الهوايات", val: "كرة القدم ٫" }, { label: "عسكرية", val: "كلا" }, { label: "إجادة الأسلحة", val: "كلاشنكوف ٫ مسدس" } ],
        housing: [ { label: "السكن", val: "البصرة/ قضاء الصادق /الرحمانية" }, { label: "نوع السكن", val: "زراعي" }, { label: "نقطة دالة", val: "مسجد بقية الله الاعظم" }, { label: "العنوان السابق", val: "لا يوجد" } ],
        work: [ { title: "مدير الموارد البشرية", doc: "", date: "2018" }, { title: "امين السر", doc: "", date: "" } ],
        punishments: [ { title: "توبيخ", doc: "213", date: "27/12/2024" } ], awards: []
    },
    "شبيب عبدالامير ناصر": {
        code: "SB-96217", fullName: "شبيب عبدالامير ناصر محمد البطاط", avatar: "https://ibb.co/bMDJXPjP", drive: "https://drive.google.com/drive/folders/1oH5MU0QxO3jor_uBtAuykhNE4eUhXh4z",
        basic: [ { label: "التولد", val: "17/2/1996" }, { label: "رقم الهاتف", val: "07859367571" }, { label: "التحصيل", val: "متوسطة" }, { label: "اسم الأم", val: "نجيبة علي محمد" }, { label: "الحالة", val: "اعزب" } ],
        skills: [ { label: "الدورات", val: "دورة قائد" }, { label: "الهوايات", val: "كرة القدم ٫" }, { label: "عسكرية", val: "كلا" }, { label: "إجادة الأسلحة", val: "كلاشنكوف ٫ مسدس" } ],
        housing: [ { label: "السكن", val: "البصرة /قضاء الصادق/ باهلة" }, { label: "نوع السكن", val: "زراعي" }, { label: "نقطة دالة", val: "مسجد الامام المهدي عج" }, { label: "العنوان السابق", val: "لا يوجد" } ],
        work: [ { title: "قائد فرقة", doc: "", date: "2019" } ],
        punishments: [ { title: "توبيخ", doc: "122", date: "3/8/2024" }, { title: "توبيخ", doc: "168", date: "24/7/2024" } ], awards: []
    },
    "علي احمد ضيدان": {
        code: "AA-06616", fullName: "علي احمد ضيدان نعمه الشاوي", avatar: "https://ibb.co/sv2Ggtmb", drive: "https://drive.google.com/drive/folders/1Og9Ynxt6b0YvjuLEtkCH6ZeBy8HofhfT",
        basic: [ { label: "التولد", val: "16/6/2006" }, { label: "رقم الهاتف", val: "07771702810" }, { label: "التحصيل", val: "طالب حالي" }, { label: "اسم الأم", val: "هند شاطي تركي" }, { label: "الحالة", val: "اعزب" } ],
        skills: [ { label: "الدورات", val: "لا يوجد" }, { label: "الهوايات", val: "٫ التصوير ٫ التصميم" }, { label: "عسكرية", val: "كلا" }, { label: "إجادة الأسلحة", val: "كلاشنكوف ٫ مسدس" } ],
        housing: [ { label: "السكن", val: "البصرة قضاء المدينة البشاوي" }, { label: "نوع السكن", val: "زراعي" }, { label: "نقطة دالة", val: "مدرسة الضفاف الابتدائية" }, { label: "العنوان السابق", val: "لا يوجد" } ],
        work: [ { title: "مساعد مدير الاعلام المركزي", doc: "", date: "18/3/2025" }, { title: "قائد فرقة", doc: "", date: "9/9/2025" } ], punishments: [], awards: []
    },
    "فرحان فلاح عبد النبي": {
        code: "FF-91302", fullName: "فرحان فلاح عبد النبي عبيد الحيدري", avatar: "https://ibb.co/0j7KQSYz", drive: "https://drive.google.com/drive/folders/1bRGc1TdHDUfwgNeOjK5aQnclfdTVWuEQ",
        basic: [ { label: "التولد", val: "2/3/1991" }, { label: "رقم الهاتف", val: "07807524522" }, { label: "التحصيل", val: "بكالوريوس" }, { label: "اسم الأم", val: "احلام يحيى عبد الحسين" }, { label: "الحالة", val: "متزوج" }, { label: "الزوجة", val: "شفاء جمعة هاشم" }, { label: "الأبناء", val: "1-علي فرحان ، 2-عُلى فرحان ، 3-زينب فرحان" } ],
        skills: [ { label: "الدورات", val: "لا يوجد" }, { label: "الهوايات", val: "مطالعة, كرة القدم, سفر" }, { label: "عسكرية", val: "كلا" }, { label: "إجادة الأسلحة", val: "كلاشنكوف ٫ مسدس" } ],
        housing: [ { label: "السكن", val: "البصرة قضاء المدينة منطقة الحيادر" }, { label: "نوع السكن", val: "زراعي" }, { label: "نقطة دالة", val: "مدرسة الاهوار الابتدائية" }, { label: "العنوان السابق", val: "لا يوجد" } ],
        work: [ { title: "مدير مداد الطلابية", doc: "", date: "" } ], punishments: [], awards: []
    },
    "حسين يحيى عبد": {
        code: "HY-02106", fullName: "حسين يحيى عبد مزبان السوداني", avatar: "https://ibb.co/tMPCRZKw", drive: "https://drive.google.com/drive/folders/1kawtRfWODuljfnUm5CL_NlcsLrvM1xrn",
        basic: [ { label: "التولد", val: "6/1/2002" }, { label: "رقم الهاتف", val: "07727714725" }, { label: "اسم الأم", val: "ليلى فاضل عبد" }, { label: "الحالة", val: "اعزب" } ],
        skills: [ { label: "الدورات", val: "لا يوجد" }, { label: "الهوايات", val: "قراءة القران" }, { label: "عسكرية", val: "نعم" }, { label: "إجادة الأسلحة", val: "كلاشنكوف ٫ مسدس" } ],
        housing: [ { label: "السكن", val: "البصرة/ قضاء المدينة/ السودان" }, { label: "نوع السكن", val: "زراعي" }, { label: "نقطة دالة", val: "مسجد الامام الحسين" }, { label: "العنوان السابق", val: "لا يوجد" } ],
        work: [ { title: "مدير الفرقة الانشادية", doc: "", date: "" }, { title: "مدير مؤسسة ابن الجواد (وكالة)", doc: "", date: "" } ],
        punishments: [ { title: "تجميد", doc: "194", date: "20/9/2024" }, { title: "تنبيه", doc: "240", date: "3/2/2025" } ], awards: []
    },
    "حمزة محمد عبد الزهرة": {
        code: "HM-02605", fullName: "حمزة محمد عبد الزهرة مزعل العواجي", avatar: "https://ibb.co/bMLsFQw3", drive: "https://drive.google.com/drive/folders/1F9ZfcX7DtPzeHmCC7YnIqUtSgTQYNe0E",
        basic: [ { label: "التولد", val: "5/6/2002" }, { label: "رقم الهاتف", val: "07703572803" }, { label: "التحصيل", val: "الثالث متوسط" }, { label: "اسم الأم", val: "مدلولة حسن عبيج" }, { label: "الحالة", val: "اعزب" } ],
        skills: [ { label: "الدورات", val: "لا يوجد" }, { label: "الهوايات", val: "كرة القدم ٫" }, { label: "عسكرية", val: "كلا" }, { label: "إجادة الأسلحة", val: "كلاشنكوف ٫ مسدس" } ],
        housing: [ { label: "السكن", val: "البصرة قضاء المدينة حي الشهداء" }, { label: "نوع السكن", val: "ملك" }, { label: "نقطة دالة", val: "البطاقة الوطنية" }, { label: "العنوان السابق", val: "لا يوجد" } ],
        work: [ { title: "قائد فرقة", doc: "", date: "" } ], punishments: [],
        awards: [ { title: "شكر", doc: "241", date: "2/4/2025" } ]
    },
    "ضياء علاء سعيد": {
        code: "DA-96117", fullName: "ضياء علاء سعيد هجول العويض", avatar: "https://ibb.co/F4NyD3b9", drive: "https://drive.google.com/drive/folders/1PtQ5k84wX7d7QKObnEDpvw5mQlh14Df9",
        basic: [ { label: "التولد", val: "7/11/1996" }, { label: "رقم الهاتف", val: "07703168682" }, { label: "التحصيل", val: "متوسطة" }, { label: "اسم الأم", val: "حذام باهض هجول" }, { label: "الحالة", val: "متزوج" }, { label: "الزوجة", val: "فاطمة مانع كاظم" }, { label: "تولد الزوجة", val: "1/3/2003" }, { label: "الأبناء", val: "1-حسن ضياء ، 2-حسين ضياء" } ],
        skills: [ { label: "الدورات", val: "دورة قائد,دورة الربال، عميد فوج، شارة جوالة" }, { label: "الهوايات", val: "كرة القدم ٫ التصوير ٫ التصميم، سباحة" }, { label: "عسكرية", val: "نعم" }, { label: "إجادة الأسلحة", val: "كلاشنكوف ٫ مسدس" } ],
        housing: [ { label: "السكن", val: "البصرة /قضاء الصادق/منطقة الجري" }, { label: "نوع السكن", val: "زراعي" }, { label: "نقطة دالة", val: "مدرسة الوفاء الابتدائية" }, { label: "العنوان السابق", val: "لا يوجد" } ],
        work: [ { title: "مدير مؤسسة جهاد البناء", doc: "153", date: "24/6/2024" } ],
        punishments: [ { title: "تنبيه", doc: "", date: "27/4/2024" }, { title: "تنبيه", doc: "257", date: "15/3/2025" } ],
        awards: [ { title: "شكر", doc: "171", date: "28/7/2024" }, { title: "شكر", doc: "214", date: "27/12/2024" } ]
    },
    "احمد احسان برزان": {
        code: "AE-99322", fullName: "احمد احسان برزان نعمه", avatar: "https://ibb.co/B2WbkWSY", drive: "https://drive.google.com/drive/folders/1QUtUqfby9jEP1fyxOhHFjxiLQ7oFNHJP",
        basic: [ { label: "التولد", val: "22/3/1999" }, { label: "رقم الهاتف", val: "07703905516" }, { label: "التحصيل", val: "دبلوم" }, { label: "اسم الأم", val: "تأميم ضيدان نعمه" }, { label: "الحالة", val: "متزوج" }, { label: "الزوجة", val: "زهراء علي فليح" }, { label: "تولد الزوجة", val: "20/8/2003" }, { label: "الأبناء", val: "1-وتين احمد احسان (2026)" } ],
        skills: [ { label: "الدورات", val: "دورة قائد ، اختصاص، قائد مدرب ، شارة كشافة" }, { label: "الهوايات", val: "كرة القدم ٫ تصوير، خياطة" }, { label: "عسكرية", val: "كلا" }, { label: "إجادة الأسلحة", val: "كلاشنكوف ٫ مسدس" } ],
        housing: [ { label: "السكن", val: "البصرة قضاء المدينة البشاوي" }, { label: "نوع السكن", val: "زراعي" }, { label: "نقطة دالة", val: "محكمة المدينة" }, { label: "العنوان السابق", val: "القرنة" } ],
        work: [ { title: "معاون مفوض", doc: "", date: "2026" } ], punishments: [], awards: []
    },
    "ابو الحسن قصي غافل": {
        code: "AQ-06112", fullName: "ابو الحسن قصي غافل امزيعل العلوان", avatar: "https://ibb.co/qMNzrjCC", drive: "https://drive.google.com/drive/folders/1MDuXmbk_bWpBJTH3M-N71-M5cd0Ty4Z7",
        basic: [ { label: "التولد", val: "26/11/2006" }, { label: "رقم الهاتف", val: "07764465587" }, { label: "اسم الأم", val: "لما سعيد هجول" }, { label: "الحالة", val: "اعزب" } ],
        skills: [ { label: "الدورات", val: "لا يوجد" }, { label: "الهوايات", val: "كرة القدم ٫ التصوير ٫ التصميم" }, { label: "عسكرية", val: "كلا" }, { label: "إجادة الأسلحة", val: "كلاشنكوف ٫ مسدس" } ],
        housing: [ { label: "السكن", val: "البصرة قضاء المدينة العلوان" }, { label: "نوع السكن", val: "زراعي" }, { label: "نقطة دالة", val: "مسجد صاحب الامر" }, { label: "العنوان السابق", val: "لا يوجد" } ],
        work: [ { title: "مدير مؤسسة التالق الرياضي", doc: "", date: "24/6/2024" } ],
        punishments: [ { title: "تنبيه", doc: "205", date: "11/5/2024" }, { title: "تنبيه", doc: "258", date: "15/3/2025" } ], awards: []
    },
    "حبيب عبدالامير ناصر": {
        code: "SH-94310", fullName: "حبيب عبدالامير ناصر محمد البطاط", avatar: "https://ibb.co/cKzR8mm4", drive: "https://drive.google.com/drive/folders/1bGDl7xHfqv7QaPCCbbTsYmfHEB4uJM2c",
        basic: [ { label: "التولد", val: "10/3/1994" }, { label: "رقم الهاتف", val: "07725847133" }, { label: "التحصيل", val: "بكالوريوس" }, { label: "اسم الأم", val: "نجيبة علي محمد" }, { label: "الحالة", val: "متزوج" }, { label: "الزوجة", val: "مريم عادل ناصر" }, { label: "الأبناء", val: "1-كيان حبيب ، 2-ياسمين حبيب" } ],
        skills: [ { label: "الدورات", val: "دورة قائد، عميد فوج،قائد تدريب" }, { label: "الهوايات", val: "كرة القدم" }, { label: "عسكرية", val: "نعم (عدد 4)" }, { label: "إجادة الأسلحة", val: "كلاشنكوف ٫ مسدس،بيكيسي قاذفة" } ],
        housing: [ { label: "السكن", val: "البصرة قضاء الصادق باهلة" }, { label: "نوع السكن", val: "زراعي" }, { label: "نقطة دالة", val: "مسجد الامام المهدي" }, { label: "العنوان السابق", val: "لا يوجد" } ],
        work: [ { title: "مدير قسم العلاقات", doc: "83", date: "2019" }, { title: "مؤسسة ابناء المجاهدين", doc: "", date: "" } ], punishments: [], awards: []
    },
    "علاء سلام طالب": {
        code: "AS-95101", fullName: "علاء سلام طالب خضير الشحرور", avatar: "https://ibb.co/PZzSM30L", drive: "https://drive.google.com/drive/folders/1YLD2F8low-MBYqUmAjVR6k30cCA34RAG",
        basic: [ { label: "التولد", val: "1995/1/1" }, { label: "رقم الهاتف", val: "07717829076" }, { label: "التحصيل", val: "بكالوريوس" }, { label: "اسم الأم", val: "نجاح ريسان خلف" } ],
        skills: [ { label: "الدورات", val: "تحت التحديث الإداري" } ],
        housing: [ { label: "السكن", val: "مستندات السكن قيد الجرد" } ],
        work: [ { title: "مديرية العلاقات والتجهيز", doc: "", date: "" } ], punishments: [], awards: []
    },
    "محمد تقي عقيل": {
        code: "MT-00106", fullName: "محمد تقي عقيل مجبل كريم الخزاعي", avatar: "https://ibb.co/3mfKy9Cw", drive: "https://drive.google.com/drive/folders/1K7vILdwVZiMtc04M3-NQGdudhAxRku7M",
        basic: [ { label: "التولد", val: "6/1/2000" }, { label: "رقم الهاتف", val: "07726156322" }, { label: "التحصيل", val: "بكالوريوس علم النفس" }, { label: "اسم الأم", val: "حنان عبد الواحد جداوه" }, { label: "الحالة", val: "اعزب" } ],
        skills: [ { label: "الدورات", val: "دورة قائد ، شارة كشافة" }, { label: "الهوايات", val: "مطالعة" }, { label: "عسكرية", val: "كلا" }, { label: "إجادة الأسلحة", val: "كلاشنكوف ٫ مسدس" } ],
        housing: [ { label: "السكن", val: "البصرة /قضاء المدينة /الوحيد" }, { label: "نوع السكن", val: "زراعي" }, { label: "نقطة دالة", val: "مدرسة العلي الابتدائية" }, { label: "العنوان السابق", val: "لا يوجد" } ],
        work: [ { title: "القسم الإعلامي ومتابعة شؤون الكادر الثقافي", doc: "", date: "" } ], punishments: [], awards: []
    },
    "محمد يعرب حرجان": {
        code: "MY-11428", fullName: "محمد يعرب حرجان نعاس العبيد", avatar: "https://ibb.co/99q8HnF6", drive: "https://drive.google.com/drive/folders/1t23EyVxdX4EDVeqlO5yQfM06UFzIRD6i",
        basic: [ { label: "التولد", val: "2011/4/28" }, { label: "الهاتف", val: "07726246720 / 07767825646" }, { label: "التحصيل", val: "سادس ابتدائي" }, { label: "اسم الأم", val: "زهراء احمد نعمه" }, { label: "الحالة", val: "اعزب" } ],
        skills: [ { label: "الدورات", val: "لا يوجد" }, { label: "الهوايات", val: "كرة القدم ٫ التصوير" }, { label: "عسكرية", val: "كلا" }, { label: "إجادة الأسلحة", val: "كلاشنكوف ٫ مسدس" } ],
        housing: [ { label: "السكن", val: "البصرة /قضاء المدينة/ الجلال" }, { label: "نوع السكن", val: "زراعي" }, { label: "نقطة دالة", val: "مدرسة العقيدة" }, { label: "العنوان السابق", val: "لا يوجد" } ],
        work: [ { title: "الاعلام", doc: "", date: "" } ], punishments: [], awards: []
    },
    "علي محسن هاشم": {
        code: "AM-94000", fullName: "علي محسن هاشم كرم البطاط", avatar: "https://ibb.co/QvtbJwZm", drive: "https://drive.google.com/drive/folders/1ALRDHR6TjJEfyzszsi6bOBSPlqQTTLiW",
        basic: [ { label: "التولد", val: "1994" }, { label: "رقم الهاتف", val: "07808167845" }, { label: "التحصيل", val: "ابتدائية" }, { label: "اسم الأم", val: "مريم زامل ريج" }, { label: "الحالة", val: "متزوج" }, { label: "الزوجة", val: "سارة شريف" } ],
        skills: [ { label: "الدورات", val: "لا يوجد" }, { label: "الهوايات", val: "كرة القدم ٫ القراءة" }, { label: "عسكرية", val: "نعم (4)" }, { label: "إجادة الأسلحة", val: "كلاشنكوف ٫ مسدس، بيكيسي قاذفة" } ],
        housing: [ { label: "السكن", val: "البصرة/ قضاء الصادق/ ابو غريب" }, { label: "نوع السكن", val: "زراعي" }, { label: "نقطة دالة", val: "جامع الزهراء" }, { label: "العنوان السابق", val: "قم ايران" } ],
        work: [ { title: "العلاقات", doc: "", date: "" } ], punishments: [], awards: []
    },
    "كرار عبدالحسين هليل": {
        code: "KC-04120", fullName: "كرار عبدالحسين هليل حامي العواجي", avatar: "https://ibb.co/1tJZYtwQ", drive: "https://drive.google.com/drive/folders/1geu8mCXHsbMYb3_T4kJal-f__PXNE41q",
        basic: [ { label: "التولد", val: "2004/1/20" }, { label: "رقم الهاتف", val: "07723114873" }, { label: "التحصيل", val: "ثالث متوسط" }, { label: "اسم الأم", val: "جنان جاسم محمد" }, { label: "الحالة", val: "اعزب" } ],
        skills: [ { label: "الدورات", val: "لا يوجد" }, { label: "الهوايات", val: "لا يوجد" }, { label: "عسكرية", val: "كلا" }, { label: "إجادة الأسلحة", val: "كلاشنكوف ٫ مسدس" } ],
        housing: [ { label: "السكن", val: "البصرة /قضاء المدينة/ حي الشهداء" }, { label: "نوع السكن", val: "زراعي" }, { label: "نقطة دالة", val: "البطاقة الوطنية" }, { label: "العنوان السابق", val: "لا يوجد" } ],
        work: [ { title: "العلاقات", doc: "", date: "" } ], punishments: [], awards: []
    }
};

const SOCIAL_LINKS = {
    tajammu: [
        { name: 'فيسبوك', url: 'https://www.facebook.com/share/1CvehBKNWt/' },
        { name: 'انستغرام', url: 'https://www.instagram.com/sharia.youth.assembly?igsh=aTdpaXE1YmtjeWIx' },
        { name: 'تليغرام', url: 'https://t.me/Shabab_alshariaa' },
        { name: 'تيك توك', url: 'https://www.tiktok.com/@c1cck?_r=1&_t=ZS-96ufheasgNA' }
    ],
    scouts: [
        { name: 'فيسبوك', url: 'https://www.facebook.com/share/18X5vdwQMA/' },
        { name: 'انستغرام', url: 'https://www.instagram.com/scouts_imam.hussein?igsh=MTM4YnMxeHJpNDRsYw==' },
        { name: 'تليغرام', url: 'https://t.me/Shabab_alshariaa' },
        { name: 'تيك توك', url: 'https://www.tiktok.com/@11hf11?_r=1&_t=ZS-96ufsWWZvcK' }
    ],
    trend: [
        { name: 'حساب تيك توك الرسمي', url: 'https://www.tiktok.com/@2.ca?_r=1&_t=ZS-96ufxHesNW8' }
    ]
};

let globalAdminMode = false;
let currentActiveAlias = "";
let fetchedAttendanceLogs = []; 
let groupedAttendanceData = {}; 
let allFormsData = { tajammu: [], scouts: [] };
let currentFormView = { type: '', index: 0 };
let currentFormsGroups = {};
let currentPdfFileName = "ملف.pdf";

// متغيرات الرسوم البيانية
let maritalChartInstance = null;
let ageChartInstance = null;
let punishmentChartInstance = null;
let awardsChartInstance = null;

function safeString(v) { return v ? String(v).trim() : ""; }

function parseImgBBUrl(url) {
    let cleanUrl = safeString(url);
    if (cleanUrl.match(/\.(jpeg|jpg|gif|png)$/) != null) return cleanUrl;
    if (cleanUrl.includes("ibb.co/") && !cleanUrl.includes("i.ibb.co/")) {
        let match = cleanUrl.split("ibb.co/");
        if (match.length > 1) {
            let id = match[1].replace(/\//g, '');
            return "https://i.ibb.co/" + id + "/" + id + ".jpg"; 
        }
    }
    return cleanUrl;
}

function cleanChildrenNames(str) {
    if (!str) return "لا يوجد";
    let parts = str.split(/[،,]/);
    let names = [];
    parts.forEach(p => {
        let clean = p.replace(/^\s*\d+[-–]\s*/, '').trim(); 
        let words = clean.split(/\s+/);
        if (words.length > 0) {
            let firstWord = words[0];
            if (words[0] === 'شاه' && words[1] === 'زنان') firstWord = 'شاه زنان';
            firstWord = firstWord.replace(/[\(\)]/g, '').replace(/\d+/g, '').trim(); 
            if (firstWord) names.push(firstWord);
        }
    });
    return names.join(" و ");
}

function showNotification(msg) {
    const toast = document.getElementById('toastNotification');
    toast.innerText = msg; 
    toast.classList.remove('hidden');
    setTimeout(() => { toast.classList.add('hidden'); }, 3000);
}

function handleImageError(img) {
    img.classList.add('hidden');
    const fallback = img.nextElementSibling;
    if (fallback) fallback.classList.remove('hidden');
}

function toggleSystemTheme() {
    const isLightMode = document.body.classList.toggle('light-mode');
    const checkbox = document.getElementById('themeCheckbox');
    if(checkbox) checkbox.checked = !isLightMode;
    
    if(isLightMode) showNotification("تم تفعيل الوضع النهاري ☀️");
    else showNotification("تم تفعيل الوضع الليلي 🌙");

    if (!document.getElementById('chartsScreen').classList.contains('hidden')) {
        renderAnalyticsCharts();
    }
}

function handleMainLogin() {
    const u = safeString(document.getElementById('username').value);
    const p = safeString(document.getElementById('password').value);
    const err = document.getElementById('loginError');
    if (u === 'mhdi' && p === '31300313') {
        err.classList.add('hidden');
        document.getElementById('loginScreen').classList.add('hidden');
        document.getElementById('dashboardScreen').classList.remove('hidden');
    } else err.classList.remove('hidden');
}

function handleLogout() {
    document.getElementById('dashboardScreen').classList.add('hidden');
    document.getElementById('loginScreen').classList.remove('hidden');
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}

function toggleSidebar(shouldShow) {
    const sidebar = document.getElementById('sidebarPanel');
    if (shouldShow) sidebar.classList.remove('hidden');
    else sidebar.classList.add('hidden');
}

function openSidebarSection(sectionType) {
    toggleSidebar(false);
    document.getElementById('dashboardScreen').classList.add('hidden');
    if (sectionType === 'about') document.getElementById('aboutView').classList.remove('hidden');
}

function returnToDashboardFromSidebar(currentViewId) {
    document.getElementById(currentViewId).classList.add('hidden');
    document.getElementById('dashboardScreen').classList.remove('hidden');
}

function navigateTo(id) {
    document.getElementById('dashboardScreen').classList.add('hidden');
    document.getElementById(id).classList.remove('hidden');
}

function goBackToDashboard() {
    const views = ['adminScreen', 'activitiesScreen', 'socialScreen', 'adminKaderListScreen', 'attendanceLogsScreen', 'formsCategoryScreen', 'formsMonthsScreen', 'formsListScreen', 'chartsScreen'];
    views.forEach(v => {
        let el = document.getElementById(v);
        if(el) el.classList.add('hidden');
    });
    document.getElementById('dashboardScreen').classList.remove('hidden');
}

function openDirectCodeModal() {
    document.getElementById('dashboardScreen').classList.add('hidden');
    document.getElementById('directMemberCodeInput').value = '';
    document.getElementById('directModalCodeError').classList.add('hidden');
    document.getElementById('directCodeModal').classList.remove('hidden');
}

function closeDirectCodeModal() {
    document.getElementById('directCodeModal').classList.add('hidden');
    document.getElementById('dashboardScreen').classList.remove('hidden');
}

function submitDirectCode() {
    const typed = safeString(document.getElementById('directMemberCodeInput').value);
    let foundAlias = null;
    for (let alias in MEMBERS_DATABASE) {
        if (MEMBERS_DATABASE[alias].code === typed) { foundAlias = alias; break; }
    }
    if (foundAlias) {
        document.getElementById('directCodeModal').classList.add('hidden');
        globalAdminMode = false;
        currentActiveAlias = foundAlias;
        displayMemberCardData(foundAlias);
    } else {
        document.getElementById('directModalCodeError').classList.remove('hidden');
    }
}

function openAdminPasswordModal() {
    document.getElementById('adminPasswordInput').value = '';
    document.getElementById('modalAdminError').classList.add('hidden');
    document.getElementById('adminPasswordModal').classList.remove('hidden');
}

function closeAdminPasswordModal() { 
    document.getElementById('adminPasswordModal').classList.add('hidden'); 
}

function submitAdminPassword() {
    const p = safeString(document.getElementById('adminPasswordInput').value);
    if (p === 'admin313') {
        closeAdminPasswordModal();
        globalAdminMode = true;
        navigateTo('adminScreen');
    } else {
        document.getElementById('modalAdminError').classList.remove('hidden');
    }
}

function openAdminKaderView() {
    document.getElementById('adminScreen').classList.add('hidden');
    document.getElementById('adminKaderListScreen').classList.remove('hidden');
    buildAdminKaderButtons();
}

function goBackToAdminScreen() {
    document.getElementById('adminKaderListScreen').classList.add('hidden');
    document.getElementById('adminScreen').classList.remove('hidden');
}

function buildAdminKaderButtons() {
    const container = document.getElementById('adminAliasesContainer');
    if (!container) return;
    container.innerHTML = '';
    Object.keys(MEMBERS_DATABASE).forEach(alias => {
        const b = document.createElement('button');
        b.className = 'name-panel-btn';
        b.innerText = alias;
        b.onclick = () => {
            currentActiveAlias = alias;
            displayMemberCardData(alias);
        };
        container.appendChild(b);
    });
}

function outputRowsHtml(list) {
    let html = "";
    list.forEach(row => {
        let displayVal = row.val;
        if (row.label === "أسماء الأبناء" || row.label === "الأبناء") displayVal = cleanChildrenNames(row.val);
        html += `<div class="inset-pill"><span class="label">${row.label}</span><span class="value">${displayVal}</span></div>`;
    });
    return html;
}

function outputTableHtml(dataList, type) {
    let headers = [];
    if (type === 'work') headers = ['النوع', 'رقم الكتاب', 'التاريخ'];
    else if (type === 'punishments') headers = ['نوع العقوبة', 'رقم الكتاب', 'تاريخه'];
    else if (type === 'awards') headers = ['نوع الشكر', 'رقم الكتاب', 'تاريخه'];

    let html = `<table class="modern-table"><thead><tr><th>${headers[0]}</th><th>${headers[1]}</th><th>${headers[2]}</th></tr></thead><tbody>`;
    if (dataList.length === 0) {
        html += `<tr><td colspan="3" class="empty-cell">لا يوجد</td></tr>`;
        for(let i=1; i<5; i++) { html += `<tr><td></td><td></td><td></td></tr>`; }
    } else {
        for(let i=0; i<5; i++) {
            if (i < dataList.length) {
                const item = dataList[i];
                html += `<tr><td>${item.title || ''}</td><td>${item.doc || ''}</td><td>${item.date || ''}</td></tr>`;
            } else { html += `<tr><td></td><td></td><td></td></tr>`; }
        }
    }
    html += `</tbody></table>`;
    return html;
}

function displayMemberCardData(alias) {
    const u = MEMBERS_DATABASE[alias];
    if (!u) return;
    document.getElementById('adminKaderListScreen').classList.add('hidden');
    document.getElementById('profileDetailScreen').classList.remove('hidden');
    document.getElementById('profileFullName').innerText = u.fullName;
    document.getElementById('primaryDetailsContainer').innerHTML = outputRowsHtml(u.basic);

    const imgElement = document.getElementById('profileImage');
    const fallbackElement = imgElement.nextElementSibling;
    imgElement.src = parseImgBBUrl(u.avatar);
    imgElement.classList.remove('hidden');
    fallbackElement.classList.add('hidden');

    document.getElementById('driveLinkBtn').href = u.drive;
    document.getElementById('dynamicDetailDisplayBox').classList.add('hidden');
    document.querySelectorAll('.panel-tab-btn').forEach(btn => btn.classList.remove('active-tab'));
}

function closeProfileScreen() {
    document.getElementById('profileDetailScreen').classList.add('hidden');
    if (globalAdminMode) document.getElementById('adminKaderListScreen').classList.remove('hidden');
    else document.getElementById('dashboardScreen').classList.remove('hidden');
}

function loadSpecificDetail(key, element) {
    document.querySelectorAll('.panel-tab-btn').forEach(btn => btn.classList.remove('active-tab'));
    element.classList.add('active-tab');
    const u = MEMBERS_DATABASE[currentActiveAlias];
    if (!u) return;

    const displayBox = document.getElementById('dynamicDetailDisplayBox');
    const title = document.getElementById('dynamicDetailTitle');
    const content = document.getElementById('dynamicDetailContent');

    const headers = { 'skills': 'الدورات والمهارات', 'housing': 'معلومات السكن', 'work': 'العمل والمسؤوليات', 'punishments': 'السجل الانضباطي', 'awards': 'كتب الشكر والتقدير' };
    title.innerText = headers[key];

    if (key === 'work' || key === 'punishments' || key === 'awards') content.innerHTML = outputTableHtml(u[key], key);
    else content.innerHTML = outputRowsHtml(u[key]);
    displayBox.classList.remove('hidden');
}

// -------------------------------------------------------------------
// محرك الرسوم البيانية الإحصائي الذكي 
// -------------------------------------------------------------------
function openChartsScreen() {
    document.getElementById('adminScreen').classList.add('hidden');
    document.getElementById('chartsScreen').classList.remove('hidden');
    renderAnalyticsCharts();
}

function goBackToAdminFromCharts() {
    document.getElementById('chartsScreen').classList.add('hidden');
    document.getElementById('adminScreen').classList.remove('hidden');
}

function renderAnalyticsCharts() {
    if (maritalChartInstance) maritalChartInstance.destroy();
    if (ageChartInstance) ageChartInstance.destroy();
    if (punishmentChartInstance) punishmentChartInstance.destroy();
    if (awardsChartInstance) awardsChartInstance.destroy();

    const isDark = !document.body.classList.contains('light-mode');
    const chartTextColor = isDark ? '#e8dcc8' : '#3b2818';
    const gridLineColor = isDark ? 'rgba(232, 220, 200, 0.15)' : 'rgba(90, 58, 34, 0.15)';

    let marriedCount = 0, singleCount = 0;
    let totalAge = 0, ageValidCount = 0;
    let ageBuckets = { "تحت 20 سنة": 0, "20 - 25 سنة": 0, "26 - 30 سنة": 0, "فوق 30 سنة": 0 };
    let punishmentCounts = { "تنبيه": 0, "توبيخ": 0, "انذار": 0, "تجميد": 0 };
    let awardsLeaderboard = {};

    for (let alias in MEMBERS_DATABASE) {
        const u = MEMBERS_DATABASE[alias];
        
        let statusObj = u.basic.find(b => b.label.includes("الحالة"));
        if (statusObj) {
            let val = statusObj.val.trim();
            if (val.includes("متزوج")) marriedCount++;
            else if (val.includes("اعزب") || val.includes("أعزب")) singleCount++;
        }

        let birthObj = u.basic.find(b => b.label.includes("التولد"));
        if (birthObj) {
            let match = String(birthObj.val).match(/\d{4}/);
            if (match) {
                let birthYear = parseInt(match[0]);
                let age = 2026 - birthYear;
                totalAge += age;
                ageValidCount++;

                if (age < 20) ageBuckets["تحت 20 سنة"]++;
                else if (age <= 25) ageBuckets["20 - 25 سنة"]++;
                else if (age <= 30) ageBuckets["26 - 30 سنة"]++;
                else ageBuckets["فوق 30 سنة"]++;
            }
        }

        if (u.punishments && u.punishments.length > 0) {
            u.punishments.forEach(p => {
                let t = p.title.trim();
                if (t.includes("تنبيه")) punishmentCounts["تنبيه"]++;
                else if (t.includes("توبيخ")) punishmentCounts["توبيخ"]++;
                else if (t.includes("انذار") || t.includes("إنذار")) punishmentCounts["انذار"]++;
                else if (t.includes("تجميد")) punishmentCounts["تجميد"]++;
            });
        }

        if (u.awards && u.awards.length > 0) {
            awardsLeaderboard[alias] = u.awards.length;
        } else {
            awardsLeaderboard[alias] = 0;
        }
    }

    let avgAge = ageValidCount > 0 ? Math.round(totalAge / ageValidCount) : 0;
    document.getElementById('averageAgeVal').innerText = `${avgAge} سنة`;

    Chart.defaults.color = chartTextColor;
    Chart.defaults.font.family = 'Segoe UI, sans-serif';

    const ctxMarital = document.getElementById('maritalChart').getContext('2d');
    maritalChartInstance = new Chart(ctxMarital, {
        type: 'pie',
        data: {
            labels: ['متزوج', 'أعزب'],
            datasets: [{
                data: [marriedCount, singleCount],
                backgroundColor: ['#8c5531', '#d4af37'],
                borderWidth: isDark ? 0 : 1
            }]
        },
        options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
    });

    const ctxAge = document.getElementById('ageChart').getContext('2d');
    ageChartInstance = new Chart(ctxAge, {
        type: 'bar',
        data: {
            labels: Object.keys(ageBuckets),
            datasets: [{
                label: 'عدد الكادر',
                data: Object.values(ageBuckets),
                backgroundColor: '#c5a059',
                borderRadius: 6
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            scales: {
                y: { grid: { color: gridLineColor }, ticks: { stepSize: 1 } },
                x: { grid: { display: false } }
            }
        }
    });

    // تم تغيير رسم العقوبات ليكون خطياً (Line) ومتطابقاً مع رسم الشكر بناءً على طلبك
    const ctxPunish = document.getElementById('punishmentChart').getContext('2d');
    punishmentChartInstance = new Chart(ctxPunish, {
        type: 'line',
        data: {
            labels: Object.keys(punishmentCounts),
            datasets: [{
                label: 'إجمالي العقوبات',
                data: Object.values(punishmentCounts),
                borderColor: '#e74c3c',
                backgroundColor: 'rgba(231, 76, 60, 0.2)',
                fill: true,
                tension: 0.3,
                borderWidth: 3
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            scales: {
                y: { grid: { color: gridLineColor }, ticks: { stepSize: 1 } },
                x: { grid: { display: false }, ticks: { font: { size: 10 } } }
            }
        }
    });

    const ctxAwards = document.getElementById('awardsChart').getContext('2d');
    awardsChartInstance = new Chart(ctxAwards, {
        type: 'line',
        data: {
            labels: Object.keys(awardsLeaderboard),
            datasets: [{
                label: 'كتب الشكر والشهادات',
                data: Object.values(awardsLeaderboard),
                borderColor: '#4a7c59',
                backgroundColor: 'rgba(74, 124, 89, 0.2)',
                fill: true,
                tension: 0.3,
                borderWidth: 3
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            scales: {
                y: { grid: { color: gridLineColor }, ticks: { stepSize: 1 } },
                x: { grid: { display: false }, ticks: { font: { size: 10 } } }
            }
        }
    });
}

function openSocialModal(platform) {
    const modal = document.getElementById('socialLinksModal');
    const title = document.getElementById('socialModalTitle');
    const container = document.getElementById('socialLinksContainer');
    container.innerHTML = '';
    
    if(platform === 'tajammu') title.innerText = 'تجمع شباب الشريعة';
    else if(platform === 'scouts') title.innerText = 'كشافة الإمام الحسين';
    else if(platform === 'trend') title.innerText = 'منصة ترند الإعلامية';

    SOCIAL_LINKS[platform].forEach(link => {
        const a = document.createElement('a');
        a.href = link.url; a.target = '_blank';
        a.className = 'name-panel-btn block-link'; a.innerText = link.name;
        container.appendChild(a);
    });
    modal.classList.remove('hidden');
}

function closeSocialModal() { 
    document.getElementById('socialLinksModal').classList.add('hidden'); 
}

function navigateToAttendanceLogs() {
    document.getElementById('adminScreen').classList.add('hidden');
    document.getElementById('attendanceLogsScreen').classList.remove('hidden');
    fetchAndBuildAttendanceButtons();
}

function goBackToAdminFromLogs() {
    document.getElementById('attendanceLogsScreen').classList.add('hidden');
    document.getElementById('adminScreen').classList.remove('hidden');
}

function fetchAndBuildAttendanceButtons() {
    const monthsContainer = document.getElementById('attendanceMonthsContainer');
    const daysContainer = document.getElementById('attendanceDaysContainer');
    
    monthsContainer.innerHTML = `<div class="text-center p-15" style="grid-column: 1 / -1;">جاري جلب السجلات... ⏳</div>`;
    monthsContainer.classList.remove('hidden');
    daysContainer.classList.add('hidden');
    document.getElementById('attendanceScreenTitle').innerText = "سجلات الحضور (الأشهر)";
    document.getElementById('attendanceBackBtn').onclick = goBackToAdminFromLogs;

    fetch(GAS_API_URL)
        .then(response => response.json())
        .then(data => {
            monthsContainer.innerHTML = '';
            groupedAttendanceData = {}; 
            
            if (data.error) {
                monthsContainer.innerHTML = `<div class="text-center p-15" style="color:var(--error); grid-column: 1 / -1;">حدث خطأ: ${data.error}</div>`;
                return;
            }
            if (!data || data.length === 0) {
                monthsContainer.innerHTML = `<div class="text-center p-15" style="grid-column: 1 / -1;">لا توجد سجلات مؤرشفة.</div>`;
                return;
            }

            fetchedAttendanceLogs = data;

            data.forEach((log, index) => {
                let cleanDateStr = String(log.date).split('T')[0];
                let dateParts = cleanDateStr.split('-');
                if (dateParts.length === 3) {
                    let year = dateParts[0];
                    let month = parseInt(dateParts[1]); 
                    let monthYearKey = `شهر ${month} - ${year}`;
                    
                    if (!groupedAttendanceData[monthYearKey]) groupedAttendanceData[monthYearKey] = [];
                    groupedAttendanceData[monthYearKey].push({
                        ...log,
                        cleanDate: cleanDateStr,
                        originalIndex: index
                    });
                }
            });
            renderMonthsFolders();
        })
        .catch(err => {
            monthsContainer.innerHTML = `<div class="text-center p-15" style="color:var(--error); grid-column: 1 / -1;">فشل الاتصال بقاعدة البيانات! ⚠️</div>`;
        });
}

function renderMonthsFolders() {
    const monthsContainer = document.getElementById('attendanceMonthsContainer');
    const daysContainer = document.getElementById('attendanceDaysContainer');
    monthsContainer.classList.remove('hidden');
    daysContainer.classList.add('hidden');
    document.getElementById('attendanceScreenTitle').innerText = "سجلات الحضور (الأشهر)";
    document.getElementById('attendanceBackBtn').onclick = goBackToAdminFromLogs;
    monthsContainer.innerHTML = '';

    const monthsKeys = Object.keys(groupedAttendanceData).reverse();
    monthsKeys.forEach(monthKey => {
        const btn = document.createElement('button');
        btn.className = 'panel-card square-btn saji-hover-card';
        btn.innerHTML = `<div class="card-icon">📁</div><h3 style="direction: ltr;">${monthKey}</h3>`;
        btn.onclick = () => renderDaysCapsules(monthKey);
        monthsContainer.appendChild(btn);
    });
}

function renderDaysCapsules(monthKey) {
    const monthsContainer = document.getElementById('attendanceMonthsContainer');
    const daysContainer = document.getElementById('attendanceDaysContainer');
    monthsContainer.classList.add('hidden');
    daysContainer.classList.remove('hidden');
    document.getElementById('attendanceScreenTitle').innerText = `سجلات ${monthKey}`;
    document.getElementById('attendanceBackBtn').onclick = renderMonthsFolders;
    daysContainer.innerHTML = '';

    const monthDays = groupedAttendanceData[monthKey].slice().reverse();
    monthDays.forEach(log => {
        const btn = document.createElement('button');
        btn.className = 'panel-btn saji-hover-card';
        btn.style.borderRadius = '50px';
        btn.style.padding = '8px 10px';
        btn.style.display = 'flex';
        btn.style.flexDirection = 'column';
        btn.style.alignItems = 'center';
        btn.style.justifyContent = 'center';
        btn.style.lineHeight = '1.4';
        
        btn.innerHTML = `
            <strong style="font-size: 1rem;">${log.day}</strong>
            <span style="font-size: 0.8rem; color: #8c5531; letter-spacing: 1px;">${log.cleanDate}</span>
        `;
        btn.onclick = () => openAttendanceDetailModal(log.originalIndex);
        daysContainer.appendChild(btn);
    });
}

function openAttendanceDetailModal(originalIndex) {
    const log = fetchedAttendanceLogs[originalIndex];
    if (!log) return;
    let cleanDateStr = String(log.date).split('T')[0];
    document.getElementById('attendanceModalTitle').innerHTML = `سجل حضور يوم ${log.day} <br><span style="font-size:1rem; color:var(--text-muted);">(${cleanDateStr})</span>`;
    let formattedText = log.text.replace(/\*/g, '').replace(/--------------------------/g, '══════════════════════');
    document.getElementById('attendanceModalTextContent').innerText = formattedText;
    document.getElementById('attendanceModalPdfBtn').href = log.pdfUrl;
    document.getElementById('attendanceDetailModal').classList.remove('hidden');
}

function closeAttendanceDetailModal() {
    document.getElementById('attendanceDetailModal').classList.add('hidden');
}

function navigateToFormsArchive() {
    document.getElementById('adminScreen').classList.add('hidden');
    document.getElementById('formsCategoryScreen').classList.remove('hidden');
    
    fetch(FORMS_API_URL)
        .then(res => res.json())
        .then(data => { if(!data.error) allFormsData = data; })
        .catch(err => console.log(err));
}

function goBackToAdminFromForms() {
    document.getElementById('formsCategoryScreen').classList.add('hidden');
    document.getElementById('adminScreen').classList.remove('hidden');
}

function goBackToFormsCategory() {
    document.getElementById('formsMonthsScreen').classList.add('hidden');
    document.getElementById('formsCategoryScreen').classList.remove('hidden');
}

function goBackToFormsMonths() {
    document.getElementById('formsListScreen').classList.add('hidden');
    document.getElementById('formsMonthsScreen').classList.remove('hidden');
}

function loadFormsFolders(type) {
    document.getElementById('formsCategoryScreen').classList.add('hidden');
    document.getElementById('formsMonthsScreen').classList.remove('hidden');
    document.getElementById('formsMonthsTitle').innerText = type === 'tajammu' ? "أشهر استمارات التجمع" : "أشهر استمارات الكشافة";
    
    const container = document.getElementById('formsMonthsContainer');
    container.innerHTML = '';

    const forms = allFormsData[type];
    if(!forms || forms.length === 0) {
        container.innerHTML = `<div class="text-center p-15" style="grid-column: 1/-1;">لا توجد استمارات مؤرشفة في هذا القسم.</div>`;
        return;
    }

    currentFormsGroups = {};
    forms.forEach((form, index) => {
        let dateVal = "بدون تاريخ";
        for (let key in form) {
            if (key.includes("التاريخ") || key.includes("تاريخ") || key.includes("Timestamp") || key.includes("طابع")) {
                let strVal = String(form[key]);
                let matchYMD = strVal.match(/\d{4}[-/]\d{1,2}[-/]\d{1,2}/);
                let matchDMY = strVal.match(/\d{1,2}[-/]\d{1,2}[-/]\d{4}/);
                
                if (matchYMD) dateVal = matchYMD[0].replace(/\//g, '-');
                else if (matchDMY) {
                    let p = matchDMY[0].split(/[-/]/);
                    dateVal = `${p[2]}-${p[1].padStart(2,'0')}-${p[0].padStart(2,'0')}`;
                }
                break;
            }
        }
        
        let parts = dateVal.split('-');
        let monthYear = parts.length >= 2 && parts[0] !== "بدون" ? `شهر ${parseInt(parts[1])} - ${parts[0]}` : "غير مصنف";
        
        if(!currentFormsGroups[monthYear]) currentFormsGroups[monthYear] = [];
        currentFormsGroups[monthYear].push({ form: form, cleanDate: dateVal, originalIndex: index });
    });

    let sortedKeys = Object.keys(currentFormsGroups).sort((a, b) => {
        if (a === "غير مصنف") return 1;
        if (b === "غير مصنف") return -1;
        let partsA = a.replace('شهر ', '').split(' - ');
        let partsB = b.replace('شهر ', '').split(' - ');
        let monthA = parseInt(partsA[0]), yearA = parseInt(partsA[1]);
        let monthB = parseInt(partsB[0]), yearB = parseInt(partsB[1]);
        
        if (yearA !== yearB) return yearB - yearA; 
        return monthB - monthA; 
    });

    sortedKeys.forEach(monthKey => {
        const btn = document.createElement('button');
        btn.className = 'panel-card square-btn saji-hover-card';
        btn.innerHTML = `<div class="card-icon">📁</div><h3 style="direction:ltr;">${monthKey}</h3>`;
        btn.onclick = () => renderFormsCapsules(monthKey, type);
        container.appendChild(btn);
    });
}

function renderFormsCapsules(monthKey, type) {
    document.getElementById('formsMonthsScreen').classList.add('hidden');
    document.getElementById('formsListScreen').classList.remove('hidden');
    document.getElementById('formsListTitle').innerText = `أنشطة ${monthKey}`;
    
    document.getElementById('monthActionContainer').innerHTML = `
        <div style="text-align: center;">
            <button class="pill-action-btn" style="background: linear-gradient(135deg, var(--saji-main), var(--gold)); color: #fff; padding: 10px 25px; font-size: 0.9rem; border: none; box-shadow: 0 4px 10px rgba(0,0,0,0.2); display: inline-flex; align-items: center; justify-content: center; gap: 8px; width: auto; min-width: 250px;" onclick="generateMonthFormsPDF('${monthKey}', '${type}')">
                <span style="font-size: 1.2rem;">📄</span> تحميل أرشيف الشهر بالكامل
            </button>
        </div>
    `;

    const container = document.getElementById('formsCapsulesContainer');
    container.innerHTML = '';

    const monthData = currentFormsGroups[monthKey];
    monthData.forEach(item => {
        const btn = document.createElement('button');
        btn.className = 'panel-btn saji-hover-card';
        btn.style.borderRadius = '50px';
        btn.style.padding = '8px 10px';
        btn.style.display = 'flex';
        btn.style.flexDirection = 'column';
        btn.style.alignItems = 'center';
        
        btn.innerHTML = `
            <strong style="font-size: 0.9rem;">استمارة نشاط</strong>
            <span style="font-size: 0.85rem; color: var(--gold); margin-top:5px; font-weight:bold;">${item.cleanDate}</span>
        `;
        btn.onclick = () => openFormTextModal(type, item.originalIndex, item.cleanDate);
        container.appendChild(btn);
    });
}

function openFormTextModal(type, index, dateVal) {
    currentFormView = { type, index };
    const form = allFormsData[type][index];
    document.getElementById('formModalTitle').innerHTML = `استمارة نشاط رقمية<br><span style="font-size:0.9rem; color:var(--text-muted);">(${dateVal})</span>`;
    
    let textHtml = "";
    let excludeWords = ["url", "رابط", "صورة", "ملف", "publisher", "increment", "edit", "doc", "pdf"];
    
    for(let key in form) {
        let lowKey = key.toLowerCase();
        if(excludeWords.some(word => lowKey.includes(word))) continue;
        
        let val = form[key];
        if (val === undefined || val === null || String(val).trim() === "") { val = "لا يوجد"; }
        
        if(!key.includes("Timestamp") && !key.includes("طابع زمني")) {
            let formattedVal = String(val).trim();
            if(key.includes("اسماء") || key.includes("مشاركين")) {
                let namesArray = formattedVal.split(/[\r\n,،]+/).map(n => n.trim()).filter(n => n !== "");
                if (namesArray.length > 0) {
                    formattedVal = namesArray.map(n => `<span style="display:inline-block; white-space:nowrap; margin-left:15px;">${n}</span>`).join('');
                }
            } else {
                formattedVal = formattedVal.replace(/\n/g, '<br>');
            }

            textHtml += `<div style="margin-bottom:8px; border-bottom:1px solid rgba(196, 139, 93, 0.2); padding-bottom:5px;">
                <strong style="color:var(--gold);">${key}:</strong> <div style="direction:rtl; display:inline; line-height:1.6;">${formattedVal}</div>
            </div>`;
        }
    }
    document.getElementById('formModalTextContent').innerHTML = textHtml;
    document.getElementById('formTextModal').classList.remove('hidden');
}

function closeFormTextModal() { document.getElementById('formTextModal').classList.add('hidden'); }
function closeFormPdfModal() { document.getElementById('formPdfModal').classList.add('hidden'); }

function buildFormPageHtml(form, type) {
    let themeColor = type === 'tajammu' ? '#4a7c59' : '#5c4d7d'; 
    let logoUrl = type === 'tajammu' ? 'https://i.ibb.co/N2BJ7Srb/N2BJ7Srb.jpg' : 'https://i.ibb.co/DfsfqRP8/IMG-20260604-182014-169.png';
    let formTitle = type === 'tajammu' ? 'استمارة نشاطات التجمع' : 'استمارة نشاطات الكشافة';
    
    let headerText = type === 'tajammu' 
        ? '<div style="display: inline-block; text-align: center;"><div style="font-size: 16px; font-weight: bold; white-space: nowrap;">تجمع شباب الشريعة</div><div style="font-size: 14px; font-weight: normal; margin-top:2px;">مديرية البصرة</div></div>' 
        : '<div style="display: inline-block; text-align: center;"><div style="font-size: 15px; font-weight: bold; white-space: nowrap;">جمعية كشافة الامام الحسين (ع)</div><div style="font-size: 13px; font-weight: normal; margin-top:2px;">م مفوضية البصرة</div></div>';

    let gridItems = '';
    let excludeWords = ["url", "رابط", "صورة", "ملف", "publisher", "increment", "edit", "doc", "pdf"];
    
    for(let key in form) {
        let lowKey = key.toLowerCase();
        if(excludeWords.some(word => lowKey.includes(word))) continue;
        
        let val = form[key];
        if (val === undefined || val === null || String(val).trim() === "") { val = "لا يوجد"; }

        if(!key.includes("Timestamp") && !key.includes("طابع زمني")) {
            let isFullWidth = key.includes("اسماء") || key.includes("أسماء");
            let itemWidth = isFullWidth ? "100%" : "calc(50% - 7.5px)";
            let labelWidth = isFullWidth ? "20%" : "35%";
            let valueWidth = isFullWidth ? "80%" : "65%";
            
            let displayValue = String(val).trim();

            if (isFullWidth) {
                let namesArray = displayValue.split(/[\r\n,،]+/).map(n => n.trim()).filter(n => n !== "");
                if (namesArray.length > 0) {
                    displayValue = namesArray.map(n => `<span style="display: inline-block; white-space: nowrap; margin-left: 15px;">${n}</span>`).join('');
                }
            } else {
                displayValue = displayValue.replace(/\n/g, '<br>');
            }

            gridItems += `
                <div style="width: ${itemWidth}; display: flex; flex-direction: column; border: 1.5px solid ${themeColor}; border-radius: 8px; overflow: hidden; box-shadow: 1px 1px 3px rgba(0,0,0,0.05); box-sizing: border-box; background-color: #fff; page-break-inside: avoid; margin-bottom: 15px;">
                    <div style="display: flex; direction: rtl; width: 100%; flex-grow: 1; align-items: stretch;">
                        <div style="width: ${labelWidth}; background-color: ${themeColor}; color: #fff; padding: 10px 15px; font-weight: bold; text-align: right; font-size: 13px; display: flex; align-items: center; border-left: 1.5px solid ${themeColor}; box-sizing: border-box;">
                            ${key}
                        </div>
                        <div style="width: ${valueWidth}; padding: 10px 15px; font-size: 13px; color: #222; font-weight: bold; text-align: right; line-height: 1.8; display: flex; align-items: center; justify-content: flex-start; box-sizing: border-box; flex-wrap: wrap;">
                            ${displayValue}
                        </div>
                    </div>
                </div>
            `;
        }
    }

    return `
        <div style="width: 210mm; height: 296mm; background: #fff; padding: 15mm; box-sizing: border-box; font-family: Arial, sans-serif; direction: rtl; position:relative; overflow: hidden; margin: 0 auto; color: #333;">
            <div style="position: absolute; top: 5mm; bottom: 5mm; left: 5mm; right: 5mm; border: 3px solid ${themeColor}; border-radius: 15px; pointer-events: none; z-index: 1;"></div>
            <div style="position: absolute; top: 7mm; bottom: 7mm; left: 7mm; right: 7mm; border: 1px solid ${themeColor}; border-radius: 10px; pointer-events: none; z-index: 1;"></div>
            <div style="position: relative; z-index: 2; padding: 5mm; display: flex; flex-direction: column; height: 100%;">
                
                <table style="width: 100%; border: none; margin-bottom: 25px; border-bottom: 2px solid ${themeColor}; padding-bottom: 15px;">
                    <tr>
                        <td style="width: 33%; text-align: right; vertical-align: middle; color: #333; direction: rtl;">${headerText}</td>
                        <td style="width: 34%; text-align: center; vertical-align: middle;">
                            <div style="display: inline-block; border: 2px solid ${themeColor}; border-radius: 25px; padding: 6px 18px; color: ${themeColor}; font-weight: bold; font-size: 17px; background: #fff; box-shadow: 0px 3px 0px rgba(0,0,0,0.05);">${formTitle}</div>
                        </td>
                        <td style="width: 33%; text-align: left; vertical-align: middle; direction: rtl;">
                            <img src="${logoUrl}" style="height: 70px; width: auto; border-radius: 8px; border: 1px solid #eee;">
                        </td>
                    </tr>
                </table>

                <div style="display: flex; flex-wrap: wrap; gap: 15px; justify-content: flex-start; align-content: flex-start; width: 100%; direction: rtl;">
                    ${gridItems}
                </div>

                <table style="width: 100%; border: none; margin-top: auto; border-top: 1px solid #ccc; padding-top: 15px; font-weight: bold; text-align: center; color: #333; direction: rtl;">
                    <tr>
                        <td style="width: 33%; font-size: 14px;">علي العواجي<br><span style="font-size:12px; font-weight:normal; color:#666;">مسؤول لجنة المتابعة</span></td>
                        <td style="width: 33%; font-size: 14px;">محمد بشير<br><span style="font-size:12px; font-weight:normal; color:#666;">مدير قسم الموارد البشرية</span></td>
                        <td style="width: 33%; font-size: 14px;">حسن فاضل<br><span style="font-size:12px; font-weight:normal; color:#666;">مدير قسم الاعلام</span></td>
                    </tr>
                </table>

            </div>
        </div>
    `;
}

function generateFormPDF() {
    closeFormTextModal();
    const type = currentFormView.type;
    const form = allFormsData[type][currentFormView.index];
    const htmlPage = buildFormPageHtml(form, type);
    
    document.getElementById('formPdfContentArea').innerHTML = `<div id="printableFormArea" style="background:transparent; direction: ltr; margin: 0 auto; width: 210mm;">${htmlPage}</div>`;
    document.getElementById('formPdfModal').classList.remove('hidden');
    
    const typeName = type === 'tajammu' ? 'التجمع' : 'الكشافة';
    const uniqueId = new Date().getTime(); 
    currentPdfFileName = `استمارة_نشاط_${typeName}_${uniqueId}.pdf`;
}

function generateMonthFormsPDF(monthKey, type) {
    const formsList = currentFormsGroups[monthKey];
    if (!formsList || formsList.length === 0) return;
    
    let allPagesHtml = [];
    formsList.forEach(item => {
        allPagesHtml.push(buildFormPageHtml(item.form, type));
    });
    
    const finalHtml = allPagesHtml.join('<div class="html2pdf__page-break" style="height:0; margin:0; border:none; padding:0; page-break-before:always;"></div>');
    
    document.getElementById('formPdfContentArea').innerHTML = `<div id="printableFormArea" style="background:transparent; direction: ltr; margin: 0 auto; width: 210mm;">${finalHtml}</div>`;
    document.getElementById('formPdfModal').classList.remove('hidden');
    
    const typeName = type === 'tajammu' ? 'التجمع' : 'الكشافة';
    const uniqueId = new Date().getTime();
    currentPdfFileName = `أرشيف_${monthKey.replace(/\s+/g, '_')}_${typeName}_${uniqueId}.pdf`;
}

function executeFormPdfDownload() {
    const element = document.getElementById('printableFormArea');
    const container = document.getElementById('formPdfContentArea');
    if(container) container.scrollTop = 0;

    const opt = {
        margin:       0,
        filename:     currentPdfFileName, 
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, scrollY: 0, scrollX: 0 }, 
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak:    { mode: 'css', before: '.html2pdf__page-break' }
    };

    showNotification("جاري معالجة وتصدير الملف، يرجى الانتظار... ⏳");
    
    html2pdf().set(opt).from(element).save().then(() => {
        closeFormPdfModal();
        showNotification("تم تحميل الملف بنجاح ✅");
    }).catch(err => {
        console.error(err);
        showNotification("حدث خطأ أثناء التنزيل ⚠️");
    });
}

function formatMemberDataAsText(alias) {
    const u = MEMBERS_DATABASE[alias];
    if (!u) return "";
    let text = `==============================\nالاسم الكامل: ${u.fullName}\n==============================\n\n`;
    const formatSection = (title, dataList) => {
        if (!dataList || dataList.length === 0) return "";
        let secText = `[ ${title} ]\n`;
        dataList.forEach(item => {
            if (item.label) {
                let displayVal = item.val;
                if (item.label === "أسماء الأبناء" || item.label === "الأبناء") displayVal = cleanChildrenNames(item.val);
                secText += `- ${item.label}: ${displayVal}\n`;
            }
            else if (item.title) secText += `- ${item.title} | الكتاب: ${item.doc || 'لا يوجد'} | التاريخ: ${item.date || 'لا يوجد'}\n`;
        });
        return secText + `\n`;
    };
    text += formatSection("المعلومات الأساسية", u.basic);
    text += formatSection("المهارات والهوايات", u.skills);
    text += formatSection("معلومات السكن", u.housing);
    text += formatSection("العمل والمسؤوليات", u.work);
    text += formatSection("السجل الانضباطي", u.punishments);
    text += formatSection("كتب الشكر والتقدير", u.awards);
    return text;
}

function copyMemberInfo() {
    if (!currentActiveAlias) return;
    navigator.clipboard.writeText(formatMemberDataAsText(currentActiveAlias)).then(() => {
        showNotification("تم نسخ معلومات العضو بالكامل 📋✅");
    }).catch(() => showNotification("حدث خطأ أثناء النسخ ⚠️"));
}

function buildNameBoxesHtml(fullName) {
    let parts = fullName.replace(/عبد /g, "عبد_").replace(/ابو /g, "ابو_").replace(/أبو /g, "أبو_").split(/\s+/);
    let cleanParts = parts.map(p => p.replace(/_/g, " ")); 
    let first = cleanParts[0] || "-"; let father = cleanParts[1] || "-"; let grand1 = cleanParts[2] || "-"; let grand2 = cleanParts[3] || "-"; let surname = cleanParts.slice(4).join(" ");
    if (cleanParts.length === 4) { surname = cleanParts[3]; grand2 = "-"; }
    else if (cleanParts.length === 3) { surname = cleanParts[2]; grand1 = "-"; grand2 = "-"; }
    else if (cleanParts.length === 2) { surname = cleanParts[1]; father = "-"; grand1 = "-"; grand2 = "-"; }
    if (!surname) surname = "-";

    return `<div style="display: flex; justify-content: space-between; gap: 8px; margin-bottom: 15px; direction: rtl;">
        <div style="flex: 1; border: 1px solid #d3c4b1; border-radius: 6px; overflow: hidden; text-align: center; background-color: #fff;"><div style="background-color: #e8dcc8; color: #5a3a22; font-size: 11px; padding: 5px; font-weight: bold;">الاسم الأول</div><div style="color: #333; font-size: 13px; font-weight: bold; padding: 8px;">${first}</div></div>
        <div style="flex: 1; border: 1px solid #d3c4b1; border-radius: 6px; overflow: hidden; text-align: center; background-color: #fff;"><div style="background-color: #e8dcc8; color: #5a3a22; font-size: 11px; padding: 5px; font-weight: bold;">اسم الأب</div><div style="color: #333; font-size: 13px; font-weight: bold; padding: 8px;">${father}</div></div>
        <div style="flex: 1; border: 1px solid #d3c4b1; border-radius: 6px; overflow: hidden; text-align: center; background-color: #fff;"><div style="background-color: #e8dcc8; color: #5a3a22; font-size: 11px; padding: 5px; font-weight: bold;">الجد الأول</div><div style="color: #333; font-size: 13px; font-weight: bold; padding: 8px;">${grand1}</div></div>
        <div style="flex: 1; border: 1px solid #d3c4b1; border-radius: 6px; overflow: hidden; text-align: center; background-color: #fff;"><div style="background-color: #e8dcc8; color: #5a3a22; font-size: 11px; padding: 5px; font-weight: bold;">الجد الثاني</div><div style="color: #333; font-size: 13px; font-weight: bold; padding: 8px;">${grand2}</div></div>
        <div style="flex: 1; border: 1px solid #d3c4b1; border-radius: 6px; overflow: hidden; text-align: center; background-color: #fff;"><div style="background-color: #e8dcc8; color: #5a3a22; font-size: 11px; padding: 5px; font-weight: bold;">اللقب</div><div style="color: #333; font-size: 13px; font-weight: bold; padding: 8px;">${surname}</div></div>
    </div>`;
}

function openPdfPreview() {
    if (!currentActiveAlias) return;
    const u = MEMBERS_DATABASE[currentActiveAlias];
    const themeColor = '#8c5531';
    
    const frameStyle = `width: 210mm; height: 296mm; background: #fff; padding: 15mm; box-sizing: border-box; font-family: Arial, sans-serif; direction: rtl; position: relative; overflow: hidden; margin: 0 auto; color: #333;`;

    const buildBasicSection = (title, fullName, dataList) => {
        let secHtml = `<div style="margin-bottom: 20px; page-break-inside: avoid;"><div style="background: ${themeColor}; color: #fff; padding: 6px 15px; font-weight: bold; border-radius: 6px; margin-bottom: 12px; font-size: 14px; display: inline-block;">${title}</div>${buildNameBoxesHtml(fullName)}<div style="display: flex; flex-wrap: wrap; gap: 12px;">`;
        dataList.forEach(item => {
            let displayVal = item.val;
            if (item.label === "أسماء الأبناء" || item.label === "الأبناء") displayVal = cleanChildrenNames(item.val);
            secHtml += `<div style="width: calc(50% - 6px); background: #fdfaf7; padding: 10px; border: 1px solid #e0d5c1; border-radius: 6px; font-size: 13px; display: flex; align-items: center; box-sizing: border-box;"><strong style="color: ${themeColor}; margin-left: 8px; white-space: nowrap;">${item.label}:</strong> <span style="font-weight: bold; color: #222;">${displayVal}</span></div>`;
        });
        return secHtml + `</div></div>`;
    };

    const buildPrintGrid = (title, dataList) => {
        if (!dataList || dataList.length === 0) return "";
        let secHtml = `<div style="margin-bottom: 20px; page-break-inside: avoid;"><div style="background: ${themeColor}; color: #fff; padding: 6px 15px; font-weight: bold; border-radius: 6px; margin-bottom: 12px; font-size: 14px; display: inline-block;">${title}</div><div style="display: flex; flex-wrap: wrap; gap: 12px;">`;
        dataList.forEach(item => {
            let displayVal = item.val;
            if (item.label === "أسماء الأبناء" || item.label === "الأبناء") displayVal = cleanChildrenNames(item.val);
            secHtml += `<div style="width: calc(50% - 6px); background: #fdfaf7; padding: 10px; border: 1px solid #e0d5c1; border-radius: 6px; font-size: 13px; display: flex; align-items: center; box-sizing: border-box;"><strong style="color: ${themeColor}; margin-left: 8px; white-space: nowrap;">${item.label}:</strong> <span style="font-weight: bold; color: #222;">${displayVal}</span></div>`;
        });
        return secHtml + `</div></div>`;
    };

    const buildPrintTable = (title, dataList) => {
        if (!dataList || dataList.length === 0) return "";
        let secHtml = `<div style="margin-bottom: 20px; page-break-inside: avoid;"><div style="background: ${themeColor}; color: #fff; padding: 6px 15px; font-weight: bold; border-radius: 6px; margin-bottom: 12px; font-size: 14px; display: inline-block;">${title}</div><table style="width: 100%; border-collapse: collapse; font-size: 13px; text-align: center; margin-bottom: 10px;"><thead><tr><th style="background-color: #f4eee6; color: ${themeColor}; font-weight: bold; border: 1px solid #c4b5a2; padding: 10px;">النوع</th><th style="background-color: #f4eee6; color: ${themeColor}; font-weight: bold; border: 1px solid #c4b5a2; padding: 10px;">رقم الكتاب</th><th style="background-color: #f4eee6; color: ${themeColor}; font-weight: bold; border: 1px solid #c4b5a2; padding: 10px;">التاريخ</th></tr></thead><tbody>`;
        dataList.forEach(item => { secHtml += `<tr><td style="border: 1px solid #c4b5a2; padding: 10px; color: #222;">${item.title || '-'}</td><td style="border: 1px solid #c4b5a2; padding: 10px; color: #222;">${item.doc || '-'}</td><td style="border: 1px solid #c4b5a2; padding: 10px; color: #222;">${item.date || '-'}</td></tr>`; });
        return secHtml + `</tbody></table></div>`;
    };

    let processedSkills = [];
    u.skills.forEach(skill => {
        if (skill.label === "دورة عسكرية" || skill.label === "عسكرية") {
            let valStr = String(skill.val);
            if (valStr.includes("نعم")) {
                processedSkills.push({ label: "دورة عسكرية", val: "نعم" });
                let numMatch = valStr.match(/\d+/);
                if (numMatch) processedSkills.push({ label: "عدد الدورات", val: numMatch[0] });
            } else { processedSkills.push({ label: "دورة عسكرية", val: "كلا" }); }
        } else { processedSkills.push(skill); }
    });

    let page1 = `
        <div style="${frameStyle}">
            <div style="position: absolute; top: 5mm; bottom: 5mm; left: 5mm; right: 5mm; border: 3px solid ${themeColor}; border-radius: 15px; pointer-events: none; z-index: 1;"></div>
            <div style="position: absolute; top: 7mm; bottom: 7mm; left: 7mm; right: 7mm; border: 1px solid ${themeColor}; border-radius: 10px; pointer-events: none; z-index: 1;"></div>
            <div style="position: relative; z-index: 2; padding: 5mm;">
                <table style="width: 100%; border: none; margin-bottom: 20px; border-bottom: 2px solid ${themeColor}; padding-bottom: 10px;">
                    <tr>
                        <td style="width: 33%; text-align: right; vertical-align: middle; color: #333;">
                            <div style="font-size: 16px; font-weight: bold;">تجمع شباب الشريعة</div>
                            <div style="font-size: 14px; margin-top:2px;">مديرية البصرة</div>
                        </td>
                        <td style="width: 34%; text-align: center; vertical-align: middle;">
                            <div style="display: inline-block; border: 2px solid ${themeColor}; border-radius: 25px; padding: 6px 18px; color: ${themeColor}; font-weight: bold; font-size: 17px; background: #fff; box-shadow: 0px 3px 0px rgba(0,0,0,0.05);">معلومات الملف الشخصي</div>
                        </td>
                        <td style="width: 33%; text-align: left; vertical-align: middle;">
                            <img src="${parseImgBBUrl(u.avatar)}" style="height: 80px; width: 80px; border-radius: 8px; object-fit: cover; border: 2px solid ${themeColor};">
                        </td>
                    </tr>
                </table>
                ${buildBasicSection("المعلومات الأساسية", u.fullName, u.basic)}
                ${buildPrintGrid("معلومات السكن", u.housing)}
            </div>
        </div>
    `;

    let page2 = `
        <div style="${frameStyle}">
            <div style="position: absolute; top: 5mm; bottom: 5mm; left: 5mm; right: 5mm; border: 3px solid ${themeColor}; border-radius: 15px; pointer-events: none; z-index: 1;"></div>
            <div style="position: absolute; top: 7mm; bottom: 7mm; left: 7mm; right: 7mm; border: 1px solid ${themeColor}; border-radius: 10px; pointer-events: none; z-index: 1;"></div>
            
            <div style="position: relative; z-index: 2; padding: 5mm; padding-bottom: 20mm; height: 100%; display: flex; flex-direction: column;">
                <div style="height: 10px;"></div>
                ${buildPrintGrid("الدورات والمهارات", processedSkills)}
                ${buildPrintTable("العمل والمسؤوليات", u.work)}
                ${buildPrintTable("كتب الشكر والتقدير", u.awards)}
                ${buildPrintTable("السجل الانضباطي", u.punishments)}
            </div>

            <div style="position: absolute; bottom: 15mm; left: 15mm; right: 15mm; border-top: 2px dashed ${themeColor}; padding-top: 10px; font-size: 14px; color: #333; direction: rtl; z-index: 3; text-align: right;">
                <strong>مسؤول الموارد :</strong><span style="font-weight: bold; margin-right: 5px;">محمد بشير الحلفي</span>
            </div>
        </div>
    `;

    let htmlContent = `
        <div id="printableProfileArea" style="background:transparent; direction: ltr; margin: 0 auto; width: 210mm;">
            ${page1}
            <div class="html2pdf__page-break" style="height:0; margin:0; border:none; padding:0; page-break-before:always;"></div>
            ${page2}
        </div>
    `;

    document.getElementById('pdfContentArea').innerHTML = htmlContent;
    document.getElementById('pdfPreviewModal').classList.remove('hidden');
}

function closePdfPreview() { document.getElementById('pdfPreviewModal').classList.add('hidden'); }

function executePdfDownload() {
    const element = document.getElementById('printableProfileArea');
    const container = document.getElementById('pdfContentArea');
    if(container) container.scrollTop = 0;

    const u = MEMBERS_DATABASE[currentActiveAlias];
    const fileName = `ملف_معلومات_${u.fullName.replace(/\s+/g, '_')}.pdf`;

    const opt = { 
        margin: 0, 
        filename: fileName, 
        image: { type: 'jpeg', quality: 1 }, 
        html2canvas: { scale: 2, useCORS: true, scrollY: 0, scrollX: 0 }, 
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }, 
        pagebreak: { mode: 'css', before: '.html2pdf__page-break' } 
    };

    showNotification("جاري تصدير الملف بجودة إدارية فائقة... ⏳");
    html2pdf().set(opt).from(element).save().then(() => { 
        closePdfPreview(); 
        showNotification("تم تحميل الملف بنجاح ✅"); 
    }).catch(err => {
        console.error(err);
        showNotification("حدث خطأ أثناء التصدير ⚠️");
    });
}
// -------------------------------------------------------------------
// نظام التثبيت الذكي للتطبيق (PWA Manual Install)
// -------------------------------------------------------------------
let deferredPrompt;
const installAppBtn = document.getElementById('installAppBtn');

window.addEventListener('beforeinstallprompt', (e) => {
    // منع ظهور النافذة التلقائية المزعجة
    e.preventDefault();
    // حفظ الحدث لاستخدامه عند الضغط على الزر
    deferredPrompt = e;
    // إظهار زر التثبيت في لوحة التحكم
    if (installAppBtn) installAppBtn.classList.remove('hidden');
});

if (installAppBtn) {
    installAppBtn.addEventListener('click', async () => {
        if (deferredPrompt !== null) {
            // إظهار نافذة التثبيت الرسمية من الهاتف
            deferredPrompt.prompt();
            // انتظار رد المستخدم
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                console.log('تم قبول التثبيت');
                installAppBtn.classList.add('hidden'); // إخفاء الزر بعد التثبيت
            }
            deferredPrompt = null;
        }
    });
}

// إخفاء الزر نهائياً إذا كان التطبيق مثبتاً بالفعل
window.addEventListener('appinstalled', () => {
    if (installAppBtn) installAppBtn.classList.add('hidden');
    showNotification("تم تثبيت التطبيق بنجاح! 🎉");
});
