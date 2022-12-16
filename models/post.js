const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const fns = require('date-fns');

// Post model Schema
const PostSchema = new Schema({
  title: { type: String, maxLength: 200, minLength: 1, required: true },
  content: { type: String, maxLength: 20000, minLength: 1, required: true },
  posted: { type: Date, required: true },
  published: Boolean,
});

module.exports = mongoose.model('Post', PostSchema);
