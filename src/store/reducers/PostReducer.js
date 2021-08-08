import {
    SET_LOADER,
    CLOSE_LOADER,
    CREATE_ERRORS,
    REDIRECT_TRUE,
    REDIRECT_FALSE,
    SET_MESSAGE,
    REMOVE_ERRORS,
    REMOVE_MESSAGE,
    SET_POSTS,
    SET_UPDATE_ERRORS,
    RESET_UPDATE_ERRORS,
    SET_POST,
    POST_REQUEST,
    POST_RESET,
    SET_DETAILS,
    COMMENTS,
    USER_DETAIL,
    POSTID,
} from '../types/PostReducerTypes';


const initState = {
    loading: false,
    createErrors: [],
    redirect: false,
    users:[],
    userObj: {},
    message: '',
    posts: [],
    perPage: 0,
    count: 0,
    post: {},
    postStatus: false,
    editErrors: [],
    updateImageErrors: [],
    details: {},
    comments: [],
}

export const PostReducer = (state = initState, action) => {
    const {payload} = action;
    switch(action.type){
        case SET_LOADER:
            return {
                ...state,
                 loading: true
            }
        case CLOSE_LOADER:
            return {
                ...state, 
                loading: false
            }
        case CREATE_ERRORS:
            return {
                ...state, 
                createErrors: payload
            }
        case REDIRECT_TRUE:
            return {
                ...state, 
                redirect: true
            };
        case REDIRECT_FALSE:
            return {
                ...state, 
                redirect: false
            };
        case SET_MESSAGE:
            return {
                ...state, 
                message: action.payload
            };
        case REMOVE_MESSAGE:
            return {
                ...state, 
                message: ''
            }
        case REMOVE_ERRORS:
            return { 
                ...state, 
                createErrors: [] 
            };
        case SET_DETAILS:
            return { 
                ...state, 
                details: payload   
            };
        case COMMENTS:
            return { 
                ...state, 
                comments: payload
            };
        case USER_DETAIL:
            return {
                ...state,
                userObj: payload,
            }
        case POSTID:
            return {
                ...state,
                posts: payload,
            }
        default:
            return state;
    }
};
export const FetchAll = (state = initState, action)=>{
    const { type, payload } = action;
    if(type === SET_POSTS){
        return { ...state, users: payload.users, posts: payload.posts, comments: payload.comments };
    } else {
        return state;
    }
}
export const FetchAllPosts = (state = initState, action)=>{
    const { type, payload } = action;
    if(type === SET_POSTS){
        return { ...state, posts: payload.data, countPost: payload.countPost };
    } else {
        return state;
    }
}
export const FetchPost = (state = initState, action) => {
    const { type, payload } = action;
    if(type === SET_POST){
        return {...state, post: payload}
    } else if(type === POST_REQUEST){
        return {...state, postStatus: true };
    } else if(type === POST_RESET){
        return {...state, postStatus: false};
    } else {
        return state;
    }
}
export const UpdatePost = (state = initState, action) => {
    const {type, payload} = action;
    if(type === SET_UPDATE_ERRORS) {
        return {...state, editErrors: payload };
    } else if(type === RESET_UPDATE_ERRORS){
        return {...state, editErrors:[],};
    }else {
        return state;
    }
}