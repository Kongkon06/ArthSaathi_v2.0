import express from 'express';
import { PrismaClient } from '../generated/prisma/client.js';
const prisma = new PrismaClient();

async function createAccount(req,res){
  try{
  const { age,dependents,currentBalance,accountType,monthlyIncome,disposableIncome,desiredSavings } = req.body;  
  const user = req.user;
  const userData = await prisma.user.findFirst({
  where:{
  id:user.userId
  }
  });
  if(!userData){
  res.status(500).json({
  msg:'User does not exist'
    })
  }
  const account =await prisma.accounts.create({
  data:{
  userId: user.userId,
  firstname : userData.firstname,
  lastname: userData.lastname,
  age:age,
  dependents:dependents,
  account_type: accountType,
  current_balance :currentBalance,
  monthly_income : monthlyIncome,
  disposable_amount: disposableIncome,
  desired_saving : desiredSavings
  }
  })
  return res.json(account);

  }catch(error){
    console.error(error);
  res.status(500).json()
  }
 }

async function getAccount(req,res){
try{
  const user = req.user;
  const account = await prisma.accounts.findFirst({
      where:{
            userId:user.userId
           }
      });
      res.json(account);
  return;
}catch(error){
  res.status(500).json();
}
return;

}

async function deleteAccount(req,res){
  try{
  const account_id  = req.params.id;
  if(!account_id){
    res.status(411).json({msg:'Missing id'});
  }
  const account = await prisma.accounts.delete({
  where:{
      id:account_id
    }
  }) 
    res.json()
    return
  }catch(error){
    res.status(500);
  }
  return;
}

async function updateAccount(req,res) {
  try{
    const { account_id } = req.params.id;
    const { firstName,lastName,age,dependents,currentBalance,accountType,monthlyIncome,disposableIncome,desiredSavings } = req.body;  
    if(!account_id){
      res.status(411).json({msg:'Missing id'});
    }
    const account = await prisma.accounts.update({
      where:{
        id:account_id
      },
      data:{
        firstname : firstName,
        lastname: lastName,
        age:age,
        dependents:dependents,
        account_type: accountType,
        current_balance :currentBalance,
        monthly_income : monthlyIncome,
        disposable_amount: disposableIncome,
        desired_saving : desiredSavings
      }
    })
    res.json(account);
    return;
  }catch(error){
    res.status(500).json();
  }
  return;
}

export default {
  createAccount,
  getAccount,
  deleteAccount,
  updateAccount
}
