self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.open("lagerpro-cache").then((cache) => {
      return cache.match(event.request).then((resp) => {
        return (
          resp ||
          fetch(event.request).then((response) => {
            if (event.request.url.startsWith(self.location.origin)) {
              cache.put(event.request, response.clone());
            }
            return response;
          })
        );
      });
    })
  );
});
