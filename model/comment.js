const mongoose=require("mongoose");
const schema=new mongoose.Schema({
    content:{
        type:String,
        required:true,
    },
    blogId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"blogsection",
        required:true
    },
    createdBy:{
         type:mongoose.Schema.Types.ObjectId,
                ref:"User",
                required:true
    }

},{timestamps:true})
const comment=mongoose.model("comment",schema);
module.exports=comment;