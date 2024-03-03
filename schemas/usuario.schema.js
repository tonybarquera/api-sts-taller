const Joi = require('joi');

// Attributes
const usu_cve_usuario = Joi.number().integer();
const usu_correo = Joi.string().min(5).max(60);
const usu_password = Joi.string().min(8).max(60);
const use_username = Joi.string().min(5).max(25);
const use_telefono = Joi.string().min(10).max(10);
const use_admin = Joi.boolean();
const use_cve_casa = Joi.number().integer();

// Validations

module.exports = {};