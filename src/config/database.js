const mongoose = require("mongoose");
const connectDB= async ()=>{
await mongoose.connect("mongodb+srv://keshav:mittal@firstcluster.r8m3vzw.mongodb.net/devTinder")
}

module.exports = {connectDB}
