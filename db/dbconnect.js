const mongoose = require("mongoose");
const dotenv=require("dotenv")
dotenv.config()
const mongouri=process.env.MONGOURI
exports.dbConnect=async()=>{
    try{
     await mongoose.connect(mongouri)
     console.log("Database Connection Successfull")
    }
    catch(err){
        console.log("Database not connected")
        res.status(500).json({
            message:err.message
        })
    }
}

