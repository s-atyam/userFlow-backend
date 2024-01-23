const mongoose = require('mongoose')
const mongoURL = process.env.MONGO_URI

// this function is for connecting to the database
const connectDB = async () =>{
    try{
        await mongoose.connect(mongoURL,{dbName:'UserFlow'});
        console.log("Connected to Database")
    }catch(e){
        console.log(e.message);
    }
}

module.exports = connectDB;