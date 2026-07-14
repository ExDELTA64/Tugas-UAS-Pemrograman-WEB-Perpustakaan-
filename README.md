Aplikasi web Sistem Informasi Perpustakaan ini dibangun untuk memenuhi kriteria tugas **SOAL 2 (Bobot 25%) Ujian Akhir Semester (UAS) Genap Mata Kuliah Pemrograman Web** di **Universitas Dian Nusantara** Aplikasi ini menggunakan arsitektur modern berbasis Node.js (Express.js) pada backend, MySQL (XAMPP) sebagai database relasional serta **HTML, CSS, dan JavaScript  di sisi frontend

---

## 🎯 Fungsi Utama Aplikasi

Berdasarkan studi kasus UAS, perpustakaan kecil di lingkungan kampus sebelumnya masih melakukan pencatatan peminjaman secara konvensional menggunakan buku tulis manual[cite: 47]. [cite_start]Hal tersebut memicu berbagai kendala laten seperti tingginya risiko kehilangan data rekaman historis serta sulitnya melakukan kontrol terhadap keterlambatan pengembalian buku[cite: 47].

Aplikasi ini berfungsi sebagai **solusi digital terintegrasi** untuk:
1. **Digitalisasi Data**: Menggantikan peran buku tulis fisik menjadi basis data digital terpusat demi menjamin keamanan dan keutuhan data jangka panjang.
2. **Otomatisasi Status**: Memudahkan pustakawan dalam melacak buku mana saja yang sedang dipinjam atau tersedia secara *real-time*.
3. **Efisiensi Validasi**: Mempercepat proses pencarian koleksi buku berdasarkan kata kunci judul untuk meningkatkan kenyamanan layanan civitas akademika.

---

## 🚀 Fitur Aplikasi  

Aplikasi ini diimplementasikan tanpa error dan mencakup seluruh fungsionalitas utama yang dipersyaratkan di dalam rubrik penilaian ujian:

*  Manajemen pengelolaan data pustaka yang meliputi proses penambahan judul baru, pembacaan daftar buku, pembaruan informasi, dan penghapusan data .
*  Fitur unggah file gambar cover/sampul buku secara fisik ke dalam direktori server (`uploads/`) memanfaatkan middleware `multer`.
*  Pencatatan data identitas mahasiswa atau civitas akademika yang berhak melakukan transaksi peminjaman di lingkungan kampus .
*  Modul pencatatan peminjaman aktif yang otomatis mengubah status ketersediaan buku menjadi 'Dipinjam' .
*  Modul pemrosesan pengembalian buku yang otomatis memulihkan status unit menjadi 'Tersedia' .
*  Fitur pencarian cepat berorientasi performa (*real-time filter*) di sisi frontend berdasarkan judul buku .
*  Indikator digital yang mengalkulasi total inventaris buku serta jumlah buku yang siap dipinjam secara dinamis.

🛠️ Bagaimana Cara Menjalankan Aplikasi
Ikuti prosedur langkah demi langkah berikut untuk memasang dan menjalankan aplikasi ini pada komputer lokal Anda:

Langkah 1: Persiapan Basis Data (XAMPP)
Aktifkan aplikasi XAMPP Control Panel di komputer Anda.

Jalankan (Start) layanan Apache dan MySQL hingga indikator berwarna hijau.

Buka browser internet Anda, kemudian akses alamat http://localhost/phpmyadmin.

Buatlah sebuah database baru bernama db_perpustakaan.

Masuk ke database tersebut, pilih tab Import, lalu unggah berkas db_perpustakaan.sql yang terletak di dalam folder database/ proyek ini, kemudian klik Go/Kirim.

Langkah 2: Instalasi Dependensi Node.js
Buka aplikasi Terminal atau Command Prompt, lalu arahkan direktori ke folder utama proyek ini (cd perpustakaan-app).

Pasang seluruh pustaka NPM (node packages) yang dipersyaratkan dengan mengetikkan perintah:

Bash
npm install express mysql2 multer cors
Pastikan folder bernama uploads/ sudah terbuat di dalam root direktori proyek Anda sebagai wadah penyimpanan file gambar.

