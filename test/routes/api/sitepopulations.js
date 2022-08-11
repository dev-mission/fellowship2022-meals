const assert = require('assert');
const HttpStatus = require('http-status-codes');
const _ = require('lodash');
const session = require('supertest-session');

const helper = require('../../helper');
const app = require('../../../app');
const models = require('../../../models');

describe('/api/sitepopulations', () => {
  let testSession;

  beforeEach(async () => {
    await helper.loadFixtures(['sitepopulations']);
    testSession = session(app);
  });

  describe('GET /', () => {
    it('returns all sitepopulation', async () => {
      const response = await testSession.get('/api/sitepopulations').expect(HttpStatus.OK);
      const result = response.body;
      assert.deepStrictEqual(result.length, 3);
    });
  });
});
