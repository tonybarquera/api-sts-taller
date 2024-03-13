const { Model, DataTypes } = require('sequelize');

const UNIDAD_TABLE = 'unidad';

const UnidadSchema = {
  uni_cve_unidad: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  uni_nombre: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING
  },
  uni_descripcion: {
    allowNull: false,
    type: DataTypes.STRING
  }
};

class Unidad extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: UNIDAD_TABLE,
      modelName: 'Unidad',
      timestamps: false
    }
  }
}

module.exports = { Unidad, UnidadSchema, UNIDAD_TABLE };