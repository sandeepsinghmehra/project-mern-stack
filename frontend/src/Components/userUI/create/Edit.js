import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import {useParams, useHistory} from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import { useDispatch, useSelector } from "react-redux";
import { fetchPost, updateAction } from '../../../store/asyncMethods/PostMethods';
import { POST_RESET, RESET_UPDATE_ERRORS } from '../../../store/types/PostTypes';
import Loader from '../../Loader';
import Footer from '../../Footer';

const Edit = () => {
    const {push} = useHistory();
    const {id} = useParams();
    const [value, setValue] = useState('');
    const [state, setState] = useState({
        title: '',
        description: '',
    });
    const handleEditInput = (e) => {
        setState({
            ...state,
            [e.target.name] : e.target.value,
        });
    }
    const dispatch = useDispatch();
    const { loading, redirect } = useSelector( state => state.PostReducer);
    const { post, postStatus } = useSelector(state => state.FetchPost);
    const { editErrors } = useSelector(state => state.UpdatePost);
    
    useEffect(()=>{
        if(postStatus){
            setState({
                title: post.title,
                description: post.description,
            });
            setValue(post.body);
            dispatch({type: POST_RESET});
        } else {
            dispatch(fetchPost(id));
        }
    },[dispatch, id, post, postStatus]);
    
    
    const updatePost = (e) => {
        e.preventDefault();
        dispatch(
            updateAction({
                title: state.title, 
                body: value,
                description: state.description,
                id: post._id,
            })
        );
    };
    useEffect(()=>{
        if(editErrors.length !== 0){
            editErrors.map((error) => toast.error(error.msg));
            dispatch({type: RESET_UPDATE_ERRORS});
        }
    },[dispatch, editErrors]);
    useEffect(()=>{
        if(redirect){
            push('/dashboard');
        }
    }, [redirect, push]);

    return !loading ? (
        <div className="mt-100">
        <Helmet>
            <title>Edit Post</title>
            <meta 
                name="description" 
                content="update post" 
            />
        </Helmet>
        <Toaster
             position='top-right'
              reverseOrder={false}
              toastOptions={{
                  style: {
                      fontSize: '14px'
                  },
              }}
            />
        <div className="container">
            <div className="row">
                <div className="col-6">
                    <div className="card">
                        <h3 className="card_h3">Edit post</h3>
                        <form onSubmit={updatePost}>
                            <div className="group">
                                <label htmlFor="title">Post Title</label>
                                <input 
                                    type="text"
                                    name="title"
                                    id="title"
                                    className="group_control"
                                    placeholder="Post title"
                                    value={state.title}
                                    onChange={handleEditInput}
                                />
                            </div>
                            <div className="group">
                                <label htmlFor="body">Post Body</label>
                                <ReactQuill 
                                        theme="snow"
                                        id="body"
                                        placeholder="Post Body..."
                                        value={value}
                                        onChange={setValue} 
                                />
                            </div>
                            <div className="group">
                                <label htmlFor="description">Meta Description</label>
                                <textarea 
                                    name="description"
                                    id="description"
                                    cols="30"
                                    rows="10"
                                    defaultValue={state.description}
                                    onChange={handleEditInput}
                                    onKeyUp={(e) => 
                                        setState({...state, description: e.target.value})
                                    }
                                    className="group_control"
                                    placeholder="Meta Description"
                                    maxLength="220">
                                </textarea>
                                <p className="length">{state.description ? state.description.length : ''}</p>
                            </div>
                            <div className="group">
                                <input
                                    type="submit"
                                    value="Edit"
                                    className="btn btn-default btn-block"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
       ) : (<Loader />) 
    
    
}
export default Edit;
