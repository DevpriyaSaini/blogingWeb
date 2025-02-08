const express=require("express");
const router=express.Router();
const blog=require("../model/blog.js");
const multer=require("multer");
const path=require("path");
const comment=require("../model/comment.js");


router.get("/logout",(req,res)=>{
    return res.clearCookie("token").redirect("/");


})
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.resolve(`./public/uploads/`));
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+"-"+file.originalname);
    }
})
const upload=multer({storage:storage});



router.get("/addblog",(req,res)=>{
    return res.render("addblog")
})


router.post("/addblog", upload.single("coverImage"),async (req,res)=>{
    const {Title,body}=req.body;
    
    try {
        const blogcreate= await blog.create({
            coverImage:`/uploads/${req.file.filename}`,
            Title,
            body,
            createdBy:res.locals.user._id,
            
        })
       
       
        return res.redirect(`/`);
        
    } catch (error) {
        console.log(error);
        return res.redirect("/addblog");

        
    }
})


router.get("/blog/:id",async(req,res)=>{
    
    const blogpost = await blog.findById(req.params.id).populate("createdBy"
        );
        const comments=await comment.find({blogId:req.params.id}).populate("createdBy")

    return res.render("blog",{
        user:res.locals.user,
        blog:blogpost,
        comment:comments,
    });
})

router.post("/addComment/:id",async (req,res)=>{
    const blogpost = await blog.findById(req.params.id).populate("createdBy"
    );
    try {
       
    const create= await comment.create({
        content:req.body.content,
        blogId:req.params.id,
        createdBy:res.locals.user._id,
        
    })
  
    return res.redirect(`/blog/${req.params.id}`
       
    );
    } catch (error) {
        console.log(error);
        return res.json({msg:error})
        
    }
    

})


module.exports=router