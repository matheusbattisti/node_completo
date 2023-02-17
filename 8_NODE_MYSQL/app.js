// 1 - instalando, configurando e conectando mysql
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "nodemysql",
// });

// db.connect((err) => {
//   if (err) {
//     throw err;
//   }
//   console.log("Conectado ao banco de dados MySQL");
// });

// 7 - utilizando connection pool
const db = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "nodemysql",
});

db.on("acquire", (connection) => {
  console.log(`Nova conexão adquirida: ${connection.threadId}`);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// 2 - inserindo dados
app.post("/books", (req, res) => {
  const { title, pages } = req.body;

  if (!title || !pages)
    return res.status(422).json({ msg: "Preencha todos os campos." });

  const sql = `INSERT INTO books (title, pages) VALUES ("${title}", ${pages})`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.json({ msg: "Livro cadastrado com sucesso!" });
  });
});

// 3 - resgatando todos os livros
app.get("/books", (req, res) => {
  const sql = "SELECT * FROM books";
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.json({ books: result });
  });
});

// 4 - filtrando coluna por valor
app.get("/books/search", (req, res) => {
  const { title } = req.query;
  const sql = `SELECT * FROM books WHERE title LIKE '%${title}%'`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.json({ books: result });
  });
});

// 5 - editando dados
app.patch("/books/:id", (req, res) => {
  const { title, pages } = req.body;
  const { id } = req.params;
  const sqlCheck = `SELECT * FROM books WHERE id = ${id}`;
  db.query(sqlCheck, (err, result) => {
    if (err) {
      throw err;
    }
    if (result.length === 0) {
      res.status(404).json({ message: "Livro não encontrado" });
    } else {
      const sql = `UPDATE books SET title = "${title}", pages = ${pages} WHERE id = ${id}`;
      db.query(sql, (err, result) => {
        if (err) {
          throw err;
        }
        res.json({ message: "Livro atualizado com sucesso!" });
      });
    }
  });
});

// 6 - removendo livros
app.delete("/books/:id", (req, res) => {
  const { id } = req.params;
  const sqlCheck = `SELECT * FROM books WHERE id = ${id}`;
  db.query(sqlCheck, (err, result) => {
    if (result.length === 0) {
      res.status(404).json({ message: "Livro não encontrado" });
    } else {
      const sql = `DELETE FROM books WHERE id = ${id}`;
      db.query(sql, (err, result) => {
        if (err) {
          throw err;
        }
        res.json({ message: "Livro removido com sucesso!" });
      });
    }
  });
});

// 8 - prepared statemnts
app.post("/books-prepared", (req, res) => {
  const { title, pages } = req.body;
  const sql = "INSERT INTO books (title, pages) VALUES (?, ?)";
  const values = [title, pages];
  db.query(sql, values, (err, result) => {
    if (err) {
      throw err;
    }
    res.json({ id: result.insertId, title, pages });
  });
});
