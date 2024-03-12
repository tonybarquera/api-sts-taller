const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./../config/config.js');

const router = express.Router();

router.post('/login', 
  passport.authenticate('local', { session: false }),
  async(req, res, next) => {
    try {
      const usuario = req.user;

      // TODO agregar nombre de usuario al payload
      const payload = {
        sub: usuario.usu_cve_usuario,
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

module.exports = router;