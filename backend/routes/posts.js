const express = require("express");
const { Error } = require("mongoose");
const multer = require("multer");
const jwt = require("jsonwebtoken");

const Post = require("../models/post");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

const MIME_TYPE_MAP = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type!");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLocaleLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});

router.post(
  "/api/posts",
  checkAuth,
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const post = new Post({
      title: "Shiba Inu", //req.body.title,
      subtitle: "Dog", // req.body.subtitle,
      src: url + "/images/" + req.file.filename, //req.body.src,
      imagePath: url + "/images/" + req.file.filename,
      alt: "shiba photo", // req.body.alt,
      content: req.body.content,
      comments: [],
    });
    post.save().then((createdPost) => {
      res.status(201).json({
        message: "Post added succ",
        post: {
          ...createdPost,
          id: createdPost._id,
        },
      });
    });
  }
);

router.put("/api/posts/:id", checkAuth, (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    subtitle: req.body.subtitle,
    src: req.body.src,
    alt: req.body.alt,
    content: req.body.content,
    comments: req.body.comments,
  });
  Post.updateOne({ _id: req.params.id }, post).then((result) => {
    console.log(result);
    res.status(200).json({ message: "comment added" });
  });
});

router.get("/api/posts", (req, res, next) => {
  Post.find().then((documents) => {
    res.status(200).json({
      message: "Posts fetched succesfully",
      posts: documents,
    });
  });
});

router.delete("/api/posts/:id", checkAuth, (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
});

module.exports = router;
