const jwt = require('jsonwebtoken');


const authToken =  (req,res,next) => {

    if(req.headers.token){
        let userToken = req.headers.token;
        jwt.verify(userToken,process.env.JWT_SECRET,(err,decodedToken)=>{
            if(err){
                res.status(401).json({
                    'error':'invalid token!'
                });
            }else{
                req._id =  decodedToken.id;
                next();
            }
            
        }); 
    }else{
        res.status(401).json({
            'error':'invalid token!'
        });
    }

}

module.exports = {
    authToken
}

