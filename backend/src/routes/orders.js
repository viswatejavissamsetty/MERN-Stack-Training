const express = require("express");
const orderService = require("../services/orders.js");

const router = express.Router();

router.post("/", async (req, res) => {
  const body = req.body;
  const userId = req.headers["authorization"];

  try {
    const user = await orderService.createOrder(userId, body);
    res.json(user);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  const userId = req.headers["authorization"];

  try {
    const orders = await orderService.getOrders(userId);

    res.json(orders);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
});

router.patch("/:orderId", async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const updatedOrder = await orderService.updateOrder(orderId, req.body);

    res.json(updatedOrder);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
});

module.exports = router;
