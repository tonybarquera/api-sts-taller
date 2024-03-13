const { Model, DataTypes } = require('sequelize');

const TICKET_TABLE = 'ticket';

const TicketSchema = {
  tic_cve_compra: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER 
  },
  tic_cve_producto: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  tic_cantidad: {
    allowNull: false,
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  tic_precio_unitario: {
    allowNull: false,
    type: DataTypes.DECIMAL,
    defaultValue: 0.0
  },
  tic_contenido_neto: {
    allowNull: false,
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  tic_cve_unidad: {
    allowNull: false,
    type: DataTypes.INTEGER
  }
};

class Ticket extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: TICKET_TABLE,
      modelName: 'Ticket',
      timestamps: false
    }
  }
}

module.exports = { Ticket, TicketSchema, TICKET_TABLE };