const assert = require('assert');
const _ = require('lodash');
const fs = require('fs-extra');
const path = require('path');
const { v4: uuid } = require('uuid');

const helper = require('../helper');
const models = require('../../models');

describe('models.SiteMealType', () => {
  it('creates a new record', async () => {
    let record = models.SiteMealType.build({
      SiteId: 1,
      MealTypeID: 1,
    });
    assert.deepStrictEqual(record.id, null);
    await record.save();
    assert(record.id);

    test = await models.SiteMealType.findByPk(record.id);
    assert.deepStrictEqual(item.SiteID, 1);
    assert.deepStrictEqual(item.MealTypeID, 1);
  });
});
