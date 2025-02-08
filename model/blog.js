const mongoose=require("mongoose");
const schema=new mongoose.Schema({
    coverImage:{
        type:String,
        required:true,
    },
    Title:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }

})

const blog=mongoose.model("blogsection",schema);
module.exports=blog;