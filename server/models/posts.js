var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: String,
  description: String
})

var Post = mongoose.model("Post", PostSchema);

module.exports = Post;
