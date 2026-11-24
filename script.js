/**
 * البوابة الإلكترونية - تجمع شباب الشريعة (مديرية البصرة)
 * ملف script.js الكامل (V66)
 */

// ==================== 1. الإعدادات العامة والمساعدات ====================
const $ = id => document.getElementById(id);
const show = id => $(id)?.classList.remove('hidden');
const hide = id => $(id)?.classList.add('hidden');
const switchScreen = (from, to) => { hide(from); show(to); };
const normDigits = s => String(s ?? '').replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d)).replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)).trim();

const GAS_API_URL = "https://script.google.com/macros/s/AKfycbw4fzCqQInf-Z7Zxui9mfPuj2k_DpOK6ut9kXFOIgnqdl-epib3bofSSbiVfWq7c3o77Q/exec";
const FORMS_API_URL = "https://script.google.com/macros/s/AKfycbzhHhpQmX3xA1rsgCT1qjhwCBsm2GJ2jBZQbUY0k520sjaZPhyGk4J2PPIN92nMP9TxAA/exec";
const PLANNING_API_URL = "https://script.google.com/macros/s/AKfycbwoJV14PO7534srW2JDmGSSIKilVDciZr--8ktV2q0uLfhOMA6Yw-XE21pSYw9bvoZW5g/exec";
const MEMBERS_API_URL = "https://script.google.com/macros/s/AKfycbwwddZMrqD36AsizpqbEBfdzL5giQ6Arc9S75zAyz0qcxB03i7SA9DD-OeF0nGVIxFs/exec";
const GAS_AI_URL = "https://script.google.com/macros/s/AKfycbzTY_WSn1M5R_n8pU-OqTAH52v2xz-DkXa0bKKZ2-kq1c-Njf8jxR4sfAtt9F11KxAA/exec";
const MEDIA_EVAL_API_URL = "https://script.google.com/macros/s/AKfycbzUS_nMwBcB6JnxngbEHJPj5B2NAZtusx9C48GolCGzf1s0KugVDuz7sas08PExlPI/exec";

const LOGO_TAJAMMU = "https://i.ibb.co/N2BJ7Srb/N2BJ7Srb.jpg";
const LOGO_SCOUTS = "https://i.ibb.co/DfsfqRP8/IMG-20260604-182014-169.png";
const CHART_COLORS = ['#E63946','#1D3557','#2A9D8F','#E9C46A','#F4A261','#9C89B8','#0077B6','#D90429','#00B4D8','#8338EC','#38B000','#FF006E','#FFBE0B','#3A0CA3','#06D6A0','#118AB2','#073B4C','#7209B7','#4CC9F0','#F15BB5'];

// ربط داخلي لرموز خلايا جدول التقييم الإعلامي (B1..U1) - لا يظهر في الواجهة
const MEDIA_CELL_ALIASES = {
    B1: ["ابا الحسن العلواني","ابو الحسن العلواني","ابا الحسن قصي","ابو الحسن قصي","ابا الحسن","ابو الحسن","ابوالحسن"],
    C1: ["احمد احسان","أحمد إحسان"],
    D1: ["حبيب البطاط","حبيب عبد الامير","حبيب عبدالامير","حبيب عبد الأمير","سيد حبيب","ابو ياسمين"],
    E1: ["حسين يحيى","حسين يحيي"],
    F1: ["حمزه محمد","حمزة محمد"],
    G1: ["شبيب عبد الأمير","شبيب عبد الامير","شبيب عبدالامير","سيد شبيب","شبيب"],
    H1: ["ضياء علاء","ضياء الخفاجي","ضياء علاء الخفاجي"],
    I1: ["علي العواجي","علي العوجي","علي عبد الحسين","علي عبدالحسين"],
    J1: ["علي عبد القادر","علي عبدالقادر","علي عبد القادر سلمان","علي قادر"],
    K1: ["علي محسن البطاط","علي محسن"],
    L1: ["فرحان الحيدري","فرحان فلاح","سيد فرحان"],
    M1: ["كرار ازريع ماطر","كرار أزريع ماطر","كرار ازريع","كرار أزريع","كرار ازيع","ابو سعيد","ابو غزل"],
    N1: ["كرار عبد الحسين","كرار عبدالحسين"],
    O1: ["مازن السوداني","مازن"],
    P1: ["محمد بشير","محمد بشير الحلفي"],
    Q1: ["محمد تقي"],
    R1: ["محمد نوري"],
    S1: ["منتظر الحساني","منتظر حزام","منتضر حزام","منتظر حازم","منتضر حازم"],
    T1: ["وليد خالد","وليد خالد الحيدري","سيد وليد","ابو باقر"],
    U1: ["ياسين البطاط","ياسين مهدي"]
};

const ARABIC_MONTHS_MAP = [
    ['كانون الثاني','يناير','الأول','الاول'], ['شباط','فبراير','الثاني'], ['آذار','اذار','مارس','الثالث'],
    ['نيسان','أبريل','ابريل','الرابع'], ['أيار','ايار','مايو','الخامس'], ['حزيران','يونيو','السادس'],
    ['تموز','يوليو','السابع'], ['آب','اب','أغسطس','اغسطس','الثامن'], ['أيلول','ايلول','سبتمبر','التاسع'],
    ['تشرين الأول','تشرين الاول','أكتوبر','اكتوبر','العاشر'], ['تشرين الثاني','نوفمبر','الحادي عشر'], ['كانون الأول','كانون الاول','ديسمبر','الثاني عشر']
];

function getStatsLabels(type) {
    const isScouts = type === 'scouts';
    return {
        isScouts,
        orgFullName: isScouts ? 'جمعية كشافة الإمام الحسين (ع) - مفوضية البصرة' : 'تجمع شباب الشريعة - مديرية البصرة',
        shortOrg: isScouts ? 'الكشافة' : 'التجمع',
        entityPlural: isScouts ? 'الأفرقة' : 'المؤسسات',
        entitySingle: isScouts ? 'فرقة' : 'مؤسسة',
        entityDefSingle: isScouts ? 'الفرقة' : 'المؤسسة',
        kaderTitle: isScouts ? 'قادة وكادر الكشافة' : 'كادر التجمع',
        logo: isScouts ? LOGO_SCOUTS : LOGO_TAJAMMU
    };
}

function parseMonthYearFromText(text, fallbackYear = null) {
    const s = normDigits(text);
    if (!s) return null;
    const ymd = s.match(/(20\d{2})[-/\.](\d{1,2})(?:[-/\.]\d{1,2})?/);
    if (ymd && +ymd[2] >= 1 && +ymd[2] <= 12) return { year: +ymd[1], month: +ymd[2] };
    const dmy = s.match(/(?:\d{1,2}[-/\.])?(\d{1,2})[-/\.](20\d{2})/);
    if (dmy && +dmy[1] >= 1 && +dmy[1] <= 12) return { year: +dmy[2], month: +dmy[1] };
    const arNum = s.match(/شهر\s*(\d{1,2})\s*[-–ـ\/]?\s*(?:لسنة|سنة)?\s*(20\d{2})?/);
    if (arNum && +arNum[1] >= 1 && +arNum[1] <= 12) {
        const y = arNum[2] ? +arNum[2] : (s.match(/20\d{2}/) ? +s.match(/20\d{2}/)[0] : fallbackYear);
        if (y) return { year: y, month: +arNum[1] };
    }
    const ym = s.match(/20\d{2}/), dy = ym ? +ym[0] : fallbackYear;
    if (dy) {
        for (let i = 0; i < ARABIC_MONTHS_MAP.length; i++) {
            if (ARABIC_MONTHS_MAP[i].some(m => s.includes(m))) return { year: dy, month: i + 1 };
        }
    }
    return null;
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(e => console.log('PWA Error:', e)));
}

if (typeof Chart !== 'undefined') {
    Chart.defaults.devicePixelRatio = 3;
    Chart.register({
        id: 'centerText',
        beforeDraw(chart) {
            const cfg = chart.config.options.plugins.centerText;
            if (!cfg || chart.config.type !== 'doughnut' || !chart.chartArea) return;
            const { ctx, chartArea: a } = chart;
            ctx.save();
            ctx.fillStyle = cfg.color || "#0B132B";
            ctx.textBaseline = "middle"; ctx.textAlign = "center";
            const lines = cfg.text.split("\n"), fs = Math.min(Math.max((a.bottom - a.top) / 10, 16), 28);
            ctx.font = `bold ${fs}px 'Segoe UI', Tahoma, sans-serif`;
            const step = fs * 1.25, startY = (a.top + a.bottom) / 2 - ((lines.length - 1) * step / 2);
            lines.forEach((l, i) => ctx.fillText(l, (a.left + a.right) / 2, startY + i * step));
            ctx.restore();
        }
    });
}

Object.assign(window, {
    MEMBERS_DATABASE: {}, _sessionAdminPass: "", _statsAutoSyncTimer: null, _lastDataSignature: "",
    SESSION_LEARNED_ALIASES: {}, globalAdminMode: false, currentActiveAlias: "",
    fetchedAttendanceLogs: [], groupedAttendanceData: {},
    allFormsData: { tajammu: [], scouts: [], planning: [] }, isFormsFetching: false,
    currentFormView: { type: '', index: 0 }, currentFormsGroups: {}, currentPdfFileName: "ملف.pdf",
    _currentArchiveType: '', _currentArchiveYear: '', _currentArchiveMonth: '', _currentArchiveOrg: '', _yearsFormsMap: {},
    overallFormsChartInstance: null, formsTrendChartInstance: null, kaderParticipationChartInstance: null,
    mediaEvalChartInstance: null, _mediaEvalViewState: { level: 'years', year: null, month: null },
    lastParticipationStats: null, currentStatsContext: { scope: 'yearly', type: 'tajammu', monthKey: null },
    currentSummaryYear: null, isSummaryAutoFlip: false,
    pdfSlideState: { pdfDoc: null, pageNum: 1, timer: null, isRendering: false },
    pptDownloadController: { isCancelled: false, timer: null, finishTimer: null, iframe: null, resolvedUrl: null },
    aiSessions: [], currentAiSessionId: null, pendingAiImage: null, _isAiSending: false,
    _mediaEvalRawCache: null
});
try { localStorage.removeItem('tajammu_ai_learned_aliases'); } catch {}

window.IDENTITY_GROUPS = [
    { canonical: "علاء سلام", aliases: ["علاء سلام","ابو كيان","أبو كيان","ابا كيان","أبا كيان"] },
    { canonical: "صباح فاضل", aliases: ["صباح فاضل","صباح فاضل جاسم","صباح جاسم","حسن فاضل","حسن العوجي","حسن العواجي","ابو فهد","أبو فهد","ابا فهد","أبا فهد","حسن فاضل العوجي","حسن فاضل العواجي","حسن فاضل جاسم","حسن فاضل جاس","حسن فاضل جاسم العوجي"] },
    { canonical: "مرتضى عبد النبي", aliases: ["مرتضى عبد النبي","مرتضى عبدالنبي","مرتظى عبد النبي","ابو سراج","أبو سراج","ابا سراج","أبا سراج"] },
    { canonical: "ابو الحسن", aliases: ["ابو الحسن","أبو الحسن","ابا الحسن","أبا الحسن","ابوالحسن","أبوالحسن","ابا الحسن العلواني","ابو الحسن العلواني","ابا الحسن قصي"] },
    { canonical: "حبيب عبد الامير", aliases: ["حبيب عبد الامير","حبيب عبدالامير","حبيب عبد الأمير","سيد حبيب","السيد حبيب","ابو ياسمين","أبو ياسمين","ابا ياسمين","حبيب البطاط"] },
    { canonical: "كرار ازريع ماطر", aliases: ["كرار ازريع ماطر","كرار أزريع ماطر","كرار ازريع","كرار أزريع","كرار ازيع","كرار أزيع","كرار زريع","ابو سعيد","أبو سعيد","ابا سعيد","ابو غزل","أبو غزل","ابا غزل"] },
    { canonical: "علي عبد القادر سلمان", aliases: ["علي عبد القادر سلمان","علي عبدالقادر سلمان","علي عبد القادر","علي عبدالقادر","علي قادر"] },
    { canonical: "علي عبد الحسين", aliases: ["علي عبد الحسين","علي عبدالحسين","علي العواجي","علي العوجي"] },
    { canonical: "علي محسن", aliases: ["علي محسن","علي محسن البطاط"] },
    { canonical: "ضياء علاء", aliases: ["ضياء علاء","ضياء الخفاجي","ضياء علاء الخفاجي"] },
    { canonical: "فرحان فلاح", aliases: ["فرحان فلاح","فرحان الحيدري","سيد فرحان","السيد فرحان"] },
    { canonical: "وليد خالد", aliases: ["وليد خالد","وليد خالد الحيدري","سيد وليد","السيد وليد","ابو باقر","أبو باقر","ابا باقر"] },
    { canonical: "شبيب", aliases: ["شبيب","شبيب عبد الامير","شبيب عبد الأمير","سيد شبيب","السيد شبيب"] },
    { canonical: "منتظر حزام", aliases: ["منتظر حزام","منتضر حزام","منتظر حازم","منتضر حازم","منتظر الحساني"] },
    { canonical: "ياسين مهدي", aliases: ["ياسين مهدي","ياسين البطاط"] }
];

const SOCIAL_LINKS = {
    tajammu: [
        { name: "فيسبوك", url: "https://www.facebook.com/share/1CvehBKNWt/" },
        { name: "انستغرام", url: "https://www.instagram.com/sharia.youth.assembly?igsh=aTdpaXE1YmtjeWIx" },
        { name: "تليغرام", url: "https://t.me/Shabab_alshariaa" },
        { name: "تيك توك", url: "https://www.tiktok.com/@c1cck?_r=1&_t=ZS-96ufheasgNA" }
    ],
    scouts: [
        { name: "فيسبوك", url: "https://www.facebook.com/share/18X5vdwQMA/" },
        { name: "انستغرام", url: "https://www.instagram.com/scouts_imam.hussein?igsh=MTM4YnMxeHJpNDRsYw==" },
        { name: "تليغرام", url: "https://t.me/Shabab_alshariaa" },
        { name: "تيك توك", url: "https://www.tiktok.com/@11hf11?_r=1&_t=ZS-96ufsWWZvcK" }
    ],
    trend: [{ name: "حساب تيك توك الرسمي", url: "https://www.tiktok.com/@2.ca?_r=1&_t=ZS-96ufxHesNW8" }]
};

const SUMMARY_LINKS = {
    '2023': { slideId: '1xaZNs-LKX1T2EEjxvbUVsvKjECNPlwAK', pdfId: '1ITbn0tDaNQWpine_73DrZQKoYNBvSR2b', pdfPreview: 'https://drive.google.com/file/d/1ITbn0tDaNQWpine_73DrZQKoYNBvSR2b/preview', pptExport: 'https://docs.google.com/presentation/d/1xaZNs-LKX1T2EEjxvbUVsvKjECNPlwAK/export/pptx', isLargeFile: false },
    '2024': { slideId: '1gFq4Gaeu-8Fjh-OccRdiLnGJWmDqVb4z', pdfId: '1Cv0mmXUddcM_aIEZCG2pLJOEejDzUtpB', pdfPreview: 'https://drive.google.com/file/d/1Cv0mmXUddcM_aIEZCG2pLJOEejDzUtpB/preview', pptExport: 'https://drive.usercontent.google.com/download?id=1gFq4Gaeu-8Fjh-OccRdiLnGJWmDqVb4z&export=download&confirm=t', isLargeFile: true },
    '2025': { slideId: '1SKjtGXdEzIA-AInkF9qthLALxEfVCWoU', pdfId: '12qr3XjspgwhyCaF_QNh40zvDs6mH-428', pdfPreview: 'https://drive.google.com/file/d/12qr3XjspgwhyCaF_QNh40zvDs6mH-428/preview', pptExport: 'https://docs.google.com/presentation/d/1SKjtGXdEzIA-AInkF9qthLALxEfVCWoU/export/pptx', isLargeFile: false }
};

// ==================== 2. Firebase ومنشورات فيسبوك ====================
let database = null;
try {
    if (typeof firebase !== 'undefined') {
        if (!firebase.apps.length) firebase.initializeApp({
            apiKey: "AIzaSyA1CLxZWbrQq6XhbIZH63u65jFSok-zGYI", authDomain: "altjmaa.firebaseapp.com",
            databaseURL: "https://altjmaa-default-rtdb.firebaseio.com", projectId: "altjmaa",
            storageBucket: "altjmaa.firebasestorage.app", messagingSenderId: "440726604865",
            appId: "1:440726604865:web:5ac3b9060edf0c1743cac0", measurementId: "G-P2ZVSD1YV8"
        });
        database = firebase.database();
    }
} catch (e) { console.error("Firebase Error:", e); }

window.loadFbPosts = function() {
    const container = $('facebookSliderContainer'), wrapper = $('fbWrapper');
    if (!database) return;
    database.ref("settings/facebook/urls").once("value").then(snap => {
        if (!snap.exists()) return;
        const urls = Array.isArray(snap.val()) ? snap.val() : Object.values(snap.val());
        if (!urls.length) return;
        if (wrapper) wrapper.innerHTML = urls.map(u => {
            let clean = String(u).trim().replace('//m.facebook.com', '//www.facebook.com').replace('//l.facebook.com', '//www.facebook.com');
            if (clean.includes('/share/')) clean = clean.split('?')[0];
            return `<div class="swiper-slide"><div class="fb-post" data-href="${clean}" data-width="100%" data-show-text="true"></div></div>`;
        }).join('');
        if (container) container.style.display = 'block';
        if (typeof Swiper !== 'undefined') new Swiper(".mySwiper", { spaceBetween: 20, autoHeight: true, observer: true, observeParents: true, grabCursor: true, autoplay: { delay: 4000, disableOnInteraction: false }, pagination: { el: ".swiper-pagination", clickable: true } });
        if (typeof FB !== 'undefined') FB.XFBML.parse();
    }).catch(e => console.log("FB Fetch Error:", e));
};

// ==================== 3. أدوات التنسيق والواجهة وPWA ====================
window.safeString = v => v ? String(v).trim() : "";

window.parseImageUrl = window.parseImgBBUrl = function(url) {
    const u = window.safeString(url);
    if (!u || u === "-") return "";
    if (u.includes("drive.google.com")) {
        const m = u.match(/[-\w]{25,}/);
        return m ? `https://drive.google.com/uc?export=view&id=${m[0]}` : u;
    }
    if (/\.(jpeg|jpg|gif|png|webp)(\?.*)?$/i.test(u)) return u;
    if (u.includes("ibb.co/") && !u.includes("i.ibb.co/")) {
        const id = u.split("ibb.co/")[1]?.replace(/\//g, '').split('?')[0];
        if (id) return `https://i.ibb.co/${id}/${id}.jpg`;
    }
    return u;
};

window.parseDocString = str => (!str || str === "-" || !String(str).trim()) ? [] :
    String(str).split('|').map(s => s.trim()).filter(Boolean).map(item => {
        const m = item.match(/(.*?)\((.*?)\s*-\s*(.*?)\)/);
        return m ? { title: m[1].trim(), doc: m[2].trim(), date: m[3].trim() } : { title: item, doc: "", date: "" };
    });

window.transformSheetData = function(row, rowIdx) {
    const clean = {};
    for (let k in row) clean[String(k).trim()] = row[k];
    const find = kws => { for (let k in clean) if (kws.some(w => k.includes(w))) return clean[k]; return ""; };
    const rawDate = String(find(["تولد","تاريخ"]) || "-");
    const stdKws = ["رمز","كود","خلية","خليه","cell","id","الاسم","تولد","تاريخ","هاتف","تحصيل","دراسي","أم","الام","حالة","حاله","اجتماعية","أبناء","ابناء","صورة","صوره","درايف","مهارات","دورات","عسكرية","عسكريه","أسلحة","اسلحة","سكن","نوع","سابق","حالي","عمل","مسؤوليات","انضباطي","عقوبات","شكر"];
    const basic = [
        { label: "التولد", val: rawDate.includes("T") ? rawDate.split("T")[0] : rawDate },
        { label: "رقم الهاتف", val: find(["هاتف"]) || "-" },
        { label: "التحصيل الدراسي", val: find(["تحصيل","دراسي"]) || "-" },
        { label: "اسم الأم", val: find(["أم","الام"]) || "-" },
        { label: "الحالة الاجتماعية", val: find(["حالة","حاله","اجتماعية"]) || "-" },
        { label: "أسماء الأبناء", val: find(["أبناء","ابناء"]) || "-" }
    ];
    for (let k in clean) if (k && !stdKws.some(w => k.toLowerCase().includes(w)) && clean[k] !== undefined && clean[k] !== "" && String(clean[k]).trim() !== "-") basic.push({ label: k, val: clean[k] });

    const codeVal = normDigits(find(["رمز العضو","رمز","كود"]) || "-");
    const cellVal = normDigits(find(["رمز الخلية","خلية التقييم","خلية","خليه","cell","Cell"]) || clean._cell || "").toUpperCase();
    return {
        code: codeVal || "-",
        cellRef: cellVal,
        rowIndex: clean._row || clean.rowIndex || (typeof rowIdx === 'number' ? rowIdx + 2 : ""),
        fullName: window.safeString(find(["الاسم"])) || "عضو بدون اسم",
        avatar: window.parseImageUrl(clean["رابط الصورة"] || clean["الصورة"] || find(["صورة","صوره","avatar"])),
        drive: find(["درايف","drive"]) || "", basic,
        skills: [{ label: "الدورات", val: find(["دورات","مهارات"]) || "-" }, { label: "دورة عسكرية", val: find(["عسكرية","عسكريه"]) || "-" }, { label: "إجادة الأسلحة", val: find(["أسلحة","اسلحة"]) || "-" }],
        housing: [{ label: "معلومات السكن", val: find(["سكن حالي","السكن"]) || "-" }, { label: "نوع السكن", val: find(["نوع السكن","ملك"]) || "-" }, { label: "العنوان السابق", val: find(["سابق"]) || "-" }],
        work: window.parseDocString(find(["عمل","مسؤوليات"])),
        punishments: window.parseDocString(find(["انضباطي","عقوبات"])),
        awards: window.parseDocString(find(["شكر"]))
    };
};

window.getNiceLoaderHtml = msg => `
    <div class="panel-card saji-border text-center" style="grid-column:1/-1;padding:40px 20px;margin:15px auto;width:100%;max-width:480px;display:flex;flex-direction:column;align-items:center;gap:16px;background:var(--panel-bg);box-shadow:0 8px 25px rgba(0,0,0,0.08);">
        <div style="width:44px;height:44px;border:4px solid rgba(0,180,216,0.2);border-top-color:var(--gold);border-radius:50%;animation:sajiSpin 0.9s linear infinite;"></div>
        <h4 class="primary-title" style="margin:0;font-size:1.05rem;color:var(--text-main);">${msg}</h4>
        <p style="margin:0;font-size:0.83rem;color:var(--text-muted);">يرجى الانتظار لحظات لمزامنة البيانات السحابية...</p>
        <style>@keyframes sajiSpin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}</style>
    </div>`;

window.cleanChildrenNames = function(str) {
    if (!str || str === "-") return "لا يوجد";
    return str.split(/[،,]/).map(p => {
        const w = p.replace(/^\s*\d+[-–]\s*/, '').trim().split(/\s+/);
        let first = (w[0] === 'شاه' && w[1] === 'زنان') ? 'شاه زنان' : (w[0] || '');
        return first.replace(/[\(\)\d]/g, '').trim();
    }).filter(Boolean).join(" و ");
};

window.showNotification = msg => { const t = $('toastNotification'); if (!t) return; t.innerText = msg; show('toastNotification'); setTimeout(() => hide('toastNotification'), 3000); };
window.handleImageError = img => { img.classList.add('hidden'); img.nextElementSibling?.classList.remove('hidden'); };
window.toggleSystemTheme = () => {
    const isLight = document.body.classList.toggle('light-mode');
    if ($('themeCheckbox')) $('themeCheckbox').checked = !isLight;
    window.showNotification(isLight ? "تم تفعيل الوضع النهاري" : "تم تفعيل الوضع الليلي");
    if (!$('chartsScreen')?.classList.contains('hidden')) window.renderAnalyticsCharts();
};
window.showProgressBar = t => { $('progressTitle').innerText = t || "جاري التصدير..."; window.updateProgressBar(0); show('progressOverlay'); };
window.updateProgressBar = p => { $('progressBarFill').style.width = p + "%"; $('progressText').innerText = p + "%"; };
window.hideProgressBar = () => hide('progressOverlay');

let deferredPrompt;
const installBtn = $('installAppBtn');
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferredPrompt = e; show('installAppBtn'); });
installBtn?.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    if ((await deferredPrompt.userChoice).outcome === 'accepted') hide('installAppBtn');
    deferredPrompt = null;
});
window.addEventListener('appinstalled', () => { hide('installAppBtn'); window.showNotification("تم تثبيت التطبيق بنجاح!"); });

