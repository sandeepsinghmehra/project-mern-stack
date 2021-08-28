const express = require("express");
const router = express.Router();
const {
    createPost, 
    fetchPosts, 
    fetchPostbyUpdate, 
    updatePost, 
    updateValidations, 
    updateImage,
    deletePost,
    home,
    postDetails,
    postDetailsbyid,
    userDetailRoute,
    postComment,
    postLike,
    postUnlike,
    postHeart,
    postUnheart,
    fetchPostsById,
    deleteCommentByUser,
    deleteCommentByAdmin,
 } = require("../controllers/postController");

const auth = require("../utils/auth");

router.post('/create_post', auth, createPost );
router.post('/uploadimage', updateImage);
router.post('/update', [auth, updateValidations], updatePost );
router.post('/updateImage', auth, updateImage );
router.get("/posts/:id/:page", auth, fetchPosts );
router.get("/postID/:id", fetchPostsById);
router.get('/post/:id', auth, fetchPostbyUpdate );
router.get('/delete/:id', auth, deletePost );
router.get('/home/:page', home);
router.get('/explore/:id', postDetails);
router.get('/explorebyid/:id', postDetailsbyid);
router.get('/userdetail/:id', userDetailRoute);
router.post('/comment', auth, postComment);
router.get('/deleteCommentByUser/:id/:role', auth, deleteCommentByUser);
router.get('/deleteCommentByUser/:id/', auth, deleteCommentByAdmin);
router.put('/like', auth, postLike);
router.put('/unlike', auth, postUnlike);
router.put('/heart', auth, postHeart);
router.put('/unheart', auth, postUnheart);

module.exports = router;