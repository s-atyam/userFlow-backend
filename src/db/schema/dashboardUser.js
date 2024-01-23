const mongoose = require('mongoose')
const { Schema } = mongoose;

// this schema is for user 
const userSchema = new Schema({
    parentUserId : {
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    name : {
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true,
        unique:true
    },
    pass : {
        type:String,
    },
    phone: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    }
 
})

module.exports = mongoose.model('DashboardUser',userSchema);