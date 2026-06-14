/**
 * محرك تشغيل الخدمة الذكي وتفعيل تطبيق الهاتف (PWA Service Worker)
 * تجمع شباب الشريعة - مفوضية البصرة
 */

// حدث التثبيت الأولي للتطبيق
self.addEventListener('install', (e) => {
    console.log('[تطبيق الشباب] جاري تثبيت ملفات الخدمة...');
    self.skipWaiting(); // إجبار التطبيق على التحديث الفوري
});

// حدث تفعيل المحرك وتصفية الذاكرة
self.addEventListener('activate', (e) => {
    console.log('[تطبيق الشباب] المحرك نشط وجاهز للعمل!');
    return self.clients.claim();
});

// دالة الـ fetch الحقيقية والكاملة (هي المفتاح الذي يجبر المتصفح على إظهار زر التثبيت فوراً)
self.addEventListener('fetch', (e) => {
    e.respondWith(
        fetch(e.request).catch(() => {
            // في حال انقطاع الإنترنت، يظل التطبيق شغالاً ويجلب البيانات من الذاكرة
            return caches.match(e.request);
        })
    );
});
