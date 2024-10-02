import jwt from "jsonwebtoken";



export const authAdmin = (req,res,next)=>{
  try {
    const {token,email,role} = req.cookies

    
  
  
    if(!token){
      return res.status(400).json({success:false,message: " Admin not authenticated"})
    }
    
    const tokenVerified = jwt.verify(token,process.env.JWT_SK)

    // console.log(tokenVerified);
    
  
    if (!tokenVerified ) {
      return res.status(400).json({ success: false, message: "Admin not authenticated" });
    } 

    if (tokenVerified.role !== "admin") {
      return res.status(400).json({ message: "Admin not authenticated : Login as Admin " });
  }

     req.admin = tokenVerified;

     
     next();
  
  } catch (error) {
    console.log(error);
  }
}


