const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  src: { type: String, required: true },
  alt: { type: String, required: true },
  content: { type: String, required: true },
  comments: { type: Array, required: true },
});

module.exports = mongoose.model("Post", postSchema);
