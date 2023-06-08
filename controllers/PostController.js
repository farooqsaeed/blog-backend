const Post = require("../models/Post");

const createPost = async (req,res) => {
    
    try {

        await Post.create({
            title:req.body.title,
            image:"upload/"+req.file.filename,
            body:req.body.body,
            auther:req.body.auther,
            category:req.body.category,
        });

        res.json({
            success:true,
            message:'post created successfully!'
        })
        
    } catch (error) {

        res.json({
            success:false,
            error:error
        })
        
    }
}

const getAllPosts = async (req,res)=>{

    let posts = await Post.find({is_publish:true});

    res.json({
        success:true,
        message:'posts fetcehd successfully!',
        data:posts
    })
}

const getPostById = async (req,res)=>{

    let post = await Post.findById(req.params.id);

    res.json({
        success:true,
        message:'post fetcehd successfully!',
        data:post
    })
}

const updatePost = async (req,res) => {
     let updateImage = req.body.existingImage;

     if(updateImage == "" || updateImage ==null){
        updateImage = "upload/"+req.file.filename;
     }
     await Post.findByIdAndUpdate(req.params.id,{
        title:req.body.title,
        image:updateImage,
        body:req.body.body,
        auther:req.body.auther,
        category:req.body.category,
     });

    res.json({
        success:true,
        message:'post updated successfully!'
    });
}

const deletePost = async (req,res) => {

    await Post.findByIdAndDelete(req.params.id);

    res.json({
        success:true,
        message:'post deleted successfully!'
    });

}



module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
}