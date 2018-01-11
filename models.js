'use strict';

const mongoose = require('mongoose');

const blogPostSchema = mongoose.Schema({
  author: {
    firstName: String,
    lastName: String
  },
  title: { type: String, required: true },
  content: { type: String },
  created: { type: Date, default: Date.now },
  user: {
    username: String,
    password: String
  },
});


blogPostSchema.virtual('authorName').get(function() {
  return `${this.author.firstName} ${this.author.lastName}`.trim();
});

//virtual for user
blogPostSchema.virtual('user').get(function() {
  return `${this.user.username} ${this.user.password}`.trim();
});

//create hash password function
blogPostSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};



blogPostSchema.methods.serialize = function() {
  return {
    id: this._id,
    author: this.authorName,
    content: this.content,
    title: this.title,
    created: this.created,

  };
};

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = { BlogPost };