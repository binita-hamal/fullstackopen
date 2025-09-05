import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import router from "./routes/routes.js"

dotenv.config()


const app = express()
app.use(express.json())




//routes
app.use('/api/blogs',router)


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