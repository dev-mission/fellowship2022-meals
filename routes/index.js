const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

/// configure serving up a built client app
router.use(express.static(path.join(__dirname, '../client/build')));

/// configure serving any static file in public folder
router.use(express.static(path.join(__dirname, '../public')));

/// serve libraries installed as node modules
router.use('/libraries/bootstrap', express.static(path.join(__dirname, '../client/node_modules/bootstrap/dist')));

/// serve some paths from other nested routers
router.use('/api', require('./api'));

/// serve up the client app for all other routes, per SPA client-side routing
router.get('/*', (req, res, next) => {
  if (req.accepts('html')) {
    let data = fs.readFileSync(path.join(__dirname, '../client/build', 'index.html')).toString('utf8');
    data = data.replace(/window\.env\.([^ =]+)[^,;<]+/g, (match, p1) => `window.env.${p1} = '${process.env[p1] ?? ''}'`);
    res.send(data);
  } else {
    next();
  }
});

module.exports = router;
