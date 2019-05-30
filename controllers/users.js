const jwt = require('jsonwebtoken');
const passport = require('passport');
const keys = require('../config/keys');

// User Model
const User = require('../models/User');

// Input Validation
const validateSignUp = require('../validation/signup');
const validateLogIn = require('../validation/login');

//*** Function hadles user sign up; Saves user returns a token
const signUp = async (req, res) => {
  try {
    // Form Validation
    const { errors, isValid } = validateSignUp(req.body);

    // Check input validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Define new user object
    const user = await new User();

    // Set user object properties to the form values
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.phoneNumber = req.body.phoneNumber;
    user.email = req.body.email;
    user.password = req.body.password;
    // Check what user model looks like
    console.log(user);
    // Save user object to database
    await user.save((err, user) => {
      // If we get no errors
      if (!err) {
        // Set payload
        const payload = { subject: user._id };
        // Sign token with the secret key and payload
        const token = jwt.sign(payload, keys.jwtSecret);
        // Send token
        res.status(200).send({ token });
      }
    });
    // If we do get an error
  } catch (err) {
    console.log(err);
    return res.send(err).status(500);
  }
};

//*** Authenticates a registered user using passport and returns a token
const logIn = async (req, res) => {
  try {
    // Form Validation
    const { errors, isValid } = validateLogIn(req.body);

    // Check input validations
    if (!isValid) {
      return res.status(400).json(errors);
    }

    await passport.authenticate('local', (err, user, data) => {
      // If we get an error
      if (err) {
        console.log(err);
        return res.status(404).json(err);
      }

      // If we dont get user object
      if (!user) {
        console.log('Error: USER NOT FOUND');
      }

      // If no errors
      if (user) {
        // Log the user
        console.log('USER: ', user);
        // Set payload
        const payload = { subject: user._id };
        // Sign token with the secret key and payload
        const token = jwt.sign(payload, keys.jwtSecret);
        // Send token
        res.status(200).send({ token });
        // Throw error
      } else return res.status(401).json(data);
    })(req, res);
  } catch (err) {
    console.log(err);
    return res.send(err).status(500);
  }
};

module.exports = {
  signUp,
  logIn
};
