const { Client } = require('@googlemaps/google-maps-services-js');
const _ = require('lodash');
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
      Site.belongsToMany(models.CovidStatus, { through: models.SiteCovidStatus });
      Site.belongsToMany(models.MealType, { through: models.SiteMealType });
      Site.belongsToMany(models.NutritionPartner, { through: models.SiteNutritionPartner });
      Site.belongsToMany(models.Population, { through: models.SitePopulation });
      Site.belongsToMany(models.Service, { through: models.SiteService });
      Site.hasMany(models.Hours);
    }

    toJSON() {
      const data = this.get();
      return data;
    }
  }

  Site.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Site: name cannot be blank',
          },
          notEmpty: {
            msg: 'Site: name cannot be blank',
          },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Site: address cannot be blank',
          },
          notEmpty: {
            msg: 'Site: address cannot be blank',
          },
        },
      },
      lat: {
        type: DataTypes.FLOAT,
      },
      lng: {
        type: DataTypes.FLOAT,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isValid(value) {
            if (value.length === 0) {
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
      modelName: 'Site',
    }
  );

  Site.beforeSave(async (site) => {
    if (site.changed('address')) {
      const client = new Client();
      try {
        const response = await client.geocode({
          params: {
            key: process.env.GOOGLE_MAPS_GEOCODING_API_KEY,
            address: `${site.address}`,
          },
        });
        if (response.data?.results?.length) {
          const { lat, lng } = response.data.results[0].geometry?.location ?? {};
          if (lat && lng) {
            site.lat = lat;
            site.lng = lng;
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  });

  return Site;
};
