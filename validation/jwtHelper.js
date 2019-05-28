const jwt = require('jsonwebtoken');
const key = require('../config/keys');

// Verify JWT
module.exports.verifyJwtToken = (req, res, next) => {
  // Check token authorization
  if ('authorization' in req.headers) {
    token = req.headers['authorization'].split(' ')[1];
  }

  // If the token is not present
  if (!token) {
    // Disallow authorization and send helper message
    return res.status(403).send({ auth: false, message: 'No token provided.' });

    // If we got the token we're looking for
  } else {
    // Verify given token
    jwt.verify(token, key.jwtSecret, (err, decoded) => {
      // Error handling
      if (err) {
        return res.status(500).send({
          auth: false,
          message: 'Failed to verify token authenticity'
        });
        // If no error
      } else {
        // Decoded token becomes the request
        req.id = decoded.id;
        next();
      }
    });
  }
};
