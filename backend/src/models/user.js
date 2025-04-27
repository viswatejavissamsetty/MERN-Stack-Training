const mongoose = require("mongoose");
const userSchema = require("../schemas/user.js");

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
