const boom = require('boom');
const sequelize = require('./../libs/database.js');
const { Op } = require("sequelize");
const { models } = require('./../libs/database.js');
const { where } = require('sequelize');

class ServicioService {
  constructor() {

  }

  async obtenerServicios() {
    const servicios = await models.Servicio.findAll({
      where: {
        ser_cve_servicio: {
          [Op.lt]: 6
        }
      }
    });
    return servicios;
  }

  async isCompraServicio(ser_cve_servicio) {
    const result = await models.Servicio.findOne({
      where: {
        ser_cve_servicio: ser_cve_servicio
      },
      attributes: ['ser_nombre']
    });

    if(result.ser_nombre === 'Compra') {
      return true;
    }

    return false;
  }
}

module.exports = ServicioService;