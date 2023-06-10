const mongoose = require("mongoose");

const RestLinkSchema = new mongoose.Schema({
     hash:{
        type:String
     },
     email:{
        type:String
     },
     expire:{
        type:String
     }
},{timestamps:true});

const RestLink = mongoose.model("RestLink",RestLinkSchema);

module.exports = RestLink;