import { useState } from "react";
import blogService from "../services/blogs";
function BlogForm({ addBlog }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let obj = {
      title,
      author,
      url,
    };

    const newBlog = await blogService.create(obj);
    addBlog(newBlog);

    setTitle("");
    setAuthor("");
    setUrl("");
    alert("Blog created successfully");
  };

  return (
    <>
      <h1>create new</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">title: </label>
          <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div style={{ marginBottom: "10px", marginTop: "10px" }}>
          <label htmlFor="author">author: </label>
          <input id="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>

        <div>
          <label htmlFor="url">url: </label>
          <input id="url" value={url} onChange={(e) => setUrl(e.target.value)} />
        </div>

        <button
          style={{
            marginTop: "20px",
            marginBottom: "20px",
            marginRight: "10px",
          }}
        >
          create
        </button>
      </form>
    </>
  );
}

export default BlogForm;
