import express from 'express'

const Router = express.Router();

Router.use('/',(req,res)=>{
  res.json();
})

Router.use('/auth',(req,res)=>{
  res.json();
})

Router.use('/',(req,res)=>{
  res.json();
})
