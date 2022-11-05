const assert = require('assert');
const helper = require('../helper');
const models = require('../../models');

describe('models.SiteService', () => {
  beforeEach(async () => {
    await helper.loadFixtures(['sites', 'services']);
  });

  it('creates a new record', async () => {
    const record = models.SiteService.build({
      SiteId: 1,
      ServiceId: 1,
    });
    assert.deepStrictEqual(record.id, null);
    await record.save();
    assert(record.id);
    const test = await models.SiteService.findByPk(record.id);
    assert.deepStrictEqual(test.SiteId, 1);
    assert.deepStrictEqual(test.ServiceId, 1);
  });
});
