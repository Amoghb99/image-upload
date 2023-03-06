const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");

db.refreshToken = require("./refreshToken.model");

db.post = require("./post.model");

module.exports = db;