const Joi = require('joi');

// Attributes
const pro_cve_producto = Joi.number().integer();
const pro_nombre = Joi.string().min(4).max(25);
const pro_descripcion = Joi.string().min(5).max(30);
const pro_cve_categoria = Joi.number().integer();

// Validations

module.exports = {};