import React, {useState, useEffect} from 'react';
import {Helmet} from 'react-helmet';
import toast, { Toaster } from 'react-hot-toast';
import {useDispatch, useSelector} from 'react-redux';
import {postRegister} from '../../../store/asyncMethods/AuthMethods';
import BgImage from './BgImage';
const Register = () => {
  const [state, setState] = useState({
      name: '',
      email: '',
      password: '',
    });
  const { loading, registerErrors, user } = useSelector((state)=>state.AuthReducer);

  const dispatch = useDispatch();
  const handleInputs = (e)=>{
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const userRegister = async (e)=>{
    e.preventDefault();
    dispatch(postRegister(state));
  };
  useEffect(()=>{
     if(registerErrors.length > 0){
       registerErrors.map((error) => toast.error(error.msg));
     }
  }, [ registerErrors, user ]);
  return (
        <>
        <Helmet>
            <title>User Register</title>
            <meta 
                name="description"
                content="User register form"
            />
        </Helmet>
          <div className="row mt-80">
            <div className="col-8">
              <BgImage />
              <Toaster
                  position='top-right'
                  reverseOrder={false}
                  toastOptions={{
                      style: {
                          fontSize: '14px'
                      },
                  }}
              />
            </div>
            <div className="col-4">
                <div className="account">
                  <div className="account_section">
                    <form onSubmit={userRegister}>
                    <div className="group">
                          <h3 className="form-heading">Register</h3>
                      </div>
                      <div  className="group">
                        <input
                          type="text"
                          name="name"
                          className="group_control"
                          placeholder="Enter your name" 
                          value={state.name}
                          onChange={handleInputs}
                        />
                      </div>
                      <div  className="group">
                        <input 
                          type="email" 
                          name="email" 
                          className="group_control" 
                          placeholder="_abc123@gmail.com" 
                          value={state.email}
                          onChange={handleInputs}
                        />
                      </div>
                      <div  className="group">
                        <input 
                          type="password" 
                          name="password" 
                          className="group_control" 
                          placeholder="password"
                          value={state.password}
                          onChange={handleInputs}
                         />
                      </div>
                      <div  className="group">
                        <input 
                          type="Submit"
                          className="btn btn-default btn-block"
                          value={loading? '...' : 'Register'}
                         />
                      </div>
                    </form>
                  </div>
                </div>
              </div>  
          </div>
        </>
    )
}

export default Register;
