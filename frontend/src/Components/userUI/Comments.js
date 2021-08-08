import moment from 'moment';

const Comments = ({comments}) => {    
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
                {comment.comment}
            </div>
        </div>
    ))
        
        )
            : (
                'No Comments'
                );
};

export default Comments;
