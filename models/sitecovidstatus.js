'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SiteCovidStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SiteCovidStatus.init(
    {
      SiteId: DataTypes.INTEGER,
      CovidStatusId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'SiteCovidStatus',
    }
  );
  return SiteCovidStatus;
};
