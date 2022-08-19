const assert = require('assert');
const _ = require('lodash');
const fs = require('fs-extra');
const path = require('path');
const { v4: uuid } = require('uuid');

const helper = require('../helper');
const models = require('../../models');

describe('models.Site', () => {
  beforeEach(async () => {
    await helper.loadFixtures(['sites']);
  });

  it('creates a new Site record', async () => {
    let newSite = models.Site.build({
      name: 'testName',
      address: '123 testing st',
      phoneNumber: '4151231234',
      email: 'testing@gmail.com',
    });

    assert.deepStrictEqual(newSite.id, null);
    await newSite.save();
    assert(newSite.id);

    site = await models.Site.findByPk(newSite.id);
    assert.deepStrictEqual(site.name, 'testName');
    assert.deepStrictEqual(site.address, '123 testing st');
    assert.deepStrictEqual(site.phoneNumber, '4151231234');
    assert.deepStrictEqual(site.email, 'testing@gmail.com');
  });

  it('validates required fields', async () => {
    const site = models.Site.build({
      name: '',
      address: '',
      phoneNumber: '',
      email: '',
    });
    await assert.rejects(site.save(), (error) => {
      assert(error instanceof models.Sequelize.ValidationError);
      assert.deepStrictEqual(error.errors.length, 4);
      assert(
        _.find(error.errors, {
          path: 'name',
          message: 'Site: name cannot be blank',
        })
      );
      assert(
        _.find(error.errors, {
          path: 'address',
          message: 'Site: address cannot be blank',
        })
      );
      assert(
        _.find(error.errors, {
          path: 'phoneNumber',
          message: 'Invalid phone number, ten numbers only',
        })
      );
      assert(
        _.find(error.errors, {
          path: 'email',
          message: 'Site: email cannot be blank',
        })
      );
      return true;
    });
  });
});
