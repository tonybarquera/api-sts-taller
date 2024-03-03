const Strategy = require('passport-local');
const boom = require('boom');
const bcrypt = require('bcrypt');
const UsuarioService = require('./../../../services/usuario.service');

const service = new UsuarioService();

const LocalStrategy = new Strategy({
    usernameField: 'usu_correo',
    passwordField: 'usu_password'
  },
  async(usu_correo, usu_password, done) => {
    try {
      // Check if the email is in db
      const usuario = await service.getByEmail(usu_correo);
      if(!usuario) {
        return done(boom.unauthorized(), false);
      }

      // Check if is the correct password
      const isMatch = await bcrypt.compare(usu_password, usuario.usu_password);
      if(!isMatch) {
        return done(boom.unauthorized(), false);
      }

      delete usuario.dataValues.usu_password;
      return done(null, usuario); 
    } catch(error) {
      return done(error, false);
    } 
  }
)

module.exports = LocalStrategy;