import { useState } from "react";
import { Link } from "react-router-dom";
import './Admin.scss'

const Admin = ({ blogs, setBlogs }) => {
    const [blogTitle, setBlogTitle] = useState("");
    const [blogContent, setBlogContent] = useState("");
    const [attachment, setAttachment] = useState();

    // FETCH --> POST New Blog Endpoint
    const addBlog = () => {
        const url = "http://localhost:3008/api/blogs";
        // const postRequestInfo = {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({ title: `${blogTitle}`,
        //     content: `${blogContent}`
        // })
        // }; --> schreibweise OHNE FILE

        // ! MIT FILE muss body aus req formData sein !!

        const formData = new FormData();
        formData.append("title", blogTitle);
        formData.append("content", blogContent);
        if(attachment){
            formData.append("imgUrl", attachment, attachment.name);
        }

        fetch(url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(({ success, result, error }) => {
                if(!success) throw err;
                setBlogs(result)
            })
            .catch((error) => console.log(error))
        
        setBlogTitle("");
        setBlogContent("");
    }

    console.log("Admin Log: ", blogs);

    return (  
        <>
            <section className="admin_wrap">
                <button>
                    <Link to='/'>HOME</Link>
                </button>
                <form>
                    
                    <h2>NEW POST</h2>

                    <input type="text" name="" id="" 
                    placeholder="title..."
                    value={blogTitle}
                    onChange={(e) => setBlogTitle(e.target.value)}
                    />

                    <input type="file" name="" id="" 
                    placeholder="image"
                    onChange={(e) => setAttachment(e.target.files[0])}
                    />

                    <textarea name="" id="" cols="30" rows="10"
                    value={blogContent}
                    onChange={(e) => setBlogContent(e.target.value)}
                    ></textarea>

                    <button
                    className="publish"
                    onClick={addBlog}
                    >PUBLISH</button>
                </form>
            </section>
        </>
    );
}
 
export default Admin;