// ==================== 4. المزامنة الحية والمصادقة والتنقل ====================
window.computeCurrentDataSignature = () => {
    const k = Object.keys(window.MEMBERS_DATABASE || {}).map(x => x + (window.isMemberInactive(x, window.MEMBERS_DATABASE[x]) ? ":R" : ":G")).sort().join("|");
    return `${k}__T:${(window.allFormsData.tajammu || []).length}__S:${(window.allFormsData.scouts || []).length}`;
};

window.refreshMembersDatabaseSilently = async function() {
    if (!window._sessionAdminPass) return false;
    try {
        const res = await (await fetch(`${MEMBERS_API_URL}?action=adminLogin&password=${encodeURIComponent(window._sessionAdminPass)}&t=${Date.now()}`)).json();
        if (res.success && Array.isArray(res.data)) {
            const db = {};
            res.data.forEach((r, idx) => { const t = window.transformSheetData(r, idx); db[t.fullName] = t; });
            window.MEMBERS_DATABASE = db;
            return true;
        }
    } catch {}
    return false;
};

window.refreshFormsDataSilently = async function() {
    try {
        const d = await (await fetch(`${FORMS_API_URL}?t=${Date.now()}`)).json();
        if (!d.error) { window.allFormsData.tajammu = d.tajammu || []; window.allFormsData.scouts = d.scouts || []; return true; }
    } catch {}
    return false;
};

async function checkAndApplyLiveUpdates() {
    const isStats = !$('formsStatsScreen')?.classList.contains('hidden');
    const isKader = !$('adminKaderListScreen')?.classList.contains('hidden');
    if (!isStats && !isKader) return;
    await Promise.all([window.refreshMembersDatabaseSilently(), isStats ? window.refreshFormsDataSilently() : Promise.resolve()]);
    const sig = window.computeCurrentDataSignature();
    if (sig !== window._lastDataSignature) {
        window._lastDataSignature = sig;
        if (isKader) window.buildAdminKaderButtons();
        if (isStats && window.currentStatsContext?.type) {
            const { scope, type, monthKey } = window.currentStatsContext;
            window.rebuildCurrentFormsGroups(type);
            window.renderFormsCharts(scope, type, monthKey);
        }
    }
}
window.startAutoLiveStatsWatcher = () => {
    clearInterval(window._statsAutoSyncTimer);
    window._lastDataSignature = window.computeCurrentDataSignature();
    window._statsAutoSyncTimer = setInterval(checkAndApplyLiveUpdates, 25000);
};
window.addEventListener('focus', checkAndApplyLiveUpdates);

const setStatusErr = (el, msg, isErr) => { el.innerText = msg; el.style.color = isErr ? "var(--error)" : "var(--gold)"; el.classList.remove('hidden'); };

window.handleMainLogin = async function() {
    const u = window.safeString($('username').value), p = window.safeString($('password').value), err = $('loginError');
    setStatusErr(err, "جاري التحقق من السيرفر... ⏳", false);
    try {
        const res = await (await fetch(`${MEMBERS_API_URL}?action=mainLogin&username=${encodeURIComponent(u)}&password=${encodeURIComponent(p)}`)).json();
        if (res.success) { hide('loginError'); switchScreen('loginScreen', 'dashboardScreen'); window.loadFbPosts?.(); }
        else setStatusErr(err, "⚠️ " + (res.message || "معلومات الدخول غير صحيحة!"), true);
    } catch { setStatusErr(err, "⚠️ خطأ في الاتصال بالسيرفر!", true); }
};

window.submitAdminPassword = async function() {
    const p = window.safeString($('adminPasswordInput').value), err = $('modalAdminError');
    setStatusErr(err, "جاري جلب البيانات من السحابة... ⏳", false);
    try {
        const res = await (await fetch(`${MEMBERS_API_URL}?action=adminLogin&password=${encodeURIComponent(p)}&t=${Date.now()}`)).json();
        if (res.success) {
            window._sessionAdminPass = p; window.closeAdminPasswordModal(); window.globalAdminMode = true;
            window.MEMBERS_DATABASE = {};
            res.data.forEach((r, idx) => { const t = window.transformSheetData(r, idx); window.MEMBERS_DATABASE[t.fullName] = t; });
            window.startAutoLiveStatsWatcher();
            window.navigateTo('adminScreen');
        } else setStatusErr(err, "⚠️ " + (res.message || "الرمز الإداري غير صحيح!"), true);
    } catch { setStatusErr(err, "⚠️ خطأ في الاتصال بقاعدة البيانات!", true); }
};

window.submitDirectCode = async function() {
    const typed = window.safeString($('directMemberCodeInput').value), err = $('directModalCodeError');
    setStatusErr(err, "جاري التحقق من الرمز... ⏳", false);
    try {
        const res = await (await fetch(`${MEMBERS_API_URL}?action=memberLogin&code=${encodeURIComponent(typed)}&t=${Date.now()}`)).json();
        if (res.success) {
            window.closeDirectCodeModal(); window.globalAdminMode = false;
            const t = window.transformSheetData(res.data);
            if (!t.code || t.code === "-") t.code = normDigits(typed);
            window.MEMBERS_DATABASE = { [t.fullName]: t };
            window.currentActiveAlias = t.fullName;
            window.displayMemberCardData(t.fullName);
        } else setStatusErr(err, "⚠️ " + (res.message || "الرمز غير صحيح!"), true);
    } catch { setStatusErr(err, "⚠️ فشل الاتصال بالسيرفر!", true); }
};

window.handleLogout = () => {
    ['dashboardScreen','sidebarPanel'].forEach(hide); show('loginScreen');
    $('username').value = ''; $('password').value = '';
    window.MEMBERS_DATABASE = {}; window._sessionAdminPass = ""; window.SESSION_LEARNED_ALIASES = {}; window._mediaEvalRawCache = null;
    clearInterval(window._statsAutoSyncTimer);
};
window.toggleSidebar = s => s ? show('sidebarPanel') : hide('sidebarPanel');
window.openSidebarSection = s => { window.toggleSidebar(false); hide('dashboardScreen'); if (s === 'about') show('aboutView'); };
window.returnToDashboardFromSidebar = id => switchScreen(id, 'dashboardScreen');
window.navigateTo = id => switchScreen('dashboardScreen', id);
window.goBackToDashboard = () => {
    ['adminScreen','activitiesScreen','socialScreen','adminKaderListScreen','attendanceLogsScreen','formsCategoryScreen','formsMonthsScreen','formsListScreen','chartsScreen','formsStatsScreen','mediaCentralScreen','annualSummariesScreen','summaryPresentationScreen','mediaEvalAdminScreen','geminiFullScreen'].forEach(hide);
    window.stopPdfAutoSlideShow?.();
    if ($('summarySlideIframe')) $('summarySlideIframe').src = '';
    show('dashboardScreen');
};
window.openDirectCodeModal = () => { hide('sidebarPanel'); hide('dashboardScreen'); $('directMemberCodeInput').value = ''; hide('directModalCodeError'); show('directCodeModal'); };
window.closeDirectCodeModal = () => switchScreen('directCodeModal', 'dashboardScreen');
window.openAdminPasswordModal = () => { hide('sidebarPanel'); $('adminPasswordInput').value = ''; hide('modalAdminError'); show('adminPasswordModal'); };
window.closeAdminPasswordModal = () => hide('adminPasswordModal');
window.openAdminKaderView = async () => {
    switchScreen('adminScreen', 'adminKaderListScreen'); window.buildAdminKaderButtons();
    if (await window.refreshMembersDatabaseSilently() && !$('adminKaderListScreen').classList.contains('hidden')) window.buildAdminKaderButtons();
};
window.goBackToAdminScreen = () => switchScreen('adminKaderListScreen', 'adminScreen');

// ==================== 5. سجل الكادر والملف الشخصي + قائمة «تقييمي» ====================
window.isMemberInactive = function(alias, memberObj) {
    const norm = String(alias).replace(/[أإآ]/g, 'ا').trim();
    if (['علي احمد', 'محمد يعرب'].some(n => norm.includes(n))) return true;
    const stopWords = ['منتهي','متوقف','ترك العمل','منسحب','انهاء','أحمر','احمر','مجمد'];
    return Boolean(memberObj?.basic?.some(b => stopWords.some(w => String(b.val || '').includes(w))));
};

window.buildAdminKaderButtons = function() {
    const container = $('adminAliasesContainer');
    if (!container) return;
    container.innerHTML = '';
    if (!$('kaderCustomStyles')) {
        const st = document.createElement('style'); st.id = 'kaderCustomStyles';
        st.textContent = `#adminAliasesContainer.names-square-grid{grid-template-columns:repeat(auto-fill,minmax(105px,1fr))!important;gap:6px!important;margin-top:15px}.kader-card-btn{display:flex!important;align-items:center!important;justify-content:center!important;padding:6px 8px!important;border-radius:6px!important;cursor:pointer;transition:transform .15s,filter .15s!important;text-align:center;min-height:32px!important}.kader-card-btn:hover{transform:translateY(-2px);filter:brightness(1.12)}.kader-active{background:rgba(16,185,129,.16)!important;border:1.5px solid #10b981!important}.kader-inactive{background:rgba(239,68,68,.16)!important;border:1.5px solid #ef4444!important}.kader-name-text{font-size:.78rem;font-weight:700;line-height:1.25;word-break:break-word}.kader-active .kader-name-text{color:#10b981}.kader-inactive .kader-name-text{color:#ef4444}body.light-mode .kader-active .kader-name-text{color:#047857}body.light-mode .kader-inactive .kader-name-text{color:#b91c1c}`;
        document.head.appendChild(st);
    }
    Object.keys(window.MEMBERS_DATABASE)
        .sort((a, b) => Number(window.isMemberInactive(a, window.MEMBERS_DATABASE[a])) - Number(window.isMemberInactive(b, window.MEMBERS_DATABASE[b])))
        .forEach(alias => {
            const b = document.createElement('button');
            b.className = 'name-panel-btn kader-card-btn ' + (window.isMemberInactive(alias, window.MEMBERS_DATABASE[alias]) ? 'kader-inactive' : 'kader-active');
            b.innerHTML = `<div class="kader-name-text">${alias}</div>`;
            b.onclick = () => { window.currentActiveAlias = alias; window.displayMemberCardData(alias); };
            container.appendChild(b);
        });
};

window.outputRowsHtml = list => list.map(r => `<div class="inset-pill"><span class="label">${r.label}</span><span class="value">${(r.label === "أسماء الأبناء" || r.label === "الأبناء") ? window.cleanChildrenNames(r.val) : r.val}</span></div>`).join('');

window.outputTableHtml = function(list, type) {
    const h = type === 'work' ? ['النوع','رقم الكتاب','التاريخ'] : type === 'punishments' ? ['نوع العقوبة','رقم الكتاب','تاريخه'] : ['نوع الشكر','رقم الكتاب','تاريخه'];
    let rows = list.length === 0
        ? `<tr><td colspan="3" class="empty-cell">لا يوجد</td></tr>` + '<tr><td></td><td></td><td></td></tr>'.repeat(4)
        : Array.from({ length: Math.max(5, list.length) }, (_, i) => i < list.length ? `<tr><td>${list[i].title || ''}</td><td>${list[i].doc || ''}</td><td>${list[i].date || ''}</td></tr>` : '<tr><td></td><td></td><td></td></tr>').join('');
    return `<table class="modern-table"><thead><tr><th>${h[0]}</th><th>${h[1]}</th><th>${h[2]}</th></tr></thead><tbody>${rows}</tbody></table>`;
};

window.displayMemberCardData = function(alias) {
    window.currentActiveAlias = alias;
    const u = window.MEMBERS_DATABASE[alias];
    if (!u) return;
    hide('adminKaderListScreen'); hide('dashboardScreen'); show('profileDetailScreen');
    $('profileFullName').innerText = u.fullName;
    $('primaryDetailsContainer').innerHTML = window.outputRowsHtml(u.basic);
    const img = $('profileImage'), fb = img.nextElementSibling;
    if (u.avatar?.trim()) { img.src = u.avatar; img.classList.remove('hidden'); fb?.classList.add('hidden'); }
    else { img.classList.add('hidden'); fb?.classList.remove('hidden'); }
    $('driveLinkBtn').href = u.drive;
    hide('dynamicDetailDisplayBox');
    document.querySelectorAll('.panel-tab-btn').forEach(b => b.classList.remove('active-tab'));

    hide('memberEvalPanelBox');
    if ($('memberEvalChevron')) $('memberEvalChevron').innerText = '▼';
    if ($('memberEvalSubContent')) $('memberEvalSubContent').innerHTML = '';
};

window.closeProfileScreen = () => switchScreen('profileDetailScreen', window.globalAdminMode ? 'adminKaderListScreen' : 'dashboardScreen');

window.loadSpecificDetail = function(key, el) {
    document.querySelectorAll('.panel-tab-btn').forEach(b => b.classList.remove('active-tab'));
    el?.classList.add('active-tab');
    const u = window.MEMBERS_DATABASE[window.currentActiveAlias];
    if (!u) return;
    const titles = { skills: 'الدورات والمهارات', housing: 'معلومات السكن', work: 'العمل والمسؤوليات', punishments: 'السجل الانضباطي', awards: 'كتب الشكر والتقدير' };
    $('dynamicDetailTitle').innerText = titles[key] || '';
    $('dynamicDetailContent').innerHTML = ['work','punishments','awards'].includes(key) ? window.outputTableHtml(u[key], key) : window.outputRowsHtml(u[key]);
    show('dynamicDetailDisplayBox');
};

window.toggleMemberEvaluationPanel = function() {
    const panel = $('memberEvalPanelBox'), chev = $('memberEvalChevron');
    if (!panel) return;
    const willOpen = panel.classList.contains('hidden');
    panel.classList.toggle('hidden');
    if (chev) chev.innerText = willOpen ? '▲' : '▼';
    if (willOpen) window.openMemberEvalSubTab('media');
};

window.openMemberEvalSubTab = function(subTab) {
    const u = window.MEMBERS_DATABASE[window.currentActiveAlias];
    if (!u) return;
    $('evalTabMediaBtn')?.classList.toggle('saji-btn', subTab === 'media');
    $('evalTabActBtn')?.classList.toggle('saji-btn', subTab === 'activities');
    if (subTab === 'media') window.renderMemberMediaEvaluation(u);
    else window.renderMemberActivitiesEvaluation(u);
};

// أدوات التقييم الإعلامي:
// - الشارحة (-) أو أي رمز غير رقمي => "غير مشارك" (لا يُحسب في المتوسط أو النسبة السنوية)
// - الخلية الفارغة ("") => لا تُحسب حتى يُكتب فيها
// - الرقم (بما فيه 0 أو 1) => يُحسب كما هو بالضبط ويُضاف لعدد الأشهر المشاركة
function getEvalGradeInfo(pct) {
    if (pct >= 85) return { color: '#10b981', grade: 'ممتاز 🌟', interaction: 'تفاعل متميز جداً' };
    if (pct >= 70) return { color: '#00B4D8', grade: 'جيد جداً ✨', interaction: 'تفاعل جيد جداً' };
    if (pct >= 50) return { color: '#f59e0b', grade: 'جيد 👍', interaction: 'تفاعل متوسط' };
    return { color: '#ef4444', grade: 'ضعيف ⚡', interaction: 'تفاعل محدود' };
}

function parseMediaCellScore(raw) {
    if (raw === null || raw === undefined) return { status: 'empty', val: null };
    const s = normDigits(raw);
    if (s === '') return { status: 'empty', val: null };
    if (s === '-' || s === '—' || s === '–') return { status: 'not_participating', val: null };
    const n = parseFloat(s.replace(/%/g, ''));
    if (isNaN(n)) return { status: 'not_participating', val: null };
    return { status: 'scored', val: Math.min(100, Math.max(0, Math.round(n))) };
}

// النسبة السنوية تبدأ بالظهور عند الوصول لشهر 12 (تفعيل شهر 12) أو انتهاء السنة
function isMediaYearReadyForAnnual(year, activeMonthsCount, hasMonth12, maxYearDetected) {
    if (hasMonth12) return true;
    if (activeMonthsCount >= 12) return true;
    const curY = new Date().getFullYear();
    if (year < curY || (maxYearDetected && year < maxYearDetected)) return true;
    return false;
}

function colIndexToLetterClient(index) {
    let letter = "", n = index;
    while (n >= 0) { letter = String.fromCharCode((n % 26) + 65) + letter; n = Math.floor(n / 26) - 1; }
    return letter;
}

function normalizeMediaYearObject(yObj) {
    if (!yObj) return { year: "", columns: [], months: {} };
    let columns = [];
    if (Array.isArray(yObj.columns) && yObj.columns.length) {
        columns = yObj.columns.map(c => ({ cell: String(c.cell).toUpperCase(), name: String(c.name || c.cell).trim() }));
    } else if (Array.isArray(yObj.members) && yObj.members.length) {
        columns = yObj.members.map((m, i) => ({ cell: colIndexToLetterClient(i + 1) + "1", name: String(m).trim(), legacyKey: m }));
    }
    const months = {};
    Object.values(yObj.months || {}).forEach(m => {
        if (!m) return;
        const normScores = {};
        columns.forEach(c => {
            const raw = (m.scores && c.cell in m.scores) ? m.scores[c.cell] : (m.scores && c.legacyKey && c.legacyKey in m.scores ? m.scores[c.legacyKey] : (m.scores ? m.scores[c.name] : null));
            normScores[c.cell] = raw;
        });
        months[m.monthNum] = { monthNum: +m.monthNum, label: m.label || `شهر ${m.monthNum}`, hasData: Boolean(m.hasData), scores: normScores };
    });
    return { year: String(yObj.year || ""), columns, months };
}

