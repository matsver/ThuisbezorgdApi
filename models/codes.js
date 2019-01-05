const mongoose = require('mongoose');

var Code = mongoose.model('Code', {
  text: {
    type: String,
    required: true,
    trim: true
  },
  used: {
    type: Boolean,
    default: false
  },
  usedAt: {
    type: number,
    default: null
  }
});

module.exports = {Code};