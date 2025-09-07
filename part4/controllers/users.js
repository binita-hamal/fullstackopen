import bcrypt from "bcrypt"
import { User } from "../models/user.js"


export const getUsers = async(req,res)=>{
    try {
        const response = await User.find({})
        res.send(response)
    } catch (error) {
        console.log(error)
    }

}

export const userPost = async(req,res)=>{
    try {
        const {username,name,password} = req.body

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password,saltRounds)

        const user = new User({
            username,
            name,
            passwordHash
        })

        const savedUser = await user.save();
        res.status(201).json(savedUser)

        
    } catch (error) {
        console.log(error)

    }
}

