const express= require('express');
const app=express();

app.use("/home",(req,res)=>{
res.send("This is Homepage");
});
app.use("/test",(req,res)=>{
    res.send("This is Testpage");
});

app.listen(7777,()=>{
    console.log("Server is listening on 7777");
});
