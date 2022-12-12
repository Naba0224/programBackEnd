const mongoose = require("mongoose");

const pizza = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    trim: true,
  },
  type: {
    type: Array,
  },
  price: {
    type: Number,
    requireD: true,
  },
  size: {
    type: Array,
  },
  img: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("pizza", pizza);
