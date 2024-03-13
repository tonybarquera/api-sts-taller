const { Model, DataTypes } = require('sequelize');

const DESPENSA_TABLE = 'despensa';

const DespensaSchema = {
  des_cve_despensa: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  des_cantidad: {
    allowNull: false,
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  des_vencimiento: {
    allowNull: false,
    type: DataTypes.DATE
  },
  des_contenido_neto: {
    allowNull: false,
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  des_cve_unidad: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  des_cve_casa: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  des_cve_producto: {
    allowNull: false,
    type: DataTypes.INTEGER
  }
};

class Despensa extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: DESPENSA_TABLE,
      modelName: 'Despensa',
      timestamps: false
    }
  }
}

module.exports = { Despensa, DespensaSchema, DESPENSA_TABLE };