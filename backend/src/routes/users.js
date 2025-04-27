const express = require("express");
const userService = require("../services/users.js");

const router = express.Router();

// Creation
router.post("/register", async function (req, res) {
  const body = req.body;

  try {
    const createdUser = await userService.register(
      body.username,
      body.password,
      body.email,
      body.fullname
    );

    res.json({
      status: true,
      username: createdUser.username,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
});

router.post("/login", async function (req, res) {
  const body = req.body;
  const username = body.username;
  const password = body.password;

  try {
    const user = await userService.login(username, password);

    res.json({
      status: "SUCCESS",
      userid: user._id,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
});

router.patch("/:userId", async function (req, res) {
  const body = req.body;
  const email = body.email;

  try {
    const updatedResult = await userService.updateUserDetails(
      req.params.userId,
      email
    );

    res.json({
      status: "SUCCESS",
      updatedResult: updatedResult,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
});

router.get("/:userId", async function (req, res) {
  try {
    const user = await userService.getUserDetails(req.params.userId);

    res.json(user);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
});

module.exports = router;
