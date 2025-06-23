const CACHE_NAME = 'ilac-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/style.css',          // Varsa CSS dosyanı ekle
  '/app.js',             // JavaScript dosyan
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// Kurulumda cache'le
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Ağdan getirme yoksa cache'den getir
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() =>
      caches.match(event.request)
    )
  );
});
