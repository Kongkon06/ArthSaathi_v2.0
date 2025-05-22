import express from 'express';

const App = express();

App.get('/',(req,res)=>{
  res.json('Hi there');
})

App.listen(3000,()=>console.log("Server is online"));
