'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Services", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_technician: {
        type: Sequelize.INTEGER,
        references: {
          model: "Technicians",
          key: "id",
        },
      },
      name_service: {
        type: Sequelize.STRING,
      },
      price_service: {
        type: Sequelize.INTEGER,
      },
      description_service: {
        type: Sequelize.STRING,
      },
      status_service: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Services');
  }
};