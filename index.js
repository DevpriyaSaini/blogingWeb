const express=require("express");
const mongoose=require("mongoose");
const userrouter=require("./routes/user.js");
const  cokkieparser=require("cookie-parser");
const app=express();
const {checkauth}=require("./midleware/ayth.js")
const path=require("path");
const jwt = require('jsonwebtoken')
const cookieParser = require("cookie-parser");
const User = require("./model/user.js");
const port=8000;
const secret="devpriya@123";
const blogrouter=require("./routes/blog.js");
const blog=require('./model/blog.js');

app.use(cookieParser());

app.use(async (req, res, next) => {
    const token = req.cookies?.token;

    let userId;

    if(token) userId = jwt.verify(token, secret);

    const user = await User.findById(userId?.id);

    res.locals.user = user;

    next();
})

app.get("/", async (req,res)=>{
    const allblogs=await blog.find({})

    return res.render("home",{
        blogs:allblogs
    });
});






app.use(express.static('public'));
app.use("/views", express.static("views"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/",userrouter);

app.use("/",checkauth,blogrouter)









async function connectmongo(){
    try {
        await mongoose.connect("mongodb+srv://devpriyasaini:Anilsaini70177@cluster01.kzupp.mongodb.net/Cluster01");
        console.log("mongo connected");

        
    } catch (error) {
        console.log(error);
        
    }
}
connectmongo();





app.listen(port,()=>console.log(`server is running at ${port}`));