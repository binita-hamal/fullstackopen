import { Blog } from "../models/blog.js";

export const getBlogs = async(req,res)=>{

    try {
        Blog.find({})
        .then(blogs=>{
            res.json(blogs)
        })
        
    } catch (error) {
        console.log(error)
        
    }
   
}


export const postBlogs =(req,res)=>{
    const {title,author,url,likes} = req.body
    console.log(title,author,url,likes)

    const newBlog =new Blog({
        title,
        author,
        url,
        likes
    })

    newBlog.save().then(result=>{
        res.status(201).json(result)
    })

}