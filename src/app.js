const express = require("express")
const cookieParser = require('cookie-parser')
const app=express();
const {connectDB} = require("./config/database");
const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/request")
const userRouter = require("./routes/user")
const cors = require("cors")

app.use(cors({
   origin: 'http://localhost:5173',
  credentials: true,               
}))
app.use(express.json());
app.use(cookieParser());

app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",requestRouter)
app.use("/",userRouter)

connectDB().then(()=>{
    console.log("Connected to DB");
    app.listen(7777,()=>{
        console.log("Server is listening on 7777");
    });
}).catch(err => {
    console.log("Error Found :" ,err)
})
 
