/**
 * نظام المعالجة والتحقق البرمجي الرقمي المطور (الإصدار الماسي V57 - إحصاءات تلقائية وتحليل موسع)
 * تجمع شباب الشريعة - مديرية البصرة
 */

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('sw.js').then(function(reg) {
            console.log('PWA Ready', reg.scope);
        }).catch(function(err) { console.log('PWA Error:', err); });
    });
}

// -------------------------------------------------------------------
// إضافة Plugin للرسم البياني لوضع الرقم الإجمالي في قلب الدائرة بالضبط
// -------------------------------------------------------------------
if (typeof Chart !== 'undefined') {
    const centerTextPlugin = {
        id: 'centerText',
        beforeDraw: function(chart) {
            if (chart.config.options.plugins.centerText && chart.config.type === 'doughnut') {
                const { ctx, chartArea } = chart;
                if (!chartArea) return;
                
                ctx.restore();
                let text = chart.config.options.plugins.centerText.text;
                let color = chart.config.options.plugins.centerText.color || "#0B132B";
                
                let centerX = (chartArea.left + chartArea.right) / 2;
                let centerY = (chartArea.top + chartArea.bottom) / 2;
                let areaHeight = chartArea.bottom - chartArea.top;

                ctx.fillStyle = color;
                ctx.textBaseline = "middle";
                ctx.textAlign = "center";
                
                let lines = text.split("\n");
                let fontSize = Math.min(Math.max(areaHeight / 10, 16), 28);
                ctx.font = "bold " + fontSize + "px 'Segoe UI', Tahoma, sans-serif";
                
                let lineSpacing = fontSize * 1.25;
                let startY = centerY - ((lines.length - 1) * lineSpacing / 2);
                
                lines.forEach((line, i) => {
                    ctx.fillText(line, centerX, startY + (i * lineSpacing));
                });
                ctx.save();
            }
        }
    };
    Chart.register(centerTextPlugin);
}

// -------------------------------------------------------------------
// الروابط ومصادر البيانات
// -------------------------------------------------------------------
const GAS_API_URL = "https://script.google.com/macros/s/AKfycbw4fzCqQInf-Z7Zxui9mfPuj2k_DpOK6ut9kXFOIgnqdl-epib3bofSSbiVfWq7c3o77Q/exec";
const FORMS_API_URL = "https://script.google.com/macros/s/AKfycbzhHhpQmX3xA1rsgCT1qjhwCBsm2GJ2jBZQbUY0k520sjaZPhyGk4J2PPIN92nMP9TxAA/exec"; 
const PLANNING_API_URL = "https://script.google.com/macros/s/AKfycbwoJV14PO7534srW2JDmGSSIKilVDciZr--8ktV2q0uLfhOMA6Yw-XE21pSYw9bvoZW5g/exec"; 
const MEMBERS_API_URL = "https://script.google.com/macros/s/AKfycbwwddZMrqD36AsizpqbEBfdzL5giQ6Arc9S75zAyz0qcxB03i7SA9DD-OeF0nGVIxFs/exec";
const GAS_AI_URL = "https://script.google.com/macros/s/AKfycbzTY_WSn1M5R_n8pU-OqTAH52v2xz-DkXa0bKKZ2-kq1c-Njf8jxR4sfAtt9F11KxAA/exec";

window.MEMBERS_DATABASE = {};
window._sessionAdminPass = ""; // يحفظ في الذاكرة المؤقتة للجلسة فقط للمزامنة التلقائية دون تخزين خارجي
window._statsAutoSyncTimer = null;
window._lastDataSignature = "";
window.safeString = function(v) { return v ? String(v).trim() : ""; };

// مسح أي بيانات كنيات قديمة كانت مخزنة في المتصفح احتراماً للخصوصية التامة
try { localStorage.removeItem('tajammu_ai_learned_aliases'); } catch(e) {}

// -------------------------------------------------------------------
// مجموعات الهوية والكُنى المعتمدة (تُطبق حصرياً على أعضاء سجل الكادر فقط)
// -------------------------------------------------------------------
window.IDENTITY_GROUPS = [
    {
        canonical: "علاء سلام",
        aliases: ["علاء سلام", "ابو كيان", "أبو كيان", "ابا كيان", "أبا كيان"]
    },
    {
        canonical: "صباح فاضل",
        aliases: [
            "صباح فاضل", "صباح فاضل جاسم", "صباح جاسم",
            "حسن فاضل", "حسن العوجي", "حسن العواجي",
            "ابو فهد", "أبو فهد", "ابا فهد", "أبا فهد",
            "حسن فاضل العوجي", "حسن فاضل العواجي",
            "حسن فاضل جاسم", "حسن فاضل جاس", "حسن فاضل جاسم العوجي"
        ]
    },
    {
        canonical: "مرتضى عبد النبي",
        aliases: ["مرتضى عبد النبي", "مرتضى عبدالنبي", "مرتظى عبد النبي", "ابو سراج", "أبو سراج", "ابا سراج", "أبا سراج"]
    },
    {
        canonical: "ابو الحسن",
        aliases: ["ابو الحسن", "أبو الحسن", "ابا الحسن", "أبا الحسن", "ابوالحسن", "أبوالحسن"]
    },
    {
        canonical: "حبيب عبد الامير",
        aliases: ["حبيب عبد الامير", "حبيب عبدالامير", "حبيب عبد الأمير", "سيد حبيب", "السيد حبيب", "ابو ياسمين", "أبو ياسمين", "ابا ياسمين"]
    },
    {
        canonical: "كرار ازريع ماطر",
        aliases: [
            "كرار ازريع ماطر", "كرار أزريع ماطر", "كرار ازريع", "كرار أزريع",
            "كرار ازيع", "كرار أزيع", "كرار زريع",
            "ابو سعيد", "أبو سعيد", "ابا سعيد", "ابو غزل", "أبو غزل", "ابا غزل"
        ]
    },
    {
        canonical: "علي عبد القادر سلمان",
        aliases: ["علي عبد القادر سلمان", "علي عبدالقادر سلمان", "علي عبد القادر", "علي عبدالقادر", "علي قادر"]
    },
    {
        canonical: "ضياء علاء",
        aliases: ["ضياء علاء", "ضياء الخفاجي", "ضياء علاء الخفاجي"]
    },
    {
        canonical: "فرحان فلاح",
        aliases: ["فرحان فلاح", "سيد فرحان", "السيد فرحان"]
    },
    {
        canonical: "وليد خالد",
        aliases: ["وليد خالد", "وليد خالد الحيدري", "سيد وليد", "السيد وليد", "ابو باقر", "أبو باقر", "ابا باقر"]
    },
    {
        canonical: "شبيب",
        aliases: ["شبيب", "سيد شبيب", "السيد شبيب"]
    },
    {
        canonical: "منتظر حزام",
        aliases: ["منتظر حزام", "منتضر حزام", "منتظر حازم", "منتضر حازم"]
    }
];

// قاموس إضافي مؤقت في الذاكرة فقط (RAM) للتدقيق الذكي الخاص بالكادر أثناء الجلسة دون حفظ خارجي
window.SESSION_LEARNED_ALIASES = {};

