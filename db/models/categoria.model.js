const { Model, DataTypes } = require('sequelize');

const CATEGORIA_TABLE = 'categoria';

const CategoriaSchema = {
  cat_cve_categoria: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  cat_nombre: {
    allowNull: false,
    type: DataTypes.STRING
  }
};

class Categoria extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORIA_TABLE,
      modelName: 'Categoria',
      timestamps: false
    }
  }
}

module.exports = { Categoria, CategoriaSchema, CATEGORIA_TABLE };