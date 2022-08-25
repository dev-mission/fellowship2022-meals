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
      SiteService.belongsTo(models.Site);
      SiteService.belongsTo(models.Service);
    }
  }
  SiteService.init(
    {
      SiteId: DataTypes.INTEGER,
      ServiceId: DataTypes.INTEGER,
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'SiteService',
    }
  );
  return SiteService;
};
