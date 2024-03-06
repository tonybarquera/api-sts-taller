const boom = require('boom');
const sequelize = require('./../libs/database.js');
const { models } = require('./../libs/database.js');
const { use } = require('passport');

class GrupoService {
  constructor() {

  }

  async create(data) {
    const newGrupo = await models.Grupo.create(data);
    return newGrupo;
  }

  async entraUsuario(data) { // data = { usuario, cas_cve_casa }
    const transaction = await sequelize.transaction();
    let newGrupo;

    try {
      // validar si ya existe el grupo
      const existsGrupo = await models.Grupo.findOne({
        where: {
          gru_cve_casa: data.cas_cve_casa,
          gru_cve_usuario: data.usuario
        },
        transaction: transaction
      });

      if(existsGrupo) {
        throw boom.badRequest('Grupo ya creado');
      }

      // Validar que usuario no tenga una casa
      const hasCasa = await models.Grupo.findOne({
        where: {
          gru_cve_usuario: data.usuario
        }
      });

      if(hasCasa) {
        throw boom.badData('Usuario ya tiene casa asignada');
      }

      // Crear el grupo
      newGrupo = await models.Grupo.create({
        gru_cve_casa: data.cas_cve_casa,
        gru_cve_usuario: data.usuario,
        gru_admin: false
      }, { transaction: transaction });  

      await transaction.commit();
    } catch(error) {
      
      await transaction.rollback();
      throw error;
    }

    return newGrupo;
  }

  async removeUsuario(data) {
    let usuario;

    try {
      usuario = await models.Grupo.destroy({
        where: data
      });
    } catch(error) {
      throw error;
    }

    if(usuario === 0) {
      throw boom.badData('El usuario no pertenece a la casa');
    } 

    return usuario;
  }

  async agregarUsuario(data) {
    let newGrupo;

    try {
      // Validar si el usuario es admin
      const isAdmin = await models.Grupo.findOne({
        where: {
          gru_cve_usuario: data.usu_cve_usuario,
          gru_admin: true
        }
      });

      if(!isAdmin) {
        throw boom.badData('No es admin para agregar usuarios');
      }

      // TODO refactor existsGrupo to one function
      // Validar el nuevo usuario no este en el grupo
      const existsGrupo = await models.Grupo.findOne({
        where: {
          gru_cve_casa: isAdmin.gru_cve_casa,
          gru_cve_usuario: data.gru_cve_usuario,
        }
      });

      if(existsGrupo) {
        throw boom.badData('El usuario ya pertenece a este grupo');
      }
      
      newGrupo = await models.Grupo.create({
        gru_cve_casa: isAdmin.gru_cve_casa,
        gru_cve_usuario: data.gru_cve_usuario,
        gru_admin: false
      });
    } catch(error) {
      throw error;
    }

    return newGrupo;
  }

  async eliminarUsuario(data) {
    let grupo;

    try {
      // Validar si el usuario es admin
      const isAdmin = await models.Grupo.findOne({
        where: {
          gru_cve_usuario: data.usu_cve_usuario,
          gru_admin: true
        }
      });

      if(!isAdmin) {
        throw boom.badData('No eres admin para eliminar usuarios');
      }

      // Validar que exista el registro grupo
      const existsGrupo = await models.Grupo.findOne({
        where: {
          gru_cve_usuario: data.gru_cve_usuario,
          gru_cve_casa: isAdmin.gru_cve_casa
        }
      });

      if(!existsGrupo) {
        throw boom.badData('No existe grupo (valida tus datos)');
      }

      // Elimina grupo
      grupo = await models.Grupo.destroy({
        where: {
          gru_cve_usuario: data.gru_cve_usuario,
          gru_cve_casa: isAdmin.gru_cve_casa
        }
      })
    } catch(error) {
      throw error;
    }

    return grupo;
  }
}

module.exports = GrupoService;