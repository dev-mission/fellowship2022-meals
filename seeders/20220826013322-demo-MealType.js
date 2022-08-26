'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('MealTypes', [
      {
        name: 'Chinese brunch',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'American-Southern lunch',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'American-Latinx lunch',
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

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('MealTypes', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
