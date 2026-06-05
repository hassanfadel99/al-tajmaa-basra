/**
 * نظام المعالجة والتحقق البرمجي الرقمي المحمي
 * تجمع شباب الشريعة-مديرية البصرة
 */

// قاعدة البيانات المحدثة والشاملة وفقاً للتفاصيل المرسلة
const MEMBERS_DATABASE = {
    "ابو فهد": {
        code: "SF-31300", fullName: "صباح فاضل جاسم حسين العواجي", avatar: "https://ibb.co/gZThbDYp", drive: "https://drive.google.com/drive/folders/1Lno5kFx-CJYx_KZAeKYm2egkYM59kPJ_",
        basic: [ { label: "التولد", val: "5/2/2000" }, { label: "رقم الهاتف", val: "07747309173" }, { label: "التحصيل الدراسي", val: "دبلوم" }, { label: "اسم الأم الثلاثي", val: "نجاة عدلان سعيد" }, { label: "الحالة الاجتماعية", val: "متزوج" }, { label: "اسم الزوجة", val: "حليمة عزيز عبد" }, { label: "تولد الزوجة", val: "3/6/2005" }, { label: "أسماء الأبناء", val: "1- فهد صباح فاضل" } ],
        skills: [ { label: "الدورات", val: "لا يوجد" }, { label: "الهوايات", val: "كرة القدم ٫ التصوير ٫محرر اكواد برمجة ٫ التصميم" }, { label: "دورة عسكرية", val: "كلا" }, { label: "إجادة الأسلحة", val: "كلاشنكوف ٫ مسدس" } ],
        housing: [ { label: "معلومات السكن", val: "البصرة قضاء المدينة حي الشهداء" }, { label: "نوع السكن", val: "ايجار" }, { label: "أقرب نقطة دالة", val: "دائرة البطاقة الوطنية" }, { label: "العنوان السابق", val: "كربلاء" } ],
        work: [ { title: "قسم الاعلام المركزي", doc: "", date: "2023" } ], punishments: [], awards: []
    },
    "ابو غزل": {
        code: "KA-89014", fullName: "كرار ازريع ماطر اجويد البخاتري", avatar: "https://ibb.co/j9LfHLSt", drive: "https://drive.google.com/drive/folders/1avF2T1LmL7RmZ_asNWFBMeY7mfi_Sb1d",
        basic: [ { label: "التولد", val: "14/2/1989" }, { label: "رقم الهاتف", val: "07780368016" }, { label: "التحصيل", val: "ابتدائية" }, { label: "اسم الأم", val: "ساعدية جباري جيجان" }, { label: "الحالة الاجتماعية", val: "متزوج" }, { label: "اسم الزوجة", val: "بدور ناجي كاظم" }, { label: "أسماء الأبناء", val: "1-علي كرار ، 2-غزل كرار" } ],
        skills: [ { label: "الدورات", val: "لا يوجد" }, { label: "الهوايات", val: "ترحال ، سباحه" }, { label: "دورة عسكرية", val: "كلا" }, { label: "إجادة الأسلحة", val: "كلاشنكوف ٫ مسدس" } ],
        housing: [ { label: "السكن", val: "البصرة قضاء المدينة حي الشهداء" }, { label: "نوع السكن", val: "ايجار" }, { label: "نقطة دالة", val: "مدرسة الخوارزمي الابتدائية" }, { label: "العنوان السابق", val: "لا يوجد" } ],
        work: [ { title: "مسؤول قسم التجهيز", doc: "", date: "2022" } ],
        punishments: [ { title: "تنبيه", doc: "123", date: "3/8/2024" }, { title: "تنبيه", doc: "239", date: "2/3/2025" } ],
        awards: [ { title: "شكر", doc: "215", date: "27/12/2024" } ]
    },
    "ابو زينب": {
        code: "MH-02102", fullName: "منتظر حزام سلمان عبد الحسين الحساني", avatar: "https://ibb.co/fzPjhKmh", drive: "https://drive.google.com/drive/folders/1czMi0F8NTS1avUj9DWGeuLQWGvLCId9E",
        basic: [ { label: "التولد", val: "21/10/2002" }, { label: "رقم الهاتف", val: "07788488821" }, { label: "التحصيل", val: "دبلوم" }, { label: "اسم الأم", val: "وهيبة حيدر حمد" }, { label: "الحالة الاجتماعية", val: "متزوج" }, { label: "اسم الزوجة", val: "تغريد عبد الفضل جفات" }, { label: "أسماء الأبناء", val: "1-زينب منتظر حزام" } ],
        skills: [ { label: "الدورات", val: "دورة قائد" }, { label: "الهوايات", val: "كرة القدم ٫ التصوير ٫ التصميم" }, { label: "دورة عسكرية", val: "كلا" }, { label: "إجادة الأسلحة", val: "كلاشنكوف ٫ مسدس" } ],
        housing: [ { label: "السكن", val: "البصرة قضاء المدينة الجلال" }, { label: "نوع السكن", val: "زراعي" }, { label: "نقطة دالة", val: "مدرسة العقيدة" }, { label: "العنوان السابق", val: "لا يوجد" } ],
        work: [ { title: "قائد فرقة", doc: "", date: "" }, { title: "مسؤول مؤسسة ابناء المهندس", doc: "", date: "2021" }, { title: "امين اعلام الكشافة", doc: "", date: "" } ],
        punishments: [ { title: "تنبيه", doc: "123", date: "3/8/2024" } ],
        awards: [ { title: "شكر", doc: "241", date: "2/4/2025" } ]
    },
    "علي الحساني": {
        code: "AQ-97225", fullName: "علي عبدالقادر سلمان عبد الحسين الحساني", avatar: "https://ibb.co/YCnDBKs", drive: "https://drive.google.com/drive/folders/1-pCu7LeC-uzWXUdQMUKxmaOtAM4BxJZB",
        basic: [ { label: "التولد", val: "25/2/1997" }, { label: "رقم الهاتف", val: "07713984061" }, { label: "التحصيل", val: "ابتدائية" }, { label: "اسم الأم", val: "ناديه زيدان خدام" }, { label: "الحالة", val: "متزوج" }, { label: "الزوجة", val: "نرجس عبد الفضل جفات" }, { label: "الأبناء", val: "1-رضا علي عبد القادر" } ],
        skills: [ { label: "الدورات", val: "دورة قائد ٫ دورة شارة كشافة" }, { label: "الهوايات", val: "لا يوجد" }, { label: "عسكرية", val: "كلا" }, { label: "إجادة الأسلحة", val: "كلاشنكوف ٫ مسدس" } ],
        housing: [ { label: "السكن", val: "البصرة قضاء المدينة الجلال" }, { label: "نوع السكن", val: "زراعي" }, { label: "نقطة دالة", val: "مدرسة العقيدة" }, { label: "العنوان السابق", val: "لا يوجد" } ],
        work: [ { title: "قائد فرقة", doc: "", date: "2016" }, { title: "عميد فوج", doc: "", date: "3/1/2025" } ],
        punishments: [ { title: "تنبيه", doc: "123", date: "3/8/2024" } ], awards: []
    },
    "سيد ياسين": {
        code: "YM-03729", fullName: "ياسين مهدي حسين محمد البطاط", avatar: "https://ibb.co/nMP484X9", drive: "https://drive.google.com/drive/folders/1V7kvMuFEiOq8pLyqWkzR0aIpjsNzLrv5",
        basic: [ { label: "التولد", val: "29/7/2003" }, { label: "رقم الهاتف", val: "07841231371" }, { label: "التحصيل", val: "ابتدائية" }, { label: "اسم الأم", val: "صالحة علي محمد" }, { label: "الحالة", val: "اعزب" } ],
        skills: [ { label: "الدورات", val: "قائد فرق" }, { label: "الهوايات", val: "كرة القدم ، قراءة" }, { label: "عسكرية", val: "كلا" }, { label: "إجادة الأسلحة", val: "كلاشنكوف ٫ مسدس" } ],
        housing: [ { label: "السكن", val: "البصرة /قضاء الصادق/ باهلة" }, { label: "نوع السكن", val: "زراعي" }, { label: "نقطة دالة", val: "مسجد الامام المهدي ع" }, { label: "العنوان السابق", val: "لا يوجد" } ],
        work: [ { title: "الاعلام المركزي", doc: "", date: "2026" } ],
        punishments: [ { title: "توبيخ", doc: "122", date: "3/8/2024" }, { title: "تنبيه", doc: "123", date: "3/8/2024" }, { title: "انذار نهائي", doc: "167", date: "24/7/2024" } ], awards: []
    },
    "ابو رقية": {
        code: "AH-96102", fullName: "علي عبد الحسين هليل حامي العواجي", avatar: "https://ibb.co/0yVV6JMs", drive: "https://drive.google.com/drive/folders/1vtm5vAsOzjOBIlPf5XfAHh2wc4_aWs2K",
        basic: [ { label: "التولد", val: "21/10/1996" }, { label: "رقم الهاتف", val: "07717576100" }, { label: "التحصيل", val: "بكالوريوس علوم البيئة" }, { label: "اسم الأم", val: "جنان جاسم محمد" }, { label: "الحالة", val: "متزوج" }, { label: "الزوجة", val: "ايات عبد الله عبد الائمة" }, { label: "تولد الزوجة", val: "12/9/1999" }, { label: "الأبناء", val: "1-رقية علي عبد الحسين (2025)" } ],
        skills: [ { label: "الدورات", val: "دورة عميد فوج ٫ دورة قائد" }, { label: "الهوايات", val: "كرة القدم" }, { label: "عسكرية", val: "نعم (3 دورات)" }, { label: "إجادة الأسلحة", val: "كلاشنكوف ٫ مسدس" } ],
        housing: [ { label: "السكن", val: "البصرة قضاء المدينة حي الشهداء" }, { label: "نوع السكن", val: "زراعي" }, { label: "نقطة دالة", val: "دائرة البطاقة الوطنية" }, { label: "العنوان السابق", val: "لا يوجد" } ],
        work: [ { title: "مسؤول المتابعة", doc: "79", date: "10/10/2023" }, { title: "قسم جرد المعلومات", doc: "157", date: "7/3/2024" }, { title: "مسؤول الادارة المركزية", doc: "", date: "" } ],
        punishments: [ { title: "تنبيه", doc: "130", date: "16/4/2024" } ], awards: []
    },
    "محمد السلمي": {
        code: "MN-04010", fullName: "محمد نوري فالح زغير السلمي", avatar: "https://ibb.co/spSWJ4XR", drive: "https://drive.google.com/drive/folders/1YNJ4vv0JEZr9KyGgf1Uwk-TfBxRe2mTC",
        basic: [ { label: "التولد", val: "1/1/2004" }, { label: "رقم الهاتف", val: "07733201484" }, { label: "التحصيل", val: "اعدادية" }, { label: "اسم الأم", val: "سميرة جنيد شريم" }, { label: "الحالة", val: "اعزب" } ],
        skills: [ { label: "الدورات", val: "لا يوجد" }, { label: "الهوايات", val: "سباحة تصوير صيد" }, { label: "عسكرية", val: "نعم (عدد 1)" }, { label: "إجادة الأسلحة", val: "كلاشنكوف ٫ مسدس،رمانة ،بيكسي" } ],
        housing: [ { label: "السكن", val: "البصرة قضاء المدينة حي الشهداء" }, { label: "نوع السكن", val: "ملك" }, { label: "نقطة دالة", val: "مدرسة الخوارزمي الابتدائية" }, { label: "العنوان السابق", val: "سوق قضاء المدينة" } ],
        work: [ { title: "مسؤول قسم الصيانة", doc: "", date: "2021" }, { title: "امن المديرية", doc: "", date: "2020" } ],
        punishments: [ { title: "توبيخ", doc: "", date: "16/4/2023" }, { title: "انذار اول", doc: "8", date: "11/10/2023" } ], awards: []
    },
    "ابو سراج": {
        code: "MA-89923", fullName: "مرتضى عبد النبي حسن كاصد العبادي", avatar: "https://ibb.co/v6Mtw2bx", drive: "https://drive.google.com/drive/folders/1mwT0FemmunTEfDSKyt_F87M5OxxV0rZm",
        basic: [ { label: "التولد", val: "23/9/1989" }, { label: "رقم الهاتف", val: "07713562826" }, { label: "التحصيل", val: "بكالوريوس" }, { label: "اسم الأم", val: "رسمية كاظم عباس" }, { label: "الحالة", val: "متزوج" }, { label: "الزوجة", val: "انوار ناصر داخل" }, { label: "الأبناء", val: "1-سراج مرتضى ، 2-ريحانه مرتضى" } ],
        skills: [ { label: "الدورات", val: "دورة قائد" }, { label: "الهوايات", val: "ركوب الخيل ،رماية وسباحة" }, { label: "عسكرية", val: "نعم" }, { label: "إجادة الأسلحة", val: "كلاشنكوف ٫ مسدس" } ],
        housing: [ { label: "السكن", val: "البصرة قضاء المدينة حي الشهداء" }, { label: "نوع السكن", val: "ملك" }, { label: "نقطة دالة", val: "مدرسة الخوارزمي الابتدائية" }, { label: "العنوان السابق", val: "لا يوجد" } ],
        work: [ { title: "مسؤول قسم الكشافة", doc: "", date: "2021" } ], punishments: [], awards: []
    },
    "ابو باقر": {
        code: "WK-99117", fullName: "وليد خالد حسن جعاز الحيدري", avatar: "https://ibb.co/ym1rdV3S", drive: "https://drive.google.com/drive/folders/1omVlCNX2tREUfoBdacj88VkJdGaTYT9H",
        basic: [ { label: "التولد", val: "17/1/1999" }, { label: "رقم الهاتف", val: "07840831914" }, { label: "التحصيل", val: "طالب جامعي" }, { label: "اسم الأم", val: "خديجة يحيى عبد الحسن" }, { label: "الحالة", val: "متزوج" }, { label: "الزوجة", val: "جنان طاهر يحيى" }, { label: "الأبناء", val: "1-باقر وليد ، 2-شاه زنان وليد" } ],
        skills: [ { label: "الدورات", val: "لا يوجد" }, { label: "الهوايات", val: "كرة القدم ٫ مطالعه تصوير تصميم" }, { label: "عسكرية", val: "كلا" }, { label: "إجادة الأسلحة", val: "كلاشنكوف ٫ مسدس" } ],
        housing: [ { label: "السكن", val: "البصرة قضاء المدينة منطقة الحيادر" }, { label: "نوع السكن", val: "زراعي" }, { label: "نقطة دالة", val: "مدرسة الاهوار الابتدائية" }, { label: "العنوان السابق", val: "لا يوجد" } ],
        work: [ { title: "عميد فوج", doc: "", date: "" }, { title: "مسؤول قسم التخطيط", doc: "", date: "" } ], punishments: [],
        awards: [ { title: "شكر", doc: "241", date: "2/4/2025" } ]
    },
    "ابو فاطمة": {
        code: "MO-84122", fullName: "مازن عواد طالب خضير السوداني", avatar: "https://i.ibb.co/wrptBSZz/IMG-20260522-145859-919-1.jpg", drive: "https://drive.google.com/drive/folders/1KhIm05ca5IC6XRI5mS7yCYJ-gOg-uGhw",
        basic: [ { label: "التولد", val: "21/12/1984" }, { label: "رقم الهاتف", val: "07703190263" }, { label: "التحصيل", val: "بكالوريوس" }, { label: "اسم الأم", val: "نشمية عبد العظيم خضير" }, { label: "الحالة", val: "متزوج" }, { label: "الزوجة", val: "غفران كريم عبد الرسول" } ],
        skills: [ { label: "الدورات", val: "لا يوجد" }, { label: "الهوايات", val: "كمال الاجسام، القيادة ،الحسابات" }, { label: "عسكرية", val: "كلا" }, { label: "إجادة الأسلحة", val: "كلاشنكوف ، مسدس" } ],
        housing: [ { label: "السكن", val: "البصرة قضاء المدينة حي الشهداء 1" }, { label: "نوع السكن", val: "ملك" }, { label: "نقطة دالة", val: "مؤسسة العين" }, { label: "العنوان السابق", val: "لا يوجد" } ],
        work: [], punishments: [], awards: []
    },
    "ابو رضا": {
        code: "MC-97112", fullName: "محسن علي خميس حمود السالم", avatar: "https://ibb.co/8gH6K0gt", drive: "https://drive.google.com/drive/folders/1Gtsrg8vnZfETkmtm94wMrVR4v3rb_zmO",
        basic: [ { label: "التولد", val: "1/12/1997" }, { label: "رقم الهاتف", val: "07710928015" }, { label: "التحصيل", val: "دبلوم" }, { label: "اسم الأم", val: "كريمة عبد الله فرهود" }, { label: "الحالة", val: "متزوج" }, { label: "الزوجة", val: "زينب علي عبد العباس" }, { label: "الأبناء", val: "1-رضا محسن علي (2023)" } ],
        skills: [ { label: "الدورات", val: "دورة قائد، عميد فوج ، مدرب، لجميع الاختصاصات" }, { label: "الهوايات", val: "السفر" }, { label: "عسكرية", val: "نعم" }, { label: "إجادة الأسلحة", val: "كلاشنكوف ٫ مسدس" } ],
        housing: [ { label: "السكن", val: "البصرة /قضاء الصادق/ السالم" }, { label: "نوع السكن", val: "زراعي" }, { label: "نقطة دالة", val: "لا يوجد" }, { label: "العنوان السابق", val: "لا يوجد" } ],
        work: [ { title: "مسؤول المؤسسة الصحية", doc: "", date: "" } ], punishments: [], awards: []
    },
    "محمد الحلفي": {
        code: "MB-01125", fullName: "محمد بشير جرمل صالح السخان", avatar: "https://ibb.co/35B2QRtq", drive: "https://drive.google.com/drive/folders/1m9-JGF4GjIAJJFwgrqdnoebIipc9tThM",
        basic: [ { label: "التولد", val: "25/1/2001" }, { label: "رقم الهاتف", val: "07716869329" }, { label: "التحصيل", val: "طالب جامعي" }, { label: "اسم الأم", val: "رباب غازي لطيف" }, { label: "الحالة", val: "اعزب" } ],
        skills: [ { label: "الدورات", val: "دورة قائد، شارة كشافة ، اختصاص موارد بشرية" }, { label: "الهوايات", val: "كرة القدم ٫" }, { label: "عسكرية", val: "كلا" }, { label: "إجادة الأسلحة", val: "كلاشنكوف ٫ مسدس" } ],
        housing: [ { label: "السكن", val: "البصرة/ قضاء الصادق /الرحمانية" }, { label: "نوع السكن", val: "زراعي" }, { label: "نقطة دالة", val: "مسجد بقية الله الاعظم" }, { label: "العنوان السابق", val: "لا يوجد" } ],
        work: [ { title: "مدير الموارد البشرية", doc: "", date: "2018" }, { title: "امين السر", doc: "", date: "" } ],
        punishments: [ { title: "توبيخ", doc: "213", date: "27/12/2024" } ], awards: []
    },
    "سيد شبيب": {
        code: "SB-96217", fullName: "شبيب عبدالامير ناصر محمد البطاط", avatar: "https://ibb.co/bMDJXPjP", drive: "https://drive.google.com/drive/folders/1oH5MU0QxO3jor_uBtAuykhNE4eUhXh4z",
        basic: [ { label: "التولد", val: "17/2/1996" }, { label: "رقم الهاتف", val: "07859367571" }, { label: "التحصيل", val: "متوسطة" }, { label: "اسم الأم", val: "نجيبة علي محمد" }, { label: "الحالة", val: "اعزب" } ],
        skills: [ { label: "الدورات", val: "دورة قائد" }, { label: "الهوايات", val: "كرة القدم ٫" }, { label: "عسكرية", val: "كلا" }, { label: "إجادة الأسلحة", val: "كلاشنكوف ٫ مسدس" } ],
        housing: [ { label: "السكن", val: "البصرة /قضاء الصادق/ باهلة" }, { label: "نوع السكن", val: "زراعي" }, { label: "نقطة دالة", val: "مسجد الامام المهدي عج" }, { label: "العنوان السابق", val: "لا يوجد" } ],
        work: [ { title: "قائد فرقة", doc: "", date: "2019" } ],
        punishments: [ { title: "توبيخ", doc: "122", date: "3/8/2024" }, { title: "توبيخ", doc: "168", date: "24/7/2024" } ], awards: []
    },
    "ابو موسى": {
        code: "AA-06616", fullName: "علي احمد ضيدان نعمه الشاوي", avatar: "https://ibb.co/sv2Ggtmb", drive: "https://drive.google.com/drive/folders/1Og9Ynxt6b0YvjuLEtkCH6ZeBy8HofhfT",
        basic: [ { label: "التولد", val: "16/6/2006" }, { label: "رقم الهاتف", val: "07771702810" }, { label: "التحصيل", val: "طالب حالي" }, { label: "اسم الأم", val: "هند شاطي تركي" }, { label: "الحالة", val: "اعزب" } ],
        skills: [ { label: "الدورات", val: "لا يوجد" }, { label: "الهوايات", val: "٫ التصوير ٫ التصميم" }, { label: "عسكرية", val: "كلا" }, { label: "إجادة الأسلحة", val: "كلاشنكوف ٫ مسدس" } ],
        housing: [ { label: "السكن", val: "البصرة قضاء المدينة البشاوي" }, { label: "نوع السكن", val: "زراعي" }, { label: "نقطة دالة", val: "مدرسة الضفاف الابتدائية" }, { label: "العنوان السابق", val: "لا يوجد" } ],
        work: [ { title: "مساعد مدير الاعلام المركزي", doc: "", date: "18/3/2025" }, { title: "قائد فرقة", doc: "", date: "9/9/2025" } ], punishments: [], awards: []
    },
    "ابو علي": {
        code: "FF-91302", fullName: "فرحان فلاح عبد النبي عبيد الحيدري", avatar: "https://ibb.co/0j7KQSYz", drive: "https://drive.google.com/drive/folders/1bRGc1TdHDUfwgNeOjK5aQnclfdTVWuEQ",
        basic: [ { label: "التولد", val: "2/3/1991" }, { label: "رقم الهاتف", val: "07807524522" }, { label: "التحصيل", val: "بكالوريوس" }, { label: "اسم الأم", val: "احلام يحيى عبد الحسين" }, { label: "الحالة", val: "متزوج" }, { label: "الزوجة", val: "شفاء جمعة هاشم" }, { label: "الأبناء", val: "1-علي فرحان ، 2-عُلى فرحان ، 3-زينب فرحان" } ],
        skills: [ { label: "الدورات", val: "لا يوجد" }, { label: "الهوايات", val: "مطالعة, كرة القدم, سفر" }, { label: "عسكرية", val: "كلا" }, { label: "إجادة الأسلحة", val: "كلاشنكوف ٫ مسدس" } ],
        housing: [ { label: "السكن", val: "البصرة قضاء المدينة منطقة الحيادر" }, { label: "نوع السكن", val: "زراعي" }, { label: "نقطة دالة", val: "مدرسة الاهوار الابتدائية" }, { label: "العنوان السابق", val: "لا يوجد" } ],
        work: [ { title: "مدير مداد الطلابية", doc: "", date: "" } ], punishments: [], awards: []
    },
    "حسين السوداني": {
        code: "HY-02106", fullName: "حسين يحيى عبد مزبان السوداني", avatar: "https://ibb.co/tMPCRZKw", drive: "https://drive.google.com/drive/folders/1kawtRfWODuljfnUm5CL_NlcsLrvM1xrn",
        basic: [ { label: "التولد", val: "6/1/2002" }, { label: "رقم الهاتف", val: "07727714725" }, { label: "اسم الأم", val: "ليلى فاضل عبد" }, { label: "الحالة", val: "اعزب" } ],
        skills: [ { label: "الدورات", val: "لا يوجد" }, { label: "الهوايات", val: "قراءة القران" }, { label: "عسكرية", val: "نعم" }, { label: "إجادة الأسلحة", val: "كلاشنكوف ٫ مسدس" } ],
        housing: [ { label: "السكن", val: "البصرة/ قضاء المدينة/ السودان" }, { label: "نوع السكن", val: "زراعي" }, { label: "نقطة دالة", val: "مسجد الامام الحسين" }, { label: "العنوان السابق", val: "لا يوجد" } ],
        work: [ { title: "مدير الفرقة الانشادية", doc: "", date: "" }, { title: "مدير مؤسسة ابن الجواد (وكالة)", doc: "", date: "" } ],
        punishments: [ { title: "تجميد", doc: "194", date: "20/9/2024" }, { title: "تنبيه", doc: "240", date: "3/2/2025" } ], awards: []
    },
    "حمزة": {
        code: "HM-02605", fullName: "حمزة محمد عبد الزهرة مزعل العواجي", avatar: "https://ibb.co/bMLsFQw3", drive: "https://drive.google.com/drive/folders/1F9ZfcX7DtPzeHmCC7YnIqUtSgTQYNe0E",
        basic: [ { label: "التولد", val: "5/6/2002" }, { label: "رقم الهاتف", val: "07703572803" }, { label: "التحصيل", val: "الثالث متوسط" }, { label: "اسم الأم", val: "مدلولة حسن عبيج" }, { label: "الحالة", val: "اعزب" } ],
        skills: [ { label: "الدورات", val: "لا يوجد" }, { label: "الهوايات", val: "كرة القدم ٫" }, { label: "عسكرية", val: "كلا" }, { label: "إجادة الأسلحة", val: "كلاشنكوف ٫ مسدس" } ],
        housing: [ { label: "السكن", val: "البصرة قضاء المدينة حي الشهداء" }, { label: "نوع السكن", val: "ملك" }, { label: "نقطة دالة", val: "البطاقة الوطنية" }, { label: "العنوان السابق", val: "لا يوجد" } ],
        work: [ { title: "قائد فرقة", doc: "", date: "" } ], punishments: [],
        awards: [ { title: "شكر", doc: "241", date: "2/4/2025" } ]
    },
    "ابو حسن": {
        code: "DA-96117", fullName: "ضياء علاء سعيد هجول العويض", avatar: "https://ibb.co/F4NyD3b9", drive: "https://drive.google.com/drive/folders/1PtQ5k84wX7d7QKObnEDpvw5mQlh14Df9",
        basic: [ { label: "التولد", val: "7/11/1996" }, { label: "رقم الهاتف", val: "07703168682" }, { label: "التحصيل", val: "متوسطة" }, { label: "اسم الأم", val: "حذام باهض هجول" }, { label: "الحالة", val: "متزوج" }, { label: "الزوجة", val: "فاطمة مانع كاظم" }, { label: "تولد الزوجة", val: "1/3/2003" }, { label: "الأبناء", val: "1-حسن ضياء ، 2-حسين ضياء" } ],
        skills: [ { label: "الدورات", val: "دورة قائد,دورة الربال، عميد فوج، شارة جوالة" }, { label: "الهوايات", val: "كرة القدم ٫ التصوير ٫ التصميم، سباحة" }, { label: "عسكرية", val: "نعم" }, { label: "إجادة الأسلحة", val: "كلاشنكوف ٫ مسدس" } ],
        housing: [ { label: "السكن", val: "البصرة /قضاء الصادق/منطقة الجري" }, { label: "نوع السكن", val: "زراعي" }, { label: "نقطة دالة", val: "مدرسة الوفاء الابتدائية" }, { label: "العنوان السابق", val: "لا يوجد" } ],
        work: [ { title: "مدير مؤسسة جهاد البناء", doc: "153", date: "24/6/2024" } ],
        punishments: [ { title: "تنبيه", doc: "", date: "27/4/2024" }, { title: "تنبيه", doc: "257", date: "15/3/2025" } ],
        awards: [ { title: "شكر", doc: "171", date: "28/7/2024" }, { title: "شكر", doc: "214", date: "27/12/2024" } ]
    },
    "ابو وتين": {
        code: "AE-99322", fullName: "احمد احسان برزان نعمه", avatar: "https://ibb.co/B2WbkWSY", drive: "https://drive.google.com/drive/folders/1QUtUqfby9jEP1fyxOhHFjxiLQ7oFNHJP",
        basic: [ { label: "التولد", val: "22/3/1999" }, { label: "رقم الهاتف", val: "07703905516" }, { label: "التحصيل", val: "دبلوم" }, { label: "اسم الأم", val: "تأميم ضيدان نعمه" }, { label: "الحالة", val: "متزوج" }, { label: "الزوجة", val: "زهراء علي فليح" }, { label: "تولد الزوجة", val: "20/8/2003" }, { label: "الأبناء", val: "1-وتين احمد احسان (2026)" } ],
        skills: [ { label: "الدورات", val: "دورة قائد ، اختصاص، قائد مدرب ، شارة كشافة" }, { label: "الهوايات", val: "كرة القدم ٫ تصوير، خياطة" }, { label: "عسكرية", val: "كلا" }, { label: "إجادة الأسلحة", val: "كلاشنكوف ٫ مسدس" } ],
        housing: [ { label: "السكن", val: "البصرة قضاء المدينة البشاوي" }, { label: "نوع السكن", val: "زراعي" }, { label: "نقطة دالة", val: "محكمة المدينة" }, { label: "العنوان السابق", val: "القرنة" } ],
        work: [ { title: "معاون مفوض", doc: "", date: "2026" } ], punishments: [], awards: []
    },
    "ابو مهدي": {
        code: "AQ-06112", fullName: "ابو الحسن قصي غافل امزيعل العلوان", avatar: "https://ibb.co/qMNzrjCC", drive: "https://drive.google.com/drive/folders/1MDuXmbk_bWpBJTH3M-N71-M5cd0Ty4Z7",
        basic: [ { label: "التولد", val: "26/11/2006" }, { label: "رقم الهاتف", val: "07764465587" }, { label: "اسم الأم", val: "لما سعيد هجول" }, { label: "الحالة", val: "اعزب" } ],
        skills: [ { label: "الدورات", val: "لا يوجد" }, { label: "الهوايات", val: "كرة القدم ٫ التصوير ٫ التصميم" }, { label: "عسكرية", val: "كلا" }, { label: "إجادة الأسلحة", val: "كلاشنكوف ٫ مسدس" } ],
        housing: [ { label: "السكن", val: "البصرة قضاء المدينة العلوان" }, { label: "نوع السكن", val: "زراعي" }, { label: "نقطة دالة", val: "مسجد صاحب الامر" }, { label: "العنوان السابق", val: "لا يوجد" } ],
        work: [ { title: "مدير مؤسسة التالق الرياضي", doc: "", date: "24/6/2024" } ],
        punishments: [ { title: "تنبيه", doc: "205", date: "11/5/2024" }, { title: "تنبيه", doc: "258", date: "15/3/2025" } ], awards: []
    },
    "ابو ياسمين": {
        code: "SH-94310", fullName: "حبيب عبدالامير ناصر محمد البطاط (سيد حبيب)", avatar: "https://ibb.co/cKzR8mm4", drive: "https://drive.google.com/drive/folders/1bGDl7xHfqv7QaPCCbbTsYmfHEB4uJM2c",
        basic: [ { label: "التولد", val: "10/3/1994" }, { label: "رقم الهاتف", val: "07725847133" }, { label: "التحصيل", val: "بكالوريوس" }, { label: "اسم الأم", val: "نجيبة علي محمد" }, { label: "الحالة", val: "متزوج" }, { label: "الزوجة", val: "مريم عادل ناصر" }, { label: "الأبناء", val: "1-كيان حبيب ، 2-ياسمين حبيب" } ],
        skills: [ { label: "الدورات", val: "دورة قائد، عميد فوج،قائد تدريب" }, { label: "الهوايات", val: "كرة القدم" }, { label: "عسكرية", val: "نعم (عدد 4)" }, { label: "إجادة الأسلحة", val: "كلاشنكوف ٫ مسدس،بيكيسي ،قاذفة" } ],
        housing: [ { label: "السكن", val: "البصرة قضاء الصادق باهلة" }, { label: "نوع السكن", val: "زراعي" }, { label: "نقطة دالة", val: "مسجد الامام المهدي" }, { label: "العنوان السابق", val: "لا يوجد" } ],
        work: [ { title: "مدير قسم العلاقات", doc: "83", date: "2019" }, { title: "مؤسسة ابناء المجاهدين", doc: "", date: "" } ], punishments: [], awards: []
    },
    "ابو كيان": {
        code: "AS-95101", fullName: "علاء سلام طالب خضير الشحرور", avatar: "https://ibb.co/PZzSM30L", drive: "https://drive.google.com/drive/folders/1YLD2F8low-MBYqUmAjVR6k30cCA34RAG",
        basic: [ { label: "التولد", val: "1995/1/1" }, { label: "رقم الهاتف", val: "07717829076" }, { label: "التحصيل", val: "بكالوريوس" }, { label: "اسم الأم", val: "نجاح ريسان خلف" } ],
        skills: [ { label: "الدورات", val: "تحت التحديث الإداري" } ],
        housing: [ { label: "السكن", val: "مستندات السكن قيد الجرد" } ],
        work: [ { title: "مديرية العلاقات والتجهيز", doc: "", date: "" } ], punishments: [], awards: []
    },
    "استاذ محمد": {
        code: "MT-00106", fullName: "محمد تقي عقيل مجبل كريم الخزاعي", avatar: "https://ibb.co/3mfKy9Cw", drive: "https://drive.google.com/drive/folders/1K7vILdwVZiMtc04M3-NQGdudhAxRku7M",
        basic: [ { label: "التولد", val: "6/1/2000" }, { label: "رقم الهاتف", val: "07726156322" }, { label: "التحصيل", val: "بكالوريوس علم النفس" }, { label: "اسم الأم", val: "حنان عبد الواحد جداوه" }, { label: "الحالة", val: "اعزب" } ],
        skills: [ { label: "الدورات", val: "دورة قائد ، شارة كشافة" }, { label: "الهوايات", val: "مطالعة" }, { label: "عسكرية", val: "كلا" }, { label: "إجادة الأسلحة", val: "كلاشنكوف ٫ مسدس" } ],
        housing: [ { label: "السكن", val: "البصرة /قضاء المدينة /الوحيد" }, { label: "نوع السكن", val: "زراعي" }, { label: "نقطة دالة", val: "مدرسة العلي الابتدائية" }, { label: "العنوان السابق", val: "لا يوجد" } ],
        work: [ { title: "القسم الإعلامي ومتابعة شؤون الكادر الثقافي", doc: "", date: "" } ], punishments: [], awards: []
    },
    "الزعيم": {
        code: "MY-11428", fullName: "محمد يعرب حرجان نعاس العبيد", avatar: "https://ibb.co/99q8HnF6", drive: "https://drive.google.com/drive/folders/1t23EyVxdX4EDVeqlO5yQfM06UFzIRD6i",
        basic: [ { label: "التولد", val: "2011/4/28" }, { label: "الهاتف", val: "07726246720 / 07767825646" }, { label: "التحصيل", val: "سادس ابتدائي" }, { label: "اسم الأم", val: "زهراء احمد نعمه" }, { label: "الحالة", val: "اعزب" } ],
        skills: [ { label: "الدورات", val: "لا يوجد" }, { label: "الهوايات", val: "كرة القدم ٫ التصوير" }, { label: "عسكرية", val: "كلا" }, { label: "إجادة الأسلحة", val: "كلاشنكوف ٫ مسدس" } ],
        housing: [ { label: "السكن", val: "البصرة /قضاء المدينة/ الجلال" }, { label: "نوع السكن", val: "زراعي" }, { label: "نقطة دالة", val: "مدرسة العقيدة" }, { label: "العنوان السابق", val: "لا يوجد" } ],
        work: [ { title: "الاعلام", doc: "", date: "" } ], punishments: [], awards: []
    },
    "سيد علي": {
        code: "AM-94000", fullName: "علي محسن هاشم كرم البطاط", avatar: "https://ibb.co/QvtbJwZm", drive: "https://drive.google.com/drive/folders/1ALRDHR6TjJEfyzszsi6bOBSPlqQTTLiW",
        basic: [ { label: "التولد", val: "1994" }, { label: "رقم الهاتف", val: "07808167845" }, { label: "التحصيل", val: "ابتدائية" }, { label: "اسم الأم", val: "مريم زامل ريج" }, { label: "الحالة", val: "متزوج" }, { label: "الزوجة", val: "سارة شريف" } ],
        skills: [ { label: "الدورات", val: "لا يوجد" }, { label: "الهوايات", val: "كرة القدم ٫ القراءة" }, { label: "عسكرية", val: "نعم (4)" }, { label: "إجادة الأسلحة", val: "كلاشنكوف ٫ مسدس، بيكيسي قاذفة" } ],
        housing: [ { label: "السكن", val: "البصرة/ قضاء الصادق/ ابو غريب" }, { label: "نوع السكن", val: "زراعي" }, { label: "نقطة دالة", val: "جامع الزهراء" }, { label: "العنوان السابق", val: "قم ايران" } ],
        work: [ { title: "العلاقات", doc: "", date: "" } ], punishments: [], awards: []
    },
    "كرار": {
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

function safeString(v) { return v ? String(v).trim() : ""; }

function parseImgBBUrl(url) {
    let cleanUrl = safeString(url);
    if (cleanUrl.match(/\.(jpeg|jpg|gif|png)$/) != null) { return cleanUrl; }
    if (cleanUrl.includes("ibb.co/") && !cleanUrl.includes("i.ibb.co/")) {
        let match = cleanUrl.split("ibb.co/");
        if (match.length > 1) {
            let id = match[1].replace(/\//g, '');
            return "https://i.ibb.co/" + id + "/" + id + ".jpg"; 
        }
    }
    return cleanUrl;
}

function handleMainLogin() {
    const u = safeString(document.getElementById('username').value);
    const p = safeString(document.getElementById('password').value);
    const err = document.getElementById('loginError');
    if (u === 'mhdi' && p === '31300313') {
        err.classList.add('hidden');
        document.getElementById('loginScreen').classList.add('hidden');
        document.getElementById('dashboardScreen').classList.remove('hidden');
    } else {
        err.classList.remove('hidden');
    }
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
    if (sectionType === 'settings') {
        document.getElementById('settingsView').classList.remove('hidden');
    } else if (sectionType === 'about') {
        document.getElementById('aboutView').classList.remove('hidden');
    }
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
    const views = ['adminScreen', 'activitiesScreen', 'socialScreen', 'adminKaderListScreen'];
    views.forEach(v => document.getElementById(v).classList.add('hidden'));
    document.getElementById('dashboardScreen').classList.remove('hidden');
}

// ----------------------------------------------------
// نظام الإدخال المباشر للرمز السري (الجديد كلياً للأمان)
// ----------------------------------------------------
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
    
    // البحث عن الرمز في جميع الملفات
    for (let alias in MEMBERS_DATABASE) {
        if (MEMBERS_DATABASE[alias].code === typed) {
            foundAlias = alias;
            break;
        }
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

// ----------------------------------------------------
// نظام الإدارة
// ----------------------------------------------------
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

// بناء الأسماء (الكنية فقط) للمسؤول
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

// ----------------------------------------------------
// عرض بيانات الملف الشخصي
// ----------------------------------------------------
function outputRowsHtml(list) {
    let html = "";
    list.forEach(row => {
        html += `
            <div class="inset-pill">
                <span class="label">${row.label}</span>
                <span class="value">${row.val}</span>
            </div>
        `;
    });
    return html;
}

// تصميم الجداول المطلوبة بدقة: 5 صفوف × 3 أعمدة
function outputTableHtml(dataList, type) {
    let headers = [];
    if (type === 'work') headers = ['العنوان الوظيفي', 'رقم الكتاب', 'التاريخ'];
    else if (type === 'punishments') headers = ['نوع العقوبة', 'رقم الكتاب', 'تاريخه'];
    else if (type === 'awards') headers = ['نوع الشكر', 'رقم الكتاب', 'تاريخه'];

    let html = `<table class="modern-table">
                    <thead><tr>
                        <th>${headers[0]}</th>
                        <th>${headers[1]}</th>
                        <th>${headers[2]}</th>
                    </tr></thead>
                    <tbody>`;

    if (dataList.length === 0) {
        html += `<tr><td colspan="3" class="empty-cell">لا يوجد</td></tr>`;
        for(let i=1; i<5; i++) { html += `<tr><td></td><td></td><td></td></tr>`; }
    } else {
        for(let i=0; i<5; i++) {
            if (i < dataList.length) {
                const item = dataList[i];
                html += `<tr>
                            <td>${item.title || ''}</td>
                            <td>${item.doc || ''}</td>
                            <td>${item.date || ''}</td>
                        </tr>`;
            } else {
                html += `<tr><td></td><td></td><td></td></tr>`;
            }
        }
    }
    html += `</tbody></table>`;
    return html;
}

function displayMemberCardData(alias) {
    const u = MEMBERS_DATABASE[alias];
    if (!u) return;

    // إخفاء الشاشات المفتوحة
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

function handleImageError(img) {
    img.classList.add('hidden');
    const fallback = img.nextElementSibling;
    if (fallback) fallback.classList.remove('hidden');
}

function closeProfileScreen() {
    document.getElementById('profileDetailScreen').classList.add('hidden');
    if (globalAdminMode) {
        document.getElementById('adminKaderListScreen').classList.remove('hidden');
    } else {
        document.getElementById('dashboardScreen').classList.remove('hidden');
    }
}

// نظام التابات الأفقية الحديثة
function loadSpecificDetail(key, element) {
    document.querySelectorAll('.panel-tab-btn').forEach(btn => btn.classList.remove('active-tab'));
    element.classList.add('active-tab');

    const u = MEMBERS_DATABASE[currentActiveAlias];
    if (!u) return;

    const displayBox = document.getElementById('dynamicDetailDisplayBox');
    const title = document.getElementById('dynamicDetailTitle');
    const content = document.getElementById('dynamicDetailContent');

    const headers = {
        'skills': 'الدورات والمهارات',
        'housing': 'معلومات السكن والإقامة',
        'work': 'العمل والمسؤوليات',
        'punishments': 'السجل الانضباطي',
        'awards': 'كتب الشكر والتقدير'
    };

    title.innerText = headers[key];

    if (key === 'work' || key === 'punishments' || key === 'awards') {
        content.innerHTML = outputTableHtml(u[key], key);
    } else {
        content.innerHTML = outputRowsHtml(u[key]);
    }

    displayBox.classList.remove('hidden');
}

// ----------------------------------------------------
// المنصات والروابط
// ----------------------------------------------------
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
        a.href = link.url;
        a.target = '_blank';
        a.className = 'name-panel-btn block-link';
        a.innerText = link.name;
        container.appendChild(a);
    });
    modal.classList.remove('hidden');
}

function closeSocialModal() {
    document.getElementById('socialLinksModal').classList.add('hidden');
}

// ----------------------------------------------------
// إعدادات المظهر
// ----------------------------------------------------
function toggleSystemTheme() {
    const isLightMode = document.body.classList.toggle('light-mode');
    if(isLightMode) {
        showNotification("تم تفعيل الوضع النهاري (صاج فاتح) ☀️");
    } else {
        showNotification("تم تفعيل الوضع الليلي (صاج داكن) 🌙");
    }
}

function showNotification(msg) {
    const toast = document.getElementById('toastNotification');
    toast.innerText = msg;
    toast.classList.remove('hidden');
    setTimeout(() => { toast.classList.add('hidden'); }, 3000);
}