async function fetchMediaEvalData(force = false) {
    if (!force && window._mediaEvalRawCache) return window._mediaEvalRawCache;
    const res = await fetch(`${MEDIA_EVAL_API_URL}?t=${Date.now()}`, { redirect: 'follow' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!data.success || !data.years) throw new Error(data.error || "تعذر قراءة جدول التقييم الإعلامي");
    const normYears = {};
    Object.keys(data.years).forEach(y => { normYears[y] = normalizeMediaYearObject(data.years[y]); });
    window._mediaEvalRawCache = { years: normYears, updatedAt: data.updatedAt };
    return window._mediaEvalRawCache;
}

function isRawNameMatchingSingleMember(rawKey, member) {
    const cleanOrig = String(rawKey || '').replace(/^[\d\-\.\)\(\•\*\_–—]+/, '').trim();
    if (!cleanOrig || cleanOrig.length < 2 || cleanOrig === "لا يوجد" || cleanOrig === "-") return false;

    const li = window.lightNormalizeArabic(cleanOrig), ni = window.normalizeNameForMatching(cleanOrig);
    const mName = member.fullName, mLi = window.lightNormalizeArabic(mName), mNi = window.normalizeNameForMatching(mName);
    if (cleanOrig === mName || li === mLi || ni === mNi) return true;

    const g1 = window.findIdentityGroup(cleanOrig), g2 = window.findIdentityGroup(mName);
    if (g1 && g2 && g1.canonical === g2.canonical) return true;
    if (g1 && window.findOfficialMemberForGroup(g1, [mName]) === mName) return true;

    if (li.startsWith("ابو ") && li.split(' ').length === 2) {
        const kid = li.split(' ')[1];
        const row = member.basic?.find(b => b.label && (b.label.includes("أبناء") || b.label.includes("ابناء")));
        if (kid?.length >= 3 && kid !== "الحسن" && row?.val && window.lightNormalizeArabic(window.cleanChildrenNames(row.val)).split(/\s+و\s+|\s+/).includes(kid)) return true;
    }

    const iw = ni.split(' ').filter(Boolean), ow = mNi.split(' ').filter(Boolean);
    if (iw.length < 2 || ow.length < 2) return false;
    const firstOk = (iw[0] === ow[0]) || (iw[0].length >= 4 && ow[0].length >= 4 && window.getEditDistance(iw[0], ow[0]) <= 1);
    if (!firstOk) return false;
    for (let i = 1; i < iw.length; i++) {
        if (iw[i].length < 3) continue;
        const a = iw[i].replace(/^ال(?=.{3})/, '');
        for (let j = 1; j < ow.length; j++) {
            const b = ow[j].replace(/^ال(?=.{3})/, '');
            if (ow[j] === iw[i] || a === b || (a.length >= 4 && b.length >= 4 && (b.startsWith(a) || a.startsWith(b) || window.getEditDistance(a, b) <= 1))) return true;
        }
    }
    return false;
}

function resolveMemberMediaCell(yObj, member) {
    const cols = yObj?.columns || [];
    if (!cols.length) return null;
    if (member.cellRef) {
        const direct = cols.find(c => c.cell === member.cellRef.toUpperCase());
        if (direct) return direct.cell;
    }
    for (let col of cols) {
        const aliases = MEDIA_CELL_ALIASES[col.cell];
        if (aliases && aliases.some(a => isRawNameMatchingSingleMember(a, member))) return col.cell;
    }
    const byName = cols.find(c => isRawNameMatchingSingleMember(c.name, member));
    return byName ? byName.cell : null;
}

// 1) التقييم الإعلامي الخاص بالعضو داخل قائمة «تقييمي»
window.renderMemberMediaEvaluation = async function(member) {
    const box = $('memberEvalSubContent');
    if (!box) return;
    box.innerHTML = window.getNiceLoaderHtml("جاري جلب تقييمك الإعلامي الخاص...");

    try {
        const data = await fetchMediaEvalData(false);
        const sortedYears = Object.keys(data.years).map(Number).filter(n => !isNaN(n)).sort((a, b) => b - a);
        const maxYear = sortedYears[0] || new Date().getFullYear();

        const myMonthly = [], myYears = [];
        sortedYears.forEach(yNum => {
            const yObj = data.years[String(yNum)];
            const cellId = resolveMemberMediaCell(yObj, member);
            if (!cellId) return;

            const activeMonths = Object.values(yObj.months || {}).filter(m => m.hasData).sort((a, b) => b.monthNum - a.monthNum);
            const myScoredVals = [];
            let hasMonth12 = false;

            activeMonths.forEach(m => {
                if (m.monthNum === 12) hasMonth12 = true;
                const parsed = parseMediaCellScore(m.scores[cellId]);
                if (parsed.status === 'scored') {
                    myMonthly.push({ year: yNum, month: m.monthNum, label: m.label, status: 'scored', percent: parsed.val });
                    myScoredVals.push(parsed.val);
                } else if (parsed.status === 'not_participating') {
                    myMonthly.push({ year: yNum, month: m.monthNum, label: m.label, status: 'not_participating', percent: null });
                }
            });

            if (activeMonths.length) {
                const sum = myScoredVals.reduce((a, b) => a + b, 0);
                const avg = myScoredVals.length ? Math.round(sum / myScoredVals.length) : null;
                const ready = isMediaYearReadyForAnnual(yNum, activeMonths.length, hasMonth12, maxYear);
                myYears.push({
                    year: yNum,
                    participatedMonths: myScoredVals.length,
                    avgSoFar: avg,
                    annualPct: ready ? avg : null,
                    completed: ready
                });
            }
        });

        myMonthly.sort((a, b) => (b.year !== a.year) ? b.year - a.year : b.month - a.month);

        if (!myMonthly.length) {
            box.innerHTML = `<div class="inset-pill text-center" style="display:block;padding:18px;color:var(--text-muted);">لا يوجد تقييم إعلامي مسجل لك حتى الآن.<br><button type="button" class="panel-btn mini-btn mt-10" onclick="window._mediaEvalRawCache=null;window.openMemberEvalSubTab('media')">🔄 تحديث</button></div>`;
            return;
        }

        const latest = myMonthly[0];
        const isNotPart = latest.status === 'not_participating';
        const lg = !isNotPart ? getEvalGradeInfo(latest.percent) : { color: '#64748b', grade: 'غير مشارك', interaction: 'غير مشارك في هذا الشهر' };
        const latestYearObj = myYears.find(y => y.year === latest.year);

        const yearlyHtml = myYears.map(ys => {
            if (ys.completed) {
                if (ys.annualPct === null) {
                    return `<div class="inset-pill mt-10" style="justify-content:center;gap:8px;opacity:.9;font-size:.84rem;"><span>التقييم الإعلامي السنوي (سنة ${ys.year}): <strong>غير مشارك</strong></span></div>`;
                }
                const yg = getEvalGradeInfo(ys.annualPct);
                return `
                    <div class="panel-card p-15 mt-10" style="border-right:4px solid ${yg.color};background:rgba(0,180,216,0.06);">
                        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;margin-bottom:8px;">
                            <strong style="color:var(--gold);">🏆 التقييم الإعلامي السنوي (سنة ${ys.year})</strong>
                            <span style="background:${yg.color};color:#fff;padding:2px 10px;border-radius:12px;font-size:.82rem;font-weight:bold;">${ys.annualPct}% • ${yg.grade}</span>
                        </div>
                        <div style="background:rgba(0,0,0,0.18);height:10px;border-radius:10px;overflow:hidden;margin-bottom:8px;"><div style="width:${ys.annualPct}%;height:100%;background:${yg.color};"></div></div>
                        <div style="font-size:.83rem;color:var(--text-muted);">التفاعل السنوي: <strong>${yg.interaction}</strong> | الأشهر المشاركة: <strong>${ys.participatedMonths} شهر</strong></div>
                    </div>`;
            }
            return `<div class="inset-pill mt-10" style="justify-content:center;gap:8px;opacity:.9;font-size:.84rem;text-align:center;"><span>⏳ سوف يظهر التقييم السنوي بنهاية السنة الحالية.</span></div>`;
        }).join('');

        box.innerHTML = `
            <div class="panel-card p-15" style="border-right:4px solid ${lg.color};background:rgba(0,0,0,0.08);">
                <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:10px;">
                    <strong style="color:var(--gold);font-size:1rem;">📅 آخر تقييم إعلامي (${latest.label} - ${latest.year})</strong>
                    <span style="background:${lg.color};color:#fff;padding:3px 12px;border-radius:20px;font-size:.85rem;font-weight:bold;">${!isNotPart ? `${latest.percent}% • ${lg.grade}` : 'غير مشارك'}</span>
                </div>
                ${!isNotPart ? `<div style="background:rgba(0,0,0,0.2);height:12px;border-radius:10px;overflow:hidden;margin-bottom:12px;"><div style="width:${latest.percent}%;height:100%;background:${lg.color};transition:width .5s;"></div></div>` : ''}
                <div class="inset-pill"><span class="label">النسبة المئوية لآخر شهر</span><span class="value" style="color:${lg.color};">${!isNotPart ? latest.percent + '%' : 'غير مشارك'}</span></div>
                <div class="inset-pill"><span class="label">مستوى التفاعل</span><span class="value">${lg.interaction}</span></div>
                ${latestYearObj && latestYearObj.avgSoFar !== null && !latestYearObj.completed ? `<div class="inset-pill"><span class="label">متوسط التفاعل للآن (${latestYearObj.participatedMonths} شهر)</span><span class="value" style="color:${getEvalGradeInfo(latestYearObj.avgSoFar).color};">${latestYearObj.avgSoFar}%</span></div>` : ''}
            </div>
            ${yearlyHtml}
            <div style="display:flex;justify-content:space-between;align-items:center;margin-top:10px;font-size:.75rem;color:var(--text-muted);">
                <span>🔒 هذا التقييم خاص بك وحدك ولا يظهر لأي عضو آخر.</span>
                <button type="button" class="panel-btn mini-btn" style="padding:3px 10px;font-size:.75rem;" onclick="window._mediaEvalRawCache=null;window.openMemberEvalSubTab('media')">🔄 تحديث</button>
            </div>`;
    } catch {
        box.innerHTML = `<div class="inset-pill text-center" style="display:block;color:var(--error);padding:16px;">⚠️ تعذر جلب التقييم الإعلامي حالياً.<br><button type="button" class="panel-btn mini-btn mt-10" onclick="window._mediaEvalRawCache=null;window.openMemberEvalSubTab('media')">🔄 إعادة المحاولة</button></div>`;
    }
};

function didMemberParticipateInForm(form, member) {
    for (let key in form) {
        if (!/(اسماء|أسماء|مشاركين|المشاركين|الحضور|الكادر المشارك|الاعضاء|الأعضاء)/.test(key)) continue;
        const val = String(form[key] || '').trim();
        if (!val || val === "لا يوجد") continue;
        const parts = val.split(/[\r\n,،؛\/\|•]+|\s+-\s+|\s+–\s+|\s+و\s+(?=[أ-ي])/);
        if (parts.some(p => isRawNameMatchingSingleMember(p.replace(/^\d+[\-\.\)\s]+/, '').trim(), member))) return true;
    }
    return false;
}

// 2) تقييم الأنشطة الخاص بالعضو داخل قائمة «تقييمي» (من استمارات أنشطة التجمع فقط)
window.renderMemberActivitiesEvaluation = async function(member) {
    const box = $('memberEvalSubContent');
    if (!box) return;
    box.innerHTML = window.getNiceLoaderHtml("جاري احتساب نسبة مشاركاتك في أنشطة التجمع...");

    try {
        if (!window.allFormsData.tajammu?.length) await window.refreshFormsDataSilently();
        const forms = window.allFormsData.tajammu || [];
        if (!forms.length) return box.innerHTML = `<div class="inset-pill text-center" style="display:block;padding:18px;color:var(--text-muted);">لا توجد استمارات أنشطة للتجمع مسجلة حالياً.</div>`;

        const byYear = {}, allMonths = [];
        forms.forEach(form => {
            const py = parseMonthYearFromText(extractFormDate(form, 'tajammu'));
            if (!py) return;
            const yObj = (byYear[py.year] ||= { total: 0, attended: 0, months: {} });
            const mObj = (yObj.months[py.month] ||= { year: py.year, month: py.month, total: 0, attended: 0 });
            yObj.total++; mObj.total++;
            if (didMemberParticipateInForm(form, member)) { yObj.attended++; mObj.attended++; }
        });

        Object.values(byYear).forEach(yObj => Object.values(yObj.months).forEach(m => allMonths.push(m)));
        allMonths.sort((a, b) => (b.year !== a.year) ? b.year - a.year : b.month - a.month);

        const sortedYears = Object.keys(byYear).map(Number).sort((a, b) => b - a);
        const maxYear = sortedYears[0] || new Date().getFullYear();
        const latestM = allMonths[0], latestPct = latestM?.total ? Math.round((latestM.attended / latestM.total) * 100) : 0;
        const lg = getEvalGradeInfo(latestPct);
        const curY = sortedYears[0], curYObj = byYear[curY], curYPct = curYObj?.total ? Math.round((curYObj.attended / curYObj.total) * 100) : 0;
        const cg = getEvalGradeInfo(curYPct);

        const completedYearsHtml = sortedYears.map(y => {
            const yo = byYear[y], mKeys = Object.keys(yo.months).map(Number);
            if (!isMediaYearReadyForAnnual(y, mKeys.length, mKeys.includes(12), maxYear)) return '';
            const pct = yo.total ? Math.round((yo.attended / yo.total) * 100) : 0, yg = getEvalGradeInfo(pct);
            return `<div class="panel-card p-15 mt-10" style="border-right:4px solid ${yg.color};background:rgba(0,180,216,0.06);">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;"><strong style="color:var(--gold);">🏆 الحصيلة السنوية للأنشطة (سنة ${y})</strong><span style="background:${yg.color};color:#fff;padding:2px 10px;border-radius:12px;font-size:.82rem;font-weight:bold;">${pct}% • ${yg.grade}</span></div>
                <div style="font-size:.84rem;color:var(--text-main);">شاركت في <strong>${yo.attended}</strong> نشاط من أصل <strong>${yo.total}</strong> نشاط للتجمع.</div>
            </div>`;
        }).join('');

        box.innerHTML = `
            <div class="panel-card p-15" style="border-right:4px solid ${lg.color};background:rgba(0,0,0,0.08);">
                <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:10px;">
                    <strong style="color:var(--gold);font-size:1rem;">📅 مشاركاتك في آخر شهر (${latestM ? `شهر ${latestM.month} - ${latestM.year}` : '-'})</strong>
                    <span style="background:${lg.color};color:#fff;padding:3px 12px;border-radius:20px;font-size:.85rem;font-weight:bold;">${latestPct}% • ${lg.grade}</span>
                </div>
                <div style="background:rgba(0,0,0,0.2);height:12px;border-radius:10px;overflow:hidden;margin-bottom:12px;"><div style="width:${latestPct}%;height:100%;background:${lg.color};"></div></div>
                <div class="inset-pill"><span class="label">مشاركاتك لآخر شهر</span><span class="value">${latestM?.attended || 0} من أصل ${latestM?.total || 0} نشاط</span></div>
                <div class="inset-pill"><span class="label">نسبتك في أنشطة سنة ${curY}</span><span class="value" style="color:${cg.color};">${curYPct}% (${curYObj?.attended || 0} من ${curYObj?.total || 0} نشاط)</span></div>
            </div>
            ${completedYearsHtml}
            <div style="text-align:center;font-size:.75rem;color:var(--text-muted);margin-top:10px;">🔒 تُحتسب النسبة من استمارات أنشطة التجمع فقط وبخصوصية تامة لك وحدك.</div>`;
    } catch {
        box.innerHTML = `<div class="inset-pill text-center" style="display:block;color:var(--error);padding:16px;">⚠️ فشل تحميل تقييم الأنشطة، يرجى المحاولة لاحقاً.</div>`;
    }
};

// ==================== 6. واجهة التقييم الإعلامي الكاملة داخل قسم الإعلام المركزي ====================
function ensureMediaEvalAdminScreen() {
    let scr = $('mediaEvalAdminScreen');
    if (!scr) {
        scr = document.createElement('div');
        scr.id = 'mediaEvalAdminScreen';
        scr.className = 'screen hidden';
        $('mediaCentralScreen').parentNode.insertBefore(scr, $('mediaCentralScreen').nextSibling);
    }
    return scr;
}

window.navigateToMediaEvalAdmin = async function(forceRefresh = false) {
    hide('mediaCentralScreen');
    const scr = ensureMediaEvalAdminScreen();
    show('mediaEvalAdminScreen');
    window._mediaEvalViewState = { level: 'years', year: null, month: null };
    scr.innerHTML = `
        <div class="view-header panel-card saji-border mb-20" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
            <h3 class="primary-title" id="mediaEvalAdminTitle">📊 التقييم الإعلامي - السنوات</h3>
            <div style="display:flex;gap:8px;align-items:center;">
                <button class="panel-btn mini-btn" style="border-color:var(--saji-main);color:var(--gold);" onclick="window.navigateToMediaEvalAdmin(true)">🔄 تحديث</button>
                <button class="panel-btn mini-btn" id="mediaEvalAdminBackBtn" onclick="window.goBackToMediaFromEval()">↩ العودة</button>
            </div>
        </div>
        <div id="mediaEvalAdminBody">${window.getNiceLoaderHtml("جاري مزامنة بيانات التقييم الإعلامي...")}</div>`;
    try {
        await fetchMediaEvalData(forceRefresh);
        window.renderMediaEvalYearsView();
    } catch (e) {
        $('mediaEvalAdminBody').innerHTML = `<div class="panel-card p-15 text-center" style="color:var(--error);">⚠️ تعذر جلب بيانات التقييم الإعلامي: ${e.message}</div>`;
    }
};

window.goBackToMediaFromEval = () => {
    window.mediaEvalChartInstance?.destroy();
    switchScreen('mediaEvalAdminScreen', 'mediaCentralScreen');
};

window.renderMediaEvalYearsView = function() {
    window._mediaEvalViewState = { level: 'years', year: null, month: null };
    $('mediaEvalAdminTitle').innerText = '📊 التقييم الإعلامي - السنوات';
    $('mediaEvalAdminBackBtn').onclick = window.goBackToMediaFromEval;
    const years = window._mediaEvalRawCache?.years || {};
    const sorted = Object.keys(years).sort((a, b) => Number(b) - Number(a));
    if (!sorted.length) return $('mediaEvalAdminBody').innerHTML = '<div class="panel-card p-15 text-center">لا توجد سنوات مسجلة بعد.</div>';

    $('mediaEvalAdminBody').innerHTML = `<div class="square-panel-grid">${sorted.map(y => {
        const yObj = years[y], activeCnt = Object.values(yObj.months || {}).filter(m => m.hasData).length;
        return `<button class="panel-card square-btn saji-hover-card" onclick="window.openMediaEvalYearMonths('${y}')">
            <div class="card-icon">🗂️</div>
            <div class="card-text-container"><h3>سنة ${y}</h3><p class="service-desc">${activeCnt} أشهر مفعّلة | ${yObj.columns.length} عضو كادر</p></div>
        </button>`;
    }).join('')}</div>`;
};

window.openMediaEvalYearMonths = function(yearKey) {
    window._mediaEvalViewState = { level: 'months', year: yearKey, month: null };
    const yObj = window._mediaEvalRawCache?.years?.[yearKey];
    if (!yObj) return;
    $('mediaEvalAdminTitle').innerText = `📊 التقييم الإعلامي - سنة ${yearKey}`;
    $('mediaEvalAdminBackBtn').onclick = window.renderMediaEvalYearsView;

    const activeMonths = Object.values(yObj.months || {}).filter(m => m.hasData).sort((a, b) => b.monthNum - a.monthNum);
    const monthsCards = activeMonths.map(m => {
        const vals = Object.values(m.scores).map(parseMediaCellScore).filter(p => p.status === 'scored').map(p => p.val);
        const avg = vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : 0;
        return `<button class="panel-card square-btn saji-hover-card" onclick="window.openMediaEvalDetail('${yearKey}', ${m.monthNum})">
            <div class="card-icon">📅</div>
            <div class="card-text-container"><h3>${m.label}</h3><p class="service-desc">متوسط التفاعل: ${avg}% (${vals.length} مشارك)</p></div>
        </button>`;
    }).join('');

    $('mediaEvalAdminBody').innerHTML = `
        <div class="text-center mb-20">
            <button class="pill-action-btn" style="background:linear-gradient(135deg,var(--saji-main),var(--gold));color:#fff;padding:11px 28px;border:none;border-radius:25px;font-size:.95rem;box-shadow:0 4px 12px rgba(0,180,216,0.25);" onclick="window.openMediaEvalDetail('${yearKey}', 'annual')">🏆 التقييم الإعلامي السنوي لسنة ${yearKey}</button>
        </div>
        <div class="square-panel-grid">${monthsCards || '<div class="panel-card p-15 text-center" style="grid-column:1/-1;">لا توجد أشهر مفعّلة في هذه السنة بعد.</div>'}</div>`;
};

window.openMediaEvalDetail = function(yearKey, monthOrAnnual) {
    window._mediaEvalViewState = { level: 'detail', year: yearKey, month: monthOrAnnual };
    const allYears = window._mediaEvalRawCache?.years || {};
    const yObj = allYears[yearKey];
    if (!yObj) return;
    const isAnnual = monthOrAnnual === 'annual';
    const titleText = isAnnual ? `التقييم الإعلامي السنوي - سنة ${yearKey}` : `التقييم الإعلامي - شهر ${monthOrAnnual} (${yearKey})`;
    $('mediaEvalAdminTitle').innerText = `📊 ${titleText}`;
    $('mediaEvalAdminBackBtn').onclick = () => window.openMediaEvalYearMonths(yearKey);

    const sortedYears = Object.keys(allYears).map(Number).filter(n => !isNaN(n)).sort((a, b) => b - a);
    const maxYear = sortedYears[0] || new Date().getFullYear();
    const activeMonths = Object.values(yObj.months || {}).filter(m => m.hasData);
    const hasMonth12 = Boolean(yObj.months?.[12]?.hasData);
    const isAnnualReady = isMediaYearReadyForAnnual(Number(yearKey), activeMonths.length, hasMonth12, maxYear);

    const rows = yObj.columns.map(col => {
        if (isAnnual) {
            const parsedList = activeMonths.map(m => parseMediaCellScore(m.scores[col.cell]));
            const scoredVals = parsedList.filter(p => p.status === 'scored').map(p => p.val);
            const hasDash = parsedList.some(p => p.status === 'not_participating');
            const sum = scoredVals.reduce((a, b) => a + b, 0);
            const avg = scoredVals.length ? Math.round(sum / scoredVals.length) : null;
            return {
                name: col.name,
                status: scoredVals.length ? 'scored' : (hasDash ? 'not_participating' : 'empty'),
                score: avg,
                annualPct: isAnnualReady ? avg : null,
                participatedMonths: scoredVals.length
            };
        }
        const parsed = parseMediaCellScore(yObj.months[monthOrAnnual]?.scores?.[col.cell]);
        return {
            name: col.name,
            status: parsed.status,
            score: parsed.val,
            annualPct: null,
            participatedMonths: parsed.status === 'scored' ? 1 : 0
        };
    }).sort((a, b) => {
        const va = a.status === 'scored' ? a.score : (a.status === 'not_participating' ? -1 : -2);
        const vb = b.status === 'scored' ? b.score : (b.status === 'not_participating' ? -1 : -2);
        return vb - va;
    });

    const scoredRows = rows.filter(r => r.status === 'scored');
    const notPartRows = rows.filter(r => r.status === 'not_participating');
    const avgAll = scoredRows.length ? Math.round(scoredRows.reduce((a, b) => a + b.score, 0) / scoredRows.length) : 0;
    const annualAvgAll = (isAnnualReady && scoredRows.length) ? Math.round(scoredRows.reduce((a, b) => a + (b.annualPct ?? 0), 0) / scoredRows.length) : null;
    const topMember = scoredRows[0];

    $('mediaEvalAdminBody').innerHTML = `
        <div style="display:flex;flex-direction:column;gap:18px;">
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(175px,1fr));gap:12px;">
                <div class="panel-card saji-border p-15 text-center"><div style="font-size:.82rem;color:var(--text-muted);">${isAnnual ? 'متوسط التفاعل للآن' : 'متوسط التفاعل للشهر'}</div><div style="font-size:1.6rem;font-weight:800;color:#00B4D8;">${avgAll}%</div></div>
                ${isAnnual ? `<div class="panel-card saji-border p-15 text-center"><div style="font-size:.82rem;color:var(--text-muted);">النسبة السنوية</div><div style="font-size:${isAnnualReady ? '1.6rem' : '.95rem'};font-weight:800;color:${isAnnualReady ? '#10b981' : 'var(--gold)'};margin-top:${isAnnualReady ? '0' : '8px'};">${isAnnualReady ? annualAvgAll + '%' : 'تظهر عند الوصول لشهر 12'}</div></div>` : ''}
                <div class="panel-card saji-border p-15 text-center"><div style="font-size:.82rem;color:var(--text-muted);">الأعلى تفاعلاً</div><div style="font-size:1rem;font-weight:800;color:#10b981;margin-top:6px;">${topMember ? `${topMember.name} (${topMember.score}%)` : '-'}</div></div>
                <div class="panel-card saji-border p-15 text-center"><div style="font-size:.82rem;color:var(--text-muted);">${isAnnual ? 'المشاركون / غير المشاركين' : 'المشاركون في الشهر'}</div><div style="font-size:1.15rem;font-weight:800;color:var(--gold);margin-top:4px;">${scoredRows.length} مشارك${notPartRows.length ? ` • ${notPartRows.length} غير مشارك` : ''}</div></div>
            </div>

            <div class="panel-card saji-border p-15">
                <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:14px;border-bottom:1px solid rgba(0,180,216,0.2);padding-bottom:10px;">
                    <h4 class="gold-text" style="margin:0;">📈 المخطط البياني لنسب التقييم الإعلامي</h4>
                    <button class="pill-action-btn" style="background:linear-gradient(135deg,var(--saji-main),var(--gold));color:#fff;border:none;padding:7px 16px;border-radius:20px;font-size:.85rem;" onclick="window.downloadMediaEvalPDF('${yearKey}', '${monthOrAnnual}')">📄 تحميل التقييم (PDF)</button>
                </div>
                <div style="position:relative;width:100%;height:${Math.max(360, rows.length * 30)}px;">
                    <canvas id="mediaEvalAdminChart"></canvas>
                </div>
            </div>

            <div class="panel-card saji-border p-15" style="overflow-x:auto;">
                <h4 class="gold-text mb-15">📋 جدول الترتيب والتفاصيل</h4>
                <table class="modern-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>الاسم</th>
                            <th>${isAnnual ? 'متوسط التفاعل للآن' : 'النسبة المئوية'}</th>
                            ${isAnnual ? '<th>النسبة السنوية</th><th>الأشهر المشاركة</th>' : ''}
                            <th>التقدير والتفاعل</th>
                        </tr>
                    </thead>
                    <tbody>${rows.map((r, i) => {
                        const isScored = r.status === 'scored';
                        const isNotPart = r.status === 'not_participating';
                        const g = isScored ? getEvalGradeInfo(r.score) : { color: '#64748b', grade: isNotPart ? 'غير مشارك' : 'لم يُقيّم بعد' };
                        const ag = (isScored && r.annualPct !== null) ? getEvalGradeInfo(r.annualPct) : null;
                        const scoreDisplay = isScored ? `${r.score}%` : (isNotPart ? 'غير مشارك' : '—');
                        const annualDisplay = isNotPart
                            ? '<span style="color:#64748b;">غير مشارك</span>'
                            : (isAnnualReady && r.annualPct !== null
                                ? `<span style="color:${ag.color};">${r.annualPct}%</span>`
                                : '<span style="font-size:.78rem;opacity:.8;">تظهر بنهاية السنة</span>');
                        return `<tr>
                            <td style="font-weight:bold;">${i + 1}</td>
                            <td style="font-weight:bold;text-align:right;">${r.name}</td>
                            <td style="font-weight:800;color:${g.color};">${scoreDisplay}</td>
                            ${isAnnual ? `<td style="font-weight:800;">${annualDisplay}</td><td style="font-weight:bold;">${isScored ? r.participatedMonths + ' شهر' : '—'}</td>` : ''}
                            <td><span style="background:${g.color}22;color:${g.color};border:1px solid ${g.color}66;padding:2px 10px;border-radius:12px;font-size:.8rem;font-weight:bold;">${g.grade}</span></td>
                        </tr>`;
                    }).join('')}</tbody>
                </table>
            </div>
        </div>`;

    const isDark = !document.body.classList.contains('light-mode'), txtColor = isDark ? '#FFFFFF' : '#0B132B', gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)';
    window.mediaEvalChartInstance?.destroy();
    window.mediaEvalChartInstance = new Chart($('mediaEvalAdminChart').getContext('2d'), {
        type: 'bar',
        data: {
            labels: rows.map(r => `${r.name} (${r.status === 'scored' ? r.score + '%' : (r.status === 'not_participating' ? 'غير مشارك' : '—')})`),
            datasets: [{
                label: isAnnual ? 'متوسط التفاعل للآن %' : 'نسبة التقييم الإعلامي %',
                data: rows.map(r => r.status === 'scored' ? r.score : 0),
                backgroundColor: rows.map(r => r.status === 'scored' ? getEvalGradeInfo(r.score).color : 'rgba(100,116,139,0.28)'),
                borderRadius: 6, barThickness: 18
            }]
        },
        options: {
            devicePixelRatio: 3, indexAxis: 'y', responsive: true, maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    rtl: true,
                    callbacks: {
                        label: c => {
                            const r = rows[c.dataIndex];
                            if (r.status === 'not_participating') return ' غير مشارك';
                            if (r.status !== 'scored') return ' لم يُقيّم بعد';
                            return isAnnual
                                ? (isAnnualReady ? ` النسبة السنوية: ${r.annualPct}% (على ${r.participatedMonths} شهر)` : ` متوسط التفاعل للآن: ${r.score}% (على ${r.participatedMonths} شهر)`)
                                : ` التقييم: ${r.score}%`;
                        }
                    }
                }
            },
            scales: {
                x: { beginAtZero: true, max: 100, ticks: { color: txtColor, callback: v => v + '%' }, grid: { color: gridColor } },
                y: { ticks: { autoSkip: false, color: txtColor, font: { family: 'Segoe UI', size: 12, weight: 'bold' } }, grid: { display: false } }
            }
        }
    });
};

