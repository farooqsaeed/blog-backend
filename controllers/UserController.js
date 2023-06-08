const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const create_jwt_token = async (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET);
}

const createUser = async (req,res) => {
    
    try {

        let salt = await bcrypt.genSalt();
        let hashPssword = await bcrypt.hash(req.body.password,salt);

        let user = await User.create({
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            email:req.body.email,
            password:hashPssword,
            role:'user',
            profile:process.env.AVATER_IMAGE
        });

        let jwttoken = await create_jwt_token(user._id);

        res.json({
            success:true,
            token:jwttoken,
            data:user,
            message:'user registered successfully!'
        })
        
    } catch (error) {

        res.json({
            success:false,
            error:error
        })
        
    }
}

const getAllUsers = async (req,res)=>{

    let users = await User.find({});

    res.json({
        success:true,
        message:'users fetcehd successfully!',
        data:users
    })
}

const getUserById = async (req,res)=>{

    let user = await User.findById(req.params.id);

    res.json({
        success:true,
        message:'users fetcehd successfully!',
        data:user
    })
}

const updateUser = async (req,res) => {
     
     await User.findByIdAndUpdate(req.body.id,{
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email,
     });

    res.json({
        success:true,
        message:'user updated successfully!'
    });
}

const deleteUser = async (req,res) => {

    await User.findByIdAndDelete(req.params.id);

    res.json({
        success:true,
        message:'category deleted successfully!'
    });

}



module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}