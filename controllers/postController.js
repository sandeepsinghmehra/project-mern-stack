const formidable = require('formidable');
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const {body, validationResult} = require('express-validator');
const { htmlToText } = require('html-to-text');
const fs = require('fs');
const { resolveTxt } = require('dns');
const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.SECRET_KEY_API,
    secure: true
});

module.exports.createPost = (req, res)=>{
    const form = formidable({ multiples: true });
    form.parse(req, async (error, fields, files)=>{
        const {title, body, description, name, slug, id, status} = fields;
        const errors = [];
        if(title === ''){
            errors.push({msg: 'Title is required'});
        }
        if(description === ''){
            errors.push({msg: 'Description is required'});
        }
        if(body === ''){
            errors.push({msg: 'Body is required'});
        }
        if(slug === ''){
            errors.push({msg: 'Slug is required'});
        }
        if(Object.keys(files).length === 0){
            errors.push({msg: "Image is required"});
        } else {
            const {type} = files.image;
            const split = type.split('/');
            const extension = split[1].toLowerCase();
            if(extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png'){
                errors.push({msg: `${extension} is not a valid extension`});
            } else {
                files.image.name = uuidv4() + '.' + extension; // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
            }
        }
        const checkSlug = await Post.findOne({slug});
        if (checkSlug){
            errors.push({msg: 'Please choose a unique slug or URL'});
        }
        if(errors.length !== 0){
            return res.status(400).json({errors, files});
        } else{
            try {
                await cloudinary.uploader.upload(files.image.path, async (err, result)=>{
                 try {
                     const response = await Post.create({
                         title,
                         public_id: result.public_id,
                         body,
                         image: result.secure_url,
                         slug,
                         description,
                         userName: name,
                         status,
                         userId: id,
                     });
                     return res.status(200).json({
                         msg: 'Your Post have been created successfully',
                         response,
                     });
                 } catch (error) {
                     return res.status(500).json({errors: error, msg: error.message})
                 }
                });
            } catch (error) {
                console.log(error);
            }
           
                    
        }
    });
};

module.exports.fetchPosts = async (req, res) => {
    const id = req.params.id;
    const page = req.params.page;
    const perPage = 3;
    const skip = (page - 1) * perPage;
    try {
        const count = await Post.find({userId: id}).countDocuments();
        const response = await Post.find({userId: id}).skip(skip).limit(perPage).sort({updatedAt: -1});
        return res.status(200).json({response: response, count, perPage});
    } catch (error) {
        return res.status(500).json({errors: error, msg: error.message});
    }
};
module.exports.fetchPost = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await Post.findOne({ _id: id });
        return res.status(200).json({ response });
    } catch (error) {
        return res.status(500).json({errors: error, msg: error.message});
    }
};
module.exports.fetchPostbyUpdate = async (req, res) => {
    const id = req.params.id;
    try {
        const post = await Post.findOne({ _id: id });
        return res.status(200).json({ post });
    } catch (error) {
        return res.status(500).json({errors: error, msg: error.message});
    }
};
module.exports.updateValidations =[
    body('title').notEmpty().trim().withMessage('Title is required'),
    body('body').notEmpty().trim().custom(value => {
        let bodyValue = value.replace(/\n/g, '');
        if(htmlToText(bodyValue).trim().length === 0){
            return false;
        } else {
            return true;
        }
    }).withMessage('Body is required'),
    body('description').notEmpty().trim().withMessage('Description is required'),
];
module.exports.updatePost = async (req, res) => {
    const {title, body, description, id} = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    } else {
        try {
            const response = await Post.findByIdAndUpdate(id, {
                title,
                body,
                description,
            });
            return res.status(200).json({msg: 'Your post has been updated.'})
        } catch (error) {
            return res.status(500).json({errors: error, msg: error.message});
        }
    }
};

module.exports.updateImage = async (req, res) => {
    const form = formidable({multiples: true});
        form.parse(req, async (errors, fields, files) =>{
            const {id} = fields;
            const imgerrors = [];
            if(Object.keys(files).length === 0){
                imgerrors.push({msg: 'Please choose an Image'});
            } else {
                const  {type} = files.image;
                const split = type.split('/');
                const extension = split[1].toLowerCase();
                if(extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png'){
                    imgerrors.push({msg: `${extension} is not a valid extension`});
                } else {
                    files.image.name = uuidv4() + '.' + extension; // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'                    
                }
            }
            if(imgerrors.length !== 0){
                return res.status(400).json({errors: imgerrors});
            } else {
                try {
                    const post = await Post.findById(id);
                    await cloudinary.uploader.destroy(post.public_id, { invalidate: true, resource_type: "image" });
                    await cloudinary.uploader.upload(files.image.path, async (err, result)=>{
                        await  Post.findByIdAndUpdate(id, {
                            public_id: result.public_id,
                            image: result.secure_url
                        }, 
                            {new : true}
                        );
                         
                        return res.status(200).json({ msg: 'Your image has been updated'});
                    });
                   
                } catch (error) {
                    return res.status(500).json({errors: error, msg: error.message});
                }
            }
        });
};

