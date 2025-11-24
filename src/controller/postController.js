const post=require("../models/post");

exports.createPost=async(req,res)=>{
    try{
        const{title,content,tag,author}=req.body;
        if(!title||!content || !tag||!author){
            res.json({msg:"Wrong Credentials"});
    }
    const newPost=await post.create({
        title,
        content,
        tag,
        author,
    });
    res.status(201).json({msg:"Post created sucessfully",post:newPost});

}
catch(err){
    res.status(500).json({msg:"Server error",error:err.message});

}

};
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await post.find();
    res.status(200).json({
        "DATA":posts
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};


exports.deletePost = async (req, res) => {
  const postId = req.params.id;

  try {
    const deleted = await post.findByIdAndDelete(postId);

    if (!deleted) {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.json({ msg: "Post deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
