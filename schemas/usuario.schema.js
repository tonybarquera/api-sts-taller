const Joi = require('joi');

// Attributes
const usu_cve_usuario = Joi.number().integer();
const usu_correo = Joi.string().min(5).max(60);
const usu_password = Joi.string().min(8).max(60);
const usu_username = Joi.string().min(5).max(25);
const usu_telefono = Joi.string().min(10).max(10);
const usu_cve_casa = Joi.number().integer();

// Validations
const createUsuarioSchema = Joi.object({
  usu_correo: usu_correo.required(),
  usu_password: usu_password.required(),
  usu_username: usu_username.required(),
  usu_telefono: usu_telefono.required()
});

// TODO cambiar findUsuarioById por validUsuarioIDSchema
const findUsuarioById = Joi.object({
  usu_cve_usuario: usu_cve_usuario.required()
});

const validUsuarioIDSchema = Joi.object({
  usu_cve_usuario: usu_cve_usuario.required()
})

module.exports = { createUsuarioSchema, findUsuarioById, validUsuarioIDSchema };