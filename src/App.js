import React from 'react';
import { Provider } from 'react-redux';
import './main.scss';
import { BrowserRouter as Router, Switch} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import PostList from './components/PostList';
import DetailPost from './components/DetailPost';
import PrivateRoute from './Private/PrivateRoute';
import RouteLinks from './Private/RouteLinks';
import Store from './store';


const App = () => {
  return (
    <>
    <Provider store={Store}>
        <Router>  
            <Switch>
              <RouteLinks path="/" exact component={Login} />
              <RouteLinks path="/adminlogin" exact component={Login} />
              <RouteLinks path="/adminregister" exact component={Register} />
              <PrivateRoute path="/dashboard" exact component={Dashboard} />
              <PrivateRoute path="/users" exact component={UserList} />
              <PrivateRoute path="/userdetails/:id" exact component={UserDetail} />
              <PrivateRoute path="/posts" exact component={PostList} />
              <PrivateRoute path="/postdetails/:id" exact component={DetailPost} />
            </Switch> 
        </Router>
    </Provider> 
    </>
  )
}

export default App;
