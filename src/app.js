const express = require('express');
const { pool } = require('./db.js');
const { PORT } = require('./config.js');
const { sequelize } = require('./../database/database.js');

const app = express();

app.get('/', (req, res) => {
  res.send("Welcome to server");
});

app.get('/test-connection', async (req, res) => {
  try {
    await sequelize.authenticate();
    console.log('Connected');
  } catch(error) {
    console.log('Error: ', error);
  }

  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Listen on port ${PORT}`);
});