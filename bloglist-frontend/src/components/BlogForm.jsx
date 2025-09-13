import {useState} from "react"
import blogService from "../services/blogs"
function BlogForm({addBlog}) {

    const [title,setTitle] = useState("")
    const [author,setAuthor] = useState("")
    const [url,setUrl] = useState("")


    const handleSubmit=async(e)=>{
        e.preventDefault()

        let obj={
            title,
            author,
            url
        }

        const newBlog = await blogService.create(obj)
        addBlog(newBlog)



        setTitle("")
        setAuthor("")
        setUrl("")
        alert("Blog created successfully")

    }

  return (
    <>
        <h1>create new</h1>

        <form onSubmit={handleSubmit}>
        <div>
            <label>title: </label>
            <input
                value={title}
                onChange={(e)=> setTitle(e.target.value)}
            />
        </div>

        <div style={{marginBottom:"10px", marginTop:"10px"}}>
            <label>author: </label>
            <input
            value={author}
            onChange={(e)=> setAuthor(e.target.value)}

            />
        </div>

        <div>
            <label>url: </label>
            <input
                value={url}
                onChange={(e)=> setUrl(e.target.value)}
            />
        </div>

        <button style={{marginTop:"20px", marginBottom:"20px"}}>Create blog</button>
        </form>
       
    </>
  )
}

export default BlogForm
