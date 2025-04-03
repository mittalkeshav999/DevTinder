const express = require("express")
const app=express();
const {connectDB} = require("./config/database");
const User = require("./models/uer");

app.use(express.json());
app.post("/signup",async (req,res)=>{

    try{
        const user = new User(req.body);
        await user.save();
        res.send("Data Added Successfuly")
    }
    catch(err){
        res.status(400).send("Error :" + err.message)
    }
})
app.patch("/user", async (req,res)=>{
    try{
        const query = req.body;
        await User.findOneAndUpdate(query,{emailId:"mittalkeshav999@gmail.com"})
        res.send("Data Updated Successfully")
    }
    catch(err){
        res.status(400).send("Something went wrrong")
    }
})

connectDB().then(()=>{
    console.log("Connected to DB");
    app.listen(7777,()=>{
        console.log("Server is listening on 7777");
    });
}).catch(err => {
    console.log("Error Found :" ,err)
})
 

