import { Link, useLocation } from 'react-router-dom';
import {FaUsers} from 'react-icons/fa';
import {GoDashboard} from 'react-icons/go';
import {BsFilePost} from 'react-icons/bs';
import {FaFont} from 'react-icons/fa';
const Sidebar = () => {
    const location = useLocation();
    return (
        <>
            <input type="checkbox" id="nav-toggle" />  
            <div className="sidebr">
                    <div className="sidebr-brand">
                        <h2><span><FaFont /></span> <span>Articles</span></h2>
                    </div>
                    <div className="sidebr-menu">
                        <ul>
                            <li>
                                <Link to="/admindashboard" className={(location.pathname === '/admindashboard') ? "active" : ''}>
                                    <span>
                                        <GoDashboard />
                                    </span>
                                    <span>Dashboard</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/users" className={location.pathname === '/users' ? "active": ''}>
                                    <span>
                                        <FaUsers />
                                    </span>
                                    <span>Users</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/posts" className={location.pathname === '/posts' ? "active" : ''}>
                                    <span>
                                        <BsFilePost />
                                    </span>
                                    <span>Posts</span></Link>
                            </li>
                        </ul>
                    </div>
                </div> 
        </>
    )
}

export default Sidebar;