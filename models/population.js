'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Population extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Population.belongsToMany(models.Site, { through: models.SitePopulation });
    }
  }
  Population.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Population: name cannot be blank',
          },
          notEmpty: {
            msg: 'Population: name cannot be blank',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Population',
    }
  );
  return Population;
};
