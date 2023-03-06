const mongoose = require("mongoose");

const Post = mongoose.model(
  "Post",
  new mongoose.Schema({
    title: String,
    desc: String,
    tags: String,
    date : Date,
    profileImg: {
      type: String
  }
  })
);

module.exports = Post;