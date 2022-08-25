'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Populations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
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
<<<<<<< HEAD:migrations/20220805002353-create-population.js

=======
>>>>>>> main:migrations/20220804161030-create-population.js
    // set starting id to larger value so it doesn't conflict with test fixtures
    await queryInterface.sequelize.query('ALTER SEQUENCE "Populations_id_seq" RESTART WITH 100;');
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Populations');
  },
};
