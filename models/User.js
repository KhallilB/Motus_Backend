const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// Create User Schema
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'First Name Required']
  },
  lastName: {
    type: String,
    required: [true, 'Last Name Required']
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone Number Required']
  },
  email: {
    type: String,
    required: [true, 'Email Required'],
    unique: true,
    match: [
      /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      'Enter A Valid Email.'
    ]
  },
  password: {
    type: String,
    required: [true, 'Password Required'],
    minlength: [8, 'Password must be at 8 characters long'],
    match: [
      /^(?=.*\d).{8,24}$/,
      'Password must be between 8 and 24 characters long and include at least one numeric character'
    ]
  },
  date: {
    type: Date,
    default: Date.now
  },
  saltSecret: String
});

// Pre-save hook that hashes User passwords save salt secret string
UserSchema.pre('save', function(next, salt) {
  bcrypt.hash(this.password, salt, hash => {
    this.password = hash;
    this.saltSecret = salt;
    next();
  });
});

// So bcrypt doesnt compare hashed password
UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

// Export User Schema model
module.exports = User = mongoose.model('UserSchema', UserSchema);
