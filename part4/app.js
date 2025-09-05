import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import router from "./routes/routes.js"
dotenv.config()


const app = express()
app.use(express.json())


//routes
app.use('/api/blogs',router)



export default app;