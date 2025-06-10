import auth from '../middleware/auth.js'
import { PrismaClient } from '../generated/prisma/client.js';
const prisma = new PrismaClient();

async function createUser(req,res){
  try{
  const { email,password } = req.body;
  if(!email && !password){
    res.status(411).json('Missing fields');
    return
  }
  const hash_password = await auth.hashPassword(password);
  if (!hash_password) {
    res.status(500).json('Error hashing password');
    return;
  }
  const user = await prisma.user.create({
    data:{
    email,
    password: hash_password
    }
  })
  const token = await auth.generateToken(user);
  res.json({token});
  return;
  }catch(error){
  res.status(500).json()
  }
  return;

}

async function userLogin(req,res) {
  
  try{
   const { email, password } = req.body;
  if (!email || !password){
    res.status(411).json({msg:'Missing credentials'})
  }
  const user = await prisma.user.findFirst({
    where:{
      email:email
    }
  })
  if ( !user ||  !(await auth.comparePassword(password,user.password))){
      res.status(411).json({msg:'Invalid credentials'});
    return 
    }
    const { accessToken ,refreshToken } = await auth.generateTokens(user);
    res.json({accessToken,refreshToken});
    return
  }catch(error){
    console.error(error); // Logs the error for server-side debugging
    res.status(500).json({ message: "Something went wrong." });
    return;
}
}
export default {
  createUser,
  userLogin
}
