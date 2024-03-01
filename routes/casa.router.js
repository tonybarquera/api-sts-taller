const express = require('express');

const CasaService = require('./../services/casa.service.js');

const router = new express.Router();
const service = new CasaService();

router.post('/', async(req, res) => {
  try {
    const body = req.body;
    const newCasa = await service.create(body);
    res.status(201).json(newCasa);
  } catch(error) {
    console.log(error);
  }
});

module.exports = router;