const User = require("../models/User");

const updateUserProfile = async (req,res) =>{

    await User.findByIdAndUpdate(req.params.id,{
        profile:"upload/"+req.file.filename
    });

    res.status(201).json({
        success:true,
        message:"user profile updated successfully!"
    })
}

module.exports = {
    updateUserProfile
}