module.exports.deletePost = async (req, res) => {
    const id = req.params.id; 
    try {
        const post = await Post.findById(id);
        await cloudinary.uploader.destroy(post.public_id, { invalidate: true, resource_type: "image" }, (err, result)=>{
            console.log('result: ', result);
            console.log('error', err);
        });
        const response = await post.remove();
        return res.status(200).json({msg: 'Your post has been deleted'});
    } catch (error) {
        return res.status(500).json({errors: error, msg: error.message});
    }
};

module.exports.home = async (req, res) => {
    const page = req.params.page;
    const perPage = 3;
    const skip = (page - 1) * perPage;
    try {
        const count = await Post.find({}).countDocuments();
        const posts = await Post.find({status: true}).skip(skip).limit(perPage).sort({createdAt: -1});
        return res.status(200).json({response: posts, count, perPage});
    } catch (error) {
        return res.status(500).json({errors: error, msg: error.message});
    }
};

module.exports.postDetails = async (req, res) => {
    const id = req.params.id;
    try {
        const post = await Post.findOne({ slug : id});
        const comments = await Comment.find({postId: post._id}).sort({updatedAt: -1});
        return res.status(200).json({post, comments});
    } catch (error) {
        return res.status(500).json({errors: error, msg: error.message});
    }
};
module.exports.postDetailsbyid = async (req, res) => {
    const id = req.params.id;
    try {
        const post = await Post.findOne({ _id : id});
        const comments = await Comment.find({postId: post._id}).sort({updatedAt: -1});
        return res.status(200).json({post, comments});
    } catch (error) {
        return res.status(500).json({errors: error, msg: error.message});
    }
};
module.exports.fetchPostsById = async (req, res) => {
    const id = req.params.id;
    try {
        const posts = await Post.find({userId: id});
        return res.status(200).json({posts});
    } catch (error) {
        return res.status(500).json({errors: error, msg: error.message});
    }
}
module.exports.userDetailRoute = async (req, res) => {
    const id = req.params.id;
    try {
            const response = await User.findById({_id : id});
            return res.status(200).json({response});
        } catch (error) {
        return res.status(500).json({errors: error, msg:error.message});
    }
}
module.exports.postComment = async (req, res) => {
    const {id, comment, userName, userRole} = req.body;
    try {
        const response = await Comment.create({postId: id, comment: comment, userName: userName, userRole: userRole});
        return res.status(200).json({msg: 'Your comment has been published'});
    } catch (error) {
        return res.status(500).json({errors: error, msg: error.message});
    }
};
module.exports.deleteCommentByUser = async (req, res) =>{
    const id = req.params.id;
    const role = req.params.role;
    try {
        if(role === 'user'){
            await Comment.findByIdAndDelete(id);   
            return res.status(200).json({msg: 'This comment has been deleted.'});
        }
     
    } catch (error) {
        return res.status(500).json({errors: error});
    }
}
module.exports.deleteCommentByAdmin = async (req, res) =>{
    const id = req.params.id;
    const role = req.params.role;
    try {
        if(role === 'admin'){
            await Comment.findByIdAndDelete(id);   
            return res.status(200).json({msg: 'This comment has been deleted.'});
        }
    } catch (error) {
        return res.status(500).json({errors: error});
    }
}

module.exports.postLike = async (req, res) => {
    const {postid} = req.body;
    const id = req.user._id;
    try {
        const response = await Post.findByIdAndUpdate(postid, {$addToSet: {likes: id}}, {new: true}, async(err, result)=>{
            if(err){
                return res.status(422).json({error: err});
            }
            await Post.findByIdAndUpdate(postid, {$pull: {unLikes:id}}, {new: true}, async(err, result)=>{
                if(err){
                    return res.status(422).json({error: err});
                }
                return res.status(200).json({response: result});
            });
        })
    } catch (error) {
        console.log(error);
    }
}
module.exports.postUnlike = async (req, res) => {
    const {postid} = req.body;
    const id = req.user._id;
    try {
        await Post.findByIdAndUpdate(postid, {$addToSet: {unLikes: id}}, {new: true}, async(err, result)=>{
            if(err){
                return res.status(422).json({error: err});
            }
            await Post.findByIdAndUpdate(postid, {$pull: {likes: id}}, {new: true}, async(err, result)=>{
                if(err){
                    return res.statues(422).json({error: err});
                }
                return res.status(200).json({response: result});
            });
        });
    
    } catch (error) {
        console.log(error);
    }
}
module.exports.postHeart = async (req, res) => {
    const {postid} = req.body;
    const id = req.user._id;
    try {
        const response = await Post.findByIdAndUpdate(postid, {$addToSet: {hearts: id}}, {new: true});
        return res.status(200).json({response});
    } catch (error){
        console.log(error);
    }
}
module.exports.postUnheart = async (req, res) => {
    const {postid} = req.body;
    const id = req.user._id;
    try {
        const response = await Post.findByIdAndUpdate(postid, {$pull: {hearts: id}}, {new: true});
        return res.status(200).json({response});
    } catch (error){
        console.log(error);
    }
}