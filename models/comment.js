const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Comment Model Schema
const CommentSchema = new Schema({
  content: { type: String, required: true, maxLength: 3000 },
  user: { type: String, required: true },
  posted: { type: Date, required: true },
  postRef: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
});

module.exports = mongoose.model('Comment', CommentSchema);
