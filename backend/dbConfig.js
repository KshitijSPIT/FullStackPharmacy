const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost", // Adjust if necessary
  user: "root",      // Your MySQL username
  password: "Kshitij@123", // Your MySQL password
  database: "Pharmacy",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
  } else {
    console.log("Connected to the database");
  }
});

module.exports = db;
