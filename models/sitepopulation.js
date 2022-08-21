'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SitePopulation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SitePopulation.belongsTo(models.Site);
      SitePopulation.belongsTo(models.Population);
    }
  }
  SitePopulation.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'SitePopulation',
    }
  );
  return SitePopulation;
};
