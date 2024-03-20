const Joi = require('joi');

// Attributes
const com_cve_compra = Joi.number().integer();
const com_nombre = Joi.string().min(5).max(25);
const com_monto_total = Joi.number().precision(2);
const com_fecha = Joi.date();
const com_estado = Joi.boolean();
const com_cve_servicio = Joi.number().integer();

// Ticket
const tic_cve_compra = Joi.number().integer();
const tic_cve_producto = Joi.number().integer();
const tic_cantidad = Joi.number().integer().min(1);
const tic_precio_unitario = Joi.number().precision(2);
const tic_contenido_neto = Joi.number().integer().min(1);
const tic_cve_unidad = Joi.number().integer();
const caducidad = Joi.date();

// Validations
const crearCompra = Joi.object({
  com_nombre: com_nombre.required(),
  com_monto_total: com_monto_total.required(),
  com_fecha: com_fecha.required(),
  com_cve_servicio: com_cve_servicio.required(),
  ticket: Joi.array().items(
    Joi.object({
      tic_cve_producto: tic_cve_producto.required(),
      tic_cantidad: tic_cantidad.required(),
      tic_precio_unitario: tic_precio_unitario.required(),
      tic_contenido_neto: tic_contenido_neto.required(),
      tic_cve_unidad: tic_cve_unidad.required(),
      caducidad: caducidad.required()
    })
  )
});

const validarId = Joi.object({
  com_cve_compra: com_cve_compra.required()
});

module.exports = { crearCompra, validarId };

// "ticket": [{
//   "tic_cve_producto": 1,
//   "tic_cantidad": 2,
//   "tic_precio_unitario": 20.50,
//   "tic_contenido_neto": 1,
//   "tic_cve_unidad": 3
// }]