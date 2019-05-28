// Passport Strategy for authenticatng JWT
const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = require('../models/User');

// Tell passport to use a new strategy
passport.use(
  new LocalStrategy({ usernameField: 'email' }, (username, password, done) => {
    // Try and find user by the email
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
  })
);
