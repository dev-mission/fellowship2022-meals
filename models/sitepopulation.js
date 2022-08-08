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
    }
  }
  SitePopulation.init(
    {
      SiteId: DataTypes.INTEGER,
      PopulationId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'SitePopulation',
    }
  );
  return SitePopulation;
};
