const express = require('express');
const userAuth = require('../middlewares/userAuth');
const ConnectionRequest = require('../models/connectionRequest');
const userRouter = express.Router();
const User = require("../models/user")
const SAFE_USER_IMPORT=["firstName","lastName","age",]

userRouter.get("/user/requests/received",userAuth, async (req,res)=>{
    try {
        const loggedInUser=req.user;
        const connectionRequests = await ConnectionRequest.find({
            toUserId:loggedInUser._id,
            status:"interested"
        })
        .populate("fromUserId",SAFE_USER_IMPORT)
        const data = connectionRequests.map((request)=> request.fromUserId )
        res.json({message:"List of Connection Requests",data})
    } catch (err) {
        res.status(400).send("Error : "+ err.message)
    }
})
userRouter.get("/user/connections",userAuth, async (req,res)=>{
    try {
        const loggedInUser = req.user;
        const connections = await ConnectionRequest.find({
            $or:[{fromUserId:loggedInUser._id,status:"accepted"},
                {toUserId:loggedInUser._id,status:"accepted"}
            ]
        }).populate("fromUserId",SAFE_USER_IMPORT).populate("toUserId",SAFE_USER_IMPORT)
        const data = connections.map((request)=>{
            if(request.toUserId==loggedInUser._id){
                return request.fromUserId
            }
            else{
                return request.toUserId
            }
        })
        res.json({message:"Connections find successfully",
            Connections : data
        })
    } catch (err) {
        res.status(400).send("Error :" + err.message);
        
    }
})

userRouter.get("/user/feed",userAuth,async (req,res)=>{
  try{  const loggedInUser = req.user;
    const page= req.query.page || 1;
    const limit = req.query.limit || 1;
    limit = limit>50 ? 50 : limit;
    const skip= (page-1)* limit;
    const connections =await ConnectionRequest.find({
        $or:[{
            toUserId:loggedInUser._id
        },
    {
        fromUserId:loggedInUser._id
    }]
    }).select("fromUserId toUserId")
    const hideUsersFromFeed = new Set();
    hideUsersFromFeed.add(loggedInUser._id);  
    connections.forEach(connection => {
        hideUsersFromFeed.add(connection.fromUserId);
        hideUsersFromFeed.add(connection.toUserId);
    });     
  console.log(hideUsersFromFeed);
    const usersNotInSet = await User.find({
        _id: { $nin: Array.from(hideUsersFromFeed) }
        
      }).select(SAFE_USER_IMPORT).skip(skip).limit(limit);
    res.json({message:"connections to hide",usersNotInSet})
}catch(err){
        res.status(404).send("Error :" + err.message)
    }
})
 
module.exports = userRouter;