window.downloadMediaEvalPDF = function(yearKey, monthOrAnnual) {
    const canvas = $('mediaEvalAdminChart');
    if (!canvas) return window.showNotification("⚠️ يرجى الانتظار حتى يكتمل رسم التقييم!");
    const isAnnual = monthOrAnnual === 'annual';
    const isDark = !document.body.classList.contains('light-mode');
    const pageBg = isDark ? '#0B132B' : '#F0F8FF', cardBg = isDark ? '#1C2541' : '#FFFFFF';
    const txt = isDark ? '#FFFFFF' : '#0B132B', gold = isDark ? '#CAF0F8' : '#0077B6', brd = '#00B4D8';
    const sub = isAnnual ? `التقييم الإعلامي السنوي (متوسط التفاعل للآن) - سنة ${yearKey}` : `التقييم الإعلامي الشهري - شهر ${monthOrAnnual} لسنة ${yearKey}`;
    const img = canvas.toDataURL('image/png', 1);

    const html = `<div class="pdf-print-page" style="width:210mm;height:294mm;max-height:294mm;background:${pageBg};color:${txt};padding:12mm;box-sizing:border-box;font-family:'Tajawal','Segoe UI',Arial,sans-serif;direction:rtl;position:relative;margin:0 auto;overflow:hidden;"><div style="position:absolute;inset:4mm;border:2.5px solid ${brd};border-radius:14px;pointer-events:none;z-index:1;"></div><div style="position:relative;z-index:2;height:100%;display:flex;flex-direction:column;justify-content:space-between;"><div><div style="background:${cardBg};border:1.5px solid ${brd};border-radius:12px;padding:12px 18px;display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;"><div><div style="font-size:16.5px;font-weight:800;color:${gold};">قسم الإعلام المركزي - تجمع شباب الشريعة (مديرية البصرة)</div><div style="font-size:13.5px;opacity:.9;margin-top:4px;font-weight:bold;">${sub}</div></div><img src="${LOGO_TAJAMMU}" style="width:56px;height:56px;border-radius:10px;border:1.5px solid ${brd};object-fit:cover;"></div><div style="background:${cardBg};border:1.5px solid ${brd};border-radius:14px;padding:18px;text-align:center;"><img src="${img}" style="max-width:100%;max-height:205mm;object-fit:contain;display:block;margin:0 auto;"></div></div><div style="border-top:1px dashed ${brd};padding-top:8px;display:flex;justify-content:space-between;font-size:12px;font-weight:bold;color:${gold};"><span>قسم الإعلام المركزي - مديرية البصرة</span><span>تاريخ التصدير: ${new Date().toISOString().split('T')[0]}</span></div></div></div>`;
    openFormPdfPreviewHtml(html, `التقييم_الإعلامي_${isAnnual ? 'السنوي_' + yearKey : 'شهر_' + monthOrAnnual + '_' + yearKey}.pdf`);
};

// ==================== 7. الرسوم البيانية للإدارة والمنصات والموجزات ====================
window.openChartsScreen = async () => {
    switchScreen('adminScreen', 'chartsScreen'); window.renderAnalyticsCharts();
    if (await window.refreshMembersDatabaseSilently() && !$('chartsScreen').classList.contains('hidden')) window.renderAnalyticsCharts();
};
window.goBackToAdminFromCharts = () => switchScreen('chartsScreen', 'adminScreen');

window.renderAnalyticsCharts = function() {
    ['maritalChartInstance','ageChartInstance','punishmentChartInstance','awardsChartInstance'].forEach(k => window[k]?.destroy());
    const isDark = !document.body.classList.contains('light-mode');
    const txtColor = isDark ? '#FFFFFF' : '#0B132B', gridColor = isDark ? 'rgba(135,206,235,0.1)' : 'rgba(0,119,182,0.1)';
    let married = 0, single = 0, totalAge = 0, ageCnt = 0;
    const ageB = { "تحت 20 سنة": 0, "20 - 25 سنة": 0, "26 - 30 سنة": 0, "فوق 30 سنة": 0 };
    const punish = { "تنبيه": 0, "توبيخ": 0, "انذار": 0, "تجميد": 0 }, awards = {};
    const curYear = new Date().getFullYear();

    for (let alias in window.MEMBERS_DATABASE) {
        const u = window.MEMBERS_DATABASE[alias];
        const st = u.basic.find(b => b.label?.includes("الحالة"))?.val?.trim() || "";
        if (st.includes("متزوج")) married++; else if (st.includes("اعزب") || st.includes("أعزب")) single++;
        const bm = normDigits(u.basic.find(b => b.label?.includes("التولد"))?.val || "").match(/\d{4}/);
        if (bm) {
            const age = curYear - parseInt(bm[0]); totalAge += age; ageCnt++;
            ageB[age < 20 ? "تحت 20 سنة" : age <= 25 ? "20 - 25 سنة" : age <= 30 ? "26 - 30 سنة" : "فوق 30 سنة"]++;
        }
        (u.punishments || []).forEach(p => {
            const t = p.title.trim();
            if (t.includes("تنبيه")) punish["تنبيه"]++; else if (t.includes("توبيخ")) punish["توبيخ"]++;
            else if (t.includes("انذار") || t.includes("إنذار")) punish["انذار"]++; else if (t.includes("تجميد")) punish["تجميد"]++;
        });
        awards[alias] = (u.awards || []).length;
    }
    $('averageAgeVal').innerText = (ageCnt ? Math.round(totalAge / ageCnt) : 0) + " سنة";
    Chart.defaults.color = txtColor; Chart.defaults.font.family = 'Segoe UI, sans-serif';
    const baseOpts = smallX => ({ responsive: true, maintainAspectRatio: false, scales: { y: { grid: { color: gridColor }, ticks: { stepSize: 1 } }, x: { grid: { display: false }, ticks: smallX ? { font: { size: 10 } } : {} } } });

    window.maritalChartInstance = new Chart($('maritalChart').getContext('2d'), { type: 'pie', data: { labels: ['متزوج','أعزب'], datasets: [{ data: [married, single], backgroundColor: ['#00B4D8','#1C2541'], borderWidth: isDark ? 0 : 1 }] }, options: { responsive: true, plugins: { legend: { position: 'bottom' } } } });
    window.ageChartInstance = new Chart($('ageChart').getContext('2d'), { type: 'bar', data: { labels: Object.keys(ageB), datasets: [{ label: 'عدد الكادر', data: Object.values(ageB), backgroundColor: '#00B4D8', borderRadius: 6 }] }, options: baseOpts(false) });
    window.punishmentChartInstance = new Chart($('punishmentChart').getContext('2d'), { type: 'line', data: { labels: Object.keys(punish), datasets: [{ label: 'إجمالي العقوبات', data: Object.values(punish), borderColor: '#ef4444', backgroundColor: 'rgba(239,68,68,0.2)', fill: true, tension: 0.3, borderWidth: 3 }] }, options: baseOpts(true) });
    window.awardsChartInstance = new Chart($('awardsChart').getContext('2d'), { type: 'line', data: { labels: Object.keys(awards), datasets: [{ label: 'كتب الشكر والشهادات', data: Object.values(awards), borderColor: '#00B4D8', backgroundColor: 'rgba(0,180,216,0.2)', fill: true, tension: 0.3, borderWidth: 3 }] }, options: baseOpts(true) });
};

window.openSocialModal = function(platform) {
    hide('sidebarPanel');
    const titles = { tajammu: 'تجمع شباب الشريعة', scouts: 'كشافة الإمام الحسين', trend: 'منصة ترند الإعلامية' };
    $('socialModalTitle').innerText = titles[platform] || '';
    $('socialLinksContainer').innerHTML = (SOCIAL_LINKS[platform] || []).map(l => `<a href="${l.url}" target="_blank" class="name-panel-btn block-link">${l.name}</a>`).join('');
    show('socialLinksModal');
};
window.closeSocialModal = () => hide('socialLinksModal');

window.navigateToMediaCentral = () => switchScreen('adminScreen', 'mediaCentralScreen');
window.goBackToAdminFromMedia = () => switchScreen('mediaCentralScreen', 'adminScreen');
window.navigateToAnnualSummaries = () => switchScreen('mediaCentralScreen', 'annualSummariesScreen');
window.goBackToMediaFromSummaries = () => switchScreen('annualSummariesScreen', 'mediaCentralScreen');

window.openSummaryModal = function(year) {
    window.currentSummaryYear = year; window.isSummaryAutoFlip = false; window.stopPdfAutoSlideShow();
    switchScreen('annualSummariesScreen', 'summaryPresentationScreen');
    $('summaryPageTitle').innerText = 'موجز أنشطة ' + year;
    hide('slideSpeedSelect'); hide('pdfAutoSlideContainer');
    if ($('summarySlideIframe')) { show('summarySlideIframe'); $('summarySlideIframe').src = SUMMARY_LINKS[year].pdfPreview; }
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.changeSlideAutoSpeed = function(ms) {
    const year = window.currentSummaryYear, speed = parseInt(ms, 10) || 5000;
    if (!year || !window.isSummaryAutoFlip) return;
    if (!SUMMARY_LINKS[year].isLargeFile && $('summarySlideIframe')) $('summarySlideIframe').src = `https://docs.google.com/presentation/d/${SUMMARY_LINKS[year].slideId}/embed?start=true&loop=true&delayms=${speed}`;
};

window.stopPdfAutoSlideShow = () => { clearInterval(window.pdfSlideState.timer); window.pdfSlideState = { pdfDoc: null, pageNum: 1, timer: null, isRendering: false }; };
window.closeSummaryModal = () => { window.stopPdfAutoSlideShow(); if ($('summarySlideIframe')) $('summarySlideIframe').src = ''; switchScreen('summaryPresentationScreen', 'annualSummariesScreen'); };

function clearSilentDownloadIframes() {
    window.cleanupPptDownloadState?.();
    const sf = $('pptSilentDownloadFrame');
    if (sf) { try { sf.src = 'about:blank'; sf.removeAttribute('src'); } catch {} }
    document.querySelectorAll('iframe').forEach(fr => {
        const s = fr.getAttribute('src') || '';
        if (s.includes('/export/pptx') || s.includes('export=download')) {
            try { fr.src = 'about:blank'; fr.removeAttribute('src'); if (fr.id !== 'pptSilentDownloadFrame') fr.remove(); } catch {}
        }
    });
}
window.cleanupPptDownloadState = () => {
    const c = window.pptDownloadController;
    clearInterval(c.timer); clearTimeout(c.finishTimer); c.timer = c.finishTimer = null;
    if (c.iframe) { try { c.iframe.src = 'about:blank'; c.iframe.remove(); } catch {} c.iframe = null; }
};

// ==================== 8. سجلات الحضور ====================
window.navigateToAttendanceLogs = () => { switchScreen('adminScreen', 'attendanceLogsScreen'); window.fetchAndBuildAttendanceButtons(); };
window.goBackToAdminFromLogs = () => switchScreen('attendanceLogsScreen', 'adminScreen');

window.fetchAndBuildAttendanceButtons = function() {
    const mc = $('attendanceMonthsContainer');
    mc.innerHTML = window.getNiceLoaderHtml("جاري جلب سجلات الحضور...");
    show('attendanceMonthsContainer'); hide('attendanceDaysContainer');
    $('attendanceScreenTitle').innerText = "سجلات الحضور (الأشهر)";
    $('attendanceBackBtn').onclick = window.goBackToAdminFromLogs;

    fetch(GAS_API_URL).then(r => r.json()).then(data => {
        window.groupedAttendanceData = {};
        if (data.error) return mc.innerHTML = `<div class="text-center p-15" style="color:var(--error);grid-column:1/-1;">حدث خطأ: ${data.error}</div>`;
        if (!data?.length) return mc.innerHTML = '<div class="text-center p-15" style="grid-column:1/-1;">لا توجد سجلات مؤرشفة.</div>';
        window.fetchedAttendanceLogs = data;
        data.forEach((log, i) => {
            const clean = String(log.date).split('T')[0], p = clean.split('-');
            if (p.length === 3) (window.groupedAttendanceData[`شهر ${parseInt(p[1])} - ${p[0]}`] ||= []).push({ ...log, originalIndex: i, cleanDate: clean });
        });
        window.renderMonthsFolders();
    }).catch(() => mc.innerHTML = '<div class="text-center p-15" style="color:var(--error);grid-column:1/-1;">فشل الاتصال بقاعدة البيانات! ⚠️</div>');
};

window.renderMonthsFolders = function() {
    const mc = $('attendanceMonthsContainer');
    show('attendanceMonthsContainer'); hide('attendanceDaysContainer');
    $('attendanceScreenTitle').innerText = "سجلات الحضور (الأشهر)";
    $('attendanceBackBtn').onclick = window.goBackToAdminFromLogs;
    mc.innerHTML = '';
    Object.keys(window.groupedAttendanceData).reverse().forEach(mk => {
        const b = document.createElement('button'); b.className = 'panel-card square-btn saji-hover-card';
        b.innerHTML = `<div class="card-icon">📁</div><h3 style="direction:ltr;">${mk}</h3>`;
        b.onclick = () => window.renderDaysCapsules(mk); mc.appendChild(b);
    });
};

window.renderDaysCapsules = function(mk) {
    hide('attendanceMonthsContainer'); show('attendanceDaysContainer');
    $('attendanceScreenTitle').innerText = "تفاصيل الشهر";
    $('attendanceBackBtn').onclick = window.renderMonthsFolders;
    const btns = window.groupedAttendanceData[mk].slice().reverse().map(l =>
        `<button class="panel-btn saji-hover-card" style="border-radius:12px;padding:10px;display:flex;flex-direction:column;align-items:center;line-height:1.4;" onclick="window.openAttendanceDetailModal(${l.originalIndex})"><strong style="font-size:1rem;">${l.day}</strong><span style="font-size:.75rem;color:var(--gold);">${l.cleanDate}</span></button>`
    ).join('');
    $('attendanceDaysContainer').innerHTML = `<div class="open-folder-container"><div class="open-folder-header"><div class="folder-tab">📂 سجلات ${mk}</div></div><div class="open-folder-body"><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;width:100%;">${btns}</div></div></div>`;
};

window.openAttendanceDetailModal = idx => {
    const l = window.fetchedAttendanceLogs[idx]; if (!l) return;
    $('attendanceModalTitle').innerHTML = `سجل حضور يوم ${l.day}<br><span style="font-size:1rem;color:var(--text-muted);">(${String(l.date).split('T')[0]})</span>`;
    $('attendanceModalTextContent').innerText = l.text.replace(/\*/g, '').replace(/--------------------------/g, '══════════════════════');
    $('attendanceModalPdfBtn').href = l.pdfUrl;
    show('attendanceDetailModal');
};
window.closeAttendanceDetailModal = () => hide('attendanceDetailModal');

// ==================== 9. محرك مطابقة الأسماء وتحليل المشاركات ====================
window.lightNormalizeArabic = str => !str ? "" : String(str).trim()
    .replace(/^[\d\-\.\)\(\•\*\_–—]+/, '').replace(/\((.*?)\)/g, '').trim()
    .replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/[ىئ]/g, 'ي').replace(/ؤ/g, 'و')
    .replace(/ابا\s+/g, 'ابو ').replace(/^ابا$/, 'ابو').replace(/عبد\s+/g, 'عبد').replace(/\s+/g, ' ').trim();

window.normalizeNameForMatching = function(str, keepTitles = false) {
    let s = window.lightNormalizeArabic(str);
    if (!keepTitles) {
        for (let p of ["السيد ","سيد ","الشيخ ","شيخ ","الاخ ","اخ ","القائد ","قائد ","الكشاف ","كشاف ","الجوال ","جوال ","الاستاذ ","استاذ ","الحاج ","حاج ","الملا ","ملا ","دكتور ","د. ","م. "]) {
            if (s.startsWith(p)) s = s.substring(p.length).trim();
        }
    }
    return s.replace(/ض/g, 'ظ').replace(/\s+/g, ' ').trim();
};

window.getEditDistance = (a, b) => {
    if (a === b) return 0; if (!a.length) return b.length; if (!b.length) return a.length;
    const m = Array.from({ length: b.length + 1 }, (_, i) => [i]);
    for (let j = 0; j <= a.length; j++) m[0][j] = j;
    for (let i = 1; i <= b.length; i++) for (let j = 1; j <= a.length; j++)
        m[i][j] = b[i - 1] === a[j - 1] ? m[i - 1][j - 1] : Math.min(m[i - 1][j - 1], m[i][j - 1], m[i - 1][j]) + 1;
    return m[b.length][a.length];
};

window.findIdentityGroup = function(rawName) {
    const li = window.lightNormalizeArabic(rawName), di = window.normalizeNameForMatching(rawName);
    if (!li) return null;
    for (let g of window.IDENTITY_GROUPS) {
        for (let a of g.aliases) {
            const la = window.lightNormalizeArabic(a), da = window.normalizeNameForMatching(a);
            if (li === la || di === da || (la.includes(' ') && li.split(' ').length >= 2 && (li.startsWith(la + ' ') || la.startsWith(li + ' ')))) return g;
        }
    }
    return null;
};

window.findOfficialMemberForGroup = function(group, keys) {
    if (!group || !keys?.length) return null;
    for (let off of keys) {
        const lo = window.lightNormalizeArabic(off), doff = window.normalizeNameForMatching(off);
        for (let a of group.aliases) {
            const la = window.lightNormalizeArabic(a), da = window.normalizeNameForMatching(a);
            if (lo === la || doff === da || lo.startsWith(la + ' ') || doff.startsWith(da + ' ') || la.startsWith(lo + ' ') || da.startsWith(doff + ' ')) return off;
        }
    }
    const cw = window.normalizeNameForMatching(group.canonical).split(' ').filter(Boolean);
    if (cw.length >= 2) return keys.find(o => { const ow = window.normalizeNameForMatching(o).split(' ').filter(Boolean); return ow.length >= 2 && ow[0] === cw[0] && ow[1] === cw[1]; }) || null;
    return null;
};

window.resolveParticipantEntity = function(rawName) {
    const cleanOrig = String(rawName || '').replace(/^[\d\-\.\)\(\•\*\_–—]+/, '').trim();
    if (!cleanOrig || cleanOrig.length < 3 || cleanOrig === "لا يوجد" || cleanOrig === "-") return null;
    const li = window.lightNormalizeArabic(cleanOrig), ni = window.normalizeNameForMatching(cleanOrig);
    if (!li || li.length < 3) return null;
    const keys = Object.keys(window.MEMBERS_DATABASE || {});
    const mkRes = (name, reason) => ({ isKader: true, name, rawWritten: cleanOrig, reason: cleanOrig !== name ? reason : null });

    for (let off of keys) if (cleanOrig === off || window.lightNormalizeArabic(off) === li) return mkRes(off, "توحيد الهمزات والكتابة (كادر)");
    const grp = window.findIdentityGroup(cleanOrig);
    if (grp) { const m = window.findOfficialMemberForGroup(grp, keys); if (m) return mkRes(m, `مطابقة كنية/مرادف للكادر (${cleanOrig} ⬅️ ${m})`); }
    const learned = window.SESSION_LEARNED_ALIASES[cleanOrig] || window.SESSION_LEARNED_ALIASES[ni];
    if (learned && keys.includes(learned)) return mkRes(learned, `تدقيق ذكي للكادر (${cleanOrig} ⬅️ ${learned})`);
    for (let off of keys) if (window.normalizeNameForMatching(off) === ni && ni.length >= 3) return mkRes(off, `مطابقة إملائية للكادر (${cleanOrig} ⬅️ ${off})`);

    if (li.startsWith("ابو ") && li.split(' ').length === 2) {
        const kid = li.split(' ')[1];
        if (kid?.length >= 3 && kid !== "الحسن") {
            const cands = keys.filter(off => {
                const row = window.MEMBERS_DATABASE[off]?.basic?.find(b => b.label && (b.label.includes("أبناء") || b.label.includes("ابناء")));
                return row?.val && window.lightNormalizeArabic(window.cleanChildrenNames(row.val)).split(/\s+و\s+|\s+/).includes(kid);
            });
            if (cands.length === 1) return mkRes(cands[0], `استنتاج الكنية من سجل أبناء الكادر (${cleanOrig} ⬅️ ${cands[0]})`);
        }
    }

    const iw = ni.split(' ').filter(Boolean);
    if (iw.length === 1 && iw[0].length >= 4) {
        const sm = keys.filter(o => window.normalizeNameForMatching(o).split(' ')[0] === iw[0]);
        if (sm.length === 1) return mkRes(sm[0], `مطابقة الاسم المفرد للكادر (${cleanOrig} ⬅️ ${sm[0]})`);
    } else if (iw.length >= 2) {
        let best = null, maxS = 0;
        for (let off of keys) {
            const ow = window.normalizeNameForMatching(off).split(' ').filter(Boolean);
            if (!ow.length || !(iw[0] === ow[0] || (iw[0].length >= 5 && ow[0].length >= 5 && window.getEditDistance(iw[0], ow[0]) <= 1))) continue;
            let score = 1;
            for (let i = 1; i < iw.length; i++) {
                if (iw[i].length < 3) continue;
                const a = iw[i].replace(/^ال(?=.{3})/, '');
                for (let j = 1; j < ow.length; j++) {
                    const b = ow[j].replace(/^ال(?=.{3})/, '');
                    if (ow[j] === iw[i] || a === b || (iw[i].length >= 4 && ow[j].startsWith(iw[i])) || (ow[j].length >= 4 && iw[i].startsWith(ow[j])) || (iw[i].length >= 4 && ow[j].length >= 4 && window.getEditDistance(iw[i], ow[j]) <= 1)) {
                        score += (i === 1 && j === 1) ? 2.5 : 2; break;
                    }
                }
            }
            if (score >= 2.5 && score > maxS) { maxS = score; best = off; }
        }
        if (best) return mkRes(best, `مطابقة ذكية لاسم الكادر (${cleanOrig} ⬅️ ${best})`);
    }
    return { isVolunteer: true, name: cleanOrig, norm: li, rawWritten: cleanOrig, reason: null };
};

