// models/swatches.js
const mongoose = require('mongoose');

const swatchSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  shade: {
    type: String,
    required: true,
  },
  pic: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Swatches', swatchSchema);
