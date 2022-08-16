const assert = require('assert');
const _ = require('lodash');
const fs = require('fs-extra');
const path = require('path');
const { v4: uuid } = require('uuid');

const helper = require('../helper');
const models = require('../../models');

describe('models.SiteNutritionPartner', () => {
  it('creates a new record', async () => {
    let record = models.SiteNutritionPartner.build({
      SiteId: 1,
      NutritionPartnerId: 1,
    });
    assert.deepStrictEqual(record.id, null);
    await record.save();
    assert(record.id);
    test = await models.SiteNutritionPartner.findByPk(record.id);
    assert.deepStrictEqual(item.SiteID, 1);
    assert.deepStrictEqual(NutritionPartnerId, 1);
  });
});
