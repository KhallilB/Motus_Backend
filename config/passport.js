// Passport Strategy for authenticatng JWT
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');

const User = require('../models/User');
const key = require('./keys');

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key.secretOrkey;

module.exports = passport => {
  // Tell passport to use a new strategy
  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      (username, password, done) => {
        // Try and find user email in database
        User.findOne({ email: username }, (err, user) => {
          if (err) return done(err);
          // unknown user
          else if (!user)
            return done(null, false, { message: 'Email is not registered' });
          // wrong password
          else if (!user.validPassword(password))
            return done(null, false, { message: 'Wrong password.' });
          // authentication succeeded
          else return done(null, user);
        });
      }
    )
  );
};
