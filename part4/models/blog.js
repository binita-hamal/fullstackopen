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