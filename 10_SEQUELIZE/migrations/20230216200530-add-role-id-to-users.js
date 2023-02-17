// npx sequelize-cli migration:generate --name add-role-id-to-users
// fazer código da migration
// npx sequelize-cli db:migrate

"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("users", "RoleId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 2,
      references: {
        model: "roles",
        key: "id",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Users", "RoleId");
  },
};
