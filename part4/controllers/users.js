import bcrypt from "bcrypt"
import { User } from "../models/user.js"


export const getUsers = async(req,res)=>{
    try {
        const response = await User.find({}).populate("blogs",{
            title:1,
            author:1,
            url:1
        })
        res.send(response)
    } catch (error) {
        console.log(error)
    }

}

export const userPost = async(req,res)=>{
    try {
        const {username,name,password} = req.body

        if(!username || ! password){
            return res.status(400).json({error:"username and password are required"})
        }

        if(password.length <3){
            return res.status(400).json({error:'password must be atleast 3 characters long'})
        }

        if(username.length <3){
            return res.status(400).json({error:'username must be atleast 3 characters long'})
        }

        const existingUser = await User.findOne({username})
        if(existingUser){
            return res.status(400).json({error:"username must be unique"})
        }




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

