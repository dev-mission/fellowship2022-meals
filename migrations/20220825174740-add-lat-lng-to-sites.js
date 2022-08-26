'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Sites', 'lat', Sequelize.FLOAT);
    await queryInterface.addColumn('Sites', 'lng', Sequelize.FLOAT);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Sites', 'lng');
    await queryInterface.removeColumn('Sites', 'lat');
  },
};
