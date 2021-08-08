
import {Helmet} from 'react-helmet';
import {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {updateImageAction} from '../../../store/asyncMethods/PostMethods';
import toast, { Toaster } from 'react-hot-toast';
import {RESET_UPDATE_IMAGE_ERRORS} from '../../../store/types/PostTypes'; 

const EditImage = (props) => {
    const {id} = useParams();
    const {push} = useHistory();
    const dispatch = useDispatch();
    const {updateImageErrors} = useSelector(state => state.UpdateImage);
    const {redirect} = useSelector((state) => state.PostReducer);
    const [state, setState] = useState({
        image: '',
        imagePreview: '',
        imageName: 'choose image',
    });
    const fileHandle = (e) => {
        if(e.target.files.length !== 0){
            const reader = new FileReader();
            reader.onloadend = () =>{
                setState({
                    ...state,
                    imagePreview: reader.result,
                    image: e.target.files[0],
                    imageName: e.target.files[0].name,
                });
            }
            reader.readAsDataURL(e.target.files[0]);
        }

    }
    const updateImage = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('id', id);
        formData.append('image', state.image);
        dispatch(updateImageAction(formData));
    };
    useEffect(()=>{
        if(updateImageErrors.length !== 0){
            updateImageErrors.map((error) => toast.error(error.msg));
            dispatch({type: RESET_UPDATE_IMAGE_ERRORS});
        }
    }, [updateImageErrors, dispatch]);
    useEffect(()=>{
        if(redirect){
            push('/dashboard');
        }
    }, [redirect, push]);

    return (
        <>
             <Helmet>
                <title>Update Image</title>
                <meta 
                    name="description"
                    content="Update Image"
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
            <div className="container mt-100">
                <div className="row">
                    <div className="col-6">
                        <div className="card">
                        <h3 className="card_h3">Update Image</h3>
                        <form onSubmit={updateImage}>
                            <div className="group">
                            <label 
                                htmlFor="image" 
                                className="image_label">
                                    {state.imageName}
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
                                        {state.imagePreview ? <img src={state.imagePreview} alt="avtar" /> : ''}
                                    </div>
                            </div>
                            <div className="group">
                                <input 
                                    type="submit"
                                    value="Update Image"
                                    className="btn btn-default btn-block"
                                />
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditImage;
