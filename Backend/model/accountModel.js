import express from 'express';
const Router = express.Router();

async function createAccount(req,res){
  try{
  const { userId ,firstname,lastname,age,dependents,initalBalance,accountType,monthlyIncome,disposableIncome,desiredSavings } = req.body;  
  
  const account = await prisma.accounts.create({
  data:{
  firstname : firstname,
  lastname: lastname,
  age:age,
  dependents:dependents,
  account_type: accountType,
 initial_balance :initialBalance
 monthly_income : monthlyIncome,
 disposable_amount: disposableIncome,
 desired_saving : desiredSavings
  })
  return res.json();

  }catch(error){
  res.status(500).json()
  }
 }

async function getAccount(){
try{
  const { account_id } = req.body;
  const account = await prisma.account.find({
      where:{
            id:account_id
           }
      });
      if(!account){
      res.status(411).json({msg:"Invalid id"});
      return;
      }
      
      res.json(account);
  return;
}catch(error){
  res.status(500).json();
}
return;
}
