// cash name
const CACHE_NAME = 'CACHE-7';
const toCache = [
  '/',
  '/?',
  '/index.html',
  '/scripts/index.js',
  '/scripts/api.js',
  '/styles/index.css',
  '/scripts/pwa.js',
  '/images/baseline_create_black_18dp2.png',
  '/images/baseline_navigate_before_black_18dp.png',
  '/images/baseline_navigate_next_black_18dp.png',
  '/images/baseline_search_black_18dp2.png',
  '/images/android-icon-192x192.png',
  '/images/android-icon-36x36.png',
  '/images/android-icon-48x48.png',
  '/images/android-icon-72x72.png',
  '/images/android-icon-96x96.png',
  '/images/android-icon-144x144.png',
  '/images/favicon-16x16.png',
  '/images/favicon-32x32.png',
  '/images/favicon-96x96.png',
];

self.addEventListener('install', function (event) {
  console.log('used to register the service worker')
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        return cache.addAll(toCache)
      })
      .then(self.skipWaiting())
  )
});

self.addEventListener('fetch', function (event) {
  console.log('used to intercept requests so we can check for the file or data in the cache');
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        return caches.open(CACHE_NAME)
          .then((cache) => {
            return cache.match(event.request)
          })
      })
  )
});

self.addEventListener('activate', function (event) {
  console.log('this event triggers when the service worker activates');
  event.waitUntil(
    caches.keys()
      .then((keyList) => {
        return Promise.all(keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache', key)
            return caches.delete(key)
          }
        }))
      })
      .then(() => self.clients.claim())
  )
});