// دالة معالجة روابط الصور
window.parseImageUrl = function(url) {
    let cleanUrl = window.safeString(url);
    if (!cleanUrl || cleanUrl === "-") return "";
    
    if (cleanUrl.includes("drive.google.com")) {
        let match = cleanUrl.match(/[-\w]{25,}/);
        if (match) return "https://drive.google.com/uc?export=view&id=" + match[0];
    }
    if (cleanUrl.match(/\.(jpeg|jpg|gif|png|webp)(\?.*)?$/i) != null) return cleanUrl;
    
    if (cleanUrl.includes("ibb.co/") && !cleanUrl.includes("i.ibb.co/")) {
        let parts = cleanUrl.split("ibb.co/");
        if (parts.length > 1) {
            let id = parts[1].replace(/\//g, '').split('?')[0];
            return "https://i.ibb.co/" + id + "/" + id + ".jpg"; 
        }
    }
    return cleanUrl;
};

window.parseImgBBUrl = window.parseImageUrl;

window.parseDocString = function(str) {
    if (!str || str === "-" || String(str).trim() === "") return [];
    let items = String(str).split('|').map(s => s.trim()).filter(s => s !== "");
    return items.map(item => {
        let match = item.match(/(.*?)\((.*?)\s*-\s*(.*?)\)/);
        if (match) return { title: match[1].trim(), doc: match[2].trim(), date: match[3].trim() };
        return { title: item, doc: "", date: "" };
    });
};

// دالة تحويل البيانات
window.transformSheetData = function(row) {
    let cleanRow = {};
    for (let key in row) {
        cleanRow[String(key).trim()] = row[key];
    }

    const findCol = (keywords) => {
        for (let k in cleanRow) {
            for (let kw of keywords) {
                if (k.includes(kw)) return cleanRow[k];
            }
        }
        return "";
    };

    let rawDate = String(findCol(["تولد", "تاريخ"]) || "-");
    let cleanDate = rawDate.includes("T") ? rawDate.split("T")[0] : rawDate;
    
    let avatarUrl = cleanRow["رابط الصورة"] || cleanRow["الصورة"] || findCol(["صورة", "صوره", "avatar"]);

    let basicArr = [
        { label: "التولد", val: cleanDate },
        { label: "رقم الهاتف", val: findCol(["هاتف"]) || "-" },
        { label: "التحصيل الدراسي", val: findCol(["تحصيل", "دراسي"]) || "-" },
        { label: "اسم الأم", val: findCol(["أم", "الام"]) || "-" },
        { label: "الحالة الاجتماعية", val: findCol(["حالة", "حاله", "اجتماعية"]) || "-" },
        { label: "أسماء الأبناء", val: findCol(["أبناء", "ابناء"]) || "-" }
    ];

    let standardKeywords = ["رمز", "الاسم", "تولد", "تاريخ", "هاتف", "تحصيل", "دراسي", "أم", "الام", "حالة", "حاله", "أبناء", "ابناء", "صورة", "صوره", "درايف", "مهارات", "دورات", "عسكرية", "عسكريه", "أسلحة", "اسلحة", "سكن", "نوع", "سابق", "حالي", "عمل", "مسؤوليات", "انضباطي", "عقوبات", "شكر"];
    
    for (let k in cleanRow) {
        if (k === "") continue;
        let isStandard = standardKeywords.some(kw => k.includes(kw));
        
        if (!isStandard) {
            let val = cleanRow[k];
            if (val !== undefined && val !== "" && String(val).trim() !== "-") {
                basicArr.push({ label: k, val: val });
            }
        }
    }

    let finalFullName = window.safeString(findCol(["الاسم"])) || "عضو بدون اسم";

    return {
        code: findCol(["رمز", "كود"]) || "-",
        fullName: finalFullName,
        avatar: window.parseImageUrl(avatarUrl), 
        drive: findCol(["درايف", "drive"]) || "", 
        basic: basicArr, 
        skills: [
            { label: "الدورات", val: findCol(["دورات", "مهارات"]) || "-" },
            { label: "دورة عسكرية", val: findCol(["عسكرية", "عسكريه"]) || "-" },
            { label: "إجادة الأسلحة", val: findCol(["أسلحة", "اسلحة"]) || "-" }
        ],
        housing: [
            { label: "معلومات السكن", val: findCol(["سكن حالي", "السكن"]) || "-" },
            { label: "نوع السكن", val: findCol(["نوع السكن", "ملك"]) || "-" },
            { label: "العنوان السابق", val: findCol(["سابق"]) || "-" }
        ],
        work: window.parseDocString(findCol(["عمل", "مسؤوليات"])),
        punishments: window.parseDocString(findCol(["انضباطي", "عقوبات"])),
        awards: window.parseDocString(findCol(["شكر"]))
    };
};

const SOCIAL_LINKS = {
    tajammu: [ { name: "فيسبوك", url: "https://www.facebook.com/share/1CvehBKNWt/" }, { name: "انستغرام", url: "https://www.instagram.com/sharia.youth.assembly?igsh=aTdpaXE1YmtjeWIx" }, { name: "تليغرام", url: "https://t.me/Shabab_alshariaa" }, { name: "تيك توك", url: "https://www.tiktok.com/@c1cck?_r=1&_t=ZS-96ufheasgNA" } ],
    scouts: [ { name: "فيسبوك", url: "https://www.facebook.com/share/18X5vdwQMA/" }, { name: "انستغرام", url: "https://www.instagram.com/scouts_imam.hussein?igsh=MTM4YnMxeHJpNDRsYw==" }, { name: "تليغرام", url: "https://t.me/Shabab_alshariaa" }, { name: "تيك توك", url: "https://www.tiktok.com/@11hf11?_r=1&_t=ZS-96ufsWWZvcK" } ],
    trend: [ { name: "حساب تيك توك الرسمي", url: "https://www.tiktok.com/@2.ca?_r=1&_t=ZS-96ufxHesNW8" } ]
};

// -------------------------------------------------------------------
// تهيئة Firebase
// -------------------------------------------------------------------
let database = null;
try {
    const firebaseConfig = {
        apiKey: "AIzaSyA1CLxZWbrQq6XhbIZH63u65jFSok-zGYI",
        authDomain: "altjmaa.firebaseapp.com",
        databaseURL: "https://altjmaa-default-rtdb.firebaseio.com",
        projectId: "altjmaa",
        storageBucket: "altjmaa.firebasestorage.app",
        messagingSenderId: "440726604865",
        appId: "1:440726604865:web:5ac3b9060edf0c1743cac0",
        measurementId: "G-P2ZVSD1YV8"
    };

    if (typeof firebase !== 'undefined') {
        if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
        database = firebase.database();
    }
} catch (error) { console.error("Firebase Error:", error); }

window.loadFbPosts = function() {
    const container = document.getElementById('facebookSliderContainer');
    const wrapper = document.getElementById('fbWrapper');
    if (!database) return;

    database.ref("settings/facebook/urls").once("value").then(function(snapshot) {
        if (snapshot.exists()) {
            const urlsData = snapshot.val();
            if(wrapper) wrapper.innerHTML = ''; 
            const urlsArray = Array.isArray(urlsData) ? urlsData : Object.values(urlsData);

            if(urlsArray.length > 0) {
                urlsArray.forEach(function(url) {
                    let cleanUrl = String(url).trim().replace('//m.facebook.com', '//www.facebook.com').replace('//l.facebook.com', '//www.facebook.com');
                    if (cleanUrl.includes('/share/')) cleanUrl = cleanUrl.split('?')[0]; 
                    const slide = document.createElement('div');
                    slide.className = 'swiper-slide';
                    slide.innerHTML = '<div class="fb-post" data-href="' + cleanUrl + '" data-width="100%" data-show-text="true"></div>';
                    if(wrapper) wrapper.appendChild(slide);
                });
                
                if (container) container.style.display = 'block'; 
                if (typeof Swiper !== 'undefined') {
                    new Swiper(".mySwiper", { spaceBetween: 20, autoHeight: true, observer: true, observeParents: true, grabCursor: true, autoplay: { delay: 4000, disableOnInteraction: false }, pagination: { el: ".swiper-pagination", clickable: true } });
                }
                if (typeof FB !== 'undefined') FB.XFBML.parse();
            }
        }
    }).catch(function(err) { console.log("FB Fetch Error:", err); });
};

// -------------------------------------------------------------------
// الإتاحة العامة والأدوات المساعدة
// -------------------------------------------------------------------
window.globalAdminMode = false;
window.currentActiveAlias = "";
window.fetchedAttendanceLogs = []; 
window.groupedAttendanceData = {}; 
window.allFormsData = { tajammu: [], scouts: [], planning: [] };
window.isFormsFetching = false;
window.currentFormView = { type: '', index: 0 };
window.currentFormsGroups = {};
window.currentPdfFileName = "ملف.pdf";

window.getNiceLoaderHtml = function(msg) {
    return `
        <div class="panel-card saji-border text-center" style="grid-column: 1 / -1; padding: 45px 20px; margin: 15px auto; width: 100%; max-width: 480px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 18px; background: var(--panel-bg); box-shadow: 0 8px 25px rgba(0,0,0,0.08);">
            <div style="width: 48px; height: 48px; border: 4px solid rgba(0, 180, 216, 0.2); border-top-color: var(--gold); border-radius: 50%; animation: sajiSpin 0.9s linear infinite;"></div>
            <h4 class="primary-title" style="margin: 0; font-size: 1.1rem; color: var(--text-main);">${msg}</h4>
            <p style="margin: 0; font-size: 0.85rem; color: var(--text-muted);">يرجى الانتظار لحظات لمزامنة البيانات السحابية...</p>
            <style>@keyframes sajiSpin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>
        </div>
    `;
};

let deferredPrompt;
const installAppBtn = document.getElementById('installAppBtn');

window.addEventListener('beforeinstallprompt', function(e) {
    e.preventDefault();
    deferredPrompt = e;
    if (installAppBtn) installAppBtn.classList.remove('hidden');
});

if (installAppBtn) {
    installAppBtn.addEventListener('click', async function() {
        if (deferredPrompt !== null) {
            deferredPrompt.prompt();
            const choice = await deferredPrompt.userChoice;
            if (choice.outcome === 'accepted') installAppBtn.classList.add('hidden');
            deferredPrompt = null;
        }
    });
}
window.addEventListener('appinstalled', function() {
    if (installAppBtn) installAppBtn.classList.add('hidden');
    window.showNotification("تم تثبيت التطبيق بنجاح!");
});

window.cleanChildrenNames = function(str) {
    if (!str || str === "-") return "لا يوجد";
    let parts = str.split(/[،,]/);
    let names = [];
    parts.forEach(function(p) {
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
};

window.showNotification = function(msg) {
    const toast = document.getElementById('toastNotification');
    if(!toast) return;
    toast.innerText = msg; 
    toast.classList.remove('hidden');
    setTimeout(function() { toast.classList.add('hidden'); }, 3000);
};

window.handleImageError = function(img) {
    img.classList.add('hidden');
    const fallback = img.nextElementSibling;
    if (fallback) fallback.classList.remove('hidden');
};

window.toggleSystemTheme = function() {
    const isLightMode = document.body.classList.toggle('light-mode');
    const checkbox = document.getElementById('themeCheckbox');
    if(checkbox) checkbox.checked = !isLightMode;
    if(isLightMode) window.showNotification("تم تفعيل الوضع النهاري");
    else window.showNotification("تم تفعيل الوضع الليلي");
    if (!document.getElementById('chartsScreen').classList.contains('hidden')) window.renderAnalyticsCharts();
};

window.showProgressBar = function(title) {
    document.getElementById('progressTitle').innerText = title || "جاري التصدير...";
    document.getElementById('progressBarFill').style.width = "0%";
    document.getElementById('progressText').innerText = "0%";
    document.getElementById('progressOverlay').classList.remove('hidden');
};

window.updateProgressBar = function(percent) {
    document.getElementById('progressBarFill').style.width = percent + "%";
    document.getElementById('progressText').innerText = percent + "%";
};

window.hideProgressBar = function() {
    document.getElementById('progressOverlay').classList.add('hidden');
};

// -------------------------------------------------------------------
// دالة المزامنة الديناميكية الحية والتلقائية (للكادر والاستمارات)
// -------------------------------------------------------------------
window.computeCurrentDataSignature = function() {
    let kaderKeys = Object.keys(window.MEMBERS_DATABASE || {}).map(k => {
        let m = window.MEMBERS_DATABASE[k];
        return k + ":" + (window.isMemberInactive(k, m) ? "R" : "G");
    }).sort().join("|");
    let tLen = (window.allFormsData.tajammu || []).length;
    let sLen = (window.allFormsData.scouts || []).length;
    return `${kaderKeys}__T:${tLen}__S:${sLen}`;
};

window.refreshMembersDatabaseSilently = async function() {
    if (!window._sessionAdminPass) return false;
    try {
        const url = `${MEMBERS_API_URL}?action=adminLogin&password=${encodeURIComponent(window._sessionAdminPass)}&t=${Date.now()}`;
        let res = await fetch(url);
        let result = await res.json();
        if (result.success && Array.isArray(result.data)) {
            let newDb = {};
            result.data.forEach(row => {
                let transformed = window.transformSheetData(row);
                newDb[transformed.fullName] = transformed;
            });
            window.MEMBERS_DATABASE = newDb;
            return true;
        }
    } catch (e) {
        console.warn("Silent members sync error:", e);
    }
    return false;
};

window.refreshFormsDataSilently = async function() {
    try {
        const res = await fetch(`${FORMS_API_URL}?t=${Date.now()}`);
        const data = await res.json();
        if (!data.error) {
            window.allFormsData.tajammu = data.tajammu || [];
            window.allFormsData.scouts = data.scouts || [];
            return true;
        }
    } catch (e) {
        console.warn("Silent forms sync error:", e);
    }
    return false;
};

// مراقب ذكي يحدث الإحصاءات وسجل الكادر تلقائياً بمجرد العودة للتبويب أو أثناء فتح الإحصاءات
window.startAutoLiveStatsWatcher = function() {
    if (window._statsAutoSyncTimer) clearInterval(window._statsAutoSyncTimer);
    window._lastDataSignature = window.computeCurrentDataSignature();

    window._statsAutoSyncTimer = setInterval(async function() {
        const statsScreen = document.getElementById('formsStatsScreen');
        const kaderScreen = document.getElementById('adminKaderListScreen');
        const isStatsOpen = statsScreen && !statsScreen.classList.contains('hidden');
        const isKaderOpen = kaderScreen && !kaderScreen.classList.contains('hidden');

        if (!isStatsOpen && !isKaderOpen) return;

        await Promise.all([
            window.refreshMembersDatabaseSilently(),
            isStatsOpen ? window.refreshFormsDataSilently() : Promise.resolve()
        ]);

        let newSig = window.computeCurrentDataSignature();
        if (newSig !== window._lastDataSignature) {
            window._lastDataSignature = newSig;
            if (isKaderOpen) {
                window.buildAdminKaderButtons();
            }
            if (isStatsOpen) {
                let ctx = window.currentStatsContext;
                if (ctx && ctx.type) {
                    window.rebuildCurrentFormsGroups(ctx.type);
                    window.renderFormsCharts(ctx.scope, ctx.type, ctx.monthKey);
                }
            }
        }
    }, 25000);
};

// تحديث تلقائي فوري عند العودة لنافذة الموقع بعد إضافة عضو أو استمارة في كوكل شيت
window.addEventListener('focus', async function() {
    const statsScreen = document.getElementById('formsStatsScreen');
    const kaderScreen = document.getElementById('adminKaderListScreen');
    const isStatsOpen = statsScreen && !statsScreen.classList.contains('hidden');
    const isKaderOpen = kaderScreen && !kaderScreen.classList.contains('hidden');

    if (isStatsOpen || isKaderOpen) {
        await Promise.all([
            window.refreshMembersDatabaseSilently(),
            isStatsOpen ? window.refreshFormsDataSilently() : Promise.resolve()
        ]);
        let newSig = window.computeCurrentDataSignature();
        if (newSig !== window._lastDataSignature) {
            window._lastDataSignature = newSig;
            if (isKaderOpen) window.buildAdminKaderButtons();
            if (isStatsOpen) {
                let ctx = window.currentStatsContext;
                if (ctx && ctx.type) {
                    window.rebuildCurrentFormsGroups(ctx.type);
                    window.renderFormsCharts(ctx.scope, ctx.type, ctx.monthKey);
                }
            }
        }
    }
});

// -------------------------------------------------------------------
// دوال المصادقة والتنقل
// -------------------------------------------------------------------

window.handleMainLogin = async function() {
    const u = window.safeString(document.getElementById('username').value);
    const p = window.safeString(document.getElementById('password').value);
    const err = document.getElementById('loginError');

    err.innerText = "جاري التحقق من السيرفر... ⏳";
    err.style.color = "var(--gold)";
    err.classList.remove('hidden');

    try {
        const url = `${MEMBERS_API_URL}?action=mainLogin&username=${encodeURIComponent(u)}&password=${encodeURIComponent(p)}`;
        let res = await fetch(url);
        let result = await res.json();

        if (result.success) {
            err.classList.add('hidden');
            document.getElementById('loginScreen').classList.add('hidden');
            document.getElementById('dashboardScreen').classList.remove('hidden');
            if (typeof window.loadFbPosts === 'function') window.loadFbPosts(); 
        } else {
            err.innerText = "⚠️ " + (result.message || "معلومات الدخول غير صحيحة!");
            err.style.color = "var(--error)";
        }
    } catch (error) {
        err.innerText = "⚠️ خطأ في الاتصال بالسيرفر!";
        err.style.color = "var(--error)";
    }
};

window.submitAdminPassword = async function() {
    const p = window.safeString(document.getElementById('adminPasswordInput').value);
    const err = document.getElementById('modalAdminError');

    err.innerText = "جاري جلب البيانات من السحابة... ⏳";
    err.style.color = "var(--gold)";
    err.classList.remove('hidden');

    try {
        const url = `${MEMBERS_API_URL}?action=adminLogin&password=${encodeURIComponent(p)}&t=${Date.now()}`;
        let res = await fetch(url);
        let result = await res.json();

        if (result.success) {
            window._sessionAdminPass = p;
            window.closeAdminPasswordModal();
            window.globalAdminMode = true;
            window.MEMBERS_DATABASE = {};
            result.data.forEach(row => {
                let transformed = window.transformSheetData(row);
                window.MEMBERS_DATABASE[transformed.fullName] = transformed;
            });
            window.startAutoLiveStatsWatcher();
            window.navigateTo('adminScreen');
        } else {
            err.innerText = "⚠️ " + (result.message || "الرمز الإداري غير صحيح!");
            err.style.color = "var(--error)";
        }
    } catch (error) {
        err.innerText = "⚠️ خطأ في الاتصال بقاعدة البيانات!";
        err.style.color = "var(--error)";
    }
};

window.submitDirectCode = async function() {
    const typed = window.safeString(document.getElementById('directMemberCodeInput').value);
    const err = document.getElementById('directModalCodeError');
    err.innerText = "جاري التحقق من الرمز... ⏳";
    err.style.color = "var(--gold)";
    err.classList.remove('hidden');

    try {
        const url = `${MEMBERS_API_URL}?action=memberLogin&code=${encodeURIComponent(typed)}&t=${Date.now()}`;
        let res = await fetch(url);
        let result = await res.json();

        if (result.success) {
            window.closeDirectCodeModal();
            window.globalAdminMode = false;
            let transformed = window.transformSheetData(result.data);
            window.MEMBERS_DATABASE = {};
            window.MEMBERS_DATABASE[transformed.fullName] = transformed;
            window.currentActiveAlias = transformed.fullName;
            window.displayMemberCardData(window.currentActiveAlias);
        } else {
            err.innerText = "⚠️ " + (result.message || "الرمز غير صحيح!");
            err.style.color = "var(--error)";
        }
    } catch (error) {
        err.innerText = "⚠️ فشل الاتصال بالسيرفر!";
        err.style.color = "var(--error)";
    }
};

window.handleLogout = function() {
    document.getElementById('dashboardScreen').classList.add('hidden');
    document.getElementById('sidebarPanel').classList.add('hidden');
    document.getElementById('loginScreen').classList.remove('hidden');
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    window.MEMBERS_DATABASE = {}; 
    window._sessionAdminPass = "";
    window.SESSION_LEARNED_ALIASES = {};
    if (window._statsAutoSyncTimer) clearInterval(window._statsAutoSyncTimer);
};

window.toggleSidebar = function(shouldShow) {
    const sidebar = document.getElementById('sidebarPanel');
    if (shouldShow) sidebar.classList.remove('hidden');
    else sidebar.classList.add('hidden');
};

window.openSidebarSection = function(sectionType) {
    window.toggleSidebar(false);
    document.getElementById('dashboardScreen').classList.add('hidden');
    if (sectionType === 'about') document.getElementById('aboutView').classList.remove('hidden');
};

window.returnToDashboardFromSidebar = function(currentViewId) {
    document.getElementById(currentViewId).classList.add('hidden');
    document.getElementById('dashboardScreen').classList.remove('hidden');
};

window.navigateTo = function(id) {
    document.getElementById('dashboardScreen').classList.add('hidden');
    document.getElementById(id).classList.remove('hidden');
};

window.goBackToDashboard = function() {
    const views = ['adminScreen', 'activitiesScreen', 'socialScreen', 'adminKaderListScreen', 'attendanceLogsScreen', 'formsCategoryScreen', 'formsMonthsScreen', 'formsListScreen', 'chartsScreen', 'formsStatsScreen', 'mediaCentralScreen', 'annualSummariesScreen', 'geminiFullScreen'];
    views.forEach(function(v) { let el = document.getElementById(v); if(el) el.classList.add('hidden'); });
    document.getElementById('dashboardScreen').classList.remove('hidden');
};

window.openDirectCodeModal = function() {
    document.getElementById('sidebarPanel').classList.add('hidden');
    document.getElementById('dashboardScreen').classList.add('hidden');
    document.getElementById('directMemberCodeInput').value = '';
    document.getElementById('directModalCodeError').classList.add('hidden');
    document.getElementById('directCodeModal').classList.remove('hidden');
};

window.closeDirectCodeModal = function() {
    document.getElementById('directCodeModal').classList.add('hidden');
    document.getElementById('dashboardScreen').classList.remove('hidden');
};

window.openAdminPasswordModal = function() {
    document.getElementById('sidebarPanel').classList.add('hidden');
    document.getElementById('adminPasswordInput').value = '';
    document.getElementById('modalAdminError').classList.add('hidden');
    document.getElementById('adminPasswordModal').classList.remove('hidden');
};

window.closeAdminPasswordModal = function() { document.getElementById('adminPasswordModal').classList.add('hidden'); };

window.openAdminKaderView = async function() {
    document.getElementById('adminScreen').classList.add('hidden');
    document.getElementById('adminKaderListScreen').classList.remove('hidden');
    window.buildAdminKaderButtons();
    let updated = await window.refreshMembersDatabaseSilently();
    if (updated && !document.getElementById('adminKaderListScreen').classList.contains('hidden')) {
        window.buildAdminKaderButtons();
    }
};

window.goBackToAdminScreen = function() {
    document.getElementById('adminKaderListScreen').classList.add('hidden');
    document.getElementById('adminScreen').classList.remove('hidden');
};

// -------------------------------------------------------------------
// بناء أزرار سجل الكادر بأصغر حجم وباعتماد الألوان فقط (بدون كتابة الحالة)
// -------------------------------------------------------------------
window.isMemberInactive = function(alias, memberObj) {
    let norm = String(alias).replace(/[أإآ]/g, 'ا').trim();
    let inactiveList = ['علي احمد', 'محمد يعرب'];
    if (inactiveList.some(name => norm.includes(name))) return true;

    if (memberObj && memberObj.basic) {
        for (let b of memberObj.basic) {
            let val = String(b.val || '');
            if (val.includes('منتهي') || val.includes('متوقف') || val.includes('ترك العمل') || val.includes('منسحب') || val.includes('انهاء') || val.includes('أحمر') || val.includes('احمر') || val.includes('مجمد')) {
                return true;
            }
        }
    }
    return false;
};

window.buildAdminKaderButtons = function() {
    const container = document.getElementById('adminAliasesContainer');
    if (!container) return;
    container.innerHTML = '';

    if (!document.getElementById('kaderCustomStyles')) {
        const st = document.createElement('style');
        st.id = 'kaderCustomStyles';
        st.innerHTML = `
            #adminAliasesContainer.names-square-grid {
                grid-template-columns: repeat(auto-fill, minmax(105px, 1fr)) !important;
                gap: 6px !important;
                margin-top: 15px;
            }
            .kader-card-btn {
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                padding: 6px 8px !important;
                border-radius: 6px !important;
                cursor: pointer;
                transition: transform 0.15s ease, filter 0.15s ease !important;
                text-align: center;
                min-height: 32px !important;
            }
            .kader-card-btn:hover {
                transform: translateY(-2px);
                filter: brightness(1.12);
            }
            .kader-card-btn.kader-active {
                background: rgba(16, 185, 129, 0.16) !important;
                border: 1.5px solid #10b981 !important;
                box-shadow: 0 2px 6px rgba(16, 185, 129, 0.12) !important;
            }
            .kader-card-btn.kader-inactive {
                background: rgba(239, 68, 68, 0.16) !important;
                border: 1.5px solid #ef4444 !important;
                box-shadow: 0 2px 6px rgba(239, 68, 68, 0.12) !important;
            }
            .kader-name-text {
                font-size: 0.78rem;
                font-weight: 700;
                line-height: 1.25;
                word-break: break-word;
            }
            .kader-active .kader-name-text { color: #10b981; }
            .kader-inactive .kader-name-text { color: #ef4444; }
            body.light-mode .kader-active .kader-name-text { color: #047857; }
            body.light-mode .kader-inactive .kader-name-text { color: #b91c1c; }
        `;
        document.head.appendChild(st);
    }

    const aliases = Object.keys(window.MEMBERS_DATABASE).sort((a, b) => {
        const inA = window.isMemberInactive(a, window.MEMBERS_DATABASE[a]);
        const inB = window.isMemberInactive(b, window.MEMBERS_DATABASE[b]);
        if (inA === inB) return 0;
        return inA ? 1 : -1;
    });

    aliases.forEach(function(alias) {
        const memberObj = window.MEMBERS_DATABASE[alias];
        const isInactive = window.isMemberInactive(alias, memberObj);

        const b = document.createElement('button');
        b.className = 'name-panel-btn kader-card-btn ' + (isInactive ? 'kader-inactive' : 'kader-active');
        b.innerHTML = `<div class="kader-name-text">${alias}</div>`;
        b.onclick = function() {
            window.currentActiveAlias = alias;
            window.displayMemberCardData(alias);
        };
        container.appendChild(b);
    });
};

window.outputRowsHtml = function(list) {
    let html = "";
    list.forEach(function(row) {
        let displayVal = row.val;
        if (row.label === "أسماء الأبناء" || row.label === "الأبناء") displayVal = window.cleanChildrenNames(row.val);
        html += '<div class="inset-pill"><span class="label">' + row.label + '</span><span class="value">' + displayVal + '</span></div>';
    });
    return html;
};

window.outputTableHtml = function(dataList, type) {
    let headers = [];
    if (type === 'work') headers = ['النوع', 'رقم الكتاب', 'التاريخ'];
    else if (type === 'punishments') headers = ['نوع العقوبة', 'رقم الكتاب', 'تاريخه'];
    else if (type === 'awards') headers = ['نوع الشكر', 'رقم الكتاب', 'تاريخه'];

    let html = '<table class="modern-table"><thead><tr><th>' + headers[0] + '</th><th>' + headers[1] + '</th><th>' + headers[2] + '</th></tr></thead><tbody>';
    if (dataList.length === 0) {
        html += '<tr><td colspan="3" class="empty-cell">لا يوجد</td></tr>';
        for(let i=1; i<5; i++) { html += '<tr><td></td><td></td><td></td></tr>'; }
    } else {
        for(let i=0; i<5; i++) {
            if (i < dataList.length) {
                const item = dataList[i];
                html += '<tr><td>' + (item.title || '') + '</td><td>' + (item.doc || '') + '</td><td>' + (item.date || '') + '</td></tr>';
            } else { html += '<tr><td></td><td></td><td></td></tr>'; }
        }
    }
    html += '</tbody></table>';
    return html;
};

window.displayMemberCardData = function(alias) {
    window.currentActiveAlias = alias; 
    const u = window.MEMBERS_DATABASE[alias];
    if (!u) return;
    document.getElementById('adminKaderListScreen').classList.add('hidden');
    document.getElementById('dashboardScreen').classList.add('hidden'); 
    document.getElementById('profileDetailScreen').classList.remove('hidden');
    document.getElementById('profileFullName').innerText = u.fullName;
    document.getElementById('primaryDetailsContainer').innerHTML = window.outputRowsHtml(u.basic);

    const imgElement = document.getElementById('profileImage');
    const fallbackElement = imgElement.nextElementSibling;
    
    if(u.avatar && u.avatar.trim() !== "") {
        imgElement.src = u.avatar;
        imgElement.classList.remove('hidden');
        fallbackElement.classList.add('hidden');
    } else {
        imgElement.classList.add('hidden');
        fallbackElement.classList.remove('hidden');
    }

    document.getElementById('driveLinkBtn').href = u.drive;
    document.getElementById('dynamicDetailDisplayBox').classList.add('hidden');
    document.querySelectorAll('.panel-tab-btn').forEach(function(btn) { btn.classList.remove('active-tab'); });
};

window.closeProfileScreen = function() {
    document.getElementById('profileDetailScreen').classList.add('hidden');
    if (window.globalAdminMode) document.getElementById('adminKaderListScreen').classList.remove('hidden');
    else document.getElementById('dashboardScreen').classList.remove('hidden');
};

window.loadSpecificDetail = function(key, element) {
    document.querySelectorAll('.panel-tab-btn').forEach(function(btn) { btn.classList.remove('active-tab'); });
    element.classList.add('active-tab');
    const u = window.MEMBERS_DATABASE[window.currentActiveAlias];
    if (!u) return;

    const displayBox = document.getElementById('dynamicDetailDisplayBox');
    const title = document.getElementById('dynamicDetailTitle');
    const content = document.getElementById('dynamicDetailContent');

    const headers = { 'skills': 'الدورات والمهارات', 'housing': 'معلومات السكن', 'work': 'العمل والمسؤوليات', 'punishments': 'السجل الانضباطي', 'awards': 'كتب الشكر والتقدير' };
    title.innerText = headers[key];

    if (key === 'work' || key === 'punishments' || key === 'awards') content.innerHTML = window.outputTableHtml(u[key], key);
    else content.innerHTML = window.outputRowsHtml(u[key]);
    displayBox.classList.remove('hidden');
};

// -------------------------------------------------------------------
// الإحصائيات الشاملة للإدارة
// -------------------------------------------------------------------
window.openChartsScreen = async function() {
    document.getElementById('adminScreen').classList.add('hidden');
    document.getElementById('chartsScreen').classList.remove('hidden');
    window.renderAnalyticsCharts();
    let updated = await window.refreshMembersDatabaseSilently();
    if (updated && !document.getElementById('chartsScreen').classList.contains('hidden')) {
        window.renderAnalyticsCharts();
    }
};

window.goBackToAdminFromCharts = function() {
    document.getElementById('chartsScreen').classList.add('hidden');
    document.getElementById('adminScreen').classList.remove('hidden');
};

window.renderAnalyticsCharts = function() {
    if (window.maritalChartInstance) window.maritalChartInstance.destroy();
    if (window.ageChartInstance) window.ageChartInstance.destroy();
    if (window.punishmentChartInstance) window.punishmentChartInstance.destroy();
    if (window.awardsChartInstance) window.awardsChartInstance.destroy();

    const isDark = !document.body.classList.contains('light-mode');
    const chartTextColor = isDark ? '#FFFFFF' : '#0B132B';
    const gridLineColor = isDark ? 'rgba(135, 206, 235, 0.1)' : 'rgba(0, 119, 182, 0.1)';

    let marriedCount = 0, singleCount = 0;
    let totalAge = 0, ageValidCount = 0;
    let ageBuckets = { "تحت 20 سنة": 0, "20 - 25 سنة": 0, "26 - 30 سنة": 0, "فوق 30 سنة": 0 };
    let punishmentCounts = { "تنبيه": 0, "توبيخ": 0, "انذار": 0, "تجميد": 0 };
    let awardsLeaderboard = {};

    for (let alias in window.MEMBERS_DATABASE) {
        const u = window.MEMBERS_DATABASE[alias];
        let statusObj = u.basic.find(function(b) { return b.label && b.label.includes("الحالة"); });
        if (statusObj) {
            let val = statusObj.val.trim();
            if (val.includes("متزوج")) marriedCount++;
            else if (val.includes("اعزب") || val.includes("أعزب")) singleCount++;
        }
        let birthObj = u.basic.find(function(b) { return b.label && b.label.includes("التولد"); });
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
            u.punishments.forEach(function(p) {
                let t = p.title.trim();
                if (t.includes("تنبيه")) punishmentCounts["تنبيه"]++;
                else if (t.includes("توبيخ")) punishmentCounts["توبيخ"]++;
                else if (t.includes("انذار") || t.includes("إنذار")) punishmentCounts["انذار"]++;
                else if (t.includes("تجميد")) punishmentCounts["تجميد"]++;
            });
        }
        if (u.awards && u.awards.length > 0) { awardsLeaderboard[alias] = u.awards.length; } 
        else { awardsLeaderboard[alias] = 0; }
    }

    let avgAge = ageValidCount > 0 ? Math.round(totalAge / ageValidCount) : 0;
    document.getElementById('averageAgeVal').innerText = avgAge + " سنة";

    Chart.defaults.color = chartTextColor;
    Chart.defaults.font.family = 'Segoe UI, sans-serif';

    const ctxMarital = document.getElementById('maritalChart').getContext('2d');
    window.maritalChartInstance = new Chart(ctxMarital, {
        type: 'pie',
        data: { labels: ['متزوج', 'أعزب'], datasets: [{ data: [marriedCount, singleCount], backgroundColor: ['#00B4D8', '#1C2541'], borderWidth: isDark ? 0 : 1 }] },
        options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
    });

    const ctxAge = document.getElementById('ageChart').getContext('2d');
    window.ageChartInstance = new Chart(ctxAge, {
        type: 'bar',
        data: { labels: Object.keys(ageBuckets), datasets: [{ label: 'عدد الكادر', data: Object.values(ageBuckets), backgroundColor: '#00B4D8', borderRadius: 6 }] },
        options: { responsive: true, maintainAspectRatio: false, scales: { y: { grid: { color: gridLineColor }, ticks: { stepSize: 1 } }, x: { grid: { display: false } } } }
    });

    const ctxPunish = document.getElementById('punishmentChart').getContext('2d');
    window.punishmentChartInstance = new Chart(ctxPunish, {
        type: 'line',
        data: { labels: Object.keys(punishmentCounts), datasets: [{ label: 'إجمالي العقوبات', data: Object.values(punishmentCounts), borderColor: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.2)', fill: true, tension: 0.3, borderWidth: 3 }] },
        options: { responsive: true, maintainAspectRatio: false, scales: { y: { grid: { color: gridLineColor }, ticks: { stepSize: 1 } }, x: { grid: { display: false }, ticks: { font: { size: 10 } } } } }
    });

    const ctxAwards = document.getElementById('awardsChart').getContext('2d');
    window.awardsChartInstance = new Chart(ctxAwards, {
        type: 'line',
        data: { labels: Object.keys(awardsLeaderboard), datasets: [{ label: 'كتب الشكر والشهادات', data: Object.values(awardsLeaderboard), borderColor: '#00B4D8', backgroundColor: 'rgba(0, 180, 216, 0.2)', fill: true, tension: 0.3, borderWidth: 3 }] },
        options: { responsive: true, maintainAspectRatio: false, scales: { y: { grid: { color: gridLineColor }, ticks: { stepSize: 1 } }, x: { grid: { display: false }, ticks: { font: { size: 10 } } } } }
    });
};

window.openSocialModal = function(platform) {
    document.getElementById('sidebarPanel').classList.add('hidden');
    const modal = document.getElementById('socialLinksModal');
    const title = document.getElementById('socialModalTitle');
    const container = document.getElementById('socialLinksContainer');
    container.innerHTML = '';
    if(platform === 'tajammu') title.innerText = 'تجمع شباب الشريعة';
    else if(platform === 'scouts') title.innerText = 'كشافة الإمام الحسين';
    else if(platform === 'trend') title.innerText = 'منصة ترند الإعلامية';
    SOCIAL_LINKS[platform].forEach(function(link) {
        const a = document.createElement('a'); a.href = link.url; a.target = '_blank';
        a.className = 'name-panel-btn block-link'; a.innerText = link.name;
        container.appendChild(a);
    });
    modal.classList.remove('hidden');
};

window.closeSocialModal = function() { document.getElementById('socialLinksModal').classList.add('hidden'); };

// -------------------------------------------------------------------
// قسم الإعلام المركزي - الموجزات السنوية
// -------------------------------------------------------------------
window.navigateToMediaCentral = function() {
    document.getElementById('adminScreen').classList.add('hidden');
    document.getElementById('mediaCentralScreen').classList.remove('hidden');
};

window.goBackToAdminFromMedia = function() {
    document.getElementById('mediaCentralScreen').classList.add('hidden');
    document.getElementById('adminScreen').classList.remove('hidden');
};

window.navigateToAnnualSummaries = function() {
    document.getElementById('mediaCentralScreen').classList.add('hidden');
    document.getElementById('annualSummariesScreen').classList.remove('hidden');
};

window.goBackToMediaFromSummaries = function() {
    document.getElementById('annualSummariesScreen').classList.add('hidden');
    document.getElementById('mediaCentralScreen').classList.remove('hidden');
};

const SUMMARY_LINKS = {
    '2023': {
        pdf: 'https://drive.google.com/file/d/1ITbn0tDaNQWpine_73DrZQKoYNBvSR2b/preview',
        ppt: 'https://docs.google.com/presentation/d/1xaZNs-LKX1T2EEjxvbUVsvKjECNPlwAK/edit?ouid=112336225419335604944&rtpof=true&sd=true&usp=drive_link'
    },
    '2024': {
        pdf: 'https://drive.google.com/file/d/1Cv0mmXUddcM_aIEZCG2pLJOEejDzUtpB/preview',
        ppt: 'https://docs.google.com/presentation/d/1GRzqAgqfdg6hURBulPYPsPX9E3Qvg5N4/edit?usp=drive_link&ouid=112336225419335604944&rtpof=true&sd=true'
    },
    '2025': {
        pdf: 'https://drive.google.com/file/d/12qr3XjspgwhyCaF_QNh40zvDs6mH-428/preview',
        ppt: 'https://docs.google.com/presentation/d/1SKjtGXdEzIA-AInkF9qthLALxEfVCWoU/edit?usp=drive_link&ouid=112336225419335604944&rtpof=true&sd=true'
    }
};

window.openSummaryModal = function(year) {
    document.getElementById('summaryModalTitle').innerText = 'موجز أنشطة ' + year;
    document.getElementById('summaryPdfIframe').src = SUMMARY_LINKS[year].pdf;
    document.getElementById('summaryPptDownloadBtn').href = SUMMARY_LINKS[year].ppt;
    document.getElementById('summaryViewModal').classList.remove('hidden');
};

window.closeSummaryModal = function() {
    document.getElementById('summaryViewModal').classList.add('hidden');
    document.getElementById('summaryPdfIframe').src = '';
};

// -------------------------------------------------------------------
// سجل الحضور
// -------------------------------------------------------------------
window.navigateToAttendanceLogs = function() {
    document.getElementById('adminScreen').classList.add('hidden');
    document.getElementById('attendanceLogsScreen').classList.remove('hidden');
    window.fetchAndBuildAttendanceButtons();
};

window.goBackToAdminFromLogs = function() {
    document.getElementById('attendanceLogsScreen').classList.add('hidden');
    document.getElementById('adminScreen').classList.remove('hidden');
};

window.fetchAndBuildAttendanceButtons = function() {
    const monthsContainer = document.getElementById('attendanceMonthsContainer');
    const daysContainer = document.getElementById('attendanceDaysContainer');
    
    monthsContainer.innerHTML = window.getNiceLoaderHtml("جاري جلب سجلات الحضور...");
    monthsContainer.classList.remove('hidden');
    daysContainer.classList.add('hidden');
    document.getElementById('attendanceScreenTitle').innerText = "سجلات الحضور (الأشهر)";
    document.getElementById('attendanceBackBtn').onclick = window.goBackToAdminFromLogs;

    fetch(GAS_API_URL).then(function(response) { return response.json(); }).then(function(data) {
        monthsContainer.innerHTML = '';
        window.groupedAttendanceData = {}; 
        if (data.error) { monthsContainer.innerHTML = '<div class="text-center p-15" style="color:var(--error); grid-column: 1 / -1;">حدث خطأ: ' + data.error + '</div>'; return; }
        if (!data || data.length === 0) { monthsContainer.innerHTML = '<div class="text-center p-15" style="grid-column: 1 / -1;">لا توجد سجلات مؤرشفة.</div>'; return; }
        window.fetchedAttendanceLogs = data;
        data.forEach(function(log, index) {
            let cleanDateStr = String(log.date).split('T')[0];
            let dateParts = cleanDateStr.split('-');
            if (dateParts.length === 3) {
                let year = dateParts[0]; let month = parseInt(dateParts[1]); let monthYearKey = 'شهر ' + month + ' - ' + year;
                if (!window.groupedAttendanceData[monthYearKey]) window.groupedAttendanceData[monthYearKey] = [];
                
                let item = { originalIndex: index, cleanDate: cleanDateStr };
                for (let k in log) { item[k] = log[k]; }
                window.groupedAttendanceData[monthYearKey].push(item);
            }
        });
        window.renderMonthsFolders();
    }).catch(function(err) { 
        monthsContainer.innerHTML = '<div class="text-center p-15" style="color:var(--error); grid-column: 1 / -1;">فشل الاتصال بقاعدة البيانات! ⚠️</div>'; 
    });
};

window.renderMonthsFolders = function() {
    const monthsContainer = document.getElementById('attendanceMonthsContainer');
    const daysContainer = document.getElementById('attendanceDaysContainer');
    monthsContainer.classList.remove('hidden');
    daysContainer.classList.add('hidden');
    document.getElementById('attendanceScreenTitle').innerText = "سجلات الحضور (الأشهر)";
    document.getElementById('attendanceBackBtn').onclick = window.goBackToAdminFromLogs;
    monthsContainer.innerHTML = '';
    const monthsKeys = Object.keys(window.groupedAttendanceData).reverse();
    monthsKeys.forEach(function(monthKey) {
        const btn = document.createElement('button'); btn.className = 'panel-card square-btn saji-hover-card';
        btn.innerHTML = '<div class="card-icon">📁</div><h3 style="direction: ltr;">' + monthKey + '</h3>';
        btn.onclick = function() { window.renderDaysCapsules(monthKey); }; 
        monthsContainer.appendChild(btn);
    });
};

window.renderDaysCapsules = function(monthKey) {
    const monthsContainer = document.getElementById('attendanceMonthsContainer');
    const daysContainer = document.getElementById('attendanceDaysContainer');
    monthsContainer.classList.add('hidden');
    daysContainer.classList.remove('hidden');
    document.getElementById('attendanceScreenTitle').innerText = "تفاصيل الشهر";
    document.getElementById('attendanceBackBtn').onclick = window.renderMonthsFolders;
    daysContainer.innerHTML = '';

    let html = '<div class="open-folder-container"><div class="open-folder-header"><div class="folder-tab">📂 سجلات ' + monthKey + '</div></div><div class="open-folder-body"><div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; width: 100%;">';
    const monthDays = window.groupedAttendanceData[monthKey].slice().reverse();
    monthDays.forEach(function(log) {
        html += '<button class="panel-btn saji-hover-card" style="border-radius: 12px; padding: 10px; display: flex; flex-direction: column; align-items: center; justify-content: center; line-height: 1.4;" onclick="window.openAttendanceDetailModal(' + log.originalIndex + ')"><strong style="font-size: 1rem;">' + log.day + '</strong><span style="font-size: 0.75rem; color: var(--gold); letter-spacing: 0.5px;">' + log.cleanDate + '</span></button>';
    });
    html += '</div></div></div>';
    daysContainer.innerHTML = html;
};

window.openAttendanceDetailModal = function(originalIndex) {
    const log = window.fetchedAttendanceLogs[originalIndex];
    if (!log) return;
    let cleanDateStr = String(log.date).split('T')[0];
    document.getElementById('attendanceModalTitle').innerHTML = 'سجل حضور يوم ' + log.day + '<br><span style="font-size:1rem; color:var(--text-muted);">(' + cleanDateStr + ')</span>';
    let formattedText = log.text.replace(/\*/g, '').replace(/--------------------------/g, '══════════════════════');
    document.getElementById('attendanceModalTextContent').innerText = formattedText;
    document.getElementById('attendanceModalPdfBtn').href = log.pdfUrl;
    document.getElementById('attendanceDetailModal').classList.remove('hidden');
};

window.closeAttendanceDetailModal = function() { 
    document.getElementById('attendanceDetailModal').classList.add('hidden'); 
};

// =========================================================================
// محرك تقييم المشاركات الديناميكي والذكاء المحلي الفائق (خصوصية 100%)
// =========================================================================

window.overallFormsChartInstance = null;
window.formsTrendChartInstance = null;
window.kaderParticipationChartInstance = null;
window.lastParticipationStats = null;
window.currentStatsContext = { scope: 'overall', type: 'tajammu', monthKey: null };

// تطبيع خفيف يحافظ على الكُنى والألقاب لفحص المرادفات بدقة
window.lightNormalizeArabic = function(str) {
    if (!str) return "";
    let s = String(str).trim();
    s = s.replace(/^[\d\-\.\)\(\•\*\_–—]+/, '').trim();
    s = s.replace(/\((.*?)\)/g, '').trim();
    s = s.replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي').replace(/ؤ/g, 'و').replace(/ئ/g, 'ي');
    s = s.replace(/ابا\s+/g, 'ابو ').replace(/^ابا$/, 'ابو');
    s = s.replace(/عبد\s+/g, 'عبد');
    s = s.replace(/ابو\s+ال/g, 'ابو ال');
    s = s.replace(/\s+/g, ' ').trim();
    return s;
};

// تطبيع عميق للمقارنة الصوتية والجذرية (يوحد ض/ظ ويزيل الألقاب العامة)
window.normalizeNameForMatching = function(str, keepTitles = false) {
    if (!str) return "";
    let s = window.lightNormalizeArabic(str);
    if (!keepTitles) {
        const prefixes = ["السيد ", "سيد ", "الشيخ ", "شيخ ", "الاخ ", "اخ ", "القائد ", "قائد ", "الكشاف ", "كشاف ", "الجوال ", "جوال ", "الاستاذ ", "استاذ ", "الحاج ", "حاج ", "الملا ", "ملا ", "دكتور ", "د. ", "م. "];
        for (let p of prefixes) {
            if (s.startsWith(p)) {
                s = s.substring(p.length).trim();
            }
        }
    }
    s = s.replace(/ض/g, 'ظ');
    s = s.replace(/\s+/g, ' ').trim();
    return s;
};

// حساب المسافة الإملائية (Levenshtein) لاكتشاف الأخطاء المطبعية البسيطة
window.getEditDistance = function(a, b) {
    if (a === b) return 0;
    if (!a.length) return b.length;
    if (!b.length) return a.length;
    const matrix = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
            }
        }
    }
    return matrix[b.length][a.length];
};

// فحص ما إذا كان الاسم ينتمي لإحدى مجموعات الكُنى والمرادفات المعتمدة للكادر
window.findIdentityGroup = function(rawName) {
    let lightInput = window.lightNormalizeArabic(rawName);
    let deepInput = window.normalizeNameForMatching(rawName, false);
    if (!lightInput) return null;

    for (let group of window.IDENTITY_GROUPS) {
        for (let alias of group.aliases) {
            let lightAlias = window.lightNormalizeArabic(alias);
            let deepAlias = window.normalizeNameForMatching(alias, false);

            if (lightInput === lightAlias || deepInput === deepAlias) {
                return group;
            }
            if (lightAlias.includes(' ') && (lightInput.startsWith(lightAlias + ' ') || lightAlias.startsWith(lightInput + ' '))) {
                if (lightInput.split(' ').length >= 2) return group;
            }
        }
    }
    return null;
};

// إيجاد العضو الرسمي في سجل الكادر المطابق لمجموعة الهوية
window.findOfficialMemberForGroup = function(group, officialKeys) {
    if (!group || !officialKeys || officialKeys.length === 0) return null;

    for (let off of officialKeys) {
        let lightOff = window.lightNormalizeArabic(off);
        let deepOff = window.normalizeNameForMatching(off, false);

        for (let alias of group.aliases) {
            let lightAlias = window.lightNormalizeArabic(alias);
            let deepAlias = window.normalizeNameForMatching(alias, false);

            if (lightOff === lightAlias || deepOff === deepAlias) return off;
            if (lightOff.startsWith(lightAlias + ' ') || deepOff.startsWith(deepAlias + ' ')) return off;
            if (lightAlias.startsWith(lightOff + ' ') || deepAlias.startsWith(deepOff + ' ')) return off;
        }
    }

    let canonWords = window.normalizeNameForMatching(group.canonical, false).split(' ').filter(Boolean);
    if (canonWords.length >= 2) {
        for (let off of officialKeys) {
            let offWords = window.normalizeNameForMatching(off, false).split(' ').filter(Boolean);
            if (offWords.length >= 2 && offWords[0] === canonWords[0] && offWords[1] === canonWords[1]) {
                return off;
            }
        }
    }
    return null;
};

// محرك المطابقة الذكي الشامل (يطبق الكُنى والمرادفات حصرياً على سجل الكادر فقط ولا يعطيها للمتطوعين)
window.resolveParticipantEntity = function(rawName) {
    let cleanOrig = String(rawName || '').replace(/^[\d\-\.\)\(\•\*\_–—]+/, '').trim();
    if (!cleanOrig || cleanOrig.length < 3 || cleanOrig === "لا يوجد" || cleanOrig === "-") return null;

    let lightInput = window.lightNormalizeArabic(cleanOrig);
    let normInput = window.normalizeNameForMatching(cleanOrig, false);
    if (!lightInput || lightInput.length < 3) return null;

    const officialKeys = Object.keys(window.MEMBERS_DATABASE || {});

    // 0. فحص التطابق الحرفي المباشر مع سجل الكادر
    for (let off of officialKeys) {
        if (cleanOrig === off || window.lightNormalizeArabic(off) === lightInput) {
            return { isKader: true, name: off, rawWritten: cleanOrig, reason: cleanOrig !== off ? "توحيد الهمزات والكتابة (كادر)" : null };
        }
    }

    // 1. فحص مجموعات الهوية والكُنى المعتمدة (تُعطى فقط للكادر المسجلين في قاعدة البيانات)
    let matchedGroup = window.findIdentityGroup(cleanOrig);
    if (matchedGroup) {
        let offMatch = window.findOfficialMemberForGroup(matchedGroup, officialKeys);
        if (offMatch) {
            return {
                isKader: true,
                name: offMatch,
                rawWritten: cleanOrig,
                reason: cleanOrig !== offMatch ? `مطابقة كنية/مرادف للكادر (${cleanOrig} ⬅️ ${offMatch})` : null
            };
        }
        // إذا لم يكن في سجل الكادر، لا نعطيه كنية ولا مرادفاً، بل يذهب للمتطوعين باسمه المكتوب كما هو
    }

    // 2. فحص القاموس المكتسب للكادر خلال الجلسة الحالية (SESSION_LEARNED_ALIASES)
    if (window.SESSION_LEARNED_ALIASES[cleanOrig] || window.SESSION_LEARNED_ALIASES[normInput]) {
        let target = window.SESSION_LEARNED_ALIASES[cleanOrig] || window.SESSION_LEARNED_ALIASES[normInput];
        if (officialKeys.includes(target)) {
            return {
                isKader: true,
                name: target,
                rawWritten: cleanOrig,
                reason: `تدقيق ذكي للكادر (${cleanOrig} ⬅️ ${target})`
            };
        }
    }

    // 3. التطابق بعد إزالة الألقاب وتوحيد (ض/ظ) مع سجل الكادر
    for (let off of officialKeys) {
        let normOff = window.normalizeNameForMatching(off, false);
        if (normOff === normInput && normOff.length >= 3) {
            return {
                isKader: true,
                name: off,
                rawWritten: cleanOrig,
                reason: `مطابقة إملائية للكادر (${cleanOrig} ⬅️ ${off})`
            };
        }
    }

    // 4. استنتاج الكنية الذكي من حقل (أسماء الأبناء) لأعضاء سجل الكادر فقط
    if (lightInput.startsWith("ابو ") && lightInput.split(' ').length === 2) {
        let childName = lightInput.split(' ')[1];
        if (childName && childName.length >= 3 && childName !== "الحسن") {
            let candidateMembers = [];
            for (let off of officialKeys) {
                let mObj = window.MEMBERS_DATABASE[off];
                if (mObj && mObj.basic) {
                    let childrenRow = mObj.basic.find(b => b.label && (b.label.includes("أبناء") || b.label.includes("ابناء")));
                    if (childrenRow && childrenRow.val) {
                        let cleanedKids = window.lightNormalizeArabic(window.cleanChildrenNames(childrenRow.val));
                        let kidWords = cleanedKids.split(/\s+و\s+|\s+/);
                        if (kidWords.includes(childName)) {
                            candidateMembers.push(off);
                        }
                    }
                }
            }
            if (candidateMembers.length === 1) {
                return {
                    isKader: true,
                    name: candidateMembers[0],
                    rawWritten: cleanOrig,
                    reason: `استنتاج الكنية من سجل أبناء الكادر (${cleanOrig} ⬅️ ${candidateMembers[0]})`
                };
            }
        }
    }

    // 5. المطابقة الجزئية والمرونة الإملائية مع سجل الكادر فقط
    let inputWords = normInput.split(' ').filter(Boolean);
    if (inputWords.length === 1 && inputWords[0].length >= 4) {
        let singleMatches = officialKeys.filter(off => {
            let offWords = window.normalizeNameForMatching(off, false).split(' ').filter(Boolean);
            return offWords.length > 0 && offWords[0] === inputWords[0];
        });
        if (singleMatches.length === 1) {
            return {
                isKader: true,
                name: singleMatches[0],
                rawWritten: cleanOrig,
                reason: `مطابقة الاسم المفرد للكادر (${cleanOrig} ⬅️ ${singleMatches[0]})`
            };
        }
    }

    if (inputWords.length >= 2) {
        let bestKaderMatch = null;
        let maxScore = 0;

        for (let off of officialKeys) {
            let offWords = window.normalizeNameForMatching(off, false).split(' ').filter(Boolean);
            if (offWords.length === 0) continue;

            let firstWordMatch = (inputWords[0] === offWords[0]) ||
                (inputWords[0].length >= 5 && offWords[0].length >= 5 && window.getEditDistance(inputWords[0], offWords[0]) <= 1);
            if (!firstWordMatch) continue;

            let score = 1;
            for (let i = 1; i < inputWords.length; i++) {
                let iw = inputWords[i];
                let iwNoAl = iw.startsWith("ال") && iw.length > 4 ? iw.substring(2) : iw;
                if (iw.length < 3) continue;

                for (let j = 1; j < offWords.length; j++) {
                    let ow = offWords[j];
                    let owNoAl = ow.startsWith("ال") && ow.length > 4 ? ow.substring(2) : ow;

                    if (ow === iw || owNoAl === iwNoAl ||
                        (iw.length >= 4 && ow.startsWith(iw)) ||
                        (ow.length >= 4 && iw.startsWith(ow)) ||
                        (iw.length >= 4 && ow.length >= 4 && window.getEditDistance(iw, ow) <= 1)) {
                        score += (i === 1 && j === 1) ? 2.5 : 2;
                        break;
                    }
                }
            }

            if (score >= 2.5 && score > maxScore) {
                maxScore = score;
                bestKaderMatch = off;
            }
        }

        if (bestKaderMatch) {
            return {
                isKader: true,
                name: bestKaderMatch,
                rawWritten: cleanOrig,
                reason: cleanOrig !== bestKaderMatch ? `مطابقة ذكية لاسم الكادر (${cleanOrig} ⬅️ ${bestKaderMatch})` : null
            };
        }
    }

    // 6. إذا لم يُعثر عليه في سجل الكادر، يُصنف كمتطوع باسمه كما هو (دون إعطائه كنيات أو مرادفات الكادر)
    return { isVolunteer: true, name: cleanOrig, norm: lightInput, rawWritten: cleanOrig, reason: null };
};

// استخراج كافة المشاركين من قائمة الاستمارات مع إبقاء كل أعضاء الكادر في التقييم وتوثيق تعديلات الكادر
window.analyzeParticipantsFromForms = function(formsList) {
    let kaderCounts = {};
    let volunteerGroups = {};
    let auditChangesMap = {}; // يوثق التغييرات والكنيات الخاصة بالكادر فقط

    // إدراج جميع أعضاء الكادر المسجلين حالياً في الموقع ضمن التقييم
    Object.keys(window.MEMBERS_DATABASE || {}).forEach(k => {
        kaderCounts[k] = 0;
    });

    formsList.forEach(item => {
        let form = item.form || item;
        let rawStrings = [];

        for (let key in form) {
            let k = String(key);
            if (k.includes("اسماء") || k.includes("أسماء") || k.includes("مشاركين") || k.includes("المشاركين") || k.includes("الحضور") || k.includes("الكادر المشارك") || k.includes("الاعضاء") || k.includes("الأعضاء")) {
                if (form[key] && String(form[key]).trim() !== "" && String(form[key]).trim() !== "لا يوجد") {
                    rawStrings.push(String(form[key]));
                }
            }
        }

        let uniqueInSingleForm = new Set();

        rawStrings.forEach(rawText => {
            let parts = rawText.split(/[\r\n,،؛\/\|•]+|\s+-\s+|\s+–\s+|\s+و\s+(?=[أ-ي])/);
            parts.forEach(p => {
                let cleaned = p.replace(/^\d+[\-\.\)\s]+/, '').trim();
                if (!cleaned || cleaned.length < 3 || /^\d+$/.test(cleaned)) return;

                let resolved = window.resolveParticipantEntity(cleaned);
                if (!resolved) return;

                if (resolved.isKader) {
                    // توثيق تغييرات وكنيات الكادر فقط
                    if (resolved.reason && resolved.rawWritten !== resolved.name) {
                        let changeKey = `${resolved.rawWritten}==>:${resolved.name}`;
                        if (!auditChangesMap[changeKey]) {
                            auditChangesMap[changeKey] = {
                                from: resolved.rawWritten,
                                to: resolved.name,
                                reason: resolved.reason,
                                category: "كادر",
                                count: 0
                            };
                        }
                        auditChangesMap[changeKey].count++;
                    }

                    let uKey = "K_" + resolved.name;
                    if (!uniqueInSingleForm.has(uKey)) {
                        uniqueInSingleForm.add(uKey);
                        kaderCounts[resolved.name] = (kaderCounts[resolved.name] || 0) + 1;
                    }
                } else if (resolved.isVolunteer) {
                    // المتطوعون يبقون بأسمائهم الصريحة بدون تطبيق كنيات الكادر عليهم
                    let vKey = resolved.norm;
                    let uKey = "V_" + vKey;
                    if (!uniqueInSingleForm.has(uKey)) {
                        uniqueInSingleForm.add(uKey);
                        if (!volunteerGroups[vKey]) {
                            volunteerGroups[vKey] = { displayName: resolved.name, count: 0 };
                        }
                        volunteerGroups[vKey].count++;
                    }
                }
            });
        });
    });

    // ترتيب جميع أعضاء الكادر من الأكثر مشاركة إلى الأقل
    let sortedKader = Object.entries(kaderCounts).sort((a, b) => {
        if (b[1] !== a[1]) return b[1] - a[1];
        return a[0].localeCompare(b[0], 'ar');
    });

    let sortedVolunteers = Object.values(volunteerGroups).sort((a, b) => b.count - a.count);
    let auditChangesList = Object.values(auditChangesMap).sort((a, b) => b.count - a.count);

    return {
        kader: sortedKader,
        volunteers: sortedVolunteers,
        auditChanges: auditChangesList,
        totalForms: formsList.length
    };
};

