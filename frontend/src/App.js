import "./main.scss";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Provider } from "react-redux";
import RouteLinks from './private/RouteLinks';
import AdminRouteLinks from "./private/AdminRouteLinks";
import PrivateRoute from './private/PrivateRoute';
import AdminRoute from "./private/AdminRoute";
import AdminDashboard from "./Components/adminUI/AdminDashboard";
import AdminLogin from "./Components/adminUI/auth/AdminLogin";
import Home from "./Components/userUI/Home";
import Register from './Components/userUI/auth/Register';
import Login from './Components/userUI/auth/Login';
import Dashboard from './Components/userUI/Dashboard';

import Create from './Components/userUI/create/Create';
import NotFound from './Components/NotFound';
import Edit from './Components/userUI/create/Edit';
import EditImage from './Components/userUI/create/EditImage';
import UpdateName from './Components/userUI/UpdateName';
import ChangePasswd from './Components/userUI/ChangePasswd';
import Details from './Components/Details';
import Navbar from './Components/Navbar';
import UserList from './Components/adminUI/UserList';
import UserDetail from './Components/adminUI/UserDetail';
import PostList from './Components/adminUI/PostList';
import DetailPost from "./Components/adminUI/DetailPost";

import Store from './store';

function App() {
  return (
   <Provider store={Store}>
   <Router>
     <Navbar />
     <Switch>
       <Route path="/" exact component={Home} />
       
       <Route path="/details/:id" exact component={Details} />
       <Route path="/home/:page" exact component={Home} />

       <RouteLinks path="/register" exact component={Register} />
       <RouteLinks path="/login" exact component={Login} />
       <AdminRouteLinks path="/admin" exact component={AdminLogin} />

       <AdminRoute path="/admindashboard" exact component={AdminDashboard} />

       <PrivateRoute path="/dashboard/:page?" exact component={Dashboard} />
       <PrivateRoute path="/create" exact component={Create} />
       <PrivateRoute path="/edit/:id" exact component={Edit} />
       <PrivateRoute path="/updateImage/:id" exact component={EditImage} />
       <PrivateRoute path="/updateName" exact component={UpdateName} />
       <PrivateRoute path="/updatePassword" exact component={ChangePasswd} />

        
       <AdminRoute path="/users" exact component={UserList} />
       <AdminRoute path="/userdetails/:id" exact component={UserDetail} />
       <AdminRoute path="/posts" exact component={PostList} />
       <AdminRoute path="/postdetails/:id" exact component={DetailPost} />

       <Route component={NotFound} />
     </Switch>
   </Router>
   </Provider>
  );
}

export default App;
