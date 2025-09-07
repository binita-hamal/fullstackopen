import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import router from "./routes/blogsRouter.js"
import userRouter from "./routes/usersRouter.js"
import loginRouter from "./routes/loginRouter.js"
dotenv.config()


const app = express()
app.use(express.json())


//routes
app.use('/api/blogs',router)
app.use('/api/users',userRouter)
app.use('/api/login',loginRouter)



export default app;