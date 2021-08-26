const app = require("express");
const Comment = require('../models/Comment');
const User = require('../models/User');
const Post = require('../models/Post');
const auth = require("../utils/auth");
const router = app.Router();


router.put('/updatepost', async (req, res) => {
    const {id, status} = req.body;
        try {
            const response = await Post.findByIdAndUpdate(id, {status}, {new:true}, (err, result)=>{
                if(err){
                    return res.status(422).json({error: err});
                }
                return res.status(200).json({response: result});
            });
            
        } catch (error) {
            return res.status(500).json({errors: error, msg: error.message});
        }
    
});

router.put("/makeRole", async (req, res)=>{
    const { id, role} = req.body;
    try {
        const response = await User.findByIdAndUpdate(id, {role}, {new: true}, async(err, result)=>{
            if(err){
                return res.status(422).json({error: err});
            }
            return res.status(200).json({response: result});
        });
    } catch (error) {
        return res.status(500).json({errors: error});
    }
});
router.put("/blockUnBlockUser", auth, async (req, res)=>{
    const {id, blockStatus} = req.body;
    try {
        const response = await User.findByIdAndUpdate(id, {blockStatus: blockStatus}, {new: true}, async(err, result)=>{
            if(err){
                return res.status(422).json({error:err});
            }
            return res.status(200).json({response: result});
        });
        
    } catch (error) {
        return res.status(500).json({errors: error});
    }
   
});

router.get("/users", async (req, res)=>{
    try {
        const users = await User.find();
        const posts = await Post.find().sort({ createdAt: -1 });
        const comments = await Comment.find();
        if(users){
            return res.status(200).json({ users, posts, comments });
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

router.get("/deleteUser/:id/:role", auth, async (req, res) =>{
    try {
        const id = req.params.id;
        const role = req.params.role;
        if(role === 'user') {
            await User.findByIdAndDelete(id);
            return res.status(200).json({msg: 'Your user has been deleted Permanently'});
        }
        if(role === 'admin') {
            return res.status(200).json({msg: 'This is Admin Account.'})
        }
    } catch (error) {
        return res.status(500).json({errors: error});
    }
})

module.exports = router;
