import jwt from "jsonwebtoken";



export const authAdmin = (req,res,next)=>{
  try {
    const {token} = req.cookies
  
  
    if(!token){
      return res.status(400).json({success:false,message: " Admin not authenticated"})
    }
    
    const tokenVerified = jwt.verify(token,process.env.JWT_SK)
  
    if (!tokenVerified) {
      return res.status(400).json({ success: false, message: "Admin not authenticated" });
    } 

     req.admin = tokenVerified;

     
     next();
  
  } catch (error) {
    console.log(error);
  }
}


