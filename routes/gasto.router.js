const express = require('express');
const passport = require('passport');
const GastoService = require('./../services/gasto.service');
const { validarId } = require('./../schemas/compra.schema');
const validatorHandler = require('./../middlewares/validator.handler');

const router = new express.Router();
const service = new GastoService();

// Obtener gastos pendientes de la casa
router.get('/pendientes', 
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const gru_cve_usuario = req.user.sub;
      
      const result = await service.obtenerGastosPendientes(gru_cve_usuario);
      res.status(201).json(result);
    } catch(error) {
      next(error);
    }
  }
);

// Cambiar el estado de un gasto pendiente
router.post('/pendientes/:com_cve_compra', 
  passport.authenticate('jwt', { session: false }),
  validatorHandler(validarId, 'params'),
  async (req, res, next) => {
    try {
      const gru_cve_usuario = req.user.sub;
      const { com_cve_compra } = req.params;

      const result = await service.cambiarEstadoCompra(gru_cve_usuario, com_cve_compra);
      res.status(200).json(result);
    } catch(error) {
      next(error);
    }
  }
);

// TODO eliminar gasto pendiente
router.delete('/pendientes/:com_cve_compra',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(validarId, 'params'),
  async (req, res, next) => {
    try {
      const gru_cve_usuario = req.user.sub;
      const { com_cve_compra } = req.params;

      const result = await service.eliminarCompraPendiente(gru_cve_usuario, com_cve_compra);
      res.status(200).json(result);
    } catch(error) {
      next(error);
    }
  }
);

module.exports = router;