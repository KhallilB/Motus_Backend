const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReminderSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Reminder Title is required']
  },
  location: {
    type: String
  },
  completed: {
    type: Boolean
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Reminder = mongoose.model('Reminder', ReminderSchema);
