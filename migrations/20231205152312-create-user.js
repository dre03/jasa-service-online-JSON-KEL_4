'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.addColumn('Users', 'id_role', {
      type: Sequelize.INTEGER,
      allowNull: false, // Sesuaikan sesuai kebutuhan
      references: {
        model: 'Roles', // Ganti dengan nama tabel yang sesuai
        key: 'id',
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Users", "id_role");
  }
};
