'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pasiens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      admin_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE', 
        references: {
          model: "Admins",
        key: 'id'}
      },
      no_KTP: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      umur: {
        type: Sequelize.INTEGER
      },
      alamat: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      keluhan: {
        type: Sequelize.STRING
      },
      obat: {
        type: Sequelize.STRING
      },
      date_suntik: {
        type: Sequelize.DATE
      },
      HPHT: {
        type: Sequelize.DATE
      },
      hasil_periksa_hamil: {
        type: Sequelize.STRING
      },
      note: {
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
    await queryInterface.dropTable('Pasiens');
  }
};