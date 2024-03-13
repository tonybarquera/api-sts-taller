const express = require('express');
const passport = require('passport');
const validatorHandler = require('./../middlewares/validator.handler.js');
const { validCasaIDSchema } = require('./../schemas/casa.schema.js');
const { validUsuarioIDSchema, validCorreo } = require('./../schemas/usuario.schema.js');

const GrupoService = require('./../services/grupo.service.js');

const router = express.Router();
const service = new GrupoService();

// Entrar el usuario a un grupo
router.post('/entraUsuario/:cas_cve_casa', 
  passport.authenticate('jwt', { session: false }),
  validatorHandler(validCasaIDSchema, 'params'),
  async(req, res, next) => {
    try {
      const gru_cve_usuario = req.user.sub;
      const { cas_cve_casa } = req.params; 

      const newGrupo = await service.entraUsuario({ 
        gru_cve_usuario, 
        gru_cve_casa: cas_cve_casa 
      });

      res.status(201).json(newGrupo);
    } catch(error) {
      next(error);
    }
  }
);

// Usuario sale de grupo
router.delete('/saleUsuario/:cas_cve_casa',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(validCasaIDSchema, 'params'),
  async(req, res, next) => {
    try {
      const gru_cve_usuario = req.user.sub;
      const { cas_cve_casa } = req.params;

      const removeUsuario = await service.removeUsuario({
        gru_cve_usuario,
        gru_cve_casa: cas_cve_casa
      });
      res.status(200).json(removeUsuario);
    } catch(error) {
      next(error);
    }
  }
);

// Admin agrega usuario por correo
router.post('/agregarUsuario', 
  passport.authenticate('jwt', { session: false }),
  validatorHandler(validCorreo, 'body'),
  async (req, res, next) => {
    try {
      const usu_cve_usuario = req.user.sub;
      const { usu_correo } = req.body;

      const newGrupo = await service.agregarUsuarioCorreo({
        usu_correo: usu_correo,
        usu_cve_usuario: usu_cve_usuario
      });

      res.status(201).json(newGrupo);
    } catch(error) {
      next(error);
    }
  }
);

// Admin elimina usuario
router.delete('/eliminarUsuario/:usu_cve_usuario',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(validUsuarioIDSchema, 'params'),
  async (req, res, next) => {
    try {
      const usuario = req.user.sub;
      const { usu_cve_usuario } = req.params;

      const grupo = await service.eliminarUsuario({
        usu_cve_usuario: usuario,
        gru_cve_usuario: usu_cve_usuario
      });

      res.status(200).json(grupo);
    } catch(error) {
      next(error);
    }
  }
);

// Admin obtiene todos los usuarios de casa
router.get('/obtenerUsuariosCasa',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const gru_cve_usuario = req.user.sub;
      const usuarios = await service.obtenerUsuariosCasa(gru_cve_usuario);
      res.status(200).json(usuarios);
    } catch(error) {
      next(error);
    }
  }
);

module.exports = router;