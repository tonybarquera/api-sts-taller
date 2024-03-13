const { Strategy } = require( 'passport-google-oauth2' );
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = require('./../../../config/config.js');

const options = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/api/v1/auth/google",
  passReqToCallback   : true
}

const emails = ["barqueratony@gmail.com"];

const GoogleStrategy = new Strategy(options,
  function(request, accessToken, refreshToken, profile, done) {
    const response = emails.includes(profile.emails[0].value);

    if(response) {
      done(null, profile);
    } else {
      done(null, profile);
    }
  }
);

module.exports = GoogleStrategy;