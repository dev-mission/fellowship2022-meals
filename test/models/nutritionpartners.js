const assert = require('assert');
const _ = require('lodash');

const helper = require('../helper');
const models = require('../../models');

describe('models.NutritionPartner', () => {
  beforeEach(async () => {
    await helper.loadFixtures(['nutritionpartners']);
  });

  it('creates a new Item record', async () => {
    let item = models.NutritionPartner.build({
      name: 'Test name 1',
      phoneNumber: '4154154151',
    });
    assert.deepStrictEqual(item.id, null);
    await item.save();
    assert(item.id);

    test = await models.NutritionPartner.findByPk(item.id);
    assert.deepStrictEqual(test.name, 'Test name 1');
    assert.deepStrictEqual(test.phoneNumber, '4154154151');
  });

  it('validates required fields', async () => {
    const site = models.NutritionPartner.build({
      name: '',
      phoneNumber: '123',
      email: '',
      website: '',
    });
    await assert.rejects(site.save(), (error) => {
      assert(error instanceof models.Sequelize.ValidationError);
      assert.deepStrictEqual(error.errors.length, 2);
      assert(
        _.find(error.errors, {
          path: 'name',
          message: 'NutritionPartner: name cannot be blank',
        })
      );
      assert(
        _.find(error.errors, {
          path: 'phoneNumber',
          message: 'Invalid phone number, ten numbers only',
        })
      );
      return true;
    });
  });
});
