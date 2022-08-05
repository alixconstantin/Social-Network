const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  userId: { type: String, required: false },
  postId: { type: String, required: false},
  userName: { type: String, required: false},
  postUrl: { type: String, required: false },
  postText: {type: String, required: false },
  userEmail: { type: String, required: false},
  comments: { type: String, required: false},
  likes: { type: Number, required: false },
  //dislikes: { type: Number, required: false },
  usersLiked: { type: String, required: false },
 // usersDisliked: { type: String, required: false }
});

module.exports = mongoose.model('post', postSchema);