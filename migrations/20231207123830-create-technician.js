'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Technicians', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name_technician: {
        type: Sequelize.STRING
      },
      gender_technician: {
        type: Sequelize.STRING
      },
      telephone: {
        type: Sequelize.STRING
      },
      specialization: {
        type: Sequelize.STRING
      },
      nik_technician: {
        type: Sequelize.STRING
      },
      photo_technician: {
        type: Sequelize.STRING
      },
      status_technician: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Technicians');
  }
};