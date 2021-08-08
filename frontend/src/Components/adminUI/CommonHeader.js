import { useSelector } from 'react-redux';
import { FaUsers, FaWallet, FaComments } from 'react-icons/fa';
import {BsFilePost} from 'react-icons/bs';

const CommonHeader = () => {
    const {users, posts, comments} = useSelector(state => state.FetchAll);
    return (
        <>
            <div className="cards">
                        <div className="card-single">
                            <div>
                                <h1>{users?.length}</h1>
                                <span>Users</span>
                            </div>
                            <div>
                                <span><FaUsers /></span>
                            </div>
                        </div>
                        <div className="card-single">
                            <div>
                                <h1>{posts?.length}</h1>
                                <span>Posts</span>
                            </div>
                            <div>
                                <span> <BsFilePost /></span>
                            </div>
                        </div>
                        <div className="card-single">
                            <div>
                                <h1>{comments?.length}</h1>
                                <span>Comments</span>
                            </div>
                            <div>
                                <span><FaComments /></span>
                            </div>
                        </div>
                        <div className="card-single">
                            <div>
                                <h1>$5k</h1>
                                <span>Income</span>
                            </div>
                            <div>
                                <span><FaWallet /></span>
                            </div>
                        </div>
                    </div>
        </>
    )
}

export default CommonHeader;
