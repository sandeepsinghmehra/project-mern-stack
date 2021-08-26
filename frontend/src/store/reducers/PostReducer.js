import {
        SET_LOADER,
        CREATE_ERRORS,
        CLOSE_LOADER,
        REDIRECT_TRUE,
        REDIRECT_FALSE,
        REMOVE_ERRORS,
        SET_MESSAGE,
        REMOVE_MESSAGE,
        SET_POSTS,
        SET_POST,
        POST_REQUEST,
        POST_RESET,
        SET_UPDATE_ERRORS,
        RESET_UPDATE_ERRORS,
        UPDATE_IMAGE_ERROR,
        RESET_UPDATE_IMAGE_ERRORS,
        SET_DETAILS,
        COMMENTS,
        LIKES,
        HEART,
        POSTID,
        USER_DETAIL,
 } from '../types/PostTypes';

const initState = {
     loading: false,
     createErrors: [],
     redirect: false,
     message: '',
     users:[],
     userObj: {},
     posts: [],
     perPage: 0,
     count: 0,
     post: {},
     status: false,
     postStatus: false,
     editErrors: [],
     updateImageErrors: [],
     details: {},
     comments: [],
     likes: [],
     unLikes: [],
     hearts: [],
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
        case LIKES:
            return {
                ...state, 
                details:{
                    ...state.details, 
                    likes: payload.data.response.likes, 
                    unLikes: payload.data.response.unLikes
                }
            };
        case HEART: 
            return {
                ...state, 
                details: {
                    ...state.details,
                    hearts: payload.data.response.hearts,
                }
            }
        case USER_DETAIL:
            return {
                ...state,
                userObj: {
                    ...state.userObj,
                    _id: payload.data.response._id,
                    name: payload.data.response.name,
                    email: payload.data.response.email,
                    role: payload.data.response.role,
                    blockStatus: payload.data.response.blockStatus,
                },
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

export const FetchPosts = (state = initState, action)=>{
    const { payload } = action;
    switch(action.type){
    case SET_POSTS:
        return { 
            ...state, 
            posts: payload.response, 
            count: payload.count, 
            perPage: payload.perPage 
        };
    default:
        return state;
    }
}

export const FetchPost = (state = initState, action) => {
    const { payload } = action;
    switch(action.type){
        case SET_POST:
            return {
                ...state, 
                post: {
                    ...state.post,
                    status: payload.data.response.status,
                }
            }
        case POST_REQUEST:
            return {
                ...state, 
                postStatus: true 
            };
        case POST_RESET:
            return {
                ...state,
                postStatus: false
            };
        default:
            return state;
    }
}

export const UpdatePost = (state = initState, action) => {
    const { payload } = action;
    switch(action.type){
        case SET_UPDATE_ERRORS:
            return {
                ...state, 
                editErrors: payload 
            };
        case RESET_UPDATE_ERRORS:
            return {
                ...state, 
                editErrors:[]
            };
        default:
            return state;
    }
}
export const UpdateImage = (state = initState, action) => {
    const {payload} = action;
    switch(action.type) {
        case UPDATE_IMAGE_ERROR:
            return {
                ...state,
                updateImageErrors: payload
            };
        case RESET_UPDATE_IMAGE_ERRORS:
            return {
                ...state,
                updateImageErrors: []
            }
        default:
            return state;
    }
}



