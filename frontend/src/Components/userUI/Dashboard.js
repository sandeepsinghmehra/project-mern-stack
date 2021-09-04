import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {REDIRECT_FALSE, REMOVE_MESSAGE, SET_LOADER, CLOSE_LOADER, SET_MESSAGE} from '../../store/types/PostTypes';
import {Helmet} from 'react-helmet';
import {Link, useParams} from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import {fetchPosts} from '../../store/asyncMethods/PostMethods';
import Loader from '../Loader';
import Sidebar from '../Sidebar';
import axios from 'axios';
import moment from 'moment';
import Pagination from '../Pagination';
import {BsPencil, BsImage} from 'react-icons/bs';
import {AiOutlineDelete} from 'react-icons/ai';
import { htmlToText } from 'html-to-text';
import Footer from '../Footer';
import ImageDashboard from '../../imgs/dashboard.jpg';
const Dashboard = () => {
    const { redirect, message, loading } = useSelector(state => state.PostReducer);
    const {user: {_id}, token,} = useSelector(state => state.AuthReducer);
    const { posts, count, perPage } = useSelector((state) => state.FetchPosts);
    let {page} = useParams();
    if(page === undefined){
        page = 1;
    }
    const dispatch = useDispatch();
    const deletePost = async (id) =>{
        const confirm = window.confirm("Are you want to delete this Post?");
        if(confirm){
            dispatch({type: SET_LOADER});
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                };
                const {data: {msg},} = await axios.get(`/delete/${id}`, config);
                dispatch(fetchPosts(_id, page));
                dispatch({type: SET_MESSAGE, payload: msg});
            } catch (error) {
                dispatch({type: CLOSE_LOADER});
                console.log(error);
            }
        }

    }
    useEffect(() => {
        if(redirect){
            dispatch({type: REDIRECT_FALSE});
        }
        if(message){
            toast.success(message);
            dispatch({type: REMOVE_MESSAGE});
        }
    }, [dispatch, message, redirect]);
    
    useEffect(() => {
        dispatch(fetchPosts(_id, page));
    }, [_id, dispatch, page]);
    return (
        <>
            <Helmet>
            <title>User Dashboard</title>
            <meta 
                name="description"
                content="User dashboard"
            />
        </Helmet>
        <Toaster
                 position='top-center'
                  reverseOrder={false}
                  toastOptions={{
                      style: {
                          fontSize: '14px'
                      },
                  }}
        />


        <div className="container mt-50">
            <div className="row pt-15">
                <div className="col-2 p-10">
                    <Sidebar />
                </div>
                <div className="col-10 p-10">
                    <div className="image" >
                        <img src={ImageDashboard} alt="dashboard" />
                    </div>
                    
                    {!loading ? posts.length > 0 ?
                    <div className="containerCard">
                        <div className="col-4" style={{display:'inline-block'}}>
                            <img src={`${posts[0].image}`} alt={posts[0].image} />
                        </div>
                        <div className="col-8" style={{display:'inline-block'}}>
                            <div className="containerCard_title">
                                <Link to={`/details/${posts[0].slug}`}>{posts[0].title}</Link>
                                <span>{htmlToText(posts[0].body.slice(0,320))}...</span>
                        
                                <hr />
                                <div className="dateIn">
                                    <span>Published {moment(posts[0].createdAt).fromNow()}</span>
                                    <span>Posted By: <span className="author"> {posts[0].userName} </span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    :'':''}
                    <div> 
                        <h2>Your Posts</h2> 
                    {!loading ? posts.length > 0 ? posts.map(post => (
                        <div className="col-4 p-10" style={{display:'inline-block',}} key={post._id}>
                            <div className="dashboard">
                                <div className="dashboard_card">
                                <div className="dashboard_card_image">
                                    <img src={`${post.image}`} alt={post.image} />
                                    <span className="dashboard_card_date">{moment(post.createdAt).format("MMM Do YY")}</span>
                                </div>
                                
                                <div className="dashboard_card_title">
                                    <h3><Link to={`/details/${post.slug}`}>{post.title}</Link></h3>
                                    <span className="body">{htmlToText(post.body.slice(0,100))}</span>
                                    <span><Link to={`/details/${post.slug}`}>Read More.</Link></span>
                                </div>
                                </div>
                                <div className="dashboard_links">
                                    <Link to={`/updateImage/${post._id}`}><BsImage className='icon' /></Link>
                                    <Link to={`/edit/${post._id}`}><BsPencil className="icon"/></Link>
                                    <AiOutlineDelete onClick={() => deletePost(post._id)} className="icon" />
                                </div> 
                                {post.status === 'true' ? <div className="dashboard_button">
                                                <input 
                                                    type="button"
                                                    value="approved"
                                                    className="btn btn-default btn-block"
                                                />
                                    </div>: <div className="dashboard_button">
                                        <input 
                                                type="button"
                                                value="pending"
                                                className="btn btn-orange btn-block"
                                            />
                                    </div>} 
                                </div>
                            </div>
                    )) : <div className="col-4 p-10">
                            <div><h1>No post here</h1></div>
                                <div className="mt-20">
                                    <Link to="/create" className="btn btn-default" style={{background: "blue"}}>create your first post</Link>
                                </div>
                         </div> : <Loader />}
                    </div>
                    <Pagination path="dashboard" page={page} perPage={perPage} count={count} />
                </div>
            </div>
            <Footer />
        </div> 

        </>
    )
}

export default Dashboard;
