const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const create_jwt_token = async (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET);
}

const login = async (req,res) => {
    // find user by email
    let user = await User.findOne({email:req.body.email});
    if(user != null){
        let isValid = await bcrypt.compare(req.body.password,user.password);
        if(isValid){
            let jwtToken = await create_jwt_token(user._id);
            res.status(200).json({
                success:true,
                token:jwtToken,
                data:user
            })

        }else{
            res.status(401).json({
                success:false,
                message:"invalid password"
            });
        }
    }else{
        res.status(401).json({
            success:false,
            message:"invalid email"
        });
    }
}


module.exports = {
    login
}