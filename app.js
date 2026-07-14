const express = require("express");
const cors = require("cors");
const multer = require("multer");
const app = express();

// Import controller
const bukuController = require(".bukuController/controllers/bukuController");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Folder static untuk akses file
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

// Konfigurasi Multer untuk upload file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Routing
// Menggunakan controller untuk menangani setiap aksi
app.get("/buku", bukuController.getAllBuku);
app.post("/buku", upload.single("gambar"), bukuController.tambahBuku);
app.put("/buku/:id", upload.single("gambar"), bukuController.updateBuku);
app.delete("/buku/:id", bukuController.hapusBuku);

// Jalankan Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});