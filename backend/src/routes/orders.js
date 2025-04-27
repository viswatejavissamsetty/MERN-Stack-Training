const express = require("express");
const orderModel = require("../models/orders.js");

const router = express.Router();

router.post("/", async (req, res) => {
  const body = req.body;
  const userId = req.headers["authorization"];

  const createdOrder = await orderModel.create({
    productId: body.productId,
    quantity: body.quantity,
    address: body.address,
    userId: userId,
  });

  res.json({
    status: "SUCCESS",
    createdOrder: createdOrder,
  });
});

router.get("/", async (req, res) => {
  const userId = req.headers["authorization"];

  if (!userId) {
    res.status(401).json({ message: "Invalid user Id" });
  } else {
    const orders = await orderModel
      .find(
        {
          userId: userId,
        },
        { __v: 0 }
      )
      .populate("userId", "-password -_id -__v")
      .populate("productId", "-_id -quantity");
    res.json(orders);
  }
});

router.patch("/:orderId", async (req, res) => {
  const orderId = req.params.orderId;

  const updatedResult = await orderModel.updateOne(
    {
      _id: orderId,
    },
    {
      quantity: req.body.quantity,
      address: req.body.address,
    }
  );

  res.json({ status: "SUCCESS", updatedResult });
});

module.exports = router;
