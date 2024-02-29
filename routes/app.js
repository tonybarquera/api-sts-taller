const express = require('express');

const testRouter = require('./test.router.js');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/test', testRouter);
}

module.exports = routerApi;