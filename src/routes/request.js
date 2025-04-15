const express = require('express');
const requestRouter = express.Router();
const userAuth = require('../middlewares/userAuth')
const ConnectionRequest = require('../models/connectionRequest.js')
const User = require("../models/user.js")

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req,res)=>{
   try {const status = req.params.status;
    const toUserId = req.params.toUserId;
    const loggedInUserId=req.user._id;

    const toUser=await User.findById(toUserId);
    if(!toUser){
        throw new Error("User does not Exists")
    }
    const allowedStatus=["interested", "ignored"]
    if(!allowedStatus.includes(status)){
        throw new Error("Invalid status")
    }

    const existingRequest = await ConnectionRequest.findOne({
        $or:[{fromUserId:loggedInUserId,toUserId},{
            fromUserId:toUserId,toUserId:loggedInUserId
        }]
    })
    if(existingRequest){
        throw new Error("Connection Request Already Exists")
    }
    if(loggedInUserId==toUserId){
        throw new Error("You can not send connection request to yourself")
    }
    const connectionRequest = new ConnectionRequest({
        fromUserId:loggedInUserId,
        toUserId:toUserId,
        status:status
    })
    await connectionRequest.save();

    res.json({
        message:"Connection Request Sent Successfully",
        connectionRequest:connectionRequest
    })}
    catch(err){
        res.status(400).send("Error : " + err.message)
    }
    
})

requestRouter.post("/request/review/:status/:requestId",userAuth, async (req,res)=>{
  try{  const currentStatus=req.params.status;
    const requestId= req.params. requestId;

    const allowedStatus=["accepted", "rejected"];
    const isValidStatus = allowedStatus.includes(currentStatus);
    const loggedInUserId=req.user._id;
    if(!isValidStatus){
        throw new Error("Status is wrong")
    }

    const connectionRequest = await ConnectionRequest.findOne({
        toUserId:loggedInUserId,
        status:"interested",
        _id:requestId
    })
    if(!connectionRequest){
        throw new Error("Invalid Request");
    }
    connectionRequest.status= currentStatus;
    await connectionRequest.save();
    res.send("Status Accepted"); 
}catch(err){
        res.status(400).send("Error : "+ err.message)
    }
})
module.exports=requestRouter; 