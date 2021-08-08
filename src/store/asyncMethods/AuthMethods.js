import axios from 'axios';
import {SET_LOADER, CLOSE_LOADER, SET_TOKEN, REGISTER_ERRORS, LOGIN_ERRORS } from '../types/UserTypes';
export  const postRegister = (state) => {
    return async (dispatch)=>{
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          };
          dispatch({type: SET_LOADER});
          try {
            const { data } = await axios.post('/register', state, config);
            dispatch({type: CLOSE_LOADER});
            localStorage.setItem('myToken', data.token);
            dispatch({type: SET_TOKEN, payload: data.token});
          } catch (error) {
            dispatch({type: CLOSE_LOADER});
            dispatch({
              type: REGISTER_ERRORS, 
              payload: error.response.data.errors
            });
          }
    }
};

export const postLogin = (state) => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      dispatch({type: SET_LOADER});
      const {data} = await axios.post('/adminlogin', state, config);
      console.log('data: ', data);
      dispatch({type: CLOSE_LOADER});
      localStorage.setItem("myToken", data.token);
      dispatch({type: SET_TOKEN, payload: data.token});
    } catch (error) {
        dispatch({type: CLOSE_LOADER});
        dispatch({type: LOGIN_ERRORS, payload: error.response.data.errors});
    }
  };
};
