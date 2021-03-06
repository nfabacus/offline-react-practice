var CACHE_STATIC_NAME = 'static-v9'
var CACHE_DYNAMIC_NAME =  'dynamic-v9'

self.addEventListener('install', function(event){
  console.log('[Service Worker] Installing Service Worker ...', event);
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME)
    .then(function(cache){
      console.log('[Service Worker] Precaching App Shell');
      cache.addAll([
        '/',
        '/index.html',
        '/build/bundle.js',
        '/build/styles.css'
      ])
    })
    .catch(function(err){
      //do nothing here.
    })
  )
})

self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activating Service Worker ...', event);
  event.waitUntil(
    caches.keys()   //gets the array of the keys of caches e.g static-v2, dynamic-v2..
      .then(function(keyList){
        return Promise.all(keyList.map(function(key){
          if(key !== CACHE_STATIC_NAME && key !==CACHE_DYNAMIC_NAME) {
            console.log('[Service Worker] Removing old cache.', key);
            return caches.delete(key);
          }
        }));
      })
  )
  return self.clients.claim(); //ensures Service Worker is loaded correctly.
})

self.addEventListener('fetch', function(event){
  event.respondWith(
    caches.match(event.request)
      .then(function(response){
        if(response){
          return response;  //return response from cache if there is one.
        } else {
          return fetch(event.request)  //if not, make fetch request.
            .then(function(res){
              return caches.open(CACHE_DYNAMIC_NAME)
                .then(function(cache){
                  cache.put(event.request.url, res.clone());
                  return res;
                })
            })
            .catch(function(err){
              //do nothing here.
            })
        }
      })
  )
})