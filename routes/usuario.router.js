const express = require('express');
const passport = require('passport');
const validatorHandler = require('./../middlewares/validator.handler.js');
const { createUsuarioSchema, findUsuarioById } = require('./../schemas/usuario.schema.js');

const UsuarioService = require('./../services/usuario.service.js');

const router = new express.Router();
const service = new UsuarioService();

// Obtener todos los usuarios
router.get('/', 
  passport.authenticate('jwt', { session: false }),
  async(req, res, next) => {
    try {
      const usuarios = await service.get();
      res.status(200).json(usuarios);
    } catch(error) {
      next(error);
    }
  }
);

// Obtener usuario por id
router.get('/:usu_cve_usuario',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(findUsuarioById, 'params'),
  async(req, res, next) => {
    try {
      const { usu_cve_usuario } = req.params;
      const usuario = await service.getById(usu_cve_usuario);
      res.status(200).json(usuario);
    } catch(error) {
      next(error);
    }
  }
);

// Crear un nuevo usuario
router.post('/', 
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createUsuarioSchema, 'body'),
  async (req, res, next) => {
    // TODO cifrar password
    try {
      const body = req.body;
      const data = { 
        ...body, 
        usu_admin: false
      }

      const newUsuario = await service.create(data);
      res.status(201).json(newUsuario);
    } catch(error) {
      next(error);
    }
  }
);

module.exports = router;