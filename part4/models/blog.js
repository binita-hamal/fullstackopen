import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String
    },
    url:{
        type:String,
        required:true
    },
    likes:{
        type:Number,
        default:0
    },

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

})

blogSchema.set("toJSON",{
    transform: (document, returnedObject)=>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject._v
    }
})

export const Blog = mongoose.model('Blog',blogSchema)