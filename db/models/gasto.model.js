const { Model, DataTypes } = require('sequelize');

const GASTO_TABLE = 'gasto';

const GastoSchema = {
  gas_cve_casa: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  gas_cve_compra: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER
  }
};

class Gasto extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: GASTO_TABLE,
      modelName: 'Gasto',
      timestamps: false
    }
  }
}

module.exports = { Gasto, GastoSchema, GASTO_TABLE };