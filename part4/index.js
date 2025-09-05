import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import router from "./routes/routes.js"

dotenv.config()


const app = express()
app.use(express.json())




//routes
app.use('/api/blogs',router)

const MONGODB  = process.env.NODE_ENV === 'test' ? process.env.TEST_MONGO_URL : process.env.MONGO_URL 
//database connection
mongoose.connect(MONGODB)
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

export default app