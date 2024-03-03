const { models } = require('./../libs/database.js');

class GrupoService {
  constructor() {

  }

  async create(data) {
    const newGrupo = await models.Grupo.create(data);
    return newGrupo;
  }
}

module.exports = GrupoService;