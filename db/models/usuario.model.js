const { Model, DataTypes } = require('sequelize');

const USUARIO_TABLE = 'usuario';

const UsuarioSchema = {
  usu_cve_usuario: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  usu_correo: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING
  },
  usu_password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  usu_username: {
    allowNull: false,
    type: DataTypes.STRING
  },
  usu_telefono: {
    allowNull: false,
    type: DataTypes.STRING
  }
}

class Usuario extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: USUARIO_TABLE,
      modelName: 'Usuario',
      timestamps: false
    }
  }
}

module.exports = { Usuario , UsuarioSchema , USUARIO_TABLE };