'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SiteMealTypes', {
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
      MealTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'MealTypes',
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
    await queryInterface.sequelize.query('ALTER SEQUENCE "SiteMealTypes_id_seq" RESTART WITH 100;');
<<<<<<< HEAD
=======
    // create a unique compound index to prevent duplicates
    await queryInterface.addIndex('SiteMealTypes', {
      fields: ['SiteId', 'MealTypeId'],
      unique: true,
    });
>>>>>>> main
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SiteMealTypes');
  },
};
