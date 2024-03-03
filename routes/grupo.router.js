const express = require('express');
const passport = require('passport');
const boom = require('boom');
const validatorHandler = require('./../middlewares/validator.handler.js');
const { createGrupo } = require('./../schemas/grupo.schema.js');

const GrupoService = require('./../services/grupo.service.js');
const CasaService = require('./../services/casa.service.js');
const UsuarioService = require('./../services/usuario.service.js');

const router = express.Router();
const service = new GrupoService();
const casaService = new CasaService();
const usuarioService = new UsuarioService();

// Crear registro de grupo (validar id's casa y usuario)
router.post('/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createGrupo, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;

      const isValidCasaId = await casaService.findById(body.gru_cve_casa);
      if(!isValidCasaId) {
        return next(boom.badRequest('gru_cve_casa invalido')); 
      }

      const idValidUsuarioId = await usuarioService.findById(body.gru_cve_usuario);
      if(!idValidUsuarioId) {
        return next(boom.badRequest('gru_cve_usuario invalida'));
      }

      const newGrupo = await service.create(body);
      res.status(201).json(newGrupo);
    } catch(error) {
      next(error);
    }
  }
)

module.exports = router;