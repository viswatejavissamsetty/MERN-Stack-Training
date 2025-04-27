const mongoose = require("mongoose");
const productModel = require("../models/product.js");
const userModel = require("../models/user.js");

const orderSchema = new mongoose.Schema({
  productId: {
    required: true,
    type: mongoose.SchemaTypes.ObjectId,
    ref: productModel,
  },
  quantity: {
    required: true,
    type: Number,
  },
  address: {
    required: true,
    type: String,
  },
  userId: {
    required: true,
    type: mongoose.SchemaTypes.ObjectId,
    ref: userModel,
  },
});

module.exports = orderSchema;