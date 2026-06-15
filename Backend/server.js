const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const path = require("path");

const app = express(); 

app.use(cors());
app.use(express.json());

// ✅ serve folder frontend
app.use(express.static(path.join(__dirname, "Frontend")));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "cms_db"
});

db.connect(err => {
  if (err) console.log(err);
  else console.log("DB CONNECTED");
});

// CREATE
app.post("/articles", (req, res) => {
  const { judul, isi } = req.body;
  db.query(
    "INSERT INTO articles (judul, isi) VALUES (?, ?)",
    [judul, isi],
    (err) => {
      if (err) return res.json(err);
      res.json({ message: "OK" });
    }
  );
});

// READ
app.get("/articles", (req, res) => {
  db.query("SELECT * FROM articles", (err, result) => {
    if (err) return res.json(err);
    res.json(result);
  });
});

// DELETE
app.delete("/articles/:id", (req, res) => {
  db.query(
    "DELETE FROM articles WHERE id=?",
    [req.params.id],
    (err) => {
      if (err) return res.json(err);
      res.json({ message: "DELETED" });
    }
  );
});

// UPDATE
app.put("/articles/:id", (req, res) => {
  const { judul, isi } = req.body;
  db.query(
    "UPDATE articles SET judul=?, isi=? WHERE id=?",
    [judul, isi, req.params.id],
    (err) => {
      if (err) return res.json(err);
      res.json({ message: "UPDATED" });
    }
  );
});

app.listen(3000, () => console.log("RUNNING 3000"));