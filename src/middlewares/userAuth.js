const jwt = require("jsonwebtoken");
const User = require("../models/user")

const userAuth = async (req,res,next)=>{
  try{const {token}=req.cookies;
  const decoded = await jwt.verify(token,"Dev@Tinder$");
  const user = await User.findById(decoded._id);
  req.user=user;
  next();
}catch(err){
res.status(400).send("Error :" + err.message)
}

}
module.exports=userAuth;