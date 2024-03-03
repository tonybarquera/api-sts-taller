const express = require('express');
const passport = require('passport');
const validatorHandler = require('./../middlewares/validator.handler.js');
const { createCasaSchema } = require('./../schemas/casa.schema.js');

const CasaService = require('./../services/casa.service.js');

const router = new express.Router();
const service = new CasaService();

// Create casa
router.post('/', 
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createCasaSchema, 'body'),
  async(req, res, next) => {
    try {
      const body = req.body;
      const newCasa = await service.create(body);
      res.status(201).json(newCasa);
    } catch(error) {
      next(error);
    }
  }
);

module.exports = router;