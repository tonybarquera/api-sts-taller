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
}

module.exports = GastoService;