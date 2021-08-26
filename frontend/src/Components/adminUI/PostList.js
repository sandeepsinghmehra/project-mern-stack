import React, { useEffect } from 'react';
import Navbar from './Navbar';
import { updateActionStatus, fetchAll } from '../../store/asyncMethods/PostMethods';
import { RESET_UPDATE_ERRORS } from '../../store/types/PostTypes';
import { useSelector, useDispatch} from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';
import toast, { Toaster } from 'react-hot-toast';
import { htmlToText } from 'html-to-text';
import { BiLowVision } from "react-icons/bi";
import Sidebar from './Sidebar';
import Loader from '../Loader';
import CommonHeader from './CommonHeader';
import {FcApproval} from 'react-icons/fc';
import {VscUnverified} from 'react-icons/vsc';

const PostList = () => {
    const {push} = useHistory();
    const { loading, redirect } = useSelector( state => state.PostReducer);
    const {posts} = useSelector(state => state.FetchAll);
    const { editErrors } = useSelector(state => state.UpdatePost);
    const dispatch = useDispatch();

    const updatePostApproved = async (id) => {
        const confirm = window.confirm("Are you want to approved this Post?");
        if(confirm){
            dispatch( updateActionStatus({status: "true",id: id,}));
            dispatch(fetchAll());
        }
    }
    const updatePostPanding = async (id) => {
        const confirm = window.confirm("Are you want to pending this Post?");
        if(confirm){
            dispatch( updateActionStatus({status: "false",id: id,}));
            dispatch(fetchAll());
        }
    }
  
    useEffect(()=>{
        dispatch(fetchAll());
    }, [dispatch]);
    useEffect(()=>{
        if(editErrors.length !== 0){
            editErrors.map((error) => toast.error(error.msg));
            dispatch({type: RESET_UPDATE_ERRORS});
        }
    },[dispatch, editErrors]);
    useEffect(()=>{
        if(redirect){
            push('/posts');
        }
    }, [redirect, push]);
    return (
        <>
         <Toaster
             position='top-right'
              reverseOrder={false}
              toastOptions={{
                  style: {
                      fontSize: '14px'
                  },
              }}
            />
            {!loading ?<> <Sidebar />
               <div className="main-content">
                <Navbar />
                <main>
                    <CommonHeader />
                    
                <div className="recent-grid" style={{gridTemplateColumns: "100%"}}>
                    <div className="projects">
                        <div className="card">
                            <div className="card-header">
                                <h2>All Posts</h2>
                            </div>
                                        <div className="card-body">
                                            <div className="table-responsive">
                                                <table width="100%">
                                                    <thead>
                                                        <tr>
                                                            <td width="20%">Post Title</td>
                                                            <td width="50%">Body</td>
                                                            <td width="10%">Date</td>
                                                            <td width="10%">Status</td>
                                                            <td width="10%">Action</td>
                                                        </tr>
                                                    </thead>
                                                    {posts?.map(post => (<tbody key={post._id}>
                                                        <tr>
                                                            <td>{post?.title}</td>
                                                            <td>{htmlToText(post?.body?.slice(0,50))}</td>
                                                            <td> <span>{moment(post.updatedAt).fromNow()}</span></td>
                                                            <td>
                                                                <span className="status orange">
                                                                    {post.status === 'false' ? 
                                                                    <button className="btn" onClick={() => updatePostApproved(post._id)}><VscUnverified color="red"/></button>:
                                                                    <button className="btn" onClick={() => updatePostPanding(post._id)}><FcApproval /> </button>}
                                                                </span>
                                                            </td>
                                                            <td style={{textAlign:"center"}}>
                                                                <Link to={`/postdetails/${post._id}`} >
                                                                    <BiLowVision />
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                    ))}
                                                </table>
                                            </div>
                                        </div>
                        </div>
                    </div>
                </div>
                </main>
            </div></> : <Loader />}
        </>
    )
}

export default PostList;
