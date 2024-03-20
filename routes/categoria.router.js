const express = require('express');
const passport = require('passport');
const CategoriaService = require('./../services/categoria.service');

const router = new express.Router();
const service = new CategoriaService();

router.get('/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const result = await service.obtenerCategorias();
      res.status(200).json(result);
    } catch(error) {
      next(error);
    }
  }
);

module.exports = router;