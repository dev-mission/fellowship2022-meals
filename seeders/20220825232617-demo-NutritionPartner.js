'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('NutritionPartners', [
      {
        name: 'Self Help for the Elderly',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Bayview Senior Services',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Centro Latino de San Francisco',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('NutritionPartners', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
