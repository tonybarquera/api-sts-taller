const Joi = require('joi');

// Attributes
const gru_cve_usuario = Joi.number().integer();
const gru_cve_casa = Joi.number().integer();

// Validations
const createGrupo = Joi.object({
  gru_cve_usuario: gru_cve_usuario.required(),
  gru_cve_casa: gru_cve_casa.required()
});


module.exports = { createGrupo };