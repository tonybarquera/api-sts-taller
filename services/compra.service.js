const boom = require('boom');
const sequelize = require('./../libs/database.js');
const { models } = require('./../libs/database.js');

class CompraService {
  constructor() {

  }

  async insert(cve_usuario, data) {
    const transaction = await sequelize.transaction();
    let result;

    try {
      // obtener cve_casa del usuario
      const casa = await models.Grupo.findOne({
        where: { gru_cve_usuario: cve_usuario },
        attributes: ['gru_cve_casa']
      });

      if(!casa) {
        throw boom.badData('El usuario no tiene una casa');
      }

      const { gru_cve_casa } = casa;

      // Registrar compra
      const compra = await models.Compra.create(data, {
        transaction: transaction
      });

      const { com_cve_compra } = compra;

      // Registrar gasto
      const gasto = await models.Gasto.create({
        gas_cve_casa: gru_cve_casa,
        gas_cve_compra: com_cve_compra
      }, {
        transaction: transaction
      });

      result = { compra, gasto };
      await transaction.commit();
    } catch(error) {
      await transaction.rollback();
      throw error;
    }
    
    return result;
  }

  async insertCompra(cve_usuario, data) {
    const transaction = await sequelize.transaction();
    let result = data;

    try {
      // obtener cve_casa del usuario
      const casa = await models.Grupo.findOne({
        where: { gru_cve_usuario: cve_usuario },
        attributes: ['gru_cve_casa']
      });

      if(!casa) {
        throw boom.badData('El usuario no tiene una casa');
      }

      const { gru_cve_casa } = casa;

      // registrar compra y obtener cve
      const compra = await models.Compra.create(data, {
        transaction: transaction
      });

      const { com_cve_compra } = compra;

      // registrar ticket y agregar cve compra
      const { ticket } = data;
      const despensaPreview = JSON.parse(JSON.stringify(ticket));
      
      ticket.forEach(producto => {
        producto.tic_cve_compra = com_cve_compra; 
        delete producto.caducidad;
      });

      const resultTicket = await models.Ticket.bulkCreate(ticket, {
        transaction: transaction
      })

      // registrar despensa
      const despensa = despensaPreview.map(producto => {
        return {
          des_cantidad: producto.tic_cantidad,
          des_vencimiento: producto.caducidad,
          des_contenido_neto: producto.tic_contenido_neto,
          des_cve_unidad: producto.tic_cve_unidad,
          des_cve_casa: gru_cve_casa,
          des_cve_producto: producto.tic_cve_producto
        }
      });

      const resultDespensa = await models.Despensa.bulkCreate(despensa, {
        transaction: transaction
      });

      // registrar gasto
      const gasto = {
        gas_cve_casa: gru_cve_casa,
        gas_cve_compra: com_cve_compra
      }

      const resultGasto = await models.Gasto.create(gasto, {
        transaction: transaction
      });

      result = { resultTicket, resultDespensa, resultGasto };
      await transaction.commit();
    } catch(error) {
      await transaction.rollback();
      throw error;
    }

    return result;
  }
}

module.exports = CompraService;
