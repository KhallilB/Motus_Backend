const express = require('express');
const router = express.Router();

// Pulling fuctions from user controller
const { signUp, logIn } = require('../../controllers/users');

// Signup Route
router.post('/signup', signUp);
// Login Route
router.post('/login', logIn);

// Export router
module.exports = router;
