const express = require('express');
const passport = require('passport');
const validatorHandler = require('./../middlewares/validator.handler');
const { crearCompra } = require('./../schemas/compra.schema');
const CompraService = require('./../services/compra.service');
const ServicioService = require('./../services/servicio.service');

const router = new express.Router();
const service = new CompraService();
const servicioService = new ServicioService();

// Crear una compra
router.post('/', 
  passport.authenticate('jwt', { session: false }),
  validatorHandler(crearCompra, 'body'),
  async (req, res, next) => {
    // {
    //   "com_nombre": "Pago de agua",
    //   "com_monto_total": 150.00,
    //   "com_fecha": "2024-03-16",
    //   "com_cve_servicio": 3
    // }

    try {
      let data = req.body;
      let cve_usuario = req.user.sub;
      let result = undefined;

      // validar si es compra o servicio por cve
      const isCompra = await servicioService.isCompraServicio(data.com_cve_servicio);

      // com_estado -> false si es servicio
      // com_estado -> true si es compra
      data = { ...data, com_estado: isCompra };

      if(!isCompra) { // si no es compra -> insertar compra
        result = await service.insert(cve_usuario, data);
      } else { // registrar compra y ticket
        result = await service.insertCompra(cve_usuario, data);
      }

      res.status(201).json(result);
    } catch(error) {
      next(error);
    }
  }
);

module.exports = router;