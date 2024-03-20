const express = require('express');
const passport = require('passport');
const ServicioService = require('./../services/servicio.service');

const router = new express.Router();
const service = new ServicioService();

// Obtener todos los servicios disponibles
router.get('/', 
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const result = await service.obtenerServicios();
      res.status(200).json(result);
    } catch(error) {
      next(error);
    }
  }
);

module.exports = router;