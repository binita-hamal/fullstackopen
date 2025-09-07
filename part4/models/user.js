import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username:{
        type:String
    },

    name:{
        type:String
    },

    passwordHash:{
        type:String
    }
})


export const User = mongoose.model('User',userSchema)