window.analyzeInstitutionsData = function(formsList) {
    let counts = {};
    formsList.forEach(item => {
        let form = item.form || item; 
        let instName = "أخرى (غير محددة)";
        for (let key in form) {
            let lowerKey = String(key).toLowerCase();
            if (lowerKey.includes("مؤسسة") || lowerKey.includes("المؤسسة") || lowerKey.includes("جهة") || lowerKey.includes("فرقة")) {
                if (form[key] && String(form[key]).trim() !== "") {
                    instName = String(form[key]).trim();
                    break; 
                }
            }
        }
        counts[instName] = (counts[instName] || 0) + 1;
    });
    return counts;
};

window.analyzeTrendData = function() {
    let allMonthKeys = Object.keys(window.currentFormsGroups).filter(k => k !== "غير مصنف");
    allMonthKeys.sort((a, b) => {
        let [mA, yA] = a.replace('شهر ', '').split(' - ').map(Number);
        let [mB, yB] = b.replace('شهر ', '').split(' - ').map(Number);
        if (yA !== yB) return yA - yB;
        return mA - mB;
    });

    let institutions = new Set();
    let trendDataByMonth = {}; 

    allMonthKeys.forEach(mk => {
        trendDataByMonth[mk] = {};
        let formsList = window.currentFormsGroups[mk].map(item => item.form);
        let counts = window.analyzeInstitutionsData(formsList); 
        for (let inst in counts) {
            institutions.add(inst);
            trendDataByMonth[mk][inst] = counts[inst];
        }
    });

    let datasets = [];
    let instArray = Array.from(institutions);
    let bgColors = ['#E63946', '#1D3557', '#2A9D8F', '#E9C46A', '#F4A261', '#9C89B8', '#0077B6', '#D90429', '#00B4D8', '#8338EC', '#38B000', '#FF006E', '#FFBE0B', '#3A0CA3', '#06D6A0', '#118AB2', '#073B4C', '#7209B7', '#4CC9F0', '#F15BB5'];

    instArray.forEach((inst, index) => {
        let data = allMonthKeys.map(mk => trendDataByMonth[mk][inst] || 0);
        let color = bgColors[index % bgColors.length];
        datasets.push({
            label: inst,
            data: data,
            backgroundColor: color,
            borderColor: color,
            borderWidth: 1,
            borderRadius: 5,
            maxBarThickness: 32
        });
    });

    return { labels: allMonthKeys, datasets: datasets };
};

