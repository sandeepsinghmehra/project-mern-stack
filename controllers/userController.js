const { body, validationResult } = require('express-validator');

const User = require('../models/User');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createToken = (user) => {
     return jwt.sign({user}, process.env.SECRET_KEY, {
        expiresIn: '7d'
    });
}

module.exports.registerValidations = [
    body('name').not().isEmpty().trim().withMessage("Name is required"),
    body('email').not().isEmpty().trim().withMessage("Email is required"),
    body('password').isLength({min:6}).withMessage('Password must be 6 character!!!')
];

module.exports.register = async (req, res) =>{
    const{ name, email, password, role} = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const checkUser = await User.findOne({email});
        if(checkUser){
            return res.status(400).json({errors: [{msg: 'Email is already taken'}]});
        }
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        try {
            const user = await User.create({
                name,
                email,
                password: hash,
                role,
            });
            const token = createToken(user);
            return res.status(200).json({msg: 'Your accout has been created', token});
        } catch (error) {
            return res.status(500).json({ errors: error})
        }

    } catch (error) {
        return res.status(500).json({ errors: error})
    }
    
};


module.exports.loginValidations = [
    body('email').not().isEmpty().trim().withMessage("Email is required"),
    body('password').not().isEmpty().withMessage('Password is required!!!')
];

module.exports.login = async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    const{ email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(user){
            const matched = await bcrypt.compare(password, user.password);
            if(matched){
                const token = createToken(user);
                return res.status(200).json({msg: 'You have login successfully', token});
            } else{
                return res.status(401).json({errors: [{msg: 'Password is not correct'}]})
            }
        } else{
            return res.status(404).json({errors: [{msg: 'Email not found'}]})
        }
    } catch (error) {
        return res.status(500).json({ errors: errors});
    }
};

module.exports.adminlogin = async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    const{ email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(user){
            if(user.role === 'admin'){
                const matched = await bcrypt.compare(password, user.password);
                if(matched){
                    const token = createToken(user);
                    return res.status(200).json({msg: 'You have login successfully', token});
                } else{
                    return res.status(401).json({errors: [{msg: 'Password is not correct'}]});
                }
            } else { 
                return res.status(404).json({errors: [{msg: 'You are not an Admin'}]});
            }
        } else{
            return res.status(404).json({errors: [{msg: 'Email not found'}]});
        }
    } catch (error) {
        return res.status(500).json({ errors: errors});
    }
};