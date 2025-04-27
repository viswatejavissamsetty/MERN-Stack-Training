const express = require("express");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/big-basket").then(() => {
  console.log("Connected to mongodb");
});

const app = express();

// Code to make all the data is in json format
app.use(express.json());

// Products section
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    description: String,
    price: {
      type: Number,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false }
);
const productModel = mongoose.model("products", productSchema);

app.get("/", function (req, res) {
  res.send({
    message: "Hello World",
  });
});

app.post("/products", async function (req, res) {
  console.log(req.body);
  const data = req.body;
  const productSaved = await productModel.insertOne(data);
  res.json({
    message: "Data saved succesfully!",
    createdProduct: productSaved,
  });
});

app.get("/products", async function (req, res) {
  const products = await productModel.find();
  res.json(products);
});

app.patch("/products/:productId", async function (req, res) {
  const productId = req.params.productId;
  const data = req.body;

  const updateResult = await productModel.updateOne({ _id: productId }, data);

  res.json({
    status: "SUCCESS",
    updateResult: updateResult,
  });
});

app.delete("/products/:productId", async function (req, res) {
  const productId = req.params.productId;

  const deletedResult = await productModel.deleteOne({ _id: productId });

  res.json({
    status: "SUCCESS",
    deletedResult: deletedResult,
  });
});

// Users Section
const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const userModel = mongoose.model("users", userSchema);
// Creation
app.post("/user/register", async function (req, res) {
  const body = req.body;

  const isExistingUser = await userModel.findOne({ username: body.username });

  if (isExistingUser) {
    res.status(400).json({
      message: "Username is already taken",
    });
  }

  const createdUser = await userModel.insertOne(body);
  res.json({
    status: true,
    username: createdUser.username,
  });
});

app.post("/user/login", async function (req, res) {
  const body = req.body;
  const username = body.username;
  const password = body.password;

  const user = await userModel.findOne({ username: username });

  if (!user) {
    res.status(401).json({
      message: "Invalid username or password",
    });
  } else {
    if (user.password != password) {
      res.status(401).json({
        message: "Invalid username or password",
      });
    } else {
      res.status(200).json({
        status: "SUCCESS",
        userid: user._id,
      });
    }
  }
});

app.patch("/user/:userId", async function (req, res) {
  const body = req.body;
  const email = req.body.email;

  const userId = req.params.userId;

  const updatedResult = await userModel.updateOne(
    { _id: userId },
    { email: email }
  );

  res.json({
    status: "SUCCESS",
    updatedResult: updatedResult,
  });
});

// Orders Section
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
const orderModel = mongoose.model("orders", orderSchema);

app.post("/orders", async (req, res) => {
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

app.get("/orders", async (req, res) => {
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

app.patch("/orders/:orderId", async (req, res) => {
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

app.listen(3000, function () {
  console.log("Server is running");
});
// http://localhost:3000/
