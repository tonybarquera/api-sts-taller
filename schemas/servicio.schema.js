const Joi = require('joi');

// Attributes
const ser_cve_servicio = Joi.number().integer();
const ser_nombre = Joi.string().min(5).max(25);
const ser_descripcion = Joi.string().min(5).max(40);

// Validations

module.exports = {};