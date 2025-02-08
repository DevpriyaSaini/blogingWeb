const mongoose=require("mongoose");
const express=require("express");
const User = require("../model/user.js");
const { createtoken } = require("../service/auth.js");
const router=express.Router();

router.get("/signup",(req,res)=>{
    return res.render("signup");
});

router.post("/user/signup",async (req,res)=>{
    const {fullName,email,password}=req.body
   
    try {
        const create= await User.create({
            fullName,
            email,
            password,   
        });
       
        return res.redirect("/");
        
    } catch (error) {
        console.log(error);
        return res.json({msg:`${error}`});
        
    }
})

router.get("/signin",(req,res)=>{
    return res.render("login");
})

router.post("/user/signin",async (req,res)=>{
    const {email,password}=req.body;
    const user = await User.findOne({ email });
    try {
        if(!await user.comparePass(password)) {
            return res.status(401).json({ message: 'Invalid Password' });
        }

        const token = createtoken(user);

        return res.cookie("token", token).redirect("/");

        
    } catch (error) {
        return res.render("login", {
            error: `Incorrect Email or Password E: ${error}`,
          });
        
    }

})


router.get("/logout",(req,res)=>{
    return res.clearCookie("token").redirect("/")


})




module.exports=router;