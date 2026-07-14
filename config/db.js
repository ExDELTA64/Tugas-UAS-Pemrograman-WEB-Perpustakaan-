const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", // Kosongkan jika password XAMPP default
    database: "perpustakaan_db"
});

connection.connect((err) => {
    if(err) console.log(err);
    else console.log("Database perpustakaan_db Connected!");
});
module.exports = connection;