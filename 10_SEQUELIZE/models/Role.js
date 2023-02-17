// 10 - relacionamento entre tabelas
const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Role = sequelize.define("Role", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Role.sync()
  .then(async () => {
    // Verificar se a role "Admin" já existe
    const adminRole = await Role.findOne({ where: { name: "Admin" } });
    if (!adminRole) {
      Role.create({ name: "Admin" });
    }

    // Verificar se a role "Usuário" já existe
    const userRole = await Role.findOne({ where: { name: "Usuário" } });
    if (!userRole) {
      Role.create({ name: "Usuário" });
    }
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = Role;
