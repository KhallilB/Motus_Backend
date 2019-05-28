// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const server = express();

// Routes
const rUsers = require('./routes/api/users');

// Middleware
server.use(
  bodyParser.urlencoded({
    extended: true
  })
);

server.use(bodyParser.json());

server.use('/users', rUsers); // Using User Route

// DB Config
const db = require('./config/keys').MONGO_URI;

// Connecting to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('CONNECTED TO userBASE'))
  .catch(err => {
    console.log(`Caught Error: ${err}`);
    console.log(db);
  });

// Setting Port
const port = process.env.PORT || 5000;

// Listening
server.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
