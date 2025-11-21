const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{String},
    email:{type:String,required:true,unique:true},
    password:{String},
    role: {type: String,
    enum: ["admin", "author", "visitor"],
    default: "customer"}
});
module.exports=mongoose.model("user",userSchema);