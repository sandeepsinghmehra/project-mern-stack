import React, { useEffect } from 'react';
import Navbar from './Navbar';
import { updateActionStatus, fetchAll } from '../../store/asyncMethods/PostMethods';
import { useSelector, useDispatch} from 'react-redux';
import moment from 'moment';
import { htmlToText } from 'html-to-text';
import { BiLowVision } from "react-icons/bi";
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import CommonHeader from './CommonHeader';

const PostList = () => {
    const {posts} = useSelector(state => state.FetchAll);
    const dispatch = useDispatch();

    const updatePostApproved = async (id) => {
        const confirm = window.confirm("Are you want to approved this Post?");
        if(confirm){
                try {
                    dispatch( updateActionStatus({status: "true",id: id,}));
                } catch (error) {
                    console.log(error);
                }
        }
    }
    const updatePostPanding = async (id) => {
        const confirm = window.confirm("Are you want to pending this Post?");
        if(confirm){
                try {
                    dispatch( updateActionStatus({status: "false",id: id,}));
                } catch (error) {
                    console.log(error);
                }
        }
    }
  
    useEffect(()=>{
        dispatch(fetchAll());
    }, [dispatch]);
    return (
        <>
            <Sidebar />
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
                                                    {posts?.map(post => (<tbody>
                                                        <tr>
                                                            <td>{post?.title}</td>
                                                            <td>{htmlToText(post?.body?.slice(0,50))}</td>
                                                            <td> <span>{moment(post.updatedAt).fromNow()}</span></td>
                                                            <td>
                                                                <span className="status orange">
                                                                    {post.status === 'false' ? 
                                                                    <button className="btn btn-default" onClick={() => updatePostApproved(post._id)}>Panding</button>:
                                                                    <button className="btn btn-default btn-green" onClick={() => updatePostPanding(post._id)}>Approved</button>}
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
            </div>
        </>
    )
}

export default PostList;
