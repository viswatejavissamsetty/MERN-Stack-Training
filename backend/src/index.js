const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const usersRouter = require("./routes/users.js");
const ordersRouter = require("./routes/orders.js");
const productRouter = require("./routes/products.js");

mongoose.connect("mongodb://localhost:27017/big-basket").then(() => {
  console.log("Connected to mongodb");
});

const app = express();

app.use(cors());

// Code to make all the data is in json format
app.use(express.json());

app.get("/", function (req, res) {
  res.send({
    message: "Hello World",
  });
});

// Products section
app.use("/products", productRouter);

// Users Section
app.use("/user", usersRouter);

// Orders Section
app.use("/orders", ordersRouter);

app.listen(3000, function () {
  // http://localhost:3000/
  console.log("Server is running");
});
