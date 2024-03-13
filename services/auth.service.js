const boom = require('boom');
const { models } = require('./../libs/database.js');

class AuthService {
  constructor() {

  }

  async authGoogle(data) {
    const usuario = await models.Usuario.findOne({
      where: data,
      attributes: ['usu_cve_usuario', 'usu_username']
    });

    return usuario;
  }
}

module.exports = AuthService;