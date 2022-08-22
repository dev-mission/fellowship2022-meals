'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NutritionPartner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      NutritionPartner.belongsToMany(models.Site, { through: models.SiteNutritionPartner });
    }
  }
  NutritionPartner.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'NutritionPartner: name cannot be blank',
          },
          notEmpty: {
            msg: 'NutritionPartner: name cannot be blank',
          },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isValid(value) {
            if (value.length == 0) {
              return;
            }
            if (value.match(/^[0-9]{10}$/) == null) {
              throw new Error('Invalid phone number, ten numbers only');
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      website: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'NutritionPartner',
    }
  );
  return NutritionPartner;
};
