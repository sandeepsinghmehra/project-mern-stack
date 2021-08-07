import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import {htmlToText} from "html-to-text";
import { postDetails, postComment, addLike, DisLike, notGiveHeart, giveHeart } from '../store/asyncMethods/PostMethods';
import Loader from './Loader';
import Comments from './Comments';
import { Helmet } from 'react-helmet';
import { AiFillLike, AiFillDislike, AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import {BsHeart, BsFillHeartFill } from 'react-icons/bs';


const Details = () => {
    const { id } = useParams();
    const [ comment, setComment ] = useState('');
    const { user } = useSelector(state => state.AuthReducer);
    
    const { loading, details, comments} = useSelector((state) => state.PostReducer);
    
    const dispatch = useDispatch();
    const addComment = (e) => {
        e.preventDefault();
        dispatch(postComment({id: details._id, comment, userName: user.name}));
        setComment('');
        dispatch(postDetails(id));
    }
    
    const like = (id) => {
            dispatch(addLike(id));
    }
    const Unlike = (id) => {
        dispatch(DisLike(id));
    }
    const addHeart =(id)=>{
        dispatch(giveHeart(id));
    }
    const notHeart = (id) => {
        dispatch(notGiveHeart(id));
    }
    useEffect(() => {
        dispatch(postDetails(id));
    }, [dispatch,id]);
    return (
        <>    
            <div className="container">
            <Helmet>
                <title>{details.title}</title>
                <meta 
                    name="description"
                    content={details.description}
                />
            </Helmet>
                <div className="row mt-100">
                    <div className="col-8 p-15">
                    {!loading ? (<div className="details p-15 br-10">
                        <div className="details_header">
                            <div className="details_header_avatar">
                                {details.userName ? details.userName[0] : '' }
                            </div>
                            <div className="details_header_user">
                                <span>{details.userName}</span>
                                <span>{moment(details.updatedAt).format('MMM Do YY')}</span>
                            </div>
                        </div>
                    
                       <div className="details_body p-10">
                            <h1 className="details_body_title">
                                {details.title}
                            </h1>
                            <div className="details_body_details">
                                {htmlToText(details.body)}
                            </div>
                            <div className="details_body_image">
                                    <img src={`/images/${details.image}`} alt={details.image} />
                            </div>
                        </div>
                    { details.userName ? 
                    <div className="Likes">
                    { details?.likes?.includes(user._id) ? 
                        <AiFillLike className="icon" onClick={()=>like(details._id)}/> 
                        :
                        <AiOutlineLike className="icon" onClick={()=>like(details._id)}/>
                        }
                        <span className="Likes_card">{details?.likes?.length}  like </span>
                    { details?.unLikes?.includes(user._id) ?
                        <AiFillDislike className="icon" onClick={()=>Unlike(details._id)} />:
                        <AiOutlineDislike className="icon" onClick={()=>Unlike(details._id) } />
                        }
                        <span className="Likes_card">{details?.unLikes?.length} dislike </span>

                    { details?.hearts.includes(user._id) ?
                        <BsFillHeartFill className="icon" style={{color: "red" }} onClick={()=>notHeart(details._id)} />
                        :
                        <BsHeart className="icon" style={{color: "red" }} onClick={()=>addHeart(details._id)} />
                        }
                        <span className="Likes_card">{details?.hearts?.length}</span>
                    </div>
                    :'no like'
                    }
                    
                     
                   {user ?
                   <>
                    <div className="post_comment">
                       <form onSubmit={addComment}>
                           <div className="group">
                               <input 
                                    type="text" 
                                    className="group_control" 
                                    placeholder="write a comment..."
                                    onChange={(e) => setComment(e.target.value)}
                                    value={comment}
                                />
                            </div>
                           <div className="group">
                               <input type="submit" value="Post comment" className="btn btn-default" />
                           </div>
                       </form>
                       </div>
                       
                       </> : 
                       <div className="mt-20">
                           <Link to="/login" className="btn btn-default" style={{background: "blue"}}>
                               Login Here to comment
                           </Link>
                       </div>
                       }
                       <Comments comments={comments} />
                   </div>) : (<Loader />)}
                    </div>
                </div>
            </div>
        </>
    )
};

export default Details;
