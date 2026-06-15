const CACHE_NAME = 'habibi-cache-v2'; // Kita naikkan versinya jadi v2 biar browser sadar ada perubahan
const assets = [
    './',
    './index.html',
    './style.css',
    './script.js'
];

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(c => {
            console.log('Caching file statis');
            return c.addAll(assets);
        })
    );
});

self.addEventListener('activate', e => {
    // Menghapus cache lama versi v1 agar tidak bentrok
    e.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.map(key => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    console.log('SW Active & Cleaned');
});

self.addEventListener('fetch', e => {
    // Jika mengambil data artikel dari server port 3000
    if (e.request.url.includes('3000') || e.request.url.includes('/articles')) {
        e.respondWith(
            fetch(e.request).catch(() => new Response(JSON.stringify([])))
        );
    } else {
        // Untuk file lokal biasa
        e.respondWith(
            caches.match(e.request).then(res => res || fetch(e.request))
        );
    }
});