const Post = require("../models/post");
const mongoose = require("mongoose");


exports.createPost = async (req, res) => {
  try {
    const { title, content, tag, author } = req.body;

    if (!title || !content || !tag || !author) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const newPost = await Post.create({ title, content, tag, author });

    res.status(201).json({
      msg: "Post created successfully",
      post: newPost,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ DATA: posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
exports.getSinglePost = async (req, res) => {
  try {
    const postId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ success: false, message: "Invalid Post ID" });
    }
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }
    res.status(200).json({ success: true, DATA: post });
  } catch (err) {
    console.error("Error fetching post:", err);
    res.status(500).json({ success: false, message: "Server error while fetching post" });
  }
};
exports.updatePost = async (req, res) => {
  const postId = req.params.id;
  const updateData = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ msg: "Invalid Post ID" });
    }

    const updatedPost = await Post.findByIdAndUpdate(postId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedPost) {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.json({ msg: "Post updated successfully", post: updatedPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
exports.deletePost = async (req, res) => {
  const postId = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ msg: "Invalid Post ID" });
    }

    const deleted = await Post.findByIdAndDelete(postId);

    if (!deleted) {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.json({ msg: "Post deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
