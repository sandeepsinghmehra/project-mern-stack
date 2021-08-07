const app = require("express");
const Comment = require('../models/Comment');
const User = require('../models/User');
const Post = require('../models/Post');
const router = app.Router();


router.get("/users", async (req, res)=>{
    try {
        const users = await User.find();
        const posts = await Post.find();
        const comments = await Comment.find();
        if(users){
            return res.status(200).json({users, posts, comments });
        }
    } catch (error) {
        return res.status(500).json({ errors: error});
        
    }
} );


router.get("/posts", async (req, res)=>{
    try {
        const posts = await Post.find().sort({updatedAt: -1});
        const countPost = await Post.find({}).countDocuments();
        if(posts){
            return res.status(200).json({data : posts, countPost: countPost});
        }
    } catch (error) {
        return res.status(500).json({ errors: error});
        
    }
} );

router.post('/updatepost', async (req, res) => {
    const {id, status} = req.body;
        try {
            const response = await Post.findByIdAndUpdate(id, {status});
            return res.status(200).json({msg: 'Your post has been updated.'})
        } catch (error) {
            return res.status(500).json({errors: error, msg: error.message});
        }
    
});


module.exports = router;
