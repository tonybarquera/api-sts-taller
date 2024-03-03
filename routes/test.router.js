const express = require('express');
const { sequelize } = require('./../libs/database.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.send("Connected");
  } catch(error) {
    res.send("Error in connection")
  }
});

module.exports = router;