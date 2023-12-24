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
      kode_payment: {
        type: Sequelize.STRING
      },
      status_code: {
        type: Sequelize.STRING,
      },
      status_message: {
        type: Sequelize.STRING,
      },
      transaction_id: {
        type: Sequelize.STRING,
      },
      signature_key: {
        type: Sequelize.STRING
      },
      merchant_id: {
        type: Sequelize.STRING,
      },
      currency: {
        type: Sequelize.STRING,
      },
      gross_amount: {
        type: Sequelize.STRING,
      },
      payment_type: {
        type: Sequelize.STRING,
      },
      va_number: {
        type: Sequelize.STRING,
      },
      transaction_time: {
        type: Sequelize.STRING,
      },
      transaction_status: {
        type: Sequelize.STRING,
      },
      settlement_time: {
        type: Sequelize.STRING,
      },
      fraud_status: {
        type: Sequelize.STRING,
      },
      expiry_time: {
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