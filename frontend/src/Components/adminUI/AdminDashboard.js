import React, {useEffect} from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import moment from 'moment';
import { htmlToText } from 'html-to-text';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { fetchAll } from '../../store/asyncMethods/PostMethods';
import CommonHeader from './CommonHeader';
import { BiLowVision } from "react-icons/bi";
const AdminDashboard = () => {
    const {posts, users} = useSelector(state => state.FetchAll);
    
    const dispatch = useDispatch();
    useEffect(() => {
            dispatch(fetchAll());
    }, [dispatch]);
   
    return (
        <>   
            <Sidebar />   
             <div className="main-content">
                
                <Navbar />
                <main>
                    <CommonHeader />
                        <div className="recent-grid">
                            <div className="projects">
                                <div className="card">
                                    <div className="card-header">
                                        <h2>Recent Posts</h2>
                                        <Link to="/posts"><button>See all <span className="las la-arrow-right"></span></button></Link>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                        <table width="100%">
                                                    <thead>
                                                        <tr>
                                                            <td width="30%">Post Title</td>
                                                            <td width="50%">Body</td>
                                                            <td width="10%">Date</td>
                                                            <td width="10%">Action</td>
                                                        </tr>
                                                    </thead>
                                                    {posts?.map(post => (<tbody>
                                                        <tr>
                                                            <td>{post?.title}</td>
                                                            <td>{htmlToText(post?.body?.slice(0,50))}</td>
                                                            <td> <span>{moment(post.createdAt).fromNow()}</span></td>
                                                        
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
                            <div className="customers">
                                <div className="card">
                                    <div className="card-header">
                                        <h3>New users</h3>
                                        <Link to="/users"><button>See all <span className="las la-arrow-right"></span></button></Link>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table width="100%">
                                                <thead>
                                                    <tr>
                                                        <td>User Name</td>
                                                        <td>User Email</td>
                                                        <td>Date</td>
                                                        <td>Action</td>
                                                    </tr>
                                                </thead>
                                                {  users?.map(user => (<tbody key={user._id}>
                                                    <tr>
                                                        <td>{user.name}</td>
                                                        <td>{user.email}</td>
                                                        <td> <span>{moment(user.updatedAt).fromNow()}</span></td>
                                                        <td><Link to={`/userdetails/${user._id}`} ><BiLowVision /></Link></td>
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
        </>);
};

export default AdminDashboard;
