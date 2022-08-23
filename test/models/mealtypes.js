const assert = require('assert');
const _ = require('lodash');
const fs = require('fs-extra');
const path = require('path');
const { v4: uuid } = require('uuid');

const helper = require('../helper');
const models = require('../../models');

describe('models.MealType', () => {
  beforeEach(async () => {
    await helper.loadFixtures(['mealtypes']);
  });

  it('creates a new record record', async () => {
    let record = models.MealType.build({
      name: 'Chinese',
    });
    assert.deepStrictEqual(record.id, null);
    await record.save();
    assert(record.id);

    test = await models.MealType.findByPk(record.id);
    assert.deepStrictEqual(test.name, 'Chinese');
  });
});
