const Reminder = require('../models/Reminder');

const newReminder = async (req, res) => {
  try {
    const Reminder = await new Reminder();
  } catch (err) {
    console.log(err);
    return res.send(err).status(500);
  }
};

module.exports = {
  newReminder
};
