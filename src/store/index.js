
import {
    createStore, 
    applyMiddleware, 
    combineReducers 
} from 'redux';
import thukMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import AuthReducer from './reducers/AuthReducer';
import { 
    PostReducer,
    FetchAll, 
    FetchAllPosts, 
    FetchPost, 
    UpdatePost 
} from './reducers/PostReducer';


const rootReducers = combineReducers({
    AuthReducer,
    PostReducer,
    FetchAll,
    FetchAllPosts,
    FetchPost,
    UpdatePost,
});
const middlewares = [thukMiddleware];
const Store = createStore(rootReducers, composeWithDevTools(applyMiddleware(...middlewares)));

export default Store;
