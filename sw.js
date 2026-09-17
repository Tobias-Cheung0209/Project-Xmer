const CACHE = 'xmer-shell-v12';
const FILES = [
  './','index.html','css/style.css?v=1','css/app-v2.css?v=11','js/config.js?v=6','js/travel-areas.js?v=54','js/city-geo.js?v=54','js/store.js?v=55','js/topbar.js?v=54','js/app.js?v=9','js/xmer.js?v=12','fonts/ma-shan-zheng.ttf','manifest.webmanifest',
  'images/xmer-sleeping.png?v=1','images/xmer-rubbing.png?v=1','images/xmer-peek.png?v=1','images/xmer-idle.png?v=1','images/xmer-walking.png?v=1','images/xmer-stretching.png?v=1','images/xmer-toast-loaf.png?v=1','images/xmer-surprised.png?v=1','images/xmer-lick-paw.png?v=1','images/xmer-knead.png?v=1','images/xmer-head-tilt.png?v=1','images/xmer-yawn.png?v=1','images/xmer-ear-scratch.png?v=1','images/xmer-hug-tail.png?v=1','images/xmer-chin-rest.png?v=1','images/xmer-nose-lick.png?v=1','images/xmer-dialog-corner.png?v=1','images/xmer-hero-perch.png?v=2','images/china-map.png?v=54','images/world-map.png?v=54',
  'icon-192.png','icon-512.png','apple-touch-icon.png'
];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('xmer-')&&k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).catch(()=>caches.match('index.html')));return;}e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(r=>{if(r.ok){const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));}return r;})));});
