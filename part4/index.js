import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()


const app = express()
app.use(express.json())

const blogSchema = mongoose.Schema({
    title:{
        type:String
    },
    author:{
        type:String
    },
    url:{
        type:String
    },
    likes:{
        type:Number
    }

})

const Blog = mongoose.model('Blog',blogSchema)


//routes

app.get('/api/blogs',(req,res)=>{
    Blog.find({})
    .then(blogs=>{
        res.json(blogs)
    })
})


app.post('/api/blogs',(req,res)=>{
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

})


//database connection
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log('Database is connected')
})
.catch(err =>{
    console.log(err)
})

const port = 4000
app.listen(port,()=>{
    console.log(`Server is running at ${port}`)
})