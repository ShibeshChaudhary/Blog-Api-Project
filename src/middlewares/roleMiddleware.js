const jwt=require("jsonwebtoken");


function authorize(...allowedRoles){
    return(req,res,next)=>{
        if(!req.user || !allowedRoles.includes(req.user.role)){
            return res.status(404).json({msg:"Unauthorize access"})
        }
        const allowedActions=permissionMap[role]||[];
        if(!allowedActions.include[action])
            return res.status(404).json({message:"You dont have required permission"});
        next();
    };

}
module.exports=authorize;