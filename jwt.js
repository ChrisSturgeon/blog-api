const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'SECRET_KEY',
};

module.exports = new JwtStrategy(options, (jwt_payload, done) => {
  if (jwt_payload.email === 'sturgeon.chris@gmail.com') {
    return done(null, true);
  } else {
    return done(null, false);
  }
});
