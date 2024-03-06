const { Model, DataTypes } = require('sequelize');

const CASA_TABLE = 'casa';

const CasaSchema = {
  cas_cve_casa: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  cas_nombre: {
    allowNull: false,
    type: DataTypes.STRING
  }
};

class Casa extends Model {
  static associate(models) {
    // this.belongsToMany(models.Usuario, { through: models.Grupo });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CASA_TABLE,
      modelName: 'Casa',
      timestamps: false
    }
  }
}

module.exports = { Casa, CasaSchema, CASA_TABLE };