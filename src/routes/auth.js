const express = require('express');
const authRouter = express.Router()
const bcrypt = require('bcrypt')
const User = require("../models/user")

authRouter.post("/signup", async (req,res)=>{
 
    const  {password,firstName,lastName,emailId,age}=req.body;

      try{
          const hashedPass = await bcrypt.hash(password, 20);
          const user = new User({firstName,lastName,emailId,age,password : hashedPass});
          await user.save();
          res.send("Data Added Successfuly")
      }
      catch(err){
          res.status(400).send("Error :" + err.message)
      }
  })
  authRouter.post("/login", async (req,res)=>{
      const {emailId,password}=req.body;
    try{ const user= await User.findOne({emailId : emailId})
    if (!user) {
      return res.status(400).send("User not found");
  }
     const IsValidated = await user.validatePassword(password);        
      if(IsValidated){
          const token = await user.getJWT();
          res.cookie("token",token);
          res.send(user );
      }
  else{
      throw new Error("Password not match")
  }}catch(err){
          res.status(400).send("Error"+err.message)
      }
  })
  authRouter.post("/logout", async (req,res)=>{
    res.cookie("token",null,{
        expires: new Date(Date.now()) // 1 hour from now
      })
      res.send("Logged Out Successfully")
  })
  
  module.exports= authRouter;