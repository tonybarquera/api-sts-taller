const Joi = require('joi');

// Attribute
const tic_cve_compra = Joi.number().integer();
const tic_cve_producto = Joi.number().integer();
const tic_cantidad = Joi.number().integer().min(1);
const tic_precio_unitario = Joi.number().limit(2);
const tic_contenido_neto = Joi.number().integer().min(1);
const tic_cve_unidad = Joi.number().integer();

// Validations

module.exports = {};