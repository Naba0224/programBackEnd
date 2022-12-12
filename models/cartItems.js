const mongoose = require("mongoose");

const cartItems = new mongoose.Schema({
  itemId: {
    type: String,
    trim: true,
    required: true,
  },
  size: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
  },
  type: {
    type: String,
    trim: true,
  },
  userId: {
    type: String,
    trim: true,
    required: true,
  },
});

module.exports = mongoose.model("cartItems", cartItems);
