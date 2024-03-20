const express = require('express');
const passport = require('passport');
const ProductoService = require('./../services/producto.service');

const router = new express.Router();
const service = new ProductoService();

router.get('/', 
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const productos = await service.obtenerProductos();
      res.status(200).json(productos);
    } catch(error) {
      next(error);
    }
  }
);

module.exports = router;