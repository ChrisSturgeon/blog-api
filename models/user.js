const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Model Schema
const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  joined: { type: Date, required: true },
  posts: [],
});

module.exports = mongoose.model('User', UserSchema);
