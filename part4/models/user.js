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
    },

    blogs:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blog"
        }
    ]
})


export const User = mongoose.model('User',userSchema)