window.analyzeParticipantsFromForms = function(formsList) {
    const kaderCounts = {}, volunteerGroups = {}, auditMap = {};
    Object.keys(window.MEMBERS_DATABASE || {}).forEach(k => { if (!window.isMemberInactive(k, window.MEMBERS_DATABASE[k])) kaderCounts[k] = 0; });

    formsList.forEach(item => {
        const form = item.form || item, seen = new Set();
        for (let key in form) {
            if (!/(اسماء|أسماء|مشاركين|المشاركين|الحضور|الكادر المشارك|الاعضاء|الأعضاء)/.test(key)) continue;
            const val = String(form[key] || '').trim();
            if (!val || val === "لا يوجد") continue;
            val.split(/[\r\n,،؛\/\|•]+|\s+-\s+|\s+–\s+|\s+و\s+(?=[أ-ي])/).forEach(p => {
                const c = p.replace(/^\d+[\-\.\)\s]+/, '').trim();
                if (!c || c.length < 3 || /^\d+$/.test(c)) return;
                const res = window.resolveParticipantEntity(c);
                if (!res) return;
                if (res.isKader) {
                    if (window.isMemberInactive(res.name, window.MEMBERS_DATABASE[res.name])) return;
                    if (res.reason && res.rawWritten !== res.name) {
                        const ck = `${res.rawWritten}==>:${res.name}`;
                        (auditMap[ck] ||= { from: res.rawWritten, to: res.name, reason: res.reason, category: "كادر", count: 0 }).count++;
                    }
                    if (!seen.has("K_" + res.name)) { seen.add("K_" + res.name); kaderCounts[res.name] = (kaderCounts[res.name] || 0) + 1; }
                } else if (res.isVolunteer && !window.isMemberInactive(res.name, null)) {
                    if (!seen.has("V_" + res.norm)) {
                        seen.add("V_" + res.norm);
                        (volunteerGroups[res.norm] ||= { displayName: res.name, count: 0 }).count++;
                    }
                }
            });
        }
    });
    return {
        kader: Object.entries(kaderCounts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'ar')),
        volunteers: Object.values(volunteerGroups).sort((a, b) => b.count - a.count),
        auditChanges: Object.values(auditMap).sort((a, b) => b.count - a.count),
        totalForms: formsList.length
    };
};

window.getFormOrgOrTeamName = (form, type) => {
    for (let k in (form || {})) {
        if (/(مؤسسة|المؤسسة|فرقة|الفرقة|جهة|organization)/i.test(k) && !/(قائد|مدير|مسؤول)/i.test(k)) {
            const v = String(form[k] || '').trim();
            if (v && v !== "لا يوجد" && v !== "-") return v;
        }
    }
    return type === 'scouts' ? "فرقة غير محددة" : "مؤسسة غير محددة";
};

window.analyzeInstitutionsData = formsList => {
    const counts = {};
    formsList.forEach(item => {
        const f = item.form || item;
        let name = "أخرى (غير محددة)";
        for (let k in f) if (/(مؤسسة|المؤسسة|جهة|فرقة)/i.test(k) && !/(قائد|مدير|مسؤول)/i.test(k) && String(f[k] || '').trim()) { name = String(f[k]).trim(); break; }
        counts[name] = (counts[name] || 0) + 1;
    });
    return counts;
};

window.analyzeTrendData = function(yearFilter) {
    const months = Object.keys(window.currentFormsGroups)
        .filter(k => k !== "غير مصنف" && (!yearFilter || k.endsWith(' - ' + yearFilter)))
        .sort((a, b) => {
            const [mA, yA] = a.replace('شهر ', '').split(' - ').map(Number);
            const [mB, yB] = b.replace('شهر ', '').split(' - ').map(Number);
            return yA !== yB ? yA - yB : mA - mB;
        });
    const insts = new Set(), byMonth = {};
    months.forEach(mk => {
        byMonth[mk] = window.analyzeInstitutionsData(window.currentFormsGroups[mk].map(x => x.form));
        Object.keys(byMonth[mk]).forEach(i => insts.add(i));
    });
    return {
        labels: months,
        datasets: Array.from(insts).map((inst, i) => ({
            label: inst, data: months.map(mk => byMonth[mk][inst] || 0),
            backgroundColor: CHART_COLORS[i % CHART_COLORS.length], borderColor: CHART_COLORS[i % CHART_COLORS.length],
            borderWidth: 1, borderRadius: 5, maxBarThickness: 32
        }))
    };
};

// ==================== 10. الأرشيف الهرمي للاستمارات والإحصائيات ====================
function extractFormDate(form, type, allowTimestampFallback = true) {
    const parseStr = s => {
        const ns = normDigits(s);
        if (!ns) return null;
        if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/i.test(ns)) {
            const dt = new Date(ns);
            if (!isNaN(dt.getTime())) {
                return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
            }
        }
        const ymd = ns.match(/(20\d{2})[-/.](\d{1,2})[-/.](\d{1,2})/);
        if (ymd) return `${ymd[1]}-${ymd[2].padStart(2, '0')}-${ymd[3].padStart(2, '0')}`;
        const dmy = ns.match(/(\d{1,2})[-/.](\d{1,2})[-/.](20\d{2})/);
        if (dmy) return `${dmy[3]}-${dmy[2].padStart(2, '0')}-${dmy[1].padStart(2, '0')}`;
        const py = parseMonthYearFromText(ns);
        return py ? `${py.year}-${String(py.month).padStart(2, '0')}-01` : null;
    };

    if (type === 'planning') {
        if (form.year && form.month) {
            const py = parseMonthYearFromText(`شهر ${form.month} ${form.year}`, +normDigits(form.year));
            if (py) return `${py.year}-${String(py.month).padStart(2, '0')}-01`;
        }
        if (allowTimestampFallback && form.timestamp) {
            return parseStr(String(form.timestamp)) || String(form.timestamp).split(' ')[0];
        }
    }

    // قراءة تاريخ الاستمارة من محتواها فقط (مع استبعاد الطابع الزمني وتاريخ الإرسال)
    for (let k in form) {
        if (/(التاريخ|تاريخ|date)/i.test(k) && !/(timestamp|طابع|زمن|إرسال|ارسال|تقديم)/i.test(k)) {
            const r = parseStr(String(form[k]));
            if (r) return r;
        }
    }

    // استخدام الطابع الزمني كخيار احتياطي فقط للأرشفة (وليس لاسم ملف التحميل)
    if (allowTimestampFallback) {
        for (let k in form) {
            if (/(timestamp|طابع|زمن)/i.test(k)) {
                const r = parseStr(String(form[k]));
                if (r) return r;
            }
        }
    }

    return "بدون تاريخ";
}

window.rebuildCurrentFormsGroups = function(type) {
    window.currentFormsGroups = {}; window._yearsFormsMap = {};
    (window.allFormsData[type] || []).forEach((form, i) => {
        const cleanDate = extractFormDate(form, type), p = cleanDate.split('-');
        const mk = (p.length >= 2 && p[0] !== "بدون") ? `شهر ${parseInt(p[1])} - ${p[0]}` : "غير مصنف";
        (window.currentFormsGroups[mk] ||= []).push({ form, cleanDate, originalIndex: i });
    });
    Object.keys(window.currentFormsGroups).forEach(mk => {
        const yk = (mk !== "غير مصنف" && mk.includes(' - ')) ? mk.split(' - ')[1].trim() : "غير مصنف";
        (window._yearsFormsMap[yk] ||= []).push(mk);
    });
};

function getFormsForStatsContext(scope, type, monthKey) {
    if (scope === 'yearly') return (window._yearsFormsMap[monthKey] || []).flatMap(mk => (window.currentFormsGroups[mk] || []).map(x => x.form));
    if (scope === 'monthly') return (window.currentFormsGroups[monthKey] || []).map(x => x.form);
    return window.allFormsData[type] || [];
}

window.syncAndRefreshStatsLive = async function(showToast = true) {
    const btn = $('liveSyncStatsBtn');
    if (btn) { btn.disabled = true; btn.innerHTML = '⏳ جاري التحديث...'; }
    await Promise.all([window.refreshMembersDatabaseSilently(), window.refreshFormsDataSilently()]);
    window._lastDataSignature = window.computeCurrentDataSignature();
    const ctx = window.currentStatsContext;
    if (ctx?.type) {
        window.rebuildCurrentFormsGroups(ctx.type);
        if (!$('formsStatsScreen')?.classList.contains('hidden')) window.renderFormsCharts(ctx.scope, ctx.type, ctx.monthKey);
    }
    if (btn) { btn.disabled = false; btn.innerHTML = '🔄 تحديث فوري للبيانات'; }
    if (showToast) window.showNotification("✅ تم تحديث سجل الأعضاء والاستمارات والإحصاءات بنجاح!");
};

window.openFormsStatsScreen = async function(scope, type, monthKey = null) {
    window.currentStatsContext = { scope, type, monthKey };
    ['formsMonthsScreen','formsListScreen'].forEach(hide);
    let scr = $('formsStatsScreen');
    if (!scr) {
        scr = document.createElement('div'); scr.id = 'formsStatsScreen'; scr.className = 'screen hidden';
        $('dashboardScreen').parentNode.insertBefore(scr, $('formsMonthsScreen').nextSibling);
    }
    const L = getStatsLabels(type);
    const title = L.isScouts
        ? `إحصائيات ${L.orgFullName} (${scope === 'yearly' ? 'سنة ' + monthKey : monthKey})`
        : (scope === 'yearly' ? `الإحصائية السنوية لسنة ${monthKey} (${L.shortOrg})` : `الإحصائية الشهرية - ${monthKey} (${L.shortOrg})`);

    scr.innerHTML = `
        <div class="view-header panel-card saji-border mb-20" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
            <h3 class="primary-title">${title}</h3>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
                <button class="panel-btn mini-btn" id="liveSyncStatsBtn" style="border-color:var(--saji-main);color:var(--gold);" onclick="window.syncAndRefreshStatsLive(true)">🔄 تحديث فوري للبيانات</button>
                <button class="panel-btn mini-btn" onclick="window.closeFormsStatsScreen('${scope}')">↩ العودة للفولدرات</button>
            </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:20px;width:100%;max-width:1050px;margin:0 auto;">
            <div class="panel-card saji-border p-15" style="width:100%;box-sizing:border-box;">
                <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:15px;border-bottom:1px solid rgba(0,180,216,0.2);padding-bottom:10px;">
                    <h4 class="gold-text" style="font-size:1.15rem;margin:0;">📊 نسبة الإنجاز ومجموع أنشطة ${L.entityPlural}</h4>
                    <button class="pill-action-btn" style="background:linear-gradient(135deg,var(--saji-main),var(--gold));color:#fff;border:none;padding:7px 16px;font-size:.85rem;border-radius:20px;" onclick="window.downloadInstitutionsStatsPDF()">📄 تحميل إحصائية ${L.entityPlural} (PDF)</button>
                </div>
                <div style="position:relative;min-height:360px;height:42vh;max-height:440px;width:100%;display:flex;justify-content:center;align-items:center;"><canvas id="formsDoughnutChart"></canvas></div>
            </div>
            ${scope === 'yearly' ? `<div class="panel-card saji-border p-15" style="width:100%;box-sizing:border-box;"><h4 class="text-center mb-15 gold-text" style="font-size:1.15rem;">📈 مقارنة أنشطة ${L.entityPlural} عبر أشهر سنة ${monthKey}</h4><div style="position:relative;min-height:380px;height:46vh;max-height:480px;width:100%;"><canvas id="formsTrendChart"></canvas></div></div>` : ''}
            <div class="panel-card saji-border p-15" style="width:100%;box-sizing:border-box;">
                <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px;margin-bottom:12px;border-bottom:1px solid rgba(0,180,216,0.2);padding-bottom:10px;">
                    <div><h4 class="gold-text" style="font-size:1.15rem;margin:0;">🛡️ تقييم المشاركات في الأنشطة (${L.kaderTitle})</h4><span style="font-size:.75rem;color:var(--text-muted);">🔒 معالجة ذكية محلية 100% داخل الموقع</span></div>
                    <div style="display:flex;gap:8px;flex-wrap:wrap;">
                        <button class="pill-action-btn" style="background:linear-gradient(135deg,var(--saji-main),var(--gold));color:#fff;border:none;padding:7px 14px;font-size:.82rem;border-radius:20px;" onclick="window.downloadKaderParticipationPDF()">📄 تحميل إحصائية الكادر (PDF)</button>
                        <button class="pill-action-btn" id="aiResolveNamesBtn" style="background:linear-gradient(135deg,#0077B6,#00B4D8);color:#fff;border:none;padding:7px 14px;font-size:.82rem;border-radius:20px;" onclick="window.runAiSmartNameResolution()">🤖 تدقيق كنيات وأسماء الكادر</button>
                        <button class="pill-action-btn" id="aiEvaluateParticipationBtn" style="background:linear-gradient(135deg,#10b981,#059669);color:#fff;border:none;padding:7px 14px;font-size:.82rem;border-radius:20px;" onclick="window.runAiParticipationReport()">✨ التحليل التفاعلي الشامل</button>
                    </div>
                </div>
                <div id="kaderStatusSummaryBar" style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px;"></div>
                <div id="aiParticipationInsightBox" class="hidden" style="margin-bottom:15px;padding:14px;border-radius:10px;background:rgba(0,180,216,0.08);border:1px solid var(--saji-main);font-size:.9rem;line-height:1.7;"></div>
                <div id="kaderChartWrap" style="position:relative;width:100%;min-height:350px;"><canvas id="kaderParticipationChart"></canvas></div>
            </div>
            <div class="panel-card saji-border p-15" style="width:100%;box-sizing:border-box;">
                <h4 class="text-center mb-15 gold-text" style="font-size:1.1rem;">🌟 مشاركات المتطوعين والمساندين</h4>
                <div id="volunteersStatsGrid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px;max-height:400px;overflow-y:auto;padding:4px;"></div>
            </div>
        </div>`;
    show('formsStatsScreen');
    window.renderFormsCharts(scope, type, monthKey);
    window.startAutoLiveStatsWatcher();
    window.syncAndRefreshStatsLive(false);
};

window.closeFormsStatsScreen = scope => switchScreen('formsStatsScreen', scope === 'yearly' ? 'formsMonthsScreen' : 'formsListScreen');

window.renderFormsCharts = function(scope, type, monthKey) {
    const isDark = !document.body.classList.contains('light-mode'), txtColor = isDark ? '#FFFFFF' : '#0B132B', gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)';
    const formsList = getFormsForStatsContext(scope, type, monthKey), counts = window.analyzeInstitutionsData(formsList);
    const total = Object.values(counts).reduce((a, b) => a + b, 0);

    window.overallFormsChartInstance?.destroy();
    if ($('formsDoughnutChart')) {
        window.overallFormsChartInstance = new Chart($('formsDoughnutChart').getContext('2d'), {
            type: 'doughnut',
            data: { labels: Object.keys(counts).map(n => `${n} (${counts[n]})`), datasets: [{ data: Object.values(counts), backgroundColor: CHART_COLORS, borderWidth: 2, borderColor: isDark ? '#1C2541' : '#FFFFFF' }] },
            options: { devicePixelRatio: 3, responsive: true, maintainAspectRatio: false, cutout: '64%', layout: { padding: 10 }, plugins: { legend: { position: 'bottom', rtl: true, labels: { font: { family: 'Segoe UI', size: 13, weight: 'bold' }, color: txtColor, padding: 15, boxWidth: 16 } }, centerText: { text: total + "\nنشاط", color: txtColor } } }
        });
    }
    if (scope === 'yearly' && $('formsTrendChart')) {
        window.formsTrendChartInstance?.destroy();
        window.formsTrendChartInstance = new Chart($('formsTrendChart').getContext('2d'), {
            type: 'bar', data: window.analyzeTrendData(monthKey),
            options: {
                devicePixelRatio: 3, responsive: true, maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom', rtl: true, labels: { font: { family: 'Segoe UI', size: 12, weight: 'bold' }, color: txtColor, padding: 12, boxWidth: 14 } }, tooltip: { rtl: true, callbacks: { label: c => ` ${c.dataset.label}: ${c.parsed.y} نشاط` } } },
                scales: { y: { beginAtZero: true, ticks: { stepSize: 1, color: txtColor, font: { weight: 'bold' } }, grid: { color: gridColor } }, x: { ticks: { color: txtColor, font: { family: 'Segoe UI', size: 12, weight: 'bold' } }, grid: { display: false } } }
            }
        });
    }
    window.renderParticipationVisuals(formsList);
};

window.renderParticipationVisuals = function(formsList) {
    const isDark = !document.body.classList.contains('light-mode'), txtColor = isDark ? '#FFFFFF' : '#0B132B', gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)';
    const stats = window.lastParticipationStats = window.analyzeParticipantsFromForms(formsList);
    const activeCnt = stats.kader.filter(x => x[1] > 0).length, zeroCnt = stats.kader.length - activeCnt;

    if ($('kaderStatusSummaryBar')) $('kaderStatusSummaryBar').innerHTML = `<div style="display:flex;flex-wrap:wrap;gap:14px;width:100%;font-size:.82rem;font-weight:bold;background:rgba(0,0,0,0.12);padding:8px 12px;border-radius:8px;border:1px solid rgba(0,180,216,0.15);"><span style="color:#10b981;">🟢 كادر مشارك: ${activeCnt}</span><span style="color:#f59e0b;">🟠 كادر (0 مشاركة): ${zeroCnt}</span><span style="color:var(--gold);">🔄 كنيات ومرادفات الكادر المدمجة: ${stats.auditChanges.length}</span></div>`;

    const wrap = $('kaderChartWrap');
    window.kaderParticipationChartInstance?.destroy();
    if (!stats.kader.length) { wrap.style.minHeight = "100px"; wrap.innerHTML = '<div class="text-center p-15" style="color:var(--text-muted);">لا توجد بيانات للكادر حالياً.</div>'; }
    else {
        wrap.style.height = Math.max(360, stats.kader.length * 32) + "px";
        wrap.innerHTML = '<canvas id="kaderParticipationChart"></canvas>';
        window.kaderParticipationChartInstance = new Chart($('kaderParticipationChart').getContext('2d'), {
            type: 'bar',
            data: {
                labels: stats.kader.map(([n, c]) => `${n} (${c} نشاط - ${stats.totalForms ? Math.round(c / stats.totalForms * 100) : 0}%)`),
                datasets: [{ label: 'عدد المشاركات', data: stats.kader.map(x => x[1]), backgroundColor: stats.kader.map(x => x[1] > 0 ? '#10b981' : 'rgba(245,158,11,0.45)'), borderColor: stats.kader.map(x => x[1] > 0 ? '#059669' : '#f59e0b'), borderWidth: 1.5, borderRadius: 6, barThickness: 18 }]
            },
            options: {
                devicePixelRatio: 3, indexAxis: 'y', responsive: true, maintainAspectRatio: false,
                plugins: { legend: { display: false }, tooltip: { rtl: true, callbacks: { label: c => ` شارك في ${c.parsed.x} نشاط من أصل ${stats.totalForms} (${stats.totalForms ? Math.round(c.parsed.x / stats.totalForms * 100) : 0}%)` } } },
                scales: { x: { beginAtZero: true, max: stats.totalForms || undefined, ticks: { stepSize: 1, color: txtColor, font: { weight: 'bold' } }, grid: { color: gridColor } }, y: { ticks: { autoSkip: false, color: txtColor, font: { family: 'Segoe UI', size: 12, weight: 'bold' } }, grid: { display: false } } }
            }
        });
    }
    if ($('volunteersStatsGrid')) $('volunteersStatsGrid').innerHTML = !stats.volunteers.length
        ? '<div style="grid-column:1/-1;text-align:center;padding:15px;color:var(--text-muted);">لا توجد أسماء إضافية في هذا القسم.</div>'
        : stats.volunteers.map(v => `<div style="background:rgba(0,180,216,0.08);border:1px solid rgba(0,180,216,0.28);border-radius:8px;padding:6px 10px;display:flex;justify-content:space-between;align-items:center;gap:6px;"><span style="font-size:.8rem;font-weight:bold;color:var(--text-main);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${v.displayName}">${v.displayName}</span><span style="background:var(--saji-main);color:#fff;font-size:.72rem;font-weight:bold;padding:2px 8px;border-radius:12px;flex-shrink:0;">${v.count}</span></div>`).join('');
};

