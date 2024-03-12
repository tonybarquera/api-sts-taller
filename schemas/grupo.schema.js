const Joi = require('joi');

// Attributes
const gru_cve_usuario = Joi.number().integer();
const gru_cve_casa = Joi.number().integer();
const gru_admin = Joi.boolean();

// Validations

module.exports = { createGrupo };