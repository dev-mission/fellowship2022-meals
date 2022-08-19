'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SiteNutritionPartners', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      SiteId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'Sites',
          },
          key: 'id',
        },
      },
      NutritionPartnerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'NutritionPartners',
          },
          key: 'id',
        },
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
    // set starting id to larger value so it doesn't conflict with test fixtures
    await queryInterface.sequelize.query('ALTER SEQUENCE "SiteNutritionPartners_id_seq" RESTART WITH 100;');
    // create a unique compound index to prevent duplicates
    await queryInterface.addIndex('SiteNutritionPartners', {
      fields: ['SiteId', 'NutritionPartnerId'],
      unique: true,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SiteNutritionPartners');
  },
};
