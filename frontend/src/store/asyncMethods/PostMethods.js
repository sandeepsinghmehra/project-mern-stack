import axios from "axios";
import {
        CREATE_ERRORS, 
        SET_LOADER, 
        CLOSE_LOADER,
        REDIRECT_TRUE,
        REMOVE_ERRORS,
        SET_MESSAGE,
        SET_POSTS,
        SET_POST,
        POST_REQUEST,
        SET_UPDATE_ERRORS,
        UPDATE_IMAGE_ERROR,
        SET_DETAILS,
        COMMENTS,
        LIKES,
        HEART,
    } from "../types/PostTypes";

export const createAction = (postData) => {
    return async (dispatch, getState) =>{
        console.log('PostData ', postData);
        const {AuthReducer: {token}} = getState();
        const config ={
            headers: {
                Authorization: `Bearer ${token} `,
            }
        }
        dispatch({type: SET_LOADER});
        try {
            const {data: {msg}} = await axios.post("/create_post", postData, config);
            dispatch({type: CLOSE_LOADER});
            dispatch({type: REMOVE_ERRORS});
            dispatch({type: REDIRECT_TRUE});
            dispatch({type: SET_MESSAGE, payload: msg});
        } catch (error) {
            const {errors} = error.response.data;
            dispatch({type: CLOSE_LOADER});
            dispatch({type: CREATE_ERRORS, payload: errors});
        }
    };
};

export const fetchPosts = (id, page)=> {
    return async (dispatch, getState) => {
        const {AuthReducer:{token}} = getState();
        dispatch({type: SET_LOADER});
        try {
            const config ={
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            };
            const {data: {response, count, perPage}} = await axios.get(`/posts/${id}/${page}`, config);
            dispatch({type: CLOSE_LOADER});
            dispatch({type: SET_POSTS, payload: {response, count, perPage } });
        } catch (error) {
            dispatch({type: CLOSE_LOADER});
        };
    };
};

export const fetchPost = (id) => {
    return async (dispatch, getState) => {
        const {AuthReducer:{token},} = getState();
        
        dispatch({type: SET_LOADER});
        try {
            const config ={
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            };
            const {data: {post}} = await axios.get(`/post/${id}`, config);
            dispatch({type: CLOSE_LOADER});
            dispatch({type: SET_POST, payload: post});
            dispatch({type: POST_REQUEST});
        } catch (error) {
            const {response: {data: {errors},},} = error;
            dispatch({type: CLOSE_LOADER});
            dispatch({type: SET_UPDATE_ERRORS, payload: errors});
            console.log(error.message);
        }
    }
}
export const updateAction = (editData) => {
    return async (dispatch, getState)=>{
        const {AuthReducer:{token}} = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };
        dispatch({type: SET_LOADER});
        try {
            const {data} = await axios.post("/update", editData, config);
            dispatch({type: CLOSE_LOADER});
            dispatch({type: REDIRECT_TRUE});
            dispatch({type: SET_MESSAGE, payload: data.msg});
        } catch (error) {
            dispatch({type: CLOSE_LOADER});
            console.log(error.response);
        }
    }
}

export const updateImageAction = (updateData) => {
    return async (dispatch, getState) => {
        const {
            AuthReducer: {token},
        } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };
        dispatch({type: SET_LOADER});
        try {
            const {data: {msg}} = await axios.post('/updateImage', updateData, config);
            dispatch({type: CLOSE_LOADER});
            dispatch({type: REDIRECT_TRUE});
            dispatch({type: SET_MESSAGE, payload: msg});
        } catch (error) {
            const {response:{data:{errors},},} = error;
            dispatch({type: CLOSE_LOADER});
            dispatch({type: UPDATE_IMAGE_ERROR, payload: errors});
            console.log(error.response);
        }
    }
}

export const homePosts = (page) => {
    return async (dispatch) => {
        dispatch({type: SET_LOADER});
        try {
            const {data: {response, count, perPage}} = await axios.get(`/home/${page}`);
            dispatch({type: CLOSE_LOADER});
            dispatch({type: SET_POSTS, payload: {response, count, perPage } });
        } catch(error) {
            dispatch({type: CLOSE_LOADER});
            console.log(error);
        }
    }
};

export const postDetails = (id) => {
    return async (dispatch) => {
        dispatch({type: SET_LOADER});
        try {
            const {data:{post, comments}} = await axios.get(`/explore/${id}`);
            dispatch({type: CLOSE_LOADER});
            dispatch({type: SET_DETAILS, payload: post});
            dispatch({type: COMMENTS, payload: comments});
        } catch (error) {
            dispatch({type: CLOSE_LOADER});
            console.log(error);
        }
    }
}
export const postComment = (commentData) =>{
    return async (dispatch, getState) =>{
        const {AuthReducer:{token}} = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        dispatch({type: SET_LOADER});
        try {
            await axios.post('/comment', commentData, config);
            dispatch({type: CLOSE_LOADER});
        } catch (error) {
            dispatch({type: CLOSE_LOADER});
            console.log(error);
        }

    }
}
export const addLike = (id) => {
    return async (dispatch, getState)=>{
        const {AuthReducer:{token}} = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }     
        }
        try {
            const response = await axios.put('/like', {postid: id}, config);
            console.log('addlike res: ', response);
            dispatch({type: LIKES, payload: response});
        } catch (error) {
            console.log(error);
        }
    }
}
export const DisLike = (id) => {
    return async (dispatch, getState)=>{
        const {AuthReducer:{token}} = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }     
        }
        try {
            const response = await axios.put('/unlike', {postid: id}, config);
            console.log('dislike res: ', response);
            dispatch({type: LIKES, payload: response});
        } catch (error) {
            console.log(error);
        }
    }
}


export const giveHeart = (id) => {
    return async (dispatch, getState) => {
        const {AuthReducer:{token}} = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        try {
            const response = await axios.put('/heart', {postid: id}, config);
            dispatch({type: HEART, payload: response});
        } catch (error) {
            console.log(error);
        }
    }
}


export const notGiveHeart= (id) => {
    return async (dispatch, getState) => {
        const {AuthReducer:{token}} = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        try {
            const response = await axios.put('/unheart', {postid: id}, config);
            dispatch({type: HEART, payload: response});
        } catch (error) {
            console.log(error);
        }
    }
}