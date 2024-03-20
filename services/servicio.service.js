const boom = require('boom');
const sequelize = require('./../libs/database.js');
const { models } = require('./../libs/database.js');

class ServicioService {
  constructor() {

  }

  async obtenerServicios() {
    const servicios = await models.Servicio.findAll();
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