// إعادة بناء مجموعات الأشهر للاستمارات عند التحديث الفوري
window.rebuildCurrentFormsGroups = function(type) {
    const forms = window.allFormsData[type] || [];
    window.currentFormsGroups = {};
    forms.forEach(function(form, index) {
        let dateVal = "بدون تاريخ";
        if(type === 'planning' && form.timestamp) {
            let strVal = String(form.timestamp);
            let matchYMD = strVal.match(/\d{4}[-/]\d{1,2}[-/]\d{1,2}/);
            let matchDMY = strVal.match(/\d{1,2}[-/]\d{1,2}[-/]\d{4}/);
            if (matchYMD) dateVal = matchYMD[0].replace(/\//g, '-');
            else if (matchDMY) { let p = matchDMY[0].split(/[-/]/); dateVal = p[2] + '-' + p[1].padStart(2,'0') + '-' + p[0].padStart(2,'0'); }
            else { dateVal = strVal.split(' ')[0]; }
        } else {
            for (let key in form) {
                if (key.includes("التاريخ") || key.includes("تاريخ") || key.includes("Timestamp") || key.includes("طابع")) {
                    let strVal = String(form[key]);
                    let matchYMD = strVal.match(/\d{4}[-/]\d{1,2}[-/]\d{1,2}/);
                    let matchDMY = strVal.match(/\d{1,2}[-/]\d{1,2}[-/]\d{4}/);
                    if (matchYMD) dateVal = matchYMD[0].replace(/\//g, '-');
                    else if (matchDMY) { let p = matchDMY[0].split(/[-/]/); dateVal = p[2] + '-' + p[1].padStart(2,'0') + '-' + p[0].padStart(2,'0'); }
                    break;
                }
            }
        }
        let parts = dateVal.split('-');
        let monthYear = parts.length >= 2 && parts[0] !== "بدون" ? 'شهر ' + parseInt(parts[1]) + ' - ' + parts[0] : "غير مصنف";
        if(!window.currentFormsGroups[monthYear]) window.currentFormsGroups[monthYear] = [];
        window.currentFormsGroups[monthYear].push({ form: form, cleanDate: dateVal, originalIndex: index });
    });
};

// دالة المزامنة الفورية للإحصاءات عند إضافة/حذف عضو أو استمارة جديدة
window.syncAndRefreshStatsLive = async function(showToast = true) {
    const syncBtn = document.getElementById('liveSyncStatsBtn');
    if (syncBtn) {
        syncBtn.disabled = true;
        syncBtn.innerHTML = '⏳ جاري التحديث...';
    }

    await Promise.all([
        window.refreshMembersDatabaseSilently(),
        window.refreshFormsDataSilently()
    ]);

    window._lastDataSignature = window.computeCurrentDataSignature();

    let ctx = window.currentStatsContext;
    if (ctx && ctx.type) {
        window.rebuildCurrentFormsGroups(ctx.type);
        if (!document.getElementById('formsStatsScreen')?.classList.contains('hidden')) {
            window.renderFormsCharts(ctx.scope, ctx.type, ctx.monthKey);
        }
    }

    if (syncBtn) {
        syncBtn.disabled = false;
        syncBtn.innerHTML = '🔄 تحديث فوري للبيانات';
    }
    if (showToast) {
        window.showNotification("✅ تم تحديث سجل الأعضاء والاستمارات والإحصاءات بنجاح!");
    }
};

window.openFormsStatsScreen = async function(scope, type, monthKey = null) {
    window.currentStatsContext = { scope, type, monthKey };

    ['formsMonthsScreen', 'formsListScreen'].forEach(id => {
        let el = document.getElementById(id);
        if(el) el.classList.add('hidden');
    });

    let statsScreen = document.getElementById('formsStatsScreen');
    if (!statsScreen) {
        statsScreen = document.createElement('div');
        statsScreen.id = 'formsStatsScreen';
        statsScreen.className = 'screen hidden';
        document.getElementById('dashboardScreen').parentNode.insertBefore(statsScreen, document.getElementById('formsMonthsScreen').nextSibling);
    }

    let title = scope === 'overall' ? 'الإحصائيات الكلية (' + (type === 'tajammu' ? 'التجمع' : 'الكشافة') + ')' : 'إحصائيات ' + monthKey;
    let backFn = scope === 'overall' ? "window.closeFormsStatsScreen('overall')" : "window.closeFormsStatsScreen('monthly')";

    let html = `
        <div class="view-header panel-card saji-border mb-20" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
            <h3 class="primary-title">${title}</h3>
            <div style="display:flex; gap:8px; align-items:center;">
                <button class="panel-btn mini-btn" id="liveSyncStatsBtn" style="border-color:var(--saji-main); color:var(--gold);" onclick="window.syncAndRefreshStatsLive(true)">🔄 تحديث فوري للبيانات</button>
                <button class="panel-btn mini-btn" onclick="${backFn}">↩ العودة للفولدرات</button>
            </div>
        </div>
        <div style="display: flex; flex-direction: column; gap: 20px; width: 100%; max-width: 1050px; margin: 0 auto;">
            <div class="panel-card saji-border p-15" style="width: 100%; box-sizing: border-box;">
                <h4 class="text-center mb-15 gold-text" style="font-size: 1.15rem;">📊 نسبة الإنجاز (كل مؤسسة)</h4>
                <div style="position: relative; min-height: 360px; height: 42vh; max-height: 440px; width: 100%; display: flex; justify-content: center; align-items: center;">
                    <canvas id="formsDoughnutChart"></canvas>
                </div>
            </div>
    `;

    if (scope === 'overall') {
        html += `
            <div class="panel-card saji-border p-15" style="width: 100%; box-sizing: border-box;">
                <h4 class="text-center mb-15 gold-text" style="font-size: 1.15rem;">📈 مقارنة أنشطة المؤسسات عبر الأشهر (أعمدة)</h4>
                <div style="position: relative; min-height: 380px; height: 46vh; max-height: 480px; width: 100%;">
                    <canvas id="formsTrendChart"></canvas>
                </div>
            </div>
        `;
    }

    html += `
            <div class="panel-card saji-border p-15" style="width: 100%; box-sizing: border-box;">
                <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 10px; margin-bottom: 12px; border-bottom: 1px solid rgba(0, 180, 216, 0.2); padding-bottom: 10px;">
                    <div>
                        <h4 class="gold-text" style="font-size: 1.15rem; margin: 0;">🛡️ تقييم المشاركات في الأنشطة (ديناميكي وتلقائي)</h4>
                        <span style="font-size: 0.75rem; color: var(--text-muted);">🔒 معالجة ذكية محلية 100% داخل الموقع (خصوصية تامة دون مشاركة أو حفظ خارجي)</span>
                    </div>
                    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                        <button class="pill-action-btn" id="aiResolveNamesBtn" style="background: linear-gradient(135deg, #0077B6, #00B4D8); color: #fff; border: none; padding: 7px 14px; font-size: 0.82rem; border-radius: 20px; box-shadow: 0 3px 10px rgba(0,180,216,0.25);" onclick="window.runAiSmartNameResolution()">🤖 تدقيق كنيات وأسماء الكادر</button>
                        <button class="pill-action-btn" id="aiEvaluateParticipationBtn" style="background: linear-gradient(135deg, #10b981, #059669); color: #fff; border: none; padding: 7px 14px; font-size: 0.82rem; border-radius: 20px; box-shadow: 0 3px 10px rgba(16,185,129,0.25);" onclick="window.runAiParticipationReport()">✨ التحليل التفاعلي الشامل</button>
                    </div>
                </div>

                <!-- ملخص الحالة وعلامات اللون الأحمر -->
                <div id="kaderStatusSummaryBar" style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px;"></div>

                <!-- صندوق نتائج التدقيق والتغييرات والتقرير الذكي -->
                <div id="aiParticipationInsightBox" class="hidden" style="margin-bottom: 15px; padding: 14px; border-radius: 10px; background: rgba(0, 180, 216, 0.08); border: 1px solid var(--saji-main); font-size: 0.9rem; line-height: 1.7;"></div>

                <div id="kaderChartWrap" style="position: relative; width: 100%; min-height: 350px;">
                    <canvas id="kaderParticipationChart"></canvas>
                </div>
            </div>

            <!-- بطاقة مشاركات المتطوعين والمساندين -->
            <div class="panel-card saji-border p-15" style="width: 100%; box-sizing: border-box;">
                <h4 class="text-center mb-15 gold-text" style="font-size: 1.1rem;">🌟 مشاركات المتطوعين والمساندين</h4>
                <div id="volunteersStatsGrid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 8px; max-height: 400px; overflow-y: auto; padding: 4px;"></div>
            </div>
        </div>
    `;

    statsScreen.innerHTML = html;
    statsScreen.classList.remove('hidden');

    window.renderFormsCharts(scope, type, monthKey);
    window.startAutoLiveStatsWatcher();

    // مزامنة تلقائية في الخلفية فور فتح الشاشة لضمان التقاط أي عضو جديد/محذوف أو استمارة جديدة دون تدخل
    window.syncAndRefreshStatsLive(false);
};

window.closeFormsStatsScreen = function(scope) {
    document.getElementById('formsStatsScreen').classList.add('hidden');
    if (scope === 'overall') document.getElementById('formsMonthsScreen').classList.remove('hidden');
    else document.getElementById('formsListScreen').classList.remove('hidden');
};

window.renderFormsCharts = function(scope, type, monthKey) {
    const isDark = !document.body.classList.contains('light-mode');
    const textColor = isDark ? '#FFFFFF' : '#0B132B';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)';

    let formsList = scope === 'overall' ? (window.allFormsData[type] || []) : ((window.currentFormsGroups[monthKey] || []).map(item => item.form));
    let counts = window.analyzeInstitutionsData(formsList);
    let totalActivities = Object.values(counts).reduce((a, b) => a + b, 0);
    
    let labels = Object.keys(counts).map(name => `${name} (${counts[name]})`);
    let data = Object.values(counts);
    let bgColors = ['#E63946', '#1D3557', '#2A9D8F', '#E9C46A', '#F4A261', '#9C89B8', '#0077B6', '#D90429', '#00B4D8', '#8338EC', '#38B000', '#FF006E', '#FFBE0B', '#3A0CA3', '#06D6A0', '#118AB2', '#073B4C', '#7209B7', '#4CC9F0', '#F15BB5'];

    if(window.overallFormsChartInstance) window.overallFormsChartInstance.destroy();
    
    let dCanvas = document.getElementById('formsDoughnutChart');
    if (dCanvas) {
        let ctxD = dCanvas.getContext('2d');
        window.overallFormsChartInstance = new Chart(ctxD, {
            type: 'doughnut',
            data: { labels: labels, datasets: [{ data: data, backgroundColor: bgColors, borderWidth: 2, borderColor: isDark ? '#1C2541' : '#FFFFFF' }] },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '64%',
                layout: { padding: 10 },
                plugins: { 
                    legend: { 
                        position: 'bottom', 
                        rtl: true,
                        labels: { font: { family: 'Segoe UI', size: 13, weight: 'bold' }, color: textColor, padding: 15, boxWidth: 16 } 
                    },
                    centerText: { text: totalActivities + "\nنشاط", color: textColor }
                }
            }
        });
    }

    if (scope === 'overall') {
        let trendData = window.analyzeTrendData();
        if(window.formsTrendChartInstance) window.formsTrendChartInstance.destroy();
        
        let tCanvas = document.getElementById('formsTrendChart');
        if (tCanvas) {
            let ctxT = tCanvas.getContext('2d');
            window.formsTrendChartInstance = new Chart(ctxT, {
                type: 'bar',
                data: { labels: trendData.labels, datasets: trendData.datasets },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { 
                        legend: { position: 'bottom', rtl: true, labels: { font: { family: 'Segoe UI', size: 12, weight: 'bold' }, color: textColor, padding: 12, boxWidth: 14 } },
                        tooltip: { rtl: true, callbacks: { label: function(context) { return ` ${context.dataset.label}: ${context.parsed.y} نشاط`; } } }
                    },
                    scales: { 
                        y: { beginAtZero: true, ticks: { stepSize: 1, color: textColor, font: { weight: 'bold' } }, grid: { color: gridColor } },
                        x: { ticks: { color: textColor, font: { family: 'Segoe UI', size: 12, weight: 'bold' } }, grid: { display: false } }
                    }
                }
            });
        }
    }

    window.renderParticipationVisuals(formsList);
};

