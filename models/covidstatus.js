'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CovidStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CovidStatus.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'CovidStatus',
    }
  );
  return CovidStatus;
};
