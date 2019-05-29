// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const passport = require('passport');
require('./config/passport');

const server = express();
//---------------------------------------------------------

// Routes
const rUsers = require('./routes/api/users');

//---------------------------------------------------------

// Middleware
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(
  bodyParser.urlencoded({
    extended: true
  })
);
server.use(bodyParser.json());

server.use('/users', rUsers); // Using User Route

server.use(cors());

//  Passport
server.use(passport.initialize());
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

//---------------------------------------------------------

// DB Config
const db = require('./config/keys').MONGO_URI;

// Connecting to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log('CONNECTED TO DATABASE'))
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
