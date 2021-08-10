import React, {useEffect} from 'react';
import Navbar from './Navbar';
import { fetchAll } from '../../store/asyncMethods/PostMethods';
import { useSelector, useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { BiLowVision } from "react-icons/bi";
import Sidebar from './Sidebar';
import CommonHeader from './CommonHeader';

const UserList = () => {
    const {users} = useSelector(state => state.FetchAll);
    console.log('reduceUserList', users);
    const dispatch = useDispatch();
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
                            <div className="recent-grid">
                                <div className="projects">
                                        <div className="card">
                                            <div className="card-header">
                                                <h2>All Users</h2>
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
        </>
    )
}

export default UserList;
