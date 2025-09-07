import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username:{
        type:String,
        require:true
    },

    name:{
        type:String
    },

    passwordHash:{
        type:String,
        require:true
    }
})


export const User = mongoose.model('User',userSchema)