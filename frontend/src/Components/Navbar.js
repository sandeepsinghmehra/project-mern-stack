import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Link, useLocation } from "react-router-dom";
import {LOGOUT} from "../store/types/UserTypes";
import { AiFillHome, AiFillDashboard, AiOutlineHome, AiOutlineDashboard } from "react-icons/ai";
import { IoMdAddCircle, IoMdAddCircleOutline } from "react-icons/io";

const Navbar = () => {
    const location = useLocation();
    const {user} = useSelector((state) => state.AuthReducer);
    const dispatch = useDispatch();
    const logout = () =>{
        localStorage.removeItem('myToken');
        dispatch({type: LOGOUT });
    }
    const Links = user.role === 'user' ?  (
         <div className="navbar_right">
             <li className="navbar_right_mobile">
                <Link to="/">Home</Link>
            </li>
            <li className="navbar_right_mobile">
                <Link to="/create">Create Post</Link>
            </li>
            <li className="navbar_right_mobile">
                <Link to="/dashboard">{user.name}</Link>
            </li>
            <li>
                <span onClick={logout}>Logout</span>
            </li>
         </div>
         ) :  (
         <div className="navbar_right">
            <li>
                <Link to="/login">Login</Link>
            </li>
            <li>
                <Link to="/register">Register</Link>
            </li>
        </div>
        );
    return (
        <>
        <nav className="navbar">
            <div className="container">
                <div className="navbar_row">
                    <div className="navbar_left">
                        <Link to="/" >
                           <h2 style={{paddingLeft: '2rem'}}> Articles </h2>
                        </Link>
                    </div>
                 {Links}
                </div>
            </div>
        </nav>
        {user.role === 'user' ?
        <div className="navbar_bottom">
            {location.pathname === '/'?<span><Link to="/"><AiOutlineHome /></Link></span>:<span><Link to="/"><AiFillHome /></Link></span>}
            {location.pathname === '/create'?<span><Link to="create"><IoMdAddCircleOutline /></Link></span>:<span><Link to="/create"><IoMdAddCircle /></Link></span>}
            {location.pathname === '/dashboard'? <span><Link to="/dashboard"><AiOutlineDashboard /></Link></span>:<span><Link to="/dashboard"><AiFillDashboard /></Link></span>}  
        </div>: ''}
        </>
    )
}

export default Navbar;
