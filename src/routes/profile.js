const express = require('express');
const profileRouter= express.Router();
const { validateEditProfile} = require("../utils/validation")
const {validateEditPassword} = require("../utils/validation")
const userAuth = require("../middlewares/userAuth")
const bcrypt = require('bcrypt');

profileRouter.get("/profile/view" , userAuth,async (req,res)=>{
    const user=req.user;
    res.send(user);
   })
   
   profileRouter.patch("/profile/edit",userAuth, async (req,res)=>{
    try{
    if(!validateEditProfile(req)){
        throw new Error("Enter correct Edit Details")
    }
    const user =req.user;
    Object.keys(req.body).forEach((key)=>(user[key]=req.body[key]));
    await user.save();
    res.send("Data Updated Succesfully" )
}catch(err){
        res.status(400).send("Error:" + err.message)
    }
   })
   profileRouter.patch("/profile/password", userAuth, async (req,res)=>{
   try{ 
    const isEdit = await validateEditPassword(req);
    if(!isEdit){
        throw new Error("Password Did not match")
    }
    const user=req.user;
    user.password= await bcrypt.hash(req.body.newPassword, 10);
    await user.save();
    res.send("Password Matches")
}catch(err){
        res.status(400).send("Error : "+ err.message)
    }
   })
module.exports=profileRouter;