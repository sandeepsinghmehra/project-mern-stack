import { useSelector } from 'react-redux';
import { Route , Redirect } from 'react-router-dom';


const PrivateRoute = (props) => {
    const {user} = useSelector((state) => state.AuthReducer);
    return user.role === 'user' ? <Route path={props.path} exact={props.exact} component={props.component} /> : user.role === 'admin'? <Redirect to="/admin" />: <Redirect to="/login" />  
}

export default PrivateRoute;
