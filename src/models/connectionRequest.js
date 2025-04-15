const mongoose = require('mongoose');

const connectionRequestSchema = mongoose.Schema({
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User"
    },
    toUserId : {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    status:{
        type:String,
        enum:{
            values:["interested", "ignored", "accepted", "rejected"],
            message:`{VALUE} is not the type of status`
        }
    }
},{timestamps:true})

connectionRequestSchema.index({fromUserId:1,toUserId:1})

const ConnectionRequest = mongoose.model('ConnectionRequest',connectionRequestSchema);
module.exports=ConnectionRequest