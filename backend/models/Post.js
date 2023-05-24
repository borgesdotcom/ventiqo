const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  content: String,
  name: String,
  hashtags: [String],
  likes: { type: Number, default: 0 },
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  points: { type: Number, default: 0 }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
