import React, { useState, useEffect } from 'react';
import {Helmet} from 'react-helmet';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import toast, { Toaster } from 'react-hot-toast';
import {useDispatch, useSelector} from "react-redux";
import {createAction} from "../../../store/asyncMethods/PostMethods";
import  Loader from "../../Loader";
import Footer from "../../Footer";

const Create = (props) => {
    const {createErrors, redirect, loading} = useSelector(state => state.PostReducer);
    const [currentImage, setCurrentImage] = useState('Choose image');
    const [imagePreview, setImagePreview] = useState('');
    const dispatch = useDispatch();
    const {
            user:{
                _id, name
            }
        } = useSelector((state) => state.AuthReducer);
    console.log('create id : ', _id)
    const fileHandle = (e) => {
        if(e.target.files.length !== 0){
            setCurrentImage(e.target.files[0].name);
            setState({
                ...state,
                [e.target.name] : e.target.files[0],
            })
            const reader = new FileReader();
            reader.onloadend = () =>{
                setImagePreview(reader.result);
            }
            reader.readAsDataURL(e.target.files[0]);
        }
    }
  
    const [state, setState] = useState({
        title: '',
        description: '',
        image: '',
    });
    const handleDescription = (e) =>{
        setState({
            ...state,
            [e.target.name] : e.target.value,
            
        });

    }
    const [slugButton, setSlugButton] = useState('');
    const [slug, setSlug] = useState('');
    const slugHandle = (e) => {
        setSlugButton(true);
        setSlug(e.target.value);
    }
    const handleUrl = (e) => {
        e.preventDefault();
        setSlug(slug.trim().split(' ').join('_'));
    }

    const handleInput = (e) => {
        setState({
            ...state,
            [e.target.name] : e.target.value,
        });
        const createSlug = e.target.value.trim().split(" ").join('_');
        setSlug(createSlug);
    }
    const [value, setValue] = useState("");
    
    const createPostHandle = (e) =>{
        e.preventDefault();
        const {title, description, image} = state;
        const formData = new FormData();
            formData.append('title', title);
            formData.append('body', value);
            formData.append('image', image);
            formData.append('description', description);
            formData.append('slug', slug);
            formData.append('name', name);
            formData.append('id', _id);
            formData.append('status','false');
            dispatch(createAction(formData));
    };
    useEffect(()=>{
        if(redirect) {
            props.history.push('/dashboard');
        }
        if(createErrors.length > 0){
            createErrors.map((error)=>toast.error(error.msg));
        }
    }, [props.history, createErrors, redirect ] 
    );
    return (
        <>
            <div className="create mt-100">
                <Helmet>
                    <title>Create new post</title>
                    <meta 
                        name="description"
                        content="create new post"
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
                {!loading ? <div className="container">
                    <form onSubmit={createPostHandle}>
                        <div className="row">
                            <div className="col-6 p-15">

                                <div className="card">
                                    <h3 className="card_h3">Create a new post</h3>
                                
                                        <div className="group">
                                            <label htmlFor="title">Post Title</label>
                                            <input 
                                                type="text" 
                                                name="title" 
                                                id="title" 
                                                value={state.title}
                                                onChange={handleInput}
                                                className="group_control" 
                                                placeholder="Post title..." />
                                        </div>
                                        <div className="group">
                                            <label 
                                                htmlFor="image" 
                                                className="image_label">
                                                    {currentImage}
                                            </label>
                                            <input 
                                                type="file" 
                                                name="image" 
                                                id="image" 
                                                onChange={fileHandle} 
                                            />
                                        </div>
                                        <div className="group">
                                            <div className="imagePreview">
                                                {imagePreview ? <img src={imagePreview} alt="avtar" /> : ''}
                                            </div>
                                        </div>
                                        
                                        <div className="group">
                                        <label htmlFor="description">Meta Description</label>
                                        <textarea 
                                            name="description"
                                            id="description"
                                            cols="30"
                                            rows="10"
                                            defaultValue={state.description}
                                            onChange={handleDescription}
                                            className="group_control"
                                            placeholder="Meta Description"
                                            maxLength="220">
                                        </textarea>
                                        <p className="length">{state.description ? 220 - state.description.length : 220}</p>
                                    </div>
                                
                                </div>
                            </div>
                            <div className="col-6 p-15" >
                                <div className="card">
                                    <div className="group">
                                        <label htmlFor="slug">Post Url</label>
                                        <input
                                            type="text"
                                            name="slug"
                                            id="slug"
                                            value={slug}
                                            onChange={slugHandle}
                                            
                                            className="group_control"
                                            placeholder="post_url..."
                                        />
                                    </div>
                                    <div className="group">
                                        {slugButton ? <button className="btn btn-default" onClick={handleUrl}>Update Slug</button>: ''}
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
                                    
                                    <div className="group pb-8">
                                            <input 
                                                type="submit"
                                                value="create post"
                                                className="btn btn-default btn-block"
                                            />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    </div> : <Loader />}
                    <Footer />
            </div>
        </>
    )
}

export default Create;
