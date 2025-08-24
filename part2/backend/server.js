// const http = require('http')
// const app = http.createServer((request,response)=>{
//     response.writeHead(200,{'Content-Type' : 'application/json'})
//     response.end(JSON.stringify(persons))
// })



import express from "express";


const persons=[
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const app = express();

app.get('/api/persons',(req,res)=>{
    res.json(persons)
})



const port= 6050

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})