const userModel = require("../models/user.js");

async function register(username, password, email, fullname) {
  const isExistingUser = await userModel.findOne({ username: username });

  if (isExistingUser) {
    throw new Error({
      statusCode: 400,
      message: "Username is already taken",
    });
  }

  const createdUser = await userModel.insertOne({
    username,
    password,
    email,
    fullname,
  });

  return createdUser;
}

async function login(username, password) {
  if (!username || !password) {
    throw new Error({
      statusCode: 400,
      message: "Username and password are required",
    });
  }

  const user = await userModel.findOne({ username: username });

  if (!user) {
    throw new Error({
      statusCode: 400,
      message: "User not found",
    });
  }

  if (user.password !== password) {
    throw new Error({
      statusCode: 400,
      message: "Invalid password",
    });
  }

  return user;
}

async function updateUserDetails(userId, email) {
  const updatedResult = await userModel.updateOne(
    { _id: userId },
    { email: email }
  );

  return updatedResult;
}

async function getUserDetails(userId) {
  const user = await userModel.findOne({ _id: userId }, { password: 0 });

  return user;
}

module.exports = {
  register,
  login,
  updateUserDetails,
  getUserDetails,
};
