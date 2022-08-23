const express = require('express');

const router = express.Router();

router.use('/assets', require('./assets'));
router.use('/auth', require('./auth'));
router.use('/passwords', require('./passwords'));
router.use('/populations', require('./populations'));
router.use('/sites', require('./sites'));
router.use('/nutritionpartners', require('./nutritionpartners'));
router.use('/hours', require('./hours'));
router.use('/covidstatuses', require('./covidstatuses'));
router.use('/sitecovidstatuses', require('./sitecovidstatuses'));
router.use('/users', require('./users'));
module.exports = router;
