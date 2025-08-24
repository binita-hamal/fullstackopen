// const http = require('http')
// const app = http.createServer((request,response)=>{
//     response.writeHead(200,{'Content-Type' : 'application/json'})
//     response.end(JSON.stringify(persons))
// })



import express from "express";


let persons=[
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

app.get('/api/persons/:perId',(req,res)=>{
    const id = req.params.perId;
    const specificPerson = persons.find((p) => p.id === id)
    if(specificPerson){
        res.json(specificPerson)
        
    }
    else{
        res.status(404).send({message:"not found"})
    }
   
})

app.delete('/api/persons/:perId',(req,res)=>{
    const id = req.params.perId;
    persons = persons.filter((p=> p.id !== id))
    res.status(204).end()
})



app.get('/info',(req,res)=>{
    res.send(`<p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>

        `)
})




const port= 6050

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})