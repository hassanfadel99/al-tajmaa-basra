self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
});

// هذا السطر هو السر! بدونه لن يظهر إشعار التثبيت التلقائي
self.addEventListener('fetch', (e) => {
    // المتصفح يشترط وجود هذه الدالة ليعتبر الموقع تطبيقاً قابلاً للتحميل (PWA)
});
