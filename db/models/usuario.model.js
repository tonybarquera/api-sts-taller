const { Model, DataTypes } = require('sequelize');
const { CASA_TABLE } = require('./casa.model.js');

const USUARIO_TABLE = 'usuario';

const UsuarioSchema = {
  usu_cve_usuario: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  use_correo: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING
  },
  use_password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  use_username: {
    allowNull: false,
    type: DataTypes.STRING
  },
  use_telefono: {
    allowNull: false,
    type: DataTypes.STRING
  },
  use_admin: {
    allowNull: false,
    defaultValue: 0,
    type: DataTypes.BOOLEAN
  },
  use_cve_casa: {
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: CASA_TABLE,
      key: 'cas_cve_casa'
    }
  }
}

class Usuario extends Model {
  static associate(models) {
    this.belongsTo(models.Casa, { foreignKey: 'usu_cve_casa' });
  }

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