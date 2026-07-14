const db = require("../config/db");
const fs = require("fs");

exports.getAllBuku = (req, res) => {
    db.query("SELECT * FROM buku", (err, results) => {
        if(err) return res.status(500).json(err);
        res.json(results);
    });
};

exports.tambahBuku = (req, res) => {
    const { judul, pengarang, status } = req.body;
    const gambar = req.file ? req.file.filename : null;
    db.query("INSERT INTO buku (judul, pengarang, status, gambar) VALUES (?, ?, ?, ?)", 
    [judul, pengarang, status, gambar], (err, result) => {
        if(err) return res.status(500).json(err);
        res.json({ message: "Buku berhasil ditambahkan" });
    });
};

exports.updateBuku = (req, res) => {
    const id = req.params.id;
    const { judul, pengarang, status } = req.body;
    db.query("SELECT gambar FROM buku WHERE id=?", [id], (err, rows) => {
        let gambar = rows[0].gambar;
        if(req.file) {
            if(gambar && fs.existsSync(`uploads/${gambar}`)) fs.unlinkSync(`uploads/${gambar}`);
            gambar = req.file.filename;
        }
        db.query("UPDATE buku SET judul=?, pengarang=?, status=?, gambar=? WHERE id=?", 
        [judul, pengarang, status, gambar, id], (err, result) => {
            if(err) return res.status(500).json(err);
            res.json({ message: "Buku berhasil diperbarui" });
        });
    });
};

exports.hapusBuku = (req, res) => {
    const id = req.params.id;
    db.query("SELECT gambar FROM buku WHERE id=?", [id], (err, rows) => {
        if(rows.length > 0 && rows[0].gambar) {
            if(fs.existsSync(`uploads/${rows[0].gambar}`)) fs.unlinkSync(`uploads/${rows[0].gambar}`);
        }
        db.query("DELETE FROM buku WHERE id=?", [id], (err, result) => {
            if(err) return res.status(500).json(err);
            res.json({ message: "Buku berhasil dihapus" });
        });
    });
};