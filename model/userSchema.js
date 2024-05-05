const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    enrollment:{
        type:String,
        required:true,
    },
    name: {
        type: String,
        required: true,
        
    },
    fathername:{
        type:String,
        required:true,
    },
    branch:{
        type:String,
        required:true,
    },
    fees:{
      type:Number,
      required:true,
    }
})

const user = new mongoose.model('fees', userSchema);


module.exports = user;