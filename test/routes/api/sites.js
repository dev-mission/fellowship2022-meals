const assert = require('assert');
const HttpStatus = require('http-status-codes');
const _ = require('lodash');
const session = require('supertest-session');

const helper = require('../../helper');
const app = require('../../../app');
const models = require('../../../models');

describe('/api/sites', () => {
  let testSession;

  beforeEach(async () => {
    await helper.loadFixtures(['sites', 'hours', 'users']);
    testSession = session(app);
  });

  describe('GET /', () => {
    it('returns all Site records', async () => {
      const response = await testSession.get('/api/sites').expect(HttpStatus.OK);
      const result = response.body;
      assert.deepStrictEqual(result.length, 2);
      assert.deepStrictEqual(result[0].id, 1);
      assert.deepStrictEqual(result[0].name, 'Dr. Davis Senior Center');
      assert.deepStrictEqual(result[1].id, 2);
      assert.deepStrictEqual(result[1].name, 'Kimochi Senior Center');
    });
  });

  describe('GET /:id', () => {
    it('return a specific Site record', async () => {
      const response = await testSession.get('/api/sites/1').expect(HttpStatus.OK);
      const result = response.body;
      assert.deepStrictEqual(_.pick(result, ['id', 'name', 'address', 'phoneNumber', 'email', 'Hours']), {
        id: 1,
        name: 'Dr. Davis Senior Center',
        address: '1753 Carroll Ave, San Francisco, CA 94124',
        phoneNumber: '6503217654',
        email: 'davis@davis.org',
        Hours: [{ day: 0, open: '11:00', close: '13:00', type: 'Lunch' }],
      });
    });
  });

  context('admin authenticated', () => {
    beforeEach(async () => {
      await testSession
        .post('/api/auth/login')
        .set('Accept', 'application/json')
        .send({ email: 'admin.user@test.com', password: 'abcd1234' })
        .expect(HttpStatus.OK);
    });

    describe('POST /', () => {
      it('creates a new Site', async () => {
        const data = {
          name: 'Dev/Mission HQ',
          address: '360 Valencia Ave, San Francisco, CA 94103',
          phoneNumber: '4155551234',
          email: 'test@email.com',
          website: 'https://devmission.org',
          Hours: [
            { day: 0, open: '11:00', close: '13:00', type: 'Lunch' },
            { day: 1, open: '17:00', close: '19:00', type: 'Dinner' },
          ],
        };
        const response = await testSession.post('/api/sites').set('Accept', 'application/json').send(data).expect(HttpStatus.CREATED);
        const result = response.body;
        assert(result.id);
        assert.deepStrictEqual(result.name, data.name);
        assert.deepStrictEqual(result.address, data.address);
        assert.deepStrictEqual(result.phoneNumber, data.phoneNumber);
        assert.deepStrictEqual(result.email, data.email);
        assert.deepStrictEqual(result.website, data.website);

        const site = await models.Site.findByPk(result.id, {
          include: [models.NutritionPartner, models.Population, models.MealType, models.Service, models.CovidStatus, models.Hours],
        });
        assert.deepStrictEqual(site.name, data.name);
        assert.deepStrictEqual(site.address, data.address);
        assert.deepStrictEqual(site.phoneNumber, data.phoneNumber);
        assert.deepStrictEqual(site.email, data.email);
        assert.deepStrictEqual(site.website, data.website);
        assert.deepStrictEqual(site.Hours.length, 2);
        assert.deepStrictEqual(site.Hours[0].day, 0);
        assert.deepStrictEqual(site.Hours[0].open, '11:00:00');
        assert.deepStrictEqual(site.Hours[0].close, '13:00:00');
        assert.deepStrictEqual(site.Hours[0].type, 'Lunch');
        assert.deepStrictEqual(site.Hours[1].day, 1);
        assert.deepStrictEqual(site.Hours[1].open, '17:00:00');
        assert.deepStrictEqual(site.Hours[1].close, '19:00:00');
        assert.deepStrictEqual(site.Hours[1].type, 'Dinner');
      });
    });

    describe('PATCH /:id', () => {
      it('updates an existing Site', async () => {
        const data = {
          name: 'Dev/Mission HQ',
          address: '360 Valencia Ave, San Francisco, CA 94103',
          phoneNumber: '4155551234',
          email: 'test@email.com',
          website: 'https://devmission.org',
          Hours: [
            { day: 0, open: '12:00', close: '14:00', type: 'Lunch' },
            { day: 1, open: '17:00', close: '19:00', type: 'Dinner' },
          ],
        };
        const response = await testSession.patch('/api/sites/1').set('Accept', 'application/json').send(data).expect(HttpStatus.OK);
        const result = response.body;
        assert.deepStrictEqual(result.name, data.name);
        assert.deepStrictEqual(result.address, data.address);
        assert.deepStrictEqual(result.phoneNumber, data.phoneNumber);
        assert.deepStrictEqual(result.email, data.email);
        assert.deepStrictEqual(result.website, data.website);

        const site = await models.Site.findByPk(1, {
          include: [models.NutritionPartner, models.Population, models.MealType, models.Service, models.CovidStatus, models.Hours],
        });
        assert.deepStrictEqual(site.name, data.name);
        assert.deepStrictEqual(site.address, data.address);
        assert.deepStrictEqual(site.phoneNumber, data.phoneNumber);
        assert.deepStrictEqual(site.email, data.email);
        assert.deepStrictEqual(site.website, data.website);
        assert.deepStrictEqual(site.Hours.length, 2);
        assert.deepStrictEqual(site.Hours[0].day, 0);
        assert.deepStrictEqual(site.Hours[0].open, '12:00:00');
        assert.deepStrictEqual(site.Hours[0].close, '14:00:00');
        assert.deepStrictEqual(site.Hours[0].type, 'Lunch');
        assert.deepStrictEqual(site.Hours[1].day, 1);
        assert.deepStrictEqual(site.Hours[1].open, '17:00:00');
        assert.deepStrictEqual(site.Hours[1].close, '19:00:00');
        assert.deepStrictEqual(site.Hours[1].type, 'Dinner');
      });
    });
  });
});
