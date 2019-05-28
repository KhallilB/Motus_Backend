const jwt = require('jsonwebtoken');
const _ = require('lodash');
const passport = require('passport');
const keys = require('../config/keys');

// User Model
const User = require('../models/User');

// Input Validation
const validateSignUp = require('../validation/signup');
const validateLogIn = require('../validation/login');

// Function hadles user sign up; Saves user returns a token
module.exports.signUp = (req, res) => {
  // Form Validation
  const { errors, isValid } = validateSignUp(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Define new user object
  const user = new User();

  // Set user object properties to the form values
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.phoneNubmer = req.body.phoneNubmer;
  user.email = req.body.email;
  user.password = req.body.password;
  // Check what user model looks like
  console.log(user);
  // Save user object to database
  user.save((err, user) => {
    // If we get no errors
    if (!err) {
      // Set payload
      const payload = { subject: user._id };
      // Sign token with the secret key and payload
      const token = jwt.sign(payload, keys.jwtSecret);
      // Send token
      res.status(200).send({ token });
      // If we do get an error
    } else {
      // Error Handling
      if (err) {
        res.status(422).send(['Duplicate Email found']);
        console.log(err);
      } else {
        return err;
      }
    }
  });
};
