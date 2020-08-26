let cacheName = 'static-cache-1'
let filesToCache = ['/', '/index.html', '/css/style.css']

self.addEventListener('install', function (event) {
  console.log('Service-Worker-Installed')
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(filesToCache)
    })
  )
})
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      cacheNames.map((k) => {
        if (k === cacheName) caches.delete(k)
      })
    })
  )
})
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response
      }
      return fetch(event.request)
    })
  )
})
