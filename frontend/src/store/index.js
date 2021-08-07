import {
    createStore, 
    applyMiddleware,
    combineReducers
} from 'redux';
import { 
    PostReducer,
    FetchPosts,
    FetchPost, 
    UpdatePost, 
    UpdateImage 
} from './reducers/PostReducer';
import {updateName} from './reducers/ProfileReducer';
import thukMiddleware from 'redux-thunk';
import AuthReducer from './reducers/AuthReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducers = combineReducers({
    AuthReducer,
    PostReducer,
    FetchPosts,
    FetchPost,
    UpdatePost,
    UpdateImage, 
    updateName,
});

const middlewares = [thukMiddleware];

const Store = createStore(rootReducers, composeWithDevTools(applyMiddleware(...middlewares)));

export default Store;