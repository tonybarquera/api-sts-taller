const boom = require('boom');
const sequelize = require('./../libs/database.js');
const { models } = require('./../libs/database.js');

class CasaService {
  constructor() {

  }

  async findById(data) {
    const casa = await models.Casa.findByPk(data);
    return casa;
  }

  // Crear casa - necesita nombre y un usuario (id) admin
  async create(data, usu_cve_usuario) {
    const transaction = await sequelize.transaction();
    let newCasa;

    try {
      // Validar si usuario ya es admin de una casa
      const hasCasa = await models.Grupo.findOne({
        where: {
          gru_cve_usuario: usu_cve_usuario,
          gru_admin: true
        }
      });

      // Crear casa
      newCasa = await models.Casa.create(data, { transaction: transaction });
      const cas_cve_casa = newCasa.cas_cve_casa;

      // Crear grupo
      await models.Grupo.create({
        gru_cve_casa: cas_cve_casa,
        gru_cve_usuario: usu_cve_usuario,
        gru_admin: true
      }, { transaction: transaction });

      if(hasCasa) {
        throw boom.badRequest('El usuario ya tiene una casa creada');
      }

      await transaction.commit();
    } catch(error) {
      await transaction.rollback();
      throw error;
    }
    
    return newCasa;
  }
}

module.exports = CasaService;