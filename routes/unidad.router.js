const express = require('express');
const passport = require('passport');
const UnidadService = require('./../services/unidad.service');

const router = new express.Router();
const service = new UnidadService();

router.get('/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const result = await service.obtenerUnidades();
      res.status(200).json(result);
    } catch(error) {
      next(error);
    }
  }
);

module.exports = router;