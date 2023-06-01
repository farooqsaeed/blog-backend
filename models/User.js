const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
   
     first_name:{
        type:String,
        required:[true,"first name is required"]
     },
     last_name:{
        type:String,
        required:[true,"last name is required"]
     },
     email:{
        type:String,
        lowercase: true,
        unique: true,
        required:[true,"email is required"]
     },
     password:{
        type:String,
        required:[true,"password is required"]
     },
     role:{
        type:String,
     },
     profile:{
        type:String,
        default:""
     }

},{timestamps:true});

const User = mongoose.model("User",UserSchema);

module.exports = User;