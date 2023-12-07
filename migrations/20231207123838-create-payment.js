'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Payments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_order: {
        type: Sequelize.INTEGER,
        references: {
          model: "Orders",
          key: "id",
        },
      },
      method_payment: {
        type: Sequelize.STRING,
      },
      amount_payment: {
        type: Sequelize.STRING,
      },
      date_payment: {
        type: Sequelize.DATE,
      },
      payment_status: {
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
    await queryInterface.dropTable('Payments');
  }
};