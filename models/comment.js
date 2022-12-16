const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Comment Model Schema
const CommentSchema = new Schema({
  content: { type: String, required: true, minLength: 1, maxLength: 5000 },
  username: { type: String, maxLength: 19 },
  posted: { type: Date, required: true },
  postRef: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
});

module.exports = mongoose.model('Comment', CommentSchema);
