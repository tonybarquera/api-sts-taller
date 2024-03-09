const boom = require('boom');
const sequelize = require('./../libs/database.js');
const { models } = require('./../libs/database.js');

class GrupoService {
  constructor() {

  }

  async create(data) {
    const newGrupo = await models.Grupo.create(data);
    return newGrupo;
  }

  async entraUsuario(data) { // data = { gru_cve_usuario, gru_cve_casa }
    let newGrupo;

    try {
      // validar que no exista grupo
      await this.notExistsGrupoValidation({
        gru_cve_casa: data.gru_cve_casa,
        gru_cve_usuario: data.gru_cve_usuario
      });

      // Validar que usuario no tenga una casa
      const hasCasa = await models.Grupo.findOne({
        where: {
          gru_cve_usuario: data.gru_cve_usuario
        }
      });

      if(hasCasa) {
        throw boom.badData('Usuario ya tiene casa asignada');
      }

      // Crear el grupo
      newGrupo = await models.Grupo.create({
        gru_cve_casa: data.gru_cve_casa,
        gru_cve_usuario: data.gru_cve_usuario,
        gru_admin: false
      });  

      await transaction.commit();
    } catch(error) {
      
      await transaction.rollback();
      throw error;
    }

    return newGrupo;
  }

  async removeUsuario(data) {
    let usuario;
    // TODO Especificar campos del where
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
      const admin = await this.isAdminValidation(data.usu_cve_usuario);

      // Validar el nuevo usuario no este en el grupo
      await this.notExistsGrupoValidation({
        gru_cve_casa: admin.gru_cve_casa,
        gru_cve_usuario: data.gru_cve_usuario
      });
      
      newGrupo = await models.Grupo.create({
        gru_cve_casa: admin.gru_cve_casa,
        gru_cve_usuario: data.gru_cve_usuario,
        gru_admin: false
      });
    } catch(error) {
      throw error;
    }

    return newGrupo;
  }

  async agregarUsuarioCorreo(data) {
    let newGrupo;

    try {
      // Validar que el usuario sea admin
      const admin = await this.isAdminValidation(data.usu_cve_usuario);
      
      // TODO hacer validation
      // Validar si existe usuario correspondiente al correo
      const existsUsuarioCorreo = await models.Usuario.findOne({
        where: {
          usu_correo: data.usu_correo
        }
      });

      if(!existsUsuarioCorreo) {
        throw boom.badData('El correo no pertenece a un usuario');
      }

      // Validar que el grupo aun no exista
      await this.notExistsGrupoValidation({
        gru_cve_usuario: existsUsuarioCorreo.usu_cve_usuario,
        gru_cve_casa: admin.gru_cve_casa
      });

      // Agregar grupo nuevo
      newGrupo = await models.Grupo.create({
        gru_cve_casa: admin.gru_cve_casa,
        gru_cve_usuario: existsUsuarioCorreo.usu_cve_usuario,
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
      const admin = await this.isAdminValidation(data.usu_cve_usuario);

      // Validar que exista el registro grupo
      const existsGrupo = await models.Grupo.findOne({
        where: {
          gru_cve_usuario: data.gru_cve_usuario,
          gru_cve_casa: admin.gru_cve_casa
        }
      });

      if(!existsGrupo) {
        throw boom.badData('No existe grupo (valida tus datos)');
      }

      // Elimina grupo
      grupo = await models.Grupo.destroy({
        where: {
          gru_cve_usuario: data.gru_cve_usuario,
          gru_cve_casa: admin.gru_cve_casa
        }
      })
    } catch(error) {
      throw error;
    }

    return grupo;
  }

  // Validaciones
  async isAdminValidation(usu_cve_usuario) {
    const isAdmin = await models.Grupo.findOne({
      where: {
        gru_cve_usuario: usu_cve_usuario,
        gru_admin: true
      }
    });

    if(!isAdmin) {
      throw boom.badData('[VALIDATION ERROR] No eres Admin para eliminar usuario');
    }

    return isAdmin;
  }

  async notExistsGrupoValidation({ gru_cve_usuario, gru_cve_casa }) {
    const existsGrupo = await models.Grupo.findOne({
      where: {

        gru_cve_usuario: gru_cve_usuario,
        gru_cve_casa: gru_cve_casa
      }
    });

    if(existsGrupo) {
      throw boom.badData('[VALIDATION ERROR] El usuario ya pertenece al grupo');
    }
  }
}

module.exports = GrupoService;