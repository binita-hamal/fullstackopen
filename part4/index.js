import app from "./app.js"
import mongoose from "mongoose"


// const MONGODB  = process.env.NODE_ENV === 'test' ? process.env.TEST_MONGO_URL : process.env.MONGO_URL 
// const MONGODB = process.env.TEST_MONGO_URL
// //database connection
// mongoose.connect(MONGODB)
// .then(()=>{
//     console.log('Database is connected')
// })
// .catch(err =>{
//     console.log(err)
// })


const port = 4000
app.listen(port,()=>{
    console.log(`Server is running at ${port}`)
})

