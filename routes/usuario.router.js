const express = require('express');
const passport = require('passport');
const validatorHandler = require('./../middlewares/validator.handler.js');
const { createUsuarioSchema, validUsuarioIDSchema, updateUsuarioSchema } = require('./../schemas/usuario.schema.js');

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
  validatorHandler(validUsuarioIDSchema, 'params'),
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
  validatorHandler(createUsuarioSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUsuario = await service.create(body);
      
      res.status(201).json(newUsuario);
    } catch(error) {
      next(error);
    }
  }
);

// Actualizar datos de usuario
router.put('/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(updateUsuarioSchema, 'body'), 
  async(req, res, next) => {
    try {
      const body = req.body;
      const usu_cve_usuario = req.user.sub;

      const updatedUsuario = await service.update(usu_cve_usuario, body);
      res.status(200).json(updatedUsuario);
    } catch(error) {
      next(error);
    }
  }
);

// Eliminar cuenta de usuario
router.delete('/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const usu_cve_usuario = req.user.sub;
      const usuario = await service.delete(usu_cve_usuario);
      res.status(200).json(usuario);
    } catch(error) {
      next(error);
    }
  }
);

module.exports = router;