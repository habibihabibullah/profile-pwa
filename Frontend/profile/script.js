const API_URL = "http://localhost:3000/articles";

// ===============
// LOAD DATA ARTIKEL 
// ===============
async function loadArtikelKeBeranda() {
    const container = document.getElementById('article-container');
    if (!container) return; 

    try {
        const res = await fetch(API_URL);
        const data = await res.json();

        if (!data || data.length === 0) {
            container.innerHTML = `
                <div style="text-align:center; padding:20px; color:rgba(255,255,255,0.4); background: rgba(255, 255, 255, 0.02); border-radius: 12px; border: 1px dashed rgba(255,255,255,0.08);">
                    <p style="font-style: italic; margin: 0; font-size: 0.85rem;">Belum ada artikel yang ditulis.</p>
                </div>
            `;
            return;
        }

        // Tampilan dengan Label Judul, Isi, dan Penulis yang Proporsional
        container.innerHTML = data.map(artikel => `
            <div class="glass-card" style="
                background: rgba(255, 255, 255, 0.03); 
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.08); 
                border-radius: 12px; 
                padding: 16px 20px; 
                margin-bottom: 12px; 
                display: flex; 
                flex-direction: column; 
                gap: 8px; 
                text-align: left;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            ">
                
                <div style="border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 6px; display: flex; flex-direction: column; gap: 2px;">
                    <span style="font-size: 0.7rem; font-weight: 600; color: #a5b4fc; text-transform: uppercase; letter-spacing: 0.5px;">
                        Penulis: <span style="color: #fff; text-transform: none;">Habibi</span>
                    </span>
                    <h3 style="margin: 0; font-size: 1.1rem; font-weight: 600; color: #ffffff;">
                        <span style="font-size: 0.75rem; font-weight: 400; color: rgba(255,255,255,0.4); text-transform: uppercase;">Judul:</span> ${artikel.judul}
                    </h3>
                </div>
                
                <div style="display: flex; flex-direction: column; gap: 2px;">
                    <strong style="font-size: 0.7rem; font-weight: 600; color: #a5b4fc; text-transform: uppercase; letter-spacing: 0.5px;">
                        Isi Artikel:
                    </strong>
                    <p style="margin: 0; font-size: 0.88rem; color: rgba(255, 255, 255, 0.75); line-height: 1.5; white-space: pre-line;">
                        ${artikel.isi}
                    </p>
                </div>
                
            </div>
        `).join("");

    } catch (error) {
        console.error(error);
        container.innerHTML = `<p style="color:#f87171; font-size:0.85rem; text-align:center;">⚠️ Gagal memuat artikel.</p>`;
    }
}

document.addEventListener('DOMContentLoaded', loadArtikelKeBeranda);