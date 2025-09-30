import axios from "axios"

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async()=>{
    const response = await axios.get(baseUrl)
    return response.data
}

export const createAnecdote = async(obj)=>{
    const response  = axios.post(baseUrl,obj)
    return response.data
}

export const voteAnecdote = async(anec)=>{
    const updated = {...anec, votes:anec.votes+1}
    const response = await axios.put(`${baseUrl}/${anec.id}`,updated)
    return response.data
}