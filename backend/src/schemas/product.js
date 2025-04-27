const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    description: String,
    price: {
      type: Number,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false }
);

module.exports = productSchema;
