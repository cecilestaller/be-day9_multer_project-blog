import { Link } from "react-router-dom";
import BlogList from "../components/BlogList";
import './Home.scss'


const Home = ({ blogs, setBlogs }) => {
    return (  
        <main>
            <section className="header">
            <button>
                <Link to='/admin'>Add Blogs</Link>
            </button>
                
            </section>
            <div className="home_desc">
            <h2>It's never too late to learn...</h2>
                <p>Find the perfect blog here to learn what you've always wanted to learn</p>
            </div>
            <BlogList currentBlogs={blogs} updateBlogs={setBlogs} />
        </main>
    );
}
 
export default Home;