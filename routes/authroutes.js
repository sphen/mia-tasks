const express = require('express');
const router = express.Router();
// const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
// const { User } = require('../controllers/usercontroller');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const { findById } = require('../models/User');

// ^route  POST api/auth
// ^desc   Auth user
// ^access Public
router.post('/', (req, res) => {
  const { email, password } = req.body;

  // basic validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // check for existing user
  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ msg: 'User not found' });

    // validate pw
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch)
        return res.status(400).json({
          msg:
            'Invalid login credentials. Please check your email and password and try again.',
        });

      jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;

          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
          });
        }
      );
    });
  });
});

// ^route  GET api/auth/user
// ^desc   Get user data
// ^access Private
router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then((user) => res.json(user));
});

module.exports = router;
