import "./main.scss";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Provider } from "react-redux";
import Home from "./Components/Home";
import Register from './Components/auth/Register';
import Login from './Components/auth/Login';
import Navbar from './Components/Navbar';
import Dashboard from './Components/Dashboard';
import RouteLinks from './private/RouteLinks';
import PrivateRoute from './private/PrivateRoute';
import Create from './Components/create/Create';
import NotFound from './Components/NotFound';
import Edit from './Components/create/Edit';
import EditImage from './Components/create/EditImage';
import UpdateName from './Components/UpdateName';
import ChangePasswd from './Components/ChangePasswd';
import Details from './Components/Details';
import Footer from "./Components/Footer";
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

       <PrivateRoute path="/dashboard/:page?" exact component={Dashboard} />
       <PrivateRoute path="/create" exact component={Create} />
       <PrivateRoute path="/edit/:id" exact component={Edit} />
       <PrivateRoute path="/updateImage/:id" exact component={EditImage} />

       <PrivateRoute path="/updateName" exact component={UpdateName} />
       <PrivateRoute path="/updatePassword" exact component={ChangePasswd} />

       <Route component={NotFound} />
     </Switch>
     <Footer />
   </Router>
   </Provider>
  );
}

export default App;