window.renderParticipationVisuals = function(formsList) {
    const isDark = !document.body.classList.contains('light-mode');
    const textColor = isDark ? '#FFFFFF' : '#0B132B';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)';

    const stats = window.analyzeParticipantsFromForms(formsList);
    window.lastParticipationStats = stats;

    // تجهيز شريط الملخص وتمييز الأشخاص الذين عليهم علامة حمراء
    const summaryBar = document.getElementById('kaderStatusSummaryBar');
    let redMembersList = [];
    let activeParticipatingCount = 0;
    let activeZeroCount = 0;

    stats.kader.forEach(item => {
        let memberName = item[0];
        let count = item[1];
        let isRed = window.isMemberInactive(memberName, window.MEMBERS_DATABASE[memberName]);
        if (isRed) {
            redMembersList.push({ name: memberName, count: count });
        } else if (count > 0) {
            activeParticipatingCount++;
        } else {
            activeZeroCount++;
        }
    });

    if (summaryBar) {
        let redBadgesHtml = redMembersList.map(rm =>
            `<span style="background: rgba(239,68,68,0.18); border: 1px solid #ef4444; color: #ef4444; padding: 2px 8px; border-radius: 12px; font-size: 0.76rem; font-weight: bold;">🔴 ${rm.name} (${rm.count})</span>`
        ).join(' ');

        summaryBar.innerHTML = `
            <div style="display:flex; flex-wrap:wrap; gap:8px; width:100%; align-items:center; justify-content:space-between; background:rgba(0,0,0,0.12); padding:8px 12px; border-radius:8px; border:1px solid rgba(0,180,216,0.15);">
                <div style="display:flex; flex-wrap:wrap; gap:12px; font-size:0.8rem; font-weight:bold;">
                    <span style="color:#10b981;">🟢 كادر فعّال مشارك: ${activeParticipatingCount}</span>
                    <span style="color:#f59e0b;">🟠 كادر فعّال (0 مشاركة): ${activeZeroCount}</span>
                    <span style="color:#ef4444;">🔴 مؤشر بالأحمر في السجل: ${redMembersList.length}</span>
                    <span style="color:var(--gold);">🔄 كنيات ومرادفات الكادر المدمجة: ${stats.auditChanges.length}</span>
                </div>
                ${redMembersList.length > 0 ? `<div style="display:flex; flex-wrap:wrap; gap:5px; align-items:center; margin-top:4px; width:100%; border-top:1px dashed rgba(239,68,68,0.3); padding-top:6px;"><strong style="font-size:0.78rem; color:#ef4444;">⚠️ الأعضاء المؤشرون بالأحمر:</strong> ${redBadgesHtml}</div>` : ''}
            </div>
        `;
    }

    const chartWrap = document.getElementById('kaderChartWrap');
    if (window.kaderParticipationChartInstance) {
        window.kaderParticipationChartInstance.destroy();
    }

    if (stats.kader.length === 0) {
        chartWrap.style.minHeight = "100px";
        chartWrap.innerHTML = `<div class="text-center p-15" style="color: var(--text-muted);">لا توجد بيانات للكادر حالياً.</div>`;
    } else {
        let dynamicHeight = Math.max(360, stats.kader.length * 32);
        chartWrap.style.height = dynamicHeight + "px";
        chartWrap.innerHTML = `<canvas id="kaderParticipationChart"></canvas>`;

        // وضع علامة 🔴 واضحة على الأشخاص الذين عليهم أحمر في سجل الكادر
        let kLabels = stats.kader.map(item => {
            let memberName = item[0];
            let count = item[1];
            let pct = stats.totalForms > 0 ? Math.round((count / stats.totalForms) * 100) : 0;
            let isRed = window.isMemberInactive(memberName, window.MEMBERS_DATABASE[memberName]);
            if (isRed) {
                return `🔴 ${memberName} [أحمر] (${count} نشاط - ${pct}%)`;
            }
            return `${memberName} (${count} نشاط - ${pct}%)`;
        });

        let kCounts = stats.kader.map(item => item[1]);
        let barColors = stats.kader.map(item => {
            let isRed = window.isMemberInactive(item[0], window.MEMBERS_DATABASE[item[0]]);
            if (isRed) return '#ef4444'; // أحمر صريح لمن عليهم علامة حمراء
            return item[1] > 0 ? '#10b981' : 'rgba(245, 158, 11, 0.45)';
        });
        let borderColors = stats.kader.map(item => {
            let isRed = window.isMemberInactive(item[0], window.MEMBERS_DATABASE[item[0]]);
            if (isRed) return '#b91c1c';
            return item[1] > 0 ? '#059669' : '#f59e0b';
        });

        let ctxK = document.getElementById('kaderParticipationChart').getContext('2d');
        window.kaderParticipationChartInstance = new Chart(ctxK, {
            type: 'bar',
            data: {
                labels: kLabels,
                datasets: [{
                    label: 'عدد المشاركات',
                    data: kCounts,
                    backgroundColor: barColors,
                    borderColor: borderColors,
                    borderWidth: 1.5,
                    borderRadius: 6,
                    barThickness: 18
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        rtl: true,
                        callbacks: {
                            label: function(ctx) {
                                let item = stats.kader[ctx.dataIndex];
                                let isRed = item ? window.isMemberInactive(item[0], window.MEMBERS_DATABASE[item[0]]) : false;
                                let pct = stats.totalForms > 0 ? Math.round((ctx.parsed.x / stats.totalForms) * 100) : 0;
                                let redNote = isRed ? ' [🔴 مؤشر بالأحمر في السجل]' : '';
                                return ` شارك في ${ctx.parsed.x} نشاط من أصل ${stats.totalForms} (${pct}%)${redNote}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        max: stats.totalForms > 0 ? stats.totalForms : undefined,
                        ticks: { stepSize: 1, color: textColor, font: { weight: 'bold' } },
                        grid: { color: gridColor }
                    },
                    y: {
                        ticks: {
                            autoSkip: false,
                            color: function(context) {
                                let item = stats.kader[context.index];
                                if (item && window.isMemberInactive(item[0], window.MEMBERS_DATABASE[item[0]])) {
                                    return '#ef4444';
                                }
                                return textColor;
                            },
                            font: { family: 'Segoe UI', size: 12, weight: 'bold' }
                        },
                        grid: { display: false }
                    }
                }
            }
        });
    }

    // عرض جميع المتطوعين بالكامل
    const volGrid = document.getElementById('volunteersStatsGrid');
    if (volGrid) {
        if (stats.volunteers.length === 0) {
            volGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 15px; color: var(--text-muted);">لا توجد أسماء إضافية في هذا القسم.</div>`;
        } else {
            volGrid.innerHTML = stats.volunteers.map(v => `
                <div style="background: rgba(0, 180, 216, 0.08); border: 1px solid rgba(0, 180, 216, 0.28); border-radius: 8px; padding: 6px 10px; display: flex; justify-content: space-between; align-items: center; gap: 6px;">
                    <span style="font-size: 0.8rem; font-weight: bold; color: var(--text-main); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${v.displayName}">${v.displayName}</span>
                    <span style="background: var(--saji-main); color: #fff; font-size: 0.72rem; font-weight: bold; padding: 2px 8px; border-radius: 12px; flex-shrink: 0;">${v.count}</span>
                </div>
            `).join('');
        }
    }
};

// -------------------------------------------------------------------
// وظيفة الذكاء المحلي (1): تدقيق عميق لأسماء وكنيات الكادر فقط وعرض جدول التغييرات
// -------------------------------------------------------------------
window.runAiSmartNameResolution = async function() {
    const insightBox = document.getElementById('aiParticipationInsightBox');
    const btn = document.getElementById('aiResolveNamesBtn');
    if (!insightBox) return;

    btn.disabled = true;
    insightBox.classList.remove('hidden');
    insightBox.innerHTML = `<div style="color: var(--gold); font-weight: bold;">🤖 جاري الفحص العميق لأسماء وكُنى الكادر ومطابقة السجل محلياً... ⏳</div>`;

    await window.syncAndRefreshStatsLive(false);

    const officialNames = Object.keys(window.MEMBERS_DATABASE || {});
    let ctx = window.currentStatsContext;
    let formsList = ctx.scope === 'overall' ? (window.allFormsData[ctx.type] || []) : ((window.currentFormsGroups[ctx.monthKey] || []).map(item => item.form));

    // فحص ذكي إضافي للأسماء غير المعروفة لربطها بالكادر فقط إذا تطابق الاسم الأول واللقب/الأب
    let currentStats = window.analyzeParticipantsFromForms(formsList);

    currentStats.volunteers.forEach(vol => {
        let vNorm = window.normalizeNameForMatching(vol.displayName, false);
        let vWords = vNorm.split(' ').filter(Boolean);
        if (vWords.length >= 2) {
            let candidates = [];
            for (let off of officialNames) {
                let oNorm = window.normalizeNameForMatching(off, false);
                let oWords = oNorm.split(' ').filter(Boolean);
                if (oWords.length < 2) continue;

                let firstOk = (vWords[0] === oWords[0]) || (vWords[0].length >= 4 && window.getEditDistance(vWords[0], oWords[0]) <= 1);
                if (!firstOk) continue;

                let matchedSecond = false;
                for (let i = 1; i < vWords.length; i++) {
                    let vw = vWords[i].replace(/^ال/, '');
                    if (vw.length < 3) continue;
                    for (let j = 1; j < oWords.length; j++) {
                        let ow = oWords[j].replace(/^ال/, '');
                        if (vw === ow || (vw.length >= 4 && ow.length >= 4 && window.getEditDistance(vw, ow) <= 1)) {
                            matchedSecond = true;
                            break;
                        }
                    }
                }
                if (matchedSecond) candidates.push(off);
            }
            if (candidates.length === 1) {
                window.SESSION_LEARNED_ALIASES[vol.displayName] = candidates[0];
            }
        }
    });

    window.renderParticipationVisuals(formsList);
    const finalStats = window.lastParticipationStats;
    const changes = finalStats.auditChanges || [];
    btn.disabled = false;

    let changesRowsHtml = '';
    if (changes.length === 0) {
        changesRowsHtml = `<div style="padding:10px; text-align:center; color:var(--text-muted);">جميع أسماء الكادر في الاستمارات مكتوبة بصيغتها الرسمية المباشرة دون اختلافات.</div>`;
    } else {
        changesRowsHtml = `
            <div style="max-height: 290px; overflow-y: auto; margin-top: 8px; border: 1px solid rgba(0,180,216,0.25); border-radius: 8px;">
                <table class="modern-table" style="width:100%; font-size:0.82rem;">
                    <thead>
                        <tr>
                            <th>الاسم/الكنية المكتوبة في الاستمارة</th>
                            <th>تم إرجاعه لعضو الكادر الرسمي</th>
                            <th>سبب التدقيق</th>
                            <th>عدد المرات</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${changes.map(c => `
                            <tr>
                                <td style="color:#f59e0b; font-weight:bold;">${c.from}</td>
                                <td style="color:#10b981; font-weight:bold;">⬅️ ${c.to}</td>
                                <td style="font-size:0.77rem; color:var(--text-muted);">${c.reason}</td>
                                <td style="font-weight:bold;">${c.count}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    insightBox.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; border-bottom:1px dashed rgba(0,180,216,0.3); padding-bottom:6px;">
            <div>
                <strong style="color:#10b981;">✅ اكتمل التدقيق الذكي لكُنى وأسماء الكادر فقط (${changes.length} حالة تصحيح ودمج للكادر)</strong>
                <div style="font-size:0.75rem; color:var(--text-muted);">🔒 تم التدقيق محلياً 100% داخل الموقع (دون إعطاء أي كنيات للمتطوعين ودون مشاركة خارجية)</div>
            </div>
            <button onclick="document.getElementById('aiParticipationInsightBox').classList.add('hidden')" style="background:transparent; border:none; color:var(--error); cursor:pointer; font-weight:bold;">✕ إغلاق</button>
        </div>
        ${changesRowsHtml}
    `;
};

// -------------------------------------------------------------------
// وظيفة الذكاء المحلي (2): التحليل التفاعلي الشامل (الأساسيات + تحليلات متقدمة ومفصلة أسفلها)
// -------------------------------------------------------------------
window.runAiParticipationReport = async function() {
    const insightBox = document.getElementById('aiParticipationInsightBox');
    const btn = document.getElementById('aiEvaluateParticipationBtn');
    if (!insightBox || !window.lastParticipationStats) return;

    btn.disabled = true;
    insightBox.classList.remove('hidden');
    insightBox.innerHTML = `<div style="color: var(--gold); font-weight: bold;">✨ جاري إجراء التحليل التفاعلي الشامل وإعداد المؤشرات التفصيلية محلياً... ⏳</div>`;

    await window.syncAndRefreshStatsLive(false);

    const stats = window.lastParticipationStats;
    const totalForms = stats.totalForms || 0;

    let activeKader = [];
    let redKader = [];
    let zeroActiveKader = [];

    stats.kader.forEach(([name, count]) => {
        let isRed = window.isMemberInactive(name, window.MEMBERS_DATABASE[name]);
        if (isRed) {
            redKader.push({ name, count });
        } else {
            activeKader.push({ name, count });
            if (count === 0) zeroActiveKader.push(name);
        }
    });

    let participatingActiveCount = activeKader.filter(k => k.count > 0).length;
    let engagementRate = activeKader.length > 0 ? Math.round((participatingActiveCount / activeKader.length) * 100) : 0;

    let topKader = activeKader.filter(k => k.count > 0).slice(0, 5).map(k => {
        let pct = totalForms > 0 ? Math.round((k.count / totalForms) * 100) : 0;
        return `<strong>${k.name}</strong> (${k.count} نشاط - ${pct}%)`;
    }).join('، ');

    let topVols = stats.volunteers.slice(0, 6).map(v => `<strong>${v.displayName}</strong> (${v.count} نشاط)`).join('، ');
    let redWithActivity = redKader.filter(r => r.count > 0).map(r => `${r.name} (${r.count} نشاط)`).join('، ');

    // --- حسابات التحليل المتقدم (أسفل الأساسيات) ---
    // 1. شرائح الالتزام للكادر الفعّال المشارك
    let eliteTier = [];   // >= 50%
    let mediumTier = [];  // 20% - 49%
    let lowTier = [];     // 1% - 19%

    activeKader.filter(k => k.count > 0).forEach(k => {
        let pct = totalForms > 0 ? Math.round((k.count / totalForms) * 100) : 0;
        let itemStr = `${k.name} (${k.count} - ${pct}%)`;
        if (pct >= 50) eliteTier.push(itemStr);
        else if (pct >= 20) mediumTier.push(itemStr);
        else lowTier.push(itemStr);
    });

    // 2. القوة التشغيلية وكثافة الحضور
    let totalKaderAttendances = stats.kader.reduce((acc, item) => acc + item[1], 0);
    let totalVolunteerAttendances = stats.volunteers.reduce((acc, v) => acc + v.count, 0);
    let totalAllAttendances = totalKaderAttendances + totalVolunteerAttendances;

    let avgKaderPerActivity = totalForms > 0 ? (totalKaderAttendances / totalForms).toFixed(1) : 0;
    let avgVolPerActivity = totalForms > 0 ? (totalVolunteerAttendances / totalForms).toFixed(1) : 0;
    let kaderSharePct = totalAllAttendances > 0 ? Math.round((totalKaderAttendances / totalAllAttendances) * 100) : 0;
    let volSharePct = totalAllAttendances > 0 ? (100 - kaderSharePct) : 0;

    // 3. المتطوعون المرشحون للاستقطاب والتكريم (شاركوا في نشاطين فأكثر)
    let promisingVolunteers = stats.volunteers.filter(v => v.count >= 2).slice(0, 10);

    // 4. متوسط مشاركات الفرد الواحد من الكادر الفعّال
    let avgPerActiveMember = activeKader.length > 0 ? (activeKader.reduce((s, k) => s + k.count, 0) / activeKader.length).toFixed(1) : 0;

    btn.disabled = false;

    insightBox.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; border-bottom:1px dashed rgba(0,180,216,0.3); padding-bottom:6px;">
            <div>
                <strong style="color:var(--gold); font-size:1rem;">🤖 التقرير التحليلي الذكي لمشاركات الكادر والمتطوعين</strong>
                <div style="font-size:0.74rem; color:var(--text-muted);">🔒 تحليل خوارزمي محلي 100% داخل المتصفح (يحترم الخصوصية التامة ولا يشارك أو يحفظ البيانات خارجياً)</div>
            </div>
            <button onclick="document.getElementById('aiParticipationInsightBox').classList.add('hidden')" style="background:transparent; border:none; color:var(--error); cursor:pointer; font-weight:bold;">✕ إغلاق</button>
        </div>

        <!-- القسم الأول: الأساسيات الأربعة -->
        <div style="display:flex; flex-direction:column; gap:10px; font-size:0.88rem;">
            <div style="background:rgba(16,185,129,0.08); border-right:3px solid #10b981; padding:8px 12px; border-radius:6px;">
                <strong style="color:#10b981;">1. مؤشر التفاعل العام للكادر الفعّال:</strong><br>
                إجمالي الأنشطة الموثقة: <strong>(${totalForms} نشاط)</strong> | نسبة تفاعل الكادر الفعّال: <strong>${engagementRate}%</strong> (${participatingActiveCount} من أصل ${activeKader.length} عضو فعّال).<br>
                🏆 <strong>الأعلى حضوراً في الميدان:</strong> ${topKader || 'لا توجد مشاركات مسجلة بعد'}.
            </div>

            <div style="background:rgba(239,68,68,0.08); border-right:3px solid #ef4444; padding:8px 12px; border-radius:6px;">
                <strong style="color:#ef4444;">2. تدقيق الأعضاء المؤشرين باللون الأحمر (🔴):</strong><br>
                عدد المؤشرين بالأحمر في السجل: <strong>(${redKader.length} عضو)</strong> (${redKader.map(r => r.name).join('، ') || 'لا يوجد'}).<br>
                ${redWithActivity ? `⚠️ <strong>تنبيه تدقيقي:</strong> ظهر في الاستمارات مشاركات مسجلة لـ: (${redWithActivity}) وهم مؤشرون باللون الأحمر في السجل.` : `✅ لم تسجل لهم مشاركات فعالة أو تم ضبط حالتهم بدقة.`}
            </div>

            <div style="background:rgba(245,158,11,0.08); border-right:3px solid #f59e0b; padding:8px 12px; border-radius:6px;">
                <strong style="color:#f59e0b;">3. متابعة الكادر الفعّال غير المشارك (0 نشاط):</strong><br>
                ${zeroActiveKader.length > 0 ? `يوجد <strong>(${zeroActiveKader.length})</strong> من الكادر الفعّال لم تسجل لهم مشاركة في هذه الإحصائية وهم: (${zeroActiveKader.join('، ')}) — يُوصى بمتابعتهم وتوزيع المهام الميدانية عليهم.` : `🌟 ممتاز! جميع أعضاء الكادر الفعّال لديهم مشاركات مسجلة في الأنشطة.`}
            </div>

            <div style="background:rgba(0,180,216,0.08); border-right:3px solid var(--saji-main); padding:8px 12px; border-radius:6px;">
                <strong style="color:var(--gold);">4. أبرز المتطوعين المساندين وتدقيق الكُنى (للكادر فقط):</strong><br>
                🌟 <strong>المتطوعون الأكثر حضوراً:</strong> ${topVols || 'لا يوجد متطوعون إضافيون'}.<br>
                🔄 <strong>حصيلة توحيد كُنى الكادر:</strong> تم دمج وتصحيح <strong>(${stats.auditChanges.length})</strong> صيغة وكنية خاصة بأعضاء الكادر وإضافتها لرصيدهم الرسمي.
            </div>
        </div>

        <!-- فاصل التحليلات المتقدمة أسفل الأساسيات -->
        <div style="margin: 16px 0 10px; padding-top: 10px; border-top: 2px dashed rgba(0, 180, 216, 0.35); display:flex; align-items:center; justify-content:space-between;">
            <strong style="color: var(--gold); font-size: 0.95rem;">📊 التحليلات المتقدمة والتفصيلية (أسفل الأساسيات):</strong>
            <span style="font-size: 0.75rem; color: var(--text-muted);">قراءة معمقة للأداء الميداني</span>
        </div>

        <div style="display:flex; flex-direction:column; gap:10px; font-size:0.86rem;">
            <!-- 5. تصنيف شرائح الالتزام -->
            <div style="background:rgba(139,92,246,0.08); border-right:3px solid #8b5cf6; padding:9px 12px; border-radius:6px;">
                <strong style="color:#a78bfa;">5. تصنيف مستويات الأداء الميداني للكادر (شرائح الالتزام):</strong>
                <div style="margin-top:6px; display:flex; flex-direction:column; gap:5px;">
                    <div>🥇 <strong>الفئة الذهبية (نخبة الميدان - حضور 50% فأكثر من الأنشطة) [${eliteTier.length} عضو]:</strong><br>
                    <span style="color:var(--text-main);">${eliteTier.join(' ، ') || 'لا يوجد ضمن هذه الشريحة حالياً'}</span></div>
                    <div style="border-top:1px dashed rgba(255,255,255,0.1); padding-top:4px;">🥈 <strong>الفئة الفضية (التزام متوسط - حضور 20% إلى 49%) [${mediumTier.length} عضو]:</strong><br>
                    <span style="color:var(--text-main);">${mediumTier.join(' ، ') || 'لا يوجد ضمن هذه الشريحة حالياً'}</span></div>
                    <div style="border-top:1px dashed rgba(255,255,255,0.1); padding-top:4px;">🥉 <strong>الفئة البرونزية (حضور محدود - أقل من 20%) [${lowTier.length} عضو]:</strong><br>
                    <span style="color:var(--text-main);">${lowTier.join(' ، ') || 'لا يوجد ضمن هذه الشريحة حالياً'}</span></div>
                </div>
            </div>

            <!-- 6. القوة التشغيلية وكثافة الحضور -->
            <div style="background:rgba(14,165,233,0.08); border-right:3px solid #0ea5e9; padding:9px 12px; border-radius:6px;">
                <strong style="color:#38bdf8;">6. تحليل القوة التشغيلية وكثافة الحضور في الأنشطة:</strong>
                <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:8px; margin-top:6px;">
                    <div style="background:rgba(0,0,0,0.15); padding:6px 10px; border-radius:6px;">
                        📌 <strong>إجمالي الحضور المسجل:</strong> ${totalAllAttendances} مشاركة (${totalKaderAttendances} كادر + ${totalVolunteerAttendances} متطوع).
                    </div>
                    <div style="background:rgba(0,0,0,0.15); padding:6px 10px; border-radius:6px;">
                        👥 <strong>متوسط القوة لكل نشاط:</strong> ${avgKaderPerActivity} عضو كادر و ${avgVolPerActivity} متطوع في النشاط الواحد.
                    </div>
                    <div style="background:rgba(0,0,0,0.15); padding:6px 10px; border-radius:6px;">
                        ⚖️ <strong>نسبة التغطية الميدانية:</strong> ${kaderSharePct}% اعتماد على الكادر مقابل ${volSharePct}% إسناد تطوعي.
                    </div>
                    <div style="background:rgba(0,0,0,0.15); padding:6px 10px; border-radius:6px;">
                        📈 <strong>معدل نشاط العضو الفعّال:</strong> بمتوسط (${avgPerActiveMember}) نشاط لكل عضو كادر فعّال.
                    </div>
                </div>
            </div>

            <!-- 7. مؤشر الاستقطاب والترشيح للمتطوعين -->
            <div style="background:rgba(236,72,153,0.08); border-right:3px solid #ec4899; padding:9px 12px; border-radius:6px;">
                <strong style="color:#f472b6;">7. مؤشر الاستقطاب والترشيح (المتطوعون الأكثر التزاماً وتكراراً):</strong><br>
                ${promisingVolunteers.length > 0
                    ? `يوجد <strong>(${promisingVolunteers.length})</strong> متطوعين أظهروا التزاماً متكرراً (مشاركتان فأكثر) ويُرشحون للاستقطاب أو التكريم:<br>
                       <div style="display:flex; flex-wrap:wrap; gap:6px; margin-top:6px;">
                           ${promisingVolunteers.map(pv => `<span style="background:rgba(236,72,153,0.15); border:1px solid rgba(236,72,153,0.4); padding:2px 8px; border-radius:10px; font-weight:bold;">⭐ ${pv.displayName} (${pv.count})</span>`).join('')}
                       </div>`
                    : `معظم المتطوعين الحاليين شاركوا لمرة واحدة؛ يُنصح بتعزيز التواصل معهم لتحويلهم إلى مساندين دائمين.`}
            </div>

            <!-- 8. التوصيات الإدارية والخطوات العملية -->
            <div style="background:rgba(20,184,166,0.08); border-right:3px solid #14b8a6; padding:9px 12px; border-radius:6px;">
                <strong style="color:#2dd4bf;">8. التوصيات الإدارية والقرارات المقترحة:</strong>
                <ul style="margin:6px 18px 0 0; padding:0; line-height:1.7;">
                    <li><strong>التكريم والتحفيز:</strong> توجيه كتاب شكر وتقدير لمتصدري الفئة الذهبية والفضية (${activeKader.filter(k=>k.count>0).slice(0,3).map(k=>k.name).join('، ') || 'الأعلى مشاركة'}) لتعزيز روح المنافسة.</li>
                    <li><strong>تنشيط الكادر:</strong> تكليف الأعضاء في الفئة البرونزية ومجموعة (0 مشاركة) بمهام محددة في الأنشطة القادمة لرفع نسبة التفاعل العام من <strong>${engagementRate}%</strong> إلى أكثر من <strong>85%</strong>.</li>
                    ${redWithActivity ? `<li><strong>تدقيق السجلات:</strong> مراجعة وضع الأعضاء المؤشرين بالأحمر الذين سُجل لهم حضور ميداني (${redWithActivity}) لتحديث حالتهم في سجل الكادر إذا عادوا للعمل الفعّال.</li>` : ''}
                    <li><strong>توسيع القاعدة التنظيمية:</strong> التواصل المباشر مع المتطوعين المتكررين (${promisingVolunteers.slice(0,3).map(v=>v.displayName).join('، ') || 'أبرز المساندين'}) لربطهم ببرامج التأهيل والتدريب.</li>
                </ul>
            </div>
        </div>
    `;
};

window.navigateToFormsArchive = function() {
    document.getElementById('adminScreen').classList.add('hidden');
    document.getElementById('formsCategoryScreen').classList.remove('hidden');
    
    if (!window.isFormsFetching) {
        window.isFormsFetching = true;
        fetch(`${FORMS_API_URL}?t=${Date.now()}`).then(function(res) { return res.json(); }).then(function(data) {
            window.isFormsFetching = false;
            if(!data.error) { 
                window.allFormsData.tajammu = data.tajammu || []; 
                window.allFormsData.scouts = data.scouts || []; 
            }
        }).catch(function(err) { 
            window.isFormsFetching = false;
            console.log(err); 
        });
    }
};

window.navigateToPlanningArchive = function() {
    document.getElementById('adminScreen').classList.add('hidden');
    document.getElementById('formsMonthsScreen').classList.remove('hidden');
    document.getElementById('formsMonthsTitle').innerText = "أشهر استمارات التخطيط";
    document.getElementById('formsMonthsBackBtn').onclick = function() {
        document.getElementById('formsMonthsScreen').classList.add('hidden');
        document.getElementById('adminScreen').classList.remove('hidden');
    };
    
    const container = document.getElementById('formsMonthsContainer');
    container.innerHTML = window.getNiceLoaderHtml("جاري جلب خطط البرامج...");

    fetch(`${PLANNING_API_URL}?t=${Date.now()}`).then(function(res) { return res.json(); }).then(function(data) {
        if(!data.error && data.planning && data.planning.length > 0) {
            window.allFormsData.planning = data.planning;
            window.loadFormsFolders('planning');
        } else {
            container.innerHTML = '<div class="text-center p-15" style="grid-column: 1/-1; color: var(--error);">لا توجد استمارات، تأكد من نشر الرابط كـ Web App بصلاحية Anyone</div>';
        }
    }).catch(function(err) {
        container.innerHTML = '<div class="text-center p-15" style="grid-column: 1/-1; color: var(--error);">فشل الاتصال بجدول التخطيط! ⚠️</div>';
    });
};

window.goBackToAdminFromForms = function() {
    document.getElementById('formsCategoryScreen').classList.add('hidden');
    document.getElementById('adminScreen').classList.remove('hidden');
};

window.goBackToFormsCategory = function() {
    document.getElementById('formsMonthsScreen').classList.add('hidden');
    document.getElementById('formsCategoryScreen').classList.remove('hidden');
};

window.goBackToFormsMonths = function() {
    document.getElementById('formsListScreen').classList.add('hidden');
    document.getElementById('formsMonthsScreen').classList.remove('hidden');
};

window.loadFormsFolders = function(type) {
    if (type !== 'planning') {
        document.getElementById('formsCategoryScreen').classList.add('hidden');
        document.getElementById('formsMonthsScreen').classList.remove('hidden');
    }
    
    let title = "أشهر الاستمارات";
    let backAction = window.goBackToFormsCategory;
    if (type === 'tajammu') title = "أشهر استمارات التجمع";
    else if (type === 'scouts') title = "أشهر استمارات الكشافة";
    else if (type === 'planning') {
        title = "أشهر استمارات التخطيط";
        backAction = function() { document.getElementById('formsMonthsScreen').classList.add('hidden'); document.getElementById('adminScreen').classList.remove('hidden'); };
    }
    
    document.getElementById('formsMonthsTitle').innerText = title;
    document.getElementById('formsMonthsBackBtn').onclick = backAction;
    
    const container = document.getElementById('formsMonthsContainer');
    container.innerHTML = '';
    const forms = window.allFormsData[type];

    if (type !== 'planning' && (!forms || forms.length === 0)) {
        container.innerHTML = window.getNiceLoaderHtml("جاري تحضير مجلدات الأرشيف والإحصائيات...");
        fetch(`${FORMS_API_URL}?t=${Date.now()}`).then(function(res) { return res.json(); }).then(function(data) {
            if(!data.error) { 
                window.allFormsData.tajammu = data.tajammu || []; 
                window.allFormsData.scouts = data.scouts || []; 
                if (window.allFormsData[type] && window.allFormsData[type].length > 0) {
                    window.loadFormsFolders(type);
                } else {
                    container.innerHTML = '<div class="text-center p-15" style="grid-column: 1/-1;">لا توجد استمارات مؤرشفة في هذا القسم حتى الآن.</div>';
                }
            }
        }).catch(function() {
            container.innerHTML = '<div class="text-center p-15" style="grid-column: 1/-1; color: var(--error);">فشل الاتصال بقاعدة البيانات! ⚠️</div>';
        });
        return;
    }

    if(!forms || forms.length === 0) {
        container.innerHTML = '<div class="text-center p-15" style="grid-column: 1/-1;">لا توجد استمارات مؤرشفة في هذا القسم حتى الآن.</div>';
        return;
    }

    if (type !== 'planning') {
        let statsHtml = `
            <div style="grid-column: 1/-1; text-align: center; margin-bottom: 15px;">
                <button class="pill-action-btn" style="background: linear-gradient(135deg, var(--saji-main), var(--gold)); color: #fff; padding: 10px 25px; border:none; box-shadow: 0 4px 10px rgba(0,0,0,0.15);" onclick="window.openFormsStatsScreen('overall', '${type}')">📊 الإحصائيات الكلية وتقييم المشاركات</button>
            </div>
        `;
        container.innerHTML = statsHtml;
    }

    window.rebuildCurrentFormsGroups(type);

    let sortedKeys = Object.keys(window.currentFormsGroups).sort(function(a, b) {
        if (a === "غير مصنف") return 1; if (b === "غير مصنف") return -1;
        let partsA = a.replace('شهر ', '').split(' - '); let partsB = b.replace('شهر ', '').split(' - ');
        let yearA = parseInt(partsA[1]), yearB = parseInt(partsB[1]);
        if (yearA !== yearB) return yearB - yearA; 
        return parseInt(partsB[0]) - parseInt(partsA[0]); 
    });

    sortedKeys.forEach(function(monthKey) {
        const btn = document.createElement('button'); btn.className = 'panel-card square-btn saji-hover-card';
        btn.innerHTML = '<div class="card-icon">📁</div><h3 style="direction:ltr;">' + monthKey + '</h3>';
        btn.onclick = function() { window.renderFormsCapsules(monthKey, type); }; 
        container.appendChild(btn);
    });
};

window.renderFormsCapsules = function(monthKey, type) {
    document.getElementById('formsMonthsScreen').classList.add('hidden');
    document.getElementById('formsListScreen').classList.remove('hidden');
    document.getElementById('formsListTitle').innerText = "تفاصيل الشهر";
    document.getElementById('monthActionContainer').innerHTML = ''; 
    
    const container = document.getElementById('formsCapsulesContainer');
    container.className = "mt-10"; 
    
    let html = '<div class="open-folder-container"><div class="open-folder-header"><div class="folder-tab">📂 أنشطة ' + monthKey + '</div></div><div class="open-folder-body">';
    
    if (type !== 'planning') {
        html += `
            <div class="text-center mb-15 mt-10">
                <button class="pill-action-btn" style="background: linear-gradient(135deg, var(--saji-main), #1C2541); color: #fff; padding: 8px 20px; border:none; box-shadow: 0 4px 10px rgba(0,0,0,0.15);" onclick="window.openFormsStatsScreen('monthly', '${type}', '${monthKey}')">📊 إحصائيات هذا الشهر وتقييم المشاركات</button>
            </div>
        `;
    }

    html += '<div style="text-align: center; margin-bottom: 20px;"><button class="pill-action-btn" style="background: linear-gradient(135deg, var(--saji-main), var(--gold)); color: #fff; padding: 10px 25px; font-size: 0.9rem; border: none; box-shadow: 0 4px 10px rgba(0,0,0,0.2); display: inline-flex; align-items: center; justify-content: center; gap: 8px; width: auto; min-width: 250px;" onclick="window.generateMonthFormsPDF(\'' + monthKey + '\', \'' + type + '\')"><span style="font-size: 1.2rem;">📄</span> تحميل أرشيف الشهر بالكامل</button></div><div class="names-square-grid" style="margin: 0; padding: 0; width: 100%;">';

    const monthData = window.currentFormsGroups[monthKey] || [];
    monthData.forEach(function(item) {
        let titleLabel = type === 'planning' ? "خطة برامج" : "استمارة نشاط";
        html += '<button class="panel-btn saji-hover-card" style="border-radius: 50px; padding: 8px 10px; display: flex; flex-direction: column; align-items: center;" onclick="window.openFormTextModal(\'' + type + '\', ' + item.originalIndex + ', \'' + item.cleanDate + '\')"><strong style="font-size: 0.9rem;">' + titleLabel + '</strong><span style="font-size: 0.85rem; color: var(--gold); margin-top:5px; font-weight:bold;">' + item.cleanDate + '</span></button>';
    });

    html += '</div></div></div>';
    container.innerHTML = html;
};

window.openFormTextModal = function(type, index, dateVal) {
    window.currentFormView = { type, index };
    const form = window.allFormsData[type][index];
    document.getElementById('formModalTitle').innerHTML = 'معاينة رقمية<br><span style="font-size:0.9rem; color:var(--text-muted);">(' + dateVal + ')</span>';
    
    let textHtml = "";
    if (type === 'planning') {
        textHtml += '<div style="margin-bottom:8px; border-bottom:1px solid rgba(0, 180, 216, 0.2); padding-bottom:5px;"><strong style="color:var(--gold);">المؤسسة:</strong> <span style="direction:rtl;">' + form.institution + '</span><br><strong style="color:var(--gold);">شهر:</strong> ' + form.month + ' | <strong style="color:var(--gold);">سنة:</strong> ' + form.year + '</div>';
        if(form.programs && form.programs.length > 0) {
            form.programs.forEach(function(prog, i) {
                textHtml += '<div style="margin-top:15px; background:rgba(0,0,0,0.1); padding:10px; border-radius:8px; border:1px solid var(--saji-main);"><strong style="color:var(--gold); font-size:1.1rem;">برنامج ' + (i+1) + ': ' + prog.name + '</strong><br><div style="font-size:0.9rem; margin-top:5px;">نوعه: ' + prog.type + ' | تكلفته: ' + prog.cost + '</div><div style="font-size:0.9rem;">المستهدفين: ' + prog.targets + ' | المشاركين: ' + prog.participants + '</div><div style="font-size:0.9rem; border-top:1px dashed #ccc; padding-top:5px; margin-top:5px;">المكان: ' + prog.location + ' | التاريخ: ' + prog.date + '</div></div>';
            });
        } else {
            textHtml += '<div class="text-center">لا توجد برامج مضافة</div>';
        }
    } else {
        let excludeWords = ["url", "رابط", "صورة", "ملف", "publisher", "increment", "edit", "doc", "pdf"];
        for(let key in form) {
            let lowKey = key.toLowerCase();
            if(excludeWords.some(function(word) { return lowKey.includes(word); })) continue;
            
            let val = form[key];
            if (val === undefined || val === null || String(val).trim() === "" || String(val).trim() === "لا يوجد") {
                val = "";
            }

            if(!key.includes("Timestamp") && !key.includes("طابع زمني")) {
                let formattedVal = String(val).trim().replace(/\n/g, '<br>');
                textHtml += '<div style="margin-bottom:8px; border-bottom:1px solid rgba(0, 180, 216, 0.2); padding-bottom:5px;"><strong style="color:var(--gold);">' + key + ':</strong> <div style="direction:rtl; display:inline; line-height:1.6;">' + formattedVal + '</div></div>';
            }
        }
    }
    
    document.getElementById('formModalTextContent').innerHTML = textHtml;
    document.getElementById('formTextModal').classList.remove('hidden');
};

window.closeFormTextModal = function() { document.getElementById('formTextModal').classList.add('hidden'); };
window.closeFormPdfModal = function() { document.getElementById('formPdfModal').classList.add('hidden'); };

window.buildPlanningFormPageHtml = function(form) {
    const themeColor = '#0B132B'; const logoUrl = 'https://i.ibb.co/N2BJ7Srb/N2BJ7Srb.jpg';
    let pagesHtml = ''; let programs = form.programs || []; let totalProgs = programs.length;
    if (totalProgs === 0) return '';

    let currentProg = 0; let pageNum = 1;
    while (currentProg < totalProgs) {
        let isFirst = (pageNum === 1); 
        let remaining = totalProgs - currentProg; 
        let isLast = false; 
        let take = Math.min(4, remaining); 
        if (currentProg + take >= totalProgs) isLast = true;

        let pageProgs = [];
        for(let i = 0; i < take; i++) {
            pageProgs.push({prog: programs[currentProg], index: currentProg});
            currentProg++;
        }
        
        let headerHtml = '';
        if (isFirst) {
            headerHtml = '<table style="width: 100%; border: none; margin-bottom: 10px; border-bottom: 2px solid ' + themeColor + '; padding-bottom: 8px; position: relative; z-index: 2;"><tr><td style="width: 35%; vertical-align: middle;"><div style="display: flex; flex-direction: column; justify-content: center; color: black; font-weight: bold; line-height: 1.4; text-align: right;"><div style="font-size: 15px;">تجمع شباب الشريعة</div><div style="font-size: 13px;">مديرية البصرة</div><div style="font-size: 13px;">قسم &nbsp;&nbsp;التخطيط &nbsp;&nbsp;والبرامج</div></div></td><td style="width: 30%; text-align: center; vertical-align: middle;"><img src="' + logoUrl + '" style="height: 65px; width: auto; border-radius: 6px; border: 1.5px solid ' + themeColor + '; padding: 2px;"></td><td style="width: 35%; vertical-align: middle;"><div style="display: flex; flex-direction: column; justify-content: center; text-align: left;"><div style="font-size: 14px; font-weight: bold; color: ' + themeColor + ';">' + form.institution + '</div><div style="font-size: 12px; font-weight: bold; color: #444;">شهر ' + form.month + ' &nbsp;&nbsp; سنة ' + form.year + '</div></div></td></tr></table>';
        } else {
            headerHtml = '<div style="text-align: right; color: ' + themeColor + '; font-weight: bold; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-bottom: 15px; font-size: 12px; position: relative; z-index: 2;">تابع خطط وبرامج: ' + form.institution + ' - شهر ' + form.month + ' / سنة ' + form.year + '</div>';
        }

        let progsHtml = '';
        pageProgs.forEach(function(pObj) {
            let prog = pObj.prog; let idx = pObj.index;
            progsHtml += '<div style="margin-bottom: 8px; border: 1.5px solid ' + themeColor + '; border-radius: 6px; overflow: hidden; background: #fff; position: relative; z-index: 2;"><div style="background:' + themeColor + '; color:white; padding:4px 10px; font-size:12px; font-weight:bold;">برنامج ' + (idx+1) + ': ' + prog.name + '</div><div style="padding: 4px 8px;"><table style="width:100%; border-collapse:collapse; text-align:center; font-size:11px; margin-bottom:4px;"><tr><th style="border:1px solid #ddd; padding:4px; background:#f0f8ff; color:' + themeColor + '; font-weight:bold; width:13%;">النوع</th><th style="border:1px solid #ddd; padding:4px; background:#f0f8ff; color:' + themeColor + '; font-weight:bold; width:13%;">التكلفة</th><th style="border:1px solid #ddd; padding:4px; background:#f0f8ff; color:' + themeColor + '; font-weight:bold; width:48%;">الفقرات</th><th style="border:1px solid #ddd; padding:4px; background:#f0f8ff; color:' + themeColor + '; font-weight:bold; width:13%;">المستهدفين</th><th style="border:1px solid #ddd; padding:4px; background:#f0f8ff; color:' + themeColor + '; font-weight:bold; width:13%;">المشاركين</th></tr><tr><td style="border:1px solid #ddd; padding:4px; font-weight:600;">' + prog.type + '</td><td style="border:1px solid #ddd; padding:4px; font-weight:600;">' + prog.cost + '</td><td style="border:1px solid #ddd; padding:4px; text-align:right;">' + prog.items + '</td><td style="border:1px solid #ddd; padding:4px; font-weight:600;">' + prog.targets + '</td><td style="border:1px solid #ddd; padding:4px; font-weight:600;">' + prog.participants + '</td></tr></table><div style="font-size:11px; margin-bottom:4px; padding: 4px; background: #fafafa; border: 1px solid #eee; border-radius: 4px; text-align: right;"><strong style="color:' + themeColor + ';">تفاصيل البرنامج:</strong> ' + prog.details + '</div><div style="display:flex; justify-content:space-between; font-size:11px; background:#f5f5f5; padding:4px 6px; border-radius:4px; border:1px solid #eee;"><div><strong style="color:' + themeColor + ';">📅 التاريخ:</strong> ' + prog.date + '</div><div><strong style="color:' + themeColor + ';">📍 المكان:</strong> ' + prog.location + '</div></div></div></div>';
        });

        let footerHtml = '';
        if (isLast) {
            footerHtml = '<div style="position: absolute; bottom: 12mm; left: 12mm; right: 12mm; border-top: 1.5px dashed ' + themeColor + '; padding-top: 8px; display: flex; justify-content: space-between; font-size: 13px; color: black; font-weight: bold; text-align: center; z-index: 2;"><div style="width: 45%;"><div>مدير المؤسسة</div><div style="margin-top: 20px; color: ' + themeColor + '; font-size: 14px;">' + form.director + '</div></div><div style="width: 45%;"><div>مدير قسم التخطيط والبرامج</div><div style="margin-top: 20px; color: ' + themeColor + '; font-size: 14px;">وليد خالد الحيدري</div></div></div>';
        }

        pagesHtml += '<div class="pdf-print-page" style="width: 210mm; height: 294mm; max-height: 294mm; box-sizing: border-box; font-family: Arial, sans-serif; direction: rtl; margin: 0 auto; color: #333; background: #fff; position: relative; padding: 12mm; overflow: hidden;"><div style="position: absolute; top: 4mm; bottom: 4mm; left: 4mm; right: 4mm; border: 3px solid ' + themeColor + '; border-radius: 12px; pointer-events: none; z-index: 1;"></div><div style="position: absolute; top: 5.5mm; bottom: 4.5mm; left: 5.5mm; right: 5.5mm; border: 1px solid ' + themeColor + '; border-radius: 9px; pointer-events: none; z-index: 1;"></div>' + headerHtml + '<div style="position: relative; z-index: 2;">' + progsHtml + '</div>' + footerHtml + '</div>';
        pageNum++;
    }
    return pagesHtml;
};

window.buildFormPageHtml = function(form, type) {
    if (type === 'planning') return window.buildPlanningFormPageHtml(form);

    let themeColor = type === 'tajammu' ? '#0B132B' : '#0077B6'; 
    let logoUrl = type === 'tajammu' ? 'https://i.ibb.co/N2BJ7Srb/N2BJ7Srb.jpg' : 'https://i.ibb.co/DfsfqRP8/IMG-20260604-182014-169.png';
    let formTitle = type === 'tajammu' ? 'استمارة نشاطات التجمع' : 'استمارة نشاطات الكشافة';
    
    let headerText = type === 'tajammu' 
        ? '<div style="display: inline-block; text-align: center;"><div style="font-size: 16px; font-weight: bold; white-space: nowrap;">تجمع شباب الشريعة</div><div style="font-size: 14px; font-weight: normal; margin-top:2px;">مديرية البصرة</div></div>' 
        : '<div style="display: inline-block; text-align: center;"><div style="font-size: 15px; font-weight: bold; white-space: nowrap;">جمعية كشافة الامام الحسين (ع)</div><div style="font-size: 13px; font-weight: normal; margin-top:2px;">مفوضية البصرة</div></div>';

    let gridItems = '';
    let excludeWords = ["url", "رابط", "صورة", "ملف", "publisher", "increment", "edit", "doc", "pdf"];
    
    for(let key in form) {
        let lowKey = key.toLowerCase();
        if(excludeWords.some(function(word) { return lowKey.includes(word); })) continue;
        
        let val = form[key];
        if (val === undefined || val === null || String(val).trim() === "" || String(val).trim() === "لا يوجد") { 
            val = ""; 
        }

        if(!key.includes("Timestamp") && !key.includes("طابع زمني")) {
            let isFullWidth = key.includes("اسماء") || key.includes("أسماء");
            let itemWidth = isFullWidth ? "100%" : "calc(50% - 7.5px)";
            let labelWidth = isFullWidth ? "20%" : "35%";
            let valueWidth = isFullWidth ? "80%" : "65%";
            let displayValue = String(val).trim();
            
            let customFontSize = "13px";
            let customLineHeight = "1.8";
            let customPadding = "10px 15px";

            if (isFullWidth) {
                let namesArray = displayValue.split(/[\r\n,،]+/).map(function(n) { return n.trim(); }).filter(function(n) { return n !== ""; });
                if (namesArray.length > 0) {
                    if (namesArray.length > 70) {
                        customFontSize = "9.5px"; customLineHeight = "1.4"; customPadding = "6px 10px";
                    } else if (namesArray.length > 40) {
                        customFontSize = "10.5px"; customLineHeight = "1.5"; customPadding = "8px 12px";
                    } else if (namesArray.length > 20) {
                        customFontSize = "12px"; customLineHeight = "1.6"; customPadding = "8px 12px";
                    }
                    displayValue = namesArray.map(function(n) { return '<span style="display: inline-block; white-space: nowrap; margin-left: 12px;">' + n + '</span>'; }).join(''); 
                }
            } else { 
                displayValue = displayValue.replace(/\n/g, '<br>'); 
            }

            gridItems += '<div style="width: ' + itemWidth + '; display: flex; flex-direction: column; border: 1.5px solid ' + themeColor + '; border-radius: 8px; overflow: hidden; box-shadow: 1px 1px 3px rgba(0,0,0,0.05); box-sizing: border-box; background-color: #fff; page-break-inside: avoid; margin-bottom: 12px;"><div style="display: flex; direction: rtl; width: 100%; flex-grow: 1; align-items: stretch;"><div style="width: ' + labelWidth + '; background-color: ' + themeColor + '; color: #fff; padding: ' + customPadding + '; font-weight: bold; text-align: right; font-size: ' + customFontSize + '; display: flex; align-items: center; border-left: 1.5px solid ' + themeColor + '; box-sizing: border-box;">' + key + '</div><div style="width: ' + valueWidth + '; padding: ' + customPadding + '; font-size: ' + customFontSize + '; color: #222; font-weight: bold; text-align: right; line-height: ' + customLineHeight + '; display: flex; align-items: center; justify-content: flex-start; box-sizing: border-box; flex-wrap: wrap;">' + displayValue + '</div></div></div>';
        }
    }

    return '<div class="pdf-print-page" style="width: 210mm; height: 294mm; max-height: 294mm; display: block; background: #fff; padding: 15mm; padding-bottom: 35mm; box-sizing: border-box; font-family: Arial, sans-serif; direction: rtl; position:relative; margin: 0 auto; color: #333; overflow: hidden;"><div style="position: absolute; top: 5mm; bottom: 5mm; left: 5mm; right: 5mm; border: 3px solid ' + themeColor + '; border-radius: 15px; pointer-events: none; z-index: 1;"></div><div style="position: absolute; top: 7mm; bottom: 7mm; left: 7mm; right: 7mm; border: 1px solid ' + themeColor + '; border-radius: 10px; pointer-events: none; z-index: 1;"></div><div style="position: relative; z-index: 2; height: 100%;"><table style="width: 100%; border: none; margin-bottom: 20px; border-bottom: 2px solid ' + themeColor + '; padding-bottom: 15px;"><tr><td style="width: 33%; text-align: right; vertical-align: middle; color: #333; direction: rtl;">' + headerText + '</td><td style="width: 34%; text-align: center; vertical-align: middle;"><div style="display: inline-block; border: 2px solid ' + themeColor + '; border-radius: 25px; padding: 6px 18px; color: ' + themeColor + '; font-weight: bold; font-size: 17px; background: #fff; box-shadow: 0px 3px 0px rgba(0,0,0,0.05);">' + formTitle + '</div></td><td style="width: 33%; text-align: left; vertical-align: middle; direction: rtl;"><img src="' + logoUrl + '" style="height: 70px; width: auto; border-radius: 8px; border: 1px solid #eee;"></td></tr></table><div style="display: flex; flex-wrap: wrap; gap: 12px; justify-content: flex-start; align-content: flex-start; width: 100%; direction: rtl;">' + gridItems + '</div></div><div style="position: absolute; bottom: 12mm; left: 15mm; right: 15mm; border-top: 1px solid #ccc; padding-top: 12px; font-weight: bold; text-align: center; color: #333; direction: rtl; display: flex; justify-content: space-between; z-index: 2;"><div style="width: 33%; font-size: 14px;">علي العواجي<br><span style="font-size:12px; font-weight:normal; color:#666;">مسؤول لجنة المتابعة</span></div><div style="width: 33%; font-size: 14px;">محمد بشير<br><span style="font-size:12px; font-weight:normal; color:#666;">مدير قسم الموارد البشرية</span></div><div style="width: 33%; font-size: 14px;">حسن فاضل<br><span style="font-size:12px; font-weight:normal; color:#666;">مدير قسم الاعلام</span></div></div></div>';
};

window.generateFormPDF = function() {
    window.closeFormTextModal();
    const type = window.currentFormView.type;
    const form = window.allFormsData[type][window.currentFormView.index];
    const htmlPage = window.buildFormPageHtml(form, type);
    
    document.getElementById('formPdfContentArea').innerHTML = '<div id="printableFormArea" style="background:transparent; direction: ltr; margin: 0 auto; width: 210mm;">' + htmlPage + '</div>';
    document.getElementById('formPdfModal').classList.remove('hidden');
    
    let typeName = type === 'tajammu' ? 'التجمع' : (type === 'scouts' ? 'الكشافة' : 'خطة_برنامج');
    window.currentPdfFileName = 'استمارة_' + typeName + '_' + new Date().getTime() + '.pdf';
};

window.generateMonthFormsPDF = function(monthKey, type) {
    const formsList = window.currentFormsGroups[monthKey];
    if (!formsList || formsList.length === 0) {
        window.showNotification("⚠️ لا توجد استمارات في هذا الشهر لتحميلها!");
        return;
    }
    
    let allPagesHtml = [];
    formsList.forEach(function(item) { 
        let formObj = item.form || item;
        allPagesHtml.push(window.buildFormPageHtml(formObj, type)); 
    });
    
    const finalHtml = allPagesHtml.join('');
    const contentArea = document.getElementById('formPdfContentArea');
    if (contentArea) {
        contentArea.innerHTML = '<div id="printableFormArea" style="background:transparent; direction: ltr; margin: 0 auto; width: 210mm;">' + finalHtml + '</div>';
        contentArea.scrollTop = 0;
    }
    document.getElementById('formPdfModal').classList.remove('hidden');
    
    let typeName = type === 'tajammu' ? 'التجمع' : (type === 'scouts' ? 'الكشافة' : 'التخطيط');
    window.currentPdfFileName = 'أرشيف_' + monthKey.replace(/\s+/g, '_') + '_' + typeName + '_' + new Date().getTime() + '.pdf';
};

window.executeFormPdfDownload = async function() {
    const element = document.getElementById('printableFormArea');
    if (!element) return;
    const container = document.getElementById('formPdfContentArea');
    if(container) container.scrollTop = 0;

    const opt = { 
        margin: 0, 
        filename: window.currentPdfFileName, 
        image: { type: 'jpeg', quality: 1 }, 
        html2canvas: { scale: 2, useCORS: true, scrollY: 0, scrollX: 0 }, 
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } 
    };
    
    window.showProgressBar("جاري تجميع الاستمارات...");
    
    setTimeout(async function() {
        try {
            const pages = element.querySelectorAll('.pdf-print-page');
            if (pages.length > 0) {
                let worker = html2pdf().set(opt).from(pages[0]).toPdf();
                window.updateProgressBar(Math.round((1 / pages.length) * 100));
                
                for (let i = 1; i < pages.length; i++) {
                    worker = worker.get('pdf').then(function(pdf) {
                        pdf.addPage();
                        let percent = Math.round(((i + 1) / pages.length) * 100);
                        window.updateProgressBar(percent);
                    }).from(pages[i]).toContainer().toCanvas().toPdf();
                }
                await worker.save();
            } else {
                window.updateProgressBar(50);
                await html2pdf().set(opt).from(element).save();
                window.updateProgressBar(100);
            }
            
            setTimeout(function() {
                window.hideProgressBar();
                window.closeFormPdfModal(); 
                window.showNotification("تم تحميل الملف بنجاح ✅"); 
            }, 500);
            
        } catch (err) { 
            console.error(err);
            window.hideProgressBar();
            window.showNotification("حدث خطأ أثناء التنزيل ⚠️"); 
        }
    }, 500);
};

// -------------------------------------------------------------------
// نظام النسخ للمعلومات والملفات الشخصية
// -------------------------------------------------------------------
function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    textArea.setSelectionRange(0, 999999); 
    var successful = false;
    try { 
        successful = document.execCommand('copy'); 
    } catch (err) { 
        console.error("Fallback copy failed", err); 
    }
    document.body.removeChild(textArea);
    return successful;
}

window.copyAiText = function(btn, encodedText) {
    const text = decodeURIComponent(encodedText);
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(function() {
            const orig = btn.innerHTML;
            btn.innerHTML = '✅ تم النسخ';
            setTimeout(function() { btn.innerHTML = orig; }, 2000);
            window.showNotification("تم نسخ النص بنجاح 📋");
        }).catch(function() {
            fallbackCopyTextToClipboard(text);
            window.showNotification("تم نسخ النص بنجاح 📋");
        });
    } else {
        fallbackCopyTextToClipboard(text);
        window.showNotification("تم نسخ النص بنجاح 📋");
    }
};

window.formatMemberDataAsText = function(alias) {
    let u = window.MEMBERS_DATABASE[alias];
    
    if (!u && alias) {
        let cleanTarget = String(alias).trim();
        for (let k in window.MEMBERS_DATABASE) {
            if (String(k).trim() === cleanTarget || String(window.MEMBERS_DATABASE[k].fullName).trim() === cleanTarget) {
                u = window.MEMBERS_DATABASE[k];
                break;
            }
        }
    }
    if (!u) return "";

    let text = "==============================\nالاسم الكامل: " + u.fullName + "\n==============================\n\n";
    const formatSection = function(title, dataList) {
        if (!dataList || dataList.length === 0) return "";
        let secText = "[ " + title + " ]\n";
        dataList.forEach(function(item) {
            if (item.label) { 
                let displayVal = item.val; 
                if (item.label === "أسماء الأبناء" || item.label === "الأبناء") displayVal = window.cleanChildrenNames(item.val); 
                secText += "- " + item.label + ": " + displayVal + "\n"; 
            }
            else if (item.title) {
                secText += "- " + item.title + " | الكتاب: " + (item.doc || 'لا يوجد') + " | التاريخ: " + (item.date || 'لا يوجد') + "\n";
            }
        });
        return secText + "\n";
    };
    text += formatSection("المعلومات الأساسية", u.basic);
    text += formatSection("الدورات والمهارات", u.skills);
    text += formatSection("معلومات السكن", u.housing);
    text += formatSection("العمل والمسؤوليات", u.work);
    text += formatSection("السجل الانضباطي", u.punishments);
    text += formatSection("كتب الشكر والتقدير", u.awards);
    return text;
};

window.copyMemberInfo = function() {
    let targetAlias = window.currentActiveAlias;
    
    if (!targetAlias || !window.MEMBERS_DATABASE[targetAlias]) {
        const displayedNameEl = document.getElementById('profileFullName');
        if (displayedNameEl && displayedNameEl.innerText) {
            targetAlias = displayedNameEl.innerText.trim();
        }
    }

    let textToCopy = window.formatMemberDataAsText(targetAlias);

    if (!textToCopy) {
        const displayedName = document.getElementById('profileFullName')?.innerText || "";
        const basicPills = document.querySelectorAll('#primaryDetailsContainer .inset-pill');
        if (displayedName && basicPills.length > 0) {
            textToCopy = "==============================\nالاسم الكامل: " + displayedName + "\n==============================\n\n[ المعلومات الأساسية ]\n";
            basicPills.forEach(pill => {
                const lbl = pill.querySelector('.label')?.innerText || "";
                const val = pill.querySelector('.value')?.innerText || "";
                if (lbl) textToCopy += "- " + lbl + ": " + val + "\n";
            });
        }
    }

    if (!textToCopy) {
        window.showNotification("⚠️ تعذر العثور على بيانات لنسخها!");
        return;
    }

    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy).then(function() { 
            window.showNotification("تم نسخ معلومات العضو بنجاح 📋✅"); 
        }).catch(function() { 
            fallbackCopyTextToClipboard(textToCopy); 
            window.showNotification("تم نسخ معلومات العضو بنجاح 📋✅"); 
        });
    } else {
        fallbackCopyTextToClipboard(textToCopy);
        window.showNotification("تم نسخ معلومات العضو بنجاح 📋✅"); 
    }
};

window.buildNameBoxesHtml = function(fullName) {
    let parts = fullName.replace(/عبد /g, "عبد_").replace(/ابو /g, "ابو_").replace(/أبو /g, "أبو_").split(/\s+/);
    let cleanParts = parts.map(function(p) { return p.replace(/_/g, " "); }); 
    let first = cleanParts[0] || "-"; let father = cleanParts[1] || "-"; let grand1 = cleanParts[2] || "-"; let grand2 = cleanParts[3] || "-"; let surname = cleanParts.slice(4).join(" ");
    if (cleanParts.length === 4) { surname = cleanParts[3]; grand2 = "-"; } else if (cleanParts.length === 3) { surname = cleanParts[2]; grand1 = "-"; grand2 = "-"; } else if (cleanParts.length === 2) { surname = cleanParts[1]; father = "-"; grand1 = "-"; grand2 = "-"; }
    if (!surname) surname = "-";
    return '<div style="display: flex; justify-content: space-between; gap: 8px; margin-bottom: 15px; direction: rtl;"><div style="flex: 1; border: 1px solid #d3c4b1; border-radius: 6px; overflow: hidden; text-align: center; background-color: #fff;"><div style="background-color: #e8dcc8; color: #5a3a22; font-size: 11px; padding: 5px; font-weight: bold;">الاسم الأول</div><div style="color: #333; font-size: 13px; font-weight: bold; padding: 8px;">' + first + '</div></div><div style="flex: 1; border: 1px solid #d3c4b1; border-radius: 6px; overflow: hidden; text-align: center; background-color: #fff;"><div style="background-color: #e8dcc8; color: #5a3a22; font-size: 11px; padding: 5px; font-weight: bold;">اسم الأب</div><div style="color: #333; font-size: 13px; font-weight: bold; padding: 8px;">' + father + '</div></div><div style="flex: 1; border: 1px solid #d3c4b1; border-radius: 6px; overflow: hidden; text-align: center; background-color: #fff;"><div style="background-color: #e8dcc8; color: #5a3a22; font-size: 11px; padding: 5px; font-weight: bold;">الجد الأول</div><div style="color: #333; font-size: 13px; font-weight: bold; padding: 8px;">' + grand1 + '</div></div><div style="flex: 1; border: 1px solid #d3c4b1; border-radius: 6px; overflow: hidden; text-align: center; background-color: #fff;"><div style="background-color: #e8dcc8; color: #5a3a22; font-size: 11px; padding: 5px; font-weight: bold;">الجد الثاني</div><div style="color: #333; font-size: 13px; font-weight: bold; padding: 8px;">' + grand2 + '</div></div><div style="flex: 1; border: 1px solid #d3c4b1; border-radius: 6px; overflow: hidden; text-align: center; background-color: #fff;"><div style="background-color: #e8dcc8; color: #5a3a22; font-size: 11px; padding: 5px; font-weight: bold;">اللقب</div><div style="color: #333; font-size: 13px; font-weight: bold; padding: 8px;">' + surname + '</div></div></div>';
};

window.openPdfPreview = function() {
    if (!window.currentActiveAlias) return;
    const u = window.MEMBERS_DATABASE[window.currentActiveAlias];
    const themeColor = '#0B132B';
    const frameStyle = 'width: 210mm; height: 294mm; max-height: 294mm; background: #fff; padding: 15mm; box-sizing: border-box; font-family: Arial, sans-serif; direction: rtl; position: relative; overflow: hidden; margin: 0 auto; color: #333;';

    const buildBasicSection = function(title, fullName, dataList) {
        let secHtml = '<div style="margin-bottom: 20px; page-break-inside: avoid;"><div style="background: ' + themeColor + '; color: #fff; padding: 6px 15px; font-weight: bold; border-radius: 6px; margin-bottom: 12px; font-size: 14px; display: inline-block;">' + title + '</div>' + window.buildNameBoxesHtml(fullName) + '<div style="display: flex; flex-wrap: wrap; gap: 12px;">';
        dataList.forEach(function(item) { let displayVal = item.val; if (item.label === "أسماء الأبناء" || item.label === "الأبناء") displayVal = window.cleanChildrenNames(item.val); secHtml += '<div style="width: calc(50% - 6px); background: #fdfaf7; padding: 10px; border: 1px solid #e0d5c1; border-radius: 6px; font-size: 13px; display: flex; align-items: center; box-sizing: border-box;"><strong style="color: ' + themeColor + '; margin-left: 8px; white-space: nowrap;">' + item.label + ':</strong> <span style="font-weight: bold; color: #222;">' + displayVal + '</span></div>'; });
        return secHtml + '</div></div>';
    };

    const buildPrintGrid = function(title, dataList) {
        if (!dataList || dataList.length === 0) return "";
        let secHtml = '<div style="margin-bottom: 20px; page-break-inside: avoid;"><div style="background: ' + themeColor + '; color: #fff; padding: 6px 15px; font-weight: bold; border-radius: 6px; margin-bottom: 12px; font-size: 14px; display: inline-block;">' + title + '</div><div style="display: flex; flex-wrap: wrap; gap: 12px;">';
        dataList.forEach(function(item) { let displayVal = item.val; if (item.label === "أسماء الأبناء" || item.label === "الأبناء") displayVal = window.cleanChildrenNames(item.val); secHtml += '<div style="width: calc(50% - 6px); background: #fdfaf7; padding: 10px; border: 1px solid #e0d5c1; border-radius: 6px; font-size: 13px; display: flex; align-items: center; box-sizing: border-box;"><strong style="color: ' + themeColor + '; margin-left: 8px; white-space: nowrap;">' + item.label + ':</strong> <span style="font-weight: bold; color: #222;">' + displayVal + '</span></div>'; });
        return secHtml + '</div></div>';
    };

    const buildPrintTable = function(title, dataList) {
        if (!dataList || dataList.length === 0) return "";
        let secHtml = '<div style="margin-bottom: 20px; page-break-inside: avoid;"><div style="background: ' + themeColor + '; color: #fff; padding: 6px 15px; font-weight: bold; border-radius: 6px; margin-bottom: 12px; font-size: 14px; display: inline-block;">' + title + '</div><table style="width: 100%; border-collapse: collapse; font-size: 13px; text-align: center; margin-bottom: 10px;"><thead><tr><th style="background-color: #f4eee6; color: ' + themeColor + '; font-weight: bold; border: 1px solid #c4b5a2; padding: 10px;">النوع</th><th style="background-color: #f4eee6; color: ' + themeColor + '; font-weight: bold; border: 1px solid #c4b5a2; padding: 10px;">رقم الكتاب</th><th style="background-color: #f4eee6; color: ' + themeColor + '; font-weight: bold; border: 1px solid #c4b5a2; padding: 10px;">التاريخ</th></tr></thead><tbody>';
        dataList.forEach(function(item) { secHtml += '<tr><td style="border: 1px solid #c4b5a2; padding: 10px; color: #222;">' + (item.title || '-') + '</td><td style="border: 1px solid #c4b5a2; padding: 10px; color: #222;">' + (item.doc || '-') + '</td><td style="border: 1px solid #c4b5a2; padding: 10px; color: #222;">' + (item.date || '-') + '</td></tr>'; });
        return secHtml + '</tbody></table></div>';
    };

    let processedSkills = [];
    u.skills.forEach(function(skill) {
        if (skill.label === "دورة عسكرية" || skill.label === "عسكرية") {
            let valStr = String(skill.val);
            if (valStr.includes("نعم")) { processedSkills.push({ label: "دورة عسكرية", val: "نعم" }); let numMatch = valStr.match(/\d+/); if (numMatch) processedSkills.push({ label: "عدد الدورات", val: numMatch[0] }); }
            else { processedSkills.push({ label: "دورة عسكرية", val: "كلا" }); }
        } else { processedSkills.push(skill); }
    });

    let page1 = '<div class="pdf-profile-page" style="' + frameStyle + '"><div style="position: absolute; top: 5mm; bottom: 5mm; left: 5mm; right: 5mm; border: 3px solid ' + themeColor + '; border-radius: 15px; pointer-events: none; z-index: 1;"></div><div style="position: absolute; top: 7mm; bottom: 7mm; left: 7mm; right: 7mm; border: 1px solid ' + themeColor + '; border-radius: 10px; pointer-events: none; z-index: 1;"></div><div style="position: relative; z-index: 2; padding: 5mm;"><table style="width: 100%; border: none; margin-bottom: 20px; border-bottom: 2px solid ' + themeColor + '; padding-bottom: 10px;"><tr><td style="width: 33%; text-align: right; vertical-align: middle; color: #333;"><div style="font-size: 16px; font-weight: bold;">تجمع شباب الشريعة</div><div style="font-size: 14px; margin-top:2px;">مديرية البصرة</div></td><td style="width: 34%; text-align: center; vertical-align: middle;"><div style="display: inline-block; border: 2px solid ' + themeColor + '; border-radius: 25px; padding: 6px 18px; color: ' + themeColor + '; font-weight: bold; font-size: 17px; background: #fff; box-shadow: 0px 3px 0px rgba(0,0,0,0.05);">معلومات الملف الشخصي</div></td><td style="width: 33%; text-align: left; vertical-align: middle;"><img src="' + window.parseImageUrl(u.avatar) + '" style="height: 80px; width: 80px; border-radius: 8px; object-fit: cover; border: 2px solid ' + themeColor + ';"></td></tr></table>' + buildBasicSection("المعلومات الأساسية", u.fullName, u.basic) + buildPrintGrid("معلومات السكن", u.housing) + '</div></div>';
    let page2 = '<div class="pdf-profile-page" style="' + frameStyle + '"><div style="position: absolute; top: 5mm; bottom: 5mm; left: 5mm; right: 5mm; border: 3px solid ' + themeColor + '; border-radius: 15px; pointer-events: none; z-index: 1;"></div><div style="position: absolute; top: 7mm; bottom: 7mm; left: 7mm; right: 7mm; border: 1px solid ' + themeColor + '; border-radius: 10px; pointer-events: none; z-index: 1;"></div><div style="position: relative; z-index: 2; padding: 5mm; padding-bottom: 20mm; height: 100%; display: flex; flex-direction: column;"><div style="height: 10px;"></div>' + buildPrintGrid("الدورات والمهارات", processedSkills) + buildPrintTable("العمل والمسؤوليات", u.work) + buildPrintTable("كتب الشكر والتقدير", u.awards) + buildPrintTable("السجل الانضباطي", u.punishments) + '</div><div style="position: absolute; bottom: 15mm; left: 15mm; right: 15mm; border-top: 2px dashed ' + themeColor + '; padding-top: 10px; font-size: 14px; color: #333; direction: rtl; z-index: 3; text-align: right;"><strong>مسؤول الموارد :</strong><span style="font-weight: bold; margin-right: 5px;">محمد بشير الحلفي</span></div></div>';
    
    let htmlContent = '<div id="printableProfileArea" style="background:transparent; direction: ltr; margin: 0 auto; width: 210mm;">' + page1 + page2 + '</div>';

    document.getElementById('pdfContentArea').innerHTML = htmlContent;
    document.getElementById('pdfPreviewModal').classList.remove('hidden');
};

window.closePdfPreview = function() { document.getElementById('pdfPreviewModal').classList.add('hidden'); };

window.executePdfDownload = async function() {
    const element = document.getElementById('printableProfileArea');
    if(!element) return;
    const container = document.getElementById('pdfContentArea');
    if(container) container.scrollTop = 0;
    
    const u = window.MEMBERS_DATABASE[window.currentActiveAlias];
    const opt = { 
        margin: 0, 
        filename: 'ملف_معلومات_' + u.fullName.replace(/\s+/g, '_') + '.pdf', 
        image: { type: 'jpeg', quality: 1 }, 
        html2canvas: { scale: 2, useCORS: true, scrollY: 0, scrollX: 0 }, 
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } 
    };
    
    window.showProgressBar("جاري تصدير الملف الشخصي... ⏳");
    
    setTimeout(async function() {
        try {
            const pages = element.querySelectorAll('.pdf-profile-page');
            if (pages.length > 0) {
                let worker = html2pdf().set(opt).from(pages[0]).toPdf();
                window.updateProgressBar(Math.round((1 / pages.length) * 100));
                
                for (let i = 1; i < pages.length; i++) {
                    worker = worker.get('pdf').then(function(pdf) {
                        pdf.addPage();
                        let percent = Math.round(((i + 1) / pages.length) * 100);
                        window.updateProgressBar(percent);
                    }).from(pages[i]).toContainer().toCanvas().toPdf();
                }
                await worker.save();
            } else {
                window.updateProgressBar(50);
                await html2pdf().set(opt).from(element).save();
                window.updateProgressBar(100);
            }
            
            setTimeout(function() {
                window.hideProgressBar();
                window.closePdfPreview(); 
                window.showNotification("تم تحميل الملف بنجاح ✅"); 
            }, 500);
        } catch (err) { 
            console.error(err);
            window.hideProgressBar();
            window.showNotification("حدث خطأ أثناء التصدير ⚠️"); 
        }
    }, 500);
};

