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
  const user = await prisma.user.create({
    data:{
    email,
    password
    }
  })
  res.json('Sucess');
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
  const user = await prisma.user.find({
    where:{
      email:email
    }
  })
  if ( !user ||  !(await auth.compare(password,user.password_hashed))){
      res.status(411).json({msg:'Invalid credentials'});
    return 
    }
    const { accessToken ,refreshToken } = await auth.generateToken(user);
    res.json({accessToken,refreshToken});
    return
  }catch(error){
    res.status(500);
    return
  }
}
export default {
  createUser,
  userLogin
}
