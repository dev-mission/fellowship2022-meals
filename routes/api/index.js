const express = require('express');

const router = express.Router();

router.use('/assets', require('./assets'));
router.use('/auth', require('./auth'));
router.use('/passwords', require('./passwords'));
router.use('/populations', require('./populations'));
router.use('/sitemealtype', require('./sitemealtype'));
router.use('/sitepopulations', require('./sitepopulations'));
router.use('/users', require('./users'));

module.exports = router;
