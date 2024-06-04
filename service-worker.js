const CACHE_NAME = 'phaser-2048-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/images/puppy1.jpg',
  '/images/puppy2.jpg',
  '/images/puppy3.jpg',
  '/images/puppy4.jpg',
  '/src/styles.css',
  '/src/main.js'
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
