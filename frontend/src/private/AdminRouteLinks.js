import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';


const AdminRouteLinks = (props) => {
    const {user} = useSelector((state) => state.AuthReducer);
    return (
        user.role === 'admin'? <Redirect to="/AdminDashboard" />:<Route path={props.path} exact={props.exact} component={props.component} />
    );
}

export default AdminRouteLinks;