// =========================================================================
// نظام المساعد الذكي المتطور (متوافق 100% مع شاشات الهاتف والآيباد + قراءة الصور)
// =========================================================================

window.aiSessions = [];
window.currentAiSessionId = null;
window.pendingAiImage = null;

window.initAiSessionsData = function() {
    let saved = localStorage.getItem('tajammu_ai_sessions_v2');
    if (saved) {
        try { window.aiSessions = JSON.parse(saved); } catch(e) { window.aiSessions = []; }
    } else {
        let oldHistory = localStorage.getItem('tajammu_ai_chat');
        if (oldHistory) {
            try {
                let oldMsgs = JSON.parse(oldHistory);
                if (oldMsgs && oldMsgs.length > 0) {
                    let migratedMsgs = oldMsgs.map((m, idx) => ({
                        id: 'msg_old_' + idx + '_' + Date.now(),
                        role: m.role === 'user' ? 'user' : 'ai',
                        text: m.text,
                        rawText: m.copyRaw ? decodeURIComponent(m.copyRaw) : m.text.replace(/<br>/g, '\n').replace(/<[^>]*>/g, ''),
                        time: 'سابقاً'
                    }));
                    window.aiSessions.push({
                        id: 'session_' + Date.now(),
                        title: 'محادثة سابقة',
                        messages: migratedMsgs
                    });
                    window.saveAiSessionsData();
                }
            } catch(e) {}
        }
    }

    if (window.aiSessions.length === 0) {
        window.createNewAiSession(false);
    } else if (!window.currentAiSessionId || !window.aiSessions.find(s => s.id === window.currentAiSessionId)) {
        window.currentAiSessionId = window.aiSessions[0].id;
    }
};

