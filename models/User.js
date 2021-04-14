const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Please enter your name'],
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'Please neter your email'],
    unique: true,
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'Please enter a strong password'],
  },
  reg_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', UserSchema, 'user');
