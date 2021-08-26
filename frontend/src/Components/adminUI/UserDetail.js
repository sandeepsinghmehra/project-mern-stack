import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useHistory} from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Loader from '../Loader';
import moment from 'moment';
import {BiLowVision} from 'react-icons/bi';
import {FcApproval} from 'react-icons/fc';
import {VscUnverified} from 'react-icons/vsc';
import { htmlToText } from 'html-to-text';
import { updateActionStatus,
      fetchPostUserId, 
      userDetail, 
      makeRole,
      deleteUserById,
      blockUnblockUserById, 
    } from '../../store/asyncMethods/PostMethods';

const UserDetail = () => {
    const {id} = useParams();
    const {push} = useHistory();
    const {user,} = useSelector(state => state.AuthReducer);
    const {userObj, loading, posts, redirect} = useSelector(state => state.PostReducer);
    const dispatch = useDispatch();
    const updatePostApproved = async (id) => {
        const confirm = window.confirm("Are you want to approved this Post?");
        if(confirm){
            dispatch( updateActionStatus({status: "true",id: id,}));
        }
    }

    const updatePostPanding = async (id) => {
        const confirm = window.confirm("Are you want to panding this Post?");
        if(confirm){
            dispatch(updateActionStatus({status: "false", id: id,}));
        }
    }
    const makeAdmin = async (id, name) => {
        const confirm = window.confirm(`Are you want to make this User ${name} to Admin ${name}?`);
        if(confirm){
            dispatch(makeRole({ id: id, role: "admin"}));
        }
    }
    const makeUser = async (id, name) => {
        const confirm = window.confirm(`Are you want to make this Admin ${name} to User ${name}?`);
        if(confirm){
            dispatch(makeRole({ id: id, role: "user", }));
        }
    }
    const deleteUser = async (id, role, name) => {
        const confirm = window.confirm(`Are you want to Delete ${name} Permanently?`);
        if(confirm){
            dispatch(deleteUserById(id, role));
        }
    }
    const blockUser = async (id, name) => {
        const confirm = window.confirm(`Are you want to Block ${name} ?`);
        if(confirm){
            dispatch(blockUnblockUserById( {id: id, blockStatus: 'true'}));
        };
    }
    const unBlockUser = async (id, name) => {
        const confirm = window.confirm(`Are you want to UnBlock ${name} ?`);
        if(confirm){
            dispatch(blockUnblockUserById( {id: id, blockStatus: 'false'}));
        };
    }
    useEffect(() => {
        dispatch(userDetail(id));
        dispatch(fetchPostUserId(id));
    },[dispatch, id]);
    useEffect(()=>{
        if(redirect){
            push('/users');
        }
    }, [redirect, push]);

    return (
        <>
        {!loading ? <><Sidebar />   
                <div className="main-content">
                    <Navbar />
                
                    <div className="row mt-80">
                    <div className="col-4 p-15">
                       {user?.role === 'admin' ? <div className="user recent-grid ">
                                    
                                        <div className="user_avtar">
                                            {userObj?.name ? userObj?.name[0] : ''}
                                        </div>
                                        <div className="user_header">
                                            <span>{userObj?.name}</span>
                                            <span className="user_header_email">{userObj?.email}</span>
                                        </div>
                                            
                                        
                                            <div className="user_role">
                                               <span>User Role : {userObj?.role} </span>
                                           
                                            </div>
                                            <span> {userObj?.role === 'user' ? 
                                                        <button className="btn btn-default" onClick={()=>makeAdmin(userObj?._id, userObj?.name)}>Make Admin</button>
                                                        : <button className="btn btn-default" onClick={()=>makeUser(userObj?._id, userObj?.name)}>Make User</button>
                                                        }
                                            </span>
                                            <div className="user_button">
                                                <button onClick={() => deleteUser(userObj?._id, userObj?.role, userObj?.name)} className="btn btn-orange user_button_div"> Delete User </button>
                                                {userObj?.blockStatus === 'false'? 
                                                <button onClick={() => blockUser(userObj?._id, userObj?.name)} className="btn btn-red user_button_div">Block User</button>:
                                                <button onClick={() => unBlockUser(userObj?._id, userObj?.name)} className="btn btn-blue user_button_div">UnBlock User</button>}
                                            </div>
                                           
            
                                </div>: 'You are not an Admin'}
                        </div>
                        <div className="col-8">
                        <div className="recent-grid" style={{gridTemplateColumns: "100%", marginRight: "2rem", marginLeft: "2rem"}}>
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
                                                    {posts?.map(post => (<tbody key={post._id}>
                                                        <tr>
                                                            <td>{post?.title}</td>
                                                            <td>{htmlToText(post?.body?.slice(0,50))}</td>
                                                            <td> <span>{moment(post.updatedAt).fromNow()}</span></td>
                                                            <td>
                                                                <span className="status orange">
                                                                    {post.status === 'false' ? 
                                                                    <button className="btn" onClick={() => updatePostApproved(post._id)}><VscUnverified color="red"/> </button>:
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
                        </div>
                    </div>
                </div>  </>: <Loader />} 
    </>
    )
}

export default UserDetail;
