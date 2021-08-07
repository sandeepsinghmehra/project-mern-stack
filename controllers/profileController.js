const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();



module.exports.updateName = async (req, res)=>{
    const {name, id} = req.body;
    if(name === ''){
        return res.status(400).json({errors: [{msg: 'Name is required'}]})
    } else {
        try {
            const user = await User.findOneAndUpdate({_id: id}, {name: name}, {new: true});
            const token = jwt.sign({ user }, process.env.SECRET_KEY, {
                expiresIn: '7d',
            });
            return res.status(200).json({token, msg: 'Your name has been changed'});
        } catch (error) {
            return res.status(500).json({errors});
        }
    }
}

module.exports.updatePasswordValidations = [
    body('current').not().isEmpty().trim().withMessage("Current password is required"),
    body('newPasswd').isLength({min:6}).withMessage('New Password must be 6 character!!!'),
];
module.exports.updatePassword = async (req, res) => {
    const {current, newPasswd, userId} = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    } else {
        const user = await User.findOne({_id: userId})
        if(user){
            const matched = await bcrypt.compare(current, user.password);
            if(!matched){
                return res.status(400).json({errors: [{msg: 'Current password is wrong'}]})
            } else {
                try {
                    // hash password
                    const salt = await bcrypt.genSalt(10);
                    const hash = await bcrypt.hash(newPasswd, salt);
                    const newUser = await User.findOneAndUpdate({_id: user}, {password: hash}, {new: true});
                    return res.status(200).json({ msg: 'Your password has been Updated.' });
                } catch (error) {
                    return res.status(500).json({errors});
                }
            }
        }
    }
    
};