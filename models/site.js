'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Site extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Site.belongsToMany(models.MealType, { through: models.SiteMealType });
    }
  }
  Site.init(
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Site',
    }
  );
  return Site;
};
