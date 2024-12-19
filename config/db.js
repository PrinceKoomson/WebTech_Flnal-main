const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',          // XAMPP MySQL runs on localhost
    user: 'root',               // Default XAMPP username
    password: '',               // Default XAMPP password (empty by default)
    database: 'techpath'        // The database you just created
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
    } else {
        console.log('Connected to the MySQL database.');
    }
});

module.exports = db;
