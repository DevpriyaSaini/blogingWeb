const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const{createtoken}=require("../service/auth.js");
const schema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    
    password:{
        type:String,
        required:true
    },
    profileImage:{
        type:String,
        default:"/images/User-icon-256-blue.png"
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user",

    }
},{timestamps:true});


schema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,10);
    }
    next();

})

schema.methods.comparePass = async function(password){
    return await bcrypt.compare(password,this.password)
}


const User= mongoose.model("User",schema);
module.exports=User;