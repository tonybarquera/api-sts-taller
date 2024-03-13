const { Model, DataTypes } = require('sequelize');

const SERVICIO_TABLE = 'servicio';

const ServicioSchema = {
  ser_cve_servicio: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  ser_nombre: {
    allowNull: false,
    type: DataTypes.STRING
  },
  ser_descripcion: {
    allowNull: false,
    type: DataTypes.STRING
  }
};

class Servicio extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: SERVICIO_TABLE,
      modelName: 'Servicio',
      timestamps: false
    }
  }
}

module.exports = { Servicio, ServicioSchema, SERVICIO_TABLE };