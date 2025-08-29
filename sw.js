const CACHE_NAME = "pwa-sqlite-cache-v1";
const urlsToCache = [
  "/pwa-gps-demo/",
  "/pwa-gps-demo/index.html",
  "/pwa-gps-demo/app.js",
  "/pwa-gps-demo/icon-192.png",
  "/pwa-gps-demo/icon-512.png",
  "/pwa-gps-demo/manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
