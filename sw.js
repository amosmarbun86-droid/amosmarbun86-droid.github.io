const CACHE="amos-dashboard-v6";

self.addEventListener("install",e=>{
self.skipWaiting();
});

self.addEventListener("activate",e=>{
e.waitUntil(
caches.keys().then(keys=>{
return Promise.all(
keys.map(k=>{
if(k!==CACHE)return caches.delete(k);
})
);
})
);
self.clients.claim();
});

self.addEventListener("fetch",event=>{
event.respondWith(
fetch(event.request).catch(()=>caches.match(event.request))
);
});
