const mongoose = require('mongoose');
const { Schema } = mongoose;

const letterSchema = new Schema({
  letter: {
    type: String,
    required: true
  },
  timeStamp: {
    type: Date,
    required: true
  },
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  secret: {
    type: String,
    required: true
  }
});

const Letter = mongoose.model('Letter', letterSchema);

module.exports = Letter;
