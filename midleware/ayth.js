function checkauth(req,res,next){
    const token=req.cookies?.token;
    if(!token){
     return res.redirect("/signin");
    }
   try {
    const user=checktoken(token);
    req.user= user;
    next();
    
   } catch (error) {
    
    
   }
   next();
    

}
module.exports={checkauth};