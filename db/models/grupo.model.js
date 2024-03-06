const { Model, DataTypes } = require('sequelize');

const GRUPO_TABLE = 'grupo';

const GrupoSchema = {
  gru_cve_usuario: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  gru_cve_casa: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  gru_admin: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
};

class Grupo extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: GRUPO_TABLE,
      modelName: 'Grupo',
      timestamps: false
    }
  }
};

module.exports = { Grupo , GrupoSchema , GRUPO_TABLE };