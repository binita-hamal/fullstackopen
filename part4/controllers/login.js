import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { User } from "../models/user.js"

export const login= async(req,res)=>{
    const {username,password} = req.body

    const user = await User.findOne({username})

    const isPasswordCorrect = user === null ? false : 
    await bcrypt.compare(password,user.passwordHash)

    if(!(user && isPasswordCorrect)){
        return res.status(401).json({error:"invalid username or password"})
    }

    const userForToken = {
        username:user.username,
        id: user._id,
    }

    const token = jwt.sign(userForToken, process.env.mySECRET)
    res.status(200).json({token, username:user.username,name:user.name})
}