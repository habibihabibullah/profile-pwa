const API = "http://localhost:3000/articles";

const form = document.getElementById("articleForm");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const list = document.getElementById("articleList");

// ==========================================
// 1. LOAD DATA (Tampilan Ultimate Premium Dashboard)
// ==========================================
async function loadData() {
  const res = await fetch(API);
  const data = await res.json();

  const articleListContainer = document.getElementById("articleList");

  if (data.length === 0) {
    articleListContainer.innerHTML = `
      <div style="text-align:center; padding:30px; color:#94a3b8; width: 100%;">
        <p style="font-style: italic; margin: 0; font-size: 0.85rem;">Belum ada artikel yang dibuat 😢</p>
      </div>
    `;
    return;
  }

  // ATUR SUSUNAN GRID (Berjejer rapi ke kanan)
  articleListContainer.style.display = "grid";
  articleListContainer.style.gridTemplateColumns = "repeat(auto-fill, minmax(260px, 1fr))";
  articleListContainer.style.gap = "16px"; 
  articleListContainer.style.width = "100%";
  articleListContainer.style.padding = "10px 0";

  let htmlLengkap = "";

  data.forEach(function(a) {
    htmlLengkap += `
      <div class="cms-article-card" style="
        background: #ffffff; 
        color: #1e293b; 
        padding: 14px 16px; 
        border-radius: 12px; 
        text-align: left; 
        box-shadow: 0 4px 15px rgba(0,0,0,0.03); 
        border: 1px solid #e2e8f0; 
        display: flex; 
        flex-direction: column; 
        gap: 8px; 
        box-sizing: border-box; 
        transition: all 0.2s ease;
      "
      onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 25px rgba(79, 70, 229, 0.08)'; this.style.borderColor='#c7d2fe';"
      onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(0,0,0,0.03)'; this.style.borderColor='#e2e8f0';"
      >
        
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 6px;">
          <div style="font-size: 0.75rem;">
            <strong style="color: #94a3b8; text-transform: uppercase; font-size: 0.65rem; letter-spacing: 0.5px;">Penulis:</strong> 
            <span style="font-weight: 600; color: #475569;">Habibi</span>
          </div>
          
          <div style="display: flex; gap: 4px;">
            <button onclick="edit(${a.id}, \`${a.judul}\`, \`${a.isi}\`)" style="background: #e0e7ff; color: #4f46e5; border: none; padding: 4px 10px; border-radius: 6px; font-weight: 600; font-size: 0.7rem; cursor: pointer; transition: 0.15s;" onmouseover="this.style.background='#c7d2fe'" onmouseout="this.style.background='#e0e7ff'">Edit</button>
            <button onclick="hapus(${a.id})" style="background: #fee2e2; color: #ef4444; border: none; padding: 4px 10px; border-radius: 6px; font-weight: 600; font-size: 0.7rem; cursor: pointer; transition: 0.15s;" onmouseover="this.style.background='#fecaca'" onmouseout="this.style.background='#fee2e2'">Hapus</button>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 1px;">
          <strong style="color: #4f46e5; font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.5px;">Judul:</strong>
          <h3 style="margin: 0; font-size: 1rem; font-weight: 700; color: #0f172a; line-height: 1.3;">${a.judul}</h3>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 2px; flex-grow: 1;">
          <strong style="color: #4f46e5; font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.5px;">Isi Artikel:</strong>
          <p style="margin: 0; font-size: 0.85rem; color: #334155; line-height: 1.4; white-space: pre-line; background: #f8fafc; padding: 8px 10px; border-radius: 8px; border: 1px solid #f1f5f9;">${a.isi}</p>
        </div>

      </div>
    `;
  });

  articleListContainer.innerHTML = htmlLengkap;
}

// ==========================================
// 2. TAMBAH ARTIKEL
// ==========================================
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  await fetch(API, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      judul: titleInput.value,
      isi: contentInput.value
    })
  });

  form.reset();
  loadData();
});

// ==========================================
// 3. HAPUS ARTIKEL (SweetAlert2)
// ==========================================
async function hapus(id) {
  const result = await Swal.fire({
    title: "Yakin?",
    text: "Artikel akan dihapus permanen!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Ya, hapus!",
    cancelButtonText: "Batal",
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#64748b'
  });

  if (result.isConfirmed) {
    await fetch(API + "/" + id, { method: "DELETE" });
    loadData();

    Swal.fire("Terhapus!", "Artikel berhasil dihapus.", "success");
  }
}

// ==========================================
// 4. EDIT ARTIKEL (SweetAlert2)
// ==========================================
async function edit(id, judulLama, isiLama) {
  const { value: formValues } = await Swal.fire({
    title: 'Edit Artikel',
    background: '#ffffff',
    color: '#1e293b',
    html:
      `<div style="text-align: left; margin-bottom: 8px;"><strong style="font-size: 0.8rem; color: #4f46e5;">JUDUL ARTIKEL:</strong></div>` +
      `<input id="swal-input-judul" class="swal2-input" value="${judulLama}" style="margin: 0 0 20px 0; width: 100%; box-sizing: border-box; border-radius: 8px;">` +
      `<div style="text-align: left; margin-bottom: 8px;"><strong style="font-size: 0.8rem; color: #4f46e5;">ISI ARTIKEL:</strong></div>` +
      `<textarea id="swal-input-isi" class="swal2-textarea" style="margin: 0; width: 100%; box-sizing: border-box; min-height: 120px; border-radius: 8px; font-family: inherit;">${isiLama}</textarea>`,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'Simpan Perubahan',
    cancelButtonText: 'Batal',
    confirmButtonColor: '#4f46e5',
    cancelButtonColor: '#64748b',
    preConfirm: () => {
      const judulBaru = document.getElementById('swal-input-judul').value;
      const isiBaru = document.getElementById('swal-input-isi').value;
      
      if (!judulBaru || !isiBaru) {
        Swal.showValidationMessage('Judul dan Isi artikel tidak boleh kosong!');
      }
      
      return { judul: judulBaru, isi: isiBaru };
    }
  });

  if (formValues) {
    fetch(API + "/" + id, {
      method: "PUT",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ judul: formValues.judul, isi: formValues.isi })
    })
    .then(() => {
      loadData();
      Swal.fire({
        title: 'Berhasil!',
        text: 'Artikel kamu sudah diperbarui.',
        icon: 'success',
        confirmButtonColor: '#4f46e5'
      });
    })
    .catch(err => {
      console.error(err);
      Swal.fire('Eror!', 'Gagal menyimpan perubahan.', 'error');
    });
  }
}

// Jalankan data pertama kali
loadData();