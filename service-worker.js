const CACHE_NAME = "tga-sms-v1";

const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/admin_dashboard.html",
  "/staff_dashboard.html",
  "/parent_dashboard.html",
  "/student_dashboard.html",
  "/transport-logistics.html",
  "/logo.png",
  "/manifest.json"
];

// Install
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

// Activate
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => key !== CACHE_NAME && caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request)
    )
  );
});
