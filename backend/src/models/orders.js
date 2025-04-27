const mongoose = require("mongoose");

const orderSchema = require("../schemas/orders.js");

const orderModel = mongoose.model("orders", orderSchema);

module.exports = orderModel;