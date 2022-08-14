const assert = require('assert');
const _ = require('lodash');
const fs = require('fs-extra');
const path = require('path');
const { v4: uuid } = require('uuid');

const helper = require('../helper');
const models = require('../../models');

// describe('models.Site', () => {
//   beforeEach(async () => {
//     await helper.loadFixtures(['sites']);
//   });

//   it('creates a new Site record', async () => {
//     let user = models.Site.build({
//         name:
//     })
//   })
// });
