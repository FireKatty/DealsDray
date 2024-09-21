const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    s_no: { 
        type: Number, 
        unique: true 
    },
    fullName:{
        type:String,
        required:true
    },
   userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minlength:8
    }
});

const User = mongoose.model("t_login",userSchema);
module.exports = User;