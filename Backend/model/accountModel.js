import express from 'express';
import { PrismaClient } from '../generated/prisma/client.js';
const prisma = new PrismaClient();

async function createAccount(req,res){
  try{
  const { firstName,lastName,age,dependents,initialBalance,accountType,monthlyIncome,disposableIncome,desiredSavings } = req.body;  
  const user = req.user
  await prisma.accounts.create({
  data:{
  userId: user.userId,
  firstname : firstName,
  lastname: lastName,
  age:age,
  dependents:dependents,
  account_type: accountType,
  initial_balance :initialBalance,
  monthly_income : monthlyIncome,
  disposable_amount: disposableIncome,
  desired_saving : desiredSavings
  }
  })
  return res.json();

  }catch(error){
    console.error(error);
  res.status(500).json()
  }
 }

async function getAccount(req,res){
try{
  const user = req.user;
  const account = await prisma.accounts.findMany({
      where:{
            userId:user.userId
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
    const { firstName,lastName,age,dependents,initialBalance,accountType,monthlyIncome,disposableIncome,desiredSavings } = req.body;  
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
        initial_balance :initialBalance,
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
