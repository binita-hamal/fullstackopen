import { useState } from "react";

function Blog({ blog }) {
  const [view, setView] = useState(false);

  function handleView() {
    setView(!view);
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
          <div>{blog.likes}</div>
          <div>{blog.author}</div>
        </div>
      )}
    </>
  );
}

export default Blog;
