// Library of string validators and sanatizers
const Validator = require('validator');
// Check if a value is empty
const isEmpty = require('is-empty');

module.exports = function validateSignup(user) {
  let errors = {};

  // Convert feilds to an empty string to use validator functions
  user.firstName = !isEmpty(user.firstName) ? user.firstName : '';
  user.lastName = !isEmpty(user.lastName) ? user.lastName : '';
  user.phoneNumber = !isEmpty(user.phoneNumber) ? user.phoneNumber : '';
  user.email = !isEmpty(user.email) ? user.email : '';
  user.password = !isEmpty(user.password) ? user.password : '';

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
};
