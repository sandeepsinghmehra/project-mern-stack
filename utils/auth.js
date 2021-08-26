const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = (req, res, next)=>{
    const authHeaders = req.headers.authorization;
    const token = authHeaders.split("Bearer ")[1];
    try {
        jwt.verify(token, process.env.SECRET_KEY, (err,payload)=>{
            if(err){
                return res.status(401).json({errors: [{msg: error.message}]});
            }
            const {user:{_id}} = payload;
            User.findById(_id).then(userdata=>{
                req.user = userdata;
                next();
            });
        });
    } catch(error){
        return res.status(401).json({errors: [{msg: error.message}]});
    }
};