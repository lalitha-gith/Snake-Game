const mongoose = require( "mongoose");

const Userschema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        unique:true
    },
    score:{
        type:Number,
        default:0
    }
})

module.exports = mongoose.model("User", Userschema);

