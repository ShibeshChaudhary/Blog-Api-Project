const post=require("./models/post");
exports.createPost=async(req,res)=>{
    try{
        const{title,content,tag,author}=req.body;
        if(!title|| !tag||!author){
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