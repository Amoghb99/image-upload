const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    post: [{type: mongoose.Schema.Types.ObjectId, ref: "Post"}]
  })
);

module.exports = User;