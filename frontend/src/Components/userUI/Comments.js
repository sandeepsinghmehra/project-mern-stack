import moment from 'moment';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { AiFillDelete } from 'react-icons/ai';
const Comments = ({comments}) => {  
    const {token} = useSelector(state => state.AuthReducer); 
    const deleteCommentByUser = async (id, role) => {
        const config ={
            headers: {
                Authorization: `Bearer ${token} `,
            }
        }
        const confirm = window.confirm("Are you deleting this comment?");
        if(confirm){
            await axios.get(`/deleteCommentByUser/${id}/${role}`, config);
        }
    }
    const deleteCommentByAdmin = async (id, role) => {

        const config ={
            headers: {
                Authorization: `Bearer ${token} `,
            }
        }
        const confirm = window.confirm("Are you deleting this comment?");
        console.log('id', id, 'role', role);
        if(confirm){
            await axios.get(`/deleteCommentByAdmin/${id}/${role}`, config);
        }
    }

    return comments.length > 0 ? ( comments.map((comment)=>(
        <div key={comment._id} className="commentSection"> 
            <div className="details_header">
                <div className="details_header_avatar">
                      {comment.userName ? comment.userName[0] : '' }
                </div>
                <div className="details_header_user">
                    <span>{comment.userName}</span>
                    <span>{moment(comment.updatedAt).format('MMM Do YY')}</span>
                </div>
            </div>
            <div className="comment_body">
               <div>{comment.comment}</div> 
               <div className="comment_body_delete">
                   {comment.userRole === 'admin' ? <AiFillDelete onClick={()=> deleteCommentByAdmin(comment._id, comment.userRole)} /> :
                    <AiFillDelete onClick={() => deleteCommentByUser(comment._id, comment.userRole)}/>}
               </div>
            </div>
        </div>
    ))
        
        )
            : (
                'No Comments'
                );
};

export default Comments;
