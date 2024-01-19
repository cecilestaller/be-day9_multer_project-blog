import { Link } from "react-router-dom";
import './BlogList.scss'

const BlogList = ({ currentBlogs, updateBlogs }) => {

    // console.log("BlogListLog: ", currentBlogs);
    return (  
        <section className="blogList_wrap">
            {currentBlogs.map((singleBlogObj, index) => {
                return (
                    <div 
                    className="singleCard_wrap"
                    key={index}>
                        <Link to={`/blogs/${singleBlogObj.id}`}>
                            <div>
                                <img src={"http://localhost:3008/" + singleBlogObj.imgUrl} alt={singleBlogObj.title} />
                            </div>
                            <h3>{singleBlogObj.title}</h3>
                        </Link>

                    </div>
                )
            })}
        </section>
    );
}
 
export default BlogList;