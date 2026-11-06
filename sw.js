const VERSION = 'inner-space-v120-2';
const asset = p => new URL(p, self.registration.scope).toString();
const SHELL = [
  asset('./'),
  asset('inner-space.html'),
  asset('manifest.webmanifest'),
  asset('icons/icon-192.png'),
  asset('icons/icon-512.png'),
  asset('icons/icon-maskable-512.png')
];
const OFFLINE_APP = asset('inner-space.html');

self.addEventListener('install', event => {
  event.waitUntil(caches.open(VERSION).then(cache => cache.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('inner-space-') && k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin || url.pathname.includes('/api/') || req.headers.has('range')) return;

  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        if (fresh && fresh.ok) {
          const cache = await caches.open(VERSION);
          cache.put(req, fresh.clone()).catch(() => {});
        }
        return fresh;
      } catch {
        return (await caches.match(req)) || (await caches.match(OFFLINE_APP));
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const cached = await caches.match(req);
    if (cached) return cached;
    try {
      const fresh = await fetch(req);
      if (fresh && fresh.ok && fresh.type === 'basic') {
        const cache = await caches.open(VERSION);
        cache.put(req, fresh.clone()).catch(() => {});
      }
      return fresh;
    } catch {
      return new Response('', { status: 504, statusText: 'Offline' });
    }
  })());
});

/* ===================== V116.2 · the 21 Nights nudge =====================
   A worker cannot read localStorage, so the page hands it the time, whether
   tonight is already lit, and the words — and it keeps them in its own cache.
   Nothing leaves the phone. ====================================================== */
const N21_STORE = 'n21-reminder';
const N21_URL = new URL('__n21/reminder', self.registration.scope).toString();

async function n21Read() {
  try {
    const c = await caches.open(N21_STORE);
    const r = await c.match(N21_URL);
    return r ? await r.json() : null;
  } catch { return null; }
}
async function n21Write(v) {
  try {
    const c = await caches.open(N21_STORE);
    await c.put(N21_URL, new Response(JSON.stringify(v), { headers: { 'content-type': 'application/json' } }));
  } catch {}
}
function n21Today() {
  const n = new Date();
  return new Date(n.getTime() - n.getTimezoneOffset() * 6e4).toISOString().slice(0, 10);
}
async function n21Maybe() {
  const r = await n21Read();
  if (!r || !r.on) return;
  const today = n21Today();
  if (r.sent === today) return;          // already nudged tonight
  if (r.litDay === today) return;        // the lantern is already lit
  const parts = String(r.time || '21:30').split(':');
  const now = new Date();
  if (now.getHours() * 60 + now.getMinutes() < (+parts[0] || 0) * 60 + (+parts[1] || 0)) return;
  await self.registration.showNotification(r.title || 'Inner Space', {
    body: r.body || 'Tonight’s lantern is waiting.',
    tag: 'n21',
    icon: asset('icons/icon-192.png'),
    badge: asset('icons/icon-192.png')
  });
  r.sent = today;
  await n21Write(r);
}

self.addEventListener('message', event => {
  const d = event.data || {};
  if (d.type === 'n21-reminder' && d.value) {
    event.waitUntil((async () => {
      const prev = (await n21Read()) || {};
      const next = Object.assign({}, prev, d.value);
      if (next.litDay === n21Today()) next.sent = n21Today();   // lit: nothing to say tonight
      await n21Write(next);
    })());
  }
});

self.addEventListener('periodicsync', event => {
  if (event.tag === 'n21') event.waitUntil(n21Maybe());
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil((async () => {
    const all = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const c of all) { if ('focus' in c) return c.focus(); }
    return self.clients.openWindow(asset('./'));
  })());
});
