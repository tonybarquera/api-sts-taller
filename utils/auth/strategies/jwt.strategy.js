const { Strategy, ExtractJwt } = require('passport-jwt');
const { JWT_SECRET } = require('./../../../config/config.js');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET
};

const JwtStrategy = new Strategy(options, (payload, done) => {
  return done(null, payload);
});

module.exports = JwtStrategy;