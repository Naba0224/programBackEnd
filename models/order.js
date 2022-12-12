const mongoose = require("mongoose");

const order = new mongoose.Schema({
  userId: {
    type: String,
  },
  items: {
    type: Array,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
  process: {
    type: Array,
    default: [
      { processName: "Хийгдэж байгаа", inProcess: false },
      { processName: "Хүргэлтэнд гарсан", inProcess: false },
      { processName: "Хүргэлт хийгдсэн", inProcess: false },
    ],
  },
});

module.exports = mongoose.model("order", order);
