import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RouteLinks = (props) => {
    const {user:{role}} = useSelector(state => state.AuthReducer);
    console.log('role',role);
    return (
        role === 'admin' ? 
            <Redirect to="/dashboard" />
            :
            <Route path={props.path} exact={props.exact} component={props.component} />
        )
}

export default RouteLinks
