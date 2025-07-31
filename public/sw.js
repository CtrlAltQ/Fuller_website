// Simple Service Worker for caching static assets
const CACHE_NAME = 'fuller-restoration-v1'
const STATIC_ASSETS = [
  '/',
  '/about',
  '/services',
  '/projects',
  '/contact',
  '/images/logos/Fuller_Logo.jpg',
  '/images/logos/Fuller logo.jpg'
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(STATIC_ASSETS)
      })
      .catch((error) => {
        console.log('Cache install failed:', error)
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') {
    return
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request)
          .then((fetchResponse) => {
            // Cache successful responses
            if (fetchResponse.status === 200) {
              const responseClone = fetchResponse.clone()
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseClone)
                })
            }
            return fetchResponse
          })
      })
      .catch(() => {
        // Fallback for offline scenarios
        if (event.request.destination === 'document') {
          return caches.match('/')
        }
      })
  )
})