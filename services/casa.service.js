const { models } = require('./../libs/database.js');

class CasaService {
  constructor() {

  }

  async findById(data) {
    const casa = await models.Casa.findByPk(data);
    return casa;
  }

  async create(data) {
    const newCasa = await models.Casa.create(data);
    return newCasa;
  }
}

module.exports = CasaService;