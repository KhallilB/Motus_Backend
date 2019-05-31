// Library of string validators and sanatizers
const Validator = require('validator');
// Check if a value is empty
const isEmpty = require('is-empty');

module.exports = function validateReminder(reminder) {
  // Store error array to return later
  let errors = {};

  // Convert fields to an empty string to use validator functions
  reminder.title = !isEmpty(reminder.title) ? reminder.title : '';

  // Validate Title
  //--------------------------------------
  // If empty
  if (Validator.isEmpty(reminder.title)) {
    // Input Required
    errors.title = 'Title is Required';
  }

  // Check length of title
  //--------------------------------------
  if (!Validator.isLength(reminder.title, { max: 50 })) {
    // Throw error
    errors.title = 'Title length cannot be more than 50 characters long';
  }
};