Langkah 3: Menjalankan Server Aplikasi
Di dalam terminal proyek Anda, eksekusi perintah di bawah ini untuk mengaktifkan backend Node.js:

Bash
node app.js
Jika koneksi berjalan lancar, terminal akan memunculkan log konfirmasi:

Server running on http://localhost:3000

Langkah 4: Mengakses Antarmuka Web
Buka web browser Anda (Google Chrome / Mozilla Firefox / Microsoft Edge).

Akses alamat url lokal aplikasi: http://localhost:3000.

Sistem Informasi Manajemen Perpustakaan siap digunakan untuk mengelola data buku dan melakukan simulasi operasional perpustakaan secara digital!

## 📁 Struktur Folder Proyek

Aplikasi dikembangkan menggunakan struktur terpadu (*monolithic layout*) agar mempermudah proses evaluasi kode penguji:

```text
perpustakaan-app/
├── database/               # Direktori penyimpanan berkas blueprint database
│   └── db_perpustakaan.sql # Berkas hasil export database MySQL
├── public/                 # Direktori file statis frontend
│   ├── index.html          # Struktur kerangka visual aplikasi (Wajah Halaman)
│   ├── style.css           # Desain tata letak responsif dan user interface
│   └── script.js           # Logika client-side (DOM manipulation & Fetch API)
├── uploads/                # Folder penyimpanan berkas gambar cover buku dari client
├── app.js                  # Entry point utama server Node.js & REST API routing
├── package.json            # Manifest manajemen dependensi npm
└── README.md               # Dokumentasi teknis sistem informasi
📊 Rancangan Skema Database (MySQL)Aplikasi ini terintegrasi penuh dengan database db_perpustakaan. Jika Anda tidak menggunakan fitur import file .sql, Anda dapat mengeksekusi query DDL berikut di phpMyAdmin untuk membangun tabel yang diperlukan:  SQLCREATE DATABASE IF NOT EXISTS db_perpustakaan;
USE db_perpustakaan;

-- Tabel Master Buku
CREATE TABLE IF NOT EXISTS buku (
    id INT AUTO_INCREMENT PRIMARY KEY,
    judul VARCHAR(150) NOT NULL,
    pengarang VARCHAR(100) NOT NULL,
    status ENUM('Tersedia', 'Dipinjam') DEFAULT 'Tersedia',
    gambar VARCHAR(255) DEFAULT NULL
);
🛠️ Bagaimana Cara Menjalankan AplikasiIkuti prosedur langkah demi langkah berikut untuk memasang dan menjalankan aplikasi ini pada komputer lokal Anda:Langkah 1: Persiapan Basis Data (XAMPP)Aktifkan aplikasi XAMPP Control Panel di komputer Anda.Jalankan (Start) layanan Apache dan MySQL hingga indikator berwarna hijau.Buka browser internet Anda, kemudian akses alamat http://localhost/phpmyadmin.Buatlah sebuah database baru bernama db_perpustakaan.Masuk ke database tersebut, pilih tab Import, lalu unggah berkas db_perpustakaan.sql yang terletak di dalam folder database/ proyek ini, kemudian klik Go/Kirim.Langkah 2: Instalasi Dependensi Node.jsBuka aplikasi Terminal atau Command Prompt, lalu arahkan direktori ke folder utama proyek ini (cd perpustakaan-app).Pasang seluruh pustaka NPM (node packages) yang dipersyaratkan dengan mengetikkan perintah:Bashnpm install express mysql2 multer cors
Pastikan folder bernama uploads/ sudah terbuat di dalam root direktori proyek Anda sebagai wadah penyimpanan file gambar.Langkah 3: Menjalankan Server AplikasiDi dalam terminal proyek Anda, eksekusi perintah di bawah ini untuk mengaktifkan backend Node.js:Bashnode app.js
Jika koneksi berjalan lancar, terminal akan memunculkan log konfirmasi:Server running on http://localhost:3000Langkah 4: Mengakses Antarmuka WebBuka web browser Anda (Google Chrome / Mozilla Firefox / Microsoft Edge).Akses alamat url lokal aplikasi: http://localhost:3000.Sistem Informasi Manajemen Perpustakaan siap digunakan untuk mengelola data buku dan melakukan simulasi operasional perpustakaan secara digital!