window.saveAiSessionsData = function() {
    try {
        localStorage.setItem('tajammu_ai_sessions_v2', JSON.stringify(window.aiSessions));
    } catch (e) {
        console.warn("Storage full");
    }
};

window.ensureGeminiScreenBuilt = function() {
    if (document.getElementById('geminiFullScreen')) return;

    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
        #geminiFullScreen {
            position: fixed;
            inset: 0;
            width: 100%;
            height: 100vh;
            height: 100dvh;
            background: var(--bg-main, #0B132B);
            z-index: 9500;
            display: flex;
            flex-direction: column;
            direction: rtl;
            font-family: 'Segoe UI', Tahoma, sans-serif;
            color: var(--text-main, #ffffff);
            overflow: hidden;
            box-sizing: border-box;
        }
        #geminiFullScreen.hidden {
            display: none !important;
        }
        body.light-mode #geminiFullScreen {
            background: #f4f7f6;
            color: #0B132B;
        }
        .gemini-top-bar {
            min-height: 56px;
            padding: env(safe-area-inset-top, 0px) 14px 0 14px;
            background: var(--panel-bg, #1C2541);
            border-bottom: 1px solid rgba(0, 180, 216, 0.25);
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-shrink: 0;
            box-shadow: 0 2px 10px rgba(0,0,0,0.15);
        }
        body.light-mode .gemini-top-bar {
            background: #ffffff;
            border-bottom: 1px solid #ddd;
        }
        .gemini-body-wrap {
            display: flex;
            flex: 1;
            min-height: 0;
            position: relative;
            overflow: hidden;
        }
        .gemini-right-sidebar {
            width: 270px;
            background: rgba(18, 25, 43, 0.98);
            border-left: 1px solid rgba(0, 180, 216, 0.2);
            display: flex;
            flex-direction: column;
            transition: transform 0.3s ease;
            z-index: 100;
            flex-shrink: 0;
            height: 100%;
        }
        body.light-mode .gemini-right-sidebar {
            background: #eef2f5;
            border-left: 1px solid #ccc;
        }
        .gemini-sidebar-header {
            padding: 12px 14px;
            border-bottom: 1px solid rgba(255,255,255,0.08);
            flex-shrink: 0;
        }
        .gemini-new-chat-btn {
            width: 100%;
            padding: 10px 14px;
            background: linear-gradient(135deg, #00B4D8, #0077B6);
            color: #fff;
            border: none;
            border-radius: 25px;
            font-weight: bold;
            font-size: 0.92rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            box-shadow: 0 4px 12px rgba(0, 180, 216, 0.3);
        }
        .gemini-sessions-list {
            flex: 1;
            min-height: 0;
            overflow-y: auto;
            padding: 10px;
            display: flex;
            flex-direction: column;
            gap: 6px;
        }
        .gemini-session-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 12px;
            border-radius: 10px;
            cursor: pointer;
            background: rgba(255,255,255,0.03);
            border: 1px solid transparent;
            transition: 0.2s;
        }
        body.light-mode .gemini-session-item {
            background: rgba(0,0,0,0.03);
        }
        .gemini-session-item.active {
            background: rgba(0, 180, 216, 0.2);
            border-color: var(--gold, #00B4D8);
            font-weight: bold;
        }
        .gemini-session-title {
            font-size: 0.88rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 185px;
        }
        .gemini-del-session-btn {
            background: transparent;
            border: none;
            color: #ef4444;
            cursor: pointer;
            font-size: 0.95rem;
            padding: 2px 6px;
            border-radius: 6px;
        }
        .gemini-main-area {
            flex: 1;
            display: flex;
            flex-direction: column;
            min-width: 0;
            min-height: 0;
            height: 100%;
            overflow: hidden;
            position: relative;
        }
        .gemini-messages-box {
            flex: 1;
            min-height: 0;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            padding: 16px;
            display: flex;
            flex-direction: column;
            gap: 14px;
            scroll-behavior: smooth;
        }
        .gemini-msg-card {
            max-width: 86%;
            padding: 12px 16px;
            border-radius: 16px;
            position: relative;
            line-height: 1.65;
            font-size: 0.95rem;
            word-wrap: break-word;
            box-shadow: 0 3px 10px rgba(0,0,0,0.1);
            flex-shrink: 0;
        }
        .gemini-msg-card.user {
            align-self: flex-start;
            background: linear-gradient(135deg, #0077B6, #023E8A);
            color: #ffffff;
            border-bottom-right-radius: 4px;
        }
        .gemini-msg-card.ai {
            align-self: flex-end;
            background: var(--panel-bg, #1C2541);
            border: 1px solid rgba(0, 180, 216, 0.25);
            color: var(--text-main, #ffffff);
            border-bottom-left-radius: 4px;
            width: 100%;
            max-width: 820px;
        }
        body.light-mode .gemini-msg-card.ai {
            background: #ffffff;
            color: #111;
            border-color: #cce3de;
        }
        .gemini-msg-header {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 6px;
            font-size: 0.82rem;
            font-weight: bold;
            opacity: 0.9;
        }
        .gemini-msg-actions {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 8px;
            padding-top: 6px;
            border-top: 1px dashed rgba(255,255,255,0.15);
            font-size: 0.8rem;
        }
        body.light-mode .gemini-msg-card.ai .gemini-msg-actions {
            border-top-color: rgba(0,0,0,0.1);
        }
        .gemini-action-icon-btn {
            background: rgba(255,255,255,0.07);
            border: 1px solid rgba(255,255,255,0.15);
            color: inherit;
            padding: 4px 10px;
            border-radius: 8px;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 5px;
            font-size: 0.78rem;
        }
        body.light-mode .gemini-msg-card.ai .gemini-action-icon-btn {
            background: #f0f4f8;
            border-color: #d9e2ec;
            color: #333;
        }
        .gemini-action-icon-btn.del:hover {
            background: rgba(239, 68, 68, 0.25);
            border-color: #ef4444;
            color: #ff6b6b;
        }
        .gemini-input-zone {
            padding: 8px 12px;
            padding-bottom: calc(10px + env(safe-area-inset-bottom, 0px));
            background: var(--panel-bg, #1C2541);
            border-top: 1px solid rgba(0, 180, 216, 0.2);
            display: flex;
            flex-direction: column;
            gap: 6px;
            flex-shrink: 0;
            z-index: 20;
        }
        body.light-mode .gemini-input-zone {
            background: #ffffff;
            border-top: 1px solid #ddd;
        }
        .gemini-quick-tools {
            display: flex;
            gap: 6px;
            overflow-x: auto;
            padding-bottom: 2px;
            scrollbar-width: none;
        }
        .gemini-quick-tools::-webkit-scrollbar {
            display: none;
        }
        .gemini-chip-btn {
            background: rgba(0, 180, 216, 0.12);
            border: 1px solid rgba(0, 180, 216, 0.35);
            color: var(--text-main, #fff);
            padding: 4px 10px;
            border-radius: 18px;
            font-size: 0.76rem;
            white-space: nowrap;
            cursor: pointer;
        }
        body.light-mode .gemini-chip-btn {
            color: #0B132B;
            background: #e0f2fe;
        }
        .gemini-attachment-preview {
            display: flex;
            align-items: center;
            gap: 10px;
            background: rgba(0, 180, 216, 0.12);
            border: 1px dashed #00B4D8;
            padding: 6px 10px;
            border-radius: 10px;
            max-width: 900px;
            width: 100%;
            margin: 0 auto;
            box-sizing: border-box;
        }
        .gemini-attachment-preview img {
            width: 42px;
            height: 42px;
            object-fit: cover;
            border-radius: 6px;
            border: 1px solid #00B4D8;
        }
        .gemini-input-row {
            display: flex;
            align-items: center;
            gap: 8px;
            max-width: 900px;
            width: 100%;
            margin: 0 auto;
        }
        .gemini-plus-btn {
            width: 42px;
            height: 42px;
            border-radius: 50%;
            border: 1.5px solid rgba(0, 180, 216, 0.5);
            background: rgba(0, 180, 216, 0.12);
            color: var(--gold, #00B4D8);
            font-size: 1.2rem;
            font-weight: bold;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }
        .gemini-textarea {
            flex: 1;
            min-height: 42px;
            max-height: 100px;
            padding: 9px 14px;
            border-radius: 22px;
            border: 1.5px solid rgba(0, 180, 216, 0.4);
            background: rgba(0,0,0,0.2);
            color: inherit;
            font-family: inherit;
            font-size: 0.92rem;
            resize: none;
            outline: none;
            box-sizing: border-box;
        }
        body.light-mode .gemini-textarea {
            background: #f8fafc;
            color: #111;
        }
        .gemini-send-btn {
            width: 42px;
            height: 42px;
            border-radius: 50%;
            border: none;
            background: linear-gradient(135deg, #00B4D8, #0077B6);
            color: #fff;
            font-size: 1.1rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }
        .gemini-mobile-menu-btn {
            display: none;
            background: transparent;
            border: 1px solid rgba(0, 180, 216, 0.4);
            color: inherit;
            padding: 5px 10px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 0.88rem;
            font-weight: bold;
        }
        @media (max-width: 900px) {
            .gemini-mobile-menu-btn {
                display: inline-flex;
                align-items: center;
                gap: 5px;
            }
            .gemini-right-sidebar {
                position: absolute;
                top: 0; right: 0; bottom: 0;
                height: 100%;
                transform: translateX(100%);
                box-shadow: -5px 0 25px rgba(0,0,0,0.5);
            }
            .gemini-right-sidebar.open {
                transform: translateX(0);
            }
            .gemini-msg-card {
                max-width: 94%;
            }
        }
        @keyframes pulseText {
            0% { opacity: 0.5; }
            50% { opacity: 1; }
            100% { opacity: 0.5; }
        }
        .gemini-typing-box {
            display: flex;
            align-items: center;
            gap: 10px;
            color: var(--gold, #00B4D8);
            font-weight: bold;
            animation: pulseText 1.4s infinite;
        }
    `;
    document.head.appendChild(styleEl);

    const screenDiv = document.createElement('div');
    screenDiv.id = 'geminiFullScreen';
    screenDiv.className = 'hidden';
    screenDiv.innerHTML = `
        <div class="gemini-top-bar">
            <div style="display: flex; align-items: center; gap: 8px;">
                <button class="gemini-mobile-menu-btn" onclick="window.toggleGeminiSidebar()">☰ المحادثات</button>
                <div style="display: flex; align-items: center; gap: 6px;">
                    <span style="font-size: 1.35rem;">✨</span>
                    <div>
                        <h3 style="margin: 0; font-size: 0.98rem; color: var(--gold, #00B4D8);">مساعد التجمع الذكي (Gemini)</h3>
                        <span style="font-size: 0.68rem; opacity: 0.75; display: block;">تجمع شباب الشريعة - مديرية البصرة</span>
                    </div>
                </div>
            </div>
            <button class="panel-btn mini-btn" style="padding: 6px 14px; border-radius: 18px; font-weight: bold; font-size: 0.85rem;" onclick="window.closeChatModal()">↩ خروج</button>
        </div>

        <div class="gemini-body-wrap">
            <div class="gemini-right-sidebar" id="geminiRightSidebar">
                <div class="gemini-sidebar-header">
                    <button class="gemini-new-chat-btn" onclick="window.createNewAiSession(true)">
                        <span>➕</span> محادثة جديدة
                    </button>
                </div>
                <div style="padding: 8px 14px 4px; font-size: 0.75rem; opacity: 0.7; font-weight: bold;">سجل المحادثات المحفوظة في جهازك:</div>
                <div class="gemini-sessions-list" id="geminiSessionsList"></div>
            </div>

            <div class="gemini-main-area" onclick="window.closeGeminiSidebarOnMobile()">
                <div class="gemini-messages-box" id="geminiMessagesBox"></div>

                <div class="gemini-input-zone">
                    <div id="geminiImagePreviewBar" class="gemini-attachment-preview hidden">
                        <img id="geminiPreviewImg" src="" alt="preview">
                        <div style="flex: 1; font-size: 0.8rem;">
                            <div style="font-weight: bold; color: var(--gold, #00B4D8);">📷 تم إرفاق صورة للتحليل</div>
                            <div style="opacity: 0.8; font-size: 0.74rem;">اكتب سؤالك حول الصورة أو اضغط إرسال مباشرة</div>
                        </div>
                        <button onclick="window.clearAiImageSelection()" style="background: rgba(239,68,68,0.2); border: 1px solid #ef4444; color: #ff6b6b; border-radius: 50%; width: 26px; height: 26px; cursor: pointer; font-weight: bold;">✕</button>
                    </div>

                    <div class="gemini-quick-tools">
                        <button class="gemini-chip-btn" onclick="window.insertQuickPrompt('اكتب تقرير نشاط إعلامي مفصل حول: ')">📝 كتابة تقرير نشاط</button>
                        <button class="gemini-chip-btn" onclick="window.insertQuickPrompt('اكتب كليشة كتاب شكر وتقدير رسمي موجه إلى: ')">🏅 كليشة كتاب شكر</button>
                        <button class="gemini-chip-btn" onclick="window.insertQuickPrompt('ضع خطة برنامج شبابي متكامل لشهر: ')">📅 خطة برنامج</button>
                        <button class="gemini-chip-btn" onclick="document.getElementById('geminiImageInput').click()">📷 رفع صورة واستخراج نصها</button>
                    </div>

                    <div class="gemini-input-row">
                        <input type="file" id="geminiImageInput" accept="image/*" style="display: none;" onchange="window.handleAiImageSelect(event)">
                        <button class="gemini-plus-btn" onclick="document.getElementById('geminiImageInput').click()" title="إرفاق صورة لتحليلها أو نسخ نصها">➕</button>
                        <textarea id="geminiPromptInput" class="gemini-textarea" rows="1" placeholder="اكتب سؤالك هنا، أو اضغط (➕) لرفع صورة..." onkeydown="if(event.key==='Enter' && !event.shiftKey){ event.preventDefault(); window.sendChatMessage(); }"></textarea>
                        <button class="gemini-send-btn" onclick="window.sendChatMessage()" title="إرسال">➤</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(screenDiv);
};

window.handleAiImageSelect = function(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
        window.showNotification("⚠️ يرجى اختيار ملف صورة صالح فقط");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const MAX_SIZE = 1100;
            let width = img.width;
            let height = img.height;

            if (width > height && width > MAX_SIZE) {
                height *= MAX_SIZE / width;
                width = MAX_SIZE;
            } else if (height > MAX_SIZE) {
                width *= MAX_SIZE / height;
                height = MAX_SIZE;
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            const dataUrl = canvas.toDataURL('image/jpeg', 0.82);
            const base64Clean = dataUrl.split(',')[1];

            window.pendingAiImage = {
                dataUrl: dataUrl,
                base64: base64Clean,
                mimeType: 'image/jpeg'
            };

            const previewBar = document.getElementById('geminiImagePreviewBar');
            const previewImg = document.getElementById('geminiPreviewImg');
            if (previewBar && previewImg) {
                previewImg.src = dataUrl;
                previewBar.classList.remove('hidden');
            }

            const input = document.getElementById('geminiPromptInput');
            if (input && !input.value.trim()) {
                input.placeholder = "اكتب ماذا تريد من الصورة (مثلاً: انسخ النص الموجود في الصورة)...";
                input.focus();
            }
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
};

window.clearAiImageSelection = function() {
    window.pendingAiImage = null;
    const fileInput = document.getElementById('geminiImageInput');
    if (fileInput) fileInput.value = '';
    const previewBar = document.getElementById('geminiImagePreviewBar');
    if (previewBar) previewBar.classList.add('hidden');
    const input = document.getElementById('geminiPromptInput');
    if (input) input.placeholder = "اكتب سؤالك هنا، أو اضغط (➕) لرفع صورة...";
};

window.toggleGeminiSidebar = function() {
    const sb = document.getElementById('geminiRightSidebar');
    if (sb) sb.classList.toggle('open');
};

window.closeGeminiSidebarOnMobile = function() {
    if (window.innerWidth <= 900) {
        const sb = document.getElementById('geminiRightSidebar');
        if (sb && sb.classList.contains('open')) sb.classList.remove('open');
    }
};

window.insertQuickPrompt = function(text) {
    const input = document.getElementById('geminiPromptInput');
    if (!input) return;
    input.value = text;
    input.focus();
};

window.openChatModal = function() {
    const oldModal = document.getElementById('aiChatModal');
    if (oldModal) oldModal.classList.add('hidden');

    window.ensureGeminiScreenBuilt();
    window.initAiSessionsData();
    window.renderGeminiSidebar();
    window.renderCurrentGeminiMessages();

    document.getElementById('geminiFullScreen').classList.remove('hidden');
    setTimeout(function() {
        const input = document.getElementById('geminiPromptInput');
        if (input) input.focus();
    }, 150);
};

window.closeChatModal = function() {
    const fullScreen = document.getElementById('geminiFullScreen');
    if (fullScreen) fullScreen.classList.add('hidden');
    const oldModal = document.getElementById('aiChatModal');
    if (oldModal) oldModal.classList.add('hidden');
};

window.createNewAiSession = function(shouldRender = true) {
    const newSession = {
        id: 'session_' + Date.now(),
        title: 'محادثة جديدة',
        messages: []
    };
    window.aiSessions.unshift(newSession);
    window.currentAiSessionId = newSession.id;
    window.saveAiSessionsData();

    if (shouldRender) {
        window.renderGeminiSidebar();
        window.renderCurrentGeminiMessages();
        window.closeGeminiSidebarOnMobile();
        const input = document.getElementById('geminiPromptInput');
        if (input) input.focus();
    }
};

window.switchAiSession = function(sessionId) {
    window.currentAiSessionId = sessionId;
    window.renderGeminiSidebar();
    window.renderCurrentGeminiMessages();
    window.closeGeminiSidebarOnMobile();
};

window.deleteAiSession = function(event, sessionId) {
    event.stopPropagation();
    window.aiSessions = window.aiSessions.filter(s => s.id !== sessionId);
    if (window.aiSessions.length === 0) {
        window.createNewAiSession(false);
    } else if (window.currentAiSessionId === sessionId) {
        window.currentAiSessionId = window.aiSessions[0].id;
    }
    window.saveAiSessionsData();
    window.renderGeminiSidebar();
    window.renderCurrentGeminiMessages();
    window.showNotification("تم حذف المحادثة 🗑️");
};

window.deleteSingleAiMessage = function(msgId) {
    const session = window.aiSessions.find(s => s.id === window.currentAiSessionId);
    if (!session) return;
    session.messages = session.messages.filter(m => m.id !== msgId);
    window.saveAiSessionsData();
    window.renderCurrentGeminiMessages();
    window.showNotification("تم حذف الرسالة 🗑️");
};

window.renderGeminiSidebar = function() {
    const listEl = document.getElementById('geminiSessionsList');
    if (!listEl) return;
    listEl.innerHTML = '';

    window.aiSessions.forEach(session => {
        const item = document.createElement('div');
        item.className = 'gemini-session-item' + (session.id === window.currentAiSessionId ? ' active' : '');
        item.onclick = function() { window.switchAiSession(session.id); };

        item.innerHTML = `
            <div class="gemini-session-title">💬 ${session.title}</div>
            <button class="gemini-del-session-btn" title="حذف هذه المحادثة" onclick="window.deleteAiSession(event, '${session.id}')">🗑️</button>
        `;
        listEl.appendChild(item);
    });
};

window.renderCurrentGeminiMessages = function() {
    const box = document.getElementById('geminiMessagesBox');
    if (!box) return;
    box.innerHTML = '';

    const session = window.aiSessions.find(s => s.id === window.currentAiSessionId);

    const welcomeCard = document.createElement('div');
    welcomeCard.className = 'gemini-msg-card ai';
    welcomeCard.innerHTML = `
        <div class="gemini-msg-header"><span>🤖</span> <span>المساعد الذكي (تجمع شباب الشريعة)</span></div>
        <div>مرحباً بك! يمكنك طرح أي سؤال، أو طلب كتابة التقارير وكتب الشكر، أو الضغط على زر <strong>(➕)</strong> لإرفاق صورة ليقوم الذكاء بقراءتها واستخراج النصوص والتفاصيل منها.</div>
    `;
    box.appendChild(welcomeCard);

    if (!session || session.messages.length === 0) return;

    session.messages.forEach(msg => {
        const card = document.createElement('div');
        card.className = 'gemini-msg-card ' + (msg.role === 'user' ? 'user' : 'ai');
        card.id = msg.id;

        const senderTitle = msg.role === 'user' ? '👤 أنت' : '🤖 المساعد الذكي';
        const safeRaw = encodeURIComponent(msg.rawText || '');

        let attachedImgHtml = '';
        if (msg.attachedImage) {
            attachedImgHtml = `
                <div style="margin-bottom: 10px;">
                    <img src="${msg.attachedImage}" alt="صورة مرفقة" style="max-width: 220px; max-height: 180px; border-radius: 10px; border: 1.5px solid rgba(255,255,255,0.4); display: block;">
                </div>
            `;
        }

        card.innerHTML = `
            <div class="gemini-msg-header"><span>${senderTitle}</span></div>
            ${attachedImgHtml}
            <div>${msg.text}</div>
            <div class="gemini-msg-actions">
                <button class="gemini-action-icon-btn" onclick="window.copyAiText(this, '${safeRaw}')" title="نسخ هذه الرسالة">📋 نسخ</button>
                <button class="gemini-action-icon-btn del" onclick="window.deleteSingleAiMessage('${msg.id}')" title="حذف هذه الرسالة فقط">🗑️ حذف</button>
            </div>
        `;
        box.appendChild(card);
    });

    box.scrollTop = box.scrollHeight;
};

window.sendChatMessage = async function() {
    window.ensureGeminiScreenBuilt();
    const inputEl = document.getElementById('geminiPromptInput') || document.getElementById('aiChatInput');
    if (!inputEl) return;

    let messageText = inputEl.value.trim();
    const hasImage = !!window.pendingAiImage;

    if (!messageText && !hasImage) return;
    if (!messageText && hasImage) {
        messageText = "قم بقراءة هذه الصورة واستخراج النص والتفاصيل الموجودة فيها بدقة ووضوح.";
    }

    inputEl.value = '';
    const currentImageObj = window.pendingAiImage;
    window.clearAiImageSelection();

    const session = window.aiSessions.find(s => s.id === window.currentAiSessionId);
    if (!session) return;

    if (session.messages.length === 0) {
        session.title = (hasImage ? '📷 ' : '') + messageText.substring(0, 26) + (messageText.length > 26 ? '...' : '');
        window.renderGeminiSidebar();
    }

    const formattedUserMsg = messageText.replace(/\n/g, '<br>');
    const userMsgObj = {
        id: 'msg_' + Date.now() + '_u',
        role: 'user',
        text: formattedUserMsg,
        rawText: messageText,
        attachedImage: currentImageObj ? currentImageObj.dataUrl : null
    };
    session.messages.push(userMsgObj);
    window.saveAiSessionsData();
    window.renderCurrentGeminiMessages();

    const box = document.getElementById('geminiMessagesBox');
    const tempAiId = 'temp_ai_' + Date.now();
    const typingCard = document.createElement('div');
    typingCard.className = 'gemini-msg-card ai';
    typingCard.id = tempAiId;
    typingCard.innerHTML = `
        <div class="gemini-msg-header"><span>🤖 المساعد الذكي</span></div>
        <div class="gemini-typing-box" id="${tempAiId}_status">
            <div style="width: 18px; height: 18px; border: 3px solid rgba(0,180,216,0.3); border-top-color: #00B4D8; border-radius: 50%; animation: sajiSpin 0.8s linear infinite;"></div>
            <span>${hasImage ? '🔍 جاري فحص الصورة وقراءة تفاصيلها...' : '⏳ جاري الكتابة...'}</span>
        </div>
    `;
    box.appendChild(typingCard);
    box.scrollTop = box.scrollHeight;

    const statusMessages = hasImage ? [
        "🔍 جاري فحص الصورة وقراءة النصوص...",
        "🧠 جاري تحليل المحتوى وترتيب التفاصيل...",
        "✍️ جاري كتابة الإجابة النهائية..."
    ] : [
        "⏳ جاري الكتابة...",
        "🧠 جاري التفكير وتحليل الطلب...",
        "✍️ جاري صياغة وترتيب النص الكامل..."
    ];
    let statusIdx = 0;
    const statusInterval = setInterval(() => {
        statusIdx = (statusIdx + 1) % statusMessages.length;
        const stEl = document.getElementById(tempAiId + '_status');
        if (stEl) {
            stEl.innerHTML = `
                <div style="width: 18px; height: 18px; border: 3px solid rgba(0,180,216,0.3); border-top-color: #00B4D8; border-radius: 50%; animation: sajiSpin 0.8s linear infinite;"></div>
                <span>${statusMessages[statusIdx]}</span>
            `;
        }
    }, 2200);

    try {
        let recentContext = session.messages.slice(-7, -1).map(m => (m.role === 'user' ? 'المستخدم: ' : 'المساعد: ') + m.rawText).join('\n');
        const systemPrompt = "أنت مساعد ذكي خاص بكادر (تجمع شباب الشريعة - مديرية البصرة). مهمتك مساعدة الكادر في كتابة تقارير الأنشطة المفصلة، كليشات كتب الشكر، التخطيط للبرامج، وقراءة الصور والوثائق المرفقة واستخراج النصوص منها بدقة واحترافية.\n\n" + (recentContext ? "سياق المحادثة السابقة:\n" + recentContext + "\n\n" : "") + "طلب المستخدم الحالي:\n";
        const fullPrompt = systemPrompt + messageText;

        const payloadObj = { prompt: fullPrompt };
        if (currentImageObj) {
            payloadObj.imageBase64 = currentImageObj.base64;
            payloadObj.imageMimeType = currentImageObj.mimeType;
        }

        const response = await fetch(GAS_AI_URL, { 
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(payloadObj)
        });

        clearInterval(statusInterval);
        if (!response.ok) throw new Error("حدث خطأ في السيرفر");

        const data = await response.json();
        if (!data.success) throw new Error(data.error || "خطأ من الذكاء الاصطناعي");

        let fullAiText = data.text;
        let formattedAiText = fullAiText.replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--gold, #00B4D8);">$1</strong>'); 
        formattedAiText = formattedAiText.replace(/\*(.*?)\*/g, '<em>$1</em>');
        formattedAiText = formattedAiText.replace(/\n/g, '<br>');

        const aiMsgObj = {
            id: 'msg_' + Date.now() + '_ai',
            role: 'ai',
            text: formattedAiText,
            rawText: fullAiText
        };

        session.messages.push(aiMsgObj);
        window.saveAiSessionsData();
        window.renderCurrentGeminiMessages();

    } catch (error) {
        clearInterval(statusInterval);
        console.error("AI Error:", error);
        const tempCard = document.getElementById(tempAiId);
        if (tempCard) {
            tempCard.innerHTML = '<span style="color: #ef4444; font-weight: bold;">⚠️ عذراً، فشل الاتصال بالسيرفر. تأكد من تحديث كود Google Apps Script وحاول مجدداً.</span>';
        }
    }
};