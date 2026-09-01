/* ============================================================================
 * Service Worker — Summit English Institute (PWA installable)
 * Stratégie conservatrice :
 *   - /_next/static & icônes & manifest : cache-first (fichiers fingerprintés,
 *     immuables — sécurisé de mettre en cache agressif)
 *   - Navigations (pages) : network-first avec repli cache puis page hors-ligne
 *   - JAMAIS de cache sur /api/* (données authentifiées, dynamiques, personnelles)
 * Pour forcer la mise à jour chez les clients : incrémenter VERSION.
 * ==========================================================================*/
const VERSION = 'v1';
const STATIC_CACHE = `summit-static-${VERSION}`;
const PAGE_CACHE = `summit-pages-${VERSION}`;
const KNOWN_CACHES = [STATIC_CACHE, PAGE_CACHE];

const PRECACHE_URLS = [
  '/manifest.webmanifest',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/icon-maskable-512.png',
];

const OFFLINE_HTML = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Hors ligne — Summit English Institute</title>
<style>
  body { margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center;
         font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; color: #0f172a; }
  .card { text-align: center; padding: 3rem 2rem; max-width: 26rem; }
  .icon { font-size: 3rem; margin-bottom: 1rem; }
  h1 { font-size: 1.25rem; margin: 0 0 .5rem; }
  p { color: #64748b; margin: 0 0 1.5rem; line-height: 1.6; }
  button { background: #1d4ed8; color: #fff; border: 0; border-radius: .75rem;
           padding: .75rem 1.5rem; font-weight: 600; cursor: pointer; }
</style>
</head>
<body>
  <div class="card">
    <div class="icon">📡</div>
    <h1>Vous êtes hors ligne</h1>
    <p>Impossible de charger cette page. Vérifiez votre connexion internet puis réessayez.</p>
    <button onclick="location.reload()">Réessayer</button>
  </div>
</body>
</html>`;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k.startsWith('summit-') && !KNOWN_CACHES.includes(k))
            .map((k) => caches.delete(k))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Uniquement les ressources de notre origine
  if (url.origin !== self.location.origin) return;

  // Jamais les API : authentifiées, dynamiques, personnelles
  if (url.pathname.startsWith('/api/')) return;

  // ── Assets statiques fingerprintés / icônes / manifest → cache-first ──
  if (
    url.pathname.startsWith('/_next/static/') ||
    url.pathname.startsWith('/icons/') ||
    url.pathname === '/manifest.webmanifest'
  ) {
    event.respondWith(
      caches.match(request).then(
        (hit) =>
          hit ||
          fetch(request).then((res) => {
            const copy = res.clone();
            caches.open(STATIC_CACHE).then((c) => c.put(request, copy));
            return res;
          })
      )
    );
    return;
  }

  // ── Navigations (pages) → network-first, repli cache, puis hors-ligne ──
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open(PAGE_CACHE).then((c) => c.put(request, copy));
          return res;
        })
        .catch(() =>
          caches
            .match(request)
            .then((hit) => hit || caches.match('/'))
            .then(
              (fallback) =>
                fallback ||
                new Response(OFFLINE_HTML, {
                  status: 200,
                  headers: { 'Content-Type': 'text/html; charset=utf-8' },
                })
            )
        )
    );
  }
});
