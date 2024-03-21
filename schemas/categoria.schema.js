const Joi = require('joi');

// Attributes
const cat_cve_categoria = Joi.number().integer();
const cat_nombre = Joi.string().min(3).max(15);

// Validations
const isValidCve = Joi.object({
  cat_cve_categoria: cat_cve_categoria.required()
});

module.exports = { isValidCve };