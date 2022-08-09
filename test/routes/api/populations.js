const assert = require('assert');
const HttpStatus = require('http-status-codes');
const _ = require('lodash');
const session = require('supertest-session');

const helper = require('../../helper');
const app = require('../../../app');
const models = require('../../../models');

describe('/api/populations', () => {
  let testSession;

  beforeEach(async () => {
    await helper.loadFixtures(['populations']);
    testSession = session(app);
  });

  describe('GET /', () => {
    it('returns all population', async () => {
      const response = await testSession.get('/api/populations').expect(HttpStatus.OK);
      const result = response.body;
      //   assert.deepStrictEqual(tracks.length, 2);
      console.log(result);
    });
  });
});
