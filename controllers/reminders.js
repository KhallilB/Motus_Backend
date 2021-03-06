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
    // Finds all reminders to be updated
    await Reminder.update(req.param.id, req.body, {
      // Return updated reminders in response
      new: true,
      // Update multiple documents
      multi: true

      // Take all the updated reminders
    }).then(reminders => {
      // Log all the updated reminder
      console.log(`All reminders that were updated: ${reminders}`);
      // Send a message with all of the updated reminders and a success status
      res.send(`SUCCESS! Reminders Updated: ${reminders.title}`).status(200);
    });

    // If we get an error
  } catch (err) {
    console.log(err);
    return res.send(err).status(500);
  }
};

//*** Updates a specific reminder
//---------------------------------------------------------
const updateReminder = async (req, res) => {
  try {
    // Search database by the id for the document to be updated
    await Reminder.findByIdAndUpdate(req.param.id, req.body, {
      // Return updated record in response
      new: true
      // Then we take the updated reminder
    }).then(reminder => {
      // Log the updated reminder to the console
      console.log(`Updated reminder: ${reminder}`);
      // Send a message with the updated reminder and a success status
      res.send(`SUCCESS! Reminder Updated: ${reminder.title}`).status(200);
    });

    // If we get an error
  } catch (err) {
    console.log(err);
    return res.send(err).status(500);
  }
};
//*** Deletes all reminders
//---------------------------------------------------------
const deleteCheckedReminders = async (req, res) => {
  try {
    // Delete any reminder documents in the database if checked becomes true
    await Reminder.deleteMany({ checked: true })
      // We take all of the deleted reminders
      .then(reminders => {
        // Log all of the deleted reminders
        console.log(`Deleted Reminders: ${reminders}`);
        // Send a message showing all of the deleted reminders with a success status
        res.send(`Success! Reminders Deleted: ${reminders.title}`);
      });

    // If we get an error
  } catch (err) {
    console.log(err);
    return res.send(err).status(500);
  }
};

//*** Delete a specific reminder
//---------------------------------------------------------
const deleteReminder = async (req, res) => {
  try {
    // Search database for the reminder that we are trying to remove by id
    await Reminder.findByIdAndRemove(req.param.id)
      // Then we take deleted reminder
      .then(reminder => {
        // Log the deleted reminder
        console.log(`Deleted ${reminder}`);
        // Send a message with the deleted reminder and a success status
        return res.send(`SUCCESS! Deleted: ${reminder.title}`).status(200);
      });

    // If we get an error
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
  deleteCheckedReminders,
  deleteReminder
};
