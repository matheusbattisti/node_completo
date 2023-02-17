// 1 - configuração do Sequelize
const express = require("express");
const cors = require("cors");

const sequelize = require("./database");

// 3 - criando usuários
const usersRouter = require("./routes/users");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API funcionando!");
});

app.use("/users", usersRouter);

sequelize
  .authenticate()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida com sucesso!");
  })
  .catch((error) => {
    console.log(`Erro ao conectar com o banco de dados: ${error}`);
  });

app.listen(3000, () => {
  console.log("API rodando na porta 3000!");
});
