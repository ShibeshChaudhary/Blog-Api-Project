const express = require('express');
const router = express.Router();
const postController = require("../controller/postController"); 

router.post('/post', postController.createPost);
router.get("/post",postController.getAllPosts);
router.put("/post/:id",postController.updatePost);
router.delete('/post/:id', postController.deletePost);
module.exports = router;
