const mongoose = require('mongoose')
const { Schema } = mongoose;

// this schema is for user 
const userSchema = new Schema({
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
        required:true
    },
    phone: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    source: {
      type: [String],
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

module.exports = mongoose.model('User',userSchema);