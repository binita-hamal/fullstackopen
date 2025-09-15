import { useState } from "react";
import blogService from "../services/blogs";

function Blog({ blog, setBlogs, blogs, user, handleLike }) {
  const [view, setView] = useState(false);
  function handleView() {
    setView(!view);
  }

  const canDelete =
    user && blog.user && blog.user._id?.toString() === user.id?.toString();

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

  const likeBlog = async () => {
    if (handleLike) {
      handleLike(blog);
      return;
    }
      
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
      <div
        style={{
          border: "1px solid",
          paddingTop: 10,
          paddingLeft: 2,
          marginBottom: 5,
        }}
        className="blog"
      >
        <div className="blog-summary">
          {blog.title} {blog.author}
          <button onClick={handleView}>{view ? "hide" : "view"}</button>
        </div>
      </div>

      {view && (
        <div
          className="blog-details"
          style={{
            border: "1px solid green",
            paddingTop: 10,
            paddingLeft: 2,
            marginBottom: 5,
          }}
        >
          <div className="blog-url">{blog.url}</div>

          <div className="blog-likes">
            likes {blog.likes}
            <button onClick={likeBlog}>like</button>
          </div>

          <div className="blog-author">{blog.author}</div>

          {canDelete &&
            (console.log("Rendering remove button"),
            (
              <button
                className="blog-remove"
                style={{
                  backgroundColor: "red",
                  border: "2px solid black",
                  color: "white",
                  marginTop: 10,
                  marginBottom: 10,
                }}
                onClick={handleDelete}
              >
                remove
              </button>
            ))}
        </div>
      )}
    </>
  );
}

export default Blog;
