import express from 'express';
const Router = express.Router();

Router.use('/',(req,res)=>{
  const { firstname,lastname,age,dependents,initalBalance,accountType,monthlyIncome,disposableIncome,desiredSavings } = req.body;
   
  return res.json();
})
