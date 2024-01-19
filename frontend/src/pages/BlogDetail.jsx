import { Link, useParams } from "react-router-dom";
import './BlogDetails.scss'

const BlogDetail = ({ blogs, setBlogs }) => {

    const dynamicPath = useParams();
    const detailsPath = dynamicPath.blogId;

    const filteredBlog = blogs.filter((singleBlogObj) => {
        return singleBlogObj.id.toString() === detailsPath.toString();
    })

    console.log(filteredBlog);
    
    return (  
        <article className="detailPage_wrap">
            <button>
                <Link to='/'>zurück</Link>
            </button>
            {filteredBlog.map((blog, index) => {
                return (
                    <div key={index}>
                        <img src={"http://localhost:3008/" + blog.imgUrl} alt={blog.title} />
                        <h2>{blog.title}</h2>
                        <p>{blog.content}</p>
                    </div>
                )
            })}
        </article>
    );
}
 
export default BlogDetail;