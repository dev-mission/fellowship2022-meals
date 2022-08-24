const assert = require('assert');

const helper = require('../helper');
const models = require('../../models');

describe('models.NutritionPartner', () => {
  beforeEach(async () => {
    await helper.loadFixtures(['nutritionpartners']);
  });

  it('creates a new Item record', async () => {
    let item = models.NutritionPartner.build({
      name: 'Test name 1',
    });
    assert.deepStrictEqual(item.id, null);
    await item.save();
    assert(item.id);

    test = await models.NutritionPartner.findByPk(item.id);
    assert.deepStrictEqual(test.name, 'Test name 1');
  });
});
