import Sidebar from './Sidebar';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Helmet } from 'react-helmet';
import { updateNameAction } from '../store/asyncMethods/ProfileMethods';
import toast, { Toaster } from 'react-hot-toast';
import { RESET_PROFILE_ERRORS } from '../store/types/ProfileTypes';

const UpdateName = () => {
    const { push } = useHistory();
    const [ userName, setUserName ] = useState('');
    const {user:{name, _id},} = useSelector(user => user.AuthReducer);
    const {loading, redirect} = useSelector(state => state.PostReducer);
    
    const {updateErrors} = useSelector(state => state.updateName);

    const dispatch = useDispatch();
    const updateNameMethod = (e) => {
        e.preventDefault();
        dispatch(updateNameAction({name: userName, id: _id}));
    }
    useEffect(()=>{
        setUserName(name);
    }, [name]);
    useEffect(()=>{
        if(updateErrors.length !== 0){
            updateErrors.map(error => toast.error(error.msg));
            dispatch({type: RESET_PROFILE_ERRORS});
        }
    }, [updateErrors, dispatch]);
    useEffect(()=>{
        if(redirect){
            push('/dashboard');
        }
    }, [push, redirect]);
    return (
        <div className="container mt-100">
            <Helmet>
                <title>Update Name</title>
                <meta 
                    name="description" 
                    content="Update user name" 
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
                <div className="col-3">
                    <Sidebar />
                </div>
                <div className="col-9">
                    <div className="card">
                        <h3 className="card_h3">Update Name</h3>
                        <form onSubmit={updateNameMethod}>
                            <div className="group">
                                <input 
                                    type="text" 
                                    name="" 
                                    className="group_control" 
                                    placeholder="Name..." 
                                    value={userName}
                                    onChange={(e)=> setUserName(e.target.value)}
                                />
                            </div>
                            <div className="group">
                                <input 
                                    type="submit"
                                   value={!loading? "Update Name": "..."}
                                    className="btn btn-default btn-block"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateName;
