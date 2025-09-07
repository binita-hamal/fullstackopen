import express from "express"
import { getUsers, userPost } from "../controllers/users.js"

const userRouter = express.Router()

userRouter.get('/',getUsers)
userRouter.post('/',userPost)


export default userRouter