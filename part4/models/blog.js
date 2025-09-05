import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
    title:{
        type:String
    },
    author:{
        type:String
    },
    url:{
        type:String
    },
    likes:{
        type:Number
    }

})

export const Blog = mongoose.model('Blog',blogSchema)