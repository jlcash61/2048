const CACHE_NAME = 'phaser-2048-cache-v6.1';
const urlsToCache = [
  '/2048/',
  '/2048/index.html',
  '/2048/style.css',
  '/2048/app.js',
  '/2048/manifest.json',
  '/2048/images/2048icon192.png',
  '/2048/images/2048icon512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/phaser/3.55.2/phaser.min.js'
];


self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
