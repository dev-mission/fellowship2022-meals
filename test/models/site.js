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
      address: '360 Valencia St, San Franciso, CA 94103',
      phoneNumber: '',
      email: 'testing@gmail.com',
    });

    assert.deepStrictEqual(newSite.id, null);
    await newSite.save();
    assert(newSite.id);

    site = await models.Site.findByPk(newSite.id);
    assert.deepStrictEqual(site.name, 'testName');
    assert.deepStrictEqual(site.address, '360 Valencia St, San Franciso, CA 94103');
    assert.deepStrictEqual(site.lat, 37.7672783);
    assert.deepStrictEqual(site.lng, -122.4222935);
    assert.deepStrictEqual(site.phoneNumber, '');
    assert.deepStrictEqual(site.email, 'testing@gmail.com');
  });

  it('updates lat/lng after an address update', async () => {
    const site = await models.Site.findByPk(1);
    await site.update({ address: '360 Valencia St, San Franciso, CA 94103' });
    await site.reload();
    assert.deepStrictEqual(site.lat, 37.7672783);
    assert.deepStrictEqual(site.lng, -122.4222935);
  });

  it('validates required fields', async () => {
    const site = models.Site.build({
      name: '',
      address: '',
      phoneNumber: '1',
      email: '',
    });
    await assert.rejects(site.save(), (error) => {
      assert(error instanceof models.Sequelize.ValidationError);
      assert.deepStrictEqual(error.errors.length, 3);
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
      return true;
    });
  });
});
