import {useState, useEffect} from 'react';
import {Helmet} from 'react-helmet';
import BgImage from './BgImage';
import {useSelector, useDispatch} from "react-redux";
import toast, { Toaster } from 'react-hot-toast';
import {postLogin} from "../../../store/asyncMethods/AuthMethods";


const Login = () => {
    const dispatch = useDispatch();
    const { loading, loginErrors } = useSelector((state)=>state.AuthReducer);
    const [state, setState] = useState({
      email: '',
      password: '',
    });
    const handleInputs = (e)=>{
      setState({
        ...state,
        [e.target.name] : e.target.value, 
      });
    };
    const userLogin = (e) => {
      e.preventDefault();
      dispatch(postLogin(state));
    };
    useEffect( () => {
      if(loginErrors.length > 0){
        loginErrors.map((error) => toast.error(error.msg));
      }
    },[loginErrors]
    );
    return (
        <>
        <Helmet>
            <title>User Login</title>
            <meta 
                name="description"
                content="User login form"
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
                    <form onSubmit={userLogin}>
                      <div className="group">
                          <h3 className="form-heading">Login</h3>
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
                          value={loading ? "..." : "Login"}
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

export default Login;