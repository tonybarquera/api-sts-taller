const { Casa, CasaSchema } = require('./casa.model.js')
const { Usuario, UsuarioSchema } = require('./usuario.model.js')
const { Grupo, GrupoSchema } = require('./grupo.model.js');

// dev
const { Categoria, CategoriaSchema } = require('./categoria.model.js');
const { Unidad, UnidadSchema } = require('./unidad.model.js');
const { Servicio, ServicioSchema } = require('./servicio.model.js');

function setupModels (sequelize) {
  Casa.init(CasaSchema, Casa.config(sequelize));
  Usuario.init(UsuarioSchema, Usuario.config(sequelize));
  Grupo.init(GrupoSchema, Grupo.config(sequelize));
  Categoria.init(CategoriaSchema, Categoria.config(sequelize));
  Unidad.init(UnidadSchema, Unidad.config(sequelize));
  Servicio.init(ServicioSchema, Servicio.config(sequelize));
};

module.exports = setupModels
