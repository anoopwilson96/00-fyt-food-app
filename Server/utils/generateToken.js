import jwt from 'jsonwebtoken'


export const generateUserToken = (email)=>{
  const token = jwt.sign({email:email,role:'user'},'process.env.JWT_SK')
  return token
}