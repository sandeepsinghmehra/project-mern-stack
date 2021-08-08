import axios from 'axios';
import {
    SET_LOADER, 
    CLOSE_LOADER,
    SET_POSTS,
    SET_POST,
    POST_REQUEST,
    SET_DETAILS,
    COMMENTS,
    USER_DETAIL,
    POSTID,
} from "../types/PostReducerTypes";




export const fetchAll = ()=> {
    return async (dispatch) => {
        dispatch({type: SET_LOADER});
        try {
            const {data:{users, posts, comments}} = await axios.get('/users/');
            dispatch({type: CLOSE_LOADER});
            dispatch({type: SET_POSTS, payload: {users, posts, comments} });
        } catch (error) {
            dispatch({type: CLOSE_LOADER});
            console.log(error);
        };
    };
};


export const fetchPost = (id) => {
    return async (dispatch) => {
        dispatch({type: SET_LOADER});
        try {
            const {data: {post}} = await axios.get(`/post/${id}`);
            dispatch({type: CLOSE_LOADER});
            dispatch({type: SET_POST, payload: post});
            console.log(post);
            dispatch({type: POST_REQUEST});
        } catch (error) {
            dispatch({type: CLOSE_LOADER});
            console.log(error);
        }
    }
}
export const fetchPosts = (id) => {
    return async (dispatch) => {
        dispatch({type: SET_LOADER});
        try {
            const {data: {posts}} = await axios.get(`/postID/${id}`);
            dispatch({type: CLOSE_LOADER});
            dispatch({type: POSTID, payload: posts});
            console.log(posts);
        } catch (error) {
            dispatch({type: CLOSE_LOADER});
            console.log(error);
        }
    }
}
export const updateAction = (editData) => {
    return async (dispatch)=>{
        dispatch({type: SET_LOADER});
        console.log(editData);
        try {
            const data = await axios.post("/updatepost", editData);
            dispatch({type: CLOSE_LOADER});
        } catch (error) {
            dispatch({type: CLOSE_LOADER});
            console.log(error.response);
        }
    }
}

export const postDetailsbyid = (id) => {
    return async (dispatch) => {
        dispatch({type: SET_LOADER});
        try {
            const {data:{post, comments}} = await axios.get(`/detailsbyid/${id}`);
            dispatch({type: CLOSE_LOADER});
            dispatch({type: SET_DETAILS, payload: post});
            dispatch({type: COMMENTS, payload: comments});
        } catch (error) {
            dispatch({type: CLOSE_LOADER});
            console.log(error);
        }
    }
}

export const userDetail = (id) => {
    return async (dispatch) => {
        dispatch({type: SET_LOADER});
        try {
            const {data:{user}} = await axios.get(`/userdetail/${id}`);
            dispatch({type: CLOSE_LOADER});
            dispatch({type: USER_DETAIL, payload: user});
        } catch (error) {
            dispatch({type: CLOSE_LOADER});
            console.log(error);
        }
    }
}