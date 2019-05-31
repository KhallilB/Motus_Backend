// Library of string validators and sanatizers
const Validator = require('validator');
// Check if a value is empty
const isEmpty = require('is-empty');

module.exports = function validateLogin(user) {
  // Store error array to return later
  let errors = {};

  // Convert fields to an empty string to use validator functions
  user.email = !isEmpty(user.email) ? user.email : '';
  user.password = !isEmpty(user.password) ? user.password : '';

  // Validate Email
  //--------------------------------------
  // If empty
  if (Validator.isEmpty(user.email)) {
    // Input Required
    errors.email = 'Email Is Required';
    // If not a valid email
  } else if (!Validator.isEmail(user.email)) {
    // Throw Error
    errors.email = 'Email Is Not Valid';
  }

  // Validate Password
  //--------------------------------------
  // If empty
  if (Validator.isEmpty(user.password)) {
    // Input Required
    errors.email = 'Password Is Required';
  }

  // Return any errors
  return {
    errors,
    // If no errors return is valid
    isValid: isEmpty(errors)
  };
};
