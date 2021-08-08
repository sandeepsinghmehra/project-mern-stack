import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import moment from 'moment';
import {BiLowVision} from 'react-icons/bi';
import { htmlToText } from 'html-to-text';
import { updateAction, fetchPosts, userDetail } from '../../../../src/store/asyncMethods/PostMethods';

const UserDetail = () => {
    const {id} = useParams();
    const {user} = useSelector(state => state.AuthReducer);
    const {userObj, posts} = useSelector(state => state.PostReducer);
    const dispatch = useDispatch();
    console.log('userObj: ', userObj);
    const updatePostApproved = async (id) => {
        const confirm = window.confirm("Are you want to approved this Post?");
        if(confirm){
                try {
                    dispatch( updateAction({status: "true",id: id,}));
                } catch (error) {
                    console.log(error);
                }
        }
    }
    const updatePostPanding = async (id) => {
        const confirm = window.confirm("Are you want to panding this Post?");
        if(confirm){
                try {
                    dispatch( updateAction({status: "false",id: id,}));
                } catch (error) {
                    console.log(error);
                }
        }
    }

    useEffect(() => {
        dispatch(userDetail(id));
        dispatch(fetchPosts(id));
    },[dispatch, id]);
    return (
        <>
        <Sidebar />   
            <div className="main-content">
                <Navbar />
                
                    <div className="row mt-80">
                    <div className="col-4 p-15">
                       {user?.role === 'admin' ? <div className="user p-15 br-10">
                                    
                                        <div className="user_avtar">
                                            {userObj?.name ? userObj?.name[0] : ''}
                                        </div>
                                        <div className="user_header">
                                            <span>{userObj?.name}</span>
                                            <span>{moment(userObj?.createdAt).fromNow()}</span>
                                        </div>
                                    
                                                {userObj?.email}
                                            
                                            <div className="user_role">
                                               <span>User Role : <span style={{textTransform:'uppercase'}}>{userObj?.role} </span> </span>
                                               <span> {userObj?.role === 'user' ? 
                                                        <button className="btn btn-default">Make Admin</button>
                                                        : <button className="btn btn-default">Make User</button>
                                                        }
                                                </span>
                                            </div>
                                            <button className="btn btn-orange"  > Delete User </button>
            
                                </div>: 'You are not an Admin'}
                        </div>
                        <div className="col-8 p-15">
                        <div className="recent-grid" style={{gridTemplateColumns: "100%"}}>
                    <div className="projects">
                        <div className="card">
                            <div className="card-header">
                                <h2>Recent Posts</h2>
                                <button>See all <span className="las la-arrow-right"></span></button>
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
                        </div>
                    </div>
                
            </div>   
    </>
    )
}

export default UserDetail;
