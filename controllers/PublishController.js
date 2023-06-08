const Post = require("../models/Post");

const publish = async (req,res) =>{
        
     await Post.findByIdAndUpdate(req.params.id,{
        is_publish:true  
     });

     res.json({
        success:true,
        message:"post publish successfully!"
     });
}

const unpublish = async (req,res) => {
     
    await Post.findByIdAndUpdate(req.params.id,{
        is_publish:false  
     });

     res.json({
        success:true,
        message:"post unpublish successfully!"
     });
}

const approvedByAdmin = async (req,res) =>{
    await Post.findByIdAndUpdate(req.params.id,{
        is_approvedByAdmin:true  
     });

     res.json({
        success:true,
        message:"post approved successfully!"
     });
}

module.exports = {
    publish,
    unpublish,
    approvedByAdmin
}