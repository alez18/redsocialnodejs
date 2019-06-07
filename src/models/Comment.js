const { Schema, model } = require('mongoose');
const ObjectId = Schema.ObjectId;

const CommentSchema = new Schema({
  //para relacionar a otra db
  image_id:{type: ObjectId },
  email: {type: String},
  name: {type: String},
  comment:{type: String},
  gravatar: {type: String},
  timestamp:{type: Date, default: Date.now}
});

module.exports = model('Comment', CommentSchema);
