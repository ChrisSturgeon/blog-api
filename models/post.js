const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Post Model Schema
const PostSchema = new Schema({
  title: { type: String, maxLength: 200, minLength: 1, required: true },
  summary: { type: String, maxLength: 250, minLength: 1, required: true },
  content: { type: String, maxLength: 20000, minLength: 1, required: true },
  posted: { type: Date, required: true },
  published: Boolean,
});

module.exports = mongoose.model('Post', PostSchema);
