const assert = require('assert');
const _ = require('lodash');
const fs = require('fs-extra');
const path = require('path');
const { v4: uuid } = require('uuid');

const helper = require('../helper');
const models = require('../../models');

describe('models.SiteService', () => {
  it('creates a new record', async () => {
    let record = models.SiteService.build({
      SiteId: 1,
      ServiceId: 1,
    });
    assert.deepStrictEqual(record.id, null);
    await record.save();
    assert(record.id);
    test = await models.SiteService.findByPk(record.id);
    assert.deepStrictEqual(test.SiteId, 1);
    assert.deepStrictEqual(test.ServiceId, 1);
  });
});
