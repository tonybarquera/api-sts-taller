const boom = require('boom');
const { models } = require('./../libs/database.js');
const sequelize = require('./../libs/database.js');

class GastoService {
  constructor() {

  }

  async obtenerGastosPendientes(gru_cve_usuario) {
    let result = gru_cve_usuario;
    // Obtener casa
    const { gru_cve_casa } = await models.Grupo.findOne({
      attributes: [ "gru_cve_casa" ],
      where: {
        gru_cve_usuario: gru_cve_usuario
      }
    });

    if(!gru_cve_casa) {
      throw boom.badData('El usuario no tiene una casa asignada');
    }

    result = gru_cve_casa;

    // Obtener gastos de casa
    // Obtener compras de casa where estado false
    const sqlQuery = `SELECT com_cve_compra, com_nombre, com_fecha, com_monto_total, com_estado, ser_descripcion FROM gasto, compra, servicio WHERE gas_cve_compra = com_cve_compra AND gas_cve_casa = ${gru_cve_casa} AND com_estado = false AND com_cve_servicio = ser_cve_servicio`;
    const compras = await sequelize.query(sqlQuery);
 
    result = compras[0];
    return result;
  }

  async cambiarEstadoCompra(gru_cve_usuario, com_cve_compra) {
    let result = { gru_cve_usuario, com_cve_compra };

    // Obtener casa cve
    const { gru_cve_casa } = await models.Grupo.findOne({
      where: {
        gru_cve_usuario: gru_cve_usuario
      }
    });

    if(!gru_cve_casa) {
      boom.badData('El usuario no tiene casa');
    }

    // Validar que compra sea de casa
    const gasto = await models.Gasto.findOne({
      where: {
        gas_cve_casa: gru_cve_casa,
        gas_cve_compra: com_cve_compra
      }
    });

    if(!gasto) {
      boom.badData('Esta compra no pertenece a la casa');
    }

    // Actualizar estado
    const compra = await models.Compra.update({ com_estado: true }, {
      where: {
        com_cve_compra: com_cve_compra
      }
    })

    result = compra;
    return result;
  }

  async eliminarCompraPendiente(gru_cve_usuario, com_cve_compra) {
    const transaction = await sequelize.transaction();
    let result = { gru_cve_usuario, com_cve_compra };

    // obtener casa del usuario
    const { gru_cve_casa } = await models.Grupo.findOne({
      attributes: ["gru_cve_casa"],
      where: {
        gru_cve_usuario: gru_cve_usuario
      }
    });

    if(!gru_cve_casa) {
      throw boom.badData('El usuario no tiene casa');
    }

    // validar que compra sea de la casa en gasto
    const compra = await models.Gasto.findOne({
      where: {
        gas_cve_casa: gru_cve_casa,
        gas_cve_compra: com_cve_compra
      }
    });

    if(!compra) {
      throw boom.badData('Esta compra no pertenece a la casa');
    }

    // validar que la compra no esta pagada
    const { com_estado } = await models.Compra.findOne({
      attributes: ["com_estado"],
      where: {
        com_cve_compra: com_cve_compra
      }
    });

    if(com_estado) {
      throw boom.badData('La compra no se puede eliminar');
    }

    // Eliminar
    try {
      // eliminar gasto
      await models.Gasto.destroy({
        where: {
          gas_cve_casa: gru_cve_casa,
          gas_cve_compra: com_cve_compra
        },
        transaction: transaction
      });

      // eliminar compra
      result = await models.Compra.destroy({
        where: {
          com_cve_compra: com_cve_compra
        },
        transaction: transaction
      });

      await transaction.commit();
    } catch(error) {
      await transaction.rollback();
    }

    return result;
  }

  async obtenerGastosCategoria(gru_cve_usuario, categoria) {
    const { gru_cve_casa } = await models.Grupo.findOne({
      attributes: ["gru_cve_casa"],
      where: {
        gru_cve_usuario: gru_cve_usuario
      }
    });

    if(!gru_cve_casa) {
      throw boom.badData('El usuario no tiene casa');
    }

    // 1 -> Compra | 2 -> Servicios | 3 -> Renta
    let sqlQuery = "";

    if(categoria == 1) {
      sqlQuery = `SELECT com_cve_compra, pro_nombre, tic_cantidad, CONCAT(tic_contenido_neto, ' ', uni_nombre) AS tic_contenido, com_fecha, tic_precio_unitario, tic_cantidad * tic_precio_unitario AS subtotal FROM gasto, compra, ticket, producto, unidad  WHERE gas_cve_compra = com_cve_compra AND gas_cve_casa = ${gru_cve_casa} AND com_cve_servicio = 6 AND com_cve_compra = tic_cve_compra AND tic_cve_producto = pro_cve_producto AND uni_cve_unidad = tic_cve_unidad;`;
    } else if(categoria == 2) {
      sqlQuery = `SELECT com_nombre, com_fecha, com_monto_total, ser_descripcion FROM gasto, compra, servicio WHERE gas_cve_compra = com_cve_compra AND ser_cve_servicio = com_cve_servicio AND gas_cve_casa = ${gru_cve_casa} AND com_cve_servicio != 1 AND com_cve_servicio != 6`;
    } else {
      sqlQuery = `SELECT com_nombre, com_fecha, com_monto_total, ser_descripcion FROM gasto, compra, servicio WHERE gas_cve_compra = com_cve_compra AND ser_cve_servicio = com_cve_servicio AND gas_cve_casa = ${gru_cve_casa} AND com_cve_servicio = 1`;
    }

    const gastos = await sequelize.query(sqlQuery);

    return gastos[0];
  }

  async obtenerGastosTotalCategoria(gru_cve_usuario, categoria) {
    const { gru_cve_casa } = await models.Grupo.findOne({
      attributes: ["gru_cve_casa"],
      where: {
        gru_cve_usuario: gru_cve_usuario
      }
    });

    if(!gru_cve_casa) {
      throw boom.badData('El usuario no tiene casa');
    }

    // 1 -> Compra | 2 -> Servicios | 3 -> Renta
    let sqlQuery = "";

    if(categoria == 1) {
      sqlQuery = `SELECT SUM(tic_precio_unitario*tic_cantidad) AS 'total' FROM gasto, compra, ticket WHERE gas_cve_compra = com_cve_compra AND gas_cve_casa = ${gru_cve_casa} AND com_cve_servicio = 6 AND com_cve_compra = tic_cve_compra`;
    } else if(categoria == 2) {
      sqlQuery = `SELECT SUM(com_monto_total) AS 'total' FROM gasto, compra WHERE gas_cve_compra = com_cve_compra AND gas_cve_casa = ${gru_cve_casa} AND com_cve_servicio
      != 6 AND com_cve_servicio != 1`;
    } else {
      sqlQuery = `SELECT SUM(com_monto_total) AS 'total' FROM gasto, compra WHERE gas_cve_compra = com_cve_compra AND gas_cve_casa = ${gru_cve_casa} AND com_cve_servicio = 1`;
    }

    const gastos = await sequelize.query(sqlQuery);

    return gastos[0][0];
  }
}

module.exports = GastoService;