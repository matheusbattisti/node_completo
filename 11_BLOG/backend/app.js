const express = require("express");
const passport = require("passport");
const cors = require("cors");

const app = express();

// Configuração do banco de dados
const db = require("./db");
db.authenticate()
  .then(() =>
    console.log("Conexão com o banco de dados estabelecida com sucesso")
  )
  .catch((error) =>
    console.error("Erro ao conectar ao banco de dados:", error)
  );

// Middleware de cors
app.use(cors());

// Middleware de análise de corpo
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de autenticação
app.use(passport.initialize());
require("./config/passport")(passport);

// Rotas da API
app.use("/api/auth", require("./routes/auth"));

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
