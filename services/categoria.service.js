const { models } = require('./../libs/database');

class CategoriaService {
  constructor() {

  }

  async obtenerCategorias() {
    const categorias = await models.Categoria.findAll();
    return categorias;
  }
}

module.exports = CategoriaService;