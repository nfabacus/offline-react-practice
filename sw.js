self.addEventListener('install', function(event){
  console.log('[Service Worker] Installing Service Worker ...', event)
  event.waitUntil(
    caches.open('static')
    .then(function(cache){
      console.log('[Service Worker] Precaching App Shell')
      cache.add('/')
    })
  )
})

self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activating Service Worker ...', event)
  return self.clients.claim() //ensures Service Worker is loaded correctly.
})

self.addEventListener('fetch', function(event){
  event.respondWith(fetch(event.request))
})