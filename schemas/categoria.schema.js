const Joi = require('joi');

// Attributes
const cat_cve_categoria = Joi.number().integer();
const cat_nombre = Joi.string().min(3).max(15);

// Validations

module.exports = {};