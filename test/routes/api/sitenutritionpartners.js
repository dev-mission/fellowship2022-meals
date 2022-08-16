const assert = require('assert');
const HttpStatus = require('http-status-codes');
const _ = require('lodash');
const session = require('supertest-session');

const helper = require('../../helper');
const app = require('../../../app');
const models = require('../../../models');

describe('/api/sitenutritionpartners', () => {
  let testSession;

  beforeEach(async () => {
    await helper.loadFixtures(['sitenutritionpartners']);
    testSession = session(app);
  });

  describe('GET /', () => {
    it('returns all sitepopulation', async () => {
      const response = await testSession.get('/api/sitenutritionpartners').expect(HttpStatus.OK);
      const result = response.body;
      console.log(result);
    });
  });
});
