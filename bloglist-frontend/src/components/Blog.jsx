import { useState } from "react";
import blogService from "../services/blogs";

function Blog({ blog,setBlogs,blogs,user }) {
  const [view, setView] = useState(false);

  function handleView() {
    setView(!view);
  }


  // const canDelete = user && blog.user && blog.user._id 
  // ? blog.user._id.toString()  === (user.id || user._id)
  // : false

  const canDelete = user && blog.user && blog.user._id?.toString() === user.id?.toString();

  console.log("User:", user);
  console.log("User ID:", user?.id);
  console.log("User _ID:", user?._id);
  console.log("Blog User:", blog.user);
  console.log("Blog User _ID:", blog.user?._id);
  console.log("Can Delete:", canDelete);
  
  // const handleDelete = async()=>{
  //   const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)

  //   if(!ok) return 
  //   await blogService.remove(blog.id)

  //   setBlogs(blogs.filter(b => b.id !== blog.id))


    


  // }
  // const handleLike = async()=>{
  //   const updatedBlog = {
  //     ...blog,
  //     likes: blog.likes + 1,
  //     user : blog.user.id || blog.user._id
  //   }

  //   const returnBlog = await blogService.update(blog.id,updatedBlog)

  //   setBlogs(
  //     blogs.map((b)=> (b.id === returnBlog.id ? returnBlog : b))
  //   )
  // }

  const handleDelete = async () => {
    const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}`);
    if (!ok) return;
  
    try {
      await blogService.remove(blog.id);
      setBlogs(blogs.filter((b) => b.id !== blog.id));
    } catch (error) {
      console.error("Failed to delete blog:", error);
      alert("An error occurred while deleting the blog.");
    }
  };
  
  const handleLike = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id || blog.user._id,
    };
  
    try {
      const returnBlog = await blogService.update(blog.id, updatedBlog);
      setBlogs(blogs.map((b) => (b.id === returnBlog.id ? returnBlog : b)));
    } catch (error) {
      console.error("Failed to like blog:", error);
      alert("An error occurred while liking the blog.");
    }
  };

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


       {canDelete && (
        console.log("Rendering remove button"),

        <button
  style={{
    backgroundColor: "red", // Change to a highly visible color
    border: "2px solid black",
    color: "white",
    marginTop: 10,
    marginBottom: 10,
  }}
  onClick={handleDelete}
>
  remove
</button>

)}
        
        </div>
      )}
    </>
  );
}

export default Blog;
