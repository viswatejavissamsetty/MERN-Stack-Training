const express = require("express");
const productService = require("../services/products.js");

const router = express.Router();

router.post("/", async function (req, res) {
  console.log(req.body);
  const data = req.body;

  try {
    const product = await productService.createProduct(data);
    res.json(product);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
});

router.get("/", async function (req, res) {
  const products = await productService.getProducts();
  res.json(products);
});

router.patch("/:productId", async function (req, res) {
  const productId = req.params.productId;
  const data = req.body;

  try {
    const product = await productService.updateProduct(productId, data);
    res.json(product);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
});

router.delete("/:productId", async function (req, res) {
  const productId = req.params.productId;

  try {
    const product = await productService.deleteProduct(productId);
    res.json(product);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
});

module.exports = router;
