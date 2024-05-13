const jwt = require('jsonwebtoken');
const USER = require('../modules/UserSchema');
const secretKey = 'your-32-character-long-secret-key';

const authenticate = async(req,res,next)=>{
    try {
        const token = req.headers.authorization;
console.log(token);
        const verifyToken =  jwt.verify(token,secretKey);
        console.log(verifyToken);

        const rootUser = await USER.findOne({_id:verifyToken._id});
        console.log(rootUser);

        if(!rootUser){
            // res.status(201).send('user not found');
            // console.log(error+'user not found');
            {throw new Error ('user not found')}
        };

        req.token = token
        req.rootUser = rootUser
        req.userId = rootUser._id

        next();

    } catch (error) {
        res.status(401).send('unauthorized:no token provide'+ error);
        console.log(error + ' error in authentication' );
    }
};

module.exports = authenticate;