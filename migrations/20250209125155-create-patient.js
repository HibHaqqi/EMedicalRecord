'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Patients', {
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
      nik: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.INTEGER
      },
      address: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      symptoms: {
        type: Sequelize.STRING
      },
      medicine: {
        allowNull: true,
        type: Sequelize.STRING
      },
      injection_date: {
        allowNull: true,
        type: Sequelize.DATE
      },
      HPHT: {
        allowNull: true,
        type: Sequelize.DATE
      },
      pragnancy_age: {
        allowNull: true,
        type: Sequelize.STRING
      },
      note: {
        allowNull: true,
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
    await queryInterface.dropTable('Patients');
  }
};