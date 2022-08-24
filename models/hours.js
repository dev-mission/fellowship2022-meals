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
      day: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Hours: day cannot be blank',
          },
          notEmpty: {
            msg: 'Hours: day cannot be blank',
          },
          isValid(value) {
            if (value < 0 || value > 6) {
              throw new Error('Hours: invalid day. day of the week is represented where 0 is Sunday ... 6 is Saturday');
            }
          },
        },
      },
      open: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      close: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Hours',
    }
  );
  return Hours;
};
