const { Casa, CasaSchema } = require('./casa.model.js')
const { Usuario, UsuarioSchema } = require('./usuario.model.js')
const { Grupo, GrupoSchema } = require('./grupo.model.js');

// dev
const { Categoria, CategoriaSchema } = require('./categoria.model.js');
const { Unidad, UnidadSchema } = require('./unidad.model.js');
const { Servicio, ServicioSchema } = require('./servicio.model.js');
const { Producto, ProductoSchema } = require('./producto.model.js');
const { Despensa, DespensaSchema } = require('./despensa.model.js');
const { Compra, CompraSchema } = require('./compra.model.js');
const { Ticket, TicketSchema } = require('./ticket.model.js');
const { Gasto, GastoSchema } = require('./gasto.model.js');

function setupModels (sequelize) {
  Casa.init(CasaSchema, Casa.config(sequelize));
  Usuario.init(UsuarioSchema, Usuario.config(sequelize));
  Grupo.init(GrupoSchema, Grupo.config(sequelize));
  Categoria.init(CategoriaSchema, Categoria.config(sequelize));
  Unidad.init(UnidadSchema, Unidad.config(sequelize));
  Servicio.init(ServicioSchema, Servicio.config(sequelize));
  Producto.init(ProductoSchema, Producto.config(sequelize));
  Despensa.init(DespensaSchema, Despensa.config(sequelize));
  Compra.init(CompraSchema, Compra.config(sequelize));
  Ticket.init(TicketSchema, Ticket.config(sequelize));
  Gasto.init(GastoSchema, Gasto.config(sequelize));
};

module.exports = setupModels
