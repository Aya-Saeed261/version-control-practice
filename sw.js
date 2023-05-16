const cacheAssets = [
  "./index.html",
  "./about.html",
  "./imgs/slide3.jpg",
  "./imgs/slide4.jpg",
];

self.addEventListener("install", async () => {
  console.log("installed");
  const createdCache = await caches.open("static-cache");
  await createdCache.addAll(cacheAssets);
  await self.skipWaiting();
});

self.addEventListener("activate", async () => {
  console.log("activated");
  // let allCaches = await caches.keys();
  // for (let i = 0; i < allCaches.length; i++) {
  //   if (allCaches[i] != cachename) {
  //     await caches.delete(allCaches[i]);
  //   }
  // }
});

self.addEventListener("fetch", async (event) => {
  let res;
  if (navigator.onLine) {
    res = networkFirst(event.request);
  } else {
    res = cacheFirst(event.request);
  }
  event.respondWith(res);
});

const cacheFirst = async (req) => {
  return caches.match(req) || caches.match("./fallback.json");
};

const networkFirst = async (req) => {
  if (!(req.url.indexOf("http") === 0)) return; // skip the request. if request is not made with http protocol
  const createdCache = await caches.open("dynamic-cache");
  let res = await fetch(req);
  try {
    await createdCache.put(req, res.clone());
  } catch (error) {
    console.log(error);
  }
  return res;
};
