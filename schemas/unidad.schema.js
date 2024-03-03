const Joi = require('joi');

// Attributes
const uni_cve_unidad = Joi.number().integer();
const uni_nombre = Joi.string().min(1).max(5);
const uni_descripcion = Joi.string(1).max(15);

// Validations

module.exports = {};