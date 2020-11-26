const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Post = require("./models/post");

const app = express();

mongoose
  .connect(
    "mongodb+srv://med:g0nrtoYQCpigZXFa@cluster0.utobn.mongodb.net/project?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Connection Faild!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});
app.post("/api/posts/:id", (req, res, next) => {
  const filtre = { _id: req.params.post._id };
  const oldlist = req.params.post.comments;
  const newlist = oldlist.unshift(req.params.newcomment);
  const updatedPost = { comments: newlist };
  let postUpdated = Post.findByIdAndUpdate(filtre, updatedPost, { new: true });
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: "Shiba Inu", //req.body.title,
    subtitle: "Dog", // req.body.subtitle,
    src: "https://material.angular.io/assets/img/examples/shiba2.jpg", //req.body.src,
    alt: "shiba photo", // req.body.alt,
    content: req.body.content,
    comments: ["test", "very nice", "love it", "I  want some", "hello"],
  });
  post.save().then((createdPost) => {
    res.status(201).json({
      message: "Post added succ",
      postId: createdPost._id,
    });
  });
});

app.get("/api/posts", (req, res, next) => {
  Post.find().then((documents) => {
    res.status(200).json({
      message: "Posts fetched succesfully",
      posts: documents,
    });
  });
});

module.exports = app;
