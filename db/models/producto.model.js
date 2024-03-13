const { Model, DataTypes } = require('sequelize');

const PRODUCTO_TABLE = 'producto';

const ProductoSchema = {
  pro_cve_producto: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  pro_nombre: {
    allowNull: false,
    type: DataTypes.STRING
  },
  pro_descripcion: {
    allowNull: false,
    type: DataTypes.STRING
  },
  pro_cve_categoria: {
    allowNull: false,
    type: DataTypes.INTEGER
  }
};

class Producto extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCTO_TABLE,
      modelName: 'Producto',
      timestamps: false
    }
  }
}

module.exports = { Producto, ProductoSchema, PRODUCTO_TABLE };