
import {Helmet} from 'react-helmet';
const NotFound = () => {
    return (
        <>
        <Helmet>
            <title>404 - Not Found</title>
            <meta 
                name="description" 
                content="Oops! That page could not found" 
            />
        </Helmet>
        <div className="notFound">
            <div className="notFound_container">
                <h1 className="notFound_container_h1">404</h1>
                <p className="notFound_container_p">
                    Oops! That page could not found
                </p>
            </div>
        </div>
        </>
    )
}

export default NotFound;
