// const http = require('http')
// const app = http.createServer((request,response)=>{
//     response.writeHead(200,{'Content-Type' : 'application/json'})
//     response.end(JSON.stringify(persons))
// })



import express from "express";
import morgan from 'morgan'
import cors from 'cors'
import dotenv from "dotenv"
import mongoose from "mongoose";
import { Person } from "./models/person.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('connected to MongoDB')
}).catch(err => console.log(err))

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

app.use(express.json());
// app.use(morgan('tiny'))
app.use(cors());

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
morgan.token('body',(req)=>{
    return JSON.stringify(req.body)
})


app.get('/api/persons',(req,res)=>{
    // res.json(persons)
    Person.find({})
    .then(persons=>{
        res.json(persons)
    })
})

app.get('/api/persons/:perId',(req,res)=>{
    const id = req.params.perId;
    // const specificPerson = persons.find((p) => p.id === id)
    // if(specificPerson){
    //     res.json(specificPerson)
        
    // }
    // else{
    //     res.status(404).send({message:"not found"})
    // }
   
})

app.delete('/api/persons/:perId',(req,res)=>{
    const id = req.params.perId;
    persons = persons.filter((p=> p.id !== id))
    res.status(204).end()
})


app.post('/api/persons',(req,res)=>{
    const {name,number} = req.body
    const id = String(Math.floor(Math.random()* 1000000))

    if(!name || !number){
        return res.status(400).json({
            error:'name or number is missing'
        })
    }

    const alreadyExists = persons.find(p=> p.name === name)
    if(alreadyExists){
        return res.status(400).json({
            error:'name must be unique'
        })
    }



    const newPersons = new Person({
        id,
        name,
        number
    })
    // persons.push(newPersons)
    // res.status(201).json(newPersons)
    
    newPersons.save()
    .then(per=>{
        res.status(201).json(per)
    })
    .catch(err=> console.log(err))



})


app.get('/info',(req,res)=>{
    res.send(`<p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>

        `)
})


// app.get('/api/persons',(req,res)=>{
//     Person.find({})
//     .then(persons =>{
//         res.json(persons)
//     })
//     .catch(err=> console.log(err))
// })




const port= process.env.port || 3001

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})