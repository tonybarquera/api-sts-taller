const express = require('express');
const passport = require('passport');
const validatorHandler = require('./../middlewares/validator.handler');
const { eliminarDespensa } = require('./../schemas/despensa.schema');
const { isValidCve } = require('./../schemas/categoria.schema');
const DespensaService = require('./../services/despensa.service');

const router = new express.Router();
const service = new DespensaService();

// Obtener toda la despensa por categoria
router.get('/:cat_cve_categoria',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(isValidCve, 'params'),
  async (req, res, next) => {
    try {
      const gru_cve_usuario = req.user.sub;
      const { cat_cve_categoria } = req.params;

      const result = await service.obtenerDespensaCategoria(gru_cve_usuario, cat_cve_categoria);
      res.status(200).json(result);
    } catch(error) {
      next(error);
    }
  }
);

// Eliminar productos de despensa
router.delete('/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(eliminarDespensa, 'body'),
  async (req, res, next) => {
    // body { des_cve_despensa cantidad_eliminar(des_cantidad) }
    try {
      const gru_cve_usuario = req.user.sub;
      const { des_cve_despensa, des_cantidad } = req.body;

      const result = await service.eliminarDespensa(gru_cve_usuario, des_cve_despensa, des_cantidad);
      res.status(200).json(result);
    } catch(error) {
      next(error);
    }
  }
);

module.exports = router;