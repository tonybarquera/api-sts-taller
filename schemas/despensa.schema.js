const Joi = require('joi');

// Attributes
const des_cve_despensa = Joi.number().integer();
const des_cantidad = Joi.number().integer().min(0);
const des_vencimiento = Joi.date();
const des_contenido_neto = Joi.number().integer().min(1);
const des_cve_casa = Joi.number().integer();
const des_cve_unidad = Joi.number().integer();
const des_cve_producto = Joi.number().integer();

// Validations
const eliminarDespensa = Joi.object({
  des_cve_despensa: des_cve_despensa.required(),
  des_cantidad: des_cantidad.required()
});

module.exports = { eliminarDespensa };