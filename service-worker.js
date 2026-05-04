const CACHE_NAME = "sudoku-app-v2";


const urlsToCache = [
  "/sudoku-app/",
  "/sudoku-app/index.html",
  "/sudoku-app/manifest.json",
  "/sudoku-app/icon-192x192.png",
  "/sudoku-app/icon-512x512.png"
];


self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(names =>
      Promise.all(
        names.map(name => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      )
    )
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
