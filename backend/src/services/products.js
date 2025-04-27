const productModel = require("../models/product.js");

async function createProduct(productDetails) {
  const createdProduct = await productModel.insertOne(productDetails);
  return createdProduct;
}

async function getProducts() {
  const products = await productModel.find();
  return products;
}

async function updateProduct(productId, productDetails) {
  const updatedProduct = await productModel.updateOne(
    { _id: productId },
    productDetails
  );
  return updatedProduct;
}

async function deleteProduct(productId) {
  const deletedProduct = await productModel.deleteOne({ _id: productId });
  return deletedProduct;
}

module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