window.runAiSmartNameResolution = async function() {
    const box = $('aiParticipationInsightBox'), btn = $('aiResolveNamesBtn');
    if (!box) return;
    btn.disabled = true; show('aiParticipationInsightBox');
    box.innerHTML = '<div style="color:var(--gold);font-weight:bold;">🤖 جاري الفحص العميق لأسماء وكُنى الكادر ومطابقة السجل محلياً... ⏳</div>';
    await window.syncAndRefreshStatsLive(false);

    const { scope, type, monthKey } = window.currentStatsContext;
    const formsList = getFormsForStatsContext(scope, type, monthKey), keys = Object.keys(window.MEMBERS_DATABASE || {});
    window.analyzeParticipantsFromForms(formsList).volunteers.forEach(vol => {
        const vw = window.normalizeNameForMatching(vol.displayName).split(' ').filter(Boolean);
        if (vw.length < 2) return;
        const cands = keys.filter(off => {
            const ow = window.normalizeNameForMatching(off).split(' ').filter(Boolean);
            if (ow.length < 2 || !(vw[0] === ow[0] || (vw[0].length >= 4 && window.getEditDistance(vw[0], ow[0]) <= 1))) return false;
            return vw.slice(1).some(x => x.replace(/^ال/, '').length >= 3 && ow.slice(1).some(y => {
                const a = x.replace(/^ال/, ''), b = y.replace(/^ال/, '');
                return a === b || (a.length >= 4 && b.length >= 4 && window.getEditDistance(a, b) <= 1);
            }));
        });
        if (cands.length === 1) window.SESSION_LEARNED_ALIASES[vol.displayName] = cands[0];
    });

    window.renderParticipationVisuals(formsList);
    const changes = window.lastParticipationStats.auditChanges || [];
    btn.disabled = false;
    box.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;border-bottom:1px dashed rgba(0,180,216,0.3);padding-bottom:6px;">
            <div><strong style="color:#10b981;">✅ اكتمل التدقيق الذكي لكُنى وأسماء الكادر فقط (${changes.length} حالة تصحيح ودمج)</strong><div style="font-size:.75rem;color:var(--text-muted);">🔒 تم التدقيق محلياً 100% داخل الموقع</div></div>
            <button onclick="document.getElementById('aiParticipationInsightBox').classList.add('hidden')" style="background:transparent;border:none;color:var(--error);cursor:pointer;font-weight:bold;">✕ إغلاق</button>
        </div>
        ${!changes.length ? '<div style="padding:10px;text-align:center;color:var(--text-muted);">جميع أسماء الكادر في الاستمارات مكتوبة بصيغتها الرسمية المباشرة.</div>'
        : `<div style="max-height:290px;overflow-y:auto;margin-top:8px;border:1px solid rgba(0,180,216,0.25);border-radius:8px;"><table class="modern-table" style="width:100%;font-size:.82rem;"><thead><tr><th>الاسم/الكنية في الاستمارة</th><th>عضو الكادر الرسمي</th><th>سبب التدقيق</th><th>التكرار</th></tr></thead><tbody>${changes.map(c => `<tr><td style="color:#f59e0b;font-weight:bold;">${c.from}</td><td style="color:#10b981;font-weight:bold;">⬅️ ${c.to}</td><td style="font-size:.77rem;color:var(--text-muted);">${c.reason}</td><td style="font-weight:bold;">${c.count}</td></tr>`).join('')}</tbody></table></div>`}`;
};

window.runAiParticipationReport = async function() {
    const box = $('aiParticipationInsightBox'), btn = $('aiEvaluateParticipationBtn');
    if (!box || !window.lastParticipationStats) return;
    btn.disabled = true; show('aiParticipationInsightBox');
    box.innerHTML = '<div style="color:var(--gold);font-weight:bold;">✨ جاري إجراء التحليل التفاعلي الشامل وإعداد المؤشرات التفصيلية محلياً... ⏳</div>';
    await window.syncAndRefreshStatsLive(false);

    const s = window.lastParticipationStats, total = s.totalForms || 0;
    const kader = s.kader.map(([name, count]) => ({ name, count, pct: total ? Math.round(count / total * 100) : 0 }));
    const active = kader.filter(k => k.count > 0), zero = kader.filter(k => k.count === 0).map(k => k.name);
    const rate = kader.length ? Math.round(active.length / kader.length * 100) : 0;
    const elite = active.filter(k => k.pct >= 50).map(k => `${k.name} (${k.count} - ${k.pct}%)`);
    const mid = active.filter(k => k.pct >= 20 && k.pct < 50).map(k => `${k.name} (${k.count} - ${k.pct}%)`);
    const low = active.filter(k => k.pct < 20).map(k => `${k.name} (${k.count} - ${k.pct}%)`);
    const kSum = kader.reduce((a, b) => a + b.count, 0), vSum = s.volunteers.reduce((a, b) => a + b.count, 0), allSum = kSum + vSum;
    const kShare = allSum ? Math.round(kSum / allSum * 100) : 0, prom = s.volunteers.filter(v => v.count >= 2).slice(0, 10);
    btn.disabled = false;

    box.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;border-bottom:1px dashed rgba(0,180,216,0.3);padding-bottom:6px;">
            <div><strong style="color:var(--gold);font-size:1rem;">🤖 التقرير التحليلي الذكي لمشاركات الكادر والمتطوعين</strong><div style="font-size:.74rem;color:var(--text-muted);">🔒 تحليل خوارزمي محلي 100% داخل المتصفح</div></div>
            <button onclick="document.getElementById('aiParticipationInsightBox').classList.add('hidden')" style="background:transparent;border:none;color:var(--error);cursor:pointer;font-weight:bold;">✕ إغلاق</button>
        </div>
        <div style="display:flex;flex-direction:column;gap:10px;font-size:.87rem;">
            <div style="background:rgba(16,185,129,0.08);border-right:3px solid #10b981;padding:8px 12px;border-radius:6px;"><strong style="color:#10b981;">1. مؤشر التفاعل العام:</strong><br>إجمالي الأنشطة: <strong>(${total} نشاط)</strong> | نسبة التفاعل: <strong>${rate}%</strong> (${active.length} من ${kader.length}).<br>🏆 <strong>الأعلى حضوراً:</strong> ${active.slice(0,5).map(k => `<strong>${k.name}</strong> (${k.count} - ${k.pct}%)`).join('، ') || 'لا يوجد'}.</div>
            <div style="background:rgba(245,158,11,0.08);border-right:3px solid #f59e0b;padding:8px 12px;border-radius:6px;"><strong style="color:#f59e0b;">2. الكادر غير المشارك (0 نشاط):</strong><br>${zero.length ? `يوجد <strong>(${zero.length})</strong> لم تسجل لهم مشاركة: (${zero.join('، ')}) — يُوصى بمتابعتهم.` : '🌟 ممتاز! جميع أعضاء الكادر لديهم مشاركات مسجلة.'}</div>
            <div style="background:rgba(0,180,216,0.08);border-right:3px solid var(--saji-main);padding:8px 12px;border-radius:6px;"><strong style="color:var(--gold);">3. أبرز المتطوعين وتدقيق الكُنى:</strong><br>🌟 ${s.volunteers.slice(0,6).map(v => `<strong>${v.displayName}</strong> (${v.count})`).join('، ') || 'لا يوجد'}.<br>🔄 تم دمج <strong>(${s.auditChanges.length})</strong> صيغة وكنية للكادر.</div>
            <div style="background:rgba(139,92,246,0.08);border-right:3px solid #8b5cf6;padding:9px 12px;border-radius:6px;"><strong style="color:#a78bfa;">4. شرائح الالتزام الميداني:</strong><br>🥇 <strong>الذهبية (50%+) [${elite.length}]:</strong> ${elite.join(' ، ') || 'لا يوجد'}<br>🥈 <strong>الفضية (20%-49%) [${mid.length}]:</strong> ${mid.join(' ، ') || 'لا يوجد'}<br>🥉 <strong>البرونزية (&lt;20%) [${low.length}]:</strong> ${low.join(' ، ') || 'لا يوجد'}</div>
            <div style="background:rgba(14,165,233,0.08);border-right:3px solid #0ea5e9;padding:9px 12px;border-radius:6px;"><strong style="color:#38bdf8;">5. القوة التشغيلية:</strong> إجمالي الحضور ${allSum} (${kSum} كادر + ${vSum} متطوع) | متوسط النشاط: ${total ? (kSum/total).toFixed(1) : 0} كادر و ${total ? (vSum/total).toFixed(1) : 0} متطوع | التغطية: ${kShare}% كادر مقابل ${100-kShare}% متطوع | معدل العضو: ${kader.length ? (kSum/kader.length).toFixed(1) : 0} نشاط.</div>
            <div style="background:rgba(236,72,153,0.08);border-right:3px solid #ec4899;padding:9px 12px;border-radius:6px;"><strong style="color:#f472b6;">6. المتطوعون المرشحون للاستقطاب (مشاركتان فأكثر):</strong><br>${prom.length ? prom.map(pv => `<span style="display:inline-block;margin:3px;background:rgba(236,72,153,0.15);border:1px solid rgba(236,72,153,0.4);padding:2px 8px;border-radius:10px;font-weight:bold;">⭐ ${pv.displayName} (${pv.count})</span>`).join('') : 'معظم المتطوعين شاركوا لمرة واحدة.'}</div>
        </div>`;
};

function buildStatsPdfPage(subScope, bodyHtml, fileName) {
    const isDark = !document.body.classList.contains('light-mode'), ctx = window.currentStatsContext || {};
    const L = getStatsLabels(ctx.type);
    const pageBg = isDark ? '#0B132B' : '#F0F8FF', cardBg = isDark ? '#1C2541' : '#FFFFFF';
    const txt = isDark ? '#FFFFFF' : '#0B132B', gold = isDark ? '#CAF0F8' : '#0077B6', brd = '#00B4D8';
    const mainTitle = L.isScouts
        ? `إحصائيات ${L.orgFullName} (${ctx.scope === 'yearly' ? 'السنوية' : 'الشهرية'})`
        : `${ctx.scope === 'yearly' ? 'الإحصائية السنوية' : 'الإحصائية الشهرية'} لأنشطة ${L.orgFullName}`;

    const html = `<div class="pdf-print-page" style="width:210mm;height:294mm;max-height:294mm;background:${pageBg};color:${txt};padding:12mm;box-sizing:border-box;font-family:'Tajawal','Segoe UI',Arial,sans-serif;direction:rtl;position:relative;margin:0 auto;overflow:hidden;"><div style="position:absolute;inset:4mm;border:2.5px solid ${brd};border-radius:14px;pointer-events:none;z-index:1;"></div><div style="position:relative;z-index:2;height:100%;display:flex;flex-direction:column;justify-content:space-between;"><div><div style="background:${cardBg};border:1.5px solid ${brd};border-radius:12px;padding:12px 18px;display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;"><div><div style="font-size:16px;font-weight:800;color:${gold};">${mainTitle}</div><div style="font-size:13.5px;opacity:.9;margin-top:4px;font-weight:bold;">${subScope}</div></div><img src="${L.logo}" style="width:56px;height:56px;border-radius:10px;border:1.5px solid ${brd};object-fit:cover;"></div>${bodyHtml(cardBg, gold, brd, L)}</div><div style="border-top:1px dashed ${brd};padding-top:8px;display:flex;justify-content:space-between;font-size:12px;font-weight:bold;color:${gold};"><span>بوابة الإدارة المركزية - ${L.orgFullName}</span><span>تاريخ التصدير: ${new Date().toISOString().split('T')[0]}</span></div></div></div>`;
    openFormPdfPreviewHtml(html, fileName);
}

window.downloadInstitutionsStatsPDF = function() {
    const dc = $('formsDoughnutChart'), tc = $('formsTrendChart'), ctx = window.currentStatsContext || {};
    if (!dc) return window.showNotification("⚠️ يرجى الانتظار حتى يكتمل رسم الإحصائية!");
    const L = getStatsLabels(ctx.type), isY = ctx.scope === 'yearly';
    const dImg = dc.toDataURL('image/png', 1), tImg = (isY && tc) ? tc.toDataURL('image/png', 1) : null;
    buildStatsPdfPage(
        `إحصائية ${L.entityPlural} - ${isY ? 'سنة ' : ''}${ctx.monthKey || ''}`,
        (cardBg, gold, brd) => tImg
            ? `<div style="background:${cardBg};border:1.5px solid ${brd};border-radius:14px;padding:14px;margin-bottom:14px;text-align:center;"><div style="color:${gold};font-size:15px;font-weight:bold;margin-bottom:8px;">📊 نسبة الإنجاز ومجموع الأنشطة لكل ${L.entitySingle}</div><img src="${dImg}" style="max-width:100%;max-height:92mm;object-fit:contain;display:block;margin:0 auto;"></div><div style="background:${cardBg};border:1.5px solid ${brd};border-radius:14px;padding:14px;text-align:center;"><div style="color:${gold};font-size:15px;font-weight:bold;margin-bottom:8px;">📈 مقارنة أنشطة ${L.entityPlural} عبر أشهر سنة ${ctx.monthKey}</div><img src="${tImg}" style="max-width:100%;max-height:92mm;object-fit:contain;display:block;margin:0 auto;"></div>`
            : `<div style="background:${cardBg};border:1.5px solid ${brd};border-radius:14px;padding:22px;margin-top:15px;text-align:center;"><div style="color:${gold};font-size:17px;font-weight:bold;margin-bottom:15px;">📊 نسبة الإنجاز ومجموع الأنشطة لكل ${L.entitySingle}</div><img src="${dImg}" style="max-width:100%;max-height:175mm;object-fit:contain;display:block;margin:0 auto;"></div>`,
        `إحصائية_${L.entityPlural}_${L.shortOrg}_${(ctx.monthKey || '').replace(/\s+/g, '_')}.pdf`
    );
};

window.downloadKaderParticipationPDF = function() {
    const kc = $('kaderParticipationChart'), ctx = window.currentStatsContext || {};
    if (!kc) return window.showNotification("⚠️ لا يوجد رسم بياني لمشاركات الكادر حالياً!");
    const L = getStatsLabels(ctx.type), isY = ctx.scope === 'yearly', kImg = kc.toDataURL('image/png', 1);
    buildStatsPdfPage(
        `إحصائية مشاركات ${L.kaderTitle} - ${isY ? 'سنة ' : ''}${ctx.monthKey || ''}`,
        (cardBg, _, brd) => `<div style="background:${cardBg};border:1.5px solid ${brd};border-radius:14px;padding:18px;text-align:center;"><img src="${kImg}" style="max-width:100%;max-height:205mm;object-fit:contain;display:block;margin:0 auto;"></div>`,
        `إحصائية_مشاركات_${L.shortOrg}_${(ctx.monthKey || '').replace(/\s+/g, '_')}.pdf`
    );
};

window.navigateToFormsArchive = function() {
    switchScreen('adminScreen', 'formsCategoryScreen');
    if (window.isFormsFetching) return;
    window.isFormsFetching = true;
    fetch(`${FORMS_API_URL}?t=${Date.now()}`).then(r => r.json()).then(d => {
        window.isFormsFetching = false;
        if (!d.error) { window.allFormsData.tajammu = d.tajammu || []; window.allFormsData.scouts = d.scouts || []; }
    }).catch(() => { window.isFormsFetching = false; });
};

window.navigateToPlanningArchive = function() {
    switchScreen('adminScreen', 'formsMonthsScreen');
    $('formsMonthsTitle').innerText = "أشهر استمارات التخطيط";
    $('formsMonthsBackBtn').onclick = () => switchScreen('formsMonthsScreen', 'adminScreen');
    const c = $('formsMonthsContainer'); c.innerHTML = window.getNiceLoaderHtml("جاري جلب خطط البرامج...");
    fetch(`${PLANNING_API_URL}?t=${Date.now()}`).then(r => r.json()).then(d => {
        if (!d.error && d.planning?.length) { window.allFormsData.planning = d.planning; window.loadFormsFolders('planning'); }
        else c.innerHTML = '<div class="text-center p-15" style="grid-column:1/-1;color:var(--error);">لا توجد استمارات، تأكد من صلاحية الرابط</div>';
    }).catch(() => c.innerHTML = '<div class="text-center p-15" style="grid-column:1/-1;color:var(--error);">فشل الاتصال بجدول التخطيط! ⚠️</div>');
};

window.goBackToAdminFromForms = () => switchScreen('formsCategoryScreen', 'adminScreen');
window.goBackToFormsCategory = () => switchScreen('formsMonthsScreen', 'formsCategoryScreen');
window.goBackToFormsMonths = () => {
    if (window._currentArchiveType !== 'planning' && window._currentArchiveOrg) {
        window._currentArchiveOrg = '';
        return window.renderFormsCapsules(window._currentArchiveMonth, window._currentArchiveType);
    }
    switchScreen('formsListScreen', 'formsMonthsScreen');
    if (window._currentArchiveType !== 'planning' && window._currentArchiveYear) window.openYearMonthsFolders(window._currentArchiveYear, window._currentArchiveType);
};

window.loadFormsFolders = function(type) {
    Object.assign(window, { _currentArchiveType: type, _currentArchiveYear: '', _currentArchiveMonth: '', _currentArchiveOrg: '' });
    const c = $('formsMonthsContainer'); c.innerHTML = '';
    const forms = window.allFormsData[type];

    if (type === 'planning') {
        $('formsMonthsTitle').innerText = "أشهر استمارات التخطيط";
        $('formsMonthsBackBtn').onclick = () => switchScreen('formsMonthsScreen', 'adminScreen');
        if (!forms?.length) return c.innerHTML = '<div class="text-center p-15" style="grid-column:1/-1;">لا توجد استمارات مؤرشفة في هذا القسم حتى الآن.</div>';
        window.rebuildCurrentFormsGroups(type);
        Object.keys(window.currentFormsGroups).sort((a, b) => {
            if (a === "غير مصنف") return 1; if (b === "غير مصنف") return -1;
            const [mA, yA] = a.replace('شهر ', '').split(' - ').map(Number), [mB, yB] = b.replace('شهر ', '').split(' - ').map(Number);
            return yA !== yB ? yB - yA : mB - mA;
        }).forEach(mk => {
            const b = document.createElement('button'); b.className = 'panel-card square-btn saji-hover-card';
            b.innerHTML = `<div class="card-icon">📁</div><h3 style="direction:ltr;">${mk}</h3>`;
            b.onclick = () => window.renderFormsCapsules(mk, type); c.appendChild(b);
        });
        return;
    }

    hide('formsCategoryScreen'); hide('formsListScreen'); show('formsMonthsScreen');
    $('formsMonthsTitle').innerText = type === 'tajammu' ? "سنوات استمارات التجمع" : "سنوات استمارات جمعية كشافة الإمام الحسين (ع)";
    $('formsMonthsBackBtn').onclick = window.goBackToFormsCategory;

    if (!forms?.length) {
        c.innerHTML = window.getNiceLoaderHtml("جاري تحضير مجلدات السنوات...");
        return fetch(`${FORMS_API_URL}?t=${Date.now()}`).then(r => r.json()).then(d => {
            if (!d.error) {
                window.allFormsData.tajammu = d.tajammu || []; window.allFormsData.scouts = d.scouts || [];
                window.allFormsData[type]?.length ? window.loadFormsFolders(type) : c.innerHTML = '<div class="text-center p-15" style="grid-column:1/-1;">لا توجد استمارات مؤرشفة في هذا القسم حتى الآن.</div>';
            }
        }).catch(() => c.innerHTML = '<div class="text-center p-15" style="grid-column:1/-1;color:var(--error);">فشل الاتصال بقاعدة البيانات! ⚠️</div>');
    }

    window.rebuildCurrentFormsGroups(type);
    Object.keys(window._yearsFormsMap).sort((a, b) => a === "غير مصنف" ? 1 : b === "غير مصنف" ? -1 : parseInt(b) - parseInt(a)).forEach(yk => {
        const ms = window._yearsFormsMap[yk] || [], total = ms.reduce((a, mk) => a + (window.currentFormsGroups[mk]?.length || 0), 0);
        const b = document.createElement('button'); b.className = 'panel-card square-btn saji-hover-card';
        b.innerHTML = `<div class="card-icon">🗂️</div><div class="card-text-container"><h3>${yk === "غير مصنف" ? yk : "سنة " + yk}</h3><p class="service-desc">${ms.length} أشهر | ${total} استمارة</p></div>`;
        b.onclick = () => window.openYearMonthsFolders(yk, type); c.appendChild(b);
    });
};

window.openYearMonthsFolders = function(yk, type) {
    Object.assign(window, { _currentArchiveType: type, _currentArchiveYear: yk, _currentArchiveMonth: '', _currentArchiveOrg: '' });
    switchScreen('formsListScreen', 'formsMonthsScreen');
    const L = getStatsLabels(type);
    $('formsMonthsTitle').innerText = `أشهر ${yk === "غير مصنف" ? yk : "سنة " + yk} (${L.shortOrg})`;
    $('formsMonthsBackBtn').onclick = () => window.loadFormsFolders(type);
    const c = $('formsMonthsContainer');
    const statsBtnTxt = L.isScouts ? `📊 إحصائيات جمعية كشافة الإمام الحسين (ع) - سنة ${yk}` : `📊 الإحصائية السنوية لسنة ${yk} وتقييم المشاركات`;
    c.innerHTML = yk !== "غير مصنف" ? `<div style="grid-column:1/-1;text-align:center;margin-bottom:15px;"><button class="pill-action-btn" style="background:linear-gradient(135deg,var(--saji-main),var(--gold));color:#fff;padding:10px 25px;border:none;" onclick="window.openFormsStatsScreen('yearly','${type}','${yk}')">${statsBtnTxt}</button></div>` : '';
    (window._yearsFormsMap[yk] || []).slice().sort((a, b) => a === "غير مصنف" ? 1 : b === "غير مصنف" ? -1 : parseInt(b.replace('شهر ', '')) - parseInt(a.replace('شهر ', ''))).forEach(mk => {
        const b = document.createElement('button'); b.className = 'panel-card square-btn saji-hover-card';
        b.innerHTML = `<div class="card-icon">📁</div><div class="card-text-container"><h3 style="direction:ltr;">${mk}</h3><p class="service-desc">${(window.currentFormsGroups[mk] || []).length} استمارة نشاط</p></div>`;
        b.onclick = () => window.renderFormsCapsules(mk, type); c.appendChild(b);
    });
};

window.renderFormsCapsules = function(mk, type) {
    Object.assign(window, { _currentArchiveType: type, _currentArchiveMonth: mk, _currentArchiveOrg: '' });
    switchScreen('formsMonthsScreen', 'formsListScreen');
    $('monthActionContainer').innerHTML = '';
    const c = $('formsCapsulesContainer'), data = window.currentFormsGroups[mk] || []; c.className = "mt-10";

    if (type === 'planning') {
        $('formsListTitle').innerText = "تفاصيل الشهر";
        const caps = data.map(x => `<button class="panel-btn saji-hover-card" style="border-radius:50px;padding:8px 10px;display:flex;flex-direction:column;align-items:center;" onclick="window.openFormTextModal('planning',${x.originalIndex},'${x.cleanDate}')"><strong style="font-size:.9rem;">خطة برامج</strong><span style="font-size:.85rem;color:var(--gold);margin-top:5px;font-weight:bold;">${x.cleanDate}</span></button>`).join('');
        return c.innerHTML = `<div class="open-folder-container"><div class="open-folder-header"><div class="folder-tab">📂 أنشطة ${mk}</div></div><div class="open-folder-body"><div style="text-align:center;margin-bottom:20px;"><button class="pill-action-btn" style="background:linear-gradient(135deg,var(--saji-main),var(--gold));color:#fff;padding:10px 25px;border:none;min-width:250px;" onclick="window.generateMonthFormsPDF('${mk}','planning')">📄 تحميل أرشيف الشهر بالكامل</button></div><div class="names-square-grid" style="margin:0;padding:0;width:100%;">${caps}</div></div></div>`;
    }

    const L = getStatsLabels(type);
    $('formsListTitle').innerText = `${L.entityPlural} ${mk}`;
    const orgs = {};
    data.forEach(x => (orgs[window.getFormOrgOrTeamName(x.form, type)] ||= []).push(x));
    const mStatsTxt = L.isScouts ? `📊 إحصائيات جمعية كشافة الإمام الحسين (ع) - ${mk}` : '📊 إحصائيات هذا الشهر وتقييم المشاركات';
    c.innerHTML = `<div class="open-folder-container"><div class="open-folder-header"><div class="folder-tab">📂 فايلات ${mk}</div></div><div class="open-folder-body"><div class="text-center mb-15 mt-10"><button class="pill-action-btn" style="background:linear-gradient(135deg,var(--saji-main),#1C2541);color:#fff;padding:8px 20px;border:none;" onclick="window.openFormsStatsScreen('monthly','${type}','${mk}')">${mStatsTxt}</button></div><div style="text-align:center;margin-bottom:22px;"><button class="pill-action-btn" style="background:linear-gradient(135deg,var(--saji-main),var(--gold));color:#fff;padding:10px 25px;border:none;min-width:260px;" onclick="window.generateMonthFormsPDF('${mk}','${type}')">📄 تحميل جميع استمارات ${L.entityPlural}</button></div><div class="square-panel-grid" id="monthOrgsFoldersGrid" style="margin:0;padding:0;width:100%;"></div></div></div>`;

    Object.keys(orgs).sort((a, b) => orgs[b].length - orgs[a].length).forEach(org => {
        const b = document.createElement('button'); b.className = 'panel-card square-btn saji-hover-card';
        b.innerHTML = `<div class="card-icon">📁</div><div class="card-text-container"><h3>${org}</h3><p class="service-desc">${orgs[org].length} استمارة موثقة</p></div>`;
        b.onclick = () => window.openOrgFormsFolder(mk, type, org);
        $('monthOrgsFoldersGrid').appendChild(b);
    });
};

window.openOrgFormsFolder = function(mk, type, org) {
    Object.assign(window, { _currentArchiveType: type, _currentArchiveMonth: mk, _currentArchiveOrg: org });
    const L = getStatsLabels(type);
    $('formsListTitle').innerText = org;
    const list = (window.currentFormsGroups[mk] || []).filter(x => window.getFormOrgOrTeamName(x.form, type) === org);
    $('formsCapsulesContainer').innerHTML = `<div class="open-folder-container"><div class="open-folder-header"><div class="folder-tab">📂 ${org} (${mk})</div></div><div class="open-folder-body"><div style="text-align:center;margin-bottom:20px;" id="orgOnlyDownloadWrap"></div><div class="names-square-grid" id="orgCapsulesGrid" style="margin:0;padding:0;width:100%;"></div></div></div>`;
    const dl = document.createElement('button'); dl.className = 'pill-action-btn';
    dl.style.cssText = 'background:linear-gradient(135deg,var(--saji-main),var(--gold));color:#fff;padding:10px 25px;border:none;min-width:260px;';
    dl.innerHTML = `📄 تحميل جميع استمارات ${L.entityDefSingle} فقط (${list.length})`;
    dl.onclick = () => window.generateOrgMonthFormsPDF(mk, type, org);
    $('orgOnlyDownloadWrap').appendChild(dl);
    list.forEach(x => {
        const b = document.createElement('button'); b.className = 'panel-btn saji-hover-card';
        b.style.cssText = 'border-radius:50px;padding:8px 10px;display:flex;flex-direction:column;align-items:center;';
        b.innerHTML = `<strong style="font-size:.9rem;">استمارة نشاط</strong><span style="font-size:.85rem;color:var(--gold);margin-top:5px;font-weight:bold;">${x.cleanDate}</span>`;
        b.onclick = () => window.openFormTextModal(type, x.originalIndex, x.cleanDate);
        $('orgCapsulesGrid').appendChild(b);
    });
};

