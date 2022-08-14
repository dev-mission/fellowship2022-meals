const express = require('express');
const HttpStatus = require('http-status-codes');
const _ = require('lodash');

const models = require('../../models');
const interceptors = require('../interceptors');
const helpers = require('../helpers');

const router = express.Router();

// Get all sites
router.get('/', async (req, res) => {
  const allSite = await models.Site.findAll();
  res.json(allSite.map((r) => r.toJSON()));
});

// Get a site by id
router.get('/:id', async (req, res) => {
  const site = await models.Site.findByPk(req.params.id);
  if (site) {
    res.json(record.toJSON());
  } else {
    res.status(HttpStatus.NOT_FOUND).end();
  }
});

router.post('/', interceptors.requireAdmin, async (req, res) => {
  try {
    const record = await models.Site.create(_.pick(req.body, ['name', 'address', 'phoneNumber', 'email']));
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
