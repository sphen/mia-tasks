const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  text: {
    type: String,
    trim: true,
    required: [true, 'Please add a to do'],
  },
  complete: {
    type: Boolean,
    default: false,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const ListSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a list title'],
  },
  items: [ItemSchema],
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('List', ListSchema, 'lists');
