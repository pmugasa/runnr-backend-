const mongoose = require("mongoose");

//user schema
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

//user model
const User = mongoose.model("User", UserSchema);

module.exports = User;
