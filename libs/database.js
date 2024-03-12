const { Sequelize } = require('sequelize');
const { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } = require('../config/config.js');
const setupModels = require('./../db/models/index.js');

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql',
  logging: false
});

setupModels(sequelize);

module.exports = sequelize;