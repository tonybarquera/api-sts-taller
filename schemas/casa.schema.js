const Joi = require('joi')

// Attributes
const cas_cve_casa = Joi.number().integer()
const cas_nombre = Joi.string().min(4).max(25)

// Validations
const createCasaSchema = Joi.object({
  cas_nombre: cas_nombre.required()
});

const validCasaIDSchema = Joi.object({
  cas_cve_casa: cas_cve_casa.required()
});

module.exports = { createCasaSchema , validCasaIDSchema };