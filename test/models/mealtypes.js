const assert = require('assert');

const helper = require('../helper');
const models = require('../../models');

describe('models.MealType', () => {
  beforeEach(async () => {
    await helper.loadFixtures(['MealType']);
  });

  it('creates a new record record', async () => {
    let record = models.MealType.build({
      name: 'Chinese',
    });
    assert.deepStrictEqual(record.id, null);
    await record.save();
    assert(record.id);

    test = await models.MealType.findByPk(record.id);
    assert.deepStrictEqual(item.name, 'Chinese');
  });
});
