const express = require("express");
const productModel = require("../models/product.js");

const router = express.Router();

router.post("/", async function (req, res) {
  console.log(req.body);
  const data = req.body;
  const productSaved = await productModel.insertOne(data);
  res.json({
    message: "Data saved succesfully!",
    createdProduct: productSaved,
  });
});

router.get("/", async function (req, res) {
  const products = await productModel.find();
  res.json(products);
});

router.patch("/:productId", async function (req, res) {
  const productId = req.params.productId;
  const data = req.body;

  const updateResult = await productModel.updateOne({ _id: productId }, data);

  res.json({
    status: "SUCCESS",
    updateResult: updateResult,
  });
});

router.delete("/:productId", async function (req, res) {
  const productId = req.params.productId;

  const deletedResult = await productModel.deleteOne({ _id: productId });

  res.json({
    status: "SUCCESS",
    deletedResult: deletedResult,
  });
});

module.exports = router;
