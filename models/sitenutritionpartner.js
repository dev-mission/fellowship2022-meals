'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SiteNutritionPartner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SiteNutritionPartner.init(
    {
      __siteId: DataTypes.INTEGER,
      __nutritionPartnerId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'SiteNutritionPartner',
    }
  );
  return SiteNutritionPartner;
};
