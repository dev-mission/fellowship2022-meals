const express = require('express');

const router = express.Router();

router.use('/assets', require('./assets'));
router.use('/auth', require('./auth'));
router.use('/covidstatuses', require('./covidstatuses'));
router.use('/hours', require('./hours'));
router.use('/mealtypes', require('./mealtypes'));
router.use('/nutritionpartners', require('./nutritionpartners'));
router.use('/passwords', require('./passwords'));
router.use('/populations', require('./populations'));
router.use('/services', require('./services'));
router.use('/sites', require('./sites'));
router.use('/users', require('./users'));

module.exports = router;
