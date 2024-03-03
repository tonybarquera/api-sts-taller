const { Casa, CasaSchema } = require('./casa.model.js')
const { Usuario, UsuarioSchema } = require('./usuario.model.js')
const { Grupo, GrupoSchema } = require('./grupo.model.js');

function setupModels (sequelize) {
  Casa.init(CasaSchema, Casa.config(sequelize));
  Usuario.init(UsuarioSchema, Usuario.config(sequelize));
  Grupo.init(GrupoSchema, Grupo.config(sequelize));

  Casa.associate(sequelize.models);
  Usuario.associate(sequelize.models);
};

module.exports = setupModels
