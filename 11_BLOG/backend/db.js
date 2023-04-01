const { Sequelize } = require("sequelize");

const config = require("./config/config.json");

const sequelize = new Sequelize(config.development);

module.exports = sequelize;
