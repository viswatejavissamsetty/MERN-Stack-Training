const mongoose = require("mongoose");
const productsSchema = require("../schemas/product.js");

const productModel = mongoose.model("products", productsSchema);

module.exports = productModel;