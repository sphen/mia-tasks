const express = require('express');
const router = express.Router();
// const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
// const { User } = require('../controllers/usercontroller');
const jwt = require('jsonwebtoken');

// ^route  POST api/users
// ^desc   Register new user
// ^access Public
router.post('/', (req, res) => {
  const { name, email, password } = req.body;

  // basic validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Please complete all fields' });
  }

  // check for existing user
  User.findOne({ email }).then((user) => {
    if (user) return res.status(400).json({ msg: 'User already registered' });

    const newUser = new User({
      name,
      email,
      password,
    });

    // create salt & hash pw
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
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
  });
});

module.exports = router;
