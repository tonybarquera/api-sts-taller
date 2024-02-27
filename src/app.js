const express = require('express');
const { pool } = require('./db.js');
const { PORT } = require('./config.js');

const app = express();

app.get('/', (req, res) => {
  res.send("Welcome to server");
});

app.get('/ping', async (req, res) => {
  const [ result ] = await pool.query(`SELECT "Hello World" as RESULT`);
  res.send(result[0]);
});

app.listen(PORT, () => {
  console.log(`Listen on port ${PORT}`);
});