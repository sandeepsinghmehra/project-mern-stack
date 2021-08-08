import { useSelector, useDispatch } from "react-redux";
import { FaBars } from 'react-icons/fa';
import { LOGOUT } from '../store/types/UserTypes';

const Navbar = () => {
    const {
        user : {
            name, role
        }
    } = useSelector((state)=> state.AuthReducer);
    const dispatch = useDispatch();
    const logout = () =>{
        localStorage.removeItem('myToken');
        dispatch({type: LOGOUT });
    }
    return (
        <>
            <header>
                    <h2>
                        <label htmlFor="nav-toggle">
                            <span><FaBars /></span>
                        </label>
                        Dashboard
                    </h2>
                    <div className="user-wrapper">
                        <img src="profile.jpg" width="40px" height="40px" alt="" />
                        <div>
                            <h4>{name}</h4>
                            <small>Super {role}</small>
                        </div>
                        <span onClick={logout}>LogOut</span>
                    </div>
            </header>  
        </>
    )
}

export default Navbar;
