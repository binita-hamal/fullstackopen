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

    if(!title || !url){
        return res.status(400).json({error:'title or url missing'})
    }

    const newBlog =new Blog({
        title,
        author,
        url,
        likes:likes ||0
    })

    newBlog.save().then(result=>{
        res.status(201).json(result)
    })

}


export const deleteBlogs = async(req,res)=>{

    try {
        const id  = req.params.bid
        const deleteBlog = await Blog.findByIdAndDelete(id)
    
        if(!deleteBlog){
            return res.status(404).json({error:"Blog not found"})
        }
        res.status(204).end()
        
    } catch (error) {
        res.status(500).json({error:"something went wrong"})
    }
   


}