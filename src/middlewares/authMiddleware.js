const jwt=require("jsonwebtoken");



function authinticate(req,res,next){
    const token=request.header("authorization")?.split("")[1];
    if(!token)
        return res.status(404).json({msg:"Invalid authorization"});
    try{
        const decode=jwt.verify(token,process.env.JWT.SECRET);
        req.user=decoded;
        next();
    }
    catch(err){
        return res.status(404).json({msg:"Invalid Token"});
    }
}
module.exports=authinticate;