const jwt=require("jsonwebtoken");
const secret="devpriya@123";
function createtoken(user){
    if(!user||!user._id||!user.email){
        console.log("Invalid user");
        return null;
    }
    try {
        const token=jwt.sign({
            id:user._id,
            email:user.email,
        },
    secret);
    return token;
        
    } catch (error) {
        console.log("error from jwt",error.message);
        return null;
        
    }

}
function checktoken(token){
   try {
    const decode=jwt.verify(token,secret);
    return decode;
    
   } catch (error) {
    console.log("jwt verification failed",error.message);
    return null;
   }
}
module.exports={createtoken,checktoken};