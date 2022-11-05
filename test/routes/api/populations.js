const assert = require('assert');
const HttpStatus = require('http-status-codes');
const session = require('supertest-session');

const helper = require('../../helper');
const app = require('../../../app');

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
      assert.deepStrictEqual(result.length, 2);
      assert.deepStrictEqual(result[0].id, 1);
      assert.deepStrictEqual(result[0].name, 'Seniors');
      assert.deepStrictEqual(result[1].id, 2);
      assert.deepStrictEqual(result[1].name, 'Disabled');
    });
  });
});
