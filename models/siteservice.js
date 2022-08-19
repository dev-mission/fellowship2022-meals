'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SiteService extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SiteService.init(
    {
      SiteId: DataTypes.INTEGER,
      ServiceId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'SiteService',
    }
  );
  return SiteService;
};
