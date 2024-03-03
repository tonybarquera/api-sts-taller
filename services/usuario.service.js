const bcrypt = require('bcrypt');

const { models } = require('./../libs/database.js');

class UsuarioService {
  constructor() {

  }

  async get() {
    const usuarios = await models.Usuario.findAll({
      attributes: [
        'usu_cve_usuario',
        'usu_correo',
        'usu_username'
      ]
    });
    return usuarios;
  }

  async findById(data) {
    const usuario = await models.Usuario.findByPk(data);
    return usuario;
  }

  async getById(data) {
    const usuario = await models.Usuario.findOne({
      where: {
        usu_cve_usuario: data
      }
    });
    return usuario;
  }

  async getByEmail(data) {
    const usuario = await models.Usuario.findOne({
      attributes: [
        'usu_cve_usuario',
        'usu_correo',
        'usu_password'
      ],
      where: {
        usu_correo: data
      }
    });
    return usuario;
  }

  async create(data) {
    const hash = await bcrypt.hash(data.usu_password, 8);
    const newUsuario = await models.Usuario.create({
      ...data,
      usu_password: hash
    });

    delete newUsuario.dataValues.usu_password;
    delete newUsuario.dataValues.usu_telefono;

    return newUsuario;
  }
}

module.exports = UsuarioService;