const assert = require('assert');
const _ = require('lodash');
const fs = require('fs-extra');
const path = require('path');
const { v4: uuid } = require('uuid');

const helper = require('../helper');
const models = require('../../models');

describe('models.SitePopulation', () => {
  it('creates a new record', async () => {
    let record = models.SitePopulation.build({
      SiteId: 1,
      PopulationId: 1,
    });
    assert.deepStrictEqual(record.id, null);
    await record.save();
    assert(record.id);
    test = await models.SitePopulation.findByPk(record.id);
    assert(test.SiteId, 1);
    assert(test.PopulationId);
  });

  // it('get all track records', async () => {
  //   const results = await models.Playlist.findAll();
  //   assert.deepStrictEqual(results.length, 2);
  //   //console.log(results);
  // });
});
