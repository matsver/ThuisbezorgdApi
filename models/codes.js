const mongoose = require('mongoose');

var Code = mongoose.model('Code', {
  text: {
    type: String,
    required: true,
    minlength: 3,
    trim: true
  },
  used: {
    type: Boolean,
    default: false
  },
  usedAt: {
    type: Number,
    default: null
  },
   __v: {
     type: Number,
     select: false
   },
   
});

module.exports = {
  Code
};