const nodemailer = require("nodemailer");
const RestLink = require("../models/RestLink");
const User = require("../models/User");
const md5 = require("md5");
const bcrypt = require("bcrypt");

const sendRestLink = async (mail,hash) => {

    let transporter = nodemailer.createTransport({
        name: "BlogSite.com",
        host: process.env.MAIL_HOST,
        port: 2525,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.MAIL_USER, // generated ethereal user
          pass: process.env.MAIL_PASSWORD, // generated ethereal password
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
    
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Blog" <blogsite@info.com>', // sender address
        to: mail, // list of receivers
        subject: "Reset Password", // Subject line
        text: "welcome to BlogSite", // plain text body
        html: `<div><p> <a href='http://127.0.0.1:4000/?hash=${hash}' >Set a new password</a> </p> <p>Sincerely,</p> <p>BlogSite</p></div>`, // html body
      });

     return true;

}


const restlink = async (req,res) => {
    try {

        let user = await User.findOne({email:req.body.email});

        if(user != null){
            let currentTimeStamp = new Date().getTime();
            let fiveMin = 60*5*1000;
            let expire = currentTimeStamp + fiveMin;
            let hash = md5(currentTimeStamp);
            await RestLink.create({
                hash:hash,
                email:req.body.email,
                expire:expire
            });

            await sendRestLink(req.body.email,hash);

            res.status(200).json({
                success:true,
                message:"please check your email!"
            })

        }else{
            res.status(401).json({
                success:false,
                message:"user not found!"
            })
        }
        
    } catch (error) {
        res.status(401).json({
            success:false,
            message:error
        })
    }

}

const ForgotPassword = async (req,res) =>{

    let result = await RestLink.findOne({hash:req.body.hash});

    if(result != null){
        let CurrentTime = new Date().getTime();
        console.log("current "+ CurrentTime)
        console.log("store "+ result.expire)
        if(Number(result.expire) > CurrentTime){

            if(req.body.new_password == req.body.confirm_password){
                
                let salt = await bcrypt.genSalt();
                let hashPassword = await bcrypt.hash(req.body.new_password,salt);
                await User.findOneAndUpdate({email:result.email},{
                    password:hashPassword
                });
                res.status(200).json({
                    success:true,
                    message:"your password has updated successfully!"
                });
            }else{
                res.status(401).json({
                    success:false,
                    message:"new password and confirm password are not same!"
                })
            }

        }else{
            res.status(401).json({
                success:false,
                message:"your link has expired!"
            })
        }
    }else{
        res.status(401).json({
            success:false,
            message:"invalid link!"
        })
    }

}



module.exports = {
    restlink,
    ForgotPassword
}
