const Reminder = require('../models/Reminder');

//*** Creates a new reminder and saves it to database
//---------------------------------------------------------
const newReminder = async (req, res) => {
  try {
    // Define new Reminder object
    const reminder = await new Reminder();

    // Set user object properties to form values
    reminder.title = req.body.title;
    reminder.description = req.body.description;
    reminder.location = req.body.location;
    reminder.completed = req.body.completed;

    // Log awaiting Reminder
    console.log(`Reminder waiting to be saved: ${reminder}`);

    // Save Reminder
    await reminder.save();

    // Check saved reminder
    console.log(`Saved Reminder: ${reminder}`);

    // Return reminder with success status
    return res.json({ reminder }).status(200);

    // If we get an error
  } catch (err) {
    console.log(err);
    return res.send(err).status(500);
  }
};

//*** Returns all the reminders
//---------------------------------------------------------
const allReminders = async (req, res) => {
  try {
    // Try and find all reminders
    await Reminder.find({}).then(reminders => {
      // Return all reminders with success status
      res.json({ reminders }).status(200);
    });

    // If we get an error
  } catch (err) {
    console.log(err);
    return res.send(err).status(500);
  }
};

//***  Returns a specific reminder
//---------------------------------------------------------
const getReminder = async (req, res) => {
  try {
    // Finds a reminder by its specific id
    await Reminder.findById(req.param.id).then(reminder => {
      // Check the item that was found
      console.log(`Found Item: ${reminder}`);
      // Return the reminder
      res.json({ reminder }).status(200);
    });

    // If we get an error
  } catch (err) {
    console.log(err);
    return res.send(err).status(500);
  }
};

//*** Updates all reminders
//---------------------------------------------------------
const updateAllReminders = async (req, res) => {
  try {
    // Code here
  } catch (err) {
    console.log(err);
    return res.send(err).status(500);
  }
};

//*** Updates a specific reminder
//---------------------------------------------------------
const updateReminder = async (req, res) => {
  try {
    // Code here
  } catch (err) {
    console.log(err);
    return res.send(err).status(500);
  }
};
//*** Deletes all reminders
//---------------------------------------------------------
const deleteAllReminders = async (req, res) => {
  try {
    // Code here
  } catch (err) {
    console.log(err);
    return res.send(err).status(500);
  }
};

//*** Delete a specific reminder
//---------------------------------------------------------
const deleteReminder = async (req, res) => {
  try {
    // Code here
  } catch (err) {
    console.log(err);
    return res.send(err).status(500);
  }
};

module.exports = {
  newReminder,
  allReminders,
  getReminder,
  updateAllReminders,
  updateReminder,
  deleteAllReminders,
  deleteReminder
};
