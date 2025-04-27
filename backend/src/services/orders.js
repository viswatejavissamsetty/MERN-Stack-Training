const orderModel = require("../models/orders.js");

async function createOrder(userId, orderDetails) {
  const createdOrder = await orderModel.create({
    userId: userId,
    productId: orderDetails.productId,
    quantity: orderDetails.quantity,
    address: orderDetails.address,
  });

  return createdOrder;
}

async function getOrders(userId) {
  if (!userId) {
    throw new Error({
      statusCode: 400,
      message: "Invalid user Id",
    });
  }

  const orders = await orderModel
    .find({ userId: userId })
    .populate("userId", "-password -_id -__v")
    .populate("productId", "-_id -quantity");
  return orders;
}

async function updateOrder(orderId, orderDetails) {
  const updatedOrder = await orderModel.updateOne(
    { _id: orderId },
    {
      quantity: orderDetails.quantity,
      address: orderDetails.address,
    }
  );

  return updatedOrder;
}

module.exports = {
  createOrder,
  getOrders,
  updateOrder,
};
