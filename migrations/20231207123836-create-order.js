'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_items_device: {
        type: Sequelize.INTEGER,
        references: {
          model: "Item_devices",
          key: "id",
        },
      },
      id_service: {
        type: Sequelize.INTEGER,
        references: {
          model: "Services",
          key: "id",
        },
      },
      order_date: {
        type: Sequelize.DATE,
      },
      qty: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('Orders');
  }
};