const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    
   title:{
     type:String,
     required:[true,"blog title is required"]
   },
   image:{
    type:String,
    required:[true,"blog image is required"]
   },
   body:{
    type:String,
    required:[true,"blog body is required"]
   },
   auther:{
    type:String,
   },
   category:{
    type:String,
   },
   is_publish:{
    type:Boolean,
    default:false
   },
   is_approvedByAdmin:{
    type:Boolean,
    default:false
   },
   user_id:{
    
   }

},{timestamps:true});

const Post = mongoose.model("Post",PostSchema);

module.exports = Post;
