const assert = require('assert');
const _ = require('lodash');
const fs = require('fs-extra');
const path = require('path');
const { v4: uuid } = require('uuid');

const helper = require('../helper');
const models = require('../../models');

describe('models.SitePopulation', () => {
  it('creates a new record', async () => {
    let record = models.Population.build({
      name: 'youngsters',
    });
    assert.deepStrictEqual(record.id, null);
    await record.save();
    assert(record.id);
    test = await models.Population.findByPk(record.id);
    assert(test.name, 'youngsters');
  });
});
