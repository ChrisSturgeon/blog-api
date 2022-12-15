const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const fns = require('date-fns');

// Post model Schema
const PostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  posted: { type: Date, required: true },
  published: Boolean,
});

module.exports = mongoose.model('Post', PostSchema);
