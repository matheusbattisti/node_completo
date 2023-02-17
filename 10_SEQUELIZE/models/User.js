// 2 - criando model
const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Role = require("./role");

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  salary: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  profession: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  is_working: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  // 10 - relacionamento de tabelas
  RoleId: {
    type: DataTypes.INTEGER,
    references: {
      model: Role,
      key: "id",
    },
  },
});

User.belongsTo(Role);

User.sync({ force: false })
  .then(() => {
    console.log("Tabela de usuários sincronizada com sucesso!");
  })
  .catch((error) => {
    console.log(`Erro ao sincronizar a tabela de usuários: ${error}`);
  });

module.exports = User;
