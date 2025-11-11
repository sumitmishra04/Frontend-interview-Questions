// Service Worker for offline functionality and caching
const CACHE_NAME = 'image-cache-v1';
const URLS_TO_CACHE = [
    '/',
    '/index.html',
    '/src/index.css',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(URLS_TO_CACHE))
    );
});

self.addEventListener('fetch', (event) => {
    // Cache images from Unsplash
    if (event.request.url.includes('unsplash.com')) {
        event.respondWith(
            caches.open(CACHE_NAME).then((cache) => {
                return cache.match(event.request).then((response) => {
                    return (
                        response ||
                        fetch(event.request).then((response) => {
                            cache.put(event.request, response.clone());
                            return response;
                        })
                    );
                });
            })
        );
    }
});