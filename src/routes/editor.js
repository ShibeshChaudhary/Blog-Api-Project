const express = require("express");
const router = express.Router();

const authenticate = require("../middlewares/authMiddleware");
const allowRoles = require("../middlewares/checkRole");
const {
  createPost,
  updatePost,
  deletePost,
  getAllPosts
} = require("../controllers/postController");
router.get(
  "/posts",
  authenticate,
  allowRoles("editor", "admin"),
  getAllPosts
);
router.post(
  "/posts",
  authenticate,
  allowRoles("editor", "admin"),
  createPost
);
router.put(
  "/posts/:id",
  authenticate,
  allowRoles("editor", "admin"),
  updatePost
);
router.delete(
  "/posts/:id",
  authenticate,
  allowRoles("editor", "admin"),
  deletePost
);
module.exports = router;
