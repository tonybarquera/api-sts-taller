const Joi = require('joi');

// Attributes
const com_cve_compra = Joi.number().integer();
const com_nombre = Joi.string().min(5).max(25);
const com_monto_total = Joi.number.precision(2);
const com_fecha = Joi.date();
const com_estado = Joi.boolean();
const com_cve_servicio = Joi.number().integer();

// Validations

module.exports = {};