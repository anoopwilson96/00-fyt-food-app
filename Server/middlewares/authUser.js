import jwt from "jsonwebtoken";



export const authUser = (req,res,next)=>{
  try {
    const {token} = req.cookies
    console.log(req.cookies,token ,"===token" );
  
    if(!token){
      return res.status(400).json({success:false,message: " sorry user not authenticated"})
    }
    
    const tokenVerified = jwt.verify(token,process.env.JWT_SK)
  
    if (!tokenVerified) {
      return res.status(400).json({ success: false, message: "user not authenticated" });
    } 


     next();
  
     req.user = tokenVerified;
  
  } catch (error) {
    console.log(error);
    
  }
}