window.openFormTextModal = function(type, index, dateVal) {
    window.currentFormView = { type, index };
    const f = window.allFormsData[type][index];
    $('formModalTitle').innerHTML = `معاينة رقمية<br><span style="font-size:.9rem;color:var(--text-muted);">(${dateVal})</span>`;
    let html = "";
    if (type === 'planning') {
        html = `<div style="margin-bottom:8px;border-bottom:1px solid rgba(0,180,216,0.2);padding-bottom:5px;"><strong style="color:var(--gold);">المؤسسة:</strong> ${f.institution}<br><strong style="color:var(--gold);">شهر:</strong> ${f.month} | <strong style="color:var(--gold);">سنة:</strong> ${f.year}</div>` +
            (f.programs?.length ? f.programs.map((p, i) => `<div style="margin-top:15px;background:rgba(0,0,0,0.1);padding:10px;border-radius:8px;border:1px solid var(--saji-main);"><strong style="color:var(--gold);font-size:1.1rem;">برنامج ${i+1}: ${p.name}</strong><div style="font-size:.9rem;margin-top:5px;">نوعه: ${p.type} | تكلفته: ${p.cost}</div><div style="font-size:.9rem;">المستهدفين: ${p.targets} | المشاركين: ${p.participants}</div><div style="font-size:.9rem;border-top:1px dashed #ccc;padding-top:5px;margin-top:5px;">المكان: ${p.location} | التاريخ: ${p.date}</div></div>`).join('') : '<div class="text-center">لا توجد برامج مضافة</div>');
    } else {
        for (let k in f) {
            if (/(url|رابط|صورة|ملف|publisher|increment|edit|doc|pdf|Timestamp|طابع زمني)/i.test(k)) continue;
            const rawV = String(f[k] ?? '').trim();
            const v = (!rawV || rawV === "لا يوجد" || rawV === "لايوجد") ? "" : rawV.replace(/\n/g, '<br>');
            html += `<div style="margin-bottom:8px;border-bottom:1px solid rgba(0,180,216,0.2);padding-bottom:5px;"><strong style="color:var(--gold);">${k}:</strong> <div style="direction:rtl;display:inline;line-height:1.6;">${v}</div></div>`;
        }
    }
    $('formModalTextContent').innerHTML = html; show('formTextModal');
};
window.closeFormTextModal = () => hide('formTextModal');
window.closeFormPdfModal = () => hide('formPdfModal');

// ==================== 11. قوالب PDF وتصديرها والنسخ ====================
window.buildPlanningFormPageHtml = function(form) {
    const tc = '#0B132B', progs = form.programs || [];
    if (!progs.length) return '';
    let pages = '';
    for (let i = 0; i < progs.length; i += 4) {
        const chunk = progs.slice(i, i + 4), isFirst = i === 0, isLast = i + 4 >= progs.length;
        const head = isFirst
            ? `<table style="width:100%;border:none;margin-bottom:10px;border-bottom:2px solid ${tc};padding-bottom:8px;"><tr><td style="width:35%;font-weight:bold;line-height:1.4;"><div style="font-size:15px;">تجمع شباب الشريعة</div><div style="font-size:13px;">مديرية البصرة</div><div style="font-size:13px;">قسم التخطيط والبرامج</div></td><td style="width:30%;text-align:center;"><img src="${LOGO_TAJAMMU}" style="height:65px;border-radius:6px;border:1.5px solid ${tc};padding:2px;"></td><td style="width:35%;text-align:left;"><div style="font-size:14px;font-weight:bold;color:${tc};">${form.institution}</div><div style="font-size:12px;font-weight:bold;color:#444;">شهر ${form.month} &nbsp; سنة ${form.year}</div></td></tr></table>`
            : `<div style="color:${tc};font-weight:bold;border-bottom:1px solid #ccc;padding-bottom:5px;margin-bottom:15px;font-size:12px;">تابع خطط وبرامج: ${form.institution} - شهر ${form.month} / سنة ${form.year}</div>`;
        const body = chunk.map((p, idx) => `<div style="margin-bottom:8px;border:1.5px solid ${tc};border-radius:6px;overflow:hidden;background:#fff;"><div style="background:${tc};color:#fff;padding:4px 10px;font-size:12px;font-weight:bold;">برنامج ${i + idx + 1}: ${p.name}</div><div style="padding:4px 8px;"><table style="width:100%;border-collapse:collapse;text-align:center;font-size:11px;margin-bottom:4px;"><tr><th style="border:1px solid #ddd;padding:4px;background:#f0f8ff;color:${tc};width:13%;">النوع</th><th style="border:1px solid #ddd;padding:4px;background:#f0f8ff;color:${tc};width:13%;">التكلفة</th><th style="border:1px solid #ddd;padding:4px;background:#f0f8ff;color:${tc};width:48%;">الفقرات</th><th style="border:1px solid #ddd;padding:4px;background:#f0f8ff;color:${tc};width:13%;">المستهدفين</th><th style="border:1px solid #ddd;padding:4px;background:#f0f8ff;color:${tc};width:13%;">المشاركين</th></tr><tr><td style="border:1px solid #ddd;padding:4px;font-weight:600;">${p.type}</td><td style="border:1px solid #ddd;padding:4px;font-weight:600;">${p.cost}</td><td style="border:1px solid #ddd;padding:4px;text-align:right;">${p.items}</td><td style="border:1px solid #ddd;padding:4px;font-weight:600;">${p.targets}</td><td style="border:1px solid #ddd;padding:4px;font-weight:600;">${p.participants}</td></tr></table><div style="font-size:11px;margin-bottom:4px;padding:4px;background:#fafafa;border:1px solid #eee;border-radius:4px;"><strong style="color:${tc};">تفاصيل البرنامج:</strong> ${p.details}</div><div style="display:flex;justify-content:space-between;font-size:11px;background:#f5f5f5;padding:4px 6px;border-radius:4px;border:1px solid #eee;"><div><strong style="color:${tc};">📅 التاريخ:</strong> ${p.date}</div><div><strong style="color:${tc};">📍 المكان:</strong> ${p.location}</div></div></div></div>`).join('');
        const foot = isLast ? `<div style="position:absolute;bottom:12mm;left:12mm;right:12mm;border-top:1.5px dashed ${tc};padding-top:8px;display:flex;justify-content:space-between;font-size:13px;font-weight:bold;text-align:center;z-index:2;"><div style="width:45%;"><div>مدير المؤسسة</div><div style="margin-top:20px;color:${tc};font-size:14px;">${form.director}</div></div><div style="width:45%;"><div>مدير قسم التخطيط والبرامج</div><div style="margin-top:20px;color:${tc};font-size:14px;">وليد خالد الحيدري</div></div></div>` : '';
        pages += `<div class="pdf-print-page" style="width:210mm;height:294mm;max-height:294mm;box-sizing:border-box;font-family:Arial,sans-serif;direction:rtl;margin:0 auto;color:#333;background:#fff;position:relative;padding:12mm;overflow:hidden;"><div style="position:absolute;inset:4mm;border:3px solid ${tc};border-radius:12px;pointer-events:none;"></div><div style="position:absolute;inset:5.5mm;border:1px solid ${tc};border-radius:9px;pointer-events:none;"></div><div style="position:relative;z-index:2;">${head}${body}</div>${foot}</div>`;
    }
    return pages;
};

window.buildFormPageHtml = function(form, type) {
    if (type === 'planning') return window.buildPlanningFormPageHtml(form);
    const isT = type === 'tajammu', tc = isT ? '#0B132B' : '#0077B6', logo = isT ? LOGO_TAJAMMU : LOGO_SCOUTS;
    const headTxt = isT ? '<div style="font-size:16px;font-weight:bold;">تجمع شباب الشريعة</div><div style="font-size:14px;">مديرية البصرة</div>' : '<div style="font-size:15px;font-weight:bold;">جمعية كشافة الامام الحسين (ع)</div><div style="font-size:13px;">مفوضية البصرة</div>';
    let items = '';
    for (let k in form) {
        if (/(url|رابط|صورة|ملف|publisher|increment|edit|doc|pdf|Timestamp|طابع زمني)/i.test(k)) continue;
        const rawV = String(form[k] ?? '').trim();
        let val = (!rawV || rawV === "لا يوجد" || rawV === "لايوجد") ? "" : rawV;
        const full = /(اسماء|أسماء)/.test(k);
        let fs = "13px", lh = "1.8", pd = "10px 15px";
        if (full) {
            const arr = val.split(/[\r\n,،]+/).map(n => n.trim()).filter(Boolean);
            if (arr.length > 70) { fs = "9.5px"; lh = "1.4"; pd = "6px 10px"; }
            else if (arr.length > 40) { fs = "10.5px"; lh = "1.5"; pd = "8px 12px"; }
            else if (arr.length > 20) { fs = "12px"; lh = "1.6"; pd = "8px 12px"; }
            if (arr.length) val = arr.map(n => `<span style="display:inline-block;white-space:nowrap;margin-left:12px;">${n}</span>`).join('');
        } else val = val.replace(/\n/g, '<br>');
        items += `<div style="width:${full ? '100%' : 'calc(50% - 7.5px)'};display:flex;border:1.5px solid ${tc};border-radius:8px;overflow:hidden;box-sizing:border-box;background:#fff;margin-bottom:12px;"><div style="width:${full ? '20%' : '35%'};background:${tc};color:#fff;padding:${pd};font-weight:bold;font-size:${fs};display:flex;align-items:center;box-sizing:border-box;">${k}</div><div style="width:${full ? '80%' : '65%'};padding:${pd};font-size:${fs};color:#222;font-weight:bold;line-height:${lh};display:flex;align-items:center;flex-wrap:wrap;box-sizing:border-box;">${val}</div></div>`;
    }
    return `<div class="pdf-print-page" style="width:210mm;height:294mm;max-height:294mm;background:#fff;padding:15mm 15mm 35mm;box-sizing:border-box;font-family:Arial,sans-serif;direction:rtl;position:relative;margin:0 auto;color:#333;overflow:hidden;"><div style="position:absolute;inset:5mm;border:3px solid ${tc};border-radius:15px;pointer-events:none;"></div><div style="position:absolute;inset:7mm;border:1px solid ${tc};border-radius:10px;pointer-events:none;"></div><div style="position:relative;z-index:2;"><table style="width:100%;border:none;margin-bottom:20px;border-bottom:2px solid ${tc};padding-bottom:15px;"><tr><td style="width:33%;text-align:right;">${headTxt}</td><td style="width:34%;text-align:center;"><div style="display:inline-block;border:2px solid ${tc};border-radius:25px;padding:6px 18px;color:${tc};font-weight:bold;font-size:17px;">${isT ? 'استمارة نشاطات التجمع' : 'استمارة نشاطات الكشافة'}</div></td><td style="width:33%;text-align:left;"><img src="${logo}" style="height:70px;border-radius:8px;border:1px solid #eee;"></td></tr></table><div style="display:flex;flex-wrap:wrap;gap:12px;">${items}</div></div><div style="position:absolute;bottom:12mm;left:15mm;right:15mm;border-top:1px solid #ccc;padding-top:12px;font-weight:bold;text-align:center;display:flex;justify-content:space-between;z-index:2;"><div style="width:33%;font-size:14px;">علي العواجي<br><span style="font-size:12px;font-weight:normal;color:#666;">مسؤول لجنة المتابعة</span></div><div style="width:33%;font-size:14px;">محمد بشير<br><span style="font-size:12px;font-weight:normal;color:#666;">مدير قسم الموارد البشرية</span></div><div style="width:33%;font-size:14px;">حسن فاضل<br><span style="font-size:12px;font-weight:normal;color:#666;">مدير قسم الاعلام</span></div></div></div>`;
};

function openFormPdfPreviewHtml(html, filename) {
    const area = $('formPdfContentArea');
    if (area) { area.innerHTML = `<div id="printableFormArea" style="background:transparent;direction:ltr;margin:0 auto;width:210mm;">${html}</div>`; area.scrollTop = 0; }
    show('formPdfModal'); window.currentPdfFileName = filename;
}

