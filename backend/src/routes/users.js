const express = require("express");
const userModel = require("../models/user.js");

const router = express.Router();

// Creation
router.post("/register", async function (req, res) {
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

router.post("/login", async function (req, res) {
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

router.patch("/:userId", async function (req, res) {
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

module.exports = router;