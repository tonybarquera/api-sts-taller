const { Model, DataTypes } = require('sequelize');

const COMPRA_TABLE = 'compra';

const CompraSchema = {
  com_cve_compra: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  com_nombre: {
    allowNull: false,
    type: DataTypes.STRING
  },
  com_monto_total: {
    allowNull: false,
    type: DataTypes.DECIMAL,
    defaultValue: 0.0
    // TODO revisar doc sequelize -> decimal
  },
  com_fecha: {
    allowNull: false,
    type: DataTypes.DATE
  },
  com_estado: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  com_cve_servicio: {
    allowNull: false,
    type: DataTypes.INTEGER
  }
};

class Compra extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: COMPRA_TABLE,
      modelName: 'Compra',
      timestamps: false
    }
  }
}

module.exports = { Compra, CompraSchema, COMPRA_TABLE };