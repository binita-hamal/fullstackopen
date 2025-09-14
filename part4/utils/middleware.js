import jwt from "jsonwebtoken"
import { User } from "../models/user.js"


export const tokenExtractor = (req,res,next)=>{
    const auth = req.get("authorization")
    if(auth && auth.toLowerCase().startsWith("bearer ")){
        req.token = auth.substring(7)
    }
    else{
        req.token = null
    }
    next()
}

export const userExtractor = async(req,res,next)=>{

    if(!req.token){
        return res.status(401).json({error:"token missing"})
    }



        try {
            const decodedToken = jwt.verify(req.token,process.env.mySECRET)

            if(!decodedToken){
                return res.status(401).json({error:"token invalid"})
            }

            req.user = await User.findById(decodedToken.id)

            if(!req.user){
                return res.status(401).json({error:"user not found"})
            }
            next()


        } catch (error) {
            return res.status(401).json({error:"token invalid"})
            
        }
    }
 