const express = require('express');

const testRouter = require('./test.router.js');
const casaRouter = require('./casa.router.js');
const usuarioRouter = require('./usuario.router.js');
const grupoRouter = require('./grupo.router.js');
const authRouter = require('./auth.router.js');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/test', testRouter);
  router.use('/auth', authRouter);
  router.use('/casa', casaRouter);
  router.use('/usuario', usuarioRouter);
  router.use('/grupo', grupoRouter);
}

module.exports = routerApi;