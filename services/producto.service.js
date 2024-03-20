const sequelize = require('./../libs/database.js');

class ProductoService {
  constructor() {

  }

  async obtenerProductos() {
    const sqlQuery = "SELECT pro_cve_producto, pro_nombre, pro_descripcion, cat_nombre  FROM producto, categoria WHERE pro_cve_categoria = cat_cve_categoria";
    const productos = await sequelize.query(sqlQuery);
    return productos[0];
  }
}

module.exports = ProductoService;