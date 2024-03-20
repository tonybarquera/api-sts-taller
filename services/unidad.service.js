const { models } = require('./../libs/database');

class UnidadService {
  constructor() {

  }

  async obtenerUnidades() {
    const unidades = await models.Unidad.findAll({
      attributes: ["uni_cve_unidad", "uni_nombre"]
    });
    return unidades;
  }
}

module.exports = UnidadService;