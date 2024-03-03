const express = require('express');
const passport = require('passport');
const validatorHandler = require('./../middlewares/validator.handler.js');
const { createGrupo } = require('./../schemas/grupo.schema.js');

const GrupoService = require('./../services/grupo.service.js');

const router = express.Router();
const service = new GrupoService();

router.post('/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createGrupo, 'body'),
  // TODO validate gru_cve_casa
  // TODO validate gru_cve_usuario
  async (req, res, next) => {
    try {
      const body = req.body;
      const newGrupo = await service.create(body);
      res.status(201).json(newGrupo);
    } catch(error) {
      next(error);
    }
  }
)

module.exports = router;