function sanitizePdfFileName(name) {
    return String(name || '')
        .replace(/[\\/:*?"<>|]+/g, '-')
        .replace(/\s+/g, ' ')
        .trim();
}

window.generateFormPDF = () => {
    window.closeFormTextModal();
    const { type, index } = window.currentFormView;
    const form = window.allFormsData[type]?.[index];
    if (!form) return;

    let fileName;
    if (type === 'tajammu' || type === 'scouts') {
        const entityName = window.getFormOrgOrTeamName(form, type);
        const contentDate = extractFormDate(form, type, false);
        fileName = `${sanitizePdfFileName(`استمارة ${entityName} ${contentDate}`)}.pdf`;
    } else {
        const inst = form.institution || 'خطة برامج';
        const period = [form.month, form.year].filter(Boolean).join(' ');
        fileName = `${sanitizePdfFileName(`استمارة ${inst} ${period || Date.now()}`)}.pdf`;
    }

    openFormPdfPreviewHtml(window.buildFormPageHtml(form, type), fileName);
};

window.generateMonthFormsPDF = (mk, type) => {
    const list = window.currentFormsGroups[mk];
    if (!list?.length) return window.showNotification("⚠️ لا توجد استمارات في هذا الشهر لتحميلها!");
    const tName = type === 'tajammu' ? 'التجمع' : type === 'scouts' ? 'الكشافة' : 'التخطيط';
    openFormPdfPreviewHtml(list.map(x => window.buildFormPageHtml(x.form || x, type)).join(''), `أرشيف_${mk.replace(/\s+/g, '_')}_${tName}_${Date.now()}.pdf`);
};

window.generateOrgMonthFormsPDF = (mk, type, org) => {
    const L = getStatsLabels(type);
    const list = (window.currentFormsGroups[mk] || []).filter(x => window.getFormOrgOrTeamName(x.form, type) === org);
    if (!list.length) return window.showNotification(`⚠️ لا توجد استمارات لهذه ${L.entitySingle} في هذا الشهر!`);
    openFormPdfPreviewHtml(list.map(x => window.buildFormPageHtml(x.form || x, type)).join(''), `استمارات_${org.replace(/\s+/g, '_')}_${mk.replace(/\s+/g, '_')}.pdf`);
};

function exportPdfPages(areaId, scrollId, pageSel, filename, onClose) {
    const el = $(areaId); if (!el) return;
    clearSilentDownloadIframes();
    if ($(scrollId)) $(scrollId).scrollTop = 0;
    const opt = {
        margin: 0, filename, image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 3, useCORS: true, scrollY: 0, scrollX: 0, logging: false, ignoreElements: node => node.tagName === 'IFRAME' },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    window.showProgressBar("جاري التحميل...");
    setTimeout(async () => {
        try {
            const pages = el.querySelectorAll(pageSel);
            if (pages.length) {
                let w = html2pdf().set(opt).from(pages[0]).toPdf();
                window.updateProgressBar(Math.round(100 / pages.length));
                for (let i = 1; i < pages.length; i++) {
                    w = w.get('pdf').then(pdf => { pdf.addPage(); window.updateProgressBar(Math.round((i + 1) / pages.length * 100)); }).from(pages[i]).toContainer().toCanvas().toPdf();
                }
                await w.save();
            } else { window.updateProgressBar(50); await html2pdf().set(opt).from(el).save(); window.updateProgressBar(100); }
            setTimeout(() => { window.hideProgressBar(); onClose(); window.showNotification("تم تحميل الملف بنجاح ✅"); }, 500);
        } catch (e) { console.error(e); window.hideProgressBar(); window.showNotification("حدث خطأ أثناء التنزيل ⚠️"); }
    }, 400);
}
window.executeFormPdfDownload = () => exportPdfPages('printableFormArea', 'formPdfContentArea', '.pdf-print-page', window.currentPdfFileName, window.closeFormPdfModal);

function copyTextUniversal(text, onDone) {
    const fallback = () => {
        const ta = document.createElement("textarea"); ta.value = text; ta.style.cssText = "position:fixed;top:0;left:0;opacity:0;";
        document.body.appendChild(ta); ta.focus(); ta.select(); ta.setSelectionRange(0, 999999);
        try { document.execCommand('copy'); } catch {} document.body.removeChild(ta); onDone();
    };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(onDone).catch(fallback);
    else fallback();
}

window.copyAiText = (btn, enc) => copyTextUniversal(decodeURIComponent(enc), () => {
    const orig = btn.innerHTML; btn.innerHTML = '✅ تم النسخ'; setTimeout(() => btn.innerHTML = orig, 2000);
    window.showNotification("تم نسخ النص بنجاح 📋");
});

window.formatMemberDataAsText = function(alias) {
    let u = window.MEMBERS_DATABASE[alias];
    if (!u && alias) {
        const t = String(alias).trim();
        u = Object.values(window.MEMBERS_DATABASE).find(m => String(m.fullName).trim() === t);
    }
    if (!u) return "";
    const sec = (title, list) => !list?.length ? "" : `[ ${title} ]\n` + list.map(i => i.label ? `- ${i.label}: ${(i.label === "أسماء الأبناء" || i.label === "الأبناء") ? window.cleanChildrenNames(i.val) : i.val}` : `- ${i.title} | الكتاب: ${i.doc || 'لا يوجد'} | التاريخ: ${i.date || 'لا يوجد'}`).join('\n') + "\n\n";
    return `==============================\nالاسم الكامل: ${u.fullName}\n==============================\n\n` + sec("المعلومات الأساسية", u.basic) + sec("الدورات والمهارات", u.skills) + sec("معلومات السكن", u.housing) + sec("العمل والمسؤوليات", u.work) + sec("السجل الانضباطي", u.punishments) + sec("كتب الشكر والتقدير", u.awards);
};

window.copyMemberInfo = function() {
    let txt = window.formatMemberDataAsText(window.currentActiveAlias || $('profileFullName')?.innerText?.trim());
    if (!txt) {
        const name = $('profileFullName')?.innerText, pills = document.querySelectorAll('#primaryDetailsContainer .inset-pill');
        if (name && pills.length) txt = `==============================\nالاسم الكامل: ${name}\n==============================\n\n[ المعلومات الأساسية ]\n` + Array.from(pills).map(p => `- ${p.querySelector('.label')?.innerText}: ${p.querySelector('.value')?.innerText}`).join('\n');
    }
    if (!txt) return window.showNotification("⚠️ تعذر العثور على بيانات لنسخها!");
    copyTextUniversal(txt, () => window.showNotification("تم نسخ معلومات العضو بنجاح 📋✅"));
};

window.buildNameBoxesHtml = function(fullName) {
    const p = fullName.replace(/(عبد|ابو|أبو) /g, "$1_").split(/\s+/).map(x => x.replace(/_/g, " "));
    let [first="-", father="-", g1="-", g2="-", sur] = [p[0], p[1], p[2], p[3], p.slice(4).join(" ")];
    if (p.length === 4) { sur = p[3]; g2 = "-"; } else if (p.length === 3) { sur = p[2]; g1 = g2 = "-"; } else if (p.length === 2) { sur = p[1]; father = g1 = g2 = "-"; }
    return `<div style="display:flex;justify-content:space-between;gap:8px;margin-bottom:15px;direction:rtl;">${[['الاسم الأول',first],['اسم الأب',father],['الجد الأول',g1],['الجد الثاني',g2],['اللقب',sur||'-']].map(([l,v]) => `<div style="flex:1;border:1px solid #d3c4b1;border-radius:6px;overflow:hidden;text-align:center;background:#fff;"><div style="background:#e8dcc8;color:#5a3a22;font-size:11px;padding:5px;font-weight:bold;">${l}</div><div style="color:#333;font-size:13px;font-weight:bold;padding:8px;">${v}</div></div>`).join('')}</div>`;
};

window.openPdfPreview = function() {
    if (!window.currentActiveAlias) return;
    const u = window.MEMBERS_DATABASE[window.currentActiveAlias], tc = '#0B132B';
    const frame = 'width:210mm;height:294mm;max-height:294mm;background:#fff;padding:15mm;box-sizing:border-box;font-family:Arial,sans-serif;direction:rtl;position:relative;overflow:hidden;margin:0 auto;color:#333;';
    const borders = `<div style="position:absolute;inset:5mm;border:3px solid ${tc};border-radius:15px;pointer-events:none;"></div><div style="position:absolute;inset:7mm;border:1px solid ${tc};border-radius:10px;pointer-events:none;"></div>`;
    const grid = (title, list, extra = '') => !list?.length ? "" : `<div style="margin-bottom:20px;"><div style="background:${tc};color:#fff;padding:6px 15px;font-weight:bold;border-radius:6px;margin-bottom:12px;font-size:14px;display:inline-block;">${title}</div>${extra}<div style="display:flex;flex-wrap:wrap;gap:12px;">${list.map(i => `<div style="width:calc(50% - 6px);background:#fdfaf7;padding:10px;border:1px solid #e0d5c1;border-radius:6px;font-size:13px;display:flex;align-items:center;box-sizing:border-box;"><strong style="color:${tc};margin-left:8px;white-space:nowrap;">${i.label}:</strong><span style="font-weight:bold;color:#222;">${(i.label === "أسماء الأبناء" || i.label === "الأبناء") ? window.cleanChildrenNames(i.val) : i.val}</span></div>`).join('')}</div></div>`;
    const tbl = (title, list) => !list?.length ? "" : `<div style="margin-bottom:20px;"><div style="background:${tc};color:#fff;padding:6px 15px;font-weight:bold;border-radius:6px;margin-bottom:12px;font-size:14px;display:inline-block;">${title}</div><table style="width:100%;border-collapse:collapse;font-size:13px;text-align:center;"><thead><tr>${['النوع','رقم الكتاب','التاريخ'].map(h => `<th style="background:#f4eee6;color:${tc};border:1px solid #c4b5a2;padding:10px;">${h}</th>`).join('')}</tr></thead><tbody>${list.map(i => `<tr><td style="border:1px solid #c4b5a2;padding:10px;">${i.title||'-'}</td><td style="border:1px solid #c4b5a2;padding:10px;">${i.doc||'-'}</td><td style="border:1px solid #c4b5a2;padding:10px;">${i.date||'-'}</td></tr>`).join('')}</tbody></table></div>`;
    const skills = [];
    u.skills.forEach(s => {
        if (s.label === "دورة عسكرية" || s.label === "عسكرية") {
            const v = String(s.val), nm = v.match(/\d+/);
            skills.push({ label: "دورة عسكرية", val: v.includes("نعم") ? "نعم" : "كلا" });
            if (v.includes("نعم") && nm) skills.push({ label: "عدد الدورات", val: nm[0] });
        } else skills.push(s);
    });
    const p1 = `<div class="pdf-profile-page" style="${frame}">${borders}<div style="position:relative;z-index:2;padding:5mm;"><table style="width:100%;border:none;margin-bottom:20px;border-bottom:2px solid ${tc};padding-bottom:10px;"><tr><td style="width:33%;"><div style="font-size:16px;font-weight:bold;">تجمع شباب الشريعة</div><div style="font-size:14px;">مديرية البصرة</div></td><td style="width:34%;text-align:center;"><div style="display:inline-block;border:2px solid ${tc};border-radius:25px;padding:6px 18px;color:${tc};font-weight:bold;font-size:17px;">معلومات الملف الشخصي</div></td><td style="width:33%;text-align:left;"><img src="${window.parseImageUrl(u.avatar)}" style="height:80px;width:80px;border-radius:8px;object-fit:cover;border:2px solid ${tc};"></td></tr></table>${grid("المعلومات الأساسية", u.basic, window.buildNameBoxesHtml(u.fullName))}${grid("معلومات السكن", u.housing)}</div></div>`;
    const p2 = `<div class="pdf-profile-page" style="${frame}">${borders}<div style="position:relative;z-index:2;padding:5mm 5mm 20mm;">${grid("الدورات والمهارات", skills)}${tbl("العمل والمسؤوليات", u.work)}${tbl("كتب الشكر والتقدير", u.awards)}${tbl("السجل الانضباطي", u.punishments)}</div><div style="position:absolute;bottom:15mm;left:15mm;right:15mm;border-top:2px dashed ${tc};padding-top:10px;font-size:14px;z-index:3;"><strong>مسؤول الموارد :</strong> <span style="font-weight:bold;">محمد بشير الحلفي</span></div></div>`;
    $('pdfContentArea').innerHTML = `<div id="printableProfileArea" style="background:transparent;direction:ltr;margin:0 auto;width:210mm;">${p1}${p2}</div>`;
    show('pdfPreviewModal');
};
window.closePdfPreview = () => hide('pdfPreviewModal');
window.executePdfDownload = () => {
    const u = window.MEMBERS_DATABASE[window.currentActiveAlias];
    exportPdfPages('printableProfileArea', 'pdfContentArea', '.pdf-profile-page', `ملف_معلومات_${u.fullName.replace(/\s+/g, '_')}.pdf`, window.closePdfPreview);
};

// ==================== 12. المساعد الذكي (Gemini بملء الشاشة + الصور) ====================
window.openCustomConfirm = () => show('customConfirmModal');
window.closeCustomConfirm = () => hide('customConfirmModal');
window.executeClearChat = () => { window.aiSessions = []; window.createNewAiSession(true); hide('customConfirmModal'); window.showNotification("تم مسح الدردشات 🗑️"); };

window.initAiSessionsData = function() {
    try {
        const saved = localStorage.getItem('tajammu_ai_sessions_v2');
        if (saved) window.aiSessions = JSON.parse(saved) || [];
        else {
            const old = JSON.parse(localStorage.getItem('tajammu_ai_chat') || '[]');
            if (old.length) {
                window.aiSessions = [{ id: 'session_' + Date.now(), title: 'محادثة سابقة', messages: old.map((m, i) => ({ id: `msg_old_${i}_${Date.now()}`, role: m.role === 'user' ? 'user' : 'ai', text: m.text, rawText: m.copyRaw ? decodeURIComponent(m.copyRaw) : m.text.replace(/<br>/g, '\n').replace(/<[^>]*>/g, ''), time: 'سابقاً' })) }];
                window.saveAiSessionsData();
            }
        }
    } catch { window.aiSessions = []; }
    if (!window.aiSessions.length) window.createNewAiSession(false);
    else if (!window.aiSessions.some(s => s.id === window.currentAiSessionId)) window.currentAiSessionId = window.aiSessions[0].id;
};
window.saveAiSessionsData = () => { try { localStorage.setItem('tajammu_ai_sessions_v2', JSON.stringify(window.aiSessions)); } catch {} };

window.ensureGeminiScreenBuilt = function() {
    if ($('geminiFullScreen')) return;
    const st = document.createElement('style');
    st.textContent = `@keyframes sajiSpin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}#geminiFullScreen{position:fixed;inset:0;width:100%;height:100dvh;background:var(--bg-main,#0B132B);z-index:9500;display:flex;flex-direction:column;direction:rtl;font-family:'Segoe UI',Tahoma,sans-serif;color:var(--text-main,#fff);overflow:hidden}#geminiFullScreen.hidden{display:none!important}body.light-mode #geminiFullScreen{background:#f4f7f6;color:#0B132B}.gemini-top-bar{min-height:56px;padding:env(safe-area-inset-top,0) 14px 0;background:var(--panel-bg,#1C2541);border-bottom:1px solid rgba(0,180,216,.25);display:flex;align-items:center;justify-content:space-between;flex-shrink:0}body.light-mode .gemini-top-bar{background:#fff;border-bottom:1px solid #ddd}.gemini-body-wrap{display:flex;flex:1;min-height:0;position:relative;overflow:hidden}.gemini-right-sidebar{width:270px;background:rgba(18,25,43,.98);border-left:1px solid rgba(0,180,216,.2);display:flex;flex-direction:column;transition:transform .3s;z-index:100;flex-shrink:0;height:100%}body.light-mode .gemini-right-sidebar{background:#eef2f5;border-left:1px solid #ccc}.gemini-sidebar-header{padding:12px 14px;border-bottom:1px solid rgba(255,255,255,.08)}.gemini-new-chat-btn{width:100%;padding:10px 14px;background:linear-gradient(135deg,#00B4D8,#0077B6);color:#fff;border:none;border-radius:25px;font-weight:bold;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px}.gemini-sessions-list{flex:1;overflow-y:auto;padding:10px;display:flex;flex-direction:column;gap:6px}.gemini-session-item{display:flex;align-items:center;justify-content:space-between;padding:10px 12px;border-radius:10px;cursor:pointer;background:rgba(255,255,255,.03);border:1px solid transparent}body.light-mode .gemini-session-item{background:rgba(0,0,0,.03)}.gemini-session-item.active{background:rgba(0,180,216,.2);border-color:var(--gold,#00B4D8);font-weight:bold}.gemini-session-title{font-size:.88rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:185px}.gemini-del-session-btn{background:transparent;border:none;color:#ef4444;cursor:pointer;padding:2px 6px}.gemini-main-area{flex:1;display:flex;flex-direction:column;min-width:0;min-height:0;overflow:hidden}.gemini-messages-box{flex:1;min-height:0;overflow-y:auto;-webkit-overflow-scrolling:touch;padding:16px;display:flex;flex-direction:column;gap:14px}.gemini-msg-card{max-width:86%;padding:12px 16px;border-radius:16px;line-height:1.65;font-size:.95rem;word-wrap:break-word;box-shadow:0 3px 10px rgba(0,0,0,.1);flex-shrink:0}.gemini-msg-card.user{align-self:flex-start;background:linear-gradient(135deg,#0077B6,#023E8A);color:#fff;border-bottom-right-radius:4px}.gemini-msg-card.ai{align-self:flex-end;background:var(--panel-bg,#1C2541);border:1px solid rgba(0,180,216,.25);border-bottom-left-radius:4px;width:100%;max-width:820px}body.light-mode .gemini-msg-card.ai{background:#fff;color:#111;border-color:#cce3de}.gemini-msg-header{display:flex;align-items:center;gap:8px;margin-bottom:6px;font-size:.82rem;font-weight:bold;opacity:.9}.gemini-msg-actions{display:flex;justify-content:flex-end;gap:10px;margin-top:8px;padding-top:6px;border-top:1px dashed rgba(255,255,255,.15)}.gemini-action-icon-btn{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.15);color:inherit;padding:4px 10px;border-radius:8px;cursor:pointer;font-size:.78rem}body.light-mode .gemini-msg-card.ai .gemini-action-icon-btn{background:#f0f4f8;border-color:#d9e2ec;color:#333}.gemini-input-zone{padding:8px 12px calc(10px + env(safe-area-inset-bottom,0));background:var(--panel-bg,#1C2541);border-top:1px solid rgba(0,180,216,.2);display:flex;flex-direction:column;gap:6px;flex-shrink:0}body.light-mode .gemini-input-zone{background:#fff;border-top:1px solid #ddd}.gemini-quick-tools{display:flex;gap:6px;overflow-x:auto;scrollbar-width:none}.gemini-chip-btn{background:rgba(0,180,216,.12);border:1px solid rgba(0,180,216,.35);color:inherit;padding:4px 10px;border-radius:18px;font-size:.76rem;white-space:nowrap;cursor:pointer}body.light-mode .gemini-chip-btn{background:#e0f2fe}.gemini-attachment-preview{display:flex;align-items:center;gap:10px;background:rgba(0,180,216,.12);border:1px dashed #00B4D8;padding:6px 10px;border-radius:10px;max-width:900px;width:100%;margin:0 auto}.gemini-attachment-preview img{width:42px;height:42px;object-fit:cover;border-radius:6px}.gemini-input-row{display:flex;align-items:center;gap:8px;max-width:900px;width:100%;margin:0 auto}.gemini-plus-btn,.gemini-send-btn{width:42px;height:42px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0}.gemini-plus-btn{border:1.5px solid rgba(0,180,216,.5);background:rgba(0,180,216,.12);color:var(--gold,#00B4D8);font-size:1.2rem;font-weight:bold}.gemini-send-btn{border:none;background:linear-gradient(135deg,#00B4D8,#0077B6);color:#fff;font-size:1.1rem}.gemini-textarea{flex:1;min-height:42px;max-height:100px;padding:9px 14px;border-radius:22px;border:1.5px solid rgba(0,180,216,.4);background:rgba(0,0,0,.2);color:inherit;font-family:inherit;font-size:.92rem;resize:none;outline:none}body.light-mode .gemini-textarea{background:#f8fafc;color:#111}.gemini-mobile-menu-btn{display:none;background:transparent;border:1px solid rgba(0,180,216,.4);color:inherit;padding:5px 10px;border-radius:8px;cursor:pointer;font-weight:bold}@media(max-width:900px){.gemini-mobile-menu-btn{display:inline-flex;align-items:center;gap:5px}.gemini-right-sidebar{position:absolute;top:0;right:0;bottom:0;transform:translateX(100%);box-shadow:-5px 0 25px rgba(0,0,0,.5)}.gemini-right-sidebar.open{transform:translateX(0)}.gemini-msg-card{max-width:94%}}.gemini-typing-box{display:flex;align-items:center;gap:10px;color:var(--gold,#00B4D8);font-weight:bold}`;
    document.head.appendChild(st);

    const div = document.createElement('div'); div.id = 'geminiFullScreen'; div.className = 'hidden';
    div.innerHTML = `
        <div class="gemini-top-bar">
            <div style="display:flex;align-items:center;gap:8px;"><button class="gemini-mobile-menu-btn" onclick="window.toggleGeminiSidebar()">☰ المحادثات</button><span style="font-size:1.35rem;">✨</span><div><h3 style="margin:0;font-size:.98rem;color:var(--gold,#00B4D8);">مساعد التجمع الذكي (Gemini)</h3><span style="font-size:.68rem;opacity:.75;">تجمع شباب الشريعة - مديرية البصرة</span></div></div>
            <button class="panel-btn mini-btn" style="padding:6px 14px;border-radius:18px;font-weight:bold;" onclick="window.closeChatModal()">↩ خروج</button>
        </div>
        <div class="gemini-body-wrap">
            <div class="gemini-right-sidebar" id="geminiRightSidebar">
                <div class="gemini-sidebar-header"><button class="gemini-new-chat-btn" onclick="window.createNewAiSession(true)">➕ محادثة جديدة</button></div>
                <div style="padding:8px 14px 4px;font-size:.75rem;opacity:.7;font-weight:bold;">سجل المحادثات المحفوظة في جهازك:</div>
                <div class="gemini-sessions-list" id="geminiSessionsList"></div>
            </div>
            <div class="gemini-main-area" onclick="window.closeGeminiSidebarOnMobile()">
                <div class="gemini-messages-box" id="geminiMessagesBox"></div>
                <div class="gemini-input-zone">
                    <div id="geminiImagePreviewBar" class="gemini-attachment-preview hidden"><img id="geminiPreviewImg" src=""><div style="flex:1;font-size:.8rem;"><div style="font-weight:bold;color:var(--gold,#00B4D8);">📷 تم إرفاق صورة للتحليل</div><div style="opacity:.8;font-size:.74rem;">اكتب سؤالك حول الصورة أو اضغط إرسال مباشرة</div></div><button onclick="window.clearAiImageSelection()" style="background:rgba(239,68,68,.2);border:1px solid #ef4444;color:#ff6b6b;border-radius:50%;width:26px;height:26px;cursor:pointer;font-weight:bold;">✕</button></div>
                    <div class="gemini-quick-tools">
                        <button class="gemini-chip-btn" onclick="window.insertQuickPrompt('اكتب تقرير نشاط إعلامي مفصل حول: ')">📝 كتابة تقرير نشاط</button>
                        <button class="gemini-chip-btn" onclick="window.insertQuickPrompt('اكتب كليشة كتاب شكر وتقدير رسمي موجه إلى: ')">🏅 كليشة كتاب شكر</button>
                        <button class="gemini-chip-btn" onclick="window.insertQuickPrompt('ضع خطة برنامج شبابي متكامل لشهر: ')">📅 خطة برنامج</button>
                        <button class="gemini-chip-btn" onclick="document.getElementById('geminiImageInput').click()">📷 رفع صورة واستخراج نصها</button>
                    </div>
                    <div class="gemini-input-row">
                        <input type="file" id="geminiImageInput" accept="image/*" style="display:none;" onchange="window.handleAiImageSelect(event)">
                        <button class="gemini-plus-btn" onclick="document.getElementById('geminiImageInput').click()" title="إرفاق صورة">➕</button>
                        <textarea id="geminiPromptInput" class="gemini-textarea" rows="1" placeholder="اكتب سؤالك هنا، أو اضغط (➕) لرفع صورة..." onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();window.sendChatMessage();}"></textarea>
                        <button class="gemini-send-btn" onclick="window.sendChatMessage()" title="إرسال">➤</button>
                    </div>
                </div>
            </div>
        </div>`;
    document.body.appendChild(div);
};

window.handleAiImageSelect = function(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return window.showNotification("⚠️ يرجى اختيار ملف صورة صالح فقط");
    const reader = new FileReader();
    reader.onload = ev => {
        const img = new Image();
        img.onload = () => {
            const c = document.createElement('canvas'), MAX = 1100;
            let w = img.width, h = img.height;
            if (w > h && w > MAX) { h *= MAX / w; w = MAX; } else if (h > MAX) { w *= MAX / h; h = MAX; }
            c.width = w; c.height = h; c.getContext('2d').drawImage(img, 0, 0, w, h);
            const dataUrl = c.toDataURL('image/jpeg', 0.82);
            window.pendingAiImage = { dataUrl, base64: dataUrl.split(',')[1], mimeType: 'image/jpeg' };
            if ($('geminiPreviewImg')) { $('geminiPreviewImg').src = dataUrl; show('geminiImagePreviewBar'); }
            if ($('geminiPromptInput') && !$('geminiPromptInput').value.trim()) { $('geminiPromptInput').placeholder = "اكتب ماذا تريد من الصورة..."; $('geminiPromptInput').focus(); }
        };
        img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
};

window.clearAiImageSelection = () => { window.pendingAiImage = null; if ($('geminiImageInput')) $('geminiImageInput').value = ''; hide('geminiImagePreviewBar'); if ($('geminiPromptInput')) $('geminiPromptInput').placeholder = "اكتب سؤالك هنا، أو اضغط (➕) لرفع صورة..."; };
window.toggleGeminiSidebar = () => $('geminiRightSidebar')?.classList.toggle('open');
window.closeGeminiSidebarOnMobile = () => { if (window.innerWidth <= 900) $('geminiRightSidebar')?.classList.remove('open'); };
window.insertQuickPrompt = t => { if ($('geminiPromptInput')) { $('geminiPromptInput').value = t; $('geminiPromptInput').focus(); } };

window.openChatModal = () => {
    hide('aiChatModal'); window.ensureGeminiScreenBuilt(); window.initAiSessionsData();
    window.renderGeminiSidebar(); window.renderCurrentGeminiMessages(); show('geminiFullScreen');
    setTimeout(() => $('geminiPromptInput')?.focus(), 150);
};
window.closeChatModal = () => { hide('geminiFullScreen'); hide('aiChatModal'); };

window.createNewAiSession = (render = true) => {
    const s = { id: 'session_' + Date.now(), title: 'محادثة جديدة', messages: [] };
    window.aiSessions.unshift(s); window.currentAiSessionId = s.id; window.saveAiSessionsData();
    if (render) { window.renderGeminiSidebar(); window.renderCurrentGeminiMessages(); window.closeGeminiSidebarOnMobile(); $('geminiPromptInput')?.focus(); }
};
window.switchAiSession = id => { window.currentAiSessionId = id; window.renderGeminiSidebar(); window.renderCurrentGeminiMessages(); window.closeGeminiSidebarOnMobile(); };
window.deleteAiSession = (e, id) => {
    e.stopPropagation(); window.aiSessions = window.aiSessions.filter(s => s.id !== id);
    if (!window.aiSessions.length) window.createNewAiSession(false);
    else if (window.currentAiSessionId === id) window.currentAiSessionId = window.aiSessions[0].id;
    window.saveAiSessionsData(); window.renderGeminiSidebar(); window.renderCurrentGeminiMessages(); window.showNotification("تم حذف المحادثة 🗑️");
};
window.deleteSingleAiMessage = id => {
    const s = window.aiSessions.find(x => x.id === window.currentAiSessionId); if (!s) return;
    s.messages = s.messages.filter(m => m.id !== id); window.saveAiSessionsData(); window.renderCurrentGeminiMessages(); window.showNotification("تم حذف الرسالة 🗑️");
};

window.renderGeminiSidebar = () => {
    const el = $('geminiSessionsList'); if (!el) return;
    el.innerHTML = window.aiSessions.map(s => `<div class="gemini-session-item ${s.id === window.currentAiSessionId ? 'active' : ''}" onclick="window.switchAiSession('${s.id}')"><div class="gemini-session-title">💬 ${s.title}</div><button class="gemini-del-session-btn" onclick="window.deleteAiSession(event,'${s.id}')">🗑️</button></div>`).join('');
};

window.renderCurrentGeminiMessages = () => {
    const box = $('geminiMessagesBox'); if (!box) return;
    const s = window.aiSessions.find(x => x.id === window.currentAiSessionId);
    const welcome = `<div class="gemini-msg-card ai"><div class="gemini-msg-header">🤖 المساعد الذكي (تجمع شباب الشريعة)</div><div>مرحباً بك! يمكنك طرح أي سؤال، أو طلب كتابة التقارير وكتب الشكر، أو الضغط على زر <strong>(➕)</strong> لإرفاق صورة واستخراج النصوص منها.</div></div>`;
    box.innerHTML = welcome + (s?.messages || []).map(m => `
        <div class="gemini-msg-card ${m.role === 'user' ? 'user' : 'ai'}" id="${m.id}">
            <div class="gemini-msg-header">${m.role === 'user' ? '👤 أنت' : '🤖 المساعد الذكي'}</div>
            ${m.attachedImage ? `<img src="${m.attachedImage}" style="max-width:220px;max-height:180px;border-radius:10px;border:1.5px solid rgba(255,255,255,.4);display:block;margin-bottom:10px;">` : ''}
            <div>${m.text}</div>
            <div class="gemini-msg-actions">
                <button class="gemini-action-icon-btn" onclick="window.copyAiText(this,'${encodeURIComponent(m.rawText || '')}')">📋 نسخ</button>
                <button class="gemini-action-icon-btn del" onclick="window.deleteSingleAiMessage('${m.id}')">🗑️ حذف</button>
            </div>
        </div>`).join('');
    box.scrollTop = box.scrollHeight;
};

window.retryLastAiMessage = encodedMsg => {
    const inp = $('geminiPromptInput');
    if (inp) { inp.value = decodeURIComponent(encodedMsg); window.sendChatMessage(); }
};

window.sendChatMessage = async function() {
    if (window._isAiSending) return;
    window.ensureGeminiScreenBuilt();
    const inp = $('geminiPromptInput') || $('aiChatInput'); if (!inp) return;
    let msg = inp.value.trim(); const imgObj = window.pendingAiImage;
    if (!msg && !imgObj) return;
    if (!msg && imgObj) msg = "قم بقراءة هذه الصورة واستخراج النص والتفاصيل الموجودة فيها بدقة ووضوح.";
    inp.value = ''; window.clearAiImageSelection();

    const s = window.aiSessions.find(x => x.id === window.currentAiSessionId); if (!s) return;
    if (!s.messages.length) { s.title = (imgObj ? '📷 ' : '') + msg.slice(0, 26) + (msg.length > 26 ? '...' : ''); window.renderGeminiSidebar(); }
    s.messages.push({ id: `msg_${Date.now()}_u`, role: 'user', text: msg.replace(/\n/g, '<br>'), rawText: msg, attachedImage: imgObj?.dataUrl || null });
    window.saveAiSessionsData(); window.renderCurrentGeminiMessages();

    window._isAiSending = true;
    const box = $('geminiMessagesBox'), tempId = 'temp_ai_' + Date.now();
    const steps = imgObj ? ["🔍 جاري فحص الصورة وقراءة النصوص...", "🧠 جاري تحليل المحتوى...", "✍️ جاري كتابة الإجابة النهائية..."] : ["⏳ جاري الكتابة...", "🧠 جاري التفكير وتحليل الطلب...", "✍️ جاري صياغة النص الكامل..."];
    box.insertAdjacentHTML('beforeend', `<div class="gemini-msg-card ai" id="${tempId}"><div class="gemini-msg-header">🤖 المساعد الذكي</div><div class="gemini-typing-box" id="${tempId}_st"><div style="width:18px;height:18px;border:3px solid rgba(0,180,216,.3);border-top-color:#00B4D8;border-radius:50%;animation:sajiSpin .8s linear infinite;"></div><span>${steps[0]}</span></div></div>`);
    box.scrollTop = box.scrollHeight;
    let idx = 0;
    const timer = setInterval(() => { idx = (idx + 1) % steps.length; const st = $(tempId + '_st'); if (st) st.querySelector('span').textContent = steps[idx]; }, 2200);

    const ctrl = new AbortController();
    const abortTimer = setTimeout(() => ctrl.abort(), 45000);

    try {
        const ctx = s.messages.slice(-7, -1).map(m => `${m.role === 'user' ? 'المستخدم' : 'المساعد'}: ${m.rawText}`).join('\n');
        const payload = { prompt: `أنت مساعد ذكي خاص بكادر (تجمع شباب الشريعة - مديرية البصرة). مهمتك مساعدة الكادر في كتابة تقارير الأنشطة المفصلة، كليشات كتب الشكر، التخطيط للبرامج، وقراءة الصور والوثائق المرفقة واستخراج النصوص منها بدقة واحترافية.\n\n${ctx ? 'سياق المحادثة السابقة:\n' + ctx + '\n\n' : ''}طلب المستخدم الحالي:\n${msg}` };
        if (imgObj) { payload.imageBase64 = imgObj.base64; payload.imageMimeType = imgObj.mimeType; }

        const res = await fetch(GAS_AI_URL, {
            method: 'POST', redirect: 'follow', signal: ctrl.signal,
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(payload)
        });
        clearInterval(timer); clearTimeout(abortTimer);
        if (!res.ok) throw new Error(`خطأ من الخادم (HTTP ${res.status})`);

        const rawBody = await res.text();
        let data;
        try { data = JSON.parse(rawBody); }
        catch { throw new Error("المصدر لم يرجع بيانات صالحة — تأكد من نشر سكربت Google Apps Script بصلاحية (Anyone)"); }

        const replyText = data.text || data.reply || data.response || data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (data.success === false || !replyText) throw new Error(data.error || "لم يُرجع المصدر رداً — تحقق من مفتاح الـ API واسم الموديل في Google Apps Script");

        const formatted = String(replyText).replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--gold,#00B4D8);">$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>').replace(/\n/g, '<br>');
        s.messages.push({ id: `msg_${Date.now()}_ai`, role: 'ai', text: formatted, rawText: String(replyText) });
        window.saveAiSessionsData(); window.renderCurrentGeminiMessages();
    } catch (err) {
        clearInterval(timer); clearTimeout(abortTimer);
        const errMsg = err?.name === 'AbortError' ? 'انتهت مهلة الانتظار ولم يستجب السيرفر.' : (err?.message || 'فشل الاتصال بالمصدر.');
        if ($(tempId)) {
            $(tempId).innerHTML = `<div class="gemini-msg-header">🤖 المساعد الذكي</div><div style="color:#ef4444;font-weight:bold;margin-bottom:8px;">⚠️ ${errMsg}</div><button class="gemini-action-icon-btn" onclick="window.retryLastAiMessage('${encodeURIComponent(msg)}')">🔄 إعادة المحاولة</button>`;
        }
    } finally {
        window._isAiSending = false;
    }
};