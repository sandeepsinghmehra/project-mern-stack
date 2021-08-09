import { useSelector } from 'react-redux';
import {Route, Redirect} from 'react-router-dom';


const RouteLinks = (props) => {
    const {user} = useSelector((state) => state.AuthReducer);
    return user.role === 'user'? <Redirect to="/dashboard" /> : user.role === 'admin'? <Redirect to="/AdminDashboard" />:<Route path={props.path} exact={props.exact} component={props.component} />;
};

export default RouteLinks;

