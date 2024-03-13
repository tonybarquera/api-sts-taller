const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./../config/config.js');
const AuthService = require('./../services/auth.service.js');

const router = express.Router();
const service = new AuthService();

router.post('/login', 
  passport.authenticate('local', { session: false }),
  async(req, res, next) => {
    try {
      const usuario = req.user;

      const payload = {
        sub: usuario.usu_cve_usuario,
        username: usuario.usu_username
      };

      const token = jwt.sign(payload, JWT_SECRET);
      res.json({
        usuario,
        token
      });
    } catch(error) {
      next(error);
    }
  }
);

router.get('/google', passport.authenticate('google', { 
  scope: [ 'email', 'profile' ],
  session: false
 }),
  async (req, res, next) => {
    try {
      // Validar que esta cuenta exista en bd
      const usuario = await service.authGoogle({ usu_correo: req.user.email });

      if(!usuario) {
        res.status(401).json({ message: "Cuenta incorrecta" });
      }

      // Devolver jwt
      const payload = {
        sub: usuario.usu_cve_usuario,
        username: usuario.usu_username
      }

      const token = jwt.sign(payload, JWT_SECRET);
      res.json({
        usuario,
        token
      });

      // const usuario = {
      //   usu_cve_usuario: 10,
      //   usu_username: req.user.email,
      //   usu_correo: req.user.email,
      //   usu_password: req.user.id,
      //   usu_telefono: ""
      // };
    } catch(error) {
      next(error);
    }
  }
);

module.exports = router;