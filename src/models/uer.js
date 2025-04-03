const mongoose = require("mongoose");

const userSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        Unique:true,
        required:true,
        lowercase:true,
        trim:true

        
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        min:18,
        max:100
    },
    gender:{
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new error("Enter valid gender")
            }
        },
        type:String
    }

},
{timestamps:true})
const User = mongoose.model("User",userSchema);
module.exports=User;