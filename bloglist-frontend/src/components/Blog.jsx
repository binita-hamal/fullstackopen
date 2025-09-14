import { useState } from "react";
import blogService from "../services/blogs";

function Blog({ blog,setBlogs,blogs }) {
  const [view, setView] = useState(false);

  function handleView() {
    setView(!view);
  }

  const handleLike = async()=>{
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user : blog.user.id || blog.user._id
    }

    const returnBlog = await blogService.update(blog.id,updatedBlog)

    setBlogs(
      blogs.map((b)=> (b.id === returnBlog.id ? returnBlog : b))
    )
  }

  return (
    <>
      <div style={{
        border:"1px solid",
        paddingTop:10,
        paddingLeft:2,
        marginBottom:5
      }}>
        {blog.title} {blog.author}
        <button onClick={handleView}>{view ? "hide" : "view"}</button>
      </div>


      {view && (
        <div style={{
        border:"1px solid green",
        paddingTop:10,
        paddingLeft:2,
        marginBottom:5}}>

          <div>{blog.url}</div>

          <div>
          likes {blog.likes}
          <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.author}</div>
        </div>
      )}
    </>
  );
}

export default Blog;
