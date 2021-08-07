import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import {updatePasswordAction} from '../store/asyncMethods/ProfileMethods';
import {Helmet} from 'react-helmet';
import Loader from './Loader';
import toast, { Toaster } from 'react-hot-toast';
import { RESET_PROFILE_ERRORS } from '../store/types/ProfileTypes';


const ChangePasswd = (props) => {
    
    const [state, setState] = useState({
        current: '',
        newPasswd: '',
        userId: null,
    });
    
    const dispatch = useDispatch();
    const {user:{_id}} = useSelector(state => state.AuthReducer);
    const {loading, redirect} = useSelector(state => state.PostReducer);
    const {updateErrors} = useSelector((state) => state.updateName);
    const updatePassword = (e) => {
        e.preventDefault();
        dispatch(updatePasswordAction({current: state.current, newPasswd: state.newPasswd, userId: _id}));
    }
    useEffect(()=>{
        if(updateErrors.length !== 0){
            updateErrors.map(error => toast.error(error.msg));
            dispatch({type: RESET_PROFILE_ERRORS});
        }
    }, [updateErrors, dispatch]);
    useEffect(()=>{
        if(redirect){
            props.history.push('/dashboard');
        }
    }, [redirect, props.history]);
    return (
        <>
        {!loading ?
            <div className="container mt-100">
            <Helmet>
                <title>Update Password</title>
                <meta 
                    name="description" 
                    content="Update Password" 
                />
            </Helmet>
            <Toaster
             position='top-right'
              reverseOrder={false}
              toastOptions={{
                  style: {
                      fontSize: '14px'
                  },
              }}
            />
                <div className="row">
                    <div className="col-3 p-15">
                        <Sidebar />
                    </div>
                    <div className="col-9 p-15">
                        <div className="card">
                            <h3 className="card_h3">Change Password</h3>
                            <form onSubmit={updatePassword}>
                                <div className="group">
                                    <input 
                                        type="password"
                                        name=""
                                        className="group_control"
                                        placeholder="Current Password"
                                        onChange={(e)=>setState({...state, current: e.target.value})}
                                        value={state.current}
                                    />
                                </div>
                                <div className="group">
                                    <input 
                                        type="password"
                                        name=""
                                        className="group_control"
                                        placeholder="New Password"
                                        onChange={(e)=>setState({...state, newPasswd: e.target.value})}
                                        value={state.newPasswd}
                                    />
                                </div>
                                <div className="group">
                                        <input 
                                            type="submit"
                                            value="Update Password"
                                            className="btn btn-default btn-block"
                                        />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>: <Loader /> }
        </>
    )
}

export default ChangePasswd;
