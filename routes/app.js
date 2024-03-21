const express = require('express');

const testRouter = require('./test.router.js');
const casaRouter = require('./casa.router.js');
const usuarioRouter = require('./usuario.router.js');
const grupoRouter = require('./grupo.router.js');
const authRouter = require('./auth.router.js');
const compraRouter = require('./compra.router.js');
const gastoRouter = require('./gasto.router.js');
const servicioRouter = require('./servicio.router.js');
const productoRouter = require('./producto.router.js');
const unidadRouter = require('./unidad.router.js');
const categoriaRouter = require('./categoria.router.js');
const despensaRouter = require('./despensa.router.js');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/test', testRouter);
  router.use('/auth', authRouter);
  router.use('/casa', casaRouter);
  router.use('/usuario', usuarioRouter);
  router.use('/grupo', grupoRouter);
  router.use('/compra', compraRouter);
  router.use('/gasto', gastoRouter);
  router.use('/servicio', servicioRouter);
  router.use('/producto', productoRouter);
  router.use('/unidad', unidadRouter);
  router.use('/categoria', categoriaRouter);
  router.use('/despensa', despensaRouter);
}

module.exports = routerApi;