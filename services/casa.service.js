const { models } = require('./../libs/database.js');

class CasaService {
  constructor() {

  }

  async create(data) {
    const newCasa = await models.Casa.create(data);
    console.log(newCasa);
    return data;
    // return newCasa;
  }
}

module.exports = CasaService;