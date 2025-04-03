const authAdmin =("/admin" ,(req,res,next)=>{
    const isAuthenticated = true;
    if(!isAuthenticated){
        res.send("Not authenticated")
    }
    else{
        next();
    }
})
module.exports={authAdmin};