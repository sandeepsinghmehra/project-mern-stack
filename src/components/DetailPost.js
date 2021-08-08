import { useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { htmlToText } from "html-to-text";
import { useSelector, useDispatch } from "react-redux";
import { postDetailsbyid } from "../store/asyncMethods/PostMethods";
import { useParams } from "react-router-dom";
import moment from 'moment';


const DetailPost = () => {
    const { id } = useParams();
    const {
        user:{
            role
        }
    } = useSelector((state) => state.AuthReducer);
    
    const {details} = useSelector((state) => state.PostReducer);
    console.log('details',details);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(postDetailsbyid(id));
    }, [dispatch, id]);  
    return (
        <>
            <Sidebar />   
                <div className="main-content">
                    <Navbar />
                    
                        <div className="row mt-80">
                        <div className="col-12 p-15">
                           {role === 'admin' ? <div className="details p-15 br-10">
                                        <div className="details_header">
                                            <div className="details_header_avatar">
                                                { details?.userName ? details?.userName[0]: ''}
                                            </div>
                                            <div className="details_header_user">
                                                <span>{details?.userName}</span>
                                                <span>{moment(details?.createdAt).fromNow()}</span>
                                            </div>
                                        </div>
                        
                                        <div className="details_body p-10">
                                                <h1 className="details_body_title">
                                                    {details?.title}
                                                </h1>
                                                <div className="details_body_details">
                                                   {htmlToText(details?.body)}
                                                </div>
                                                <div className="details_body_image">
                                                    {details?.image}  
                                                </div>
                                        </div>
                                    </div>: 'You are not an Admin'}
                            </div>
                        </div>
                    
                </div>   
        </>
    )
}

export default DetailPost;
