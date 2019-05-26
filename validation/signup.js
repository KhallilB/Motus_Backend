// Library of string validators and sanatizers
const Validator = require('validator');
// Check if a value is empty
const isEmpty = require('is-empty');

module.exports = function validateSignup(user) {
  // Store Arrays to return later
  let errors = {};

  // Convert feilds to an empty string to use validator functions
  user.firstName = !isEmpty(user.firstName) ? user.firstName : '';
  user.lastName = !isEmpty(user.lastName) ? user.lastName : '';
  user.phoneNumber = !isEmpty(user.phoneNumber) ? user.phoneNumber : '';
  user.email = !isEmpty(user.email) ? user.email : '';
  user.password = !isEmpty(user.password) ? user.password : '';
  user.passwordConfirm = !isEmpty(user.passwordConfirm)
    ? user.passwordConfirm
    : '';

  // Validate Names
  //--------------------------------------

  // -First Name-

  // If Empty
  if (Validator.isEmpty(user.firstName)) {
    // Input Required
    errors.firstName = 'First Name Is Required';
  }

  // -Last Name-

  if (Validator.isEmpty(user.lastName)) {
    errors.lastName = 'Last Name Is Required';
  }

  // Validate Phone Number
  //--------------------------------------
  // If empty
  if (Validator.isEmpty(user.phoneNumber)) {
    // Input Required
    errors.phoneNumber = 'Phone Number Is Required';
    // If not valid mobile phone
  } else if (!Validator.isMobilePhone(user.phoneNumber)) {
    // Throw error
    errors.phoneNumber = 'Phone Number is Not Valid';
  }

  // Validate Email
  //--------------------------------------
  // If empty
  if (Validator.isEmpty(user.email)) {
    // Input Required
    errors.phoneNumber = 'Email Is Required';
    // If not valid email
  } else if (!Validator.isEmail(user.email)) {
    // Throw error
    errors.email = 'Email Is Not Valid';
  }

  // Validate Password
  //--------------------------------------
  // If empty
  if (Validator.isEmpty(user.password)) {
    // Input Required
    errors.password = 'Password Is Required';
  }

  if (Validator.isEmpty(user.passwordConfirm)) {
    errors.password = 'Password Confirm Is Required';
  }

  // Check length of password
  //--------------------------------------
  // If the length is not bewtween of 8 and 24 characters
  if (!Validator.isLength(user.password, { min: 8, max: 24 })) {
    // Throw error
    errors.password = 'Password must be at least 8 characters long';
  }

  // Match Password and Password Confirm
  if (!Validator.equals(user.password, user.passwordConfirm)) {
    errors.passwordConfirm = 'Passwords must match';
  }

  // Return any errors
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
