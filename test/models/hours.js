const assert = require('assert');
const _ = require('lodash');
const fs = require('fs-extra');
const path = require('path');
const { v4: uuid } = require('uuid');

const helper = require('../helper');
const models = require('../../models');

describe('models.Hours', () => {
  beforeEach(async () => {
    await helper.loadFixtures(['sites', 'hours']);
  });

  it('creates a new Hours record', async () => {
    let hour = models.Hours.build({
      SiteId: 1,
      day: 1,
      open: '11:00',
      close: '2:30',
      type: 'lunch',
    });
    assert.deepStrictEqual(hour.id, null);
    await hour.save();
    assert(hour.id);

    hour = await models.Hours.findByPk(hour.id);
    assert.deepStrictEqual(hour.SiteId, 1);
    assert.deepStrictEqual(hour.day, 1);
    assert.deepStrictEqual(hour.open, '11:00:00');
    assert.deepStrictEqual(hour.close, '02:30:00');
    assert.deepStrictEqual(hour.type, 'lunch');
  });

  it('validates required fields', async () => {
    let hour = models.Hours.build({
      SiteId: 123123,
      day: 7,
      open: '11:00',
      close: '2:30',
      type: 'lunch',
    });
    await assert.rejects(hour.save(), (error) => {
      // assert.deepStrictEqual(error.errors.length, 1);

      //   assert(
      //     _.find(error.errors, {
      //       path: 'lastName',
      //       message: 'Last name cannot be blank',
      //     })
      //   );
      // assert(
      //   _.find(error.errors, {
      //     path: 'email',
      //     message: 'Email cannot be blank',
      //   })
      // );
      // assert(
      //   _.find(error.errors, {
      //     path: 'password',
      //     message: 'Minimum eight characters, at least one letter and one number',
      //   })
      // );
      return true;
    });
  });
});
