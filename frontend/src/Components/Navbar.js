import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from "react-router-dom";
import {LOGOUT} from "../store/types/UserTypes";
import { AiFillHome } from "react-icons/ai";
import { IoMdAddCircle } from "react-icons/io";
import { GoDashboard } from "react-icons/go";
const Navbar = () => {
    const {user} = useSelector((state) => state.AuthReducer);
    const dispatch = useDispatch();
    const logout = () =>{
        localStorage.removeItem('myToken');
        dispatch({type: LOGOUT });
    }
    const Links = user ?  (
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
        {user ?
        <div className="navbar_bottom">
            <span><Link to="/"><AiFillHome /></Link></span>
            <span><Link to="/create"><IoMdAddCircle /></Link></span>
            <span><Link to="/dashboard"><GoDashboard /></Link></span>
        </div>: ''}
        </>
    )
}

export default Navbar;
