const bcrypt = require('bcrypt')
// const validator = require('validator')
// const isValidated = (props)=>{
// props.password
// }

const validateEditProfile=(req)=>{
 const allowedKeys=["firstName","lastName","age","gender"]
 const isValidate = Object.keys(req.body).every((key)=>allowedKeys.includes(key))
 return isValidate;
}
const validateEditPassword = async (req)=>{
const {oldPassword}=req.body;
// console.log(oldPassword)
const user = req.user;
// console.log(user.firstName);
const isValidatePassword = await bcrypt.compare(oldPassword,user.password);
// console.log(isValidatePassword)
return isValidatePassword;  
}

module.exports ={validateEditProfile,validateEditPassword};