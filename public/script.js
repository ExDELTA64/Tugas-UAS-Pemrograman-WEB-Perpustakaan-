const API_URL = "http://localhost:3000/buku";
const form = document.getElementById("bukuForm");
const dataBuku = document.getElementById("dataBuku");
let allBooks = []; // Menyimpan state untuk fitur pencarian

// Muat data saat halaman dibuka
loadData();

// Submit Form (Tambah / Edit)
form.addEventListener("submit", async function(e) {
    e.preventDefault();
    const id = document.getElementById("id").value;
    const formData = new FormData();
    
    formData.append("judul", document.getElementById("judul").value);
    formData.append("pengarang", document.getElementById("pengarang").value);
    formData.append("status", document.getElementById("status").value);
    
    const gambar = document.getElementById("gambar").files[0];
    if(gambar) {
        formData.append("gambar", gambar);
    }

    try {
        if(id) {
            // Update Data
            await fetch(`${API_URL}/${id}`, { method: "PUT", body: formData });
            alert("Data berhasil diperbarui!");
        } else {
            // Create Data
            await fetch(API_URL, { method: "POST", body: formData });
            alert("Buku berhasil ditambahkan!");
        }
        form.reset();
        document.getElementById("id").value = "";
        loadData();
    } catch (error) {
        console.error(error);
        alert("Terjadi kesalahan sistem.");
    }
});

// Menampilkan Data
async function loadData() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        allBooks = data; 
        renderData(data);
    } catch (error) {
        console.error(error);
    }
}

// Render HTML Card
function renderData(books) {
    dataBuku.innerHTML = "";
    books.forEach(item => {
        const statusClass = item.status === 'Tersedia' ? 'tersedia' : 'dipinjam';
        const imgTag = item.gambar ? `<img src="/uploads/${item.gambar}" alt="Cover Buku">` : `<img src="https://via.placeholder.com/150" alt="No Cover">`;
        
        dataBuku.innerHTML += `
        <div class="card">
            ${imgTag}
            <h3>${item.judul}</h3>
            <p><strong>Pengarang:</strong> ${item.pengarang}</p>
            <span class="status-badge ${statusClass}">${item.status}</span>
            <div class="action">
                <button class="btn-edit" onclick='editData(${JSON.stringify(item)})'>Edit</button>
                <button class="btn-delete" onclick='hapusData(${item.id})'>Hapus</button>
            </div>
        </div>
        `;
    });
}

// Persiapan form untuk edit
function editData(data) {
    document.getElementById("id").value = data.id;
    document.getElementById("judul").value = data.judul;
    document.getElementById("pengarang").value = data.pengarang;
    document.getElementById("status").value = data.status;
    window.scrollTo(0,0);
}

// Hapus Data
async function hapusData(id) {
    if(!confirm("Yakin ingin menghapus buku ini?")) return;
    try {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        alert("Buku berhasil dihapus.");
        loadData();
    } catch (error) {
        console.error(error);
    }
}

// Fitur Pencarian (Real-time di Frontend)
function cariBuku() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const filteredBooks = allBooks.filter(buku => 
        buku.judul.toLowerCase().includes(input)
    );
    renderData(filteredBooks);
}