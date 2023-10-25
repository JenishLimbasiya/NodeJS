const express = require("express");
const router = express.Router();

const { createComment } = require("../controllers/commentcontoller");
const { createPost, getAllPost } = require("../controllers/postcontroller");
const { likePost, unlikePost } = require("../controllers/likecontroller");

router.post("/comments/create", createComment);
router.post("/posts/create", createPost);
router.get("/posts", getAllPost);
router.post("/likes", likePost);
router.post("/unlike", unlikePost);

module.exports = router;
