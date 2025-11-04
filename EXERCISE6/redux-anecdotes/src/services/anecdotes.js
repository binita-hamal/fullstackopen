const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async()=>{
    const response = await fetch(baseUrl)
    return await response.json()
}

export const create = async(content)=>{
    const anecdote = {content, votes:0}
    const response = await fetch(baseUrl,{
        method:"POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(anecdote)
    })

    return await response.json()
}


export const update = async(anecdote)=>{
    const updatedAnecdote = {...anecdote, votes: anecdote.votes+1}
    const response = await fetch(`${baseUrl}/${anecdote.id}`,{
        method:"PUT",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedAnecdote)
    })
    return await response.json()
}




export default {getAll,create, update}