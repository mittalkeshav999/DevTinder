const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')

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
        unique:true,
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
                throw new Error("Enter valid gender")
            }
        },
        type:String
    }

},
{timestamps:true});
userSchema.methods.validatePassword =  async function (password) {
    const user = this;
    const isPasswordValid = await bcrypt.compare(password,user.password);
    return isPasswordValid;
}
userSchema.methods.getJWT = async function(){
    const user = this;
    const token = await jwt.sign({_id:user._id},"Dev@Tinder$",{expiresIn:"7d"});
    return token;
}
const User = mongoose.model("User",userSchema);
module.exports=User;