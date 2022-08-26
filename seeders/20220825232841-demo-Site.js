'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Sites', [
      {
        name: 'Self Help for the Elderly',
        address: '5757 Geary Blvd.',
        phoneNumber: '4153871823',
        email: 'info@selfhelpelderly.org',
        website: 'https://www.selfhelpelderly.org/',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Rosa Parks Senior Center',
        address: '1111 Buchanan St.',
        phoneNumber: '4152923474',
        email: 'info@bhpmss.org',
        website: 'https://bhpmss.org/rosa-parks-senior-center/',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Mission Neighborhood Center',
        address: '362 Capp St.',
        phoneNumber: '4152067752',
        email: 'info@mncsf.org',
        website: 'https://mncsf.org/',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
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
    return queryInterface.bulkDelete('Sites', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
