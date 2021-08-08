import React, {useEffect} from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useDispatch} from 'react-redux';
import { fetchAll} from '../store/asyncMethods/PostMethods';
import CommonHeader from './CommonHeader';
const Dashboard = () => {
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
                                        <button>See all <span className="las la-arrow-right"></span></button>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table width="100%">
                                                <thead>
                                                    <tr>
                                                        <td>Project Title</td>
                                                        <td>Department</td>
                                                        <td>Status</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>UI/UX Design</td>
                                                        <td>UI Team</td>
                                                        <td>
                                                            <span className="status purple"></span>review
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Web Development</td>
                                                        <td>Frontend</td>
                                                        <td>
                                                            <span className="status pink"></span>in progress
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Ushop app</td>
                                                        <td>UI Team</td>
                                                        <td>
                                                            <span className="status orange"></span>Pending
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="customers">
                                <div className="card">
                                    <div className="card-header">
                                        <h3>New users</h3>
                                        <button>See all <span className="las la-arrow-right"></span></button>
                                    </div>
                                    <div className="card-body">
                                        <div className="customer">
                                            <div className="info">
                                                <img src="profile.jpg" width="40px" height="40px" alt="profile_photo" />
                                                <div>
                                                    <h4>Lewis s. Coufinght</h4>
                                                    <small>CEO experts</small>
                                                </div>
                                            </div>
                                
                                            <div className="contact">
                                                <span className="las la-user-circle"></span>
                                                <span className="las la-comment"></span>
                                                <span className="las la-phone"></span>
                                            </div>
                                        </div>
                                        <div className="customer">
                                            <div className="info">
                                                <img src="profile.jpg" width="40px" height="40px" alt="profile" />
                                                <div>
                                                    <h4>Lewis s. Coufinght</h4>
                                                    <small>CEO experts</small>
                                                </div>
                                            </div>
                                            <div className="contact">
                                                <span className="las la-user-circle"></span>
                                                <span className="las la-comment"></span>
                                                <span className="las la-phone"></span>
                                            </div>
                                        </div>
                    
                                        <div className="customer">
                                            <div className="info">
                                                <img src="profile.jpg" width="40px" height="40px" alt="profile" />
                                                <div>
                                                    <h4>Lewis s. Coufinght</h4>
                                                    <small>CEO experts</small>
                                                </div>
                                            </div>
                                            <div className="contact">
                                                <span className="las la-user-circle"></span>
                                                <span className="las la-comment"></span>
                                                <span className="las la-phone"></span>
                                            </div>
                                        </div>
                                        <div className="customer">
                                            <div className="info">
                                                <img src="profile.jpg" width="40px" height="40px" alt="profile" />
                                                <div>
                                                    <h4>Lewis s. Coufinght</h4>
                                                    <small>CEO experts</small>
                                                </div>
                                            </div>
                                            <div className="contact">
                                                <span className="las la-user-circle"></span>
                                                <span className="las la-comment"></span>
                                                <span className="las la-phone"></span>
                                            </div>
                                        </div>    
                                    </div>
                                </div>
                            </div>
                        </div>
                </main>
            </div>
        </>);
};

export default Dashboard;
