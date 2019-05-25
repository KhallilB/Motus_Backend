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
};
