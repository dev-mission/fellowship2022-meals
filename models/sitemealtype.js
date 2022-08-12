'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SiteMealType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SiteMealType.belongsTo(models.Site);
      SiteMealType.belongsTo(models.MealType);
    }
  }
  SiteMealType.init(
    {},
    {
      sequelize,
      modelName: 'SiteMealType',
    }
  );
  return SiteMealType;
};
