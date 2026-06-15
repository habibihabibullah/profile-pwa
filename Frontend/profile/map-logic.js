// 1. Set titik default awal (UNUGHA Cilacap) sebagai cadangan jika GPS mati
const profileMap = L.map('map-profile').setView([-7.6158, 109.1123], 13);

// 2. Load layer peta OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(profileMap);

// 3. FUNGSI UTAMA: Lacak GPS asli dari HP / Perangkat pengguna secara Real-Time
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const userLat = position.coords.latitude;   // Mengambil Garis Lintang Akurat GPS
            const userLng = position.coords.longitude;  // Mengambil Garis Bujur Akurat GPS

            // Geser kamera peta ke lokasi asli kamu sekarang dan naikkan zoom agar dekat (detail)
            profileMap.setView([userLat, userLng], 16);

            // Buat Balon Popup Penanda lokasi
            const popupContent = `
                <div style="font-family: 'Poppins', sans-serif; color: #333; min-width: 150px; text-align: center;">
                    <h4 style="margin: 0 0 5px 0; color: #4f46e5;">📍 Lokasi Anda!</h4>
                    <p style="margin: 0; font-size: 11px; opacity: 0.8;">Berhasil mendeteksi koordinat GPS perangkat secara real-time.</p>
                </div>
            `;

            // Tancapkan Pin Merah di lokasi kamu saat ini
            L.marker([userLat, userLng])
                .addTo(profileMap)
                .bindPopup(popupContent)
                .openPopup();
        },
        (error) => {
            // Jika user menolak memberikan izin lokasi, pasang marker cadangan di kampus agar tidak error
            console.warn("Akses GPS ditolak, menggunakan lokasi default kampus: ", error.message);
            tampilkanLokasiCadangan();
        },
        {
            enableHighAccuracy: true, // Memaksa browser/HP menggunakan sensor GPS paling akurat
            timeout: 8000,
            maximumAge: 0
        }
    );
} else {
    // Browser lawas tidak support Geolocation
    tampilkanLokasiCadangan();
}

// 4. Fungsi Cadangan jika GPS mati / diblokir browser
function tampilkanLokasiCadangan() {
    L.marker([-7.6158, 109.1123])
        .addTo(profileMap)
        .bindPopup('<b>UNUGHA Cilacap</b><br>Gagal melacak GPS perangkat.')
        .openPopup();
}

// 5. Fix rendering agar peta langsung digambar penuh oleh mesin browser
setTimeout(() => {
    profileMap.invalidateSize();
}, 400);
var map = L.map('map').setView([-7.7, 111.9], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
  .addTo(map);

L.marker([-7.7, 111.9])
  .addTo(map)
  .bindPopup("Lokasi Saya")
  .openPopup();