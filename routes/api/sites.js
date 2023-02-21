const express = require('express');
const HttpStatus = require('http-status-codes');
const _ = require('lodash');

const models = require('../../models');
const interceptors = require('../interceptors');
const helpers = require('../helpers');

const router = express.Router();

// Get all sites
router.get('/', async (req, res) => {
  const allSite = await models.Site.findAll({
    order: [['name', 'ASC']],
    include: [models.NutritionPartner, models.Population, models.MealType, models.Service, models.CovidStatus, models.Hours],
  });
  res.json(allSite.map((r) => r.toJSON()));
});

// Get a site by id
router.get('/:id', async (req, res) => {
  const site = await models.Site.findByPk(req.params.id, {
    include: [models.NutritionPartner, models.Population, models.MealType, models.Service, models.CovidStatus, models.Hours],
  });
  if (site) {
    res.json(site.toJSON());
  } else {
    res.status(HttpStatus.NOT_FOUND).end();
  }
});

router.post('/', interceptors.requireAdmin, async (req, res) => {
  try {
    let record;
    await models.sequelize.transaction(async (transaction) => {
      record = await models.Site.create(_.pick(req.body, ['name', 'address', 'phoneNumber', 'email', 'website']), { transaction });
      if (record) {
        await record.setNutritionPartners(req.body.NutritionPartnerIds ?? [], { transaction });
        await record.setPopulations(req.body.PopulationIds ?? [], { transaction });
        await record.setMealTypes(req.body.MealTypeIds ?? [], { transaction });
        await record.setServices(req.body.ServiceIds ?? [], { transaction });
        await record.setCovidStatuses(req.body.CovidStatusIds ?? [], { transaction });
        // create new Hours instances
        const hours = req.body.Hours ?? [];
        hours.forEach((h) => (h.SiteId = record.id));
        await models.Hours.bulkCreate(hours, { transaction });
      }
    });
    res.status(HttpStatus.CREATED).json(record.toJSON());
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: error.errors,
      });
    } else {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
    }
  }
});

router.patch('/:id', interceptors.requireAdmin, async (req, res) => {
  try {
    let record;
    await models.sequelize.transaction(async (transaction) => {
      record = await models.Site.findByPk(req.params.id, { transaction });
      if (record) {
        await record.update(_.pick(req.body, ['name', 'address', 'phoneNumber', 'email', 'website']), { transaction });
        await record.setNutritionPartners(req.body.NutritionPartnerIds ?? [], { transaction });
        await record.setPopulations(req.body.PopulationIds ?? [], { transaction });
        await record.setMealTypes(req.body.MealTypeIds ?? [], { transaction });
        await record.setServices(req.body.ServiceIds ?? [], { transaction });
        await record.setCovidStatuses(req.body.CovidStatusIds ?? [], { transaction });
        // to simplify, we brute-force delete and re-create all Hours
        await models.Hours.destroy({ where: { SiteId: record.id } }, { transaction });
        const hours = req.body.Hours ?? [];
        hours.forEach((h) => (h.SiteId = record.id));
        await models.Hours.bulkCreate(hours, { transaction });
      }
    });
    if (record) {
      res.json(record.toJSON());
    } else {
      res.status(HttpStatus.NOT_FOUND).end();
    }
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: error.errors,
      });
    } else {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
    }
  }
});

router.delete('/:id', interceptors.requireAdmin, async (req, res) => {
  try {
    let record;
    await models.sequelize.transaction(async (transaction) => {
      record = await models.Site.findByPk(req.params.id, { transaction });
      if (record) {
        await record.destroy({ transaction });
      }
    });
    if (record) {
      res.status(HttpStatus.OK).end();
    } else {
      res.status(HttpStatus.NOT_FOUND).end();
    }
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: error.errors,
      });
    } else {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
    }
  }
});

module.exports = router;
