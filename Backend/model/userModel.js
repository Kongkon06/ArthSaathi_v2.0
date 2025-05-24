async function createUser(req,res)=>{
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
  res.status(200);
  return;
  )
  }catch(error){
  res.status(500).json()
  }
  return;
}
