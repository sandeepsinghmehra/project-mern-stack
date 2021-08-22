import {useEffect} from 'react';
import { Helmet } from 'react-helmet';
import ImageHome from '../../imgs/website.jpg';
import { useSelector, useDispatch} from 'react-redux';
import {Link, useParams} from 'react-router-dom';
import htmlToFormattedText from "html-to-formatted-text";
import moment from 'moment';
import { homePosts } from '../../store/asyncMethods/PostMethods';
import Loader from '../Loader';
import Footer from '../Footer';

import Pagination from '../Pagination';

const Home = () => {
    let {page} = useParams();

    if(page === undefined){
        page = 1;
    }
    
    const {loading} = useSelector(state => state.PostReducer);
    const {posts, count, perPage} = useSelector(state => state.FetchPosts);
    console.log('postshome',posts)
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(homePosts(page));
    }, [dispatch, page]);

    return (
        <>
            <Helmet>
                <title>Articles</title>
                <meta 
                    name="description" 
                    content="home" 
                />
            </Helmet>
            <div className="container">
                <div className="row mt-100" style={{marginBottom: '40px'}}>
                <div className="image" >
                        <img src={ImageHome} alt="home" />
                    </div>
                    <div>
                        <h2 className="pt-30">Current Posts</h2>
                        {!loading ? posts?.length > 0 ? posts.map(post => (
                                    <div className="col-4 p-10" style={{display:'inline-block', overflow:'hidden'}} key={post._id}>
                                        <div className="dashboard">
                                            <div className="dashboard_card">
                                                <div className="header_card">
                                                    <div className="header_card_avatar">
                                                        {post.userName[0]}
                                                    </div>
                                                        <div className="header_card_user">
                                                            <div className="header_card_user_info">
                                                                <span>{post.userName}</span>
                                                                <span>{moment(post.updatedAt).format('MMM Do YY')}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="header_card_user_author">
                                                        <span>Posted By: <span style={{display:"inline-block"}} className="author"> {post.userName} </span></span>
                                                    </div> 

                                                <div className="dashboard_card_image">
                                                    <img src={`/images/${post.image}`} alt={post.image} />
                                                    <span className="dashboard_card_date">{moment(post.createdAt).format("MMM Do YY")}</span>
                                                </div>
                                                
                                                <div className="dashboard_card_title">
                                                    <h3><Link to={`/details/${post.slug}`}>{post.title}</Link></h3>
                                                    <span className="body">{htmlToFormattedText(post.body.slice(0,160))}</span>
                                                    <span><Link to={`/details/${post.slug}`}>Read More.</Link></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                        )) : '': <Loader />}
                    </div>
                </div>
                <Pagination path="home" page={page} perPage={perPage} count={count}/>
            </div>
            <Footer />
        </>
    )
}


export default Home;
