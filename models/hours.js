'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hours extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Hours.belongsTo(models.Site);
    }
  }
  Hours.init(
    {
      // SiteId: DataTypes.INTEGER,
      day: DataTypes.INTEGER,
      open: DataTypes.TIME,
      close: DataTypes.TIME,
      type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Hours',
    }
  );
  return Hours;
};
