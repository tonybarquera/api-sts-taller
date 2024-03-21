const Joi = require('joi');

// Attributes
const gas_cve_casa = Joi.number().integer();
const gas_cve_compra = Joi.number().integer();

// Validations
const obtenerGastosCategoria = Joi.object({
  categoria: Joi.number().integer().min(1).max(3).required()
});

module.exports = { obtenerGastosCategoria };